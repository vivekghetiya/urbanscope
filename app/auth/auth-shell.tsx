'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, MapPin } from 'lucide-react'
import Link from 'next/link'

export function CityVisual() {
  return <div className="relative hidden min-h-screen overflow-hidden border-r border-white/10 bg-[#0b0e0d] lg:block lg:w-[52%]">
    <div className="map-grid absolute inset-0 opacity-35" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_45%,rgba(255,106,0,.2),transparent_35%),linear-gradient(135deg,transparent,rgba(255,184,0,.05))]" />
    <svg className="absolute inset-0 size-full" viewBox="0 0 700 900" preserveAspectRatio="none" aria-hidden="true">
      <path d="M-30 710 C120 560 80 330 245 400 S340 760 510 590 S570 210 740 110" className="road road-main" /><path d="M-30 250 C130 360 205 100 330 260 S430 540 710 380" className="road road-secondary" /><path d="M100 920 C230 700 370 820 420 600 S610 480 740 700" className="road road-thin" /><path d="M220 -20 C250 160 380 180 410 350 S450 650 550 920" className="road road-thin" /><path d="M310 270 L500 190 L610 330 L540 510 L350 490 L310 270Z" fill="rgba(255,184,0,.04)" stroke="#ffb800" strokeDasharray="10 12" />
    </svg>
    {[[19,40],[44,27],[69,48],[36,68],[78,75],[56,16]].map(([x,y], i) => <motion.span key={i} className="map-node absolute" style={{left:`${x}%`,top:`${y}%`}} animate={{scale:[1,1.8,1],opacity:[.9,.35,.9]}} transition={{duration:2.8+i*.4,repeat:Infinity,delay:i*.3}} />)}
    <div className="absolute left-12 top-12 font-mono text-xs font-bold tracking-[.26em]"><span className="mr-2 inline-block size-2 rounded-full bg-primary shadow-[0_0_14px_#ff6a00]" /> URBANSCOPE</div>
    <div className="absolute bottom-12 left-12 right-12"><div className="mb-8 flex flex-wrap gap-2 font-mono text-[9px] tracking-widest text-white/50"><span className="glass-panel-sm px-3 py-2 text-primary">TP SCHEME</span><span className="glass-panel-sm px-3 py-2">PROPOSED ROAD</span><span className="glass-panel-sm px-3 py-2">PLANNING ZONE</span></div><h1 className="max-w-xl text-6xl font-black leading-[.92] tracking-[-.07em]">EXPLORE THE FUTURE<br />OF YOUR CITY.</h1><p className="mt-6 max-w-md text-sm leading-6 text-white/55">Access intelligent planning data, infrastructure updates and location insights.</p><div className="mt-10 flex items-center gap-3 border-t border-white/10 pt-5"><span className="relative flex size-3"><span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" /><span className="relative inline-flex size-3 rounded-full bg-primary" /></span><div><p className="font-mono text-[10px] tracking-widest text-primary">LIVE DATA</p><p className="mt-1 text-xs text-white/45">Updated continuously</p></div></div></div>
  </div>
}

export function AuthFrame({ children, back = '/explore' }: { children: React.ReactNode; back?: string }) {
  return <main className="flex min-h-screen bg-background text-white"><CityVisual /><section className="relative flex min-h-screen flex-1 items-center justify-center overflow-hidden px-6 py-12 sm:px-12"><div className="absolute inset-0 map-grid opacity-10 lg:hidden" /><div className="absolute left-6 top-6 z-10 lg:hidden"><span className="font-mono text-xs font-bold tracking-[.26em]"><span className="mr-2 inline-block size-2 rounded-full bg-primary" /> URBANSCOPE</span></div><Link href={back} className="absolute left-6 top-6 z-10 inline-flex items-center gap-2 text-xs text-white/45 transition hover:text-white lg:left-10"><ArrowLeft className="size-4" /> Back</Link><div className="relative z-10 w-full max-w-md">{children}</div></section></main>
}
export function LocationPulse() { return <span className="relative inline-flex size-5 items-center justify-center"><span className="absolute size-full animate-ping rounded-full bg-primary/30" /><MapPin className="relative size-5 text-primary" /></span> }
