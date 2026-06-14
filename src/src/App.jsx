import { useState, useEffect } from "react";

const SUPABASE_URL = "https://tkkyublacucwbaoplsbl.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRra3l1YmxhY3Vjd2Jhb3Bsc2JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0NjQ0MzAsImV4cCI6MjA5NzA0MDQzMH0.7Y4GW4XJIPaaak6dND5WBAgRozSeW3HoaMPoKuqFwlI";

const C = {
  green:"#1A6B3C", greenLight:"#E8F5EE", tangerine:"#E8640A",
  cream:"#FAF7F2", ink:"#1C1C1C", muted:"#6B7280",
  border:"#D9E4DC", white:"#FFFFFF", red:"#DC2626",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=Inter:wght@400;500&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  body{background:${C.cream};font-family:'Inter',sans-serif;color:${C.ink};}
  .app{max-width:430px;margin:0 auto;min-height:100vh;background:${C.white};position:relative;}
  .header{background:${C.green};padding:20px 20px 14px;position:sticky;top:0;z-index:50;}
  .header-top{display:flex;align-items:center;justify-content:space-between;}
  .logo{font-family:'Sora',sans-serif;font-size:22px;font-weight:700;color:${C.white};letter-spacing:-0.5px;}
  .logo span{color:#A8E6BE;}
  .badge{background:${C.tangerine};color:${C.white};font-size:10px;font-weight:600;padding:3px 8px;border-radius:20px;}
  .tabs{display:flex;border-bottom:1px solid ${C.border};background:${C.white};position:sticky;top:73px;z-index:40;overflow-x:auto;}
  .tab{flex:1;min-width:64px;padding:10px 4px;border:none;background:none;font-family:'Inter',sans-serif;font-size:11px;font-weight:500;color:${C.muted};cursor:pointer;border-bottom:2px solid transparent;transition:all .2s;display:flex;flex-direction:column;align-items:center;gap:3px;white-space:nowrap;}
  .tab.active{color:${C.green};border-bottom-color:${C.green};font-weight:600;}
  .tab-icon{font-size:17px;}
  .content{padding:16px;}
  .card{background:${C.white};border:1px solid ${C.border};border-radius:14px;padding:16px;margin-bottom:12px;}
  .card-header{display:flex;align-items:center;gap:10px;margin-bottom:12px;}
  .card-icon{width:36px;height:36px;border-radius:10px;background:${C.greenLight};display:flex;align-items:center;justify-content:center;font-size:18px;}
  .label{font-size:12px;font-weight:600;color:${C.muted};text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px;}
  .input{width:100%;padding:10px 14px;border:1.5px solid ${C.border};border-radius:10px;font-family:'Inter',sans-serif;font-size:15px;color:${C.ink};background:${C.cream};outline:none;transition:border .2s;}
  .input:focus{border-color:${C.green};background:${C.white};}
  .btn{padding:11px 20px;border-radius:10px;border:none;font-family:'Sora',sans-serif;font-weight:600;font-size:14px;cursor:pointer;transition:all .15s;}
  .btn-primary{background:${C.green};color:${C.white};width:100%;margin-top:10px;}
  .btn-primary:active{transform:scale(.97);}
  .btn-sm{padding:7px 14px;font-size:12px;border-radius:8px;}
  .btn-danger{background:#FEE2E2;color:${C.red};border:none;}
  .btn-outline{background:transparent;border:1.5px solid ${C.green};color:${C.green};}
  .price-item{display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid ${C.border};}
  .price-item:last-child{border-bottom:none;}
  .price-item-img{width:44px;height:44px;border-radius:10px;background:${C.greenLight};display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;}
  .price-item-info{flex:1;min-width:0;}
  .price-item-name{font-family:'Sora',sans-serif;font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .price-item-meta{font-size:12px;color:${C.muted};margin-top:2px;}
  .price-tag{font-family:'Sora',sans-serif;font-size:18px;font-weight:700;color:${C.tangerine};white-space:nowrap;}
  .market-dot{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:4px;}
  .compare-table{width:100%;border-collapse:collapse;font-size:13px;}
  .compare-table th{background:${C.greenLight};color:${C.green};font-weight:600;padding:8px 10px;text-align:left;}
  .compare-table td{padding:9px 10px;border-bottom:1px solid ${C.border};}
  .compare-table tr:last-child td{border-bottom:none;}
  .best-price{color:${C.green};font-weight:700;}
  .worst-price{color:${C.red};}
  .list-item{display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid ${C.border};}
  .list-item:last-child{border-bottom:none;}
  .checkbox{width:22px;height:22px;border-radius:6px;border:2px solid ${C.border};display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;transition:all .15s;}
  .checkbox.checked{background:${C.green};border-color:${C.green};color:white;font-size:13px;}
  .list-item-name{flex:1;font-size:15px;}
  .list-item-name.done{text-decoration:line-through;color:${C.muted};}
  .list-qty{font-size:13px;color:${C.muted};background:${C.greenLight};padding:2px 8px;border-radius:20px;}
  .history-bar-wrap{margin-bottom:10px;}
  .history-bar-label{display:flex;justify-content:space-between;font-size:12px;color:${C.muted};margin-bottom:4px;}
  .history-bar-track{height:8px;background:${C.greenLight};border-radius:4px;overflow:hidden;}
  .history-bar-fill{height:100%;border-radius:4px;background:${C.green};transition:width .5s;}
  .toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:${C.ink};color:${C.white};padding:10px 20px;border-radius:12px;font-size:14px;z-index:999;animation:fadeUp .3s ease;white-space:nowrap;}
  @keyframes fadeUp{from{opacity:0;transform:translateX(-50%) translateY(10px);}to{opacity:1;transform:translateX(-50%) translateY(0);}}
  .empty{text-align:center;padding:48px 24px;color:${C.muted};}
  .empty-icon{font-size:48px;margin-bottom:12px;}
  .empty-title{font-family:'Sora',sans-serif;font-size:16px;font-weight:600;color:${C.ink};margin-bottom:6px;}
  .section-title{font-family:'Sora',sans-serif;font-size:16px;font-weight:700;margin-bottom:12px;}
  .m0{background:#3B82F6;}.m1{background:#8B5CF6;}.m2{background:#EC4899;}
  .m3{background:#F59E0B;}.m4{background:#10B981;}.m5{background:#EF4444;}
  .m6{background:#06B6D4;}.m7{background:#84CC16;}.m8{background:#F97316;}
  .overlay{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:60;display:flex;align-items:flex-end;}
  .sheet{background:${C.white};border-radius:20px 20px 0 0;padding:24px 20px 32px;width:100%;animation:slideUp .25s ease;}
  @keyframes slideUp{from{transform:translateY(100%);}to{transform:translateY(0);}}
  .sheet-handle{width:36px;height:4px;background:${C.border};border-radius:2px;margin:0 auto 20px;}
  .sheet-title{font-family:'Sora',sans-serif;font-size:18px;font-weight:700;margin-bottom:16px;}
  .divider{height:1px;background:${C.border};margin:12px 0;}
  .market-chip{display:flex;align-items:center;gap:8px;padding:10px 14px;background:${C.cream};border:1.5px solid ${C.border};border-radius:10px;margin-bottom:8px;}
  .market-chip-dot{width:12px;height:12px;border-radius:50%;flex-shrink:0;}
  .market-chip-name{flex:1;font-size:15px;font-weight:500;}
  .market-chip-count{font-size:12px;color:${C.muted};}
  .fab{position:fixed;bottom:24px;right:20px;width:56px;height:56px;border-radius:28px;background:${C.tangerine};color:white;font-size:28px;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(232,100,10,.4);transition:transform .15s;z-index:30;}
  .fab:active{transform:scale(.93);}
  .pill{display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:20px;font-size:12px;font-weight:600;}
  .pill-green{background:${C.greenLight};color:${C.green};}
  .spinner{width:40px;height:40px;border:4px solid ${C.greenLight};border-top-color:${C.green};border-radius:50%;animation:spin .8s linear infinite;margin:0 auto;}
  @keyframes spin{to{transform:rotate(360deg);}}
`;

const MCOLORS = ["m0","m1","m2","m3","m4","m5","m6","m7","m8"];
function fmtBRL(v){return "R$ "+Number(v).toFixed(2).replace(".",",");}
function fmtDate(ts){return new Date(ts).toLocaleDateString("pt-BR",{day:"2-digit",month:"short"});}
function uid(){return Math.random().toString(36).slice(2,9);}
function mci(m,markets){return MCOLORS[markets.indexOf(m)%MCOLORS.length]||"m0";}

// ── Supabase helpers ──────────────────────────────────────
const H = {"Content-Type":"application/json","apikey":SUPABASE_KEY,"Authorization":"Bearer "+SUPABASE_KEY};

async function sbGet(table){
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*&order=ts.desc`,{headers:H});
  return r.json();
}
async function sbInsert(table,row){
  await fetch(`${SUPABASE_URL}/rest/v1/${table}`,{method:"POST",headers:{...H,"Prefer":"return=minimal"},body:JSON.stringify(row)});
}
async function sbDelete(table,id){
  await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`,{method:"DELETE",headers:H});
}
async function sbUpdate(table,id,patch){
  await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`,{method:"PATCH",headers:{...H,"Prefer":"return=minimal"},body:JSON.stringify(patch)});
}
async function sbGetMarkets(){
  const r = await fetch(`${SUPABASE_URL}/rest/v1/markets?select=*&order=id.asc`,{headers:H});
  const rows = await r.json();
  return rows.map(r=>r.name);
}
async function sbAddMarket(name){
  await fetch(`${SUPABASE_URL}/rest/v1/markets`,{method:"POST",headers:{...H,"Prefer":"return=minimal"},body:JSON.stringify({name})});
}
async function sbDeleteMarket(name){
  await fetch(`${SUPABASE_URL}/rest/v1/markets?name=eq.${encodeURIComponent(name)}`,{method:"DELETE",headers:H});
}

// ════════════════════════════════════════════════
export default function App(){
  const [tab,setTab]             = useState("compare");
  const [prices,setPrices]       = useState([]);
  const [list,setList]           = useState([]);
  const [markets,setMarkets]     = useState([]);
  const [toast,setToast]         = useState(null);
  const [showAdd,setShowAdd]     = useState(false);
  const [loading,setLoading]     = useState(true);

  async function reload(){
    const [p,s,m] = await Promise.all([sbGet("prices"),sbGet("shopping"),sbGetMarkets()]);
    setPrices(Array.isArray(p)?p:[]);
    setList(Array.isArray(s)?s:[]);
    setMarkets(Array.isArray(m)?m:[]);
  }

  useEffect(()=>{
    reload().then(()=>setLoading(false));
    const id = setInterval(reload,20000);
    return ()=>clearInterval(id);
  },[]);

  function showToast(msg){setToast(msg);setTimeout(()=>setToast(null),2500);}

  async function addPrice(entry){
    await sbInsert("prices",entry);
    await reload();
    showToast("✅ Preço registrado!");
  }
  async function deletePrice(id){
    await sbDelete("prices",id);
    await reload();
    showToast("🗑️ Removido");
  }
  async function addItem(item){
    await sbInsert("shopping",item);
    await reload();
    setShowAdd(false);
    showToast("✅ Item adicionado!");
  }
  async function toggleItem(item){
    await sbUpdate("shopping",item.id,{done:!item.done});
    await reload();
  }
  async function deleteItem(id){
    await sbDelete("shopping",id);
    await reload();
  }
  async function addMarket(name){
    await sbAddMarket(name);
    await reload();
    showToast(`✅ ${name} adicionado!`);
  }
  async function removeMarket(name){
    await sbDeleteMarket(name);
    await reload();
    showToast(`🗑️ ${name} removido`);
  }

  if(loading) return(
    <div className="app" style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh"}}>
      <div style={{textAlign:"center"}}>
        <div className="spinner" style={{marginBottom:16}}></div>
        <p style={{fontFamily:"Sora,sans-serif",color:C.muted}}>Carregando...</p>
      </div>
    </div>
  );

  const pendingCount = list.filter(i=>!i.done).length;

  return(
    <>
      <style>{css}</style>
      <div className="app">
        <div className="header">
          <div className="header-top">
            <div className="logo">Mercado<span>Fácil</span></div>
            <div className="badge">👥 Compartilhado</div>
          </div>
        </div>

        <div className="tabs">
          {[
            {id:"compare", icon:"📊", label:"Comparar"},
            {id:"register",icon:"➕", label:"Registrar"},
            {id:"history", icon:"📈", label:"Histórico"},
            {id:"list",    icon:"🛒", label: pendingCount>0?`Lista (${pendingCount})`:"Lista"},
            {id:"markets", icon:"🏪", label:"Mercados"},
          ].map(t=>(
            <button key={t.id} className={`tab ${tab===t.id?"active":""}`} onClick={()=>setTab(t.id)}>
              <span className="tab-icon">{t.icon}</span>{t.label}
            </button>
          ))}
        </div>

        <div className="content">
          {tab==="compare"  && <CompareTab  prices={prices} markets={markets} onDelete={deletePrice}/>}
          {tab==="register" && <RegisterTab markets={markets} onSave={addPrice}/>}
          {tab==="history"  && <HistoryTab  prices={prices} markets={markets}/>}
          {tab==="list"     && <ListTab     items={list} onToggle={toggleItem} onDelete={deleteItem} prices={prices} markets={markets}/>}
          {tab==="markets"  && <MarketsTab  markets={markets} prices={prices} onAdd={addMarket} onRemove={removeMarket} showToast={showToast}/>}
        </div>

        {tab==="list"    && <button className="fab" onClick={()=>setShowAdd(true)}>+</button>}
        {tab==="compare" && <button className="fab" onClick={()=>setTab("register")}>+</button>}
        {showAdd && <AddItemSheet onClose={()=>setShowAdd(false)} onSave={addItem}/>}
        {toast && <div className="toast">{toast}</div>}
      </div>
    </>
  );
}

// ── Compare ───────────────────────────────────────────────
function CompareTab({prices,markets,onDelete}){
  const [search,setSearch]=useState("");
  const groups={};
  prices.forEach(p=>{
    const key=p.name.toLowerCase().trim();
    if(!groups[key]) groups[key]={name:p.name,entries:[]};
    groups[key].entries.push(p);
  });
  const filtered=Object.values(groups).filter(g=>g.name.toLowerCase().includes(search.toLowerCase()));
  if(prices.length===0) return(
    <div className="empty">
      <div className="empty-icon">📊</div>
      <div className="empty-title">Nenhum preço ainda</div>
      <p>Toque em "+" para registrar o primeiro preço.</p>
    </div>
  );
  return(
    <>
      <input className="input" placeholder="🔍 Buscar produto..." value={search} onChange={e=>setSearch(e.target.value)} style={{marginBottom:16}}/>
      {filtered.map(g=><ProductCard key={g.name} group={g} markets={markets} onDelete={onDelete}/>)}
    </>
  );
}

function ProductCard({group,markets,onDelete}){
  const [open,setOpen]=useState(false);
  const sorted=[...group.entries].sort((a,b)=>a.price-b.price);
  const best=sorted[0], worst=sorted[sorted.length-1];
  const savings=worst.price-best.price;
  return(
    <div className="card">
      <div className="price-item" style={{paddingTop:0}} onClick={()=>setOpen(!open)}>
        <div className="price-item-img">🛍️</div>
        <div className="price-item-info">
          <div className="price-item-name">{group.name}</div>
          <div className="price-item-meta">
            <span className={`market-dot ${mci(best.market,markets)}`}></span>
            Melhor: {best.market}
          </div>
          {savings>0.01 && <div style={{fontSize:11,color:C.green,marginTop:2}}>Economize {fmtBRL(savings)}</div>}
        </div>
        <div style={{textAlign:"right"}}>
          <div className="price-tag">{fmtBRL(best.price)}</div>
          <div style={{fontSize:11,color:C.muted}}>{open?"▲ fechar":"▼ ver todos"}</div>
        </div>
      </div>
      {open&&(
        <>
          <div className="divider"/>
          <table className="compare-table">
            <thead><tr><th>Mercado</th><th>Preço</th><th>Data</th><th></th></tr></thead>
            <tbody>
              {sorted.map(e=>(
                <tr key={e.id}>
                  <td><span className={`market-dot ${mci(e.market,markets)}`}></span>{e.market}</td>
                  <td className={e.id===best.id?"best-price":e.id===worst.id&&sorted.length>1?"worst-price":""}>{fmtBRL(e.price)}{e.id===best.id&&" ✓"}</td>
                  <td>{fmtDate(e.ts)}</td>
                  <td><button className="btn btn-sm btn-danger" onClick={()=>onDelete(e.id)}>✕</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

// ── Register ──────────────────────────────────────────────
function RegisterTab({markets,onSave}){
  const [name,setName]=useState("");
  const [price,setPrice]=useState("");
  const [market,setMarket]=useState(markets[0]||"");
  const [qty,setQty]=useState("1");
  const [saving,setSaving]=useState(false);

  useEffect(()=>{if(!market&&markets.length) setMarket(markets[0]);},[markets]);

  async function handleSave(){
    if(!name.trim()||!price||!market) return;
    setSaving(true);
    await onSave({id:uid(),name:name.trim(),price:parseFloat(price.replace(",",".")),market,qty:qty||"1",ts:Date.now()});
    setName("");setPrice("");setQty("1");
    setSaving(false);
  }

  if(markets.length===0) return(
    <div className="empty">
      <div className="empty-icon">🏪</div>
      <div className="empty-title">Nenhum mercado cadastrado</div>
      <p>Vá na aba <strong>Mercados</strong> e adicione pelo menos um.</p>
    </div>
  );

  return(
    <>
      <div className="section-title">Registrar Preço</div>
      <div className="card">
        <div style={{marginBottom:12}}>
          <div className="label">Nome do produto</div>
          <input className="input" placeholder="Ex: Arroz Camil 5kg" value={name} onChange={e=>setName(e.target.value)}/>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:12}}>
          <div style={{flex:2}}>
            <div className="label">Preço (R$)</div>
            <input className="input" placeholder="0,00" inputMode="decimal" value={price} onChange={e=>setPrice(e.target.value)}/>
          </div>
          <div style={{flex:1}}>
            <div className="label">Qtd</div>
            <input className="input" placeholder="1" inputMode="numeric" value={qty} onChange={e=>setQty(e.target.value)}/>
          </div>
        </div>
        <div style={{marginBottom:4}}>
          <div className="label">Supermercado</div>
          <select className="input" value={market} onChange={e=>setMarket(e.target.value)}>
            {markets.map(m=><option key={m}>{m}</option>)}
          </select>
        </div>
        <button className="btn btn-primary" onClick={handleSave} disabled={!name.trim()||!price||saving} style={{opacity:(!name.trim()||!price||saving)?.5:1}}>
          {saving?"Salvando...":"💾 Salvar preço"}
        </button>
      </div>
      <div className="card" style={{background:C.greenLight,border:"none"}}>
        <div style={{display:"flex",gap:10}}>
          <span style={{fontSize:24}}>💡</span>
          <div style={{fontSize:13,color:C.muted}}>Qualquer pessoa com o link do app verá esse preço na hora, sem precisar de conta.</div>
        </div>
      </div>
    </>
  );
}

// ── History ───────────────────────────────────────────────
function HistoryTab({prices,markets}){
  if(prices.length===0) return(
    <div className="empty">
      <div className="empty-icon">📈</div>
      <div className="empty-title">Sem histórico ainda</div>
      <p>Registre preços e eles aparecerão aqui.</p>
    </div>
  );
  const groups={};
  prices.forEach(p=>{
    const key=p.name.toLowerCase().trim();
    if(!groups[key]) groups[key]={name:p.name,entries:[]};
    groups[key].entries.push(p);
  });
  return(
    <>
      <div className="section-title">Histórico de Preços</div>
      {Object.values(groups).sort((a,b)=>b.entries.length-a.entries.length).map(g=>(
        <div className="card" key={g.name}>
          <div className="card-header">
            <div className="card-icon">📦</div>
            <div>
              <div style={{fontFamily:"Sora,sans-serif",fontWeight:700,fontSize:15}}>{g.name}</div>
              <div style={{fontSize:12,color:C.muted}}>{g.entries.length} registro(s)</div>
            </div>
            <div style={{marginLeft:"auto",textAlign:"right"}}>
              <div style={{fontSize:11,color:C.muted}}>Min / Máx</div>
              <div style={{fontSize:13,fontWeight:700}}>
                <span style={{color:C.green}}>{fmtBRL(Math.min(...g.entries.map(e=>e.price)))}</span>
                {" / "}
                <span style={{color:C.red}}>{fmtBRL(Math.max(...g.entries.map(e=>e.price)))}</span>
              </div>
            </div>
          </div>
          {Object.entries(g.entries.reduce((acc,e)=>{if(!acc[e.market])acc[e.market]=[];acc[e.market].push(e);return acc;},{})).map(([m,entries])=>{
            const avg=entries.reduce((s,e)=>s+e.price,0)/entries.length;
            const maxP=Math.max(...g.entries.map(e=>e.price)), minP=Math.min(...g.entries.map(e=>e.price));
            const pct=maxP>minP?((avg-minP)/(maxP-minP))*100:50;
            return(
              <div className="history-bar-wrap" key={m}>
                <div className="history-bar-label">
                  <span><span className={`market-dot ${mci(m,markets)}`}></span>{m}</span>
                  <span style={{fontWeight:600}}>{fmtBRL(avg)}</span>
                </div>
                <div className="history-bar-track"><div className="history-bar-fill" style={{width:`${Math.max(8,pct)}%`}}></div></div>
              </div>
            );
          })}
          <div className="divider"/>
          <div style={{fontSize:12,color:C.muted}}>Último: {fmtDate(Math.max(...g.entries.map(e=>e.ts)))}</div>
        </div>
      ))}
    </>
  );
}

// ── List ──────────────────────────────────────────────────
function ListTab({items,onToggle,onDelete,prices,markets}){
  const pending=items.filter(i=>!i.done), done=items.filter(i=>i.done);
  function bestFor(name){
    const m=prices.filter(p=>p.name.toLowerCase().includes(name.toLowerCase().slice(0,5)));
    return m.length?m.reduce((a,b)=>a.price<b.price?a:b):null;
  }
  const Row=({item})=>{
    const best=bestFor(item.name);
    return(
      <div className="list-item">
        <div className={`checkbox ${item.done?"checked":""}`} onClick={()=>onToggle(item)}>{item.done&&"✓"}</div>
        <div style={{flex:1}}>
          <div className={`list-item-name ${item.done?"done":""}`}>{item.name}</div>
          {best&&!item.done&&<div style={{fontSize:11,color:C.green,marginTop:2}}>💰 {fmtBRL(best.price)} · <span className={`market-dot ${mci(best.market,markets)}`}></span>{best.market}</div>}
        </div>
        {item.qty&&<span className="list-qty">×{item.qty}</span>}
        <button className="btn btn-sm btn-danger" onClick={()=>onDelete(item.id)}>✕</button>
      </div>
    );
  };
  if(items.length===0) return(
    <div className="empty">
      <div className="empty-icon">🛒</div>
      <div className="empty-title">Lista vazia</div>
      <p>Toque em "+" para adicionar itens.</p>
    </div>
  );
  return(
    <>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
        <div className="section-title" style={{margin:0}}>Lista de Compras</div>
        {done.length>0&&<span className="pill pill-green">{done.length}/{items.length} ✓</span>}
      </div>
      <div className="card">
        {pending.map(item=><Row key={item.id} item={item}/>)}
        {done.length>0&&(
          <>
            <div className="divider"/>
            <div style={{fontSize:12,color:C.muted,marginBottom:8,fontWeight:600}}>Comprados</div>
            {done.map(item=><Row key={item.id} item={item}/>)}
          </>
        )}
      </div>
    </>
  );
}

// ── Markets ───────────────────────────────────────────────
function MarketsTab({markets,prices,onAdd,onRemove,showToast}){
  const [newName,setNewName]=useState("");
  const [saving,setSaving]=useState(false);
  function priceCount(m){return prices.filter(p=>p.market===m).length;}
  async function handleAdd(){
    const name=newName.trim();
    if(!name||markets.includes(name)) return;
    setSaving(true);
    await onAdd(name);
    setNewName("");
    setSaving(false);
  }
  async function handleRemove(m){
    if(priceCount(m)>0){showToast("⚠️ Remova os preços desse mercado primeiro");return;}
    await onRemove(m);
  }
  return(
    <>
      <div className="section-title">Supermercados</div>
      <div className="card">
        <div className="label">Adicionar novo mercado</div>
        <div style={{display:"flex",gap:8,marginTop:6}}>
          <input className="input" placeholder="Nome do mercado..." value={newName} onChange={e=>setNewName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleAdd()} style={{flex:1}}/>
          <button className="btn btn-outline btn-sm" onClick={handleAdd} disabled={!newName.trim()||saving} style={{whiteSpace:"nowrap",marginTop:0,opacity:!newName.trim()?.5:1}}>
            {saving?"...":"Adicionar"}
          </button>
        </div>
      </div>
      <div className="section-title" style={{marginTop:8}}>Cadastrados ({markets.length})</div>
      {markets.length===0?(
        <div className="empty"><div className="empty-icon">🏪</div><div className="empty-title">Nenhum mercado</div><p>Adicione um acima.</p></div>
      ):markets.map((m,i)=>(
        <div className="market-chip" key={m}>
          <div className={`market-chip-dot ${MCOLORS[i%MCOLORS.length]}`}></div>
          <div className="market-chip-name">{m}</div>
          <div className="market-chip-count">{priceCount(m)} preço(s)</div>
          <button className="btn btn-sm btn-danger" onClick={()=>handleRemove(m)} style={{opacity:priceCount(m)>0?.4:1}}>✕</button>
        </div>
      ))}
      <div className="card" style={{background:C.greenLight,border:"none",marginTop:8}}>
        <div style={{display:"flex",gap:10}}>
          <span style={{fontSize:20}}>ℹ️</span>
          <div style={{fontSize:13,color:C.muted}}>Para remover um mercado, primeiro apague os preços registrados nele.</div>
        </div>
      </div>
    </>
  );
}

// ── Add Item Sheet ────────────────────────────────────────
function AddItemSheet({onClose,onSave}){
  const [name,setName]=useState("");
  const [qty,setQty]=useState("1");
  const [saving,setSaving]=useState(false);
  async function handle(){
    if(!name.trim()) return;
    setSaving(true);
    await onSave({id:uid(),name:name.trim(),qty,done:false,ts:Date.now()});
    setSaving(false);
  }
  return(
    <div className="overlay" onClick={onClose}>
      <div className="sheet" onClick={e=>e.stopPropagation()}>
        <div className="sheet-handle"/>
        <div className="sheet-title">Adicionar à lista</div>
        <div style={{marginBottom:12}}>
          <div className="label">Produto</div>
          <input className="input" placeholder="Ex: Leite, Ovos, Arroz..." value={name} onChange={e=>setName(e.target.value)} autoFocus/>
        </div>
        <div style={{marginBottom:16}}>
          <div className="label">Quantidade</div>
          <input className="input" placeholder="1" inputMode="numeric" value={qty} onChange={e=>setQty(e.target.value)}/>
        </div>
        <button className="btn btn-primary" onClick={handle} disabled={!name.trim()||saving} style={{opacity:!name.trim()?.5:1}}>
          {saving?"Adicionando...":"Adicionar"}
        </button>
      </div>
    </div>
  );
}
