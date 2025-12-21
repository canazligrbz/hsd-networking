import pandas as pd
import os

def save_to_excel(df, filename):
    try:
        df.to_excel(filename, index=False)
        print(f"Dosya kaydedildi: {filename}")
        return True
    except Exception as e:
        print(f"Kayıt hatası: {e}")
        return False


def analyze_recommendations(file_path):
    print(f"\n--- AKIŞ ANALİZ RAPORU: {file_path} ---\n")

    if not os.path.exists(file_path):
        return

    try:
        df = pd.read_excel(file_path)
    except:
        df = pd.read_csv(file_path)

    # Yeni formatta 'Önerilen_ID' sütunu var
    if 'Önerilen_ID' in df.columns:
        unique_users = df['Kullanıcı_ID'].nunique()
        total_recs = len(df)
        avg_rec_per_user = total_recs / unique_users

        print(f"Toplam Öneri Satırı: {total_recs}")
        print(f"Kullanıcı Başına Ortalama Öneri: {avg_rec_per_user:.1f}")

        # Popülerlik
        popularity = df['Önerilen_ID'].value_counts()
        print(f"\nEn Popüler Kişi: {popularity.max()} kullanıcının listesinde var.")
        print(f"En Az Popüler Kişi: {popularity.min()} kullanıcının listesinde var.")

        # Teknik Kalite (Sadece ilk 3 sıradakilere bakalım, kaliteyi onlar belirler)
        top_3_df = df[df['Sıralama'] <= 3]
        avg_tech = top_3_df['Teknik_Uyum'].mean()
        print(f"\n📈 İlk 3 Sıradakilerin Ort. Teknik Uyumu: {avg_tech:.3f}")

    print("-" * 30)