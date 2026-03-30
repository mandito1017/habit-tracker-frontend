"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HabitList from "./components/HabitList";
import { useAppDispatch } from "./store/hooks";
import { setCredentials } from "./store/slices/authSlice";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [icon, setIcon] = useState("📌");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const handleAddHabit = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://habit-tracker-backend-amber.vercel.app/api/habits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ name, description, category, icon, targetDays: 66 }),
      });

      if (response.ok) {
        setShowForm(false);
        setName("");
        setDescription("");
        setCategory("General");
        setIcon("📌");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error al agregar hábito:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <header className="border-b border-slate-800 bg-slate-950 sticky top-0">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center">
              🌿
            </div>
            <span className="font-bold text-white text-lg">HabitFlow</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-slate-400 hover:text-white text-sm transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">Buenos días 👋</h1>
          <p className="text-slate-400">Pequeños pasos diarios crean grandes cambios.</p>

          <div className="mt-6 bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 flex gap-4 items-center">
            <span className="text-3xl">📖</span>
            <div>
              <p className="text-slate-300 text-sm italic">
                "El éxito es el producto de los hábitos diarios, no de las transformaciones drásticas ocasionales."
              </p>
              <p className="text-slate-500 text-xs mt-1">— James Clear, Hábitos Atómicos</p>
            </div>
          </div>
        </div>

        {/* Botón agregar hábito */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-xl transition-all duration-200 border border-green-600"
          >
            {showForm ? "✕ Cancelar" : "+ Agregar hábito"}
          </button>
        </div>

        {/* Formulario agregar hábito */}
        {showForm && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">
            <h3 className="text-white font-semibold text-lg mb-4">Nuevo hábito</h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-slate-400 text-xs uppercase tracking-widest mb-2 block">Nombre</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: Meditación diaria"
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500"
                />
              </div>
              <div>
                <label className="text-slate-400 text-xs uppercase tracking-widest mb-2 block">Descripción</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ej: 10 minutos por la mañana"
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 text-xs uppercase tracking-widest mb-2 block">Categoría</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500"
                  >
                    <option value="General">General</option>
                    <option value="Salud">Salud</option>
                    <option value="Educación">Educación</option>
                    <option value="Bienestar">Bienestar</option>
                    <option value="Reflexión">Reflexión</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 text-xs uppercase tracking-widest mb-2 block">Ícono</label>
                  <select
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500"
                  >
                    <option value="📌">📌</option>
                    <option value="🧘">🧘</option>
                    <option value="📚">📚</option>
                    <option value="🏃">🏃</option>
                    <option value="💧">💧</option>
                    <option value="✍️">✍️</option>
                    <option value="🎯">🎯</option>
                    <option value="💪">💪</option>
                  </select>
                </div>
              </div>
              <button
                onClick={handleAddHabit}
                disabled={loading || !name}
                className="w-full bg-green-700 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-50"
              >
                {loading ? "Guardando..." : "Guardar hábito"}
              </button>
            </div>
          </div>
        )}

        <HabitList />

        <footer className="mt-12 text-center text-slate-600 text-xs pb-8">
          Entrega Semana 5 · Next.js + Tailwind CSS + Redux + JWT
        </footer>
      </div>
    </main>
  );
}