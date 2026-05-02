import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Plane, Compass, Camera, Coffee, Sun, Navigation, Map } from 'lucide-react';
import './index.css';

const itineraryData = [
  {
    day: 1,
    title: '시드니 도착 및 휴식',
    date: '5/5(화)',
    activities: [
      { time: '07:30', desc: '시드니 공항 도착 입국 수속 (준비물: 여권, 입국신고서)', location: '시드니 공항', icon: <Plane size={18} /> },
      { time: '08:30', desc: '공항 → 호텔 이동 (기사님 카톡 확인)', location: '공항 출구', icon: <Navigation size={18} /> },
      { time: '14:00~', desc: '파크로얄 달링 하버 리셉션 문의 (얼리 체크인)', location: '파크로얄 달링 하버', icon: <Coffee size={18} /> },
      { time: '오후', desc: '시드니 시내 관광 및 휴식, 개인 자유 시간 (선크림, 모자 등)', location: '시드니 시내', icon: <Sun size={18} /> }
    ]
  },
  {
    day: 2,
    title: '블루마운틴 투어',
    date: '5/6(수)',
    activities: [
      { time: '07:15', desc: '투어 출발 (15분 전 대기)', location: '1-5 Wheat Road (수족관 옆)', icon: <Compass size={18} /> },
      { time: '07:30~', desc: '블루마운틴 & 페더데일 동물원, 시닉월드 3종, 동물 먹이 체험', location: '블루마운틴', icon: <Camera size={18} /> },
      { time: '16:30', desc: '투어 종료 및 드랍', location: 'Rydges World Square 앞', icon: <Navigation size={18} /> },
      { time: '저녁', desc: '울월스 쇼핑 또는 저녁 식사', location: '시티 내 울월스 또는 식당', icon: <Coffee size={18} /> }
    ]
  },
  {
    day: 3,
    title: '오페라하우스 및 시티 워킹',
    date: '5/7(목)',
    activities: [
      { time: '10:30', desc: '오페라하우스 내부 투어 대기', location: 'Lower Concourse 투어 데스크', icon: <MapPin size={18} /> },
      { time: '10:45', desc: '오페라하우스 내부 관람 (30분 소요)', location: '오페라하우스 내부', icon: <Camera size={18} /> },
      { time: '15:50', desc: '시티 워킹투어 미팅 (물, 편한 신발)', location: '써큘러키 선착장 6번 앞', icon: <Compass size={18} /> },
      { time: '오후', desc: '시드니 시티 선셋 워킹투어 (오팔카드 지참)', location: '시드니 시티 주요 명소', icon: <Sun size={18} /> }
    ]
  },
  {
    day: 4,
    title: '하버 런치 크루즈',
    date: '5/8(금)',
    activities: [
      { time: '11:45', desc: '런치 크루즈 보딩 대기', location: 'Eastern Pontoon, Circular Quay', icon: <MapPin size={18} /> },
      { time: '12:30', desc: '하버 런치 크루즈 (뷔페 식사)', location: '시드니 하버', icon: <Coffee size={18} /> },
      { time: '14:15', desc: '크루즈 하선 후 이동, 보타닉 가든 방향 산책', location: 'Circular Quay → 보타닉 가든', icon: <Navigation size={18} /> },
      { time: '오후', desc: '로얄 보타닉 가든 & 시내 관광 (가이드 미동반)', location: '로얄 보타닉 가든 & 시내', icon: <Camera size={18} /> }
    ]
  },
  {
    day: 5,
    title: '시드니 출발',
    date: '5/9(토)',
    activities: [
      { time: '07:30', desc: '호텔 앞 공항 이동 서비스', location: '호텔 앞', icon: <Navigation size={18} /> },
      { time: '오전', desc: '시드니 공항 도착 후 샌딩', location: '시드니 공항', icon: <Plane size={18} /> }
    ]
  }
];

const placesData = [
  {
    name: 'Sydney Opera House',
    desc: '시드니의 상징이자 필수 방문 코스인 오페라하우스.',
    img: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Blue Mountains',
    desc: '푸른 빛의 신비로운 숲, 페더데일 동물원과 시닉월드를 경험하세요.',
    img: 'https://images.unsplash.com/photo-1549487771-482a0dcb866a?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Sydney Harbour',
    desc: '아름다운 시드니 하버를 크루즈에서 뷔페와 함께 즐겨보세요.',
    img: 'https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Royal Botanic Garden',
    desc: '여유로운 산책과 함께 시드니 시내의 전경을 감상할 수 있는 보타닉 가든.',
    img: 'https://images.unsplash.com/photo-1557002778-577edbcaee2e?q=80&w=800&auto=format&fit=crop'
  }
];

