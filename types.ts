
export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface SeoAnalysis {
  score: number;
  keywordAnalysis: {
    primaryKeywords: string[];
    secondaryKeywords: string[];
  };
  titleTag: {
    suggestion: string;
    feedback: string;
  };
  metaDescription: {
    suggestion: string;
    feedback: string;
  };
  imageSeo: {
    feedback: string;
  };
  linkingStrategy: {
    feedback: string;
  };
}

export interface ContentAnalysis {
  readabilityScore: number;
  tone: string;
  wordCount: number;
  summary: string;
}

export interface ViralityPrediction {
  score: number;
  justification: string;
}

export interface GroundingSource {
    uri: string;
    title: string;
    type: 'web' | 'maps';
}

export interface MainAnalysis {
  overallScore: number;
  seo: SeoAnalysis;
  content: ContentAnalysis;
  virality: ViralityPrediction;
}

export interface AnalysisResult {
    mainAnalysis: MainAnalysis;
    groundingSources: GroundingSource[];
}
