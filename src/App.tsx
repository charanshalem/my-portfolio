import React from "react";
import { useEffect, useRef, useState } from 'react';
import {
  Code2, Globe, Mail, ExternalLink,
  ChevronDown, Cpu, Database, Monitor, Terminal,
  Sparkles, ArrowRight, Menu, X
} from 'lucide-react';

/* ── Particle Canvas (animated background) ── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: {
      x: number; y: number; vx: number; vy: number; r: number; alpha: number
    }[] = [];

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,245,255,${p.alpha})`;
        ctx.fill();
      });
      // connect nearby particles with lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,245,255,${0.1 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} id="particle-canvas" />;
}

/* ── Navbar ── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['About', 'Skills', 'Projects', 'Contact'];
  const scroll = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-[#020817]/90 backdrop-blur-xl border-b border-white/5' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-orbitron text-lg font-bold text-cyan-400 glow-text tracking-widest">
          KCS
        </button>
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <button key={l} onClick={() => scroll(l)} className="nav-link">{l}</button>
          ))}
          <a href="mailto:charanshalem@gmail.com"
            className="neon-btn px-5 py-2 rounded-full border border-cyan-400/40 text-cyan-400 text-sm font-medium tracking-wide">
            Hire Me
          </a>
        </div>
        <button className="md:hidden text-cyan-400" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden glass border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          {links.map(l => (
            <button key={l} onClick={() => scroll(l)} className="nav-link text-left py-2">{l}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ── Hero Section ── */
function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  return (
    <section id="hero"
      className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden">
      {/* Glow blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16
                      flex flex-col md:flex-row items-center gap-10 lg:gap-16">
        {/* Left: text */}
        <div className={`flex-1 w-full transition-all duration-1000
          ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                          glass border border-cyan-400/20 mb-6">
            <Sparkles size={14} className="text-cyan-400" />
            <span className="text-cyan-400 text-xs font-medium tracking-widest uppercase">
              Available for opportunities
            </span>
          </div>

          <h1 className="font-orbitron text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-4">
            <span className="block text-white/90">Hi, I'm</span>
            <span className="block text-transparent bg-clip-text
                             bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 hero-name"
                  data-text="Charan">
              Charan
            </span>
          </h1>

          <div className="h-12 mb-6 overflow-hidden">
            <p className="typewriter font-orbitron text-lg md:text-xl text-cyan-300 font-bold tracking-wider">
              Full Stack Developer
            </p>
          </div>

          <p className="text-slate-400 text-lg leading-relaxed max-w-xl mb-10 fade-in-up fade-in-up-delay-2">
            A passionate diploma final-year student crafting digital experiences
            from code and creativity. I turn ideas into real, working products.
          </p>

          <div className="flex flex-wrap gap-4 fade-in-up fade-in-up-delay-3">
            <a href="https://builder.pythonanywhere.com" target="_blank" rel="noopener noreferrer"
               className="neon-btn flex items-center gap-2 px-6 py-3 rounded-xl border border-cyan-400
                          text-cyan-400 font-semibold text-sm hover:text-white transition-all duration-300">
              <Globe size={16} /> View Live Project <ArrowRight size={14} />
            </a>
            <a href="mailto:charanshalem@gmail.com"
               className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r
                          from-cyan-500 to-blue-600 text-white font-semibold text-sm
                          hover:opacity-90 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300">
              <Mail size={16} /> Get in Touch
            </a>
          </div>

          <div className="flex gap-8 mt-12 fade-in-up fade-in-up-delay-4">
            {[
              { val: '1+',   label: 'Live Project' },
              { val: '6+',   label: 'Skills'       },
              { val: '100%', label: 'Dedication'   },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="font-orbitron text-2xl font-bold text-cyan-400 glow-text">{s.val}</div>
                <div className="text-slate-500 text-xs mt-1 tracking-wider uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: photo with 3D orbit rings */}
        <div className={`flex-shrink-0 relative w-64 h-80 lg:w-72 lg:h-96
          transition-all duration-1000 delay-300
          ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}>

          <div style={{ perspective: '800px' }} className="absolute inset-0">
            <div className="orbit-ring orbit-1"><div className="orbit-dot bg-cyan-400   text-cyan-400" /></div>
            <div className="orbit-ring orbit-2"><div className="orbit-dot bg-blue-400   text-blue-400" /></div>
            <div className="orbit-ring orbit-3"><div className="orbit-dot bg-violet-400 text-violet-400" /></div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center float-anim">
            <div className="gradient-border w-full h-full relative z-10">
              <div className="w-full h-full rounded-3xl overflow-hidden">
                <img src="/images/image.png" alt="Korukonda Charan Shalem"
                     className="w-full h-full object-cover object-[50%_5%]" />
              </div>
              <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                <div className="scan-line" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-slate-500 text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={18} className="text-cyan-400" />
      </div>
    </section>
  );
}

