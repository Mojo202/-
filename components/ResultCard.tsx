
import React from 'react';

interface ResultCardProps {
  title: string;
  score: number;
  icon: React.ReactNode;
  color: 'yellow' | 'blue' | 'green';
}

const colorMap = {
    yellow: {
        text: 'text-yellow-400',
        stroke: 'stroke-yellow-400',
        bg: 'bg-yellow-900/50',
    },
    blue: {
        text: 'text-blue-400',
        stroke: 'stroke-blue-400',
        bg: 'bg-blue-900/50',
    },
    green: {
        text: 'text-green-400',
        stroke: 'stroke-green-400',
        bg: 'bg-green-900/50',
    }
};

const ResultCard: React.FC<ResultCardProps> = ({ title, score, icon, color }) => {
  const circumference = 2 * Math.PI * 45; // 2 * pi * r
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const classes = colorMap[color];

  return (
    <div className={`p-6 rounded-lg border border-gray-700 ${classes.bg} flex flex-col items-center text-center`}>
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="text-xl font-semibold text-gray-200">{title}</h3>
      </div>
      <div className="relative h-32 w-32">
        <svg className="h-full w-full" viewBox="0 0 100 100">
          <circle
            className="stroke-gray-700"
            strokeWidth="8"
            cx="50"
            cy="50"
            r="45"
            fill="transparent"
          />
          <circle
            className={`${classes.stroke} transition-all duration-1000 ease-out`}
            strokeWidth="8"
            strokeLinecap="round"
            cx="50"
            cy="50"
            r="45"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className={`absolute inset-0 flex items-center justify-center text-4xl font-bold ${classes.text}`}>
          {score}
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
