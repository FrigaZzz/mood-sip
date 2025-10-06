import { useState, useEffect } from 'react';
import {
  HydrationTab,
  MoodTab,
  SocialTab,
  ProgressTab,
  SettingsTab,
  SipReminderBar,
  SipConfigModal,
  AppHeader,
  BottomNavigation,
  SmartBottleTab
} from './components';

export default function MoodSipApp() {
  // Start with Smart Bottle as the main entry point
  const [activeScreen, setActiveScreen] = useState('hydrate');
  const [progress, setProgress] = useState(5);
  const [moodHistory] = useState([
    { mood: 'tired', time: '14:30', score: 15 },
    { mood: 'stressed', time: '12:15', score: 25 },
    { mood: 'happy', time: '09:00', score: 85 },
  ]);

  // IoT Smart Bottle State
  const [isBottleConnected, setIsBottleConnected] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState(87);

  // --- Sipping timer state ---
  const [sipInterval, setSipInterval] = useState(45); // minutes
  const [lastSip, setLastSip] = useState<Date | null>(null);
  const [showConfig, setShowConfig] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Compute next sip time
  const nextSip = lastSip ? new Date(lastSip.getTime() + sipInterval * 60000) : null;

  // Remove the previous toast logic and set up live update interval:
  const [sipTimerNow, setSipTimerNow] = useState<Date>(new Date());
  useEffect(() => {
    const interval = setInterval(() => setSipTimerNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const recordSip = () => {
    setProgress(p => Math.min(8, p + 1));
    const newSipTime = new Date();
    setLastSip(newSipTime);
    
    // Simulate battery drain from sip recording
    setBatteryLevel(b => Math.max(0, b - Math.random() * 2));
  };

  // Simulate IoT status changes
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly disconnect/reconnect bottle (rare)
      if (Math.random() < 0.01) {
        setIsBottleConnected(prev => !prev);
      }
      
      // Slowly drain battery
      setBatteryLevel(b => Math.max(0, b - 0.01));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50">
      <AppHeader 
        activeScreen={activeScreen} 
        onOpenSettings={() => setShowSettings(true)}
      />

      <div className="max-w-md mx-auto px-6 py-8 pb-32">
        {activeScreen === 'hydration' && (
          <HydrationTab
            progress={progress}
            isBottleConnected={isBottleConnected}
            batteryLevel={batteryLevel}
            onRecordSip={recordSip}
          />
        )}
        {activeScreen === 'hydrate' && (
          <SmartBottleTab
            progress={progress}
            isBottleConnected={isBottleConnected}
            batteryLevel={batteryLevel}
            onRecordSip={recordSip}
            onNavigateToMood={() => setActiveScreen('mood')}
            onNavigateToCamera={() => setActiveScreen('camera')}
          />
        )}
        {activeScreen === 'mood' && (
          <MoodTab
            moodHistory={moodHistory}
            onNavigateToCamera={() => setActiveScreen('camera')}
          />
        )}
        {activeScreen === 'social' && (
          <SocialTab onNavigateToProgress={() => setActiveScreen('progress')} />
        )}
        {activeScreen === 'progress' && <ProgressTab />}
      </div>

      <SipReminderBar
        nextSip={nextSip}
        sipTimerNow={sipTimerNow}
        onOpenConfig={() => setShowConfig(true)}
      />

      {showConfig && (
        <SipConfigModal
          sipInterval={sipInterval}
          onIntervalChange={setSipInterval}
          onClose={() => setShowConfig(false)}
        />
      )}

      {showSettings && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
          <div className="w-full max-w-md mx-auto bg-white rounded-t-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Settings</h2>
              <button 
                onClick={() => setShowSettings(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <SettingsTab />
            </div>
          </div>
        </div>
      )}

      <BottomNavigation
        activeScreen={activeScreen}
        onScreenChange={setActiveScreen}
      />
    </div>
  );
}