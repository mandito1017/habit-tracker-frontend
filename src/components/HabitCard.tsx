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
      const response = await fetch(`http://localhost:5000/api/habits/${habit.id}/done`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex fle