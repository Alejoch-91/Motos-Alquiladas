import React, { useState } from 'react';
import { UserPlus, Save } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const Conductores = () => {
  const [nombre, setNombre] = useState('');
  const [cedula, setCedula] = useState('');

  const guardarConductor = async (e) => {
  e.preventDefault();
  // Cambiamos 'nombre' por 'nombre_completo' para que coincida con tu SQL
  const { data, error } = await supabase
    .from('conductores')
    .insert([{ nombre_completo: nombre, cedula: cedula }]);
  
  if (error) alert("Error: " + error.message);
  else {
    alert("¡Conductor guardado!");
    setNombre('');
    setCedula('');
  }
};

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-3xl font-bold text-white">Gestión de Conductores</h2>
        <p className="text-slate-400">Registra a las personas que manejan tus motos.</p>
      </header>

      <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-2xl shadow-2xl">
        <div className="flex items-center gap-3 mb-6 text-emerald-400">
          <UserPlus size={24} />
          <h3 className="text-xl font-semibold">Nuevo Registro</h3>
        </div>

        <form onSubmit={guardarConductor} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Nombre Completo</label>
            <input 
              type="text" 
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              placeholder="Ej: Juan Pérez"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Cédula</label>
            <input 
              type="text" 
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              placeholder="Número de documento"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95"
          >
            <Save size={20} />
            GUARDAR CONDUCTOR
          </button>
        </form>
      </div>
    </div>
  );
};