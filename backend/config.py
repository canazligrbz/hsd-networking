# --- DOSYA AYARLARI ---
INPUT_FILE = "anket.csv"
OUTPUT_FILE = "akis_onerileri.xlsx"

# --- ALGORİTMA AYARLARI ---
CLUSTER_BONUS_PERFECT = 0.10  # İdeal eşleşme bonusu (Örneğin Analitik-Yenilikçi eşleştiyse + puan gibi)
CLUSTER_BONUS_DIFF = 0.05     # Sadece farklı küme bonusu
USAGE_PENALTY = 0.05          # Popülerlik cezası

WEIGHT_TECH = 0.70
WEIGHT_SOCIAL = 0.30

MIN_TECH_THRESHOLD = 0.15     # Baraj
MAX_FEED_LENGTH = 50          # Listelenecek maksimum kişi

# --- STRATEJİK EŞLEŞME TABLOSU (Dokümandan) ---
COMPATIBILITY_MATRIX = {
    "Analitik": ["Yenilikçi", "Karar Verici"],
    "Karar Verici": ["Empatik", "Yenilikçi"],
    "Yenilikçi": ["Analitik", "Karar Verici"],
    "Empatik": ["Karar Verici", "Analitik"]
}

# --- SÜTUN LİSTELERİ ---
SOCIAL_COLS = [
    'Seni tanımayan bir insana kendini nasıl tanıtırsın?',
    'Ne tür filmlerden hoşlanırsın?',
    'Sosyal ortamlarda hangisisin?',
    'Ne tür etkinliklere katılmaktan keyif alırsın?',
    'Grup çalışmasında fikrin farklıysa nasıl bir yaklaşım izlersin?',
    'Bir iş görüşmesinde teknik becerilerinin yanı sıra, ne tür bir yönünün öne çıkmasını istersin?',
    'Bir teknik konuda sunum yapman gerekse, hangi yaklaşımı benimsersin?'
]

TECHNICAL_COLS = [
    'Hangi alanda araştırma yapmayı daha ilgi çekici bulursun?',
    'Fakülten ve bölümün hangi alanla ilişkili?',
    'Yeni bir konuda nasıl öğrenirsin?',
    'Yeni bir beceri öğrenirken hangi yöntemi benimsersin?',
    'Bir alan konusunda derinlemesine bilgi edinmen gerekse, nasıl başlarsın?',
    'Zorlu bir teknik problemle karşılaştığında nasıl bir yol izlersin?',
    'Bir proje üzerinde çalışırken, öncelik verdiğin şey nedir?',
    'Bireysel bir projede en çok hangi yönü önemserdin?',
    'İşlerini nasıl planlarsın?',
    'Kariyer hedeflerin hakkında en çok neyi önemsiyorsun?',
    'Bir sorunu çözmek için nasıl bir yöntem izlersin?',
    'Çalışırken hangi ortamda daha verimli olursun?'
]

