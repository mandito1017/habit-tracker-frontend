import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Habit {
  id: string;
  name: string;
  description: string;
  icon: string;
  currentStreak: number;
  targetDays: number;
  createdAt: string;
  category: string;
}

interface HabitsState {
  habits: Habit[];
}

const initialState: HabitsState = {
  habits: [
    {
      id: "1",
      name: "Meditación diaria",
      description: "10 minutos de meditación por la mañana",
      icon: "🧘",
      currentStreak: 12,
      targetDays: 66,
      createdAt: "2024-01-15",
      category: "Bienestar",
    },
    {
      id: "2",
      name: "Lectura",
      description: "Leer al menos 20 páginas al día",
      icon: "📚",
      currentStreak: 34,
      targetDays: 66,
      createdAt: "2024-01-10",
      category: "Educación",
    },
    {
      id: "3",
      name: "Ejercicio",
      description: "30 minutos de ejercicio cardiovascular",
      icon: "🏃",
      currentStreak: 5,
      targetDays: 66,
      createdAt: "2024-01-20",
      category: "Salud",
    },
  ],
};

const habitsSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    addHabit: (state, action: PayloadAction<Omit<Habit, "id" | "createdAt" | "currentStreak">>) => {
      const newHabit: Habit = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split("T")[0],
        currentStreak: 0,
      };
      state.habits.push(newHabit);
    },
    markDone: (state, action: PayloadAction<string>) => {
      // Funcionalidad pendiente para próximas semanas
    },
    removeHabit: (state, action: PayloadAction<string>) => {
      state.habits = state.habits.filter((h) => h.id !== action.payload);
    },
  },
});

export const { addHabit, markDone, removeHabit } = habitsSlice.actions;
export default habitsSlice.reducer;