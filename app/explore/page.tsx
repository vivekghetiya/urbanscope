'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Bell, Box, ChevronDown, Circle, Compass, Crosshair, Download, Expand,
  Layers3, Map, MapPin, Menu, Minus, Move, Pencil, Plus, Ruler, Search,
  Share2, SlidersHorizontal, Sparkles, Square, Star, Target, X, Zap,
} from 'lucide-react'

const layerGroups = [
  { label: 'PLANNING', items: ['Town Planning Schemes', 'Development Plans', 'Zoning'] },
  { label: 'LAND', items: ['Survey Numbers', 'Final Plots'] },
  { label: 'INFRASTRUCTURE', items: ['Existing Roads', 'Proposed Roads', 'Metro Projects'] },
  { label: 'OTHER', items: ['Village Boundaries', 'Water Bodies', 'Public Notices'] },
]

function MapCanvas({ layers, measuring }: { layers: Record<string, boolean>; measuring: boolean }) {
  return <div className="absolute inset-0 overflow-hidden bg-[#111716]">
    <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'radial-gradient(ellipse at 45% 48%, rgba(255,106,0,.28), transparent 42%), radial-gradient(ellipse at 78% 20%, rgba(255,184,0,.14), transparent 32%)' }} />
    <div className="map-grid absolute inset-0 opacity-45" />
    <div className="absolute inset-[-8%] opacity-40" style={{ backgroundImage: 'repeating-radial-gradient(ellipse at 50% 50%, transparent 0 38px, rgba(255,184,0,.12) 39px 40px)', transform: 'rotate(-18deg)' }} />
    <svg className="absolute inset-0 size-full" viewBox="0 0 1400 900" preserveAspectRatio="none" aria-hidden="true">
      <path d="M-50 700 C170 570 160 310 390 390 S630 770 860 600 S1080 170 1470 90" className="road road-main" />
      <path d="M-50 290 C190 410 260 100 510 210 S730 530 960 360 S1160 420 1470 390" className="road road-secondary" />
      <path d="M120 900 C320 700 450 790 600 600 S920 500 1320 850" className="road road-thin" />
      <path d="M250 -40 C310 180 500 120 590 360 S780 700 930 940" className="road road-thin" />
      <path d="M760 20 L860 110 L1100 85 L1220 250 L1080 420 L860 360 L760 20Z" fill="rgba(255,184,0,.035)" stroke={layers['Town Planning Schemes'] ? '#ffb800' : 'rgba(255,184,0,.18)'} strokeWidth="3" strokeDasharray="12 10" className={layers['Town Planning Schemes'] ? 'animate-[road_12s_linear_infinite]' : ''} />
      <path d="M930 430 L1110 360 L1300 500 L1220 700 L1000 690 L930 430Z" fill="rgba(255,106,0,.06)" stroke={layers['Zoning'] ? '#ff6a00' : 'rgba(255,106,0,.16)'} strokeWidth="2" />
      {layers['Proposed Roads'] && <path d="M130 180 C390 260 450 480 720 470 S980 250 1370 290" className="road road-main" strokeWidth="5" />}
      {layers['Metro Projects'] && <path d="M80 780 C380 620 630 740 900 520 S1200 460 1400 180" fill="none" stroke="#ffd54a" strokeWidth="4" strokeDasharray="2 18" />}
    </svg>
    {[[23, 47, 'Dumas Road'], [57, 52, 'Vesu'], [71, 34, 'TP 24'], [82, 63, 'Pal'], [42, 72, 'Udhna'], [88, 19, 'Metro']].map(([x, y, label], i) => <motion.button key={String(label)} style={{ left: `${x}%`, top: `${y}%` }} className="absolute z-10 -translate-x-1/2 -translate-y-1/2" animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2.5 + i * .3, repeat: Infinity }}><span className="relative block size-3 rounded-full border-2 border-accent bg-primary shadow-[0_0_20px_#ff6a00]"><span className="absolute -inset-2 animate-ping rounded-full border border-primary/40" /></span><span className="mt-2 block whitespace-nowrap rounded bg-black/60 px-2 py-1 font-mono text-[9px] tracking-widest text-white/80">{label}</span></motion.button>)}
    <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,.025)_50%,transparent_65%)] bg-[length:220%_100%] animate-[shine_18s_linear_infinite]" />
    {measuring && <div className="absolute left-[28%] top-[42%] h-[190px] w-[280px] rotate-[24deg] border-b-2 border-dashed border-accent"><span className="absolute -right-2 -top-2 size-3 rounded-full bg-accent" /><span className="absolute -bottom-2 -left-2 size-3 rounded-full bg-accent" /><div className="absolute -top-9 left-1/2 rounded-lg bg-black/80 px-3 py-2 font-mono text-[10px] text-accent">2.84 KM / DISTANCE</div></div>}
  </div>
}

