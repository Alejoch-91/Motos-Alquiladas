import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Conductores } from './components/Conductores';
import { Pagos } from './components/Pagos';
import { Mantenimiento } from './components/Mantenimiento';
import { supabase } from './lib/supabase';
// Importamos solo iconos que sabemos que existen
import { TrendingUp, Wrench, Wallet, Users } from 'lucide-react';

function App() {
  const [view, setView] = useState('dashboard');
  const [metrics, setMetrics] = useState({
    ingresos: 0,
    gastos: 0,
    utilidad: 0,
    progreso: 0,
    inversion: 5400000
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const { data } = await supabase.from('vista_resumen_negocio').select('*');
        if (data && data.length > 0) {
          const row = data[0];
          const ing = parseFloat(row.total_recaudado) || 0;
          const gas = parseFloat(row.total_gastos_mant) || 0;
          const inv = parseFloat(row.valor_inversion) || 5400000;
          const uti = ing - gas;
          setMetrics({
            ingresos: ing,
            gastos: gas,
            utilidad: uti,
            progreso: inv > 0 ? (uti / inv) * 100 : 0,
            inversion: inv
          });
        }
      } catch (err) {
        console.error("Error cargando métricas:", err);
      }
    };
    fetchMetrics();
  }, [view]);

  const porSocio = metrics.utilidad / 2;

  return (
    <Layout currentView={view} setView={setView}>
      {view === 'dashboard' && (
        <div className="space-y-8 animate-in fade-in duration-700">
          <header className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-white">Estado de Inversión</h2>
              <p className="text-slate-400">Balance Real NKD 125</p>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full text-emerald-400 font-mono text-sm">
              ROI: {metrics.progreso.toFixed(1)}%
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
              <div className="flex items-center gap-3 text-emerald-400 mb-4">
                <TrendingUp size={20}/>
                <span className="text-xs font-bold uppercase tracking-widest">Ingresos</span>
              </div>
              <h3 className="text-3xl font-black text-white">${metrics.ingresos.toLocaleString('es-CO')}</h3>
            </div>

            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
              <div className="flex items-center gap-3 text-red-400 mb-4">
                <Wrench size={20}/>
                <span className="text-xs font-bold uppercase tracking-widest">Gastos</span>
              </div>
              <h3 className="text-3xl font-black text-white">${metrics.gastos.toLocaleString('es-CO')}</h3>
            </div>

            <div className="bg-slate-900 p-6 rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-slate-900 to-emerald-950/30">
              <div className="flex items-center gap-3 text-emerald-400 mb-4">
                <Wallet size={20}/>
                <span className="text-xs font-bold uppercase tracking-widest">Utilidad</span>
              </div>
              <h3 className="text-3xl font-black text-white">${metrics.utilidad.toLocaleString('es-CO')}</h3>
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">
            <h4 className="text-white font-bold flex items-center gap-2 mb-6">
              <Users size={20} className="text-blue-400"/> División por Socio
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
                <p className="text-slate-500 text-[10px] uppercase font-black mb-1">Socio 1</p>
                <p className="text-blue-400 text-2xl font-black">${porSocio.toLocaleString('es-CO')}</p>
              </div>
              <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
                <p className="text-slate-500 text-[10px] uppercase font-black mb-1">Socio 2</p>
                <p className="text-emerald-400 text-2xl font-black">${porSocio.toLocaleString('es-CO')}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {view === 'conductores' && <Conductores />}
      {view === 'finanzas' && <Pagos />}
      {view === 'mantenimiento' && <Mantenimiento />}
    </Layout>
  );
}

export default App;