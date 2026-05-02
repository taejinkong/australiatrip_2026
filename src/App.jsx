import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Plane, Compass, Camera, Coffee, Sun } from 'lucide-react';
import './index.css';

const itineraryData = [
  {
    day: 1,
    title: 'Arrival in Sydney',
    date: 'Dec 10, 2026',
    activities: [
      { time: '10:00 AM', desc: 'Arrive at SYD Airport', icon: <Plane size={18} /> },
      { time: '02:00 PM', desc: 'Check-in at Circular Quay Hotel', icon: <Coffee size={18} /> },
      { time: '05:00 PM', desc: 'Sunset walk at Sydney Opera House', icon: <Camera size={18} /> }
    ]
  },
  {
    day: 2,
    title: 'Explore Sydney & Bondi',
    date: 'Dec 11, 2026',
    activities: [
      { time: '09:00 AM', desc: 'Sydney Harbour Bridge Climb', icon: <Compass size={18} /> },
      { time: '01:00 PM', desc: 'Bondi to Coogee Coastal Walk', icon: <Sun size={18} /> },
      { time: '07:00 PM', desc: 'Dinner at Darling Harbour', icon: <Coffee size={18} /> }
    ]
  },
  {
    day: 3,
    title: 'Fly to Cairns (Great Barrier Reef)',
    date: 'Dec 12, 2026',
    activities: [
      { time: '08:00 AM', desc: 'Flight to Cairns', icon: <Plane size={18} /> },
      { time: '02:00 PM', desc: 'Kuranda Scenic Railway', icon: <Camera size={18} /> },
      { time: '06:00 PM', desc: 'Night Market Exploration', icon: <MapPin size={18} /> }
    ]
  },
  {
    day: 4,
    title: 'Great Barrier Reef Adventure',
    date: 'Dec 13, 2026',
    activities: [
      { time: '08:00 AM', desc: 'Full Day Reef Cruise & Snorkeling', icon: <Sun size={18} /> },
      { time: '05:00 PM', desc: 'Return to Cairns', icon: <Compass size={18} /> },
      { time: '08:00 PM', desc: 'Seafood Dinner', icon: <Coffee size={18} /> }
    ]
  }
];

const placesData = [
  {
    name: 'Sydney Opera House',
    desc: 'The iconic performing arts centre at Sydney Harbour.',
    img: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Great Barrier Reef',
    desc: 'The world\'s largest coral reef system in Queensland.',
    img: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Bondi Beach',
    desc: 'Famous white-sand beach known for surfing and cafes.',
    img: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Uluru',
    desc: 'Massive sandstone monolith in the heart of the Northern Territory.',
    img: 'https://images.unsplash.com/photo-1506041530649-14a0af052213?q=80&w=800&auto=format&fit=crop'
  }
];

function App() {
  const [activeTab, setActiveTab] = useState('itinerary');

  return (
    <div className="app-container">
      {/* Hero Section */}
      <section className="hero-section" style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url("https://images.unsplash.com/photo-1493365313471-c74b1e5a5198?q=80&w=2000&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to bottom, rgba(15,23,42,0.3) 0%, rgba(15,23,42,1) 100%)',
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
            <Compass size={48} color="#38bdf8" />
          </motion.div>
          <h1 style={{ fontSize: '4rem', marginBottom: '16px', letterSpacing: '-1px' }}>
            <span className="text-gradient">Australia</span> Journey
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#cbd5e1', maxWidth: '600px', margin: '0 auto 40px' }}>
            A spectacular 2-week adventure through the Land Down Under. From vibrant cities to ancient rainforests.
          </p>
          
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <button 
              className={`nav-btn ${activeTab === 'itinerary' ? 'active' : ''}`}
              onClick={() => setActiveTab('itinerary')}
              style={navBtnStyle(activeTab === 'itinerary')}
            >
              <Calendar size={20} /> Itinerary
            </button>
            <button 
              className={`nav-btn ${activeTab === 'places' ? 'active' : ''}`}
              onClick={() => setActiveTab('places')}
              style={navBtnStyle(activeTab === 'places')}
            >
              <MapPin size={20} /> Places
            </button>
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <main className="container" style={{ position: 'relative', zIndex: 2, marginTop: '-50px', paddingBottom: '100px' }}>
        <AnimatePresence mode="wait">
          {activeTab === 'itinerary' && (
            <motion.div
              key="itinerary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 style={{ fontSize: '2.5rem', marginBottom: '40px', textAlign: 'center' }}>Trip Itinerary</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {itineraryData.map((day) => (
                  <div key={day.day} className="glass-card" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                    <div style={{ flex: '1 1 200px', borderRight: '1px solid rgba(255,255,255,0.1)', paddingRight: '20px' }}>
                      <h3 style={{ fontSize: '2rem', color: '#38bdf8', marginBottom: '8px' }}>Day {day.day}</h3>
                      <h4 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{day.title}</h4>
                      <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{day.date}</p>
                    </div>
                    <div style={{ flex: '2 1 400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {day.activities.map((act, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(0,0,0,0.2)', padding: '12px 16px', borderRadius: '12px' }}>
                          <div style={{ color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(251,191,36,0.1)', padding: '10px', borderRadius: '50%' }}>
                            {act.icon}
                          </div>
                          <div>
                            <p style={{ fontWeight: '600', marginBottom: '4px' }}>{act.desc}</p>
                            <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{act.time}</p>
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
              <h2 style={{ fontSize: '2.5rem', marginBottom: '40px', textAlign: 'center' }}>Must Visit Places</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                {placesData.map((place, index) => (
                  <motion.div 
                    key={index} 
                    className="glass-card" 
                    style={{ padding: '0', overflow: 'hidden' }}
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
                      <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{place.name}</h3>
                      <p style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>{place.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer style={{ textAlign: 'center', padding: '40px 20px', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '40px', color: '#64748b' }}>
        <p>© 2026 Australia Trip Planner. Made with love for exploring.</p>
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
  border: isActive ? 'none' : '1px solid rgba(255,255,255,0.2)',
  background: isActive ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.05)',
  color: '#fff',
  fontSize: '1rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  backdropFilter: 'blur(10px)',
  boxShadow: isActive ? '0 10px 20px rgba(56, 189, 248, 0.3)' : 'none'
});

export default App;
