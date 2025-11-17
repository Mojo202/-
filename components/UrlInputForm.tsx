import React from 'react';
import { Search, Eye, Info } from 'lucide-react';

interface UrlInputFormProps {
  url: string;
  setUrl: (url: string) => void;
  visitCount: number;
  setVisitCount: (count: number) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

const UrlInputForm: React.FC<UrlInputFormProps> = ({ url, setUrl, visitCount, setVisitCount, onAnalyze, isLoading }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3">
      <div className="relative w-full">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/رابط-المقالة"
          className="w-full pr-12 pl-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
          required
          disabled={isLoading}
        />
      </div>

       <div className="relative w-full sm:w-48">
        <div className="relative group flex items-center">
          <Eye className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 z-10 pointer-events-none" />
          <label htmlFor="visitCount" className="sr-only">عدد الزيارات المتوقعة</label>
           <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
              <Info className="h-5 w-5 text-gray-500 cursor-help" />
          </div>
          <input
            id="visitCount"
            type="number"
            value={visitCount}
            onChange={(e) => setVisitCount(Number(e.target.value))}
            placeholder="الزيارات"
            min="0"
            className="w-full pr-12 pl-10 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
            required
            disabled={isLoading}
          />
           <div role="tooltip" className="absolute bottom-full mb-2 w-64 p-3 text-sm text-gray-200 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-1/4">
            حدد عدد الزيارات المتوقعة لمحاكاة وتقييم مدى انتشار المقال بشكل أدق. هذا الرقم يساعد الذكاء الاصطناعي على تقديم توقعات أفضل.
          </div>
        </div>
      </div>


      <button
        type="submit"
        disabled={isLoading}
        className="w-full sm:w-auto px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:bg-purple-900 disabled:cursor-not-allowed disabled:text-gray-400 transition-colors flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            جاري التحليل...
          </>
        ) : (
          'تحليل'
        )}
      </button>
    </form>
  );
};

export default UrlInputForm;