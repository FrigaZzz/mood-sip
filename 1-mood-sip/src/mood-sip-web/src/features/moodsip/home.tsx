import React, { useState, useEffect } from 'react';
import { Droplets, Smile, Camera, TrendingUp, Award, Bell, Trophy, Flame, Target, Zap, Clock, Heart, Frown, Meh, Laugh, Beer, PartyPopper, Users, Star, ChevronRight, Calendar, BarChart3 } from 'lucide-react';

export default function MoodSipApp() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [progress, setProgress] = useState(5);
  const [streak, setStreak] = useState(7);
  const [bottleMode, setBottleMode] = useState('hydration');
  const [moodHistory] = useState([
    { mood: 'tired', time: '14:30', score: 15 },
    { mood: 'stressed', time: '12:15', score: 25 },
    { mood: 'happy', time: '09:00', score: 85 },
  ]);

  const renderHome = () => (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="bg-white rounded-3xl p-4 shadow-xl border border-teal-50">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setBottleMode('hydration')}
            className={`py-4 px-4 rounded-2xl font-semibold transition-all ${
              bottleMode === 'hydration'
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            <Droplets className="w-5 h-5 mx-auto mb-1" />
            Hydration
          </button>
          <button
            onClick={() => setBottleMode('party')}
            className={`py-4 px-4 rounded-2xl font-semibold transition-all ${
              bottleMode === 'party'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            <Beer className="w-5 h-5 mx-auto mb-1" />
            Party Mode
          </button>
        </div>
      </div>

      {bottleMode === 'hydration' ? renderHydrationMode() : renderPartyMode()}
    </div>
  );

  const renderHydrationMode = () => (
    <>
      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-4 text-white">
          <Flame className="w-6 h-6 mb-2" />
          <div className="text-2xl font-bold">{streak}</div>
          <div className="text-xs opacity-90">Day Streak</div>
        </div>
        <div className="bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl p-4 text-white">
          <Droplets className="w-6 h-6 mb-2" />
          <div className="text-2xl font-bold">{progress}/8</div>
          <div className="text-xs opacity-90">Today's Sips</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-4 text-white">
          <Trophy className="w-6 h-6 mb-2" />
          <div className="text-2xl font-bold">12</div>
          <div className="text-xs opacity-90">Achievements</div>
        </div>
      </div>

      {/* Daily Challenge */}
      <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-6 shadow-xl text-white">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Target className="w-6 h-6" />
            <h3 className="text-lg font-bold">Daily Challenge</h3>
          </div>
          <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold">
            +50 XP
          </span>
        </div>
        <p className="text-sm opacity-95 mb-4">Take 3 mood photos during work hours</p>
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`h-2 flex-1 rounded-full ${i <= 1 ? 'bg-white' : 'bg-white/30'}`}></div>
          ))}
        </div>
      </div>

      {/* AI Mood Tracker */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border border-teal-50">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-teal-600" />
            <h2 className="text-lg font-semibold text-gray-800">AI Mood Tracker</h2>
          </div>
          <button 
            onClick={() => setActiveScreen('moods')}
            className="text-teal-600 text-sm font-medium flex items-center gap-1"
          >
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <button 
          onClick={() => setActiveScreen('camera')}
          className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-2xl py-4 font-semibold hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 mb-4"
        >
          <Camera className="w-5 h-5" />
          Capture Mood Now
        </button>

        {/* Recent Moods */}
        <div className="space-y-2">
          {moodHistory.slice(0, 2).map((mood, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              {mood.mood === 'tired' && <Frown className="w-5 h-5 text-orange-500" />}
              {mood.mood === 'stressed' && <Meh className="w-5 h-5 text-yellow-500" />}
              {mood.mood === 'happy' && <Smile className="w-5 h-5 text-green-500" />}
              <div className="flex-1">
                <div className="text-sm font-medium capitalize">{mood.mood}</div>
                <div className="text-xs text-gray-500">{mood.time}</div>
              </div>
              <div className="text-sm font-semibold text-gray-700">{mood.score}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <button 
        onClick={() => setProgress(Math.min(8, progress + 1))}
        className="w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 text-white rounded-3xl py-6 text-xl font-semibold hover:shadow-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 shadow-xl"
      >
        <Droplets className="w-7 h-7" />
        Record Sip
      </button>
    </>
  );

  const renderPartyMode = () => (
    <>
      {/* Party Stats */}
      <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 rounded-3xl p-6 shadow-xl text-white">
        <div className="flex items-center gap-2 mb-4">
          <PartyPopper className="w-6 h-6" />
          <h2 className="text-xl font-bold">ALCOHOLIC MODE 🎉</h2>
        </div>
        <p className="text-sm opacity-90 mb-4">Track laughs & drinks at your party!</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/20 backdrop-blur rounded-2xl p-4">
            <Laugh className="w-6 h-6 mb-2" />
            <div className="text-3xl font-bold">23</div>
            <div className="text-xs opacity-90">Laughs Detected</div>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-2xl p-4">
            <Beer className="w-6 h-6 mb-2" />
            <div className="text-3xl font-bold">8</div>
            <div className="text-xs opacity-90">Drinks Taken</div>
          </div>
        </div>
      </div>

      {/* Live Laugh Tracker */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border border-purple-50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Laugh Leaderboard</h3>
          <Users className="w-5 h-5 text-purple-600" />
        </div>
        <div className="space-y-3">
          {[
            { name: 'Sarah', laughs: 12, drinks: 4, emoji: '😂' },
            { name: 'Mike', laughs: 8, drinks: 3, emoji: '🤣' },
            { name: 'You', laughs: 3, drinks: 1, emoji: '😊' }
          ].map((person, i) => (
            <div key={i} className={`flex items-center gap-3 p-4 rounded-2xl ${i === 0 ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-400' : 'bg-gray-50'}`}>
              {i === 0 && <Trophy className="w-5 h-5 text-yellow-600" />}
              <span className="text-2xl">{person.emoji}</span>
              <div className="flex-1">
                <div className="font-semibold text-gray-800">{person.name}</div>
                <div className="text-xs text-gray-500">{person.laughs} laughs · {person.drinks} drinks</div>
              </div>
              <div className="text-xl font-bold text-purple-600">{person.laughs}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Party Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl py-5 font-semibold hover:shadow-xl transition-all flex flex-col items-center gap-2">
          <Camera className="w-6 h-6" />
          Scan Faces
        </button>
        <button 
          onClick={() => setActiveScreen('partystats')}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl py-5 font-semibold hover:shadow-xl transition-all flex flex-col items-center gap-2"
        >
          <BarChart3 className="w-6 h-6" />
          Party Stats
        </button>
      </div>
    </>
  );

  const renderMoodsScreen = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Mood History</h2>
        <button 
          onClick={() => setActiveScreen('home')}
          className="text-teal-600 text-sm font-medium"
        >
          Back
        </button>
      </div>

      {/* Mood Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl p-4 text-white text-center">
          <Smile className="w-8 h-8 mx-auto mb-2" />
          <div className="text-2xl font-bold">45%</div>
          <div className="text-xs opacity-90">Happy</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-4 text-white text-center">
          <Meh className="w-8 h-8 mx-auto mb-2" />
          <div className="text-2xl font-bold">30%</div>
          <div className="text-xs opacity-90">Neutral</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-4 text-white text-center">
          <Frown className="w-8 h-8 mx-auto mb-2" />
          <div className="text-2xl font-bold">25%</div>
          <div className="text-xs opacity-90">Stressed</div>
        </div>
      </div>

      {/* Most Tired Faces Record */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border border-orange-100">
        <div className="flex items-center gap-2 mb-4">
          <Frown className="w-6 h-6 text-orange-600" />
          <h3 className="text-lg font-semibold text-gray-800">Most Tired Moments</h3>
        </div>
        <div className="space-y-3">
          {[
            { time: 'Tue 14:30', score: 15, trigger: 'After lunch meeting' },
            { time: 'Mon 16:45', score: 18, trigger: 'End of work day' },
            { time: 'Wed 11:00', score: 20, trigger: 'Morning slump' }
          ].map((moment, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-orange-50 rounded-2xl border border-orange-200">
              <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center">
                <Frown className="w-6 h-6 text-orange-700" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-800">{moment.time}</div>
                <div className="text-sm text-gray-600">{moment.trigger}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-orange-600">{moment.score}%</div>
                <div className="text-xs text-gray-500">energy</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Mood Timeline */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border border-teal-50">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Mood Journey</h3>
        <div className="space-y-3">
          {moodHistory.map((mood, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              {mood.mood === 'tired' && <Frown className="w-6 h-6 text-orange-500" />}
              {mood.mood === 'stressed' && <Meh className="w-6 h-6 text-yellow-500" />}
              {mood.mood === 'happy' && <Smile className="w-6 h-6 text-green-500" />}
              <div className="flex-1">
                <div className="font-medium capitalize">{mood.mood}</div>
                <div className="text-sm text-gray-500">{mood.time}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-700">{mood.score}%</div>
                <div className="text-xs text-gray-500">confidence</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAchievementsScreen = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Achievements</h2>
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-bold">
          Level 8
        </div>
      </div>

      {/* XP Progress */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border border-yellow-100">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-600">Level 8</span>
          <span className="text-sm font-medium text-gray-600">Level 9</span>
        </div>
        <div className="h-4 bg-gray-100 rounded-full overflow-hidden mb-2">
          <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500" style={{ width: '65%' }}></div>
        </div>
        <div className="text-center text-sm text-gray-600">650 / 1000 XP</div>
      </div>

      {/* Achievement Categories */}
      <div className="space-y-3">
        {[
          { title: 'Hydration Hero', desc: 'Complete 30 days streak', icon: Droplets, unlocked: true, color: 'from-teal-500 to-cyan-500' },
          { title: 'Mood Master', desc: 'Log 100 mood checks', icon: Smile, unlocked: true, color: 'from-green-500 to-emerald-500' },
          { title: 'Early Bird', desc: 'First sip before 8 AM (7 days)', icon: Clock, unlocked: false, color: 'from-orange-500 to-yellow-500' },
          { title: 'Party Legend', desc: 'Host 5 party mode sessions', icon: PartyPopper, unlocked: false, color: 'from-purple-500 to-pink-500' },
          { title: 'Streak Warrior', desc: 'Maintain 100 day streak', icon: Flame, unlocked: false, color: 'from-red-500 to-orange-500' }
        ].map((achievement, i) => (
          <div 
            key={i} 
            className={`rounded-2xl p-5 shadow-lg border-2 ${
              achievement.unlocked 
                ? `bg-gradient-to-r ${achievement.color} text-white border-transparent` 
                : 'bg-white text-gray-400 border-gray-200'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                achievement.unlocked ? 'bg-white/20' : 'bg-gray-100'
              }`}>
                <achievement.icon className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{achievement.title}</h3>
                <p className={`text-sm ${achievement.unlocked ? 'opacity-90' : 'text-gray-500'}`}>
                  {achievement.desc}
                </p>
              </div>
              {achievement.unlocked && (
                <Star className="w-6 h-6 fill-current" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPartyStatsScreen = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Party Analytics</h2>
        <button 
          onClick={() => setActiveScreen('home')}
          className="text-purple-600 text-sm font-medium"
        >
          Back
        </button>
      </div>

      {/* Party Summary */}
      <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-6 shadow-xl text-white">
        <h3 className="text-xl font-bold mb-4">Last Party: Friday Night</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/20 backdrop-blur rounded-xl p-4">
            <Clock className="w-5 h-5 mb-2" />
            <div className="text-2xl font-bold">4.5h</div>
            <div className="text-xs opacity-90">Duration</div>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-xl p-4">
            <Users className="w-5 h-5 mb-2" />
            <div className="text-2xl font-bold">12</div>
            <div className="text-xs opacity-90">Guests</div>
          </div>
        </div>
      </div>

      {/* Fun Facts */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border border-purple-50">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Fun Facts</h3>
        <div className="space-y-3">
          {[
            { icon: Laugh, text: 'Peak laughter at 11:30 PM', color: 'text-yellow-600' },
            { icon: Beer, text: 'Most drinks consumed: Mike (8)', color: 'text-orange-600' },
            { icon: Star, text: 'Happiest moment: Karaoke time', color: 'text-pink-600' },
            { icon: Trophy, text: 'Laugh champion: Sarah (18 laughs)', color: 'text-purple-600' }
          ].map((fact, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
              <fact.icon className={`w-5 h-5 ${fact.color}`} />
              <span className="text-sm font-medium text-gray-700">{fact.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Drink Responsibility */}
      <div className="bg-gradient-to-br from-orange-100 to-red-100 border-2 border-orange-300 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-2">
          <Heart className="w-5 h-5 text-red-600" />
          <span className="font-semibold text-gray-800">Drink Responsibly</span>
        </div>
        <p className="text-sm text-gray-700">MoodSip encourages safe drinking. Always know your limits and never drink and drive.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-teal-100 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transform hover:scale-105 transition-transform ${
                bottleMode === 'party' 
                  ? 'bg-gradient-to-br from-purple-500 to-pink-500' 
                  : 'bg-gradient-to-br from-teal-400 to-cyan-500'
              }`}>
                {bottleMode === 'party' ? <Beer className="w-6 h-6 text-white" /> : <Droplets className="w-6 h-6 text-white" />}
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  MoodSip
                </h1>
                <p className="text-xs text-gray-500">
                  {bottleMode === 'party' ? 'Party Tracker 🎉' : 'Sip Your Stress Away'}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-400 text-white hover:shadow-lg transition-all">
                <Zap className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-xl bg-white border border-teal-200 text-teal-600 hover:shadow-lg transition-all">
                <Bell className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-8 pb-24">
        {activeScreen === 'home' && renderHome()}
        {activeScreen === 'moods' && renderMoodsScreen()}
        {activeScreen === 'achievements' && renderAchievementsScreen()}
        {activeScreen === 'partystats' && renderPartyStatsScreen()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-teal-100 z-50">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-around">
            {[
              { id: 'home', icon: Droplets, label: 'Home' },
              { id: 'moods', icon: Smile, label: 'Moods' },
              { id: 'achievements', icon: Trophy, label: 'Rewards' },
              { id: 'stats', icon: TrendingUp, label: 'Stats' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveScreen(tab.id)}
                className={`flex flex-col items-center gap-1 transition-all ${
                  activeScreen === tab.id
                    ? 'text-teal-600'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <tab.icon className={`w-6 h-6 ${activeScreen === tab.id ? 'scale-110' : ''} transition-transform`} />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

