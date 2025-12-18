import pandas as pd
from scipy.spatial.distance import pdist, squareform
import config

def calculate_matrices(df, social_cols, tech_cols):
    """
    Kullanıcılar arasındaki teknik benzerliği ve sosyal mesafeyi hesaplar.
    """

    # One-Hot Encoding (Kategorik veriyi 0-1 matrisine çevir)
    # Prefix ekliyoruz ki hangi sütun sosyal hangi teknik karışmasın
    df_social_ohe = pd.get_dummies(df[social_cols], prefix='Soc')
    df_technical_ohe = pd.get_dummies(df[tech_cols], prefix='Tech')

    # 1. TEKNİK BENZERLİK (Cosine Similarity)
    # Cosine Distance = 1 - Cosine Similarity
    # Biz benzerlik istiyoruz, o yüzden 1'den çıkarıyoruz.
    tech_dist = pdist(df_technical_ohe, metric='cosine')
    tech_sim_matrix = 1 - squareform(tech_dist)

    # DataFrame'e çevir (Satır ve Sütun isimleri Kullanıcı ID'leri olsun)
    tech_sim_df = pd.DataFrame(tech_sim_matrix, index=df.index, columns=df.index)

    # 2. SOSYAL FARKLILIK (Cosine Distance)
    # Burada "Mesafe" istiyoruz (Ne kadar farklılarsa o kadar iyi)
    # O yüzden direkt distance değerini alıyoruz.
    social_dist = pdist(df_social_ohe, metric='cosine')
    social_diff_matrix = squareform(social_dist)

    social_diff_df = pd.DataFrame(social_diff_matrix, index=df.index, columns=df.index)

    # social_dist vektörünü de döndürüyoruz (Eski kümeleme için gerekirse diye, şu an şart değil)
    return tech_sim_df, social_diff_df, social_dist

def determine_user_type_from_answers(row_data):
    """
    Bir kullanıcının satır verisini alır, config.ANSWER_MAP sözlüğüne bakarak
    en baskın karakterini (Analitik, Empatik vb.) bulur.
    """
    # Skorları tutacağımız sayaç
    counts = {'Analitik': 0, 'Empatik': 0, 'Karar Verici': 0, 'Yenilikçi': 0}

    # Hem sosyal hem teknik tüm soruları birleştirip tarıyoruz
    all_cols = config.SOCIAL_COLS + config.TECHNICAL_COLS

    for col in all_cols:
        # Excel'den gelen veri bazen sayı veya boşluklu olabilir, string'e çevirip temizle
        answer = str(row_data.get(col, "")).strip()

        # Cevap bizim haritamızda var mı?
        if answer in config.ANSWER_MAP:
            category = config.ANSWER_MAP[answer]
            counts[category] += 1

    # En yüksek puanı alan kategoriyi seç
    # Eğer eşitlik varsa (örneğin 5 Analitik, 5 Empatik), Python ilk bulduğunu seçer.
    dominant_type = max(counts, key=counts.get)

    return dominant_type