"use client";

import { Habit } from "../store/slices/habitsSlice";
import { useAppDispatch } from "../store/hooks";
import { updateHabit } from "../store/slices/habitsSlice";
import ProgressBar from "./ProgressBar";

interface HabitCardProps {
  habit: Habit;
  index: number;
}

export default function HabitCard({ habit, index }: HabitCardProps) {
  const dispatch = useAppDispatch();

  const handleDone = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://habit-tracker-backend-amber.vercel.app/api/habits/${habit.id}/done`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const updated = await response.json();
        dispatch(updateHabit({
          id: updated._id,
          name: updated.name,
          description: updated.description || "",
          icon: updated.icon || "📌",
          currentStreak: updated.streak || 0,
          targetDays: updated.targetDays || 66,
          createdAt: updated.createdAt || "",
          category: updated.category || "General",
          lastCompletedDate: updated.lastCompletedDate || null,
          isCompleted: updated.isCompleted || false,
        }));
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (error) {
      console.error("Error al marcar hábito:", error);
    }
  };

  if (!habit) return null;

  const isCompletedToday = habit.lastCompletedDate
    ? new Date(habit.lastCompletedDate).toDateString() === new Date().toDateString()
    : false;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4 hover:border-slate-600 transition-all duration-300">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center text-2xl">
            {habit.icon}
          </div>
          <div>
            <h3 className="font-semibold text-white text-base">
              {habit.name}
            </h3>
            <p className="text-slate-400 text-xs mt-0.5">
              {habit.description}
            </p>
          </div>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full border bg-slate-800 text-slate-300 border-slate-700 whitespace-nowrap">
          {habit.category}
        </span>
      </div>

      <ProgressBar currentDays={habit.currentStreak} targetDays={habit.targetDays} />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-slate-800 rounded-lg px-3 py-1.5">
          <span className="text-amber-400 text-sm">🔥</span>
          <span className="font-bold text-white text-sm">{habit.currentStreak}</span>
          <span className="text-slate-400 text-xs">días</span>
        </div>
        <button
          onClick={handleDone}
          disabled={isCompletedToday}
          className={`flex items-center gap-2 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 active:scale-95 border ${
            isCompletedToday
              ? "bg-slate-700 border-slate-600 cursor-not-allowed opacity-50"
              : "bg-green-700 hover:bg-green-600 border-green-600"
          }`}
        >
          {isCompletedToday ? "✓ Completado" : "✓ Done"}
        </button>
      </div>
    </div>
  );
}