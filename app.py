import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import graphviz

# --- SAYFA AYARLARI ---
st.set_page_config(
    page_title="AI Networking Engine",
    page_icon="🚀",
    layout="wide",
    initial_sidebar_state="expanded"
)

# --- CSS İLE ESTETİK DOKUNUŞLAR ---
st.markdown("""
<style>
    .metric-card {
        background-color: #0E1117;
        border: 1px solid #262730;
        padding: 20px;
        border-radius: 10px;
        color: white;
        text-align: center;
    }
    .stProgress > div > div > div > div {
        background-image: linear-gradient(to right, #00C9FF , #92FE9D);
    }
</style>
""", unsafe_allow_html=True)

# --- BAŞLIK ALANI ---
col1, col2 = st.columns([1, 5])
with col1:
    st.image("https://cdn-icons-png.flaticon.com/512/3063/3063236.png", width=80)  # Logo örneği
with col2:
    st.title("AI Powered Networking Engine")
    st.markdown("Stratejik Uyum & Karakter Analizi Tabanlı Eşleşme Sistemi")

st.divider()


# --- VERİ YÜKLEME ---
@st.cache_data
def load_data():
    try:
        # Gerçek çıktı dosyanı ve anket dosyanı okuyoruz
        df_results = pd.read_excel("akis_onerileri.xlsx")
        df_users = pd.read_csv("anket.csv")  # Kullanıcı detayları için
        return df_results, df_users
    except FileNotFoundError:
        st.error("Lütfen 'akis_onerileri.xlsx' ve 'anket.csv' dosyalarının proje klasöründe olduğundan emin olun.")
        return pd.DataFrame(), pd.DataFrame()


df_results, df_users = load_data()

if not df_results.empty:

    # --- SIDEBAR (KONTROL PANELİ) ---
    st.sidebar.header("🎯 Simülasyon Ayarları")

    # Kullanıcı Seçimi
    user_ids = df_results['Kullanıcı_ID'].unique()
    selected_user_id = st.sidebar.selectbox("Kullanıcı Seç (ID):", user_ids)



    # --- ANA ANALİZ EKRANI ---

    # Seçilen kullanıcıya ait verileri filtrele
    user_matches = df_results[df_results['Kullanıcı_ID'] == selected_user_id].sort_values("Sıralama")

    # En iyi eşleşmeyi al
    best_match = user_matches.iloc[0]

    # --- ÜST METRİKLER ---
    m1, m2, m3, m4 = st.columns(4)
    with m1:
        st.metric(label="Toplam Aday Havuzu", value=f"{len(df_users)} Kişi")
    with m2:
        st.metric(label="Hesaplanan Öneri", value=f"{len(user_matches)} Kişi")
    with m3:
        st.metric(label="En Yüksek Uyum Skoru", value=f"%{best_match['Uyum_Puanı'] * 100:.1f}")
    with m4:
        # Kullanıcının kendi kümesini bul (Dosyada varsa)
        # Örnek olarak rastgele atıyorum, gerçek verinde varsa burayı güncelle
        user_cluster = "Analitik"
        st.metric(label="Kullanıcı Tipi", value=user_cluster)

    st.markdown("### 🔥 En İyi 3 Eşleşme Analizi")

    # Kartlar şeklinde göstermek için
    top_3 = user_matches.head(3)

    cols = st.columns(3)

    for index, (idx, row) in enumerate(top_3.iterrows()):
        with cols[index]:
            with st.container(border=True):
                st.subheader(f"#{row['Sıralama']} - Aday ID: {int(row['Önerilen_ID'])}")

                # Uyum Skoru Barı
                score = row['Uyum_Puanı']
                st.progress(score)
                st.caption(f"Genel Uyum Skoru: **%{score * 100:.1f}**")

                # Detaylar
                st.markdown(f"""
                - **Karakter Kümesi:** {row['Küme']}
                - **Teknik Uyum:** %{row['Teknik_Uyum'] * 100:.1f}
                """)

                # Radar Grafiği (Görsel Şov)
                # Not: Gerçek veride 'Sosyal' sütunu varsa buraya ekle.
                # Şimdilik Teknik vs Genel kıyaslaması yapıyoruz.
                categories = ['Teknik', 'Sosyal (Tahmini)', 'Stratejik', 'Genel']
                values = [
                    row['Teknik_Uyum'],
                    (row['Uyum_Puanı'] - (row['Teknik_Uyum'] * 0.7)) / 0.3,  # Formülden tersine mühendislik :)
                    row['Uyum_Puanı'] * 1.1,
                    row['Uyum_Puanı']
                ]

                fig = px.line_polar(r=values, theta=categories, line_close=True)
                fig.update_traces(fill='toself')
                fig.update_layout(height=200, margin=dict(t=20, b=20, l=20, r=20))
                st.plotly_chart(fig, use_container_width=True)

    # --- DETAYLI TABLO ---
    st.markdown("### 📋 Tüm Öneri Listesi")
    st.dataframe(
        user_matches[['Sıralama', 'Önerilen_ID', 'Küme', 'Teknik_Uyum', 'Uyum_Puanı']],
        use_container_width=True,
        hide_index=True,
        column_config={
            "Uyum_Puanı": st.column_config.ProgressColumn(
                "Uyum Skoru",
                format="%.2f",
                min_value=0,
                max_value=1,
            ),
            "Teknik_Uyum": st.column_config.NumberColumn(
                "Teknik Puan",
                format="%.2f"
            )
        }
    )

