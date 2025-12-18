from core import data_loader, analytics, matcher
from utils import reporting
import config
import pandas as pd
import random

def main():
    try:

        # 1. Veri Yükle
        df = data_loader.load_data(config.INPUT_FILE, config.SOCIAL_COLS, config.TECHNICAL_COLS)

        # 2. Hesaplamalar (Vektörler ve Matrisler)
        print("Matrisler hesaplanıyor...")
        tech_sim, social_diff, social_dist_vec = analytics.calculate_matrices(
            df, config.SOCIAL_COLS, config.TECHNICAL_COLS
        )

        # 3. Kullanıcı Tiplerini Belirle
        # Eskiden sadece sayısal kümeleme yapıyorduk (1, 2, 3).
        # Şimdi stratejik eşleşme için "Analitik", "Empatik" gibi isimlere ihtiyacımız var.
        print("Kullanıcı karakterleri analiz ediliyor...")

        # Her satır için analytics.py'deki fonksiyonu çalıştırıyoruz
        df['social_cluster'] = df.apply(lambda row: analytics.determine_user_type_from_answers(row), axis=1)

        # 4. Toplu Eşleştirme (Feed Modu)
        results_df = matcher.run_matching_logic(df, tech_sim, social_diff)

        # 5. Kayıt ve Rapor
        if reporting.save_to_excel(results_df, config.OUTPUT_FILE):
            reporting.analyze_recommendations(config.OUTPUT_FILE)
