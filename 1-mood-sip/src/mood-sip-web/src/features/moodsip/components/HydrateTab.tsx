import { Droplets, Camera, Trophy, Flame, Target } from 'lucide-react';

interface HydrateTabProps {
  progress: number;
  streak: number;
  onRecordSip: () => void;
  onNavigateToMood: () => void;
  onNavigateToCamera: () => void;
}

export default function HydrateTab({ 
  progress, 
  streak, 
  onRecordSip, 
  onNavigateToMood, 
  onNavigateToCamera 
}: HydrateTabProps) {
  return (
    <div className="space-y-8">
      {/* Main Hydration Card */}
      <div className="bg-gradient-to-br from-cyan-500 to-teal-600 rounded-3xl p-8 shadow-2xl text-white">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Daily Hydration</h2>
          <p className="text-cyan-100">Stay hydrated, stay healthy</p>
        </div>
        
        {/* Main Sip Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={onRecordSip}
            className="w-24 h-24 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-cyan-300 hover:scale-105 active:scale-95 transition-all transform focus:outline-none focus:ring-4 focus:ring-cyan-200"
          >
            <Droplets className="w-10 h-10 text-cyan-600" />
          </button>
        </div>
        
        {/* Progress Display */}
        <div className="text-center mb-4">
          <div className="text-4xl font-bold mb-1">{progress}/8</div>
          <div className="text-cyan-100">Glasses today</div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-cyan-400/30 rounded-full h-3 mb-2">
          <div 
            className="bg-white rounded-full h-3 transition-all duration-500" 
            style={{ width: `${(progress / 8) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <Flame className="w-6 h-6 text-orange-500" />
            <span className="text-gray-600 font-medium">Streak</span>
          </div>
          <div className="text-3xl font-bold text-gray-800">{streak}</div>
          <div className="text-sm text-gray-500">days</div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <span className="text-gray-600 font-medium">Level</span>
          </div>
          <div className="text-3xl font-bold text-gray-800">8</div>
          <div className="text-sm text-gray-500">Hydration Hero</div>
        </div>
      </div>

      {/* Quick Mood Check */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-teal-600" />
            <h3 className="text-lg font-semibold text-gray-800">Quick Mood Check</h3>
          </div>
          <button 
            onClick={onNavigateToMood}
            className="text-teal-600 text-sm font-medium"
          >
            View History
          </button>
        </div>
        
        <button 
          onClick={onNavigateToCamera}
          className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-2xl py-4 font-semibold hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
        >
          <Camera className="w-6 h-6" />
          Capture Mood Now
        </button>
      </div>

      {/* Today's Challenge */}
      <div className="bg-gradient-to-br from-orange-400 to-pink-500 rounded-3xl p-6 shadow-xl text-white">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-6 h-6" />
          <h3 className="text-lg font-bold">Today's Challenge</h3>
          <span className="ml-auto bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">+50 XP</span>
        </div>
        <p className="text-orange-100 mb-4">Take 3 mood photos during work hours</p>
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`h-2 flex-1 rounded-full ${i <= 1 ? 'bg-white' : 'bg-white/30'}`}></div>
          ))}
        </div>
      </div>
    </div>
  );
}