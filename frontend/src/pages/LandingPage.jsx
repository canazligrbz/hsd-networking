import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, BarChart2, Shield, ArrowRight, CheckCircle2,
  GitBranch, Cpu, Shuffle, Link2, ArrowUpRight, ChevronDown
} from 'lucide-react';

/* ── Custom Logo ─────────────────────────────────────── */
const Logo = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="8"  r="4"   fill="#6366f1" />
    <circle cx="6"  cy="24" r="3.5" fill="#00c9ff" />
    <circle cx="26" cy="24" r="3.5" fill="#92fe9d" />
    <line x1="16" y1="12" x2="6"  y2="21" stroke="rgba(99,102,241,0.7)" strokeWidth="1.5"/>
    <line x1="16" y1="12" x2="26" y2="21" stroke="rgba(99,102,241,0.7)" strokeWidth="1.5"/>
    <line x1="10" y1="24" x2="22" y2="24" stroke="rgba(99,102,241,0.5)" strokeWidth="1.5"/>
  </svg>
);

/* ── Data ─────────────────────────────────────────────── */
const features = [
  { icon: <Users size={26} color="#00c9ff" />,     title: 'Akıllı Eşleştirme',     desc: 'Teknik beceri ve kişilik profillerini birleştirerek dengeli takımlar kurar.' },
  { icon: <BarChart2 size={26} color="#92fe9d" />, title: 'Gerçek Zamanlı Anket',  desc: 'Katılımcılar telefondan doldurur, moderatör ekranına anında yansır.' },
  { icon: <Shield size={26} color="#a78bfa" />,    title: 'Güvenli & İzole',        desc: 'Her IK kullanıcısının etkinlikleri ve verileri tamamen ayrı tutulur.' },
];

const algorithmSteps = [
  {
    icon: <BarChart2 size={32} color="#6366f1" />,
    title: '1. Kişilik Profili Çıkarma',
    detail: '19 soruluk anket; her seçenek 4 karakterden birine karşılık gelir: Analitik, Empatik, Karar Verici, Yenilikçi. En çok tekrarlanan tip katılımcının profili olarak atanır.',
    tag: 'Kişilik Modeli'
  },
  {
    icon: <Cpu size={32} color="#00c9ff" />,
    title: '2. Kosinüs Benzerliği',
    detail: 'Her katılımcı cevapları bir sayısal vektöre dönüştürülür. Teknik sorularda benzer vektörler bir araya gelirken; sosyal sorularda farklı vektörler bilinçli olarak eşleştirilir.',
    tag: 'Doğal Dil İşleme'
  },
  {
    icon: <GitBranch size={32} color="#92fe9d" />,
    title: '3. Tamamlayıcılık Matrisi',
    detail: 'Analitik+Yenilikçi, Karar Verici+Empatik gibi sinerjik çiftler bir uyum matrisinde tanımlıdır. Algoritma, her takımda bu farklılıkları maksimize etmeye çalışır.',
    tag: 'Takım Teorisi'
  },
  {
    icon: <Shuffle size={32} color="#fbbf24" />,
    title: '4. Greedy Matching',
    detail: 'İlk kişiyi al, uyum puanı en yüksek kişiyi ekle. Takım dolana kadar devam et. Tüm takımlar dolana kadar tekrarla. O(n log n) zaman karmaşıklığı.',
    tag: 'Algoritma'
  },
];

const useCases = [
  { emoji: '💻', title: 'Hackathon',       desc: 'Farklı teknik profillerden oluşan dengeli takımlarla rekabeti artır.' },
  { emoji: '🎓', title: 'Bootcamp',        desc: 'Öğrencileri güçlü yönlerine göre gruplayan ekip dengeleme.' },
  { emoji: '🏢', title: 'Kurumsal Etkinlik', desc: 'IK günleri, workshop ve takım kurma etkinlikleri için.' },
  { emoji: '🔬', title: 'Akademik Proje',  desc: 'Üniversite dersleri ve araştırma projeleri için veri destekli gruplandırma.' },
];

const team = [
  {
    name: 'Ömer Semih Uzun',
    initials: 'ÖS',
    color: '#6366f1',
    linkedin: 'https://www.linkedin.com/in/omer-semih-uzun/',
    github: 'https://github.com/omersemihuzun',
  },
  {
    name: 'Ayşe Nur Çetin',
    initials: 'AÇ',
    color: '#00c9ff',
    linkedin: 'https://www.linkedin.com/in/ay%C5%9Fe-nur-%C3%A7etin-9577782aa/',
    github: 'https://github.com/aysenrctn',
  },
  {
    name: 'Nazlı Can Gürbüz',
    initials: 'NG',
    color: '#92fe9d',
    linkedin: 'https://www.linkedin.com/in/nazl%C4%B1-can-g%C3%BCrb%C3%BCz-14500531b/',
    github: 'https://github.com/canazligrbz',
  },
];

