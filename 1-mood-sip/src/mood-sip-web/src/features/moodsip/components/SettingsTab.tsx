import { Settings, Bluetooth, Battery, Camera, Bell, Palette, Zap, Shield } from 'lucide-react';

export default function SettingsTab() {
  return (
    <div className="space-y-6">
      {/* Settings Header */}
      <div className="bg-gradient-to-br from-gray-700 to-slate-800 rounded-3xl p-8 shadow-2xl text-white">
        <div className="text-center">
          <Settings className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <h2 className="text-2xl font-bold mb-2">Settings</h2>
          <p className="text-gray-300">Customize your MoodSip experience</p>
        </div>
      </div>

      {/* Device Settings */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Bluetooth className="w-5 h-5 text-blue-600" />
          Smart Bottle Settings
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex items-center gap-3">
              <Bluetooth className="w-5 h-5 text-blue-600" />
              <div>
                <div className="font-medium text-gray-800">Bluetooth Connection</div>
                <div className="text-sm text-blue-600">MoodSip Smart Bottle</div>
              </div>
            </div>
            <div className="w-12 h-6 bg-blue-500 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <Battery className="w-5 h-5 text-green-600" />
              <div>
                <div className="font-medium text-gray-800">Battery Alerts</div>
                <div className="text-sm text-gray-600">Notify when battery is low</div>
              </div>
            </div>
            <div className="w-12 h-6 bg-green-500 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <Camera className="w-5 h-5 text-purple-600" />
              <div>
                <div className="font-medium text-gray-800">Camera Privacy</div>
                <div className="text-sm text-gray-600">Control mood scanning permissions</div>
              </div>
            </div>
            <button className="text-purple-600 text-sm font-medium">Manage</button>
          </div>
        </div>
      </div>

      {/* Hydration Settings */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-cyan-600" />
          Hydration Goals
        </h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-cyan-50 rounded-xl border border-cyan-200">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-gray-800">Daily Goal</span>
              <span className="text-cyan-600 font-bold">8 glasses</span>
            </div>
            <input 
              type="range" 
              min="6" 
              max="12" 
              defaultValue="8"
              className="w-full h-2 bg-cyan-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>6</span>
              <span>12</span>
            </div>
          </div>
          
          <div className="p-4 bg-cyan-50 rounded-xl border border-cyan-200">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-gray-800">Reminder Interval</span>
              <span className="text-cyan-600 font-bold">45 min</span>
            </div>
            <input 
              type="range" 
              min="15" 
              max="120" 
              defaultValue="45"
              className="w-full h-2 bg-cyan-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>15m</span>
              <span>2h</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-orange-600" />
          Notifications
        </h3>
        
        <div className="space-y-3">
          {[
            { label: 'Sip Reminders', desc: 'Regular hydration alerts', enabled: true },
            { label: 'Mood Check-ins', desc: 'Daily mood scanning prompts', enabled: true },
            { label: 'Achievement Unlocks', desc: 'Progress and milestone alerts', enabled: false },
            { label: 'Social Challenges', desc: 'Party mode and group activities', enabled: true }
          ].map((setting, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <div className="font-medium text-gray-800">{setting.label}</div>
                <div className="text-sm text-gray-600">{setting.desc}</div>
              </div>
              <div className={`w-12 h-6 rounded-full relative ${setting.enabled ? 'bg-orange-500' : 'bg-gray-300'}`}>
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${setting.enabled ? 'right-0.5' : 'left-0.5'}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Palette className="w-5 h-5 text-pink-600" />
          Appearance
        </h3>
        
        <div className="grid grid-cols-3 gap-3">
          {[
            { name: 'Ocean', gradient: 'from-cyan-400 to-blue-500', active: true },
            { name: 'Sunset', gradient: 'from-orange-400 to-pink-500', active: false },
            { name: 'Forest', gradient: 'from-green-400 to-teal-500', active: false }
          ].map((theme, i) => (
            <button 
              key={i}
              className={`p-4 rounded-xl text-white text-sm font-medium transition-all ${
                theme.active 
                  ? `bg-gradient-to-br ${theme.gradient} shadow-lg scale-105` 
                  : `bg-gradient-to-br ${theme.gradient} opacity-60 hover:opacity-80`
              }`}
            >
              {theme.name}
              {theme.active && <div className="w-2 h-2 bg-white rounded-full mx-auto mt-2"></div>}
            </button>
          ))}
        </div>
      </div>

      {/* Privacy & Data */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-green-600" />
          Privacy & Data
        </h3>
        
        <div className="space-y-3">
          <button className="w-full text-left p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <div className="font-medium text-gray-800">Export My Data</div>
            <div className="text-sm text-gray-600">Download your hydration and mood data</div>
          </button>
          
          <button className="w-full text-left p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <div className="font-medium text-gray-800">Privacy Policy</div>
            <div className="text-sm text-gray-600">How we protect your information</div>
          </button>
          
          <button className="w-full text-left p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors">
            <div className="font-medium text-red-800">Reset All Data</div>
            <div className="text-sm text-red-600">Clear all app data and start fresh</div>
          </button>
        </div>
      </div>
    </div>
  );
}