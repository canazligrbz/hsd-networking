export const SOCIAL_QUESTIONS = [
  "Seni tanımayan bir insana kendini nasıl tanıtırsın?",
  "Ne tür filmlerden hoşlanırsın?",
  "Sosyal ortamlarda hangisisin?",
  "Ne tür etkinliklere katılmaktan keyif alırsın?",
  "Grup çalışmasında fikrin farklıysa nasıl bir yaklaşım izlersin?",
  "Bir iş görüşmesinde teknik becerilerinin yanı sıra, ne tür bir yönünün öne çıkmasını istersin?",
  "Bir teknik konuda sunum yapman gerekse, hangi yaklaşımı benimsersin?"
];

export const TECHNICAL_QUESTIONS = [
  "Hangi alanda araştırma yapmayı daha ilgi çekici bulursun?",
  "Fakülten ve bölümün hangi alanla ilişkili?",
  "Yeni bir konuda nasıl öğrenirsin?",
  "Yeni bir beceri öğrenirken hangi yöntemi benimsersin?",
  "Bir alan konusunda derinlemesine bilgi edinmen gerekse, nasıl başlarsın?",
  "Zorlu bir teknik problemle karşılaştığında nasıl bir yol izlersin?",
  "Bir proje üzerinde çalışırken, öncelik verdiğin şey nedir?",
  "Bireysel bir projede en çok hangi yönü önemserdin?",
  "İşlerini nasıl planlarsın?",
  "Kariyer hedeflerin hakkında en çok neyi önemsiyorsun?",
  "Bir sorunu çözmek için nasıl bir yöntem izlersin?",
  "Çalışırken hangi ortamda daha verimli olursun?"
];

export const ALL_QUESTIONS = [...SOCIAL_QUESTIONS, ...TECHNICAL_QUESTIONS];

