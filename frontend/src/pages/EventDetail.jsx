import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { subscribeToParticipants, clearParticipants, getEvent } from '../firebase';
import { Users, Zap, Trash2, Loader2, ArrowLeft, Copy, CheckCheck } from 'lucide-react';

export default function EventDetail() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [teamSize, setTeamSize] = useState(4);
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getEvent(eventId).then(setEvent);
    const unsub = subscribeToParticipants(eventId, setParticipants);
    return unsub;
  }, [eventId]);

  const joinLink = `${window.location.origin}/join/${eventId}`;

  const copyLink = () => {
    navigator.clipboard.writeText(joinLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCreateTeams = async () => {
    if (participants.length < teamSize) {
      setError(`En az ${teamSize} katılımcı gereklidir.`);
      return;
    }
    setIsLoading(true);
    setError(null);
    setTeams([]);
    try {
      const response = await axios.post('/api/match_teams', {
        team_size: parseInt(teamSize),
        participants
      });
      if (response.data.error) setError(response.data.error);
      else setTeams(response.data.teams);
    } catch (err) {
      setError('Algoritma sunucusuna bağlanılamadı.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = async () => {
    if (window.confirm('Tüm katılımcı verileri silinecek. Emin misiniz?')) {
      await clearParticipants(eventId);
      setTeams([]);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '32px', paddingBottom: '60px' }}>
      {/* BACK + HEADER */}
      <button className="btn btn-secondary" style={{ marginBottom: '24px', padding: '8px 16px', fontSize: '0.9rem' }}
        onClick={() => navigate('/dashboard')}>
        <ArrowLeft size={16} /> Etkinliklerim
      </button>

      <div className="flex justify-between items-center header" style={{ flexWrap: 'wrap', gap: '20px' }}>
        <div style={{ minWidth: '240px' }}>
          <h1 className="text-gradient" style={{ fontSize: 'clamp(1.6rem, 5vw, 2.2rem)' }}>{event?.name || '...'}</h1>
          {event?.description && <p style={{ color: 'var(--text-secondary)', marginTop: '4px', fontSize: '0.9rem' }}>{event.description}</p>}
        </div>
        <div style={{ display: 'flex', gap: '8px', width: window.innerWidth < 640 ? '100%' : 'auto', flexWrap: 'wrap' }}>
          <button className="btn btn-secondary" style={{ flex: 1, fontSize: '0.85rem' }} onClick={copyLink}>
            {copied ? <><CheckCheck size={16} /> Kopyalandı!</> : <><Copy size={16} /> Katılım Linki</>}
          </button>
          <button className="btn btn-secondary" style={{ width: 'auto', fontSize: '0.85rem' }} onClick={handleClear} disabled={participants.length === 0}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* LINK BANNER */}
      <div className="glass-card" style={{ marginBottom: '24px', padding: '16px 20px', background: 'rgba(99,102,241,0.08)', borderColor: 'rgba(99,102,241,0.3)' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '4px' }}>Katılımcılara paylaşılacak link:</p>
        <p style={{ fontFamily: 'monospace', color: '#a5b4fc', fontSize: '0.9rem', wordBreak: 'break-all' }}>{joinLink}</p>
      </div>

      {/* STATS */}
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', marginBottom: '32px', gap: '16px' }}>
        <div className="glass-card stat-card flex flex-row items-center justify-between" style={{ padding: '20px' }}>
          <div>
            <div className="stat-label" style={{ fontSize: '0.75rem' }}>Bağlı Katılımcı</div>
            <div className="stat-value text-gradient" style={{ fontSize: '2rem' }}>{participants.length}</div>
          </div>
          <Users size={40} color="rgba(0,201,255,0.15)" />
        </div>

        <div className="glass-card flex flex-col justify-between" style={{ padding: '20px' }}>
          <div className="stat-label" style={{ fontSize: '0.75rem' }}>Takım Büyüklüğü</div>
          <div className="flex items-center" style={{ gap: '12px', marginTop: '8px' }}>
            <input type="range" min="2" max="10" value={teamSize}
              onChange={e => setTeamSize(e.target.value)}
              style={{ flex: 1, accentColor: 'var(--primary-color)' }} />
            <span style={{ fontSize: '1.2rem', fontWeight: 700, minWidth: '60px', textAlign: 'right' }}>{teamSize} Kişi</span>
          </div>
        </div>

        <div className="glass-card flex items-center justify-center" style={{ padding: '16px' }}>
          <button className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
            onClick={handleCreateTeams} disabled={isLoading || participants.length === 0}>
            {isLoading
              ? <><Loader2 className="animate-spin" size={20} /> Bekleyin...</>
              : <><Zap size={20} /> Ekipleri Kur</>}
          </button>
        </div>
      </div>

      {error && (
        <div className="glass-card" style={{ borderLeft: '4px solid #ef4444', marginBottom: '24px', background: 'rgba(239,68,68,0.1)' }}>
          <p style={{ color: '#fca5a5' }}>{error}</p>
        </div>
      )}

      {/* TEAMS */}
      {teams.length > 0 && (
        <div className="animate-fade-in">
          <h2 style={{ marginBottom: '20px', fontSize: '1.6rem' }} className="flex items-center">
            <span className="text-gradient">Oluşturulan Takımlar</span>
            <span style={{ fontSize: '0.9rem', marginLeft: '12px', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: '20px' }}>
              {teams.length} Takım
            </span>
          </h2>
          <div className="team-grid">
            {teams.map(team => (
              <div key={team.team_id} className="glass-card team-card">
                <div className="team-header flex justify-between items-center">
                  <span>Takım {team.team_id}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{team.members.length} Üye</span>
                </div>
                {team.members.map((member, idx) => {
                  const pData = participants.find(p => String(p.id) === String(member.id));
                  const name = pData?.name || `Üye ${member.id}`;
                  const clusterCls =
                    member.cluster === 'Analitik' ? 'badge-analitik' :
                    member.cluster === 'Empatik' ? 'badge-empatik' :
                    member.cluster === 'Karar Verici' ? 'badge-kararverici' : 'badge-yenilikci';
                  return (
                    <div key={idx} className="team-member">
                      <div className="flex items-center" style={{ gap: '10px' }}>
                        <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          {idx + 1}
                        </div>
                        <span style={{ fontWeight: 500 }}>{name}</span>
                      </div>
                      <span className={`badge ${clusterCls}`}>{member.cluster}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PARTICIPANTS LIST */}
      {participants.length > 0 && teams.length === 0 && (
        <div className="glass-card animate-fade-in" style={{ marginTop: '8px' }}>
          <h3 style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>Katılımcılar</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {participants.map(p => (
              <div key={p.id} style={{ background: 'rgba(255,255,255,0.05)', padding: '8px 14px', borderRadius: '8px', fontSize: '0.9rem' }}>
                {p.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
