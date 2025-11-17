import React from 'react';
import type { ViralityPrediction } from '../types';
import { TrendingUp } from 'lucide-react';

interface ViralityScoreProps {
  virality: ViralityPrediction;
}

const ViralityScore: React.FC<ViralityScoreProps> = ({ virality }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-2 text-gray-100 flex items-center gap-2">
        <TrendingUp className="text-green-400" />
        توقع الانتشار
      </h3>
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-5xl font-extrabold text-green-400">{virality.score}</span>
        <span className="text-2xl font-medium text-gray-500">/ 100</span>
      </div>
      <div>
        <h4 className="font-semibold text-gray-300 mb-1">الأساس المنطقي</h4>
        <p className="text-gray-400 text-sm">{virality.justification}</p>
      </div>
    </div>
  );
};

export default ViralityScore;