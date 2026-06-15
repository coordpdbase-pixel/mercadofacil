import React, { useState, useEffect, useRef } from "react";

const SUPABASE_URL = "https://tkkyublacucwbaoplsbl.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRra3l1YmxhY3Vjd2Jhb3Bsc2JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0NjQ0MzAsImV4cCI6MjA5NzA0MDQzMH0.7Y4GW4XJIPaaak6dND5WBAgRozSeW3HoaMPoKuqFwlI";
const ADMIN_PASS = "Jasmim";
const UNITS = ["Unidade","Pacote","Kg","g","Litro","ml","Caixa","Dúzia"];

const C = {
  green:"#1A6B3C", greenLight:"#E8F5EE", tangerine:"#E8640A",
  cream:"#FAF7F2", ink:"#1C1C1C", muted:"#6B7280",
  border:"#D9E4DC", white:"#FFFFFF", red:"#DC2626", yellow:"#F59E0B",
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
  .badge{background:${C.tangerine};color:${C.white};font-size:10px;font-weight:600;padding:3px 8px;border-radius:20px;cursor:pointer;}
  .badge-admin{background:#7C3AED;}
  .tabs{display:flex;border-bottom:1px solid ${C.border};background:${C.white};position:sticky;top:73px;z-index:40;overflow-x:auto;}
  .tab{flex:1;min-width:54px;padding:10px 2px;border:none;background:none;font-family:'Inter',sans-serif;font-size:10px;font-weight:500;color:${C.muted};cursor:pointer;border-bottom:2px solid transparent;transition:all .2s;display:flex;flex-direction:column;align-items:center;gap:3px;white-space:nowrap;}
  .tab.active{color:${C.green};border-bottom-color:${C.green};font-weight:600;}
  .tab-icon{font-size:16px;}
  .content{padding:16px;padding-bottom:80px;}
  .card{background:${C.white};border:1px solid ${C.border};border-radius:14px;padding:16px;margin-bottom:12px;}
  .label{font-size:12px;font-weight:600;color:${C.muted};text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px;}
  .input{width:100%;padding:10px 14px;border:1.5px solid ${C.border};border-radius:10px;font-family:'Inter',sans-serif;font-size:15px;color:${C.ink};background:${C.cream};outline:none;transition:border .2s;}
  .input:focus{border-color:${C.green};background:${C.white};}
  .btn{padding:11px 20px;border-radius:10px;border:none;font-family:'Sora',sans-serif;font-weight:600;font-size:14px;cursor:pointer;transition:all .15s;}
  .btn-primary{background:${C.green};color:${C.white};width:100%;margin-top:10px;}
  .btn-primary:active{transform:scale(.97);}
  .btn-sm{padding:7px 14px;font-size:12px;border-radius:8px;}
  .btn-danger{background:#FEE2E2;color:${C.red};border:none;}
  .btn-outline{background:transparent;border:1.5px solid ${C.green};color:${C.green};}
  .btn-yellow{background:#FEF3C7;color:#92400E;border:none;}
  .btn-green{background:${C.greenLight};color:${C.green};border:none;}
  .price-item{display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid ${C.border};}
  .price-item:last-child{border-bottom:none;}
  .price-item-img{width:48px;height:48px;border-radius:10px;background:${C.greenLight};display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;overflow:hidden;}
  .price-item-img img{width:100%;height:100%;object-fit:cover;}
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
  .list-item-name{flex:1;font-size:14px;}
  .list-item-name.done{text-decoration:line-through;color:${C.muted};}
  .qty-ctrl{display:flex;align-items:center;gap:6px;}
  .qty-btn{width:26px;height:26px;border-radius:50%;border:1.5px solid ${C.border};background:${C.white};font-size:16px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-weight:700;color:${C.green};}
  .qty-num{font-size:14px;font-weight:700;min-width:20px;text-align:center;}
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
  .sheet{background:${C.white};border-radius:20px 20px 0 0;padding:24px 20px 32px;width:100%;animation:slideUp .25s ease;max-height:90vh;overflow-y:auto;}
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
  .promo-card{border-radius:14px;overflow:hidden;margin-bottom:12px;border:1px solid ${C.border};}
  .promo-img{width:100%;height:180px;object-fit:cover;background:${C.greenLight};display:flex;align-items:center;justify-content:center;font-size:48px;}
  .promo-body{padding:12px 16px;}
  .promo-title{font-family:'Sora',sans-serif;font-weight:700;font-size:15px;margin-bottom:4px;}
  .promo-meta{font-size:12px;color:${C.muted};}
  .pending-card{border:1.5px solid ${C.yellow};border-radius:14px;padding:14px;margin-bottom:10px;}
  .photo-area{border:2px dashed ${C.border};border-radius:12px;padding:20px;text-align:center;cursor:pointer;background:${C.cream};margin-bottom:12px;}
  .admin-bar{background:#7C3AED;color:white;text-align:center;padding:6px;font-size:12px;font-weight:600;}
  .total-bar{background:${C.green};color:white;border-radius:14px;padding:14px 16px;margin-bottom:12px;}
  .market-group{border:1.5px solid ${C.border};border-radius:12px;padding:12px;margin-bottom:10px;}
  .market-group-title{font-family:'Sora',sans-serif;font-weight:700;font-size:13px;color:${C.green};margin-bottom:8px;display:flex;align-items:center;gap:6px;}
`;

const MCOLORS = ["m0","m1","m2","m3","m4","m5","m6","m7","m8"];
function fmtBRL(v){return "R$ "+Number(v).toFixed(2).replace(".",",");}
function fmtDate(ts){return new Date(ts).toLocaleDateString("pt-BR",{day:"2-digit",month:"short"});}
function uid(){return Math.random().toString(36).slice(2,9);}
function mci(m,markets){return MCOLORS[markets.indexOf(m)%MCOLORS.length]||"m0";}

const H={"Content-Type":"application/json","apikey":SUPABASE_KEY,"Authorization":"Bearer "+SUPABASE_KEY};
async function sbGet(table,extra=""){const r=await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*${extra}`,{headers:H});return r.json();}
async function sbInsert(table,row){await fetch(`${SUPABASE_URL}/rest/v1/${table}`,{method:"POST",headers:{...H,"Prefer":"return=minimal"},body:JSON.stringify(row)});}
async function sbDelete(table,id){await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`,{method:"DELETE",headers:H});}
async function sbUpdate(table,id,patch){await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`,{method:"PATCH",headers:{...H,"Prefer":"return=minimal"},body:JSON.stringify(patch)});}
async function sbGetMarkets(){const r=await fetch(`${SUPABASE_URL}/rest/v1/markets?select=*&order=id.asc`,{headers:H});const rows=await r.json();return Array.isArray(rows)?rows.map(r=>r.name):[];}
async function sbAddMarket(name){await fetch(`${SUPABASE_URL}/rest/v1/markets`,{method:"POST",headers:{...H,"Prefer":"return=minimal"},body:JSON.stringify({name})});}
async function sbDeleteMarket(name){await fetch(`${SUPABASE_URL}/rest/v1/markets?name=eq.${encodeURIComponent(name)}`,{method:"DELETE",headers:H});}
async function uploadFoto(file){const ext=file.name.split(".").pop()||"jpg";const path=`${uid()}.${ext}`;const r=await fetch(`${SUPABASE_URL}/storage/v1/object/fotos/${path}`,{method:"POST",headers:{"apikey":SUPABASE_KEY,"Authorization":"Bearer "+SUPABASE_KEY,"Content-Type":file.type},body:file});if(!r.ok)return null;return `${SUPABASE_URL}/storage/v1/object/public/fotos/${path}`;}
function resizeImage(file,maxW=800){return new Promise(res=>{const img=new Image();const url=URL.createObjectURL(file);img.onload=()=>{const canvas=document.createElement("canvas");let w=img.width,h=img.height;if(w>maxW){h=Math.round(h*maxW/w);w=maxW;}canvas.width=w;canvas.height=h;canvas.getContext("2d").drawImage(img,0,0,w,h);URL.revokeObjectURL(url);canvas.toBlob(blob=>res(new File([blob],file.name,{type:"image/jpeg"})),"image/jpeg",0.75);};img.src=url;});}

// ════════════════════════════════════════════════
export default function App(){
  const [tab,setTab]           = useState("compare");
  const [prices,setPrices]     = useState([]);
  const [list,setList]         = useState([]);
  const [markets,setMarkets]   = useState([]);
  const [promos,setPromos]     = useState([]);
  const [pending,setPending]   = useState([]);
  const [reports,setReports]   = useState([]);
  const [toast,setToast]       = useState(null);
  const [showAdd,setShowAdd]   = useState(false);
  const [loading,setLoading]   = useState(true);
  const [isAdmin,setIsAdmin]   = useState(false);
  const [showLogin,setShowLogin]=useState(false);

  async function reload(){
    const [p,s,m,pr,pe,re]=await Promise.all([
      sbGet("prices","&order=ts.desc"),
      sbGet("shopping","&order=ts.asc"),
      sbGetMarkets(),
      sbGet("promocoes","&order=ts.desc&aprovada=eq.true"),
      isAdmin?sbGet("fotos_pendentes","&order=ts.desc&aprovada=eq.false"):Promise.resolve([]),
      isAdmin?sbGet("price_reports","&order=ts.desc&resolved=eq.false"):Promise.resolve([]),
    ]);
    setPrices(Array.isArray(p)?p:[]);
    setList(Array.isArray(s)?s:[]);
    setMarkets(Array.isArray(m)?m:[]);
    setPromos(Array.isArray(pr)?pr:[]);
    setPending(Array.isArray(pe)?pe:[]);
    setReports(Array.isArray(re)?re:[]);
    setLoading(false);
  }

  useEffect(()=>{reload();},[isAdmin]);
  useEffect(()=>{const id=setInterval(reload,20000);return()=>clearInterval(id);},[isAdmin]);

  function showToast(msg){setToast(msg);setTimeout(()=>setToast(null),2500);}

  async function addPrice(entry){await sbInsert("prices",entry);await reload();showToast("✅ Preço registrado!");}
  async function deletePrice(id){await sbDelete("prices",id);await reload();showToast("🗑️ Removido");}

  async function addItem(item){await sbInsert("shopping",item);await reload();setShowAdd(false);showToast("✅ Item adicionado!");}
  async function addFromCompare(product,bestEntry){
    // Check if already in list
    const existing=list.find(i=>i.name.toLowerCase()===product.toLowerCase()&&!i.done);
    if(existing){
      await sbUpdate("shopping",existing.id,{qty:String(Number(existing.qty||1)+1)});
    } else {
      await sbInsert("shopping",{id:uid(),name:product,qty:"1",unit:bestEntry.qty||"Unidade",market:bestEntry.market,price:bestEntry.price,done:false,ts:Date.now()});
    }
    await reload();
    showToast("🛒 Adicionado à lista!");
  }
  async function toggleItem(item){await sbUpdate("shopping",item.id,{done:!item.done});await reload();}
  async function deleteItem(id){await sbDelete("shopping",id);await reload();}
  async function updateQty(item,delta){
    const newQty=Math.max(1,Number(item.qty||1)+delta);
    await sbUpdate("shopping",item.id,{qty:String(newQty)});
    await reload();
  }

  async function addMarket(name){await sbAddMarket(name);await reload();showToast(`✅ ${name} adicionado!`);}
  async function removeMarket(name){await sbDeleteMarket(name);await reload();showToast(`🗑️ ${name} removido`);}

  async function reportPrice(entry){await sbInsert("price_reports",{id:uid(),price_id:entry.id,name:entry.name,market:entry.market,price:entry.price,resolved:false,ts:Date.now()});await reload();showToast("⚠️ Sinalizado! O admin vai verificar.");}
  async function resolveReport(reportId,priceId,deleteIt){if(deleteIt)await sbDelete("prices",priceId);await sbUpdate("price_reports",reportId,{resolved:true});await reload();showToast(deleteIt?"🗑️ Preço removido":"✅ Mantido");}

  async function addPromo(entry){await sbInsert("promocoes",entry);await reload();showToast("✅ Promoção publicada!");}
  async function deletePromo(id){await sbDelete("promocoes",id);await reload();showToast("🗑️ Promoção removida");}
  async function submitPending(entry){await sbInsert("fotos_pendentes",entry);await reload();showToast("📤 Enviado! Aguardando aprovação.");}
  async function approvePending(item){
    await sbUpdate("fotos_pendentes",item.id,{aprovada:true});
    await sbInsert("promocoes",{id:uid(),nome:item.descricao||"Promoção",descricao:"",foto_url:item.foto_url,mercado:item.mercado,preco:item.preco,aprovada:true,ts:Date.now()});
    await reload();showToast("✅ Aprovado e publicado!");
  }
  async function rejectPending(id){await sbDelete("fotos_pendentes",id);await reload();showToast("🗑️ Rejeitado");}

  function handleLogin(pass){if(pass===ADMIN_PASS){setIsAdmin(true);setShowLogin(false);showToast("👑 Bem-vinda, admin!");}else showToast("❌ Senha incorreta");}

  if(loading) return(
    <div className="app" style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh"}}>
      <div style={{textAlign:"center"}}><div className="spinner" style={{marginBottom:16}}></div><p style={{fontFamily:"Sora,sans-serif",color:C.muted}}>Carregando...</p></div>
    </div>
  );

  const pendingCount=list.filter(i=>!i.done).length;
  const pendingApproval=pending.filter(i=>!i.aprovada).length+reports.length;

  const tabs=[
    {id:"compare", icon:"📊", label:"Comparar"},
    {id:"register",icon:"➕", label:"Registrar"},
    {id:"promos",  icon:"🏷️", label:"Promoções"},
    {id:"history", icon:"📈", label:"Histórico"},
    {id:"list",    icon:"🛒", label:pendingCount>0?`Lista(${pendingCount})`:"Lista"},
    {id:"markets", icon:"🏪", label:"Mercados"},
  ];
  if(isAdmin) tabs.push({id:"admin",icon:"👑",label:pendingApproval>0?`Admin(${pendingApproval})`:"Admin"});

  return(
    <>
      <style>{css}</style>
      <div className="app">
        {isAdmin&&<div className="admin-bar">👑 Modo Administrador</div>}
        <div className="header">
          <div className="header-top">
            <div className="logo">Mercado<span>Fácil</span></div>
            <div className={`badge ${isAdmin?"badge-admin":""}`} onClick={()=>isAdmin?setIsAdmin(false):setShowLogin(true)}>
              {isAdmin?"👑 Admin":"👥 Compartilhado"}
            </div>
          </div>
        </div>
        <div className="tabs">
          {tabs.map(t=>(
            <button key={t.id} className={`tab ${tab===t.id?"active":""}`} onClick={()=>setTab(t.id)}>
              <span className="tab-icon">{t.icon}</span>{t.label}
            </button>
          ))}
        </div>
        <div className="content">
          {tab==="compare"  && <CompareTab  prices={prices} markets={markets} isAdmin={isAdmin} onReport={reportPrice} onAddToList={addFromCompare}/>}
          {tab==="register" && <RegisterTab markets={markets} onSave={addPrice}/>}
          {tab==="promos"   && <PromosTab   promos={promos} isAdmin={isAdmin} markets={markets} onAdd={addPromo} onDelete={deletePromo} onSubmit={submitPending}/>}
          {tab==="history"  && <HistoryTab  prices={prices} markets={markets}/>}
          {tab==="list"     && <ListTab     items={list} onToggle={toggleItem} onDelete={deleteItem} onUpdateQty={updateQty} prices={prices} markets={markets}/>}
          {tab==="markets"  && <MarketsTab  markets={markets} prices={prices} onAdd={addMarket} onRemove={removeMarket} showToast={showToast}/>}
          {tab==="admin"    && isAdmin && <AdminTab pending={pending} onApprove={approvePending} onReject={rejectPending} reports={reports} onResolve={resolveReport}/>}
        </div>
        {tab==="list" && <button className="fab" onClick={()=>setShowAdd(true)}>+</button>}
        {tab==="compare" && <button className="fab" onClick={()=>setTab("register")}>+</button>}
        {showAdd    && <AddItemSheet onClose={()=>setShowAdd(false)} onSave={addItem} markets={markets}/>}
        {showLogin  && <LoginSheet  onClose={()=>setShowLogin(false)} onLogin={handleLogin}/>}
        {toast && <div className="toast">{toast}</div>}
      </div>
    </>
  );
}

// ── Compare ───────────────────────────────────────────────
function CompareTab({prices,markets,isAdmin,onReport,onAddToList}){
  const [search,setSearch]=useState("");
  const groups={};
  prices.forEach(p=>{const key=p.name.toLowerCase().trim();if(!groups[key])groups[key]={name:p.name,entries:[]};groups[key].entries.push(p);});
  const filtered=Object.values(groups).filter(g=>g.name.toLowerCase().includes(search.toLowerCase()));
  if(prices.length===0) return(<div className="empty"><div className="empty-icon">📊</div><div className="empty-title">Nenhum preço ainda</div><p>Toque em "+" para registrar.</p></div>);
  return(
    <>
      <input className="input" placeholder="🔍 Buscar produto..." value={search} onChange={e=>setSearch(e.target.value)} style={{marginBottom:16}}/>
      {filtered.map(g=><ProductCard key={g.name} group={g} markets={markets} isAdmin={isAdmin} onReport={onReport} onAddToList={onAddToList}/>)}
    </>
  );
}

function ProductCard({group,markets,isAdmin,onReport,onAddToList}){
  const [open,setOpen]=useState(false);
  const sorted=[...group.entries].sort((a,b)=>a.price-b.price);
  const best=sorted[0],worst=sorted[sorted.length-1];
  const savings=worst.price-best.price;
  const foto=group.entries.find(e=>e.photo)?.photo;
  return(
    <div className="card">
      <div className="price-item" style={{paddingTop:0}} onClick={()=>setOpen(!open)}>
        <div className="price-item-img">{foto?<img src={foto} alt=""/>:"🛍️"}</div>
        <div className="price-item-info">
          <div className="price-item-name">{group.name}</div>
          <div className="price-item-meta"><span className={`market-dot ${mci(best.market,markets)}`}></span>Melhor: {best.market}</div>
          {savings>0.01&&<div style={{fontSize:11,color:C.green,marginTop:2}}>Economize {fmtBRL(savings)}</div>}
        </div>
        <div style={{textAlign:"right"}}>
          <div className="price-tag">{fmtBRL(best.price)}</div>
          <div style={{fontSize:11,color:C.muted}}>{open?"▲ fechar":"▼ ver todos"}</div>
        </div>
      </div>
      {/* Botão adicionar à lista */}
      <button className="btn btn-green btn-sm" style={{width:"100%",marginTop:4}} onClick={e=>{e.stopPropagation();onAddToList(group.name,best);}}>
        🛒 Adicionar à lista — {fmtBRL(best.price)} no {best.market}
      </button>
      {open&&(<>
        <div className="divider"/>
        <table className="compare-table">
          <thead><tr><th>Mercado</th><th>Preço</th><th>Unidade</th><th>Data</th><th></th></tr></thead>
          <tbody>{sorted.map(e=>(
            <tr key={e.id}>
              <td><span className={`market-dot ${mci(e.market,markets)}`}></span>{e.market}</td>
              <td className={e.id===best.id?"best-price":e.id===worst.id&&sorted.length>1?"worst-price":""}>{fmtBRL(e.price)}{e.id===best.id&&" ✓"}</td>
              <td style={{fontSize:11,color:C.muted}}>{e.qty||"-"}</td>
              <td>{fmtDate(e.ts)}</td>
              <td>
                {isAdmin
                  ?<button className="btn btn-sm btn-danger" onClick={()=>onReport(e)}>🗑️</button>
                  :<button className="btn btn-sm btn-yellow" onClick={()=>onReport(e)}>⚠️</button>
                }
              </td>
            </tr>
          ))}</tbody>
        </table>
      </>)}
    </div>
  );
}

// ── Register ──────────────────────────────────────────────
function RegisterTab({markets,onSave}){
  const [name,setName]=useState("");
  const [price,setPrice]=useState("");
  const [market,setMarket]=useState(markets[0]||"");
  const [unit,setUnit]=useState("Unidade");
  const [saving,setSaving]=useState(false);
  useEffect(()=>{if(!market&&markets.length)setMarket(markets[0]);},[markets]);

  async function handleSave(){
    if(!name.trim()||!price||!market) return;
    setSaving(true);
    await onSave({id:uid(),name:name.trim(),price:parseFloat(price.replace(",",".")),market,qty:unit,photo:null,ts:Date.now()});
    setName("");setPrice("");setUnit("Unidade");
    setSaving(false);
  }

  if(markets.length===0) return(<div className="empty"><div className="empty-icon">🏪</div><div className="empty-title">Nenhum mercado cadastrado</div><p>Vá na aba <strong>Mercados</strong>.</p></div>);

  return(
    <>
      <div className="section-title">Registrar Preço</div>
      <div className="card">
        <div style={{marginBottom:12}}>
          <div className="label">Nome do produto</div>
          <input className="input" placeholder="Ex: Arroz Camil" value={name} onChange={e=>setName(e.target.value)}/>
        </div>
        <div style={{marginBottom:12}}>
          <div className="label">Preço (R$)</div>
          <input className="input" placeholder="0,00" inputMode="decimal" value={price} onChange={e=>setPrice(e.target.value)}/>
        </div>
        <div style={{marginBottom:12}}>
          <div className="label">Unidade</div>
          <select className="input" value={unit} onChange={e=>setUnit(e.target.value)}>
            {UNITS.map(u=><option key={u}>{u}</option>)}
          </select>
        </div>
        <div style={{marginBottom:4}}>
          <div className="label">Supermercado</div>
          <select className="input" value={market} onChange={e=>setMarket(e.target.value)}>{markets.map(m=><option key={m}>{m}</option>)}</select>
        </div>
        <button className="btn btn-primary" onClick={handleSave} disabled={!name.trim()||!price||saving} style={{opacity:(!name.trim()||!price||saving)?.5:1}}>
          {saving?"Salvando...":"💾 Salvar preço"}
        </button>
      </div>
    </>
  );
}

// ── Promos ────────────────────────────────────────────────
function PromosTab({promos,isAdmin,markets,onAdd,onDelete,onSubmit}){
  const [showForm,setShowForm]=useState(false);
  return(
    <>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
        <div className="section-title" style={{margin:0}}>🏷️ Promoções</div>
        <button className="btn btn-sm btn-outline" onClick={()=>setShowForm(true)}>{isAdmin?"+ Nova promo":"🤝 Colaborar com promoção"}</button>
      </div>
      {promos.length===0&&<div className="empty"><div className="empty-icon">🏷️</div><div className="empty-title">Nenhuma promoção</div><p>O admin ainda não publicou promoções.</p></div>}
      {promos.map(p=>(
        <div className="promo-card" key={p.id}>
          {p.foto_url?<img src={p.foto_url} alt={p.nome} className="promo-img"/>:<div className="promo-img" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>🏷️</div>}
          <div className="promo-body">
            <div className="promo-title">{p.nome}</div>
            {p.descricao&&<div style={{fontSize:13,color:C.muted,marginBottom:4}}>{p.descricao}</div>}
            <div className="promo-meta">
              {p.mercado&&<span>🏪 {p.mercado} </span>}
              {p.preco&&<span style={{color:C.tangerine,fontWeight:700}}>{fmtBRL(p.preco)} </span>}
              {p.validade&&<span>⏰ até {p.validade}</span>}
            </div>
            {isAdmin&&<button className="btn btn-sm btn-danger" style={{marginTop:8}} onClick={()=>onDelete(p.id)}>🗑️ Remover</button>}
          </div>
        </div>
      ))}
      {showForm&&<PromoSheet isAdmin={isAdmin} markets={markets} onClose={()=>setShowForm(false)} onSave={isAdmin?onAdd:onSubmit}/>}
    </>
  );
}

function PromoSheet({isAdmin,markets,onClose,onSave}){
  const [nome,setNome]=useState("");
  const [descricao,setDescricao]=useState("");
  const [mercado,setMercado]=useState(markets[0]||"");
  const [preco,setPreco]=useState("");
  const [validade,setValidade]=useState("");
  const [preview,setPreview]=useState(null);
  const [fileObj,setFileObj]=useState(null);
  const [saving,setSaving]=useState(false);
  const fileRef=useRef();
  async function handlePhoto(e){const file=e.target.files[0];if(!file)return;const resized=await resizeImage(file);setFileObj(resized);setPreview(URL.createObjectURL(resized));}
  async function handleSave(){
    setSaving(true);
    let foto_url=null;
    if(fileObj) foto_url=await uploadFoto(fileObj);
    await onSave({id:uid(),nome:nome||"Promoção",descricao,foto_url,mercado,preco:preco?parseFloat(preco.replace(",",".")):null,validade,aprovada:isAdmin,ts:Date.now()});
    onClose();setSaving(false);
  }
  return(
    <div className="overlay" onClick={onClose}>
      <div className="sheet" onClick={e=>e.stopPropagation()}>
        <div className="sheet-handle"/>
        <div className="sheet-title">{isAdmin?"Nova Promoção":"Colaborar com uma promoção"}</div>
        <div className="photo-area" onClick={()=>fileRef.current.click()}>
          {preview?<img src={preview} alt="" style={{width:"100%",maxHeight:160,objectFit:"cover",borderRadius:10}}/>
            :<><div style={{fontSize:32,marginBottom:6}}>📸</div><div style={{fontSize:13,fontWeight:600}}>Foto da promoção</div><div style={{fontSize:12,color:C.muted}}>Toque para abrir a câmera</div></>}
        </div>
        <input type="file" accept="image/*" capture="environment" ref={fileRef} style={{display:"none"}} onChange={handlePhoto}/>
        {isAdmin&&<>
          <div style={{marginBottom:10}}><div className="label">Nome</div><input className="input" placeholder="Ex: Frango em promoção" value={nome} onChange={e=>setNome(e.target.value)}/></div>
          <div style={{marginBottom:10}}><div className="label">Descrição</div><input className="input" placeholder="Detalhes..." value={descricao} onChange={e=>setDescricao(e.target.value)}/></div>
          <div style={{marginBottom:10}}><div className="label">Validade</div><input className="input" placeholder="Ex: 20/06" value={validade} onChange={e=>setValidade(e.target.value)}/></div>
        </>}
        <div style={{display:"flex",gap:8,marginBottom:10}}>
          <div style={{flex:2}}><div className="label">Mercado</div><select className="input" value={mercado} onChange={e=>setMercado(e.target.value)}>{markets.map(m=><option key={m}>{m}</option>)}</select></div>
          <div style={{flex:1}}><div className="label">Preço</div><input className="input" placeholder="0,00" inputMode="decimal" value={preco} onChange={e=>setPreco(e.target.value)}/></div>
        </div>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving} style={{opacity:saving?.5:1}}>
          {saving?"Enviando...":(isAdmin?"📢 Publicar":"📢 Enviar para o admin aprovar")}
        </button>
      </div>
    </div>
  );
}

// ── History ───────────────────────────────────────────────
function HistoryTab({prices,markets}){
  if(prices.length===0) return(<div className="empty"><div className="empty-icon">📈</div><div className="empty-title">Sem histórico ainda</div></div>);
  const groups={};
  prices.forEach(p=>{const key=p.name.toLowerCase().trim();if(!groups[key])groups[key]={name:p.name,entries:[]};groups[key].entries.push(p);});
  return(
    <>
      <div className="section-title">Histórico de Preços</div>
      {Object.values(groups).sort((a,b)=>b.entries.length-a.entries.length).map(g=>{
        const allP=g.entries.map(e=>e.price);
        const maxP=Math.max(...allP),minP=Math.min(...allP);
        const byMarket=g.entries.reduce((acc,e)=>{if(!acc[e.market])acc[e.market]=[];acc[e.market].push(e);return acc;},{});
        return(
          <div className="card" key={g.name}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
              <div style={{flex:1,fontFamily:"Sora,sans-serif",fontWeight:700,fontSize:15}}>{g.name}</div>
              <div style={{fontSize:13,fontWeight:700}}><span style={{color:C.green}}>{fmtBRL(minP)}</span>{" / "}<span style={{color:C.red}}>{fmtBRL(maxP)}</span></div>
            </div>
            {Object.entries(byMarket).map(([m,entries])=>{
              const avg=entries.reduce((s,e)=>s+e.price,0)/entries.length;
              const pct=maxP>minP?((avg-minP)/(maxP-minP))*100:50;
              return(
                <div className="history-bar-wrap" key={m}>
                  <div className="history-bar-label"><span><span className={`market-dot ${mci(m,markets)}`}></span>{m}</span><span style={{fontWeight:600}}>{fmtBRL(avg)}</span></div>
                  <div className="history-bar-track"><div className="history-bar-fill" style={{width:`${Math.max(8,pct)}%`}}></div></div>
                </div>
              );
            })}
            <div className="divider"/>
            <div style={{fontSize:12,color:C.muted}}>Último: {fmtDate(Math.max(...g.entries.map(e=>e.ts)))}</div>
          </div>
        );
      })}
    </>
  );
}

// ── List ──────────────────────────────────────────────────
function ListTab({items,onToggle,onDelete,onUpdateQty,prices,markets}){
  const pending=items.filter(i=>!i.done);
  const done=items.filter(i=>i.done);

  // best price for each item
  function bestFor(name){
    const m=prices.filter(p=>p.name.toLowerCase().includes(name.toLowerCase().slice(0,5)));
    return m.length?m.reduce((a,b)=>a.price<b.price?a:b):null;
  }

  // total
  const total=pending.reduce((sum,item)=>{
    const best=bestFor(item.name);
    const price=item.price||best?.price||0;
    return sum+(price*Number(item.qty||1));
  },0);

  // group by market
  const byMarket={};
  pending.forEach(item=>{
    const best=bestFor(item.name);
    const market=item.market||best?.market||"Sem mercado";
    if(!byMarket[market])byMarket[market]=[];
    byMarket[market].push({...item,bestPrice:item.price||best?.price||0});
  });

  if(items.length===0) return(<div className="empty"><div className="empty-icon">🛒</div><div className="empty-title">Lista vazia</div><p>Toque em "+" ou adicione da aba Comparar.</p></div>);

  return(
    <>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
        <div className="section-title" style={{margin:0}}>Lista de Compras</div>
        {done.length>0&&<span className="pill pill-green">{done.length}/{items.length} ✓</span>}
      </div>

      {/* Total */}
      {pending.length>0&&(
        <div className="total-bar">
          <div style={{fontSize:12,opacity:.8,marginBottom:2}}>Total estimado</div>
          <div style={{fontFamily:"Sora,sans-serif",fontSize:24,fontWeight:700}}>{fmtBRL(total)}</div>
          <div style={{fontSize:12,opacity:.8,marginTop:2}}>{pending.length} item(s) pendente(s)</div>
        </div>
      )}

      {/* Agrupado por mercado */}
      {Object.entries(byMarket).map(([market,marketItems])=>{
        const marketTotal=marketItems.reduce((s,i)=>s+(i.bestPrice*Number(i.qty||1)),0);
        const mi=markets.indexOf(market)%MCOLORS.length;
        return(
          <div className="market-group" key={market}>
            <div className="market-group-title">
              <span className={`market-dot ${MCOLORS[mi>=0?mi:0]}`} style={{width:10,height:10}}></span>
              {market}
              <span style={{marginLeft:"auto",color:C.tangerine,fontWeight:700}}>{fmtBRL(marketTotal)}</span>
            </div>
            {marketItems.map(item=>(
              <div className="list-item" key={item.id}>
                <div className={`checkbox ${item.done?"checked":""}`} onClick={()=>onToggle(item)}>{item.done&&"✓"}</div>
                <div style={{flex:1}}>
                  <div className={`list-item-name ${item.done?"done":""}`}>{item.name}</div>
                  {item.bestPrice>0&&<div style={{fontSize:11,color:C.muted}}>{fmtBRL(item.bestPrice)} / {item.unit||item.qty||"un"}</div>}
                </div>
                <div className="qty-ctrl">
                  <div className="qty-btn" onClick={()=>onUpdateQty(item,-1)}>−</div>
                  <div className="qty-num">{item.qty||1}</div>
                  <div className="qty-btn" onClick={()=>onUpdateQty(item,1)}>+</div>
                </div>
                <button className="btn btn-sm btn-danger" style={{marginLeft:4}} onClick={()=>onDelete(item.id)}>✕</button>
              </div>
            ))}
          </div>
        );
      })}

      {/* Comprados */}
      {done.length>0&&(
        <div className="card" style={{marginTop:8}}>
          <div style={{fontSize:12,color:C.muted,marginBottom:8,fontWeight:600}}>✅ Comprados ({done.length})</div>
          {done.map(item=>(
            <div className="list-item" key={item.id} style={{opacity:.6}}>
              <div className="checkbox checked" onClick={()=>onToggle(item)}>✓</div>
              <div className={`list-item-name done`} style={{flex:1}}>{item.name}</div>
              <button className="btn btn-sm btn-danger" onClick={()=>onDelete(item.id)}>✕</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

// ── Markets ───────────────────────────────────────────────
function MarketsTab({markets,prices,onAdd,onRemove,showToast}){
  const [newName,setNewName]=useState("");
  const [saving,setSaving]=useState(false);
  function priceCount(m){return prices.filter(p=>p.market===m).length;}
  async function handleAdd(){const name=newName.trim();if(!name||markets.includes(name))return;setSaving(true);await onAdd(name);setNewName("");setSaving(false);}
  async function handleRemove(m){if(priceCount(m)>0){showToast("⚠️ Remova os preços primeiro");return;}await onRemove(m);}
  return(
    <>
      <div className="section-title">Supermercados</div>
      <div className="card">
        <div className="label">Adicionar novo mercado</div>
        <div style={{display:"flex",gap:8,marginTop:6}}>
          <input className="input" placeholder="Nome do mercado..." value={newName} onChange={e=>setNewName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleAdd()} style={{flex:1}}/>
          <button className="btn btn-outline btn-sm" onClick={handleAdd} disabled={!newName.trim()||saving} style={{whiteSpace:"nowrap",marginTop:0,opacity:!newName.trim()?.5:1}}>{saving?"...":"Adicionar"}</button>
        </div>
      </div>
      <div className="section-title" style={{marginTop:8}}>Cadastrados ({markets.length})</div>
      {markets.map((m,i)=>(<div className="market-chip" key={m}><div className={`market-chip-dot ${MCOLORS[i%MCOLORS.length]}`}></div><div className="market-chip-name">{m}</div><div className="market-chip-count">{priceCount(m)} preço(s)</div><button className="btn btn-sm btn-danger" onClick={()=>handleRemove(m)} style={{opacity:priceCount(m)>0?.4:1}}>✕</button></div>))}
    </>
  );
}

// ── Admin ─────────────────────────────────────────────────
function AdminTab({pending,onApprove,onReject,reports,onResolve}){
  const pendentes=pending.filter(p=>!p.aprovada);
  return(
    <>
      <div className="section-title">👑 Painel Admin</div>
      {pendentes.length===0&&reports.length===0&&<div className="empty"><div className="empty-icon">✅</div><div className="empty-title">Tudo em ordem!</div></div>}
      {reports.length>0&&<>
        <div style={{fontFamily:"Sora,sans-serif",fontWeight:700,fontSize:14,marginBottom:8,color:C.red}}>⚠️ Preços sinalizados ({reports.length})</div>
        {reports.map(r=>(
          <div key={r.id} style={{border:`1.5px solid ${C.red}`,borderRadius:14,padding:14,marginBottom:10,background:"#FFF5F5"}}>
            <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>{r.name}</div>
            <div style={{fontSize:12,color:C.muted,marginBottom:10}}>{r.market} · <span style={{color:C.tangerine,fontWeight:700}}>{fmtBRL(r.price)}</span> · {fmtDate(r.ts)}</div>
            <div style={{display:"flex",gap:8}}>
              <button className="btn btn-sm btn-danger" style={{flex:1}} onClick={()=>onResolve(r.id,r.price_id,true)}>🗑️ Excluir</button>
              <button className="btn btn-sm btn-yellow" style={{flex:1}} onClick={()=>onResolve(r.id,r.price_id,false)}>✅ Manter</button>
            </div>
          </div>
        ))}
      </>}
      {pendentes.length>0&&<>
        <div style={{fontFamily:"Sora,sans-serif",fontWeight:700,fontSize:14,marginBottom:8,color:C.tangerine}}>📸 Fotos aguardando ({pendentes.length})</div>
        {pendentes.map(p=>(
          <div className="pending-card" key={p.id}>
            {p.foto_url&&<img src={p.foto_url} alt="" style={{width:"100%",maxHeight:200,objectFit:"cover",borderRadius:10,marginBottom:10}}/>}
            <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>{p.descricao||"Sem descrição"}</div>
            <div style={{fontSize:12,color:C.muted,marginBottom:10}}>{p.mercado&&<span>🏪 {p.mercado} </span>}{p.preco&&<span style={{color:C.tangerine,fontWeight:700}}>{fmtBRL(p.preco)}</span>}</div>
            <div style={{display:"flex",gap:8}}>
              <button className="btn btn-sm btn-primary" style={{flex:1,marginTop:0}} onClick={()=>onApprove(p)}>✅ Aprovar</button>
              <button className="btn btn-sm btn-danger" style={{flex:1}} onClick={()=>onReject(p.id)}>🗑️ Rejeitar</button>
            </div>
          </div>
        ))}
      </>}
    </>
  );
}

// ── Sheets ────────────────────────────────────────────────
function AddItemSheet({onClose,onSave,markets}){
  const [name,setName]=useState("");
  const [qty,setQty]=useState("1");
  const [price,setPrice]=useState("");
  const [market,setMarket]=useState(markets[0]||"");
  const [saving,setSaving]=useState(false);
  async function handle(){
    if(!name.trim())return;
    setSaving(true);
    await onSave({id:uid(),name:name.trim(),qty,market,price:price?parseFloat(price.replace(",",".")):0,done:false,ts:Date.now()});
    setSaving(false);
  }
  return(
    <div className="overlay" onClick={onClose}>
      <div className="sheet" onClick={e=>e.stopPropagation()}>
        <div className="sheet-handle"/>
        <div className="sheet-title">Adicionar à lista</div>
        <div style={{marginBottom:12}}><div className="label">Produto</div><input className="input" placeholder="Ex: Leite, Ovos..." value={name} onChange={e=>setName(e.target.value)} autoFocus/></div>
        <div style={{display:"flex",gap:8,marginBottom:12}}>
          <div style={{flex:1}}><div className="label">Quantidade</div><input className="input" placeholder="1" inputMode="numeric" value={qty} onChange={e=>setQty(e.target.value)}/></div>
          <div style={{flex:1}}><div className="label">Preço (R$)</div><input className="input" placeholder="0,00" inputMode="decimal" value={price} onChange={e=>setPrice(e.target.value)}/></div>
        </div>
        <div style={{marginBottom:16}}><div className="label">Mercado</div><select className="input" value={market} onChange={e=>setMarket(e.target.value)}>{markets.map(m=><option key={m}>{m}</option>)}</select></div>
        <button className="btn btn-primary" onClick={handle} disabled={!name.trim()||saving} style={{opacity:!name.trim()?.5:1}}>{saving?"Adicionando...":"Adicionar"}</button>
      </div>
    </div>
  );
}

function LoginSheet({onClose,onLogin}){
  const [pass,setPass]=useState("");
  return(
    <div className="overlay" onClick={onClose}>
      <div className="sheet" onClick={e=>e.stopPropagation()}>
        <div className="sheet-handle"/>
        <div className="sheet-title">👑 Acesso Admin</div>
        <div style={{marginBottom:16}}><div className="label">Senha</div><input className="input" type="password" placeholder="Digite a senha..." value={pass} onChange={e=>setPass(e.target.value)} autoFocus onKeyDown={e=>e.key==="Enter"&&onLogin(pass)}/></div>
        <button className="btn btn-primary" onClick={()=>onLogin(pass)} disabled={!pass}>Entrar</button>
      </div>
    </div>
  );
}
