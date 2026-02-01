import React from 'react';
import { Instagram, Facebook, Disc, Twitter } from 'lucide-react';

const SocialLinks = ({ className = "" }) => {
  const socialData = [
    { name: 'Instagram', icon: <Instagram size={24} />, url: '你的IG連結', color: 'hover:text-pink-500' },
    { name: 'Facebook', icon: <Facebook size={24} />, url: '你的FB連結', color: 'hover:text-blue-600' },
    { name: 'X', icon: <Twitter size={24} />, url: '你的X連結', color: 'hover:text-gray-400' },
    { name: 'Discord', icon: <Disc size={24} />, url: '你的Discord連結', color: 'hover:text-indigo-500' },
  ];

  return (
    <div className={`flex gap-6 ${className}`}>
      {socialData.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`transition-all duration-300 transform hover:scale-110 ${social.color}`}
          title={social.name}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;