import React from 'react';

interface ProgressBarProps {
  total: number;
  hiddenCount: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ total, hiddenCount }) => {
  const percentage = Math.round((hiddenCount / total) * 100);

  return (
    <div className="w-full max-w-lg mb-8 px-4">
      <div className="flex justify-between text-sky-700 mb-2 text-lg">
        <span>암송 진행도</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full bg-white rounded-full h-6 shadow-inner border-2 border-sky-200 overflow-hidden">
        <div
          className="bg-gradient-to-r from-sky-400 to-blue-500 h-6 rounded-full transition-all duration-700 ease-out flex items-center justify-end px-2"
          style={{ width: `${percentage}%` }}
        >
          {percentage > 10 && <span className="text-white text-xs">✨</span>}
        </div>
      </div>
    </div>
  );
};
