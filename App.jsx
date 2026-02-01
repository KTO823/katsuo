import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SocialLinks from './components/SocialLinks';

// 預留頁面組件
const Home = () => <div className="p-10 text-center text-2xl font-bold">歡迎來到首頁 <SocialLinks className="justify-center mt-10" /></div>;
const Awards = () => <div className="p-10 text-center">🏆 獲獎記錄頁面</div>;
const Collection = () => <div className="p-10 text-center">🎨 收藏室頁面</div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        
        {/* 頁面內容區 */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/awards" element={<Awards />} />
            <Route path="/collection" element={<Collection />} />
            {/* 其他路由可以在此繼續添加 */}
          </Routes>
        </main>

        {/* 全站統一 Footer */}
        <footer className="py-8 bg-white border-t border-gray-100 flex flex-col items-center">
          <SocialLinks className="mb-4" />
          <p className="text-gray-400 text-sm">© 2026 Built with React & Vite</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;