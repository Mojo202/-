import React from 'react';
import { BotMessageSquare } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="flex items-center justify-center gap-3 mb-2">
        <BotMessageSquare className="h-10 w-10 text-purple-400" />
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          محلل المقالات بالذكاء الاصطناعي
        </h1>
      </div>
      <p className="mt-2 text-lg text-gray-400 max-w-2xl mx-auto">
        استفد من نماذج Gemini المتقدمة للحصول على رؤى عميقة حول أي مقال على الويب.
      </p>
    </header>
  );
};

export default Header;