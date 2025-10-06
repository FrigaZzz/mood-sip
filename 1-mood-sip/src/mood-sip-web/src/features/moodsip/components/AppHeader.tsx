import { Droplets, PartyPopper, Trophy, Zap, Brain, Settings } from 'lucide-react';

interface AppHeaderProps {
  activeScreen: string;
  onOpenSettings?: () => void;
}

export default function AppHeader({ activeScreen, onOpenSettings }: AppHeaderProps) {
  const getHeaderIcon = () => {
    switch (activeScreen) {
      case 'social':
        return <PartyPopper className="w-6 h-6 text-white" />;
      case 'mood':
        return <Brain className="w-6 h-6 text-white" />;
      case 'progress':
        return <Trophy className="w-6 h-6 text-white" />;
      default:
        return <Droplets className="w-6 h-6 text-white" />;
    }
  };

  const getHeaderGradient = () => {
    switch (activeScreen) {
      case 'social':
        return 'bg-gradient-to-br from-pink-500 to-purple-500';
      case 'mood':
        return 'bg-gradient-to-br from-purple-500 to-indigo-500';
      case 'progress':
        return 'bg-gradient-to-br from-yellow-500 to-orange-500';
      default:
        return 'bg-gradient-to-br from-teal-400 to-cyan-500';
    }
  };

  const getHeaderSubtitle = () => {
    switch (activeScreen) {
      case 'social':
        return 'Party Mode 🎉';
      case 'mood':
        return 'AI Mood Analysis 🧠';
      case 'progress':
        return 'Your Progress';
      case 'hydrate':
        return 'Smart IoT Bottle Hub 🍶';
      default:
        return 'Stay Hydrated & Happy';
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-md mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transform hover:scale-105 transition-transform ${getHeaderGradient()}`}>
              {getHeaderIcon()}
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                MoodSip
              </h1>
              <p className="text-xs text-gray-500">
                {getHeaderSubtitle()}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-3 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-400 text-white hover:shadow-lg transition-all transform hover:scale-105 active:scale-95">
              <Zap className="w-5 h-5" />
            </button>
            <button 
              onClick={onOpenSettings}
              className="p-3 rounded-xl bg-white border border-gray-300 text-gray-600 hover:shadow-lg transition-all transform hover:scale-105 active:scale-95"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}