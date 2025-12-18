import pandas as pd
import config


def recommend_with_threshold(target_user_id, df, tech_sim_df, social_diff_df):
    """
    TEKİL KULLANICI İÇİN ÖNERİ MOTORU (YENİ SİSTEM)

    Adımlar:
    1. Teknik Puanları ve Sosyal Mesafeleri al.
    2. Teknik Barajı (config.MIN_TECH_THRESHOLD) geçenleri filtrele.
    3. Barajı geçen yoksa 'Esnek Mod' ile en iyi teknik puanlıları al.
    4. Stratejik Uyum (Analitik <-> Yenilikçi vb.) kontrolü yap.
    5. Sıralama: Önce Stratejik Uyum, Sonra Film/Sosyal Benzerlik.
    """

    # --- 1. Temel Verileri Çek ---
    user_tech_scores = tech_sim_df[target_user_id]
    user_social_diffs = social_diff_df[target_user_id]

    # Hedef kişinin karakterini bul (Örn: "Analitik")
    target_cluster = df.loc[target_user_id, 'social_cluster']

    # Bu karakter kiminle iyi anlaşır? (Config'den çekiyoruz)
    compatible_types = config.COMPATIBILITY_MATRIX.get(target_cluster, [])

    # --- 2. Aday Havuzunu Oluştur ---
    candidates = pd.DataFrame({
        'User_ID': df.index,
        'Tech_Score': user_tech_scores,  # Yüksek olması iyi
        'Social_Diff': user_social_diffs,  # Düşük olması iyi (0 = Aynı)
        'Cluster': df['social_cluster']
    })

    # Kişinin kendisini listeden çıkar
    candidates = candidates[candidates['User_ID'] != target_user_id]

    # --- 3. Teknik Filtreleme (Threshold) ---
    passed_candidates = candidates[candidates['Tech_Score'] >= config.MIN_TECH_THRESHOLD].copy()

    # --- 4. Fallback (Güvenlik Ağı) ---
    # Eğer barajı geçen kimse yoksa veya çok azsa (3 kişiden az), barajı yoksay.
    if len(passed_candidates) < 3:
        # Teknik puanı en yüksek 10 kişiyi getir (Kötünün iyileri)
        passed_candidates = candidates.sort_values(by='Tech_Score', ascending=False).head(10).copy()

    # --- 5. Stratejik İşaretleme ---
    # Adayın karakteri, bizim uyumlu listemizde var mı? (True/False)
    passed_candidates['Is_Compatible'] = passed_candidates['Cluster'].isin(compatible_types)

    # --- 6. Final Sıralama ---
    # Öncelik 1: Stratejik Uyum (True olanlar üste) -> ascending=False
    # Öncelik 2: Sosyal Benzerlik (Mesafesi 0'a yakın olanlar üste) -> ascending=True
    final_list = passed_candidates.sort_values(
        by=['Is_Compatible', 'Social_Diff'],
        ascending=[False, True]
    )

    # --- 7. Sonucu Liste Olarak Döndür ---
    results = []
    for _, row in final_list.iterrows():
        results.append({
            'user_id': row['User_ID'],
            'score': row['Tech_Score'],  # Ana skor teknik kalır
            'tech': row['Tech_Score'],
            'social_dist': row['Social_Diff'],
            'cluster': row['Cluster'],
            'is_compatible': row['Is_Compatible']
        })

    return results

