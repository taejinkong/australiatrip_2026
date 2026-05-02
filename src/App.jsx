import React, { useState, useMemo, useCallback } from 'react';
import { Home, Calendar, Ticket, BookOpen, Camera, Plane, MapPin, Navigation, Clock, PlaneTakeoff, PlaneLanding, Bus, Sun, Coffee, Compass } from 'lucide-react';
import { GoogleMap, useJsApiLoader, Marker, Polyline, InfoWindow, TransitLayer } from '@react-google-maps/api';
import './index.css';

const GOOGLE_MAPS_API_KEY = 'AIzaSyAiUWwhKNry_SmyaW4xikE8CeCNqqp3ta0';

const itineraryData = {
  0: {
    day: 0,
    date: '5/4(월)',
    activities: [
      { time: '08:44', title: '출발', desc: '공항버스 탑승 (우등, 좌석 10번)', location: '동탄(호수부영3차)', icon: <Bus size={18} color="#f59e0b" />, iconBg: '#fef3c7', lat: 37.1685, lng: 127.1065 },
      { time: '10:43', title: '도착', desc: '인천공항 제2여객터미널 도착', location: '인천공항T2', icon: <Navigation size={18} color="#10b981" />, iconBg: '#d1fae5', lat: 37.4682, lng: 126.4332 },
      { time: '20:10', title: '출발', desc: '인천공항 출발 (OZ601)', location: '인천공항T2', icon: <PlaneTakeoff size={18} color="#3b82f6" />, iconBg: '#dbeafe', lat: 37.4682, lng: 126.4332 }
    ]
  },
  1: {
    day: 1,
    date: '5/5(화)',
    activities: [
      { time: '07:30', title: '도착', desc: '시드니 공항 도착 입국 수속', location: '시드니 공항', icon: <PlaneLanding size={18} color="#3b82f6" />, iconBg: '#dbeafe', lat: -33.9399, lng: 151.1753 },
      { time: '08:30', title: '픽업', desc: '공항 → 호텔 이동', location: '공항 출구', icon: <Bus size={18} color="#f59e0b" />, iconBg: '#fef3c7', lat: -33.9399, lng: 151.1753 },
      { time: '14:00~', title: '체크인', desc: '파크로얄 달링 하버 리셉션 문의', location: '파크로얄 달링 하버', icon: <Home size={18} color="#8b5cf6" />, iconBg: '#ede9fe', lat: -33.8731, lng: 151.2024 },
      { time: '오후', title: '자유일정', desc: '시드니 시내 관광 및 휴식', location: '시드니 시내', icon: <Sun size={18} color="#ec4899" />, iconBg: '#fce7f3', lat: -33.8688, lng: 151.2093 }
    ]
  },
  2: {
    day: 2,
    date: '5/6(수)',
    activities: [
      { time: '07:15', title: '미팅', desc: '투어 출발 (15분 전 대기)', location: '1-5 Wheat Road', icon: <MapPin size={18} color="#ef4444" />, iconBg: '#fee2e2', lat: -33.8698, lng: 151.2014 },
      { time: '07:30~', title: '패키지', desc: '블루마운틴 & 페더데일 동물원 등', location: '블루마운틴', icon: <Camera size={18} color="#14b8a6" />, iconBg: '#ccfbf1', lat: -33.7177, lng: 150.3121 },
      { time: '16:30', title: '종료', desc: '투어 종료 및 드랍', location: 'Rydges World Square 앞', icon: <Navigation size={18} color="#10b981" />, iconBg: '#d1fae5', lat: -33.8767, lng: 151.2070 },
      { time: '저녁', title: '자유일정', desc: '울월스 쇼핑 또는 저녁 식사', location: '시티 내', icon: <Coffee size={18} color="#8b5cf6" />, iconBg: '#ede9fe', lat: -33.8710, lng: 151.2060 }
    ]
  },
  3: {
    day: 3,
    date: '5/7(목)',
    activities: [
      { time: '10:30', title: '미팅', desc: '오페라하우스 내부 투어 대기', location: 'Lower Concourse', icon: <MapPin size={18} color="#ef4444" />, iconBg: '#fee2e2', lat: -33.8568, lng: 151.2153 },
      { time: '10:45', title: '패키지', desc: '오페라하우스 내부 관람', location: '오페라하우스', icon: <Camera size={18} color="#14b8a6" />, iconBg: '#ccfbf1', lat: -33.8568, lng: 151.2153 },
      { time: '15:50', title: '미팅', desc: '시티 워킹투어 미팅', location: '써큘러키 선착장 6번 앞', icon: <MapPin size={18} color="#ef4444" />, iconBg: '#fee2e2', lat: -33.8617, lng: 151.2109 },
      { time: '오후', title: '패키지', desc: '시드니 시티 선셋 워킹투어', location: '시드니 시티 주요 명소', icon: <Sun size={18} color="#ec4899" />, iconBg: '#fce7f3', lat: -33.8688, lng: 151.2093 }
    ]
  },
  4: {
    day: 4,
    date: '5/8(금)',
    activities: [
      { time: '11:45', title: '미팅', desc: '런치 크루즈 보딩 대기', location: 'Eastern Pontoon', icon: <MapPin size={18} color="#ef4444" />, iconBg: '#fee2e2', lat: -33.8601, lng: 151.2127 },
      { time: '12:30', title: '패키지', desc: '하버 런치 크루즈(뷔페 식사)', location: '시드니 하버', icon: <Coffee size={18} color="#8b5cf6" />, iconBg: '#ede9fe', lat: -33.8566, lng: 151.2144 },
      { time: '14:15', title: '종료', desc: '크루즈 하선 후 이동', location: 'Circular Quay → 보타닉 가든', icon: <Navigation size={18} color="#10b981" />, iconBg: '#d1fae5', lat: -33.8617, lng: 151.2109 },
      { time: '오후', title: '자유일정', desc: '로얄 보타닉 가든 & 시내 관광', location: '로얄 보타닉 가든', icon: <Camera size={18} color="#14b8a6" />, iconBg: '#ccfbf1', lat: -33.8631, lng: 151.2166 }
    ]
  },
  5: {
    day: 5,
    date: '5/9(토)',
    activities: [
      { time: '07:30', title: '드랍', desc: '호텔 앞 공항 이동 서비스', location: '호텔 앞', icon: <Bus size={18} color="#f59e0b" />, iconBg: '#fef3c7', lat: -33.8731, lng: 151.2024 },
      { time: '오전', title: '샌딩', desc: '시드니 공항 도착 후 샌딩', location: '시드니 공항', icon: <PlaneTakeoff size={18} color="#3b82f6" />, iconBg: '#dbeafe', lat: -33.9399, lng: 151.1753 }
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
  const [selectedDay, setSelectedDay] = useState(0);
  const currentData = itineraryData[selectedDay];
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY
  });

  const [map, setMap] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  // Compute map center & bounds based on current activities
  const markers = useMemo(() => {
    // filter out items that don't have valid lat/lng or are duplicates
    const seen = new Set();
    return currentData.activities.filter(act => {
      if (act.lat && act.lng) {
        const key = `${act.lat}-${act.lng}`;
        if (!seen.has(key)) {
          seen.add(key);
          return true;
        }
      }
      return false;
    });
  }, [currentData]);

  const path = markers.map(m => ({ lat: m.lat, lng: m.lng }));
  
  const center = useMemo(() => {
    if (markers.length === 0) return { lat: -33.8688, lng: 151.2093 };
    const lat = markers.reduce((acc, m) => acc + m.lat, 0) / markers.length;
    const lng = markers.reduce((acc, m) => acc + m.lng, 0) / markers.length;
    return { lat, lng };
  }, [markers]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ width: '100%', height: '35vh', backgroundColor: '#e5e7eb', position: 'relative' }}>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={center}
            zoom={markers.length > 1 ? 11 : 14}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              disableDefaultUI: false,
              zoomControl: true,
              mapTypeControl: false,
              streetViewControl: false,
              clickableIcons: true,
            }}
          >
            <TransitLayer />
            {markers.length > 1 && (
              <Polyline
                path={path}
                options={{
                  strokeColor: '#3b82f6',
                  strokeOpacity: 0.8,
                  strokeWeight: 4,
                }}
              />
            )}
            
            {markers.map((marker, index) => (
              <Marker
                key={index}
                position={{ lat: marker.lat, lng: marker.lng }}
                label={{
                  text: `${index + 1}`,
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '12px'
                }}
                onClick={() => setActiveMarker(index)}
              >
                {activeMarker === index && (
                  <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                    <div style={{ padding: '2px', color: '#1f2937' }}>
                      <p style={{ fontWeight: 'bold', fontSize: '12px', margin: 0 }}>{marker.time}</p>
                      <p style={{ margin: 0, fontSize: '11px' }}>{marker.location}</p>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            ))}
          </GoogleMap>
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
            지도 로딩중...
          </div>
        )}
      </div>
      
      <div className="day-selector">
        {[0, 1, 2, 3, 4, 5].map(day => (
          <div 
            key={day}
            className={`day-btn ${selectedDay === day ? 'active' : ''}`}
            onClick={() => {
              setSelectedDay(day);
              setActiveMarker(null);
            }}
          >
            <span className="day-title">Day {day}</span>
            <span className="day-date">{itineraryData[day].date}</span>
          </div>
        ))}
      </div>

      <div style={{ padding: '24px 20px', backgroundColor: '#fff', flex: 1 }}>
        {currentData.activities.map((act, index) => {
          // Find the marker index for this activity to display the point number
          const markerIndex = markers.findIndex(m => m.lat === act.lat && m.lng === act.lng);
          const pointNumber = markerIndex !== -1 ? markerIndex + 1 : null;

          return (
            <div key={index} className="timeline-item">
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ flexShrink: 0, width: '45px', fontSize: '0.85rem', fontWeight: '600', color: '#3b82f6', marginTop: '10px' }}>
                  {act.time}
                </div>
                
                <div style={{ flex: 1, backgroundColor: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '16px', padding: '16px', display: 'flex', gap: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '12px', backgroundColor: act.iconBg, flexShrink: 0 }}>
                    {act.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ backgroundColor: '#eff6ff', color: '#3b82f6', padding: '2px 8px', borderRadius: '6px', fontSize: '0.75rem' }}>{act.title}</span>
                      {act.desc}
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6b7280', fontSize: '0.85rem' }}>
                      <MapPin size={14} color="#9ca3af" /> 
                      {act.location} 
                      {pointNumber && (
                        <span style={{ marginLeft: '6px', backgroundColor: '#ef4444', color: 'white', borderRadius: '50%', width: '16px', height: '16px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>
                          {pointNumber}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
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
      
      {/* Bus Ticket */}
      <div className="ticket-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600' }}>용남익스프레스</span>
            <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#1f2937' }}>공항버스 (우등)</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600' }}>승차홈</span>
            <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#3b82f6' }}>현장확인</div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>동탄</div>
            <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>(호수부영3차)</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#9ca3af' }}>
            <Bus size={24} color="#f59e0b" />
            <span style={{ fontSize: '0.75rem', marginTop: '4px' }}>1:59 소요</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>인천공항</div>
            <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>T2</div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#f9fafb', padding: '12px', borderRadius: '8px' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>출발일시</div>
            <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>2026.05.04 08:44</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>좌석번호</div>
            <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>10 번</div>
          </div>
        </div>
      </div>

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
