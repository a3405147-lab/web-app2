import React from 'react';
import { Group } from '../types';
import { Users, Copy, Check } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface GroupDisplayProps {
  groups: Group[];
}

export const GroupDisplay: React.FC<GroupDisplayProps> = ({ groups }) => {
  const [copiedId, setCopiedId] = React.useState<number | null>(null);

  if (groups.length === 0) return null;

  const handleCopy = (group: Group) => {
    const text = `${group.name}: ${group.members.join(', ')}`;
    navigator.clipboard.writeText(text);
    setCopiedId(group.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyAll = () => {
    const text = groups.map(g => `${g.name}: ${g.members.join(', ')}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopiedId(-1);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Prepare data for stats chart
  const chartData = groups.map(g => ({
    name: g.name,
    count: g.members.length,
  }));

  const COLORS = ['#818cf8', '#6366f1', '#4f46e5', '#4338ca', '#3730a3', '#312e81'];

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Stats Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-4">
           <h3 className="text-lg font-bold text-slate-700">모둠별 인원 분포</h3>
           <button 
             onClick={handleCopyAll}
             className="text-sm flex items-center gap-1.5 text-slate-500 hover:text-indigo-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100"
           >
             {copiedId === -1 ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
             전체 복사
           </button>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 11, fill: '#64748b' }} 
                axisLine={false} 
                tickLine={false} 
              />
              <YAxis 
                tick={{ fontSize: 11, fill: '#64748b' }} 
                axisLine={false} 
                tickLine={false} 
                allowDecimals={false}
              />
              <Tooltip 
                cursor={{ fill: '#f1f5f9', radius: 4 }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={40}>
                 {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid of Groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <div key={group.id} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all border border-slate-100 overflow-hidden group">
            <div className="px-5 py-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <span className="bg-indigo-100 text-indigo-700 w-8 h-8 flex items-center justify-center rounded-lg text-sm">
                  {group.id}
                </span>
                {group.name}
              </h3>
              <div className="flex items-center gap-2">
                 <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                    {group.members.length}명
                 </span>
                 <button
                    onClick={() => handleCopy(group)}
                    className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-md transition-all"
                    title="복사하기"
                 >
                    {copiedId === group.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                 </button>
              </div>
            </div>
            <div className="p-5">
              <div className="flex flex-wrap gap-2">
                {group.members.map((member) => (
                  <span
                    key={member}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-slate-100 text-slate-700 font-semibold shadow-sm text-sm"
                  >
                    {member}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
