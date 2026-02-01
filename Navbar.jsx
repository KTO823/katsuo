import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: '首頁', path: '/' },
    { name: '獲獎記錄', path: '/awards' },
    { name: 'YouTube', path: '/youtube' },
    { name: '收藏室', path: '/collection' },
    { name: '實習誌', path: '/internship' },
    { name: '當前動態', path: '/now' },
    { name: '留言板', path: '/messages' },
  ];

  // 檢查路徑是否為目前頁面，用於顯示高亮
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* 左側 Logo：增加發光與漸層感 */}
          <Link to="/" className="flex items-center group">
            <div className="text-xl font-black bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(168,85,247,0.4)] tracking-tighter transition-all group-hover:drop-shadow-[0_0_12px_rgba(168,85,247,0.6)]">
              KATSUO.DEV
            </div>
          </Link>

          {/* 中間：電腦版導覽連結 */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? 'text-purple-400 bg-purple-500/10 shadow-[inset_0_0_10px_rgba(168,85,247,0.1)]'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* 右側：語言切換與行動版選單按鈕 */}
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-white/5 border border-white/10 rounded-full px-2 py-1">
              <Globe size={14} className="text-gray-400 mr-1" />
              <button className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-purple-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]">中</button>
              <button className="text-[10px] font-bold px-1.5 py-0.5 text-gray-500 hover:text-gray-300">日</button>
            </div>

            {/* 行動版選單開關 */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-400 hover:text-white p-2 transition-colors"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 行動版下拉選單 */}
      {isOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-b border-purple-900/30 animate-in fade-in slide-in-from-top-5 duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.path)
                    ? 'text-purple-400 bg-purple-500/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;