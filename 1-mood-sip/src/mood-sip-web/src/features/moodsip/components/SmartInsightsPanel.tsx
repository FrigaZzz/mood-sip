import { TrendingUp, Droplets, Camera, Zap, Brain } from 'lucide-react';

interface SmartInsight {
  type: 'hydration' | 'mood' | 'energy' | 'pattern';
  title: string;
  description: string;
  confidence: number;
  suggestion?: string;
}

interface SmartInsightsPanelProps {
  insights?: SmartInsight[];
}

const defaultInsights: SmartInsight[] = [
  {
    type: 'hydration',
    title: '💧 Peak happiness at 3 PM',
    description: "You're 40% happier when well-hydrated",
    confidence: 92,
    suggestion: 'Keep up the afternoon hydration!'
  },
  {
    type: 'mood',
    title: '📸 Camera detected energy dip',
    description: 'Bottle suggests water break soon',
    confidence: 85,
    suggestion: 'Take a sip to boost energy'
  },
  {
    type: 'pattern',
    title: '🎯 Morning routine identified',
    description: 'Best mood scores between 9-11 AM',
    confidence: 78,
    suggestion: 'Schedule important tasks in morning'
  }
];

export default function SmartInsightsPanel({ insights = defaultInsights }: SmartInsightsPanelProps) {
  const getInsightIcon = (type: SmartInsight['type']) => {
    switch (type) {
      case 'hydration':
        return <Droplets className="w-4 h-4" />;
      case 'mood':
        return <Camera className="w-4 h-4" />;
      case 'energy':
        return <Zap className="w-4 h-4" />;
      case 'pattern':
        return <Brain className="w-4 h-4" />;
      default:
        return <TrendingUp className="w-4 h-4" />;
    }
  };

  const getInsightColor = (type: SmartInsight['type']) => {
    switch (type) {
      case 'hydration':
        return 'from-blue-50 to-cyan-50 border-blue-200 text-blue-800';
      case 'mood':
        return 'from-purple-50 to-pink-50 border-purple-200 text-purple-800';
      case 'energy':
        return 'from-yellow-50 to-orange-50 border-yellow-200 text-yellow-800';
      case 'pattern':
        return 'from-green-50 to-emerald-50 border-green-200 text-green-800';
      default:
        return 'from-gray-50 to-slate-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <TrendingUp className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-800">Smart Insights</h3>
        <div className="ml-auto">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div 
            key={index}
            className={`p-4 rounded-2xl border transition-all hover:shadow-md cursor-pointer bg-gradient-to-r ${getInsightColor(insight.type)}`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {getInsightIcon(insight.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm leading-tight mb-1">
                  {insight.title}
                </p>
                <p className="text-xs opacity-80 mb-2">
                  {insight.description}
                </p>
                {insight.suggestion && (
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-current rounded-full opacity-60"></div>
                    <p className="text-xs font-medium opacity-90">
                      {insight.suggestion}
                    </p>
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="text-xs font-bold opacity-75">
                  {insight.confidence}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* AI Processing indicator */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-500">
        <div className="flex gap-1">
          <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-1 h-1 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
        <span>AI analyzing patterns...</span>
      </div>
    </div>
  );
}