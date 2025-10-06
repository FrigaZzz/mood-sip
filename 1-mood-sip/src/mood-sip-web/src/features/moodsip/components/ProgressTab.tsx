import { Trophy, Droplets, Smile, Clock, Star, BarChart3 } from 'lucide-react';

export default function ProgressTab() {
  return (
    <div className="space-y-8">
      {/* Level Progress Header */}
      <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-8 shadow-2xl text-white">
        <div className="text-center">
          <Trophy className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Level 8</h2>
          <p className="text-orange-100 mb-6">Hydration Hero</p>
          
          {/* XP Progress */}
          <div className="bg-white/20 rounded-2xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Level 8</span>
              <span className="text-sm font-medium">Level 9</span>
            </div>
            <div className="h-3 bg-white/30 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: '65%' }}></div>
            </div>
            <div className="text-center text-sm font-semibold">650 / 1000 XP</div>
          </div>
        </div>
      </div>

      {/* Daily Overview Stats */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Today's Progress</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Star className="w-6 h-6 text-orange-500" />
            </div>
            <div className="text-2xl font-bold text-gray-800">7</div>
            <div className="text-xs text-gray-500">Day Streak</div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold text-gray-800">8</div>
            <div className="text-xs text-gray-500">Level</div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <BarChart3 className="w-6 h-6 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-gray-800">92%</div>
            <div className="text-xs text-gray-500">This Week</div>
          </div>
        </div>
      </div>

      {/* Weekly Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <Droplets className="w-6 h-6 text-cyan-500" />
            <span className="text-gray-600 font-medium">This Week</span>
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-1">42</div>
          <div className="text-sm text-gray-500">glasses</div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <Smile className="w-6 h-6 text-green-500" />
            <span className="text-gray-600 font-medium">Avg Mood</span>
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-1">73%</div>
          <div className="text-sm text-gray-500">positive</div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">Recent Achievements</h3>
          <button className="text-yellow-600 text-sm font-medium">View All</button>
        </div>
        
        <div className="space-y-4">
          {[
            { title: 'Hydration Hero', desc: 'Complete 30 days streak', icon: Droplets, unlocked: true, color: 'from-teal-500 to-cyan-500', new: true },
            { title: 'Mood Master', desc: 'Log 100 mood checks', icon: Smile, unlocked: true, color: 'from-green-500 to-emerald-500', new: false },
            { title: 'Early Bird', desc: 'First sip before 8 AM (7 days)', icon: Clock, unlocked: false, color: 'from-orange-500 to-yellow-500', new: false }
          ].map((achievement, i) => (
            <div 
              key={i} 
              className={`rounded-2xl p-4 border-2 transition-all ${
                achievement.unlocked 
                  ? `bg-gradient-to-r ${achievement.color} text-white border-transparent shadow-lg` 
                  : 'bg-gray-50 text-gray-400 border-gray-200'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  achievement.unlocked ? 'bg-white/20' : 'bg-gray-200'
                }`}>
                  <achievement.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold">{achievement.title}</h4>
                    {achievement.new && (
                      <span className="bg-white/90 text-orange-600 text-xs font-bold px-2 py-1 rounded-full">NEW!</span>
                    )}
                  </div>
                  <p className={`text-sm ${achievement.unlocked ? 'opacity-90' : 'text-gray-500'}`}>
                    {achievement.desc}
                  </p>
                </div>
                {achievement.unlocked && (
                  <Star className="w-5 h-5 fill-current" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Preview */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-bold text-gray-800">Analytics</h3>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-blue-800">Best Hydration Day</span>
              <span className="text-sm text-blue-600">Wednesday</span>
            </div>
            <div className="text-2xl font-bold text-blue-800">8/8 glasses</div>
          </div>
          
          <div className="p-4 bg-green-50 rounded-2xl border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-green-800">Happiness Streak</span>
              <span className="text-sm text-green-600">5 days</span>
            </div>
            <div className="text-2xl font-bold text-green-800">80%+ mood</div>
          </div>
        </div>
      </div>
    </div>
  );
}