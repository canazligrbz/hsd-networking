import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { subscribeToMyEvents, createEvent, logoutUser } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { Plus, Calendar, Users, ArrowRight, LogOut, Zap, Copy, CheckCheck } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [creating, setCreating] = useState(false);
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    if (!user) return;
    const unsub = subscribeToMyEvents(user.uid, setEvents);
    return unsub;
  }, [user]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!eventName.trim()) return;
    setCreating(true);
    try {
      const id = await createEvent(user.uid, { name: eventName, description: eventDesc });
      setShowCreate(false);
      setEventName('');
      setEventDesc('');
      navigate(`/dashboard/${id}`);
    } finally {
      setCreating(false);
    }
  };

  const copyLink = (eventId) => {
    const link = `${window.location.origin}/join/${eventId}`;
    navigator.clipboard.writeText(link);
    setCopied(eventId);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
      {/* HEADER */}
      <div className="flex justify-between items-center header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Zap size={28} color="var(--primary-color)" />
          <div>
            <h1 style={{ fontSize: '1.8rem' }} className="text-gradient">TeamSync AI</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{user?.email}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
            <Plus size={18} /> Yeni Etkinlik
          </button>
          <button className="btn btn-secondary" onClick={logoutUser}>
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {/* CREATE MODAL */}
      {showCreate && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: '20px'
        }}>
          <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '480px' }}>
            <h2 style={{ marginBottom: '24px' }}>Yeni Etkinlik Oluştur</h2>
            <form onSubmit={handleCreate}>
              <div className="input-group">
                <label>Etkinlik Adı *</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Örn: Yazılım Takım Kurma Günü"
                  value={eventName}
                  onChange={e => setEventName(e.target.value)}
                  required autoFocus
                />
              </div>
              <div className="input-group">
                <label>Açıklama (opsiyonel)</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Kısa bir açıklama..."
                  value={eventDesc}
                  onChange={e => setEventDesc(e.target.value)}
                />
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button type="button" className="btn btn-secondary" style={{ flex: 1 }}
                  onClick={() => setShowCreate(false)}>İptal</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={creating}>
                  {creating ? 'Oluşturuluyor...' : 'Oluştur'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EVENTS LIST */}
      {events.length === 0 ? (
        <div className="glass-card flex flex-col items-center justify-center animate-fade-in"
          style={{ padding: '80px 20px', textAlign: 'center', borderStyle: 'dashed', marginTop: '40px' }}>
          <Calendar size={64} color="rgba(255,255,255,0.1)" style={{ marginBottom: '20px' }} />
          <h3 style={{ marginBottom: '8px', color: 'var(--text-secondary)' }}>Henüz etkinlik yok</h3>
          <p style={{ color: 'var(--text-secondary)', opacity: 0.7, marginBottom: '24px' }}>
            İlk etkinliğini oluşturarak başla!
          </p>
          <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
            <Plus size={18} /> Etkinlik Oluştur
          </button>
        </div>
      ) : (
        <div>
          <h2 style={{ marginTop: '40px', marginBottom: '24px', fontSize: '1.4rem' }}>
            Etkinliklerim
            <span style={{ marginLeft: '12px', fontSize: '0.9rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: '20px' }}>
              {events.length} etkinlik
            </span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {events.map(ev => (
              <div key={ev.id} className="glass-card"
                style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '16px' }}
              >
                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '6px' }}>{ev.name}</h3>
                  {ev.description && (
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{ev.description}</p>
                  )}
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '8px' }}>
                    {new Date(ev.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    className="btn btn-secondary"
                    style={{ flex: 1, padding: '10px', fontSize: '0.85rem' }}
                    onClick={() => copyLink(ev.id)}
                  >
                    {copied === ev.id ? <><CheckCheck size={16} /> Kopyalandı!</> : <><Copy size={16} /> Katılım Linki</>}
                  </button>
                  <button
                    className="btn btn-primary"
                    style={{ flex: 1, padding: '10px', fontSize: '0.85rem' }}
                    onClick={() => navigate(`/dashboard/${ev.id}`)}
                  >
                    Yönet <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
