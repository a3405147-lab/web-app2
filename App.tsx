import React, { useState } from 'react';
import { ConfigForm } from './components/ConfigForm';
import { GroupDisplay } from './components/GroupDisplay';
import { Group, GroupingConfig } from './types';
import { generateGroups } from './utils/logic';
import { Sparkles, RefreshCw } from 'lucide-react';

const App: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [lastConfig, setLastConfig] = useState<GroupingConfig | null>(null);

  const handleGenerate = (config: GroupingConfig) => {
    const newGroups = generateGroups(config.totalStudents, config.numberOfGroups, config.isRandom);
    setGroups(newGroups);
    setLastConfig(config);
    // Smooth scroll to results on mobile
    if (window.innerWidth < 768) {
        setTimeout(() => {
            document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }
  };

  const handleReRoll = () => {
    if (lastConfig) {
      handleGenerate(lastConfig);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50/30 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 bg-opacity-80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-violet-600">
              ClassMate Grouper
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-12">
        {/* Intro */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
            빠르고 간편한 <br className="md:hidden" />
            <span className="text-indigo-600">모둠 자동 편성</span>
          </h2>
          <p className="text-slate-500 text-lg">
            학생 수와 모둠 수만 입력하세요. <br className="md:hidden" /> 공정하게 번호를 섞어 모둠을 만들어드립니다.
          </p>
        </div>

        {/* Input Section */}
        <ConfigForm onGenerate={handleGenerate} />

        {/* Results Section */}
        {groups.length > 0 && (
          <div id="results" className="pt-8 space-y-6 border-t border-slate-200/60">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">
                편성 결과
              </h2>
              <button
                onClick={handleReRoll}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 font-medium rounded-lg hover:bg-indigo-100 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                다시 섞기
              </button>
            </div>
            <GroupDisplay groups={groups} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center text-slate-400 text-sm py-8">
        <p>&copy; {new Date().getFullYear()} ClassMate Grouper. No data is stored.</p>
      </footer>
    </div>
  );
};

export default App;