# --- CEVAP ANAHTARI (ANSWER MAP) ---
ANSWER_MAP = {
    # --- KENDİNİ TANITMA ---
    "İlgi alanlarımdan ve deneyimlerimden bahsederim.": "Analitik",
    "Sohbet sırasında ortak noktalar bularak doğal bir iletişim kurarım.": "Empatik",
    "Kısa ve net ifadelerle kendimi tanıtırım, direkt konuya odaklanırım.": "Karar Verici",
    "Konuyu ilginç bir örnek ile açarak tanıtımımı desteklerim.": "Yenilikçi",

    # --- FİLMLER ---
    "Zekice kurgulanmış, detaylara önem veren filmleri tercih ederim.": "Analitik",
    "İnsan ilişkilerine ve karakter derinliğine odaklanan filmler izlerim.": "Empatik",
    "Tempolu, sürükleyici ve heyecanlı filmleri severim.": "Karar Verici",
    "Farklı türleri harmanlayan yenilikçi yapımlardan hoşlanırım.": "Yenilikçi",

    # --- SOSYAL ORTAM ---
    "Bilgi ve deneyimlerimle katkı sağlamayı önemserim.": "Analitik",
    "İnsanlarla doğal diyaloglar kurarak ortamda uyum sağlarım.": "Empatik",
    "Farklı durumlara hızlı adapte olarak rahat davranırım.": "Karar Verici",
    "Yeni fikirler ortaya atarak ortamı zenginleştiririm.": "Yenilikçi",

    # --- ETKİNLİKLER ---
    "Yeni bilgiler öğrenebileceğim seminerler ve eğitimler": "Analitik",
    "Grup çalışmaları ve sosyal etkinlikler": "Empatik",
    "Hızlı olmayı gerektiren yarışmalar, pratik uygulamalar": "Karar Verici",
    "Yaratıcılığı destekleyen sanatsal ve konsept etkinlikler": "Yenilikçi",

    # --- ARAŞTIRMA ---
    "Günlük hayatı kolaylaştıran teknolojik gelişmeler ve yenilikler": "Analitik",
    "İnsan ilişkileri, iletişim yöntemleri ve kişisel gelişim konuları": "Empatik",
    "Siyasi ve tarihi olayların günümüze yansımaları": "Analitik",
    "Farklı kültürlerin yaşam şekilleri": "Yenilikçi",

    # --- FAKÜLTE ---
    "Teknik ve mühendislik alanı": "Analitik",
    "Sosyal bilimler alanı": "Empatik",
    "İktisadi, ekonomik alan": "Karar Verici",
    "Sanat alanı": "Yenilikçi",

    # --- ÖĞRENME 1 ---
    "Teorik bilgilerle temeli sağlamlaştırarak ilerlerim.": "Analitik",
    "Ortak çalışmalarla bilgi paylaşımı yaparak öğrenirim.": "Empatik",
    "Deneyimleyerek ve hızlı geri bildirimlerle öğrenirim.": "Karar Verici",
    "Kendi kendime keşfederek özgün yollar geliştiririm.": "Yenilikçi",

    # --- ÖĞRENME 2 ---
    "Planlı bir süreçle temel kavramları öğrenir, üzerine inşa ederim.": "Analitik",
    "Grup içi deneyimlerle ve etkileşimli yöntemlerle öğrenmeyi tercih ederim.": "Empatik",
    "Deneme-yanılma ile uygulamalı şekilde öğrenirim.": "Karar Verici",

    # --- BİLGİ EDİNME ---
    "Teorik kaynaklardan başlayarak kavramları sağlam temellerle öğrenirim.": "Analitik",
    "ChatGPT ve Youtube gibi online içeriklerle konuyu pratik şekilde kavrarım.": "Karar Verici",
    "Deneyerek ve küçük projeler yaparak bilgi edinmeyi tercih ederim.": "Yenilikçi",
    "Alanında deneyimli insanlarla etkileşim kurarak farklı bakış açıları toplarım.": "Empatik",

    # --- ZORLU PROBLEM ---
    "Sorunu derinlemesine analiz eder ve çeşitli kaynakları kullanarak ilerlerim.": "Analitik",
    "Farklı görüşleri dinleyerek grup içinde çözüm üretmeyi tercih ederim.": "Empatik",
    "Mevcut durumu hızlıca değerlendirir ve hemen uygulamaya geçerim.": "Karar Verici",
    "Alışılagelmiş yöntemlerin dışında alternatif yollar araştırırım.": "Yenilikçi",

    # --- FARKLI FİKİR ---
    "Fikrimi destekleyecek verilerle yaklaşır ve açıklamalar yaparım.": "Analitik",
    "Karşılıklı anlayış içinde görüşümü ifade ederim.": "Empatik",
    "Hızlı ve ortak bir çözüm yolu bulmaya çalışırım.": "Karar Verici",
    "Alternatif fikirler sunarak yeni bir perspektif getiririm.": "Yenilikçi",

    # --- İŞ GÖRÜŞMESİ ---
    "Yaptığım projelerdeki teknik katkılarım ve çözüm üretme becerim": "Analitik",
    "Takım çalışmaları ve birlikte başarma deneyimlerim": "Empatik",
    "Hızlıca adapte olup çözüm bulma ve duruma göre hareket etme yeteneğim": "Karar Verici",
    "Farklı bakış açılarıyla projelere yenilikçi dokunuşlar katabilmem": "Yenilikçi",

    # --- SUNUM ---
    "Konuyu teknik detaylarıyla güçlü bir temelde aktarırım": "Analitik",
    "Dinleyici kitlesine uygun pratik örneklerle konuyu sadeleştiririm": "Empatik",
    "Ana noktaları vurgulayıp zamandan tasarruf sağlayarak etkili sunarım": "Karar Verici",
    "Görsel destekler ve etkileşimli anlatım teknikleri kullanarak ilgi çekici hale getiririm": "Yenilikçi",

    # --- PROJE ÖNCELİK ---
    "Teknik doğruluğu ve işin sağlamlığını ön planda tutarım.": "Analitik",
    "Kullanıcı ihtiyaçlarına ve ekip uyumuna dikkat ederim.": "Empatik",
    "İşin zamanında tamamlanması için pratik çözümler geliştiririm.": "Karar Verici",
    "Projeye özgünlük ve farklı bir bakış açısı katmaya çalışırım.": "Yenilikçi",

    # --- BİREYSEL PROJE ---
    "Teknik detaylara odaklanarak sağlam bir temel oluştururum.": "Analitik",
    "Kullanıcı deneyimini ve pratikliği ön planda tutarım.": "Empatik",
    "Çalışmaları hızlıca tamamlayarak geri bildirim almayı önemserim.": "Karar Verici",
    "Projeyi kendi yaratıcı tarzımla zenginleştiririm.": "Yenilikçi",

    # --- PLANLAMA ---
    "Detaylı bir yol haritası oluşturur ve adım adım ilerlerim.": "Analitik",
    "Ekip içi uyumu koruyarak esnek planlar yaparım.": "Empatik",
    "Öncelikleri belirleyip, seri kararlarla süreci yönetirim.": "Karar Verici",
    "Farklı yöntemleri birleştirerek plan geliştiririm.": "Yenilikçi",

    # --- KARİYER ---
    "Kendi alanımda güçlü bir uzmanlık geliştirmeyi hedeflerim.": "Analitik",
    "Takım yönetimi ve insanlarla etkili iletişim kurmak benim için önemlidir.": "Empatik",
    "Sürekli değişen ihtiyaçlara hızlı adapte olabilmeyi önceliklerim.": "Karar Verici",
    "Yeni fikirler üretip farklı alanlarda yaratıcı çözümler bulmak isterim.": "Yenilikçi",

    # --- SORUN ÇÖZME ---
    "Sorunu küçük adımlara bölerek sistemli şekilde ilerlerim.": "Analitik",
    "Çevremden farklı görüşler alarak yeni çözümler üretirim.": "Empatik",
    "Mevcut durumu değerlendirip, hızlı çözümler üretmeye odaklanırım.": "Karar Verici",
    "Soruna farklı bir perspektiften yaklaşarak yenilikçi yollar ararım.": "Yenilikçi",

    # --- ÇALIŞMA ORTAMI ---
    "Sessiz ve düzenli bir ortamda tek başıma çalışmayı tercih ederim.": "Analitik",
    "Takım çalışmasının yoğun olduğu dinamik ortamlarda verimli olurum.": "Empatik",
    "Esnek kuralların olduğu, rahat bir ortamda en iyi performansı gösteririm.": "Karar Verici",
    "İlham verici ortamlarda daha motive çalışırım.": "Yenilikçi"
}