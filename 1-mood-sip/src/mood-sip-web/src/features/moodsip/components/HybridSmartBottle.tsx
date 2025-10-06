import { useState } from 'react';

interface HybridSmartBottleProps {
  fillPercentage: number;
  isConnected: boolean;
  isRecording?: boolean;
  onBottleTap?: () => void;
  sipsCount: number;
  className?: string;
}

export default function HybridSmartBottle({ 
  fillPercentage, 
  isConnected, 
  isRecording = false,
  onBottleTap,
  sipsCount,
  className = ""
}: HybridSmartBottleProps) {
  const [isPressed, setIsPressed] = useState(false);

  // Mood states based on sips - friendly and encouraging
  const getMoodState = () => {
    if (sipsCount === 0) return { mood: 'waiting', message: 'Ready to hydrate!', color: '#0891B2' };
    if (sipsCount <= 2) return { mood: 'starting', message: 'Great start!', color: '#0EA5E9' };
    if (sipsCount <= 4) return { mood: 'good', message: 'Keep it up!', color: '#06B6D4' };
    if (sipsCount <= 6) return { mood: 'excellent', message: 'Fantastic!', color: '#22D3EE' };
    return { mood: 'complete', message: 'Goal achieved!', color: '#67E8F9' };
  };

  const moodState = getMoodState();

  const handlePress = () => {
    setIsPressed(true);
    onBottleTap?.();
    setTimeout(() => setIsPressed(false), 150);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Subtle Connection Status - Only show when disconnected */}
      {!isConnected && (
        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-400 border border-white shadow-sm z-10 animate-pulse"></div>
      )}
      
      <div 
        className={`relative cursor-pointer transition-all duration-300 ${
          isPressed ? 'scale-95' : 'scale-100'
        } ${onBottleTap ? 'hover:scale-105' : ''}`}
        onClick={handlePress}
      >
        <svg width="120" height="160" viewBox="0 0 120 160" className="drop-shadow-xl">
          <defs>
            {/* Water gradient - more vibrant */}
            <linearGradient id="hybridWaterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#22D3EE" stopOpacity="1" />
              <stop offset="100%" stopColor="#0891B2" stopOpacity="1" />
            </linearGradient>

            {/* Bottle body gradient - cleaner */}
            <linearGradient id="hybridBottleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="50%" stopColor="#F1F5F9" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>
            
            {/* Cap gradients - more modern */}
            <linearGradient id="hybridCapGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E40AF" />
              <stop offset="100%" stopColor="#1E3A8A" />
            </linearGradient>

            <linearGradient id="hybridCapRing" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1E40AF" />
            </linearGradient>

            {/* Clip path for water fill - using your bottle shape */}
            <clipPath id="hybridBottleShape">
              <path d="M 30 40 Q 28 50 28 60 L 28 135 Q 28 145 35 148 L 85 148 Q 92 145 92 135 L 92 60 Q 92 50 90 40 Z" />
            </clipPath>

            {/* Subtle texture pattern */}
            <pattern id="hybridBottleTexture" patternUnits="userSpaceOnUse" width="3" height="3">
              <circle cx="1.5" cy="1.5" r="0.3" fill="#CBD5E1" opacity="0.1"/>
            </pattern>
          </defs>

          {/* Bottle Cap - Your design but enhanced */}
          <rect x="40" y="5" width="40" height="15" rx="4" fill="url(#hybridCapGradient)" stroke="#1E3A8A" strokeWidth="1"/>
          <rect x="35" y="18" width="50" height="8" rx="3" fill="url(#hybridCapRing)" stroke="#1E40AF" strokeWidth="1"/>
          
          {/* Cap highlight */}
          <rect x="42" y="7" width="36" height="3" rx="1.5" fill="#60A5FA" opacity="0.7"/>

          {/* Bottle Body - Your exact shape but enhanced styling */}
          <path
            d="M 35 26 L 30 40 Q 28 50 28 60 L 28 135 Q 28 145 35 148 L 85 148 Q 92 145 92 135 L 92 60 Q 92 50 90 40 L 85 26 Z"
            fill="url(#hybridBottleGradient)"
            stroke="#0891B2"
            strokeWidth="2.5"
          />

          {/* Bottle texture overlay */}
          <path
            d="M 35 26 L 30 40 Q 28 50 28 60 L 28 135 Q 28 145 35 148 L 85 148 Q 92 145 92 135 L 92 60 Q 92 50 90 40 L 85 26 Z"
            fill="url(#hybridBottleTexture)"
          />

          {/* Water Fill - Your logic but with enhanced animation */}
          <g clipPath="url(#hybridBottleShape)">
            <rect
              x="28"
              y={148 - (fillPercentage / 100) * 108}
              width="64"
              height={(fillPercentage / 100) * 108}
              fill="url(#hybridWaterGradient)"
              className="transition-all duration-700 ease-out"
            />
            
            {/* Enhanced Wave Animation - Your concept improved */}
            {fillPercentage > 5 && (
              <path
                d={`M 28 ${148 - (fillPercentage / 100) * 108} 
                   Q 45 ${146 - (fillPercentage / 100) * 108} 
                   60 ${148 - (fillPercentage / 100) * 108} 
                   T 92 ${148 - (fillPercentage / 100) * 108}`}
                fill="none"
                stroke="#F0F9FF"
                strokeWidth="1.5"
                opacity="0.8"
                strokeLinecap="round"
              >
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="translate"
                  values="0,0; 3,0; -3,0; 0,0"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </path>
            )}
          </g>

          {/* Subtle Smart Ring - Only visible when needed */}
          {isConnected && (
            <circle
              cx="60"
              cy="70"
              r="20"
              fill="none"
              stroke="#22D3EE"
              strokeWidth="1"
              strokeDasharray="2,4"
              opacity="0.3"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0 60 70;360 60 70"
                dur="12s"
                repeatCount="indefinite"
              />
            </circle>
          )}

          {/* Friendly Face - Clean and modern */}
          {/* Eyes - Subtle monitoring sensors (friendly blue/gray) */}
          <circle 
            cx="52" 
            cy="85" 
            r="2" 
            fill="#0891B2"
            opacity="0.7"
          />
          <circle 
            cx="68" 
            cy="85" 
            r="2" 
            fill="#0891B2"
            opacity="0.7"
          />

          {/* Simple smile - no cheeks as requested */}
          <path 
            d="M 48 95 Q 60 102 72 95" 
            fill="none" 
            stroke={moodState.color} 
            strokeWidth="2.5" 
            strokeLinecap="round"
            opacity="0.8"
            className="transition-all duration-500"
          />

          {/* Smart Label - Clean typography */}
          <text 
            x="60" 
            y="118" 
            textAnchor="middle" 
            fontSize="7" 
            fill="#64748B" 
            fontFamily="system-ui, -apple-system"
            fontWeight="600"
            letterSpacing="0.5"
          >
            SMART BOTTLE
          </text>

          {/* AI REC Indicator - Prominent and centered in bottle */}
          {isRecording && (
            <g>
              {/* REC background circle */}
              <circle 
                cx="60" 
                cy="80" 
                r="12" 
                fill="rgba(239, 68, 68, 0.9)" 
                stroke="white" 
                strokeWidth="2"
              >
                <animate
                  attributeName="r"
                  values="12;14;12"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>
              
              {/* REC text */}
              <text 
                x="60" 
                y="84" 
                textAnchor="middle" 
                fontSize="8" 
                fill="white" 
                fontFamily="system-ui"
                fontWeight="700"
              >
                REC
              </text>
              
              {/* Recording dots */}
              <circle cx="74" cy="76" r="1.5" fill="white">
                <animate
                  attributeName="opacity"
                  values="1;0.3;1"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="74" cy="80" r="1.5" fill="white">
                <animate
                  attributeName="opacity"
                  values="0.3;1;0.3"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="74" cy="84" r="1.5" fill="white">
                <animate
                  attributeName="opacity"
                  values="1;0.3;1"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          )}

          {/* AI Smart Indicator - Always visible to show AI capabilities */}
          {!isRecording && (
            <g>
              <circle 
                cx="60" 
                cy="80" 
                r="8" 
                fill="rgba(34, 211, 238, 0.2)" 
                stroke="#22D3EE" 
                strokeWidth="1"
                strokeDasharray="2,2"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="0 60 80;360 60 80"
                  dur="8s"
                  repeatCount="indefinite"
                />
              </circle>
              
              <text 
                x="60" 
                y="84" 
                textAnchor="middle" 
                fontSize="7" 
                fill="#22D3EE" 
                fontFamily="system-ui"
                fontWeight="600"
                opacity="0.8"
              >
                AI
              </text>
            </g>
          )}
        </svg>

        {/* Status Message - Clean and informative */}
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-max">
          <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-medium text-gray-700 shadow-lg border border-gray-200">
            {moodState.message}
          </div>
        </div>
      </div>
    </div>
  );
}