// Bu map'i kullanarak anket seçeneklerini üreteceğiz
export const ANSWER_OPTIONS = {
  // Kendini Tanıtma
  "Seni tanımayan bir insana kendini nasıl tanıtırsın?": [
    "İlgi alanlarımdan ve deneyimlerimden bahsederim.",
    "Sohbet sırasında ortak noktalar bularak doğal bir iletişim kurarım.",
    "Kısa ve net ifadelerle kendimi tanıtırım, direkt konuya odaklanırım.",
    "Konuyu ilginç bir örnek ile açarak tanıtımımı desteklerim."
  ],
  // Filmler
  "Ne tür filmlerden hoşlanırsın?": [
    "Zekice kurgulanmış, detaylara önem veren filmleri tercih ederim.",
    "İnsan ilişkilerine ve karakter derinliğine odaklanan filmler izlerim.",
    "Tempolu, sürükleyici ve heyecanlı filmleri severim.",
    "Farklı türleri harmanlayan yenilikçi yapımlardan hoşlanırım."
  ],
  // Sosyal Ortam
  "Sosyal ortamlarda hangisisin?": [
    "Bilgi ve deneyimlerimle katkı sağlamayı önemserim.",
    "İnsanlarla doğal diyaloglar kurarak ortamda uyum sağlarım.",
    "Farklı durumlara hızlı adapte olarak rahat davranırım.",
    "Yeni fikirler ortaya atarak ortamı zenginleştiririm."
  ],
  // Etkinlikler
  "Ne tür etkinliklere katılmaktan keyif alırsın?": [
    "Yeni bilgiler öğrenebileceğim seminerler ve eğitimler",
    "Grup çalışmaları ve sosyal etkinlikler",
    "Hızlı olmayı gerektiren yarışmalar, pratik uygulamalar",
    "Yaratıcılığı destekleyen sanatsal ve konsept etkinlikler"
  ],
  // Farklı fikir
  "Grup çalışmasında fikrin farklıysa nasıl bir yaklaşım izlersin?": [
    "Fikrimi destekleyecek verilerle yaklaşır ve açıklamalar yaparım.",
    "Karşılıklı anlayış içinde görüşümü ifade ederim.",
    "Hızlı ve ortak bir çözüm yolu bulmaya çalışırım.",
    "Alternatif fikirler sunarak yeni bir perspektif getiririm."
  ],
  // İş görüşmesi
  "Bir iş görüşmesinde teknik becerilerinin yanı sıra, ne tür bir yönünün öne çıkmasını istersin?": [
    "Yaptığım projelerdeki teknik katkılarım ve çözüm üretme becerim",
    "Takım çalışmaları ve birlikte başarma deneyimlerim",
    "Hızlıca adapte olup çözüm bulma ve duruma göre hareket etme yeteneğim",
    "Farklı bakış açılarıyla projelere yenilikçi dokunuşlar katabilmem"
  ],
  // Sunum
  "Bir teknik konuda sunum yapman gerekse, hangi yaklaşımı benimsersin?": [
    "Konuyu teknik detaylarıyla güçlü bir temelde aktarırım",
    "Dinleyici kitlesine uygun pratik örneklerle konuyu sadeleştiririm",
    "Ana noktaları vurgulayıp zamandan tasarruf sağlayarak etkili sunarım",
    "Görsel destekler ve etkileşimli anlatım teknikleri kullanarak ilgi çekici hale getiririm"
  ],
  // Araştırma
  "Hangi alanda araştırma yapmayı daha ilgi çekici bulursun?": [
    "Günlük hayatı kolaylaştıran teknolojik gelişmeler ve yenilikler",
    "İnsan ilişkileri, iletişim yöntemleri ve kişisel gelişim konuları",
    "Siyasi ve tarihi olayların günümüze yansımaları",
    "Farklı kültürlerin yaşam şekilleri"
  ],
  // Fakülte
  "Fakülten ve bölümün hangi alanla ilişkili?": [
    "Teknik ve mühendislik alanı",
    "Sosyal bilimler alanı",
    "İktisadi, ekonomik alan",
    "Sanat alanı"
  ],
  // Öğrenme 1
  "Yeni bir konuda nasıl öğrenirsin?": [
    "Teorik bilgilerle temeli sağlamlaştırarak ilerlerim.",
    "Ortak çalışmalarla bilgi paylaşımı yaparak öğrenirim.",
    "Deneyimleyerek ve hızlı geri bildirimlerle öğrenirim.",
    "Kendi kendime keşfederek özgün yollar geliştiririm."
  ],
  // Öğrenme 2
  "Yeni bir beceri öğrenirken hangi yöntemi benimsersin?": [
    "Planlı bir süreçle temel kavramları öğrenir, üzerine inşa ederim.",
    "Grup içi deneyimlerle ve etkileşimli yöntemlerle öğrenmeyi tercih ederim.",
    "Deneme-yanılma ile uygulamalı şekilde öğrenirim.",
    "Kendi kendime keşfederek özgün yollar geliştiririm."
  ],
  // Derinlemesine bilgi
  "Bir alan konusunda derinlemesine bilgi edinmen gerekse, nasıl başlarsın?": [
    "Teorik kaynaklardan başlayarak kavramları sağlam temellerle öğrenirim.",
    "Alanında deneyimli insanlarla etkileşim kurarak farklı bakış açıları toplarım.",
    "ChatGPT ve Youtube gibi online içeriklerle konuyu pratik şekilde kavrarım.",
    "Deneyerek ve küçük projeler yaparak bilgi edinmeyi tercih ederim."
  ],
  // Zorlu problem
  "Zorlu bir teknik problemle karşılaştığında nasıl bir yol izlersin?": [
    "Sorunu derinlemesine analiz eder ve çeşitli kaynakları kullanarak ilerlerim.",
    "Farklı görüşleri dinleyerek grup içinde çözüm üretmeyi tercih ederim.",
    "Mevcut durumu hızlıca değerlendirir ve hemen uygulamaya geçerim.",
    "Alışılagelmiş yöntemlerin dışında alternatif yollar araştırırım."
  ],
  // Proje öncelik
  "Bir proje üzerinde çalışırken, öncelik verdiğin şey nedir?": [
    "Teknik doğruluğu ve işin sağlamlığını ön planda tutarım.",
    "Kullanıcı ihtiyaçlarına ve ekip uyumuna dikkat ederim.",
    "İşin zamanında tamamlanması için pratik çözümler geliştiririm.",
    "Projeye özgünlük ve farklı bir bakış açısı katmaya çalışırım."
  ],
  // Bireysel proje
  "Bireysel bir projede en çok hangi yönü önemserdin?": [
    "Teknik detaylara odaklanarak sağlam bir temel oluştururum.",
    "Kullanıcı deneyimini ve pratikliği ön planda tutarım.",
    "Çalışmaları hızlıca tamamlayarak geri bildirim almayı önemserim.",
    "Projeyi kendi yaratıcı tarzımla zenginleştiririm."
  ],
  // Planlama
  "İşlerini nasıl planlarsın?": [
    "Detaylı bir yol haritası oluşturur ve adım adım ilerlerim.",
    "Ekip içi uyumu koruyarak esnek planlar yaparım.",
    "Öncelikleri belirleyip, seri kararlarla süreci yönetirim.",
    "Farklı yöntemleri birleştirerek plan geliştiririm."
  ],
  // Kariyer
  "Kariyer hedeflerin hakkında en çok neyi önemsiyorsun?": [
    "Kendi alanımda güçlü bir uzmanlık geliştirmeyi hedeflerim.",
    "Takım yönetimi ve insanlarla etkili iletişim kurmak benim için önemlidir.",
    "Sürekli değişen ihtiyaçlara hızlı adapte olabilmeyi önceliklerim.",
    "Yeni fikirler üretip farklı alanlarda yaratıcı çözümler bulmak isterim."
  ],
  // Sorun çözme
  "Bir sorunu çözmek için nasıl bir yöntem izlersin?": [
    "Sorunu küçük adımlara bölerek sistemli şekilde ilerlerim.",
    "Çevremden farklı görüşler alarak yeni çözümler üretirim.",
    "Mevcut durumu değerlendirip, hızlı çözümler üretmeye odaklanırım.",
    "Soruna farklı bir perspektiften yaklaşarak yenilikçi yollar ararım."
  ],
  // Çalışma ortamı
  "Çalışırken hangi ortamda daha verimli olursun?": [
    "Sessiz ve düzenli bir ortamda tek başıma çalışmayı tercih ederim.",
    "Takım çalışmasının yoğun olduğu dinamik ortamlarda verimli olurum.",
    "Esnek kuralların olduğu, rahat bir ortamda en iyi performansı gösteririm.",
    "İlham verici ortamlarda daha motive çalışırım."
  ]
};
