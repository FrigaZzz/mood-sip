import React from 'react';

interface MoodSipBottleProps {
  fillPercentage: number;
  isConnected?: boolean;
  isScanning?: boolean;
  onBottleTap?: () => void;
  size?: 'small' | 'medium' | 'large';
  showDrinkReminder?: boolean;
}

const MoodSipBottle: React.FC<MoodSipBottleProps> = ({
  fillPercentage,
  isConnected = true,
  isScanning = false,
  onBottleTap,
  size = 'large',
  showDrinkReminder = false
}) => {
  const getSizeProps = () => {
    switch (size) {
      case 'small':
        return { width: 300, height: 200, viewBox: "0 0 280 420" };
      case 'large':
        return { width: 200, height: 300, viewBox: "0 0 280 420" };
      case 'medium':
      default:
        return { width: 140, height: 200, viewBox: "0 0 280 420" };
    }
  };

  const { width, height, viewBox } = getSizeProps();

  return (
    <div className="relative flex flex-col items-center justify-center w-full">
      <div 
        className="relative cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center"
        onClick={onBottleTap}
      >
        <svg 
          width={width} 
          height={height} 
          viewBox={viewBox} 
          className="drop-shadow-2xl"
        >
          <defs>
            {/* MoodSip teal bottle gradient */}
            <linearGradient id={`bottleGradient-${size}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4db8b8" />
              <stop offset="50%" stopColor="#3CBDB1" />
              <stop offset="100%" stopColor="#1a5f5f" />
            </linearGradient>

            {/* Water gradient */}
            <linearGradient id={`waterGradient-${size}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#60d5d5" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#4dd0d0" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3cc5c5" stopOpacity="0.7" />
            </linearGradient>
            
            {/* Cap gradient */}
            <linearGradient id={`capGradient-${size}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2d7a7a" />
              <stop offset="100%" stopColor="#1a5f5f" />
            </linearGradient>

            {/* Drink reminder stripe gradient - light blue like real product */}
            <linearGradient id={`reminderStripeGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7dd3fc" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>

            {/* Water clipping path - matches bottle interior accounting for stroke */}
            <clipPath id={`waterClip-${size}`}>
              <rect x="68" y="128" width="124" height="254" rx="22" />
            </clipPath>
          </defs>

          {/* Handle - positioned at top connecting to cap */}
          <path
            d="M 180 85 Q 210 90 210 100 Q 210 110 180 115"
            fill="none"
            stroke="#1a5f5f"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M 180 87 Q 208 91 208 100 Q 208 109 180 113"
            fill="none"
            stroke="#4db8b8"
            strokeWidth="6"
            strokeLinecap="round"
          />
          
          {/* Main Bottle Body */}
          <rect
            x="60"
            y="120"
            width="140"
            height="270"
            rx="30"
            fill={`url(#bottleGradient-${size})`}
            stroke="#1a5f5f"
            strokeWidth="8"
          />

          {/* Drink Reminder Stripe - Horizontal band like real product */}
          {showDrinkReminder && (
            <rect
              x="68"
              y="280"
              width="124"
              height="20"
              rx="10"
              fill={`url(#reminderStripeGradient-${size})`}
              opacity="0.8"
            >
              <animate 
                attributeName="opacity" 
                values="0.8;0.3;0.8" 
                dur="2s" 
                repeatCount="indefinite" 
              />
              <animate 
                attributeName="fill" 
                values="#7dd3fc;#38bdf8;#0ea5e9;#38bdf8;#7dd3fc"
                dur="3s" 
                repeatCount="indefinite" 
              />
            </rect>
          )}
          
          {/* Water Fill with realistic animation */}
          <g clipPath={`url(#waterClip-${size})`}>
            <rect
              x="68"
              y={128 + (254 * (1 - fillPercentage / 100))}
              width="124"
              height={254 * (fillPercentage / 100)}
              rx="22"
              fill={`url(#waterGradient-${size})`}
              className="transition-all duration-1000 ease-in-out"
            >
              {/* Water movement effect when level changes */}
              <animate 
                attributeName="opacity" 
                values="0.9;1;0.9" 
                dur="2s" 
                repeatCount="indefinite" 
              />
            </rect>
            
            {/* Water Surface Line with ripples - moves with water level */}
            {fillPercentage > 5 && (() => {
              const surfaceY = 128 + (254 * (1 - fillPercentage / 100));
              
              return (
                <>
                  {/* Main water surface line - follows water level */}
                  <path
                    d={`M 68 ${surfaceY} Q 130 ${surfaceY - 1} 192 ${surfaceY}`}
                    fill="none"
                    stroke="#4dd0d0"
                    strokeWidth="2"
                    opacity="0.8"
                    className="transition-all duration-1000 ease-in-out"
                    key={`surface-${fillPercentage}`}
                  >
                    {/* Gentle ripple animation that follows current water level */}
                    <animate 
                      attributeName="d" 
                      values={`M 68 ${surfaceY} Q 130 ${surfaceY - 2} 192 ${surfaceY};M 68 ${surfaceY} Q 130 ${surfaceY + 1} 192 ${surfaceY};M 68 ${surfaceY} Q 130 ${surfaceY - 2} 192 ${surfaceY}`}
                      dur="3s" 
                      repeatCount="indefinite" 
                    />
                  </path>
                  
                  {/* Secondary ripple - also follows water level */}
                  <path
                    d={`M 72 ${surfaceY} Q 130 ${surfaceY + 1} 188 ${surfaceY}`}
                    fill="none"
                    stroke="#60d5d5"
                    strokeWidth="1"
                    opacity="0.6"
                    className="transition-all duration-1000 ease-in-out"
                    key={`ripple-${fillPercentage}`}
                  >
                    <animate 
                      attributeName="d" 
                      values={`M 72 ${surfaceY} Q 130 ${surfaceY + 1} 188 ${surfaceY};M 72 ${surfaceY} Q 130 ${surfaceY - 1} 188 ${surfaceY};M 72 ${surfaceY} Q 130 ${surfaceY + 1} 188 ${surfaceY}`}
                      dur="4s" 
                      repeatCount="indefinite" 
                    />
                  </path>
                  
                  {/* Surface reflection - moves with water */}
                  <ellipse
                    cx="130"
                    cy={surfaceY}
                    rx="45"
                    ry="3"
                    fill="white"
                    opacity="0.3"
                    className="transition-all duration-1000 ease-in-out"
                    key={`reflection-${fillPercentage}`}
                  >
                    <animate 
                      attributeName="opacity" 
                      values="0.3;0.1;0.3" 
                      dur="2.5s" 
                      repeatCount="indefinite" 
                    />
                  </ellipse>
                </>
              );
            })()}
            
            {/* Animated bubbles in water - stay within current water boundaries */}
            {fillPercentage > 10 && (() => {
              const waterTop = 128 + (254 * (1 - fillPercentage / 100));
              const waterBottom = 382;
              const waterHeight = waterBottom - waterTop;
              
              // Only show bubbles if there's enough water height
              if (waterHeight < 40) return null;
              
              // Calculate safe bubble positions within current water level
              const bubble1Start = Math.min(waterBottom - 30, waterTop + waterHeight * 0.8);
              const bubble1End = waterTop + 15;
              const bubble2Start = Math.min(waterBottom - 20, waterTop + waterHeight * 0.7);
              const bubble2End = waterTop + 20;
              const bubble3Start = Math.min(waterBottom - 25, waterTop + waterHeight * 0.9);
              const bubble3End = waterTop + 10;
              
              return (
                <>
                  <circle 
                    cx="100" 
                    cy={bubble1Start} 
                    r="4" 
                    fill="white" 
                    opacity="0.6"
                    key={`bubble1-${fillPercentage}`}
                  >
                    <animate 
                      attributeName="cy" 
                      values={`${bubble1Start};${bubble1End};${bubble1Start}`} 
                      dur="3s" 
                      repeatCount="indefinite" 
                    />
                  </circle>
                  <circle 
                    cx="150" 
                    cy={bubble2Start} 
                    r="3" 
                    fill="white" 
                    opacity="0.6"
                    key={`bubble2-${fillPercentage}`}
                  >
                    <animate 
                      attributeName="cy" 
                      values={`${bubble2Start};${bubble2End};${bubble2Start}`} 
                      dur="4s" 
                      repeatCount="indefinite" 
                    />
                  </circle>
                  <circle 
                    cx="120" 
                    cy={bubble3Start} 
                    r="5" 
                    fill="white" 
                    opacity="0.6"
                    key={`bubble3-${fillPercentage}`}
                  >
                    <animate 
                      attributeName="cy" 
                      values={`${bubble3Start};${bubble3End};${bubble3Start}`} 
                      dur="3.5s" 
                      repeatCount="indefinite" 
                    />
                  </circle>
                </>
              );
            })()}
          </g>

          {/* Red Mood Sensor Dot */}
          {/* <circle cx="130" cy="200" r="12" fill="#2b9ad2ff">
            <animate 
              attributeName="opacity" 
              values="1;0.7;1" 
              dur="2s" 
              repeatCount="indefinite" 
            />
          </circle> */}
          
          {/* Smiley Face */}
          <circle cx="110" cy="180" r="8" fill="#1a5f5f" />
          <circle cx="150" cy="180" r="8" fill="#1a5f5f" />
          <path
            d="M 105 210 Q 130 230 155 210"
            fill="none"
            stroke="#1a5f5f"
            strokeWidth="6"
            strokeLinecap="round"
          />
          
          {/* Cap with darker teal */}
          <rect
            x="80"
            y="70"
            width="100"
            height="50"
            rx="8"
            fill={`url(#capGradient-${size})`}
            stroke="#1a5f5f"
            strokeWidth="6"
          />
          
          {/* Cap top section (lighter) */}
          <rect
            x="85"
            y="75"
            width="90"
            height="25"
            rx="5"
            fill="#4db8b8"
          />
          
          {/* Camera Sensor Housing on Cap */}
          <g transform="translate(130, 50)">
            <circle 
              cx="0" 
              cy="0" 
              r="22" 
              fill="#1a1a1a"
              className={isScanning || isConnected ? 'animate-pulse' : ''}
            />
            <circle 
              cx="0" 
              cy="0" 
              r="18" 
              fill="#2a2a2a"
            />
            {/* Camera lens */}
            <circle 
              cx="0" 
              cy="0" 
              r="10" 
              fill={(isScanning || isConnected) ? '#ef4444' : '#4a5568'}
            />
            <circle 
              cx="0" 
              cy="0" 
              r="6" 
              fill={(isScanning || isConnected) ? '#dc2626' : '#1f2937'}
            />
            {/* Lens reflection */}
            <circle 
              cx="-2" 
              cy="-2" 
              r="3" 
              fill="white"
              opacity="0.4"
            />
            Recording indicator
            {(isScanning || isConnected) && (
              <circle 
                cx="12" 
                cy="-12" 
                r="4" 
                fill="#ef4444"
              >
                <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
              </circle>
            )}
          </g>
          
          {/* Scanning waves effect */}
          {(isScanning || isConnected) && (
            <>
              <circle cx="130" cy="50" r="30" fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.6">
                <animate attributeName="r" values="30;50;70" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0.3;0" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="130" cy="50" r="30" fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.6">
                <animate attributeName="r" values="30;50;70" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0.3;0" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
              </circle>
            </>
          )}

          {/* Connection status indicator */}
          {!isConnected && (
            <circle cx="220" cy="100" r="6" fill="#EF4444" opacity="0.9">
              <animate attributeName="opacity" values="0.9;0.4;0.9" dur="2s" repeatCount="indefinite" />
            </circle>
          )}
        </svg>

        {/* Scanning Status Text */}
        {isScanning && (
          <div className="text-center mt-4">
            <p className="text-lg font-semibold text-gray-700 animate-pulse">
              📷 Analyzing your mood...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodSipBottle;