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


        #  CANLI TEST SİMÜLASYONU
        print("\n" + "=" * 40)
        print("CANLI TEST MODU")
        print("=" * 40)

        # Test için rastgele mevcut bir kullanıcı seç
        random_user_id = df.index[random.randint(0, len(df) - 1)]

        # Simüle edilen kullanıcı verisi
        simulated_user = {
            'id': random_user_id,
            # Artık burası sayı değil, "Analitik" vb. geliyor
            'cluster': df.loc[random_user_id, 'social_cluster'],
            'user_type': df.loc[random_user_id, 'social_cluster']
        }

        print(f"Test için Seçilen Kişi ID: {simulated_user['id']}")
        print(f"Karakter Tipi: {simulated_user['cluster']}")
        print("Bu kişi için anlık öneri listesi oluşturuluyor...")

        # 6. Canlı Eşleşme Fonksiyonunu Çağır
        recommendations = matcher.recommend_for_new_user(
            new_user_data=simulated_user,
            df_pool=df,
            tech_sim_df=tech_sim,
            social_diff_df=social_diff
        )

        if not recommendations:
            print("Uygun kriterlerde (Baraj üstü) öneri bulunamadı.")
        else:
            print(f"\n {len(recommendations)} kişi önerildi. İşte ilk 5'i:")

            print(f"{'Aday ID':<10} | {'Puan':<8} | {'Teknik':<8} | {'Küme':<15}")
            print("-" * 50)

            for rec in recommendations[:5]:
                u_id = rec.get('user_id', 'HATA')
                sc = rec.get('score', 0.0)
                tc = rec.get('tech', 0.0)
                cl = rec.get('cluster', 'Yok')

                print(f"{u_id:<10} | {sc:.3f}    | {tc:.3f}    | {cl}")

    except Exception as e:
        print(f"\nBİR HATA OLUŞTU:\n{e}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    main()


