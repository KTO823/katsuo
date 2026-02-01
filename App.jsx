import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // 改用 HashRouter
import Navbar from './components/Navbar';
import SocialLinks from './components/SocialLinks';

// 預留頁面組件
const Home = () => (
  <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 relative overflow-hidden">
    <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter italic text-white">
      HELLO, I'M <span className="text-purple-500">KATSUO</span>
    </h1>
    <SocialLinks className="gap-8 scale-125" />
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#050505] flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* 之後可以在此加入 Awards, Collection 等路由 */}
          </Routes>
        </main>
        <footer className="py-8 border-t border-purple-900/30 flex flex-col items-center">
          <SocialLinks className="mb-4" />
          <p className="text-gray-400 text-sm">© 2026 Built with React & Vite</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;