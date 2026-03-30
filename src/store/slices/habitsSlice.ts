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
  lastCompletedDate: string | null;
  isCompleted: boolean;
}

interface HabitsState {
  habits: Habit[];
}

const initialState: HabitsState = {
  habits: [],
};

const habitsSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    setHabits: (state, action: PayloadAction<Habit[]>) => {
      state.habits = action.payload;
    },
    addHabit: (state, action: PayloadAction<Habit>) => {
      state.habits.push(action.payload);
    },
    updateHabit: (state, action: PayloadAction<Habit>) => {
      const index = state.habits.findIndex((h) => h.id === action.payload.id);
      if (index !== -1) {
        state.habits[index] = action.payload;
      }
    },
    removeHabit: (state, action: PayloadAction<string>) => {
      state.habits = state.habits.filter((h) => h.id !== action.payload);
    },
  },
});

export const { setHabits, addHabit, updateHabit, removeHabit } = habitsSlice.actions;
export default habitsSlice.reducer;