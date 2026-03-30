"use client";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setHabits } from "../store/slices/habitsSlice";
import HabitCard from "./HabitCard";
import { useRouter } from "next/navigation";

export default function HabitList() {
  const habits = useAppSelector((state) => state.habits.habits);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const response = await fetch("https://habit-tracker-backend-nine.vercel.app/api/habits", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          router.push("/login");
          return;
        }

        const data = await response.json();
        const formatted = data.map((habit: any) => ({
          id: habit._id,
          name: habit.name,
          description: habit.description || "",
          icon: habit.icon || "📌",
          currentStreak: habit.streak || 0,
          targetDays: habit.targetDays || 66,
          createdAt: habit.createdAt || "",
          category: habit.category || "General",
          lastCompletedDate: habit.lastCompletedDate || null,
          isCompleted: habit.isCompleted || false,
        }));
        dispatch(setHabits(formatted));
      } catch (error) {
        console.error("Error al obtener hábitos:", error);
      }
    };

    fetchHabits();
  }, []);

  if (habits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-6xl mb-4">🌱</div>
        <h3 className="text-xl font-semibold text-white mb-2">
          Sin hábitos todavía
        </h3>
        <p className="text-slate-400 text-sm max-w-xs">
          Agrega tu primer hábito y comienza tu transformación personal hoy.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-white">Mis Hábitos</h2>
          <p className="text-slate-400 text-xs mt-0.5">
            {habits.length} hábito{habits.length !== 1 ? "s" : ""} en seguimiento
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {habits.map((habit, index) => (
          <HabitCard key={habit.id} habit={habit} index={index} />
        ))}
      </div>
    </div>
  );
}