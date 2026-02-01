import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navItems = [
    { name: '首頁', path: '/' },
    { name: '獲獎記錄', path: '/awards' },
    { name: 'YouTube', path: '/youtube' },
    { name: '收藏室', path: '/collection' },
    { name: '實習誌', path: '/internship' },
    { name: '當前動態', path: '/now' },
    { name: '留言板', path: '/messages' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo 或 名稱 */}
        <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Personal Portfolio
        </div>

        {/* 導覽連結 */}
        <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-600">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className="hover:text-blue-600 transition-colors">
              {item.name}
            </Link>
          ))}
        </div>

        {/* 語言切換 (模擬) */}
        <div className="flex items-center gap-2">
          <button className="text-xs px-2 py-1 border rounded hover:bg-gray-50">中</button>
          <button className="text-xs px-2 py-1 border rounded hover:bg-gray-50 text-gray-400">日</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;