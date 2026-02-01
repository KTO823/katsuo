const Home = () => (
  <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 relative overflow-hidden">
    {/* 背景裝飾：深藍色光暈 */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full"></div>
    
    <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter italic">
      HELLO, I'M <span className="text-white">KATSUO</span>
    </h1>
    <p className="text-gray-400 text-lg md:text-xl max-w-2xl text-center leading-relaxed mb-10">
      <span className="text-blue-400 font-mono">資日專班</span> 跨域開發者 / 
      <span className="text-purple-400 font-mono"> 日本實習準備中</span> / 
      動漫愛好者
    </p>
    
    <SocialLinks className="gap-8 scale-125" />
    
    {/* 下方裝飾線 */}
    <div className="mt-20 w-px h-24 bg-gradient-to-b from-purple-500 to-transparent"></div>
  </div>
);