import React from 'react';
import type { AnalysisResult } from '../types';
import ResultCard from './ResultCard';
import SeoAnalysis from './SeoAnalysis';
import ContentAnalysis from './ContentAnalysis';
import ViralityScore from './ViralityScore';
import GroundingSources from './GroundingSources';
import { Award, FileText, Share2, Search, Map } from 'lucide-react';

interface ResultsDisplayProps {
  result: AnalysisResult;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  const { mainAnalysis, groundingSources } = result;

  return (
    <div className="mt-8 animate-fade-in">
      <h2 className="text-3xl font-bold text-center mb-6 text-white">تقرير التحليل</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <ResultCard 
          title="التقييم العام" 
          score={mainAnalysis.overallScore} 
          icon={<Award className="h-8 w-8 text-yellow-400" />} 
          color="yellow"
        />
        <ResultCard 
          title="تقييم السيو" 
          score={mainAnalysis.seo.score} 
          icon={<Search className="h-8 w-8 text-blue-400" />}
          color="blue"
        />
        <ResultCard 
          title="توقع الانتشار" 
          score={mainAnalysis.virality.score} 
          icon={<Share2 className="h-8 w-8 text-green-400" />}
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
           <ContentAnalysis content={mainAnalysis.content} />
           <SeoAnalysis seo={mainAnalysis.seo} />
        </div>
        <div className="lg:col-span-1 space-y-6">
           <ViralityScore virality={mainAnalysis.virality} />
           <GroundingSources sources={groundingSources} />
        </div>
      </div>

    </div>
  );
};

export default ResultsDisplay;