import { Camera, Plus, Trophy } from 'lucide-react';
import IoTStatusBar from './IoTStatusBar';
import MoodSipBottle from './MoodSipBottle';

interface CleanHydrateTabProps {
  progress: number;
  isBottleConnected?: boolean;
  batteryLevel?: number;
  onRecordSip: () => void;
  onNavigateToMood: () => void;
  onNavigateToCamera: () => void;
}



export default function SmartBottleTab({ 
  progress, 
  isBottleConnected = true,
  batteryLevel = 87,
  onRecordSip, 
  onNavigateToMood, 
  onNavigateToCamera 
}: CleanHydrateTabProps) {
  // Water level decreases as you drink more (starts full, empties with sips)
  const fillPercentage = ((8 - progress) / 8) * 100;
  
  return (
    <div className="space-y-6">
      {/* Main Smart Bottle Section - Clean and Simple */}
      <div className="bg-gradient-to-br from-cyan-300 via-teal-500 to-blue-600 rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden">
        {/* IoT Status - Minimal and top-placed */}
        <IoTStatusBar 
          bluetoothConnected={isBottleConnected} 
          batteryLevel={batteryLevel} 
          cameraActive={true}
          sensorsActive={isBottleConnected}
          signalStrength={isBottleConnected ? 4 : 0}
          deviceName="MoodSip Smart Bottle"
        />
        
        <div className="flex flex-col items-center">
          {/* AI-Powered Smart Bottle - THE Progress Indicator */}
          <div className="mb-6 relative flex flex-col items-center">
            <MoodSipBottle 
              fillPercentage={fillPercentage} 
              isConnected={isBottleConnected}
              onBottleTap={onRecordSip}
              size="small"
            />
            
            {/* Status message below bottle */}
            <div className="mt-4 text-center">
              <p className="text-cyan-100 text-sm">
                {progress === 0 ? "Bottle is full! Let's start hydrating! 💧" : 
                 progress <= 2 ? "Great start! Keep drinking! 🌟" : 
                 progress <= 4 ? "Halfway through your bottle! 💪" : 
                 progress <= 6 ? "Almost empty! You're doing great! 🎉" : 
                 "Bottle empty! Goal achieved! Time to refill! 🏆"}
              </p>
            </div>
          </div>
          
          {/* Progress Display - Bottle IS the progress */}
          <div className="text-center mb-6 w-full">
            <div className="text-5xl font-bold mb-2">{progress}/8</div>
            <div className="text-cyan-100 text-lg mb-2">Glasses today</div>
            {/* <div className="text-cyan-200 text-sm font-medium">{Math.round(fillPercentage)}% complete • Water level = progress</div> */}
          </div>

          {/* Interaction Status - Shows how the smart bottle works */}
          <div className="flex justify-center gap-4">
            {/* Auto-detection status */}
            <div className="text-center bg-white/15 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/20">
              <div className="text-sm text-white font-semibold mb-1">📡 Auto Detection</div>
              <div className="text-xs text-cyan-100">Bottle sensors track sips automatically</div>
            </div>
            
            {/* Manual override for missed sips */}
            <button
              onClick={onRecordSip}
              className="flex flex-col items-center gap-1 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-3 rounded-2xl text-xs font-medium transition-all hover:scale-105 active:scale-95 border border-white/10"
              title="Add sip if sensors missed one"
            >
              <Plus className="w-4 h-4 text-white" />
              <span className="text-white">Add Missed</span>
            </button>
          </div>
        </div>
      </div>

      {/* Smart Bottle Features - IoT Controls */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/20">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Smart Bottle Controls</h3>
          <p className="text-gray-600 text-sm">Manage your IoT hydration companion</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Device Settings */}
          <button className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl p-4 hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]">
            <div className="text-center">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Camera className="w-4 h-4" />
              </div>
              <div className="font-semibold text-sm">Camera</div>
              <div className="text-xs opacity-80">Settings</div>
            </div>
          </button>
          
          <button 
            onClick={onNavigateToMood}
            className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl p-4 hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="text-center">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Trophy className="w-4 h-4" />
              </div>
              <div className="font-semibold text-sm">View Stats</div>
              <div className="text-xs opacity-80">& Progress</div>
            </div>
          </button>
        </div>
      </div>
      
      {/* Quick Mood Check */}
      <div className="bg-gradient-to-br from-purple-100 to-indigo-100 border-2 border-purple-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Quick Mood Check</h3>
              <p className="text-purple-600 text-sm">AI-powered analysis</p>
            </div>
          </div>
        </div>
        
        <button 
          onClick={onNavigateToCamera}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white rounded-xl py-3 font-semibold transition-all flex items-center justify-center gap-2"
        >
          <Camera className="w-4 h-4" />
          Capture Mood Now
        </button>
      </div>
    </div>
  );
}