function App() {
  const [activeTab, setActiveTab] = useState('itinerary');

  return (
    <div className="app-container">
      {/* Hero Section */}
      <section className="hero-section" style={{
        minHeight: '80vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url("https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2000&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to bottom, rgba(248,250,252,0.4) 0%, rgba(248,250,252,1) 100%)',
          zIndex: 1
        }}></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 20px' }}
        >
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            style={{ marginBottom: '20px', display: 'inline-block' }}
          >
            <Map size={48} color="#0ea5e9" />
          </motion.div>
          <h1 style={{ fontSize: '4rem', marginBottom: '16px', letterSpacing: '-1px', color: '#1e293b' }}>
            <span className="text-gradient">Sydney</span> Journey
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#475569', maxWidth: '600px', margin: '0 auto 40px', fontWeight: '500' }}>
            한눈에 보는 시드니 여행 계획 🇦🇺
          </p>
          
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <button 
              className={`nav-btn ${activeTab === 'itinerary' ? 'active' : ''}`}
              onClick={() => setActiveTab('itinerary')}
              style={navBtnStyle(activeTab === 'itinerary')}
            >
              <Calendar size={20} /> 일정표
            </button>
            <button 
              className={`nav-btn ${activeTab === 'places' ? 'active' : ''}`}
              onClick={() => setActiveTab('places')}
              style={navBtnStyle(activeTab === 'places')}
            >
              <MapPin size={20} /> 핫플레이스
            </button>
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <main className="container" style={{ position: 'relative', zIndex: 2, marginTop: '-30px', paddingBottom: '100px' }}>
        <AnimatePresence mode="wait">
          {activeTab === 'itinerary' && (
            <motion.div
              key="itinerary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 style={{ fontSize: '2.5rem', marginBottom: '40px', textAlign: 'center', color: '#1e293b' }}>전체 일정표</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {itineraryData.map((day) => (
                  <div key={day.day} className="glass-card" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                    <div style={{ flex: '1 1 200px', borderRight: '1px solid rgba(0,0,0,0.1)', paddingRight: '20px' }}>
                      <h3 style={{ fontSize: '2rem', color: '#0ea5e9', marginBottom: '8px' }}>{day.day}일차</h3>
                      <h4 style={{ fontSize: '1.2rem', marginBottom: '8px', color: '#334155' }}>{day.title}</h4>
                      <p style={{ color: '#64748b', fontSize: '0.95rem', fontWeight: '500' }}>{day.date}</p>
                    </div>
                    <div style={{ flex: '2 1 400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {day.activities.map((act, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(241,245,249,0.7)', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(226,232,240,0.8)' }}>
                          <div style={{ color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(245,158,11,0.15)', padding: '10px', borderRadius: '50%' }}>
                            {act.icon}
                          </div>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontWeight: '600', marginBottom: '4px', color: '#334155' }}>{act.desc}</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <span style={{ color: '#0ea5e9', fontSize: '0.85rem', fontWeight: 'bold' }}>{act.time}</span>
                              <span style={{ color: '#64748b', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <MapPin size={12} /> {act.location}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'places' && (
            <motion.div
              key="places"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 style={{ fontSize: '2.5rem', marginBottom: '40px', textAlign: 'center', color: '#1e293b' }}>추천 여행지</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                {placesData.map((place, index) => (
                  <motion.div 
                    key={index} 
                    className="glass-card" 
                    style={{ padding: '0', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}
                    whileHover={{ y: -10 }}
                  >
                    <div style={{ height: '200px', overflow: 'hidden' }}>
                      <img 
                        src={place.img} 
                        alt={place.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                        className="place-img"
                      />
                    </div>
                    <div style={{ padding: '24px' }}>
                      <h3 style={{ fontSize: '1.5rem', marginBottom: '12px', color: '#334155' }}>{place.name}</h3>
                      <p style={{ color: '#64748b', fontSize: '0.95rem' }}>{place.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer style={{ textAlign: 'center', padding: '40px 20px', borderTop: '1px solid rgba(0,0,0,0.05)', marginTop: '40px', color: '#94a3b8' }}>
        <p>© 2026 Sydney Trip Planner. Enjoy your journey!</p>
      </footer>
    </div>
  );
}

const navBtnStyle = (isActive) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '12px 24px',
  borderRadius: '30px',
  border: isActive ? 'none' : '1px solid rgba(0,0,0,0.1)',
  background: isActive ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.8)',
  color: isActive ? '#fff' : '#475569',
  fontSize: '1rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  backdropFilter: 'blur(10px)',
  boxShadow: isActive ? '0 10px 20px rgba(14, 165, 233, 0.3)' : '0 2px 4px rgba(0,0,0,0.05)'
});

export default App;
