import React, { useState } from 'react';
import { GroupingConfig } from '../types';
import { Users, LayoutGrid, Shuffle, ArrowRight } from 'lucide-react';

interface ConfigFormProps {
  onGenerate: (config: GroupingConfig) => void;
}

export const ConfigForm: React.FC<ConfigFormProps> = ({ onGenerate }) => {
  const [totalStudents, setTotalStudents] = useState<number | ''>(30);
  const [numberOfGroups, setNumberOfGroups] = useState<number | ''>(6);
  const [isRandom, setIsRandom] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof totalStudents === 'number' && typeof numberOfGroups === 'number') {
      onGenerate({ totalStudents, numberOfGroups, isRandom });
    }
  };

  const isValid =
    typeof totalStudents === 'number' &&
    totalStudents > 0 &&
    typeof numberOfGroups === 'number' &&
    numberOfGroups > 0 &&
    numberOfGroups <= totalStudents;

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-100 max-w-lg mx-auto transform transition-all hover:shadow-xl">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Users className="w-6 h-6 text-indigo-600" />
        설정 입력
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Total Students Input */}
        <div className="space-y-2">
          <label htmlFor="totalStudents" className="block text-sm font-medium text-slate-600">
            총 학생 수 (명)
          </label>
          <div className="relative">
            <input
              type="number"
              id="totalStudents"
              value={totalStudents}
              onChange={(e) => setTotalStudents(e.target.valueAsNumber || '')}
              min="1"
              max="1000"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-lg text-slate-800"
              placeholder="예: 30"
            />
            <div className="absolute right-4 top-3.5 text-slate-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Number of Groups Input */}
        <div className="space-y-2">
          <label htmlFor="numberOfGroups" className="block text-sm font-medium text-slate-600">
            만들 모둠 수 (개)
          </label>
          <div className="relative">
            <input
              type="number"
              id="numberOfGroups"
              value={numberOfGroups}
              onChange={(e) => setNumberOfGroups(e.target.valueAsNumber || '')}
              min="1"
              max={typeof totalStudents === 'number' ? totalStudents : 100}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-lg text-slate-800"
              placeholder="예: 6"
            />
            <div className="absolute right-4 top-3.5 text-slate-400">
              <LayoutGrid className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Random Toggle */}
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isRandom ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-200 text-slate-500'}`}>
              <Shuffle className="w-5 h-5" />
            </div>
            <div>
              <span className="block font-medium text-slate-800">무작위 섞기</span>
              <span className="text-xs text-slate-500">학생 번호를 무작위로 배정합니다.</span>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isRandom}
              onChange={(e) => setIsRandom(e.target.checked)}
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isValid}
          className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0
            ${isValid 
              ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200' 
              : 'bg-slate-300 cursor-not-allowed shadow-none'}`}
        >
          모둠 편성하기
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};
