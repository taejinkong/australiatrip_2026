import React, { useState } from 'react';
import { Home, Calendar, Ticket, BookOpen, Camera, Plane, MapPin, Navigation, Clock, PlaneTakeoff, PlaneLanding } from 'lucide-react';
import './index.css';

const itineraryData = {
  1: {
    day: 1,
    date: '5/5(화)',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.3087361819665!2d151.17316717654763!3d-33.93992297320005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12b0f11b3382cb%3A0xc6c38f4e24eb37a!2sSydney%20Airport!5e0!3m2!1sen!2skr!4v1700000000000',
    activities: [
      { time: '07:30', title: '도착', desc: '시드니 공항 도착 입국 수속', location: '시드니 공항' },
      { time: '08:30', title: '픽업', desc: '공항 → 호텔 이동 (기사님 카톡 확인)', location: '공항 출구' },
      { time: '14:00~', title: '체크인', desc: '파크로얄 달링 하버 리셉션 문의', location: '파크로얄 달링 하버' },
      { time: '오후', title: '자유일정', desc: '시드니 시내 관광 및 휴식', location: '시드니 시내' }
    ]
  },
  2: {
    day: 2,
    date: '5/6(수)',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3315.659349887752!2d150.31215437654402!3d-33.71772697328405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b126c8b9d8a5ba1%3A0x5017d681632ad40!2sBlue%20Mountains%20National%20Park!5e0!3m2!1sen!2skr!4v1700000000000',
    activities: [
      { time: '07:15', title: '미팅', desc: '투어 출발 (15분 전 대기)', location: '1-5 Wheat Road' },
      { time: '07:30~', title: '패키지', desc: '블루마운틴 & 페더데일 동물원 등', location: '블루마운틴' },
      { time: '16:30', title: '종료', desc: '투어 종료 및 드랍', location: 'Rydges World Square 앞' },
      { time: '저녁', title: '자유일정', desc: '울월스 쇼핑 또는 저녁 식사', location: '시티 내' }
    ]
  },
  3: {
    day: 3,
    date: '5/7(목)',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.964408047913!2d151.2127264765469!3d-33.85678437323136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae665e892fdd%3A0x3133f8d75a1ac251!2sSydney%20Opera%20House!5e0!3m2!1sen!2skr!4v1700000000000',
    activities: [
      { time: '10:30', title: '미팅', desc: '오페라하우스 내부 투어 대기', location: 'Lower Concourse' },
      { time: '10:45', title: '패키지', desc: '오페라하우스 내부 관람', location: '오페라하우스' },
      { time: '15:50', title: '미팅', desc: '시티 워킹투어 미팅', location: '써큘러키 선착장 6번 앞' },
      { time: '오후', title: '패키지', desc: '시드니 시티 선셋 워킹투어', location: '시드니 시티 주요 명소' }
    ]
  },
  4: {
    day: 4,
    date: '5/8(금)',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.8396071490226!2d151.21528657654714!3d-33.86146037323004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae6143c13aeb%3A0x280e7d56e18b0!2sRoyal%20Botanic%20Garden%20Sydney!5e0!3m2!1sen!2skr!4v1700000000000',
    activities: [
      { time: '11:45', title: '미팅', desc: '런치 크루즈 보딩 대기', location: 'Eastern Pontoon' },
      { time: '12:30', title: '패키지', desc: '하버 런치 크루즈(뷔페 식사)', location: '시드니 하버' },
      { time: '14:15', title: '종료', desc: '크루즈 하선 후 이동', location: 'Circular Quay → 보타닉 가든' },
      { time: '오후', title: '자유일정', desc: '로얄 보타닉 가든 & 시내 관광', location: '로얄 보타닉 가든' }
    ]
  },
  5: {
    day: 5,
    date: '5/9(토)',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.3087361819665!2d151.17316717654763!3d-33.93992297320005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12b0f11b3382cb%3A0xc6c38f4e24eb37a!2sSydney%20Airport!5e0!3m2!1sen!2skr!4v1700000000000',
    activities: [
      { time: '07:30', title: '드랍', desc: '호텔 앞 공항 이동 서비스', location: '호텔 앞' },
      { time: '오전', title: '샌딩', desc: '시드니 공항 도착 후 샌딩', location: '시드니 공항' }
    ]
  }
};

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch(activeTab) {
      case 'home':
        return <HomeScreen onNavigate={setActiveTab} />;
      case 'itinerary':
        return <ItineraryScreen />;
      case 'reservation':
        return <ReservationScreen />;
      case 'guide':
        return <PlaceholderScreen title="여행 가이드" icon={<BookOpen size={48} />} />;
      case 'record':
        return <PlaceholderScreen title="여행 기록" icon={<Camera size={48} />} />;
      default:
        return <HomeScreen onNavigate={setActiveTab} />;
    }
  };

  return (
    <>
      <main style={{ flex: 1, overflowY: 'auto', paddingBottom: '70px', backgroundColor: '#f3f4f6' }}>
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '480px',
        backgroundColor: '#ffffff',
        display: 'flex',
        borderTop: '1px solid #e5e7eb',
        paddingBottom: 'env(safe-area-inset-bottom)',
        zIndex: 50
      }}>
        <TabButton icon={<Home />} label="홈" isActive={activeTab === 'home'} onClick={() => setActiveTab('home')} />
        <TabButton icon={<Calendar />} label="일정" isActive={activeTab === 'itinerary'} onClick={() => setActiveTab('itinerary')} />
        <TabButton icon={<Ticket />} label="예약" isActive={activeTab === 'reservation'} onClick={() => setActiveTab('reservation')} />
        <TabButton icon={<BookOpen />} label="가이드" isActive={activeTab === 'guide'} onClick={() => setActiveTab('guide')} />
        <TabButton icon={<Camera />} label="기록" isActive={activeTab === 'record'} onClick={() => setActiveTab('record')} />
      </nav>
    </>
  );
}

