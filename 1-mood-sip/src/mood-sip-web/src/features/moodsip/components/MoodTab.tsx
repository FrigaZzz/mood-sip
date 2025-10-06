import { TrendingUp, Smile, Meh, Frown, Camera, Brain, Sparkles, Zap } from 'lucide-react';

interface MoodEntry {
  mood: string;
  time: string;
  score: number;
}

interface MoodTabProps {
  moodHistory: MoodEntry[];
  onNavigateToCamera: () => void;
}

export default function MoodTab({ moodHistory, onNavigateToCamera }: MoodTabProps) {
  return (
    <div className="space-y-8">
      {/* AI Mood Analysis Center */}
      <div className="bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-700 rounded-3xl p-8 shadow-2xl text-white">
        <div className="text-center">
          <Brain className="w-12 h-12 mx-auto mb-4 text-purple-100" />
          <h2 className="text-2xl font-bold mb-2">AI Mood Center</h2>
          <p className="text-purple-100 mb-6">Smart bottle AI analyzes your emotional patterns</p>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button 
              onClick={onNavigateToCamera}
              className="bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 rounded-2xl py-4 px-4 transition-all transform hover:scale-105 active:scale-95"
            >
              <Camera className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Mood Scan</span>
            </button>
            
            <button className="bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 rounded-2xl py-4 px-4 transition-all transform hover:scale-105 active:scale-95">
              <Sparkles className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">AI Insights</span>
            </button>
          </div>
          
          <button 
            onClick={onNavigateToCamera}
            className="w-full bg-white/90 hover:bg-white text-indigo-600 rounded-2xl py-4 font-bold transition-all flex items-center justify-center gap-3"
          >
            <Camera className="w-5 h-5" />
            Take New Mood Reading
          </button>
        </div>
      </div>

      {/* Today's Mood Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl p-5 text-white text-center shadow-lg">
          <Smile className="w-8 h-8 mx-auto mb-3" />
          <div className="text-2xl font-bold mb-1">45%</div>
          <div className="text-sm opacity-90">Happy</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-5 text-white text-center shadow-lg">
          <Meh className="w-8 h-8 mx-auto mb-3" />
          <div className="text-2xl font-bold mb-1">30%</div>
          <div className="text-sm opacity-90">Neutral</div>
        </div>
        <div className="bg-gradient-to-br from-red-400 to-orange-500 rounded-2xl p-5 text-white text-center shadow-lg">
          <Frown className="w-8 h-8 mx-auto mb-3" />
          <div className="text-2xl font-bold mb-1">25%</div>
          <div className="text-sm opacity-90">Stressed</div>
        </div>
      </div>

      {/* AI Smart Insights */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-6 h-6 text-purple-600" />
          <h3 className="text-xl font-bold text-gray-800">Smart Bottle AI Analysis</h3>
        </div>
        <div className="space-y-3 mb-6">
          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-blue-600" />
              <p className="text-blue-800 font-medium">Hydration-Mood Connection</p>
            </div>
            <p className="text-blue-600 text-sm">You're 23% happier when you drink water every 45 minutes</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-4 h-4 text-purple-600" />
              <p className="text-purple-800 font-medium">Pattern Recognition</p>
            </div>
            <p className="text-purple-600 text-sm">Your afternoon energy is improving with consistent hydration</p>
          </div>
          <div className="p-4 bg-green-50 rounded-2xl border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-green-600" />
              <p className="text-green-800 font-medium">AI Recommendation</p>
            </div>
            <p className="text-green-600 text-sm">Try drinking water 10 minutes earlier to boost your 3 PM mood</p>
          </div>
        </div>
      </div>

      {/* Recent Mood Timeline */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">Recent Moods</h3>
          <button className="text-indigo-600 text-sm font-medium">View All</button>
        </div>
        
        <div className="space-y-4">
          {moodHistory.map((mood, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-md">
                {mood.mood === 'tired' && <Frown className="w-6 h-6 text-orange-500" />}
                {mood.mood === 'stressed' && <Meh className="w-6 h-6 text-yellow-500" />}
                {mood.mood === 'happy' && <Smile className="w-6 h-6 text-green-500" />}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-800 capitalize text-lg">{mood.mood}</div>
                <div className="text-sm text-gray-500">{mood.time}</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-gray-700">{mood.score}%</div>
                <div className="text-xs text-gray-500">confidence</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mood Insights */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-bold text-gray-800">Insights</h3>
        </div>
        <div className="space-y-3">
          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200">
            <p className="text-blue-800 font-medium">💧 You're happiest when well-hydrated</p>
            <p className="text-blue-600 text-sm mt-1">Your mood improves by 15% on days you hit your water goal</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-2xl border border-orange-200">
            <p className="text-orange-800 font-medium">⏰ Afternoon energy dips detected</p>
            <p className="text-orange-600 text-sm mt-1">Consider a hydration break around 2-3 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}