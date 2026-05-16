# --- Stage 1: Build Frontend ---
FROM node:18-slim AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# --- Stage 2: Final Image ---
FROM python:3.10-slim
WORKDIR /app

# Python dependencies
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend (Tüm backend dosyalarını ve alt klasörlerini kopyalar)
COPY backend/ ./backend/

# Copy built frontend from Stage 1
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Çalışma dizinini backend yap
WORKDIR /app/backend

# Çevresel değişken
ENV PORT 8000

# Uygulamayı başlat
CMD ["sh", "-c", "uvicorn api_main:app --host 0.0.0.0 --port $PORT"]
