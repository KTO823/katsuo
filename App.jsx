import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SocialLinks from './components/SocialLinks';
import Awards from './pages/Awards';

// 頁面組件：首頁
const Home = () => (
  <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 relative overflow-hidden">
    {/* 背景發光效果 */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full"></div>
    
    <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter italic text-white">
      HELLO, I'M <span className="text-purple-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">KATSUO</span>
    </h1>
    
    <p className="text-gray-400 text-lg md:text-xl max-w-2xl text-center leading-relaxed mb-10">
      資日專班 跨域開發者 / <span className="text-blue-400">日本實習準備中</span>
    </p>

    <SocialLinks className="gap-8 scale-125" />
  </div>
);

// 預留其他頁面組件
const Awards = () => <div className="p-20 text-center text-white text-3xl font-bold">🏆 獲獎記錄正在準備中...</div>;
const Collection = () => <div className="p-20 text-center text-white text-3xl font-bold">🎮 收藏室正在準備中...</div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#050505] text-gray-100 flex flex-col font-sans">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/awards" element={<Awards />} />
            <Route path="/collection" element={<Collection />} />
            {/* 這裡可以繼續增加其他路由 */}
          </Routes>
        </main>

        <footer className="py-12 border-t border-purple-900/20 bg-[#080808] flex flex-col items-center">
          <SocialLinks className="mb-6 opacity-70 hover:opacity-100 transition-opacity" />
          <p className="text-gray-500 text-xs tracking-widest uppercase">
            © 2026 KATSUO | Built with React & Vite
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;