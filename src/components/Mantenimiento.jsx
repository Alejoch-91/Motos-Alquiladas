import React, { useState, useEffect } from 'react';
import { Wrench, Settings, Save } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const Mantenimiento = () => {
  const [motos, setMotos] = useState([]);
  const [motoId, setMotoId] = useState('');
  const [tipo, setTipo] = useState('');
  const [costo, setCosto] = useState(0);
  const [km, setKm] = useState('');

  useEffect(() => {
    const fetchMotos = async () => {
      const { data } = await supabase.from('motos').select('id, placa');
      if (data) {
        setMotos(data);
        if (data.length > 0) setMotoId(data[0].id);
      }
    };
    fetchMotos();
  }, []);

  const guardarMantenimiento = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('mantenimientos')
        .insert([{
          moto_id: motoId,
          tipo_servicio: tipo,
          costo_total: parseFloat(costo),
          km_servicio: parseInt(km),
          fecha_servicio: new Date().toISOString()
        }]);

      if (error) throw error;
      alert("¡Mantenimiento registrado!");
      setTipo(''); setCosto(0); setKm('');
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-3xl font-bold text-white">Mantenimientos</h2>
        <p className="text-slate-400">Control de gastos y salud de la NKD.</p>
      </header>

      <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-xl shadow-2xl">
        <form onSubmit={guardarMantenimiento} className="space-y-5">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Tipo de Servicio</label>
            <input 
              type="text" 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
              placeholder="Ej: Cambio de aceite, Pastillas..."
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Costo ($)</label>
              <input 
                type="number" 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                value={costo}
                onChange={(e) => setCosto(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">KM Actual</label>
              <input 
                type="number" 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                value={km}
                onChange={(e) => setKm(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2">
            <Save size={20} />
            REGISTRAR GASTO
          </button>
        </form>
      </div>
    </div>
  );
};