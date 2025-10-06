import { Droplets, TrendingUp, Clock, Thermometer, Battery, Wifi, BarChart3, Zap, Activity } from 'lucide-react';

interface HydrationTabProps {
  progress: number;
  isBottleConnected: boolean;
  batteryLevel: number;
  onRecordSip: () => void;
}

export default function HydrationTab({ 
  progress, 
  isBottleConnected, 
  batteryLevel 
}: HydrationTabProps) {
  // Generate mock historical data for the week
  const weeklyData = [
    { day: 'Mon', glasses: 6, temp: 22, avgSipTime: 45 },
    { day: 'Tue', glasses: 8, temp: 20, avgSipTime: 38 },
    { day: 'Wed', glasses: 7, temp: 24, avgSipTime: 42 },
    { day: 'Thu', glasses: 5, temp: 18, avgSipTime: 55 },
    { day: 'Fri', glasses: 8, temp: 21, avgSipTime: 35 },
    { day: 'Sat', glasses: progress, temp: 19, avgSipTime: 40 }
  ];

  // Calculate insights
  const weeklyAvg = weeklyData.slice(0, 5).reduce((sum, day) => sum + day.glasses, 0) / 5;
  const trend = progress > weeklyAvg ? 'above' : progress < weeklyAvg ? 'below' : 'on-track';
  
  // Time-based hydration pattern (today's hourly data)
  const todayPattern = [
    { hour: '6AM', sips: 0, active: false }, 
    { hour: '8AM', sips: 1, active: true }, 
    { hour: '10AM', sips: 1, active: true }, 
    { hour: '12PM', sips: 2, active: true }, 
    { hour: '2PM', sips: 1, active: true }, 
    { hour: '4PM', sips: 0, active: false }, 
    { hour: '6PM', sips: 0, active: false }, 
    { hour: '8PM', sips: 0, active: false }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Current Status */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-6 text-white">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold">💧 Hydration Analytics</h2>
            <p className="text-cyan-100">Track your intake patterns & insights</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{progress}/8</div>
            <div className="text-cyan-100">Today</div>
          </div>
        </div>
        
        {/* Quick status indicators */}
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            <span>{trend === 'above' ? '+12%' : trend === 'below' ? '-8%' : '0%'} vs avg</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>Last sip: 23min ago</span>
          </div>
        </div>
      </div>

      {/* Weekly Trend Analysis */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">Weekly Trend</h3>
          <BarChart3 className="w-5 h-5 text-blue-600" />
        </div>
        
        {/* Weekly Bar Chart */}
        <div className="mb-6">
          <div className="flex justify-between items-end h-32 px-2">
            {weeklyData.map((day, i) => {
              const height = (day.glasses / 8) * 100;
              const isToday = day.day === 'Sat';
              
              return (
                <div key={day.day} className="flex-1 flex flex-col items-center">
                  <div 
                    className={`w-8 rounded-t transition-all duration-500 ${
                      isToday ? 'bg-blue-500' : day.glasses >= 8 ? 'bg-green-500' : day.glasses >= 6 ? 'bg-yellow-500' : 'bg-orange-500'
                    }`}
                    style={{ height: `${Math.max(height, 10)}%` }}
                  />
                  <div className="text-xs text-gray-500 mt-2">{day.day}</div>
                  <div className="text-xs font-medium text-gray-700">{day.glasses}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="p-3 bg-blue-50 rounded-xl">
            <div className="font-medium text-gray-700">Weekly Average</div>
            <div className="text-2xl font-bold text-blue-600">{weeklyAvg.toFixed(1)}</div>
          </div>
          <div className="p-3 bg-green-50 rounded-xl">
            <div className="font-medium text-gray-700">Best Day</div>
            <div className="text-2xl font-bold text-green-600">8</div>
          </div>
        </div>
      </div>

      {/* Today's Hourly Pattern */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">Today's Pattern</h3>
          <Activity className="w-5 h-5 text-purple-600" />
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          {todayPattern.map((slot, i) => (
            <div key={slot.hour} className={`p-3 rounded-xl border-2 ${
              slot.active 
                ? slot.sips > 0 
                  ? 'bg-blue-50 border-blue-200' 
                  : 'bg-yellow-50 border-yellow-200'
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="text-xs font-medium text-gray-600">{slot.hour}</div>
              <div className="flex items-center gap-1 mt-1">
                <Droplets className={`w-3 h-3 ${slot.sips > 0 ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className="text-sm font-bold">{slot.sips}</span>
              </div>
            </div>
          ))}
        </div>

                </div>
        
        <div className="mt-4 p-3 bg-purple-50 rounded-xl">
          <div className="text-sm text-purple-700">
            💡 <strong>Pattern Insight:</strong> You hydrate most at lunch time. Try setting a 10 AM reminder to spread intake evenly.
          </div>
        </div>
      </div>
  )
      {/* Live IoT Device Monitoring */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-800 mb-4">🍶 Smart Bottle Monitoring</h3>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Connection Status */}
          <div className={`p-4 rounded-xl border-2 ${
            isBottleConnected 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <Wifi className={`w-4 h-4 ${isBottleConnected ? 'text-green-600' : 'text-red-600'}`} />
              <span className="text-sm font-medium text-gray-700">Connection</span>
            </div>
            <div className={`text-lg font-bold ${isBottleConnected ? 'text-green-600' : 'text-red-600'}`}>
              {isBottleConnected ? 'Connected' : 'Offline'}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {isBottleConnected ? 'Signal: Strong (4/4)' : 'Last seen: 5min ago'}
            </div>
          </div>

          {/* Battery Level */}
          <div className={`p-4 rounded-xl border-2 ${
            batteryLevel > 20 ? 'bg-blue-50 border-blue-200' : 'bg-orange-50 border-orange-200'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <Battery className={`w-4 h-4 ${batteryLevel > 20 ? 'text-blue-600' : 'text-orange-600'}`} />
              <span className="text-sm font-medium text-gray-700">Battery</span>
            </div>
            <div className={`text-lg font-bold ${batteryLevel > 20 ? 'text-blue-600' : 'text-orange-600'}`}>
              {Math.floor(batteryLevel)}%
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {batteryLevel > 50 ? 'Excellent' : batteryLevel > 20 ? 'Good' : 'Charge soon'}
            </div>
          </div>

          {/* Water Temperature */}
          <div className="p-4 rounded-xl border-2 bg-purple-50 border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <Thermometer className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">Water Temp</span>
            </div>
            <div className="text-lg font-bold text-purple-600">19°C</div>
            <div className="text-xs text-gray-500 mt-1">Room temperature</div>
          </div>

          {/* Fluid Level Sensor */}
          <div className="p-4 rounded-xl border-2 bg-cyan-50 border-cyan-200">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-4 h-4 text-cyan-600" />
              <span className="text-sm font-medium text-gray-700">Fluid Level</span>
            </div>
            <div className="text-lg font-bold text-cyan-600">{Math.round((8 - progress) / 8 * 100)}%</div>
            <div className="text-xs text-gray-500 mt-1">
              {progress < 2 ? 'Nearly full' : progress < 6 ? 'Half full' : 'Nearly empty'}
            </div>
          </div>
        </div>
        
        {/* Device Health Summary */}
        <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="font-semibold text-gray-800">Device Health: Excellent</span>
          </div>
          <div className="text-sm text-gray-600">
            All sensors active • Auto-detection working • No issues detected
          </div>
        </div>
      </div>

      {/* Personalized AI Insights */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-6 border-2 border-indigo-200">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-bold text-gray-800">AI Hydration Insights</h3>
        </div>
        
        <div className="space-y-3">
          <div className="p-4 bg-white/70 rounded-xl border border-indigo-100">
            <div className="font-medium text-gray-800 text-sm mb-1">🍋 Optimal Enhancement</div>
            <div className="text-xs text-gray-600">Add lemon today - your focus improves 20% with citrus hydration based on your patterns</div>
          </div>
          
          <div className="p-4 bg-white/70 rounded-xl border border-indigo-100">
            <div className="font-medium text-gray-800 text-sm mb-1">⏰ Smart Timing</div>
            <div className="text-xs text-gray-600">Next optimal sip window: 2:30 PM - prevents your usual 3 PM energy dip</div>
          </div>
          
          <div className="p-4 bg-white/70 rounded-xl border border-indigo-100">
            <div className="font-medium text-gray-800 text-sm mb-1">📊 Weekly Goal</div>
            <div className="text-xs text-gray-600">You're on track to beat last week by 15% - maintain current pace for best results</div>
          </div>
        </div>
      </div>

      {/* Live Bottle Status */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Smart Bottle Status</h3>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Connection Status */}
          <div className={`p-4 rounded-xl border-2 ${
            isBottleConnected 
              ? 'bg-green-50 border-green-200' 
              : 'bg-gray-50 border-gray-200'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <Wifi className={`w-4 h-4 ${isBottleConnected ? 'text-green-600' : 'text-gray-400'}`} />
              <span className="text-sm font-medium text-gray-700">Connection</span>
            </div>
            <div className={`text-lg font-bold ${isBottleConnected ? 'text-green-600' : 'text-gray-400'}`}>
              {isBottleConnected ? 'Connected' : 'Offline'}
            </div>
          </div>

          {/* Battery Level */}
          <div className="p-4 rounded-xl border-2 bg-blue-50 border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Battery className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Battery</span>
            </div>
            <div className="text-lg font-bold text-blue-600">{Math.floor(batteryLevel)}%</div>
          </div>

          {/* Temperature */}
          <div className="p-4 rounded-xl border-2 bg-purple-50 border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <Thermometer className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">Temp</span>
            </div>
            <div className="text-lg font-bold text-purple-600">18°C</div>
          </div>

          {/* Fluid Level */}
          <div className="p-4 rounded-xl border-2 bg-cyan-50 border-cyan-200">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-4 h-4 text-cyan-600" />
              <span className="text-sm font-medium text-gray-700">Level</span>
            </div>
            <div className="text-lg font-bold text-cyan-600">{Math.round((8 - progress) / 8 * 100)}%</div>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-6 border-2 border-indigo-200">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-bold text-gray-800">AI Recommendations</h3>
        </div>
        
        <div className="space-y-3">
          <div className="p-3 bg-white/70 rounded-xl border border-indigo-100">
            <div className="font-medium text-gray-800 text-sm">🍋 Add lemon today for focus</div>
            <div className="text-xs text-gray-600 mt-1">Your concentration improves 20% with citrus hydration</div>
          </div>
          
          <div className="p-3 bg-white/70 rounded-xl border border-indigo-100">
            <div className="font-medium text-gray-800 text-sm">⏰ Next sip at 2:30 PM</div>
            <div className="text-xs text-gray-600 mt-1">Perfect timing to prevent your usual afternoon dip</div>
          </div>
          
          <div className="p-3 bg-white/70 rounded-xl border border-indigo-100">
            <div className="font-medium text-gray-800 text-sm">🌡️ Room temperature water detected</div>
            <div className="text-xs text-gray-600 mt-1">Ideal for mood stability and digestion</div>
          </div>
        </div>
      </div>

      {/* Custom Reminders */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Hydration Reminders</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div>
              <div className="font-medium text-gray-800">Every 45 minutes</div>
              <div className="text-sm text-gray-600">During work hours</div>
            </div>
            <div className="w-12 h-6 bg-blue-500 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div>
              <div className="font-medium text-gray-800">Morning boost</div>
              <div className="text-sm text-gray-600">8:00 AM daily</div>
            </div>
            <div className="w-12 h-6 bg-blue-500 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
            </div>
          </div>
          
          <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors">
            + Add Custom Reminder
          </button>
        </div>
      </div>
}