import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult, Coordinates, GroundingSource, MainAnalysis } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const analysisSchema = {
    type: Type.OBJECT,
    properties: {
        overallScore: { type: Type.INTEGER, description: "Overall score from 0-100 for the article." },
        seo: {
            type: Type.OBJECT,
            properties: {
                score: { type: Type.INTEGER, description: "SEO score from 0-100." },
                keywordAnalysis: {
                    type: Type.OBJECT,
                    properties: {
                        primaryKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                        secondaryKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                    },
                    required: ["primaryKeywords", "secondaryKeywords"]
                },
                titleTag: { type: Type.OBJECT, properties: { suggestion: { type: Type.STRING }, feedback: { type: Type.STRING } }, required: ["suggestion", "feedback"]},
                metaDescription: { type: Type.OBJECT, properties: { suggestion: { type: Type.STRING }, feedback: { type: Type.STRING } }, required: ["suggestion", "feedback"]},
                imageSeo: { type: Type.OBJECT, properties: { feedback: { type: Type.STRING } }, required: ["feedback"]},
                linkingStrategy: { type: Type.OBJECT, properties: { feedback: { type: Type.STRING } }, required: ["feedback"]},
            },
            required: ["score", "keywordAnalysis", "titleTag", "metaDescription", "imageSeo", "linkingStrategy"]
        },
        content: {
            type: Type.OBJECT,
            properties: {
                readabilityScore: { type: Type.INTEGER, description: "Readability score from 0-100 (e.g., Flesch-Kincaid)." },
                tone: { type: Type.STRING, description: "The overall tone of the article (e.g., Formal, Casual, Optimistic)." },
                wordCount: { type: Type.INTEGER, description: "Estimated word count of the article." },
                summary: { type: Type.STRING, description: "A concise 3-sentence summary of the article." },
            },
            required: ["readabilityScore", "tone", "wordCount", "summary"]
        },
        virality: {
            type: Type.OBJECT,
            properties: {
                score: { type: Type.INTEGER, description: "Virality potential score from 0-100." },
                justification: { type: Type.STRING, description: "A brief explanation for the virality score." },
            },
            required: ["score", "justification"]
        },
    },
    required: ["overallScore", "seo", "content", "virality"]
};


export const analyzeArticle = async (url: string, visitCount: number, location: Coordinates | null): Promise<AnalysisResult> => {
  const prompt = `
    مهمتك هي تحليل مقال على الويب بعمق. اتبع الخطوات التالية بدقة:
    1.  **استخدام الأدوات المتاحة**: استخدم بحث Google وخرائط Google (إذا كان الموقع متاحًا) لجمع أحدث المعلومات والسياق المتعلق بموضوع المقالة.
    2.  **الوصول إلى المحتوى وقراءته**: قم بـ "زيارة" وقراءة المحتوى النصي الكامل للمقالة الموجودة على الرابط التالي: ${url}.
    3.  **التحليل كخبير**: بصفتك خبيرًا في التسويق الرقمي وتحسين محركات البحث (SEO)، قم بتحليل المحتوى الذي قرأته بشكل شامل، معززًا تحليلك بالمعلومات التي جمعتها من أدوات البحث.
    4.  **إنشاء التقرير**: بناءً على تحليلك، قم بإنشاء تقرير بتنسيق JSON منظم.

    يجب أن يغطي تقريرك المجالات التالية:
    1.  **التقييم العام**: درجة واحدة من 100 تمثل الجودة الإجمالية للمقالة.
    2.  **تحليل السيو (SEO)**:
        - درجة من 0-100.
        - تحديد الكلمات المفتاحية الأساسية والثانوية.
        - تقييم وسم العنوان (title tag) والوصف التعريفي (meta description)، مع تقديم ملاحظات واقتراحات محسنة.
        - تقييم سيو الصور (alt tags).
        - تحليل استراتيجية الروابط الداخلية والخارجية.
    3.  **تحليل المحتوى**:
        - تقديم درجة سهولة القراءة (0-100).
        - تحديد الأسلوب العام للمقالة.
        - تقدير عدد الكلمات.
        - تقديم ملخص موجز من 3 جمل.
    4.  **توقع مدى الانتشار**:
        - **محاكاة السيناريو**: افترض أن هذا المقال سيحصل على **${visitCount}** زيارة بالضبط.
        - **التقييم**: بناءً على هذا الافتراض، قدّم درجة من 0-100 تشير إلى احتمالية انتشاره بشكل كبير.
        - **التبرير**: قدم تبريرًا للدرجة، مع الأخذ في الاعتبار عوامل مثل الجاذبية العاطفية والفائدة وقابلية المشاركة ضمن سياق حجم الجمهور المحدد.
  `;

  const tools: any[] = [{ googleSearch: {} }];
  const toolConfig: any = {};

  if (location) {
    tools.push({ googleMaps: {} });
    toolConfig.retrievalConfig = { latLng: location };
  }

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-pro',
    contents: prompt,
    tools: tools,
    toolConfig: Object.keys(toolConfig).length > 0 ? toolConfig : undefined,
    config: {
      responseMimeType: 'application/json',
      responseSchema: analysisSchema,
      thinkingConfig: { thinkingBudget: 32768 },
    },
  });

  const mainAnalysis: MainAnalysis = JSON.parse(response.text);
  const groundingSources: GroundingSource[] = [];

  if (response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
    response.candidates[0].groundingMetadata.groundingChunks.forEach((chunk: any) => {
        if (chunk.web) {
            groundingSources.push({ uri: chunk.web.uri, title: chunk.web.title || chunk.web.uri, type: 'web' });
        }
        if (chunk.maps) {
            groundingSources.push({ uri: chunk.maps.uri, title: chunk.maps.title || chunk.maps.placeName || 'Map Link', type: 'maps' });
        }
    });
  }

  return {
    mainAnalysis,
    groundingSources,
  };
};