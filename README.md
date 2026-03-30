# Habit Tracker 🌿

Aplicación web para gestionar y dar seguimiento a hábitos diarios, basada en los principios del libro **Hábitos Atómicos** de James Clear.

## Tecnologías
- **Frontend:** Next.js, Tailwind CSS, Redux
- **Backend:** Express.js, Node.js
- **Base de datos:** MongoDB Atlas

## Estructura del proyecto
```
Habit-tracker-w1/
├── Frontend/        → Aplicación Next.js
└── backend/         → Servidor Express.js
```

## Requisitos previos
- Node.js v18 o superior
- npm v9 o superior
- Cuenta en MongoDB Atlas

## Instalación y ejecución

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd Frontend/habit-tracker
npm install
npm run dev
```

## Variables de entorno

### Backend (.env)
```
MONGO_URI=tu_uri_de_mongodb
PORT=5000
```

## Uso
1. Iniciar el backend primero
2. Iniciar el frontend
3. Abrir http://localhost:3000 en el navegador