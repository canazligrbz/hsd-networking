import pandas as pd
import os

def load_data(file_path, social_cols, tech_cols):

    """Veriyi okur, temizler ve eksik satırları atar."""

    print(f"Dosya okunuyor: {file_path}...")

    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Dosya bulunamadı: {file_path}")

    if file_path.endswith('.csv'):
        df = pd.read_csv(file_path)
    else:
        df = pd.read_excel(file_path)

    # Sütun isimlerini temizle
    df.columns = df.columns.str.strip().str.replace('"', '')

    # Eksik veri kontrolü
    required_cols = social_cols + tech_cols

    # Sütunların varlığını kontrol et
    missing_cols = [c for c in required_cols if c not in df.columns]
    if missing_cols:
        raise ValueError(f"Eksik sütunlar var: {missing_cols}")

    df_clean = df.dropna(subset=required_cols).copy()
    print(f"Veri yüklendi. Toplam Kişi: {len(df_clean)}")

    return df_clean