/* ── About Section ── */
function About() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const facts = [
    { icon: <Monitor  size={20} />, label: 'Frontend',         desc: 'HTML, CSS & modern UI design' },
    { icon: <Terminal size={20} />, label: 'Backend',          desc: 'Python, Java server-side logic' },
    { icon: <Database size={20} />, label: 'Data Structures',  desc: 'Problem solving & algorithms' },
    { icon: <Cpu      size={20} />, label: 'Systems',          desc: 'C programming & low-level logic' },
  ];

  return (
    <section id="about" ref={ref} className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`reveal ${visible ? 'visible' : ''} text-center mb-16`}>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400" />
            <span className="font-orbitron text-cyan-400 text-sm tracking-widest uppercase">About Me</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-400" />
          </div>
          <h2 className="font-orbitron text-4xl md:text-5xl font-black text-white">
            Who Am <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">I?</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
            <div className="glass rounded-2xl p-8 border border-white/5 card-3d">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20
                                flex items-center justify-center border border-cyan-400/20">
                  <Code2 size={20} className="text-cyan-400" />
                </div>
                <h3 className="font-semibold text-white text-lg">My Story</h3>
              </div>
              <p className="text-slate-400 leading-relaxed mb-4">
                I'm <span className="text-cyan-400 font-semibold">Korukonda Charan Shalem</span>,
                a final-year Diploma student with a burning passion for software development.
              </p>
              <p className="text-slate-400 leading-relaxed mb-4">
                As a <span className="text-white font-medium">fresher and beginner</span>, I've already
                built and deployed a full company website for{' '}
                <span className="text-cyan-400 font-medium">GJ Soft Solutions</span>.
              </p>
              <p className="text-slate-400 leading-relaxed">
                My goal is to grow into a skilled full-stack developer, contributing to innovative
                products while continuously expanding my technical expertise.
              </p>
              <div className="mt-6 flex items-center gap-3 p-4 rounded-xl bg-cyan-400/5 border border-cyan-400/10">
                <div className="timeline-dot flex-shrink-0" />
                <div>
                  <p className="text-white text-sm font-medium">Currently Pursuing</p>
                  <p className="text-slate-400 text-xs">Diploma — Final Year (2026)</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`grid grid-cols-2 gap-4 reveal ${visible ? 'visible' : ''}`}
               style={{ transitionDelay: '0.2s' }}>
            {facts.map((f, i) => (
              <div key={f.label}
                   className="glass rounded-xl p-5 border border-white/5 card-3d group cursor-default"
                   style={{ transitionDelay: `${i * 0.05}s` }}>
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20
                                flex items-center justify-center border border-cyan-400/20 mb-4
                                group-hover:border-cyan-400/50 transition-colors text-cyan-400">
                  {f.icon}
                </div>
                <h4 className="text-white font-semibold text-sm mb-1">{f.label}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Skills Section ── */
function Skills() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const skills = [
    { name: 'HTML & CSS',      level: 80, color: 'from-orange-400 to-red-500',  icon: '🌐' },
    { name: 'Python',          level: 70, color: 'from-yellow-400 to-green-500', icon: '🐍' },
    { name: 'Java',            level: 60, color: 'from-red-400 to-orange-500',   icon: '☕' },
    { name: 'C Programming',   level: 65, color: 'from-blue-400 to-cyan-500',    icon: '⚙️' },
    { name: 'Data Structures', level: 55, color: 'from-cyan-400 to-teal-500',    icon: '🔷' },
    { name: 'Web Development', level: 75, color: 'from-pink-400 to-rose-500',    icon: '💻' },
  ];

  const techBadges = [
    { label: 'Python',     bg: 'from-yellow-500/20 to-yellow-600/20', border: 'border-yellow-500/20', text: 'text-yellow-400' },
    { label: 'Java',       bg: 'from-red-500/20 to-orange-600/20',    border: 'border-red-500/20',    text: 'text-red-400'    },
    { label: 'HTML5',      bg: 'from-orange-500/20 to-red-600/20',    border: 'border-orange-500/20', text: 'text-orange-400' },
    { label: 'CSS3',       bg: 'from-blue-500/20 to-blue-600/20',     border: 'border-blue-500/20',   text: 'text-blue-400'   },
    { label: 'C Language', bg: 'from-cyan-500/20 to-teal-600/20',     border: 'border-cyan-500/20',   text: 'text-cyan-400'   },
    { label: 'DS & Algo',  bg: 'from-green-500/20 to-teal-600/20',    border: 'border-green-500/20',  text: 'text-green-400'  },
  ];

  return (
    <section id="skills" ref={ref} className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`reveal ${visible ? 'visible' : ''} text-center mb-16`}>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400" />
            <span className="font-orbitron text-cyan-400 text-sm tracking-widest uppercase">Technical Skills</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-400" />
          </div>
          <h2 className="font-orbitron text-4xl md:text-5xl font-black text-white">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Arsenal</span>
          </h2>
        </div>

        <div className={`flex flex-wrap justify-center gap-3 mb-16 reveal ${visible ? 'visible' : ''}`}
             style={{ transitionDelay: '0.1s' }}>
          {techBadges.map(t => (
            <div key={t.label}
                 className={`px-5 py-2.5 rounded-full bg-gradient-to-r ${t.bg}
                             border ${t.border} ${t.text} text-sm font-semibold
                             card-3d cursor-default tracking-wide`}>
              {t.label}
            </div>
          ))}
        </div>

        <div className={`grid md:grid-cols-2 gap-6 reveal ${visible ? 'visible' : ''}`}
             style={{ transitionDelay: '0.2s' }}>
          {skills.map((s, i) => (
            <div key={s.name} className="glass rounded-xl p-5 border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{s.icon}</span>
                  <span className="text-white font-medium text-sm">{s.name}</span>
                </div>
                <span className="text-slate-400 text-xs font-mono">{s.level}%</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${s.color} rounded-full skill-bar`}
                     style={{
                       '--target-width': `${s.level}%`,
                       animationDelay: `${i * 0.1 + 0.4}s`,
                       animationPlayState: visible ? 'running' : 'paused',
                     } as React.CSSProperties} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Projects Section ── */
function Projects() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="projects" ref={ref} className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`reveal ${visible ? 'visible' : ''} text-center mb-16`}>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400" />
            <span className="font-orbitron text-cyan-400 text-sm tracking-widest uppercase">Projects</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-400" />
          </div>
          <h2 className="font-orbitron text-4xl md:text-5xl font-black text-white">
            What I've <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Built</span>
          </h2>
        </div>

        {/* Featured project card */}
        <div className={`reveal ${visible ? 'visible' : ''} project-card glass rounded-2xl
                         border border-white/8 overflow-hidden transition-all duration-500`}
             style={{ transitionDelay: '0.1s' }}>
          <div className="grid md:grid-cols-2 items-stretch">
            <div className="relative bg-gradient-to-br from-cyan-500/10 to-blue-600/10 min-h-64
                            flex items-center justify-center overflow-hidden p-8 border-r border-white/5">
              <div className="absolute inset-0 grid-bg opacity-40" />
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-blue-600/30
                                border border-cyan-400/30 flex items-center justify-center mx-auto mb-4 float-anim">
                  <Globe size={36} className="text-cyan-400" />
                </div>
                <div className="glass rounded-xl px-4 py-2 border border-cyan-400/20 inline-block">
                  <span className="text-cyan-400 text-xs font-mono">builder.pythonanywhere.com</span>
                </div>
              </div>
            </div>
            <div className="p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-cyan-400 text-xs font-medium uppercase tracking-widest">Live & Deployed</span>
                </div>
                <h3 className="font-orbitron text-2xl font-bold text-white mb-3">GJ Soft Solutions</h3>
                <p className="text-slate-400 leading-relaxed mb-6">
                  A complete company website built for GJ Soft Solutions — designed and deployed independently.
                  Python backend hosted on PythonAnywhere.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Python', 'HTML', 'CSS', 'Web Dev', 'PythonAnywhere'].map(tag => (
                    <span key={tag}
                          className="px-3 py-1 text-xs rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-400/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <a href="https://builder.pythonanywhere.com" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r
                              from-cyan-500 to-blue-600 text-white text-sm font-semibold
                              hover:opacity-90 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                  <ExternalLink size={14} /> Visit Site
                </a>
                <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-white/10 text-slate-400 text-sm">
                  <Globe size={14} /> Personal Project
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coming soon */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6 reveal ${visible ? 'visible' : ''}`}
             style={{ transitionDelay: '0.2s' }}>
          {['E-Commerce Platform', 'Portfolio Generator', 'Task Manager App'].map((name, i) => (
            <div key={name}
                 className="glass rounded-xl border border-white/5 p-6 card-3d group cursor-default"
                 style={{ transitionDelay: `${i * 0.05}s` }}>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800
                              flex items-center justify-center mb-4
                              group-hover:from-cyan-500/20 group-hover:to-blue-600/20 transition-all duration-300">
                <Code2 size={18} className="text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </div>
              <h4 className="text-white font-semibold mb-2">{name}</h4>
              <p className="text-slate-500 text-sm mb-4">Upcoming project — currently in planning.</p>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-500
                               bg-white/4 px-3 py-1 rounded-full border border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" /> Coming Soon
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Contact Section ── */
function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href =
      `mailto:charanshalem@gmail.com` +
      `?subject=Portfolio Contact from ${form.name}` +
      `&body=${encodeURIComponent(form.message + '\n\nFrom: ' + form.email)}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" ref={ref} className="relative py-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <div className={`reveal ${visible ? 'visible' : ''} text-center mb-16`}>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400" />
            <span className="font-orbitron text-cyan-400 text-sm tracking-widest uppercase">Contact</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-400" />
          </div>
          <h2 className="font-orbitron text-4xl md:text-5xl font-black text-white">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Connect</span>
          </h2>
          <p className="text-slate-400 mt-4 text-lg max-w-xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className={`reveal ${visible ? 'visible' : ''} space-y-5`}
               style={{ transitionDelay: '0.1s' }}>
            <div className="glass rounded-2xl border border-white/5 p-6 card-3d">
              <h3 className="font-orbitron font-bold text-white mb-1">Charan Shalem</h3>
              <p className="text-slate-400 text-sm mb-5">Full Stack Developer · Diploma Student</p>
              <div className="space-y-4">
                <a href="mailto:charanshalem@gmail.com" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20
                                  border border-cyan-400/20 flex items-center justify-center
                                  group-hover:border-cyan-400/50 transition-colors">
                    <Mail size={16} className="text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider">Email</p>
                    <p className="text-white text-sm group-hover:text-cyan-400 transition-colors">
                      charanshalem@gmail.com
                    </p>
                  </div>
                </a>
                <a href="https://builder.pythonanywhere.com" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20
                                  border border-cyan-400/20 flex items-center justify-center
                                  group-hover:border-cyan-400/50 transition-colors">
                    <Globe size={16} className="text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider">Website</p>
                    <p className="text-white text-sm group-hover:text-cyan-400 transition-colors">
                      builder.pythonanywhere.com
                    </p>
                  </div>
                </a>
              </div>
            </div>
            <div className="glass rounded-2xl border border-white/5 p-6">
              <p className="text-slate-400 text-sm leading-relaxed">
                I'm open to <span className="text-cyan-400 font-medium">internship opportunities</span>,
                freelance projects, and collaborations.
              </p>
            </div>
          </div>

          <div className={`reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
            <form onSubmit={handleSubmit}
                  className="glass rounded-2xl border border-white/5 p-6 space-y-4">
              <div>
                <label className="text-slate-400 text-xs uppercase tracking-wider block mb-2">Name</label>
                <input className="form-input" placeholder="Your name"
                       value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <label className="text-slate-400 text-xs uppercase tracking-wider block mb-2">Email</label>
                <input type="email" className="form-input" placeholder="your@email.com"
                       value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div>
                <label className="text-slate-400 text-xs uppercase tracking-wider block mb-2">Message</label>
                <textarea className="form-input resize-none" rows={4}
                          placeholder="Tell me about your project..."
                          value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
              </div>
              <button type="submit"
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600
                                 text-white font-semibold text-sm hover:opacity-90
                                 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300
                                 flex items-center justify-center gap-2">
                {sent
                  ? <><Sparkles size={16} /> Message Sent!</>
                  : <><Mail size={16} /> Send Message <ArrowRight size={14} /></>
                }
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-orbitron text-cyan-400/60 text-sm tracking-widest">KCS</div>
        <p className="text-slate-600 text-xs text-center">
          &copy; 2026 Korukonda Charan Shalem &middot; Built with passion &amp; code
        </p>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-slate-600 text-xs">Open to work</span>
        </div>
      </div>
    </footer>
  );
}

/* ── Root App ── */
export default function App() {
  return (
    <div className="relative bg-[#020817] min-h-screen">
      <ParticleCanvas />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
