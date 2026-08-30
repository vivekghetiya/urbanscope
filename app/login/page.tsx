'use client'

import { useState } from 'react'
import { ArrowRight, Smartphone } from 'lucide-react'
import { AuthFrame } from '@/app/auth/auth-shell'

export default function LoginPage() {
  const [phone, setPhone] = useState('')
  const valid = phone.replace(/\D/g, '').length >= 10
  return <AuthFrame><div className="mb-10 lg:mb-14"><p className="font-mono text-[10px] tracking-[.28em] text-primary">ACCESS URBAN INTELLIGENCE</p><h2 className="mt-5 text-4xl font-black tracking-[-.06em] sm:text-5xl">Welcome to UrbanScope</h2><p className="mt-4 text-sm leading-6 text-white/50">Enter your mobile number to continue.</p></div><form onSubmit={e => { e.preventDefault(); if (valid) window.location.href = `/verify-otp?phone=${encodeURIComponent(phone)}` }} className="flex flex-col gap-6"><label className="flex flex-col gap-3 text-xs text-white/50">MOBILE NUMBER<div className="flex items-center rounded-xl border border-white/15 bg-white/[.03] transition focus-within:border-primary focus-within:shadow-[0_0_30px_rgba(255,106,0,.16)]"><span className="flex items-center gap-2 border-r border-white/10 px-4 py-4 text-base text-white"><span>IN</span> +91</span><input aria-label="Mobile number" required inputMode="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Enter mobile number" className="min-w-0 flex-1 bg-transparent px-4 py-4 text-lg outline-none placeholder:text-white/25" /></div></label><button disabled={!valid} className="btn-glow flex items-center justify-center gap-2 rounded-xl px-5 py-4 text-sm font-bold text-black disabled:cursor-not-allowed disabled:opacity-35">Continue <ArrowRight className="size-4" /></button><p className="text-center text-xs leading-5 text-white/35">By continuing, you agree to our <a href="#terms" className="text-white/65 underline underline-offset-4">Terms</a> and <a href="#privacy" className="text-white/65 underline underline-offset-4">Privacy Policy</a>.</p></form><div className="mt-12 flex items-center gap-3 border-t border-white/10 pt-5 text-xs text-white/35"><Smartphone className="size-4 text-primary" /> Phone verification only. No passwords to remember.</div></AuthFrame>
}
