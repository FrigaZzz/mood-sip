import { PartyPopper, Laugh, Beer, Trophy, Users, Camera, BarChart3, Heart, Target } from 'lucide-react';

interface SocialTabProps {
  onNavigateToProgress: () => void;
}

export default function SocialTab({ onNavigateToProgress }: SocialTabProps) {
  return (
    <div className="space-y-8">
      {/* Party Mode Toggle */}
      <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 rounded-3xl p-8 shadow-2xl text-white">
        <div className="text-center mb-6">
          <PartyPopper className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Party Mode 🎉</h2>
          <p className="text-purple-100 mb-6">Track the fun with friends!</p>
          
          <button className="w-full bg-white/90 hover:bg-white text-purple-600 rounded-2xl py-4 px-6 font-bold text-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3">
            <Camera className="w-6 h-6" />
            Start Party Session
          </button>
        </div>
      </div>

      {/* Live Party Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl p-6 text-white shadow-lg">
          <Laugh className="w-8 h-8 mb-3" />
          <div className="text-3xl font-bold mb-1">23</div>
          <div className="text-sm opacity-90">Laughs Detected</div>
        </div>
        <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-6 text-white shadow-lg">
          <Beer className="w-8 h-8 mb-3" />
          <div className="text-3xl font-bold mb-1">8</div>
          <div className="text-sm opacity-90">Social Sips</div>
        </div>
      </div>

      {/* Laugh Leaderboard */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <h3 className="text-xl font-bold text-gray-800">Fun Leaderboard</h3>
          </div>
          <Users className="w-6 h-6 text-purple-600" />
        </div>
        
        <div className="space-y-4">
          {[
            { name: 'Sarah', laughs: 12, drinks: 4, emoji: '😂', isWinner: true },
            { name: 'Mike', laughs: 8, drinks: 3, emoji: '🤣', isWinner: false },
            { name: 'You', laughs: 3, drinks: 1, emoji: '😊', isWinner: false }
          ].map((person, i) => (
            <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
              person.isWinner 
                ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-400 shadow-md' 
                : 'bg-gray-50 hover:bg-gray-100'
            }`}>
              {person.isWinner && <Trophy className="w-6 h-6 text-yellow-600" />}
              <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-2xl">
                {person.emoji}
              </div>
              <div className="flex-1">
                <div className="font-bold text-gray-800 text-lg">{person.name}</div>
                <div className="text-sm text-gray-500">{person.laughs} laughs · {person.drinks} drinks</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-600">{person.laughs}</div>
                <div className="text-xs text-gray-500">laughs</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Party Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl py-6 font-bold hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex flex-col items-center gap-3">
          <Camera className="w-8 h-8" />
          <span>Scan Faces</span>
        </button>
        <button 
          onClick={onNavigateToProgress}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl py-6 font-bold hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex flex-col items-center gap-3"
        >
          <BarChart3 className="w-8 h-8" />
          <span>Party Stats</span>
        </button>
      </div>

      {/* Daily Challenge */}
      <div className="bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-3xl p-6 shadow-xl text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Daily Challenge</h3>
                <p className="text-orange-100 text-sm">Social & Fun Goals</p>
              </div>
            </div>
            <div className="bg-white/20 px-3 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm">
              +50 XP
            </div>
          </div>
          
          <p className="text-orange-100 mb-4 font-medium">Make 3 friends laugh during party time</p>
          
          <div className="flex gap-2 mb-3">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className={`h-2.5 flex-1 rounded-full transition-all duration-500 ${
                  i <= 2 ? 'bg-white shadow-lg' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
          
          <div className="text-orange-100 text-sm">
            <span className="font-medium">2/3 completed • Keep going!</span>
          </div>
        </div>
      </div>

      {/* Safety Reminder */}
      <div className="bg-gradient-to-br from-orange-100 to-red-100 border-2 border-orange-300 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <Heart className="w-6 h-6 text-red-600" />
          <span className="font-bold text-gray-800 text-lg">Stay Safe</span>
        </div>
        <p className="text-gray-700">MoodSip encourages responsible fun. Know your limits and stay hydrated!</p>
      </div>
    </div>
  );
}