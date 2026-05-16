from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List, Dict, Any
import pandas as pd
import config
from core import analytics
from core.team_builder import build_teams
import os

app = FastAPI(title="AI Networking Engine API")

# CORS izinleri
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MatchRequest(BaseModel):
    team_size: int
    participants: List[Dict[str, Any]]

@app.post("/api/match_teams")
def match_teams(request: MatchRequest):
    try:
        if len(request.participants) == 0:
            return {"error": "Katılımcı listesi boş"}
            
        # Pydantic listesini Pandas DataFrame'e çevir
        df = pd.DataFrame(request.participants)
        
        # ID'leri indeks yapalım
        if 'id' in df.columns:
            df.set_index('id', inplace=True)
            
        # Sosyal kümeleri (Analitik, vb.) hesapla
        df['social_cluster'] = df.apply(lambda row: analytics.determine_user_type_from_answers(row), axis=1)
        
        # Oksik sütunları doldur veya yoksay
        for col in config.SOCIAL_COLS + config.TECHNICAL_COLS:
            if col not in df.columns:
                df[col] = ""  # Eksik kolonları boş string ile doldur (One-Hot'ta 0 olması için)
                
        # Matrisleri hesapla
        tech_sim, social_diff, _ = analytics.calculate_matrices(
            df, config.SOCIAL_COLS, config.TECHNICAL_COLS
        )
        
        # Takımları oluştur
        teams = build_teams(df, tech_sim, social_diff, request.team_size)
        
        return {"teams": teams, "total_participants": len(df)}
        
    except Exception as e:
        import traceback
        return {"error": str(e), "traceback": traceback.format_exc()}

# Serve React App
# Frontend backend klasörünün bir üst dizininde
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIST = os.path.abspath(os.path.join(BASE_DIR, "..", "frontend", "dist"))

print(f"DEBUG: BASE_DIR = {BASE_DIR}")
print(f"DEBUG: FRONTEND_DIST = {FRONTEND_DIST}")
print(f"DEBUG: os.path.isdir(FRONTEND_DIST) = {os.path.isdir(FRONTEND_DIST)}")

if os.path.isdir(FRONTEND_DIST):
    app.mount("/assets", StaticFiles(directory=os.path.join(FRONTEND_DIST, "assets")), name="assets")
    
    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        file_path = os.path.join(FRONTEND_DIST, full_path)
        if os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse(os.path.join(FRONTEND_DIST, "index.html"))
