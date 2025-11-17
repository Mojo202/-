import React, { useState, useEffect } from 'react';

const loadingMessages = [
  "بدء التحليل...",
  "جلب سياق المقال باستخدام بحث Google...",
  "تفعيل وضع التفكير المتقدم لـ Gemini 2.5 Pro...",
  "إجراء تقييم معمق للسيو (SEO)...",
  "تحليل بنية المحتوى وأسلوبه...",
  "توقع مدى الانتشار والوصول...",
  "تجميع التقرير النهائي...",
];

const LoadingIndicator: React.FC = () => {
  const [message, setMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % loadingMessages.length;
      setMessage(loadingMessages[index]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-12 text-center flex flex-col items-center justify-center">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 border-4 border-t-purple-500 border-gray-700 rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-t-teal-500 border-gray-700 rounded-full animate-spin [animation-direction:reverse]"></div>
      </div>
      <p className="mt-4 text-lg font-medium text-gray-300">{message}</p>
      <p className="text-gray-500">قد يستغرق هذا بعض الوقت للمقالات المعقدة.</p>
    </div>
  );
};

export default LoadingIndicator;