function IconButton({ label, children, active, onClick }: { label: string; children: React.ReactNode; active?: boolean; onClick?: () => void }) {
  return <button aria-label={label} title={label} onClick={onClick} className={`flex size-10 items-center justify-center rounded-full border transition ${active ? 'border-primary bg-primary/20 text-primary shadow-[0_0_24px_rgba(255,106,0,.28)]' : 'border-white/10 bg-black/35 text-white/65 hover:border-primary/60 hover:text-primary'}`}>{children}</button>
}

export default function ExplorePage() {
  const [showLayers, setShowLayers] = useState(false)
  const [showInfo, setShowInfo] = useState(true)
  const [measuring, setMeasuring] = useState(false)
  const [mapStyle, setMapStyle] = useState('Dark')
  const [layers, setLayers] = useState<Record<string, boolean>>({ 'Town Planning Schemes': true, Zoning: true, 'Proposed Roads': true })
  const [sheetTab, setSheetTab] = useState('Overview')
  const toggleLayer = (name: string) => setLayers(prev => ({ ...prev, [name]: !prev[name] }))

  return <main className="relative h-dvh overflow-hidden bg-[#080808] text-white">
    <MapCanvas layers={layers} measuring={measuring} />
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,.5))]" />

    <header className="absolute left-3 right-3 top-3 z-40 flex items-center gap-3 md:left-6 md:right-6 md:top-5">
      <a href="/" className="glass-panel-sm flex shrink-0 items-center gap-2 px-4 py-3 font-mono text-xs font-bold tracking-[.2em]"><span className="size-2 rounded-full bg-primary shadow-[0_0_12px_#ff6a00]" /> URBANSCOPE</a>
      <div className="glass-panel-sm flex min-w-0 flex-1 items-center gap-3 px-4 py-2.5 md:mx-auto md:max-w-2xl"><Search className="size-4 shrink-0 text-primary" /><input aria-label="Search map" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-white/45" placeholder="Search location, TP scheme, survey number..." /><kbd className="hidden rounded border border-white/10 px-2 py-1 font-mono text-[10px] text-white/45 sm:block">⌘ K</kbd></div>
      <div className="hidden items-center gap-2 md:flex"><IconButton label="Saved places"><Star /></IconButton><IconButton label="Notifications"><Bell /></IconButton><a href="/login" aria-label="Open profile" className="flex size-10 items-center justify-center rounded-full border border-secondary bg-secondary/20 font-mono text-xs text-secondary">AR</a></div>
      <button aria-label="Open menu" className="glass-panel-sm flex size-11 shrink-0 items-center justify-center md:hidden"><Menu /></button>
    </header>

    <aside className="absolute left-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-2 md:flex"><div className="glass-panel flex flex-col gap-2 p-2"><IconButton label="Search"><Search /></IconButton><IconButton label="Map layers" active={showLayers} onClick={() => setShowLayers(!showLayers)}><Layers3 /></IconButton><IconButton label="Saved places"><Star /></IconButton><IconButton label="Projects"><Box /></IconButton><IconButton label="Public notices"><Bell /></IconButton><div className="my-1 border-t border-white/10" /><IconButton label="Measure distance" active={measuring} onClick={() => setMeasuring(!measuring)}><Ruler /></IconButton><IconButton label="Draw area"><Pencil /></IconButton></div></aside>

    <AnimatePresence>{showLayers && <motion.aside initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -30, opacity: 0 }} className="glass-panel absolute left-4 top-24 z-40 w-[290px] p-5 md:left-20 md:top-28"><div className="mb-5 flex items-center justify-between"><div><p className="font-mono text-[10px] tracking-[.25em] text-primary">CONTROL CENTER</p><h2 className="mt-1 text-lg font-bold">MAP LAYERS</h2></div><button aria-label="Close layers" onClick={() => setShowLayers(false)}><X className="size-4 text-white/50" /></button></div>{layerGroups.map(group => <div key={group.label} className="mb-5"><p className="mb-2 font-mono text-[9px] tracking-[.22em] text-white/40">{group.label}</p><div className="flex flex-col gap-1">{group.items.map(item => <button key={item} onClick={() => toggleLayer(item)} className="flex items-center justify-between rounded-lg px-2 py-2 text-left text-xs text-white/75 transition hover:bg-white/5"><span className="flex items-center gap-2"><span className={`size-1.5 rounded-full ${layers[item] ? 'bg-primary shadow-[0_0_8px_#ff6a00]' : 'bg-white/20'}`} />{item}</span><span className={`relative h-4 w-7 rounded-full transition ${layers[item] ? 'bg-primary' : 'bg-white/15'}`}><span className={`absolute top-0.5 size-3 rounded-full bg-white transition ${layers[item] ? 'left-3.5' : 'left-0.5'}`} /></span></button>)}</div></div>)}<div className="border-t border-white/10 pt-4 text-[10px] text-white/40"><span className="text-primary">●</span> Live planning data synced 2m ago</div></motion.aside>}</AnimatePresence>

    <AnimatePresence>{showInfo && <motion.aside initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 30, opacity: 0 }} className="glass-panel absolute bottom-28 right-4 z-30 w-[310px] p-5 md:bottom-24 md:right-6"><div className="flex items-start justify-between"><div><p className="font-mono text-[10px] tracking-[.24em] text-primary">SELECTED LOCATION</p><h2 className="mt-2 text-2xl font-bold tracking-tight">VESU, SURAT</h2><span className="mt-2 inline-flex items-center gap-1 rounded-full bg-secondary/15 px-2 py-1 font-mono text-[9px] text-secondary"><Zap className="size-3" /> HIGH GROWTH ZONE</span></div><button aria-label="Close location information" onClick={() => setShowInfo(false)}><X className="size-4 text-white/50" /></button></div><div className="my-5 flex items-center gap-5 border-y border-white/10 py-5"><div className="relative flex size-20 items-center justify-center rounded-full border-4 border-primary/30"><div className="absolute inset-1 rounded-full border-2 border-primary border-r-transparent rotate-[-35deg]" /><span className="text-2xl font-black text-secondary">86</span></div><div><p className="font-mono text-[9px] text-white/40">URBAN POTENTIAL</p><p className="mt-1 text-sm font-semibold">Excellent outlook</p><p className="mt-1 text-xs text-white/50">Top 12% in Surat</p></div></div><div className="flex flex-col gap-3 text-xs"><div className="flex items-center justify-between"><span className="text-white/45">Planning</span><span>TP Scheme 24 · Residential</span></div><div className="flex items-center justify-between"><span className="text-white/45">Infrastructure</span><span className="text-secondary">30m Proposed Road</span></div><div className="flex items-center justify-between"><span className="text-white/45">Metro connectivity</span><span>2.4 km</span></div></div><div className="mt-5 flex gap-2"><button className="btn-glow flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-black"><Star className="size-3" /> Save</button><button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs hover:border-primary/50"><Download className="size-3" /> Report</button><button aria-label="Share location" className="flex size-8 items-center justify-center rounded-lg border border-white/10"><Share2 className="size-3" /></button></div></motion.aside>}</AnimatePresence>

    <div className="absolute bottom-6 left-4 z-30 flex items-center gap-2 md:left-6"><div className="glass-panel-sm hidden items-center gap-1 p-1 sm:flex">{['Dark', 'Satellite', 'Planning', 'Terrain'].map(style => <button key={style} onClick={() => setMapStyle(style)} className={`rounded-md px-3 py-2 text-[10px] transition ${mapStyle === style ? 'bg-primary text-black' : 'text-white/55 hover:text-white'}`}>{style}</button>)}</div><button className="glass-panel-sm flex items-center gap-2 px-3 py-2 text-[10px] sm:hidden"><Map className="size-3 text-primary" /> {mapStyle}<ChevronDown className="size-3" /></button><span className="hidden font-mono text-[9px] text-white/35 lg:block">LAT 21.1702° N · LONG 72.8311° E</span></div>
    <div className="absolute bottom-6 right-4 z-30 flex flex-col gap-2 md:right-6"><div className="glass-panel flex flex-col gap-1 p-1"><IconButton label="Zoom in"><Plus /></IconButton><IconButton label="Zoom out"><Minus /></IconButton></div><div className="glass-panel flex gap-1 p-1"><IconButton label="My location"><Crosshair /></IconButton><IconButton label="3D view"><Box /></IconButton><IconButton label="Fullscreen"><Expand /></IconButton></div></div>

    <motion.section initial={{ y: 50 }} animate={{ y: 0 }} className="glass-panel absolute bottom-0 left-1/2 z-20 w-[calc(100%-1.5rem)] -translate-x-1/2 rounded-b-none p-3 md:w-[min(720px,calc(100%-360px))] md:p-4"><div className="mx-auto mb-2 h-1 w-10 rounded-full bg-white/20 md:hidden" /><div className="flex items-center justify-between gap-3"><div><p className="font-mono text-[9px] tracking-[.2em] text-primary">LOCATION DETAILS</p><h3 className="mt-1 text-lg font-bold">VESU, SURAT <span className="ml-2 text-xs font-normal text-white/40">21.1702° N, 72.8311° E</span></h3></div><div className="hidden items-center gap-2 sm:flex"><button className="rounded-lg border border-white/10 px-3 py-2 text-[10px] text-white/65"><Move className="mr-1 inline size-3" /> Move map</button><button onClick={() => setShowInfo(true)} className="rounded-lg border border-primary/40 px-3 py-2 text-[10px] text-primary">Open details</button></div></div><div className="mt-3 flex gap-1 overflow-auto border-b border-white/10">{['Overview', 'Planning', 'Infrastructure', 'Documents'].map(tab => <button key={tab} onClick={() => setSheetTab(tab)} className={`whitespace-nowrap border-b-2 px-3 py-2 text-[10px] ${sheetTab === tab ? 'border-primary text-primary' : 'border-transparent text-white/45'}`}>{tab}</button>)}</div><p className="mt-3 line-clamp-1 text-xs text-white/55">{sheetTab === 'Overview' ? 'A high-growth residential pocket with strong future connectivity and active planning transformation.' : `${sheetTab} intelligence is available for this location.`}</p></motion.section>

    <nav className="absolute bottom-2 left-1/2 z-50 flex -translate-x-1/2 gap-5 rounded-full border border-white/10 bg-black/70 px-5 py-2 backdrop-blur-xl md:hidden"><button aria-label="Map" className="text-primary"><Map className="size-5" /></button><button aria-label="Layers" onClick={() => setShowLayers(!showLayers)} className={showLayers ? 'text-primary' : 'text-white/50'}><Layers3 className="size-5" /></button><button aria-label="Saved"><Star className="size-5 text-white/50" /></button><button aria-label="Compass"><Compass className="size-5 text-white/50" /></button><button aria-label="Settings"><SlidersHorizontal className="size-5 text-white/50" /></button></nav>
  </main>
}
