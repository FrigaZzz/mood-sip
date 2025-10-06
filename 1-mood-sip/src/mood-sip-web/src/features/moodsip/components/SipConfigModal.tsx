interface SipConfigModalProps {
  sipInterval: number;
  onIntervalChange: (interval: number) => void;
  onClose: () => void;
}

export default function SipConfigModal({ sipInterval, onIntervalChange, onClose }: SipConfigModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-sm flex flex-col items-center">
        <h3 className="font-bold text-lg mb-2 text-cyan-800">
          Sip Reminder Interval
        </h3>
        <div className="flex items-center gap-2 mb-4 w-full justify-center">
          <input
            type="number"
            min={5}
            max={180}
            value={sipInterval}
            onChange={e => onIntervalChange(Math.max(5, Math.min(180, Number(e.target.value))))}
            className="w-20 border-2 border-cyan-300 rounded-lg p-1 px-2 text-center font-bold text-lg focus:ring-2 focus:ring-cyan-400"
          />
          <span className="font-semibold text-cyan-700">min</span>
        </div>
        <button
          className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg px-7 py-2 font-semibold text-base shadow-md transition-all"
          onClick={onClose}
          style={{ minWidth: 80 }}
        >OK</button>
      </div>
    </div>
  );
}