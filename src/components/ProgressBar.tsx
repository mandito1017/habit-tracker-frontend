"use client";

interface ProgressBarProps {
  currentDays: number;
  targetDays?: number;
}

export default function ProgressBar({ currentDays, targetDays = 66 }: ProgressBarProps) {
  const percentage = Math.min((currentDays / targetDays) * 100, 100);

  const getBarColor = () => {
    if (percentage >= 80) return "from-green-500 to-green-400";
    if (percentage >= 50) return "from-yellow-500 to-green-400";
    if (percentage >= 25) return "from-amber-500 to-yellow-400";
    return "from-red-500 to-orange-400";
  };

  const getTextColor = () => {
    if (percentage >= 80) return "text-green-400";
    if (percentage >= 50) return "text-yellow-400";
    if (percentage >= 25) return "text-amber-400";
    return "text-red-400";
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-slate-400 uppercase tracking-widest">
          Progreso
        </span>
        <span className={`text-sm font-bold ${getTextColor()}`}>
          {currentDays} / {targetDays} días
        </span>
      </div>

      <div className="relative h-3 w-full bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${getBarColor()} transition-all duration-700`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex justify-between mt-2">
        <span className={`text-xs ${getTextColor()}`}>
          {currentDays >= targetDays ? "¡Hábito formado! 🎉" : "En progreso..."}
        </span>
        <span className="text-xs text-slate-500">
          {Math.max(0, targetDays - currentDays)} días restantes
        </span>
      </div>
    </div>
  );
}