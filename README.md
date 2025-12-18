# AI-Powered Networking & Matchmaking System
Bu proje,  katılımcıları teknik yetkinliklerine ve sosyal karakterlerine göre analiz edip, en verimli işbirliklerini (takım arkadaşlığı, mentorluk, network) oluşturmak için tasarlanmış akıllı bir eşleştirme motorudur.

Geleneksel "rastgele tanışma" yerine, stratejik uyum prensibine göre veriye dayalı öneriler sunar.

## Projenin Amacı
Sadece "benzer" kişileri değil, birbirini tamamlayan kişileri bir araya getirmek.

- **Teknik Uyum**: Aynı dili konuşabilmeleri için teknik altyapı benzerliği (%70 Ağırlık).

- **Sosyal Tamamlayıcılık**: Farklı bakış açıları için karakter zıtlığı/uyumu (%30 Ağırlık).

- **Stratejik Eşleşme**: Lider ruhlu birine (Karar Verici), iletişimci birini (Empatik) önermek gibi özel kurallar.

## Nasıl Çalışır? (Algoritma Mantığı)
Sistem 4 aşamalı bir öneri motoru kullanır:

### 1. Karakter Analizi 
Kullanıcıların ankete verdiği cevaplar analiz edilir ve kullanıcı 4 ana tipten birine atanır:

**Analitik**: Detaycı, planlı, veri odaklı.

**Empatik**: İletişim odaklı, uyumlu, takım oyuncusu.

**Karar Verici**: Sonuç odaklı, hızlı, lider ruhlu.

**Yenilikçi**: Yaratıcı, vizyoner, alternatif düşünen.

### 2. Vektörleştirme & Matris Hesaplama
**Teknik Sorular**: Kullanıcının uzmanlık alanları One-Hot Encoding ile vektöre çevrilir ve Cosine Similarity ile benzerlik skoru (0-1) hesaplanır.

**Sosyal Sorular**: Kullanıcının sosyal tercihleri vektöre çevrilir ve Cosine Distance ile farklılık skoru hesaplanır.

### 3. Hibrit Puanlama 
Her aday için nihai bir **"Uyum Puanı"** hesaplanır:

$$
\text{Score} = (\text{Technical} \times 0.70) + (\text{Social} \times 0.30) + \text{Bonus} - \text{Penalty}
$$

**Stratejik Bonus**: Eğer aday, kullanıcının "İdeal Partner" tablosundaysa (Örn: Analitik <-> Karar Verici) +0.10 Puan eklenir.

**Farklı Küme Bonusu**: İdeal değil ama farklı bir kümedense +0.05 Puan eklenir.

**Popülarite Cezası**: Bir aday çok fazla kişiye önerildiyse, listeyi domine etmemesi için puanı hafifçe düşürülür.

### 4. Akış (Feed) Üretimi
Sistem, her kullanıcı için en yüksek puandan en düşüğe doğru sıralanmış dinamik bir liste oluşturur.

## Kurulum
Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyin.

### 1. Adım: Projeyi İndirin
```
git clone https://github.com/canazligrbz/networking-assistant.git
cd networking-assistant
```

### 2. Adım: Sanal Ortam Oluşturun
```
# Windows için
python -m venv .venv
.venv\Scripts\activate

# Mac/Linux için
python3 -m venv .venv
source .venv/bin/activate
```

### 3. Adım: Kütüphaneleri Yükleyin
```
pip install -r requirements.txt
```

## Kullanım
Proje iki farklı modda çalışabilir:

1. **Toplu İşlem Modu (Batch Processing)**
Mevcut bir Excel/CSV dosyasındaki (anket.csv) herkesi birbiriyle eşleştirir ve çıktı dosyası oluşturur.

```
python main.py
```
2. **Canlı Mod (Real-Time Simulation)**
Yeni bir kullanıcı sisteme kaydolduğunda ne olacağını simüle eder. main.py çalıştığında konsol ekranında rastgele bir kullanıcı seçilir ve ona özel Top 50 öneri listesi anlık olarak üretilir.

## Proje Yapısı
```
networking-project/
├── config.py           # Tüm ayarlar, katsayılar, sorular ve cevap anahtarı
├── main.py             # Projenin giriş noktası
│
├── core/               
│   ├── data_loader.py  # Veri okuma ve temizleme
│   ├── analytics.py    # Vektör hesaplamaları ve tip belirleme
│   └── matcher.py      # Eşleştirme algoritması ve mantığı
│
└── utils/              
    └── reporting.py    # Raporlama ve analiz fonksiyonları
```

## Konfigürasyon
Algoritmanın davranışını config.py dosyasından değiştirebilirsiniz:

`WEIGHT_TECH`: Teknik puanın ağırlığı (Varsayılan: 0.70)

`CLUSTER_BONUS_PERFECT`: İdeal eşleşme bonusu (Varsayılan: 0.10)

`MIN_TECH_THRESHOLD`: Öneri listesine girmek için gereken minimum teknik puan (Varsayılan: 0.15)

`COMPATIBILITY_MATRIX`: Hangi karakterin kiminle eşleşeceğini belirleyen tablo.