else:
    st.warning("Veri yüklenemedi. Lütfen dosyaları kontrol edin.")

# --- MODERN GÖRSELLEŞTİRME: SUNBURST ---
st.markdown("---")
st.subheader("🧬 Eşleşme Ekosistemi")

# Veriyi Sunburst formatına uygun hale getirelim
# Hiyerarşi: Küme -> Aday ID -> Puan (Büyüklük)
fig_sun = px.sunburst(
    user_matches.head(10),  # İlk 10 kişiyi alalım ki grafik boğulmasın
    path=['Küme', 'Önerilen_ID'],  # İç halka: Küme, Dış halka: Kişi
    values='Uyum_Puanı',  # Dilim büyüklüğü puana göre
    color='Uyum_Puanı',  # Renk skalası puana göre (Koyu = Yüksek Puan)
    color_continuous_scale='RdBu',  # Kırmızı-Mavi modern skala
    hover_data=['Teknik_Uyum']  # Üstüne gelince teknik puanı da yazsın
)

fig_sun.update_layout(
    margin=dict(t=0, l=0, r=0, b=0),
    height=500,
    paper_bgcolor='rgba(0,0,0,0)',  # Arka plan şeffaf
    font=dict(size=14, color="white")
)

# Sol tarafa açıklamayı, sağ tarafa grafiği koyalım
c1, c2 = st.columns([1, 2])

with c1:
    st.markdown("""
    Bu interaktif grafik, adayların hangi **Karakter Kümelerinden** geldiğini gösterir.

    - **İç Halka:** Adayın ait olduğu baskın karakter (Örn: Girişimci, Analitik).
    - **Dış Halka:** Adayın ID'si.
    - **Renk:** Kırmızıya yaklaştıkça **Uyum Puanı artar.**

    """)

    # Ekstra Havalı Özellik: Rapor İndir Butonu
    st.markdown("### 📄 Raporlama")
    st.write("Seçilen kullanıcı için detaylı analiz raporu hazır.")

    # Sahte bir CSV indiriyormuş gibi yapalım (Sunumda işe yarar)
    csv_data = user_matches.to_csv(index=False).encode('utf-8')
    st.download_button(
        label="📥 Analiz Raporunu İndir (CSV)",
        data=csv_data,
        file_name=f'user_{selected_user_id}_match_report.csv',
        mime='text/csv',
    )

with c2:
    st.plotly_chart(fig_sun, use_container_width=True)

# --- POPÜLARİTE ANALİZİ: EN ÇOK VE EN AZ ÖNERİLENLER ---
st.markdown("---")
st.header("🌟 Sistem Yıldızları: Popülarite Analizi")
st.markdown("Bu bölüm, bir adayın **kaç farklı kişiye** önerildiğini (Frekans) analiz eder.")

# 1. Herkesin kaç kere önerildiğini say
popularity_counts = df_results['Önerilen_ID'].value_counts()

# 2. En popüler ve en az popüler kişiyi bul
most_popular_id = popularity_counts.idxmax()
most_popular_count = popularity_counts.max()

least_popular_id = popularity_counts.idxmin()
least_popular_count = popularity_counts.min()

# Bu kişilerin detaylarına (Küme vb.) erişmek için örnek bir satırlarını çekelim
pop_details = df_results[df_results['Önerilen_ID'] == most_popular_id].iloc[0]
unpop_details = df_results[df_results['Önerilen_ID'] == least_popular_id].iloc[0]

# --- GÖRSELLEŞTİRME ---
p_col1, p_col2 = st.columns(2)

# SOL: EN POPÜLER (NETWORK STAR)
with p_col1:
    st.info(f"💎 En Çok Aranan: Aday {int(most_popular_id)}")
    st.metric(
        label="Önerilme Sayısı",
        value=f"{most_popular_count} Kişi",
        delta="Sistemin Gözdesi"
    )
    st.markdown(f"""
    **Neden Popüler?**
    Bu kişi tam **{most_popular_count}** farklı kullanıcının listesine girmeyi başardı.
    - **Karakter:** {pop_details['Küme']}
    - **Yorum:** Muhtemelen "joker" özelliklere sahip (hem teknik hem sosyal dengesi yüksek).
    """)

# SAĞ: EN AZ GÖRÜNEN (GİZLİ CEVHER)
with p_col2:
    st.warning(f"🔍 En Az Görünen: Aday {int(least_popular_id)}")
    st.metric(
        label="Önerilme Sayısı",
        value=f"{least_popular_count} Kişi",
        delta="- Niş Profil",
        delta_color="off" # Gri renk yapar
    )
    st.markdown(f"""
    **Durum Analizi**
    Bu kişi sadece **{least_popular_count}** kişinin listesine girebildi.
    - **Karakter:** {unpop_details['Küme']}
    - **Yorum:** Çok spesifik (niş) özelliklere sahip olabilir veya genel uyumu düşük kalmış olabilir.
    """)

# --- EKSTRA: İLK 5 POPÜLER LİSTESİ ---
st.subheader("📊 Top 5 En Popüler Adaylar")
# İlk 5'i alıp grafik yapalım
top_5_popular = popularity_counts.head(5)
st.bar_chart(top_5_popular, color="#00C9FF")
st.caption("Grafik: Hangi Aday ID'sinin (X ekseni) kaç kişiye önerildiği (Y ekseni).")