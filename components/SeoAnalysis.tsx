import React from 'react';
import type { SeoAnalysis as SeoAnalysisType } from '../types';
import { Tag, FileText, Image, Link2 } from 'lucide-react';

interface SeoAnalysisProps {
  seo: SeoAnalysisType;
}

const SeoAnalysis: React.FC<SeoAnalysisProps> = ({ seo }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4 text-gray-100 flex items-center gap-2"><Tag className="text-blue-400"/>تفاصيل السيو</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-gray-300">تحليل الكلمات المفتاحية</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {seo.keywordAnalysis.primaryKeywords.map((kw, i) => (
              <span key={`p-${i}`} className="bg-blue-900 text-blue-300 text-sm font-medium px-3 py-1 rounded-full">{kw}</span>
            ))}
             {seo.keywordAnalysis.secondaryKeywords.map((kw, i) => (
              <span key={`s-${i}`} className="bg-gray-700 text-gray-300 text-sm font-medium px-3 py-1 rounded-full">{kw}</span>
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-4">
           <h4 className="font-semibold text-gray-300 flex items-center gap-2 mb-1"><FileText size={18} />وسم العنوان</h4>
           <p className="text-gray-400 text-sm mb-2">{seo.titleTag.feedback}</p>
           <p className="text-sm bg-gray-900 p-2 rounded-md font-mono text-green-400">اقتراح: {seo.titleTag.suggestion}</p>
        </div>

        <div className="border-t border-gray-700 pt-4">
           <h4 className="font-semibold text-gray-300 flex items-center gap-2 mb-1"><FileText size={18} />الوصف التعريفي</h4>
           <p className="text-gray-400 text-sm mb-2">{seo.metaDescription.feedback}</p>
           <p className="text-sm bg-gray-900 p-2 rounded-md font-mono text-green-400">اقتراح: {seo.metaDescription.suggestion}</p>
        </div>

        <div className="border-t border-gray-700 pt-4">
           <h4 className="font-semibold text-gray-300 flex items-center gap-2 mb-1"><Image size={18} />سيو الصور</h4>
           <p className="text-gray-400 text-sm">{seo.imageSeo.feedback}</p>
        </div>

        <div className="border-t border-gray-700 pt-4">
           <h4 className="font-semibold text-gray-300 flex items-center gap-2 mb-1"><Link2 size={18} />استراتيجية الروابط</h4>
           <p className="text-gray-400 text-sm">{seo.linkingStrategy.feedback}</p>
        </div>
      </div>
    </div>
  );
};

export default SeoAnalysis;