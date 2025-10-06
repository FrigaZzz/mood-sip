import { Droplets, PartyPopper, Trophy, Brain, Coffee } from 'lucide-react';

interface BottomNavigationProps {
  activeScreen: string;
  onScreenChange: (screen: string) => void;
}

export default function BottomNavigation({ activeScreen, onScreenChange }: BottomNavigationProps) {
  const navItems = [
    {
      id: 'hydration',
      icon: Droplets,
      label: 'Hydration',
      activeGradient: 'from-cyan-500 to-blue-500',
      hoverColor: 'hover:text-cyan-600'
    },
    {
      id: 'mood',
      icon: Brain,
      label: 'AI Mood',
      activeGradient: 'from-purple-500 to-indigo-500',
      hoverColor: 'hover:text-purple-600'
    },
    {
      id: 'hydrate',
      icon: Coffee,
      label: 'Home',
      activeGradient: 'from-blue-500 to-cyan-500',
      hoverColor: 'hover:text-blue-600',
      isCenter: false
    },
    {
      id: 'social',
      icon: PartyPopper,
      label: 'Social',
      activeGradient: 'from-pink-500 to-purple-500',
      hoverColor: 'hover:text-pink-600'
    },
    {
      id: 'progress',
      icon: Trophy,
      label: 'Progress',
      activeGradient: 'from-yellow-500 to-orange-500',
      hoverColor: 'hover:text-yellow-600'
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 z-50 shadow-2xl">
      <div className="max-w-md mx-auto flex justify-center items-end px-2 py-2">
        {navItems.map((item) => {
          const isCenter = item.isCenter;
          const isActive = activeScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onScreenChange(item.id)}
              className={`${isCenter ? 'w-16 h-16 mx-2 -mt-2' : 'flex-1 h-14'} flex flex-col items-center justify-center rounded-2xl transition-all transform ${
                isActive
                  ? `bg-gradient-to-t ${item.activeGradient} text-white shadow-lg ${isCenter ? 'scale-110 shadow-xl' : 'scale-105'}`
                  : `text-gray-400 ${item.hoverColor} hover:bg-gray-50 active:scale-95`
              }`}
              aria-label={item.label}
            >
              <item.icon className={`${isCenter ? 'w-7 h-7' : 'w-6 h-6'} ${isCenter ? (isActive ? 'mb-0' : 'mb-0') : 'mb-1'}`} />
              {!isCenter && <span className="text-xs font-medium leading-tight">{item.label}</span>}
              {isCenter && isActive && <span className="text-xs font-medium leading-tight mt-1">{item.label}</span>}
            </button>
          );
        })}
      </div>
    </nav>
  );
}