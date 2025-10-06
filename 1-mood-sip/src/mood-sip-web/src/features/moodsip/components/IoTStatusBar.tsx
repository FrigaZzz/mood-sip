import { Bluetooth, Battery, Camera, Zap, Waves, Activity, WifiOff } from 'lucide-react';

interface IoTStatusBarProps {
  bluetoothConnected: boolean;
  batteryLevel: number;
  cameraActive?: boolean;
  sensorsActive?: boolean;
  signalStrength?: number; // 0-4 bars
  deviceName?: string;
}

export default function IoTStatusBar({ 
  bluetoothConnected, 
  batteryLevel, 
  cameraActive = true,
  sensorsActive = true,
  signalStrength = 4,
  deviceName = "MoodSip Device"
}: IoTStatusBarProps) {
  const getBatteryIcon = () => {
    if (batteryLevel > 75) return <Battery className="w-3 h-3" />;
    if (batteryLevel > 50) return <Battery className="w-3 h-3" />;
    if (batteryLevel > 25) return <Battery className="w-3 h-3" />;
    return <Zap className="w-3 h-3" />; // Low battery warning
  };

  return (
    <div className="flex flex-col gap-2 mb-4">
      {/* Device Connection Header */}
      <div className="flex items-center justify-center gap-2">
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
          bluetoothConnected 
            ? 'bg-blue-50 text-blue-700 border-2 border-blue-200 shadow-sm' 
            : 'bg-gray-50 text-gray-500 border-2 border-gray-200'
        }`}>
          <div className="relative">
            {bluetoothConnected ? (
              <Bluetooth className="w-4 h-4" />
            ) : (
              <WifiOff className="w-4 h-4" />
            )}
            {/* Connection pulse indicator */}
            {bluetoothConnected && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            )}
          </div>
          <span className="font-semibold">
            {bluetoothConnected ? deviceName : 'Device Offline'}
          </span>
          {/* Signal strength indicator */}
          {bluetoothConnected && (
            <div className="flex items-center gap-0.5 ml-1">
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={`w-0.5 bg-blue-500 rounded-full transition-all duration-300 ${
                    bar <= signalStrength 
                      ? 'opacity-100' 
                      : 'opacity-20'
                  }`}
                  style={{ height: `${3 + bar}px` }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* IoT Components Status */}
      <div className="flex items-center justify-center gap-2">
        {/* Battery Status - Enhanced */}
        <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border-2 transition-all duration-300 shadow-sm hover:shadow-md ${
          batteryLevel > 60 
            ? 'bg-green-50 text-green-700 border-green-200' 
            : batteryLevel > 30
            ? 'bg-amber-50 text-amber-700 border-amber-200'
            : 'bg-red-50 text-red-700 border-red-200 animate-pulse'
        }`}>
          <div className="relative">
            {getBatteryIcon()}
            {/* Battery charge indicator */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className={`h-1 rounded-full transition-all duration-700 ${
                  batteryLevel > 60 ? 'bg-green-500' : batteryLevel > 30 ? 'bg-amber-500' : 'bg-red-500'
                }`}
                style={{ width: `${Math.max(3, batteryLevel / 100 * 8)}px` }}
              />
            </div>
            {/* Low battery warning */}
            {batteryLevel <= 15 && (
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full animate-bounce" />
            )}
          </div>
          <span>{Math.floor(batteryLevel)}%</span>
        </div>
        
        {/* Camera Status - Enhanced */}
        <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border-2 transition-all duration-300 shadow-sm hover:shadow-md ${
          cameraActive 
            ? 'bg-purple-50 text-purple-700 border-purple-200' 
            : 'bg-gray-50 text-gray-500 border-gray-200'
        }`}>
          <div className="relative">
            <Camera className="w-4 h-4" />
            {/* Active recording indicator */}
            {cameraActive && (
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            )}
          </div>
          <span className="hidden xs:inline">{cameraActive ? 'Active' : 'Off'}</span>
        </div>

        {/* Sensors Status - NEW */}
        <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border-2 transition-all duration-300 shadow-sm hover:shadow-md ${
          sensorsActive 
            ? 'bg-teal-50 text-teal-700 border-teal-200' 
            : 'bg-gray-50 text-gray-500 border-gray-200'
        }`}>
          <div className="relative">
            <Activity className="w-4 h-4" />
            {/* Sensor activity indicator */}
            {sensorsActive && (
              <div className="absolute -top-0.5 -right-0.5">
                <Waves className="w-2 h-2 text-teal-500 animate-pulse" />
              </div>
            )}
          </div>
          <span className="hidden xs:inline">{sensorsActive ? 'Sensing' : 'Off'}</span>
        </div>
      </div>
    </div>
  );
}