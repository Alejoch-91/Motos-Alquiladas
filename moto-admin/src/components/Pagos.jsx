import React, { useState, useEffect } from 'react';
import { DollarSign, Save } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const Pagos = () => {
  const [conductores, setConductores] = useState([]);
  const [motos, setMotos] = useState([]); // Nuevo estado para las motos
  const [monto, setMonto] = useState(180000); 
  const [conductorId, setConductorId] = useState('');
  const [motoId, setMotoId] = useState(''); // Para guardar la moto seleccionada

  useEffect(() => {
    const fetchData = async () => {
      // Cargamos conductores
      const { data: cond } = await supabase.from('conductores').select('id, nombre_completo');
      if (cond) setConductores(cond);
      
      // Cargamos la moto (la NKD)
      const { data: mot } = await supabase.from('motos').select('id, placa');
      if (mot) {
        setMotos(mot);
        if (mot.length > 0) setMotoId(mot[0].id); // Selecciona la primera moto por defecto
      }
    };
    fetchData();
  }, []);

  const registrarPago = async (e) => {
    e.preventDefault();
    if (!conductorId || !motoId) return alert("Falta seleccionar conductor o moto");

    try {
      const { error } = await supabase
        .from('pagos')
        .insert([{ 
          conductor_id: conductorId,
          moto_id: motoId, // <--- ¡ESTO ES LO QUE FALTABA!
          monto: parseInt(monto),
          fecha_pago: new Date().toISOString()
        }]);

      if (error) throw error;

      alert("¡Pago registrado! El Dashboard debería actualizarse.");
      setMonto(180000);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4">
      <header>
        <h2 className="text-3xl font-bold">Registro de Cobro Semanal</h2>
      </header>

      <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 max-w-xl">
        <form onSubmit={registrarPago} className="space-y-6">
          {/* Selector de Conductor */}
          <div>
            <label className="block text-sm text-slate-400 mb-2">¿Quién paga?</label>
            <select 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
              onChange={(e) => setConductorId(e.target.value)}
              value={conductorId}
              required
            >
              <option value="">Seleccionar conductor...</option>
              {conductores.map(c => (
                <option key={c.id} value={c.id}>{c.nombre_completo}</option>
              ))}
            </select>
          </div>

          {/* Selector de Moto (útil si luego compras otra) */}
          <div>
            <label className="block text-sm text-slate-400 mb-2">Moto</label>
            <select 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
              onChange={(e) => setMotoId(e.target.value)}
              value={motoId}
              required
            >
              {motos.map(m => (
                <option key={m.id} value={m.id}>NKD 125 - {m.placa}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">Monto</label>
            <input 
              type="number" 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
            />
          </div>

          <button type="submit" className="w-full bg-emerald-500 text-slate-950 font-bold py-4 rounded-xl">
            REGISTRAR PAGO
          </button>
        </form>
      </div>
    </div>
  );
};