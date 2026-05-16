# 🚀 TeamSync — AI-Powered Matchmaking SaaS

**Canlı Uygulama:** [teamsync-platform.run.app](https://networking-app-439792060733.europe-west4.run.app/)

**TeamSync**, katılımcıları sadece "benzer" oldukları için değil, birbirlerini **"tamamladıkları"** için bir araya getiren, psikoloji ve matematik temelli bir akıllı eşleştirme platformudur. 

Geleneksel rastgele gruplandırma yöntemlerinin aksine, stratejik uyum prensibine dayalı veriye dayalı öneriler sunar.

---

## ✨ SaaS Özellikleri
Proje, yerel bir Python scriptinden profesyonel bir **Multi-tenant SaaS** platformuna dönüştürülmüştür:
- 🔐 **İK Yönetim Paneli:** Firebase Auth ile güvenli kayıt ve her İK uzmanına özel izole çalışma alanı.
- 📅 **Etkinlik Yönetimi:** Sınırsız etkinlik oluşturma ve her etkinliğe özel benzersiz katılım linkleri.
- 📱 **Canlı Katılım:** Katılımcılar anketleri kendi telefonlarından doldurur, sonuçlar anlık olarak İK paneline düşer.
- 🤖 **Otomatik Eşleştirme:** Tek tıkla binlerce katılımcıyı saniyeler içinde en ideal takımlara böler.

---

## 🧠 Algoritma Mantığı (The Engine)
Sistem, akademik araştırmalara dayanan 4 aşamalı bir hibrit motor kullanır:

### 1. Karakter Analizi (Psychometric Profiling)
Kullanıcıların ankete verdiği cevaplar analiz edilir ve kullanıcı 4 ana tipten birine atanır: **Analitik, Empatik, Karar Verici, Yenilikçi.**

### 2. Vektörleştirme (Vectorization) & Matris Hesaplama
- **Teknik Sorular:** Kullanıcının uzmanlık alanları **One-Hot Encoding** yöntemi ile sayısal vektörlere dönüştürülür. İki kullanıcı arasındaki teknik uyum, bu vektörler üzerinden **Cosine Similarity** (Kosinüs Benzerliği) ile (0-1 arası) hesaplanır.
- **Sosyal Sorular:** Kullanıcının sosyal tercihleri vektöre çevrilir ve **Cosine Distance** ile farklılık/tamamlayıcılık skoru hesaplanır.

### 3. Hibrit Puanlama (Hybrid Scoring)
Her aday çifti için nihai bir "Uyum Puanı" hesaplanır:
$$Score = (Technical \times 0.70) + (Social \times 0.30) + Bonus - Penalty$$
- **Stratejik Bonus:** Eğer adaylar "İdeal Partner" matrisindeyse (Örn: Analitik ↔ Karar Verici) +0.10 puan eklenir.
- **Popülarite Cezası:** Bir adayın listeleri domine etmemesi için dengeleyici bir ceza puanı uygulanır.

### 4. Greedy Matching (Eşleştirme Akışı)
Tüm puanlamalar tamamlandıktan sonra, en yüksek uyum puanına sahip kişileri eşleştirerek takımları inşa eden $O(n \log n)$ karmaşıklığında dinamik bir motor çalışır.

---

## 🛠 Teknoloji Yığını
- **Frontend:** React + Vite + Lucide Icons
- **Backend:** Python (Matching Engine)
- **Database & Auth:** Firebase Firestore & Authentication
- **Deployment:** Google Cloud Run (Serverless)

---

## 👨‍💻 Geliştirici Ekibi
Bu proje, veriye dayalı işbirliğinin gücüne inanan bir ekip tarafından geliştirilmiştir:

- **Ömer Semih Uzun** - [LinkedIn](https://www.linkedin.com/in/omer-semih-uzun/) · [GitHub](https://github.com/omersemihuzun)
- **Ayşe Nur Çetin** - [LinkedIn](https://www.linkedin.com/in/ay%C5%9Fe-nur-%C3%A7etin-9577782aa/) · [GitHub](https://github.com/aysenrctn)
- **Nazlı Can Gürbüz** - [LinkedIn](https://www.linkedin.com/in/nazl%C4%B1-can-g%C3%BCrb%C3%BCz-14500531b/) · [GitHub](https://github.com/canazligrbz)

---

### Kurulum (Development)
```bash
# Repo'yu klonla
git clone https://github.com/canazligrbz/hsd-networking.git

# Frontend'i ayağa kaldır
cd frontend
npm install
npm run dev
```