function TabButton({ icon, label, isActive, onClick }) {
  return (
    <button className={`tab-button ${isActive ? 'active' : ''}`} onClick={onClick}>
      {React.cloneElement(icon, { size: 22 })}
      <span>{label}</span>
    </button>
  );
}

function HomeScreen({ onNavigate }) {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100%', paddingBottom: '20px' }}>
      <div style={{
        backgroundColor: '#3b82f6',
        padding: '40px 20px',
        borderBottomLeftRadius: '24px',
        borderBottomRightRadius: '24px',
        color: '#fff',
        marginBottom: '20px'
      }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px' }}>호주 시드니 여행 🇦🇺</h1>
        <p style={{ opacity: 0.9 }}>2026.05.04 ~ 05.16 (KIM JIHYUN)</p>
      </div>

      <div style={{ padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <button className="home-menu-btn" onClick={() => onNavigate('itinerary')}>
          <Calendar size={32} />
          <span>일정표</span>
        </button>
        <button className="home-menu-btn" onClick={() => onNavigate('reservation')}>
          <Ticket size={32} />
          <span>예약확인</span>
        </button>
        <button className="home-menu-btn" onClick={() => onNavigate('guide')}>
          <BookOpen size={32} />
          <span>여행가이드</span>
        </button>
        <button className="home-menu-btn" onClick={() => onNavigate('record')}>
          <Camera size={32} />
          <span>여행기록</span>
        </button>
      </div>
    </div>
  );
}

function ItineraryScreen() {
  const [selectedDay, setSelectedDay] = useState(1);
  const currentData = itineraryData[selectedDay];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ width: '100%', height: '30vh', backgroundColor: '#e5e7eb' }}>
        <iframe
          src={currentData.mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Day ${selectedDay} Map`}
        ></iframe>
      </div>
      
      <div className="day-selector">
        {[1, 2, 3, 4, 5].map(day => (
          <div 
            key={day}
            className={`day-btn ${selectedDay === day ? 'active' : ''}`}
            onClick={() => setSelectedDay(day)}
          >
            <span className="day-title">Day {day}</span>
            <span className="day-date">{itineraryData[day].date}</span>
          </div>
        ))}
      </div>

      <div style={{ padding: '24px 20px', backgroundColor: '#fff', flex: 1 }}>
        {currentData.activities.map((act, index) => (
          <div key={index} className="timeline-item">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ flexShrink: 0, width: '45px', fontSize: '0.85rem', fontWeight: '600', color: '#3b82f6', marginTop: '2px' }}>
                {act.time}
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '4px' }}>
                  <span style={{ backgroundColor: '#eff6ff', color: '#3b82f6', padding: '2px 6px', borderRadius: '4px', fontSize: '0.75rem', marginRight: '6px' }}>{act.title}</span>
                  {act.desc}
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6b7280', fontSize: '0.85rem' }}>
                  <MapPin size={14} /> {act.location}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div style={{ textAlign: 'center', padding: '20px', color: '#9ca3af', fontSize: '0.85rem' }}>
          일정의 끝입니다.
        </div>
      </div>
    </div>
  );
}

function ReservationScreen() {
  return (
    <div style={{ padding: '20px', minHeight: '100%', backgroundColor: '#f3f4f6' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '16px', color: '#1f2937' }}>나의 예약 정보</h2>
      
      {/* Flight Ticket 1 */}
      <div className="ticket-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600' }}>ASIANA AIRLINES</span>
            <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#1f2937' }}>OZ601</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600' }}>예약번호</span>
            <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#3b82f6' }}>EEBGXT</div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>ICN</div>
            <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>인천 (Seoul)</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#9ca3af' }}>
            <PlaneTakeoff size={24} color="#3b82f6" />
            <span style={{ fontSize: '0.75rem', marginTop: '4px' }}>10H 20M</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>SYD</div>
            <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>시드니 (Sydney)</div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#f9fafb', padding: '12px', borderRadius: '8px' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>출발일시</div>
            <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>04MAY26 (월) 20:10</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>도착일시</div>
            <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>05MAY26 (화) 07:30</div>
          </div>
        </div>

        <div className="ticket-divider"></div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
          <div><span style={{ color: '#6b7280' }}>승객명:</span> <span style={{ fontWeight: '600' }}>KIM/JIHYUN MS</span></div>
          <div><span style={{ color: '#6b7280' }}>좌석:</span> <span style={{ fontWeight: '600' }}>05E</span></div>
        </div>
      </div>

      {/* Flight Ticket 2 */}
      <div className="ticket-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600' }}>ASIANA AIRLINES</span>
            <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#1f2937' }}>OZ602</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600' }}>예약번호</span>
            <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#3b82f6' }}>DIKMHP</div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>SYD</div>
            <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>시드니 (Sydney)</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#9ca3af' }}>
            <PlaneLanding size={24} color="#3b82f6" />
            <span style={{ fontSize: '0.75rem', marginTop: '4px' }}>10H 30M</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>ICN</div>
            <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>인천 (Seoul)</div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#f9fafb', padding: '12px', borderRadius: '8px' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>출발일시</div>
            <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>16MAY26 (토) 09:30</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>도착일시</div>
            <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>16MAY26 (토) 19:00</div>
          </div>
        </div>

        <div className="ticket-divider"></div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
          <div><span style={{ color: '#6b7280' }}>승객명:</span> <span style={{ fontWeight: '600' }}>KIM/JIHYUN MS</span></div>
          <div><span style={{ color: '#6b7280' }}>좌석:</span> <span style={{ fontWeight: '600' }}>26B</span></div>
        </div>
      </div>
    </div>
  );
}

function PlaceholderScreen({ title, icon }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', color: '#9ca3af' }}>
      <div style={{ marginBottom: '16px', color: '#d1d5db' }}>{icon}</div>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#4b5563' }}>{title}</h2>
      <p style={{ marginTop: '8px', fontSize: '0.9rem' }}>아직 준비 중인 메뉴입니다.</p>
    </div>
  );
}

export default App;
