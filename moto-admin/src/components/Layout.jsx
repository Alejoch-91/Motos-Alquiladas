import React from 'react';
// Cambiamos 'Tool' por 'Wrench' aquí:
import { LayoutDashboard, Bike, Users, DollarSign, Wrench } from 'lucide-react';

export const Layout = ({ children, currentView, setView }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20}/> },
    { id: 'motos', label: 'Mis Motos', icon: <Bike size={20}/> },
    { id: 'conductores', label: 'Conductores', icon: <Users size={20}/> },
    { id: 'finanzas', label: 'Pagos e Ingresos', icon: <DollarSign size={20}/> },
    // Y lo cambiamos aquí también:
    { id: 'mantenimiento', label: 'Mantenimiento', icon: <Wrench size={20}/> },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100">
      {/* Sidebar Fijo */}
      <nav className="w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col fixed h-full">
        <h1 className="text-2xl font-bold mb-10 text-emerald-400 tracking-tight italic">
          MOTO<span className="text-white">ADMIN</span>
        </h1>
        
        <div className="space-y-2 flex-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                currentView === item.id 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                : 'hover:bg-slate-800 text-slate-400'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="pt-6 border-t border-slate-800 text-xs text-slate-500 text-center">
          Versión Beta 1.0 <br/> Bogotá, CO
        </div>
      </nav>

      <main className="flex-1 ml-64 p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};