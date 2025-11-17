import React, { useState, useEffect, useCallback } from 'react';
import type { AnalysisResult, Coordinates } from './types';
import { analyzeArticle } from './services/geminiService';
import Header from './components/Header';
import UrlInputForm from './components/UrlInputForm';
import LoadingIndicator from './components/LoadingIndicator';
import ResultsDisplay from './components/ResultsDisplay';
import { Sparkles, Network, Link, MapPin } from 'lucide-react';

const App: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [visitCount, setVisitCount] = useState<number>(1000);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => {
        console.warn(`Could not get geolocation: ${err.message}`);
        setError("تم تعطيل تحديد الموقع الجغرافي. سيكون التحليل المعتمد على الخرائط محدودًا.");
      }
    );
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!url) {
      setError('الرجاء إدخال رابط مقال صالح.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setAnalysisResult(null);

    try {
      const result = await analyzeArticle(url, visitCount, userLocation);
      setAnalysisResult(result);
    } catch (err) {
      console.error(err);
      let errorMessage = 'حدث خطأ غير معروف أثناء التحليل.';
      if (err instanceof Error) {
        if (err.message.includes('RESOURCE_EXHAUSTED') || err.message.includes('429')) {
          errorMessage = 'لقد تجاوزت حد الاستخدام المسموح به حاليًا. يرجى الانتظار لحظات ثم المحاولة مرة أخرى.';
        } else {
          errorMessage = err.message;
        }
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [url, visitCount, userLocation]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <Header />
        <main className="mt-8">
          <UrlInputForm url={url} setUrl={setUrl} visitCount={visitCount} setVisitCount={setVisitCount} onAnalyze={handleAnalyze} isLoading={isLoading} />
          {error && <div className="mt-4 text-center text-red-400 bg-red-900/50 p-3 rounded-lg">{error}</div>}
          
          {isLoading ? (
            <LoadingIndicator />
          ) : analysisResult ? (
            <ResultsDisplay result={analysisResult} />
          ) : (
             <div className="mt-12 text-center text-gray-500">
                <h2 className="text-2xl font-bold text-gray-300 mb-4">اكتشف رؤى عميقة</h2>
                <p className="max-w-2xl mx-auto">
                    الصق رابط مقال أعلاه للحصول على تحليل شامل مدعوم من Gemini.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 max-w-3xl mx-auto">
                    <div className="bg-gray-800/50 p-4 rounded-lg flex flex-col items-center">
                        <Sparkles className="h-8 w-8 text-purple-400 mb-2"/>
                        <h3 className="font-semibold text-gray-200">تحليل الذكاء الاصطناعي</h3>
                        <p className="text-sm text-gray-400">المحتوى، السيو، والمزيد.</p>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg flex flex-col items-center">
                        <Network className="h-8 w-8 text-teal-400 mb-2"/>
                        <h3 className="font-semibold text-gray-200">وضع التفكير المتقدم</h3>
                        <p className="text-sm text-gray-400">تحليل عميق للمواضيع المعقدة.</p>
                    </div>
                     <div className="bg-gray-800/50 p-4 rounded-lg flex flex-col items-center">
                        <Link className="h-8 w-8 text-blue-400 mb-2"/>
                        <h3 className="font-semibold text-gray-200">بيانات بحث Google</h3>
                        <p className="text-sm text-gray-400">سياق محدّث من بحث Google.</p>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg flex flex-col items-center">
                        <MapPin className="h-8 w-8 text-green-400 mb-2"/>
                        <h3 className="font-semibold text-gray-200">بيانات خرائط Google</h3>
                        <p className="text-sm text-gray-400">رؤى مدركة للموقع.</p>
                    </div>
                </div>
             </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;