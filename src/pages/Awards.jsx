import React from 'react';

const Awards = () => {
  const awardList = [
    {
      year: '2025',
      title: '某某資訊競賽',
      rank: '第一名',
      desc: '運用 Python 進行數據分析與 AI 模型訓練。',
      tags: ['Python', 'Machine Learning']
    },
    {
      year: '2024',
      title: '日語朗讀比賽',
      rank: '優等',
      desc: '展現流利的日語表達能力與商務禮儀。',
      tags: ['Japanese', 'JLPT']
    },
    // 你可以在這裡繼續增加內容
  ];

  return (
    <div className="min-h-screen bg-[#050505] py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 標題區 */}
        <div className="mb-16">
          <h2 className="text-4xl font-black text-white italic tracking-tighter">
            AWARDS <span className="text-purple-500">&</span> HONORS
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mt-2"></div>
        </div>

        {/* 時間軸清單 */}
        <div className="space-y-12">
          {awardList.map((award, index) => (
            <div key={index} className="group relative pl-8 border-l border-purple-900/30">
              {/* 發光圓點 */}
              <div className="absolute -left-1.5 top-2 w-3 h-3 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.8)] group-hover:scale-125 transition-transform"></div>
              
              <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl hover:border-purple-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-blue-400 font-mono text-sm">{award.year}</span>
                    <h3 className="text-2xl font-bold text-white mt-1">{award.title}</h3>
                  </div>
                  <span className="bg-purple-500/10 text-purple-400 text-xs font-bold px-3 py-1 rounded-full border border-purple-500/20">
                    {award.rank}
                  </span>
                </div>
                
                <p className="text-gray-400 leading-relaxed mb-6">
                  {award.desc}
                </p>
                
                <div className="flex gap-3">
                  {award.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-widest text-gray-500 border border-white/10 px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Awards;