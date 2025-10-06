import { Droplets } from 'lucide-react';

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

interface SipReminderBarProps {
  nextSip: Date | null;
  sipTimerNow: Date;
  onOpenConfig: () => void;
}

export default function SipReminderBar({ nextSip, sipTimerNow, onOpenConfig }: SipReminderBarProps) {
  return (
    <div className="fixed bottom-[68px] left-0 w-full flex justify-center pointer-events-none select-none z-40">
      <div
        className="max-w-md w-full mx-auto px-3"
        style={{ pointerEvents: 'auto' }}
      >
        <div className="flex items-center justify-between px-4 py-3 bg-cyan-600/95 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3">
            <Droplets className="w-7 h-7 text-white drop-shadow" />
            <div className="flex flex-col leading-tight">
              <span className="text-white font-bold text-base">
                {nextSip
                  ? (nextSip > sipTimerNow
                    ? `Next sip in ${Math.max(0, Math.ceil((nextSip.getTime() - sipTimerNow.getTime()) / 60000))} min`
                    : "Sip now!"
                  ) : "Record your first sip!"}
              </span>
              <span className="text-cyan-200 text-xs font-semibold">
                {nextSip && nextSip > sipTimerNow
                  ? `at ${formatTime(nextSip)}`
                  : ""}
              </span>
            </div>
          </div>
          <button
            className="rounded-full bg-white/90 px-3 py-2 text-cyan-700 font-bold text-sm shadow border-2 border-cyan-300 active:bg-cyan-100 focus:outline-none transition"
            style={{ minWidth: 44, minHeight: 44 }}
            onClick={onOpenConfig}
            title="Change sip reminder interval"
          >
            <span className="hidden sm:inline">Config</span>
            <span className="inline sm:hidden">⏱</span>
          </button>
        </div>
      </div>
    </div>
  );
}