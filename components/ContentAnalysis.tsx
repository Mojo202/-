import React from 'react';
import type { ContentAnalysis as ContentAnalysisType } from '../types';
import { BookOpen, Smile, Type, AlignLeft } from 'lucide-react';

interface ContentAnalysisProps {
  content: ContentAnalysisType;
}

const ContentAnalysis: React.FC<ContentAnalysisProps> = ({ content }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4 text-gray-100 flex items-center gap-2"><BookOpen className="text-purple-400"/>تحليل المحتوى</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 text-center">
        <div className="bg-gray-900 p-3 rounded-lg">
            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm"><BookOpen size={16}/>سهولة القراءة</div>
            <p className="text-2xl font-bold text-white mt-1">{content.readabilityScore}<span className="text-base font-normal text-gray-500">/100</span></p>
        </div>
         <div className="bg-gray-900 p-3 rounded-lg">
            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm"><Smile size={16}/>الأسلوب</div>
            <p className="text-2xl font-bold text-white mt-1">{content.tone}</p>
        </div>
         <div className="bg-gray-900 p-3 rounded-lg">
            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm"><Type size={16}/>عدد الكلمات</div>
            <p className="text-2xl font-bold text-white mt-1">~{content.wordCount}</p>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-300 flex items-center gap-2 mb-2"><AlignLeft size={18}/>الملخص</h4>
        <p className="text-gray-400 bg-gray-900 p-4 rounded-lg border border-gray-700 text-sm leading-relaxed">{content.summary}</p>
      </div>

    </div>
  );
};

export default ContentAnalysis;