/* ── Component ────────────────────────────────────────── */
export default function LandingPage() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('');

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
  };

  const navLinkStyle = (id) => ({
    background: 'none', border: 'none', cursor: 'pointer',
    color: activeSection === id ? 'white' : 'var(--text-secondary)',
    fontSize: '0.9rem', fontWeight: activeSection === id ? 600 : 400,
    padding: '6px 4px', transition: 'color 0.2s',
  });

  return (
    <div style={{ minHeight: '100vh' }}>

      {/* ── NAV ──────────────────────────────────────── */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '14px 20px', borderBottom: '1px solid var(--border-color)',
        backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(15,17,26,0.85)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Logo size={24} />
          <span style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.3px' }}>TeamSync</span>
        </div>

        <div className="desktop-only" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <button style={navLinkStyle('nasil')} onClick={() => scrollTo('nasil')}>Nasıl Çalışır</button>
          <button style={navLinkStyle('algoritma')} onClick={() => scrollTo('algoritma')}>Algoritma</button>
          <button style={navLinkStyle('kullanim')} onClick={() => scrollTo('kullanim')}>Kullanım</button>
          <button style={navLinkStyle('ekip')} onClick={() => scrollTo('ekip')}>Ekip</button>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary desktop-only" style={{ padding: '6px 14px', fontSize: '0.85rem', width: 'auto' }}
            onClick={() => navigate('/login')}>Giriş</button>
          <button className="btn btn-primary" style={{ padding: '6px 14px', fontSize: '0.85rem', width: 'auto' }}
            onClick={() => navigate('/login?tab=register')}>Başla</button>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────── */}
      <div style={{ textAlign: 'center', padding: '60px 20px 40px', maxWidth: '820px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
          {['Bootcamp', 'Hackathon', 'Kurumsal'].map(tag => (
            <span key={tag} style={{
              padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem',
              background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)',
              color: '#a5b4fc'
            }}>{tag}</span>
          ))}
        </div>

        <h1 style={{ fontSize: 'clamp(2.2rem, 8vw, 4rem)', lineHeight: 1.1, marginBottom: '20px' }}>
          <span className="text-gradient">Doğru Kişi,</span><br />Doğru Takım
        </h1>

        <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1rem, 4vw, 1.15rem)', lineHeight: 1.6, marginBottom: '32px', maxWidth: '620px', margin: '0 auto 32px' }}>
          Her katılımcının profili analiz edilir, birbirini tamamlayan
          karakterler bir araya getirilir — her seferinde dengeli, üretken gruplar.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', flexDirection: window.innerWidth < 640 ? 'column' : 'row' }}>
          <button className="btn btn-primary" style={{ padding: '12px 28px', fontSize: '1rem' }}
            onClick={() => navigate('/login?tab=register')}>
            Hemen Başla <ArrowRight size={18} />
          </button>
          <button className="btn btn-secondary" style={{ padding: '12px 28px', fontSize: '1rem' }}
            onClick={() => scrollTo('algoritma')}>
            Algoritma <ChevronDown size={18} />
          </button>
        </div>

        <div style={{ marginTop: '32px', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {['Ücretsiz', 'Kurulum yok'].map(t => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
              <CheckCircle2 size={14} color="#92fe9d" /> {t}
            </div>
          ))}
        </div>
      </div>

      {/* ── NASIL ÇALIŞIR ────────────────────────────── */}
      <div id="nasil" style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 20px 60px' }}>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.5rem, 5vw, 2rem)', marginBottom: '12px' }}>
          <span className="text-gradient">4 Adımda</span> Hazır
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '0.9rem' }}>
          Hesap aç, etkinliği oluştur, linki paylaş, takımları kur.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '20px' }}>
          {[
            { n: '01', t: 'Hesap Oluştur', d: 'IK olarak kayıt ol, saniyeler içinde paneline eriş.' },
            { n: '02', t: 'Etkinlik Aç', d: 'Etkinlik adı gir, benzersiz katılım linki otomatik oluşur.' },
            { n: '03', t: 'Linki Paylaş', d: 'Katılımcılar anketi kendi telefonlarından doldurur.' },
            { n: '04', t: 'Takımları Kur', d: 'Tek tıkla dengeli takımları oluştur ve ilan et.' },
          ].map(s => (
            <div key={s.n} style={{ textAlign: 'center' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%', margin: '0 auto 12px',
                background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem', fontWeight: 700, boxShadow: '0 4px 15px rgba(99,102,241,0.3)'
              }}>{s.n}</div>
              <h3 style={{ marginBottom: '6px', fontSize: '0.95rem' }}>{s.t}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.5 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── ALGORİTMA ────────────────────────────────── */}
      <div id="algoritma" style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px 60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)', color: '#a5b4fc' }}>
            Bilimsel Altyapı
          </span>
          <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', marginTop: '12px', marginBottom: '12px' }}>
            Nasıl <span className="text-gradient">Çalışır?</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.6, fontSize: '0.9rem' }}>
            Akademik araştırma ve psikoloji teorilerine dayanan 4 aşamalı
            eşleştirme motoru her takımda farklı düşünce tarzlarını bir araya getirir.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {algorithmSteps.map(a => (
            <div key={a.title} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(255,255,255,0.05)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {a.icon}
                </div>
                <span style={{ fontSize: '0.65rem', padding: '3px 8px', borderRadius: '10px', background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', whiteSpace: 'nowrap' }}>
                  {a.tag}
                </span>
              </div>
              <h3 style={{ fontSize: '0.95rem', lineHeight: 1.3 }}>{a.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, flexGrow: 1 }}>{a.detail}</p>
            </div>
          ))}
        </div>

        {/* Karakter Tipleri */}
        <div style={{ marginTop: '40px' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '20px', color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            4 Karakter Tipi
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
            {[
              { t: 'Analitik', d: 'Sebep-sonuç odaklı, planlı, sorgulayıcı', c: '#6366f1' },
              { t: 'Empatik', d: 'Uyumlu, uzlaşmacı, takım odaklı', c: '#00c9ff' },
              { t: 'Karar Verici', d: 'Hızlı, liderlik eden, sonuç odaklı', c: '#fbbf24' },
              { t: 'Yenilikçi', d: 'Özgün, sezgisel, sistem dışı düşünen', c: '#92fe9d' },
            ].map(k => (
              <div key={k.t} className="glass-card" style={{ padding: '14px', borderLeft: `3px solid ${k.c}` }}>
                <h4 style={{ color: k.c, marginBottom: '4px', fontSize: '0.9rem' }}>{k.t}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.4 }}>{k.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── KULLANIM ALANLARI ─────────────────────────── */}
      <div id="kullanim" style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px 60px' }}>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.5rem, 5vw, 2rem)', marginBottom: '12px' }}>
          Her Etkinliğe <span className="text-gradient">Uygun</span>
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '0.9rem' }}>
          Bootcamp'ten hackathon'a, kurumsal etkinlikten akademik projeye.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {useCases.map(u => (
            <div key={u.title} className="glass-card" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '10px', padding: '24px' }}>
              <div style={{ fontSize: '2.5rem' }}>{u.emoji}</div>
              <h3 style={{ fontSize: '1rem' }}>{u.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5 }}>{u.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── EKİP ─────────────────────────────────────── */}
      <div id="ekip" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px 60px' }}>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.5rem, 5vw, 2rem)', marginBottom: '12px' }}>
          <span className="text-gradient">Geliştirici</span> Ekibi
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '0.9rem' }}>
          Bu proje üç kişilik bir ekip tarafından geliştirildi.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {team.map(m => (
            <div key={m.name} className="glass-card" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', padding: '20px' }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%',
                background: `linear-gradient(135deg, ${m.color}33, ${m.color}66)`,
                border: `2px solid ${m.color}55`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.2rem', fontWeight: 700, color: m.color,
              }}>
                {m.initials}
              </div>
              <div>
                <h3 style={{ fontSize: '0.95rem', marginBottom: '8px' }}>{m.name}</h3>
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                <a href={m.linkedin} target="_blank" rel="noopener noreferrer"
                  style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', textDecoration: 'none' }}>
                  <Link2 size={14} /> LinkedIn
                </a>
                <a href={m.github} target="_blank" rel="noopener noreferrer"
                  style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', textDecoration: 'none' }}>
                  <ArrowUpRight size={14} /> GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ──────────────────────────────────────── */}
      <div style={{ textAlign: 'center', padding: '20px 20px 60px' }}>
        <div className="glass-card" style={{ maxWidth: '580px', margin: '0 auto', padding: '32px 24px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>
            Hemen <span className="text-gradient">Ücretsiz</span> Başla
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.5, fontSize: '0.9rem' }}>
            Kredi kartı gerekmez. Dakikalar içinde ilk etkinliğini oluştur.
          </p>
          <button className="btn btn-primary" style={{ padding: '12px 32px', fontSize: '1rem' }}
            onClick={() => navigate('/login?tab=register')}>
            Ücretsiz Başla <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* ── FOOTER ───────────────────────────────────── */}
      <div style={{ textAlign: 'center', padding: '20px', borderTop: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.75rem', display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <span>TeamSync © 2025</span>
        <span className="desktop-only">·</span>
        <span style={{ width: '100%', display: window.innerWidth < 640 ? 'block' : 'none' }}></span>
        <span>Ömer Semih Uzun · Ayşenur Çetin · Nazlıcan Gürbüz</span>
      </div>
    </div>
  );
}
