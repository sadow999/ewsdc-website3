"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Cpu,
  Leaf,
  Droplets,
  GraduationCap,
  Users,
  Target,
  Lightbulb,
  Globe,
  ArrowRight,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Menu,
  X,
  Wrench,
  Shield,
  Award,
  TrendingUp,
  Zap,
  Factory,
  Ship,
} from "lucide-react";

/**
 * GitHub Pages project sites are served from a sub-path, so every public/
 * asset reference needs that prefix. next/image does not add it reliably when
 * the optimizer is disabled, so prefix explicitly and in one place.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${BASE_PATH}${path}`;

/* ─── DATA ─── */
const CONTACT_EMAIL = "info@afys-ewb.org";

/** Set in .env.local / CI to enable real form delivery. Empty = mailto fallback. */
const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Sectors", href: "#sectors" },
  { label: "Impact", href: "#impact" },
  { label: "Partners", href: "#partners" },
  { label: "Contact", href: "#contact" },
];

const STATS = [
  { value: 100000, suffix: "+", label: "Workers to Train by 2030" },
  { value: 20000, suffix: "+", label: "Engineers & Technicians" },
  { value: 5000, suffix: "+", label: "SMEs Supported" },
  { value: 10, suffix: "+", label: "Sector Training Academies" },
];

const SERVICES = [
  {
    icon: Factory,
    title: "Industrial Workforce Development",
    description:
      "Comprehensive training programs for technicians, operators, supervisors, and engineers across 15+ industrial sectors including textiles, food processing, chemicals, pharmaceuticals, automotive, electronics, and more.",
    color: "from-ewsdc-teal to-ewsdc-cyan",
    span: "md:col-span-2",
  },
  {
    icon: Cpu,
    title: "Advanced Manufacturing Training",
    description:
      "Cutting-edge programs in CNC technologies, CAD/CAM systems, robotics, industrial automation, PLC/SCADA, industrial IoT, predictive maintenance, smart factories, and digital twins.",
    color: "from-ewsdc-cyan to-blue-500",
    span: "md:col-span-1",
  },
  {
    icon: Zap,
    title: "Renewable Energy Training",
    description:
      "Specialized training in solar photovoltaic systems, solar pumping, battery storage, wind energy, energy management, energy efficiency, and carbon accounting.",
    color: "from-ewsdc-amber to-ewsdc-amber-light",
    span: "md:col-span-1",
  },
  {
    icon: Droplets,
    title: "Water Sector Capacity Building",
    description:
      "Programs in water treatment, wastewater treatment, desalination technologies, smart irrigation, canal rehabilitation, water reuse, and water quality monitoring.",
    color: "from-blue-500 to-ewsdc-teal",
    span: "md:col-span-2",
  },
  {
    icon: Leaf,
    title: "Green Industry Transformation",
    description:
      "Helping factories with energy audits, water audits, carbon footprint assessment, ESG reporting, sustainability planning, and circular economy implementation.",
    color: "from-ewsdc-emerald to-ewsdc-teal",
    span: "md:col-span-1",
  },
  {
    icon: Award,
    title: "Workforce Certification",
    description:
      "Internationally recognized certifications in cooperation with global accreditation bodies for technicians, engineers, managers, operators, and trainers.",
    color: "from-ewsdc-amber to-orange-500",
    span: "md:col-span-1",
  },
  {
    icon: GraduationCap,
    title: "Leadership Development",
    description:
      "Executive programs for plant managers, production managers, industrial leaders, public sector leaders, and future executives to drive organizational excellence.",
    color: "from-purple-500 to-ewsdc-cyan",
    span: "md:col-span-1",
  },
  {
    icon: Globe,
    title: "International Organizations Career Development",
    description:
      "Preparing professionals for careers within United Nations agencies, development banks, international NGOs, and global development projects.",
    color: "from-ewsdc-teal-dark to-ewsdc-teal",
    span: "md:col-span-1",
  },
];

const SECTORS = [
  "Textile & Garments",
  "Food Processing",
  "Pharmaceuticals",
  "Chemicals & Fertilizers",
  "Renewable Energy",
  "Water Technologies",
  "Automotive & EVs",
  "Engineering Industries",
  "Petrochemicals",
  "Electronics Manufacturing",
  "Green Hydrogen",
  "Building Materials",
  "Logistics & Ports",
  "Digital Economy",
  "Agricultural Technology",
];

const IMPACT_ITEMS = [
  { label: "Workers Trained", target: 100000, current: 0, unit: "+", icon: Users },
  { label: "Engineers Upskilled", target: 20000, current: 0, unit: "+", icon: Wrench },
  { label: "SMEs Supported", target: 5000, current: 0, unit: "+", icon: TrendingUp },
  { label: "Training Academies", target: 10, current: 0, unit: "+", icon: Factory },
  { label: "Skills Gap Reduction", target: 30, current: 0, unit: "%", icon: Target },
  { label: "Geographic Regions", target: 6, current: 0, unit: "", icon: MapPin },
];

const PARTNERS = {
  Government: [
    "Ministry of Industry",
    "Ministry of Labor",
    "Ministry of Social Solidarity",
    "Ministry of Higher Education",
    "Ministry of Education & Technical Education",
    "Ministry of Planning",
    "Ministry of CIT",
  ],
  Industrial: [
    "Suez Canal Economic Zone (SCZone)",
    "Industrial Development Authority",
    "Federation of Egyptian Industries",
    "Industrial Zones Developers",
  ],
  Academic: [
    "Egyptian Universities",
    "Technological Universities",
    "Virginia Tech (CIRED)",
    "Research Centers",
  ],
  International: [
    "UNIDO",
    "ILO",
    "FAO",
    "UNESCO",
    "World Bank",
    "African Development Bank",
    "European Union",
    "GIZ",
    "JICA",
    "KOICA",
    "USAID",
    "Korea Institute for Adv. Technology",
  ],
};

const CORE_VALUES = [
  { icon: Shield, title: "Excellence", desc: "Commitment to international quality standards and continuous improvement" },
  { icon: Lightbulb, title: "Innovation", desc: "Promoting creative and technology-based solutions" },
  { icon: Target, title: "Industry Relevance", desc: "Ensuring all programs respond directly to labor market needs" },
  { icon: Leaf, title: "Sustainability", desc: "Supporting environmentally responsible industrial development" },
  { icon: Users, title: "Inclusiveness", desc: "Providing equal opportunities for youth and women" },
  { icon: Globe, title: "Partnership", desc: "Building long-term cooperation with government, academia, and industry" },
];

const PIPELINE_STEPS = [
  { step: "01", title: "Assess", desc: "Skills gap analysis & workforce needs assessment", icon: Target },
  { step: "02", title: "Design", desc: "Industry-aligned curriculum & training program design", icon: Lightbulb },
  { step: "03", title: "Train", desc: "Hands-on, technology-driven skills development", icon: GraduationCap },
  { step: "04", title: "Certify", desc: "International certifications & competency verification", icon: Award },
  { step: "05", title: "Deploy", desc: "Workforce placement & continuous upskilling", icon: TrendingUp },
];

/* ─── COMPONENTS ─── */

function AnimatedCounter({ target, suffix, duration = 2000 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  const format = (n: number) =>
    n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K` : String(n);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold gradient-text-teal">
      {format(count)}
      <span className="text-ewsdc-amber">{suffix}</span>
    </div>
  );
}

function NetworkPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="30" cy="30" r="1.5" fill="#14B8A6" opacity="0.5" />
        </pattern>
        <radialGradient id="glow1" cx="20%" cy="30%" r="40%">
          <stop offset="0%" stopColor="#0D9488" stopOpacity="0.15" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="glow2" cx="80%" cy="70%" r="35%">
          <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.1" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      <rect width="100%" height="100%" fill="url(#glow1)" />
      <rect width="100%" height="100%" fill="url(#glow2)" />
      {/* Network lines */}
      <line x1="15%" y1="20%" x2="35%" y2="40%" stroke="#0D9488" strokeWidth="0.5" opacity="0.3" />
      <line x1="35%" y1="40%" x2="55%" y2="25%" stroke="#0D9488" strokeWidth="0.5" opacity="0.3" />
      <line x1="55%" y1="25%" x2="75%" y2="45%" stroke="#06B6D4" strokeWidth="0.5" opacity="0.3" />
      <line x1="75%" y1="45%" x2="90%" y2="30%" stroke="#06B6D4" strokeWidth="0.5" opacity="0.3" />
      <line x1="25%" y1="60%" x2="45%" y2="75%" stroke="#0D9488" strokeWidth="0.5" opacity="0.2" />
      <line x1="45%" y1="75%" x2="70%" y2="65%" stroke="#0D9488" strokeWidth="0.5" opacity="0.2" />
      <line x1="70%" y1="65%" x2="85%" y2="80%" stroke="#06B6D4" strokeWidth="0.5" opacity="0.2" />
      {/* Nodes */}
      <circle cx="15%" cy="20%" r="3" fill="#0D9488" opacity="0.6" />
      <circle cx="35%" cy="40%" r="4" fill="#14B8A6" opacity="0.5" />
      <circle cx="55%" cy="25%" r="3" fill="#0D9488" opacity="0.6" />
      <circle cx="75%" cy="45%" r="4" fill="#06B6D4" opacity="0.5" />
      <circle cx="90%" cy="30%" r="3" fill="#06B6D4" opacity="0.6" />
      <circle cx="25%" cy="60%" r="3" fill="#0D9488" opacity="0.4" />
      <circle cx="45%" cy="75%" r="4" fill="#14B8A6" opacity="0.4" />
      <circle cx="70%" cy="65%" r="3" fill="#0D9488" opacity="0.4" />
      <circle cx="85%" cy="80%" r="4" fill="#06B6D4" opacity="0.4" />
    </svg>
  );
}

function GearDecoration({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      className={`animate-rotate-slow opacity-10 ${className}`}
      style={style}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M50 10 L54 20 L60 15 L58 26 L68 24 L62 33 L72 35 L63 40 L70 48 L60 47 L62 57 L53 52 L50 62 L47 52 L38 57 L40 47 L30 48 L37 40 L28 35 L38 33 L32 24 L42 26 L40 15 L46 20 Z" fill="#0D9488" />
      <circle cx="50" cy="37" r="12" fill="#0C1222" stroke="#0D9488" strokeWidth="1" />
    </svg>
  );
}

/* ─── MAIN PAGE ─── */
export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Section reveal on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    document.querySelectorAll(".section-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);

      // No server exists on a static host, so the form posts to a third-party
      // endpoint. Set NEXT_PUBLIC_FORM_ENDPOINT to a Formspree (or equivalent)
      // URL. Without it, hand the message to the visitor's mail client so the
      // form is never a dead end.
      if (!FORM_ENDPOINT) {
        const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`;
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
          formData.subject
        )}&body=${encodeURIComponent(body)}`;
        setSubmitting(false);
        return;
      }

      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error(`Form endpoint returned ${res.status}`);
        toast({
          title: "Message sent",
          description: "We reply to enquiries within two business days.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } catch {
        toast({
          variant: "destructive",
          title: "Message not sent",
          description: `The form could not reach our server. Email ${CONTACT_EMAIL} instead.`,
        });
      } finally {
        setSubmitting(false);
      }
    },
    [formData, toast]
  );

  return (
    <div className="min-h-screen bg-white">
      {/* ═══════ NAVBAR ═══════ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-ewsdc-navy/95 backdrop-blur-lg shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-ewsdc-teal to-ewsdc-cyan flex items-center justify-center overflow-hidden">
                <Cpu className="w-5 h-5 text-white relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-ewsdc-amber/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="hidden sm:block">
                <span className="text-white font-bold text-sm tracking-wider">EWSDC</span>
                <span className="block text-[10px] text-ewsdc-teal-light tracking-widest uppercase">Egypt Workforce Development</span>
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-300 hover:text-ewsdc-teal-light px-3 py-2 rounded-lg hover:bg-white/5 transition-all duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <a href="#contact">
                <Button className="hidden sm:flex bg-gradient-to-r from-ewsdc-teal to-ewsdc-cyan hover:from-ewsdc-teal-dark hover:to-ewsdc-teal text-white border-0 shadow-lg shadow-ewsdc-teal/25">
                  Get in Touch
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <button
                className="lg:hidden text-white p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-ewsdc-navy/98 backdrop-blur-lg border-t border-white/10">
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-gray-300 hover:text-ewsdc-teal-light px-4 py-3 rounded-lg hover:bg-white/5 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full mt-3 bg-gradient-to-r from-ewsdc-teal to-ewsdc-cyan text-white border-0">
                  Get in Touch
                </Button>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-screen flex items-center bg-ewsdc-navy overflow-hidden">
        <NetworkPattern />
        <GearDecoration className="absolute -right-20 -top-20 w-80 h-80" />
        <GearDecoration className="absolute -left-16 bottom-20 w-64 h-64" style={{ animationDirection: "reverse", animationDuration: "30s" } as React.CSSProperties} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass">
                <span className="w-2 h-2 rounded-full bg-ewsdc-teal animate-pulse" />
                <span className="text-ewsdc-teal-light text-sm font-medium tracking-wide">Suez Canal Authority | Egypt Vision 2030</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1]">
                Building Egypt&apos;s{" "}
                <span className="gradient-text-teal">Workforce</span>
                <br />
                for{" "}
                <span className="gradient-text-amber">Industry 4.0</span>
                <br />
                <span className="text-gray-400 text-3xl sm:text-4xl lg:text-5xl">and Beyond</span>
              </h1>

              <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
                EWSDC bridges the gap between education, research, and labor market requirements
                through internationally aligned, industry-driven, and future-oriented training solutions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#services">
                  <Button size="lg" className="bg-gradient-to-r from-ewsdc-teal to-ewsdc-cyan hover:from-ewsdc-teal-dark hover:to-ewsdc-teal text-white border-0 shadow-xl shadow-ewsdc-teal/30 text-base px-8">
                    Explore Programs
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
                <a href="#about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 hover:text-white text-base px-8"
                  >
                    Learn More
                  </Button>
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
                <Image
                  src={asset("/images/hero-bg.png")}
                  alt="Advanced industrial training center"
                  width={600}
                  height={400}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ewsdc-navy/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-ewsdc-teal/20 flex items-center justify-center">
                        <Ship className="w-5 h-5 text-ewsdc-teal-light" />
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold">Suez Canal Economic Zone</p>
                        <p className="text-gray-400 text-xs">Workforce Training Center at West Qantara</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 glass rounded-xl p-4 animate-float">
                <p className="text-ewsdc-teal-light text-2xl font-bold">15+</p>
                <p className="text-gray-400 text-xs">Industrial Sectors</p>
              </div>
              <div className="absolute -bottom-4 -left-4 glass rounded-xl p-4 animate-float-delayed">
                <p className="text-ewsdc-amber text-2xl font-bold">41%</p>
                <p className="text-gray-400 text-xs">Expected ROI</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-gray-500 text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 text-ewsdc-teal animate-bounce" />
        </div>
      </section>

      {/* ═══════ STATS STRIP ═══════ */}
      <section className="relative -mt-16 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 shadow-xl shadow-black/5 border border-gray-100 text-center group hover:shadow-2xl hover:shadow-ewsdc-teal/10 transition-all duration-300 hover:-translate-y-1"
            >
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <p className="text-gray-500 text-sm mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ ABOUT ═══════ */}
      <section id="about" className="py-24 md:py-32 bg-ewsdc-surface relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-ewsdc-teal/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-ewsdc-amber/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-reveal grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Side */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={asset("/images/about-img.png")}
                  alt="Suez Canal Economic Zone"
                  width={600}
                  height={600}
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
              </div>
              {/* Experience badge */}
              <div className="absolute -bottom-6 -right-6 md:right-8 bg-gradient-to-br from-ewsdc-teal to-ewsdc-teal-dark rounded-2xl p-6 shadow-xl shadow-ewsdc-teal/30 text-white">
                <p className="text-4xl font-bold">10+</p>
                <p className="text-sm text-teal-200">Years of Excellence</p>
              </div>
            </div>

            {/* Text Side */}
            <div className="space-y-6">
              <div>
                <span className="text-ewsdc-teal font-semibold text-sm tracking-widest uppercase">About EWSDC</span>
                <h2 className="text-3xl md:text-4xl font-bold text-ewsdc-navy mt-2 leading-tight">
                  Egypt&apos;s Leading Platform for{" "}
                  <span className="gradient-text-teal">Workforce Development</span>
                </h2>
              </div>

              <p className="text-gray-600 leading-relaxed">
                The Egypt Workforce & Skills Development Corporation (EWSDC) is a national workforce
                development and industrial skills company established to bridge the gap between education,
                research, and labor market requirements in Egypt and the wider Middle East and Africa region.
              </p>
              <p className="text-gray-600 leading-relaxed">
                EWSDC aims to become Egypt&apos;s leading platform for workforce development, industrial
                upskilling, technical training, and employability enhancement by delivering internationally
                aligned, industry-driven, and future-oriented training solutions.
              </p>

              {/* Vision & Mission */}
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-ewsdc-teal/10 flex items-center justify-center mb-3">
                    <Lightbulb className="w-5 h-5 text-ewsdc-teal" />
                  </div>
                  <h3 className="font-bold text-ewsdc-navy mb-2">Our Vision</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    To become the leading regional center of excellence for workforce development, technical
                    skills enhancement, and human capital transformation in Africa and the Middle East.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-ewsdc-amber/10 flex items-center justify-center mb-3">
                    <Target className="w-5 h-5 text-ewsdc-amber" />
                  </div>
                  <h3 className="font-bold text-ewsdc-navy mb-2">Our Mission</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Develop a highly skilled, globally competitive workforce through industry-driven training,
                    applied learning, technology transfer, and strategic partnerships.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="section-reveal mt-20">
            <h3 className="text-2xl font-bold text-ewsdc-navy text-center mb-10">Core Values</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {CORE_VALUES.map((v, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-4 text-center border border-gray-100 hover:border-ewsdc-teal/30 hover:shadow-lg hover:shadow-ewsdc-teal/5 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-ewsdc-teal/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-ewsdc-teal/20 transition-colors">
                    <v.icon className="w-6 h-6 text-ewsdc-teal" />
                  </div>
                  <h4 className="font-semibold text-ewsdc-navy text-sm mb-1">{v.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SKILLS PIPELINE ═══════ */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-reveal text-center mb-14">
            <span className="text-ewsdc-amber font-semibold text-sm tracking-widest uppercase">Our Approach</span>
            <h2 className="text-3xl md:text-4xl font-bold text-ewsdc-navy mt-2">
              The Skills Development Pipeline
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              From assessment to deployment, our systematic approach ensures every worker is industry-ready from day one.
            </p>
          </div>

          <div className="section-reveal grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {PIPELINE_STEPS.map((step, i) => (
              <div key={i} className="relative text-center group">
                <div className="relative bg-gradient-to-b from-ewsdc-navy to-ewsdc-navy-light rounded-2xl p-6 pt-8 text-white overflow-hidden group-hover:shadow-xl group-hover:shadow-ewsdc-teal/20 transition-all duration-300 group-hover:-translate-y-2">
                  <div className="absolute top-3 right-3 text-6xl font-bold text-white/5">{step.step}</div>
                  <div className="w-14 h-14 rounded-xl bg-ewsdc-teal/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-ewsdc-teal/30 transition-colors">
                    <step.icon className="w-7 h-7 text-ewsdc-teal-light" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
                {/* Connector arrow (not on last) */}
                {i < PIPELINE_STEPS.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 z-10 text-ewsdc-teal/30">
                    <ChevronDown className="w-6 h-6 rotate-[-90deg]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SERVICES ═══════ */}
      <section id="services" className="py-24 md:py-32 bg-ewsdc-navy relative overflow-hidden">
        <GearDecoration className="absolute right-10 top-20 w-48 h-48" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ewsdc-teal/30 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-reveal text-center mb-16">
            <span className="text-ewsdc-teal-light font-semibold text-sm tracking-widest uppercase">What We Do</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
              Training & Development Services
            </h2>
            <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
              Comprehensive, industry-driven programs designed to build Egypt&apos;s future-ready workforce across critical sectors.
            </p>
          </div>

          <div className="section-reveal grid grid-cols-1 md:grid-cols-3 gap-5">
            {SERVICES.map((service, i) => (
              <div
                key={i}
                className={`group relative rounded-2xl p-6 bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-ewsdc-teal/10 overflow-hidden ${service.span}`}
              >
                <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${service.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-lg`}
                  style={{ boxShadow: `0 8px 25px -5px rgba(13,148,136,0.3)` }}
                >
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>

          {/* Consulting Services Highlight */}
          <div className="section-reveal mt-16 grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl p-8 bg-gradient-to-br from-ewsdc-teal/10 to-ewsdc-cyan/5 border border-ewsdc-teal/20">
              <h3 className="text-xl font-bold text-white mb-4">Consulting Services</h3>
              <div className="grid grid-cols-2 gap-3">
                {["Industrial Troubleshooting", "Productivity Improvement", "Technology Transfer", "Innovation Management", "Feasibility Studies", "Workforce Planning", "Skills Gap Analysis", "Digitalization Strategies"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-ewsdc-teal flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-8 bg-gradient-to-br from-ewsdc-amber/10 to-orange-500/5 border border-ewsdc-amber/20">
              <h3 className="text-xl font-bold text-white mb-4">Research & Industry Integration</h3>
              <div className="grid grid-cols-2 gap-3">
                {["Applied Research Projects", "Joint Innovation Programs", "Industrial Research Centers", "Technology Commercialization", "Student Internships", "Industrial PhD Programs", "University Partnerships", "Innovation Labs"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-ewsdc-amber flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ TRAINING CENTER SPOTLIGHT ═══════ */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-reveal grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={asset("/images/training-img.png")}
                  alt="Professional workforce training"
                  width={600}
                  height={600}
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
            <div className="space-y-6">
              <span className="text-ewsdc-amber font-semibold text-sm tracking-widest uppercase">Flagship Project</span>
              <h2 className="text-3xl md:text-4xl font-bold text-ewsdc-navy leading-tight">
                Suez Canal Zone{" "}
                <span className="gradient-text-teal">Workforce Training Center</span>
              </h2>
              <p className="text-gray-600 leading-relaxed">
                A collaboration between the Arab Foundation of Young Scientists (AFYS), Virginia Tech&apos;s
                Center for International Research in Education and Development (CIRED), and the Suez Canal
                Economic Zone (SCZone) to establish a comprehensive workforce training center at West Qantara.
              </p>
              <div className="space-y-3">
                {[
                  "Two-week certification-style training workshops",
                  "Modular curriculum aligned with Egypt's National Qualification Framework",
                  "Hands-on labs, simulation areas, and digital integration",
                  "Leadership Academy for managers and supervisors",
                  "Cultural support for international workers",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-ewsdc-teal/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-ewsdc-teal" />
                    </div>
                    <p className="text-gray-600 text-sm">{item}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <Badge className="bg-ewsdc-teal/10 text-ewsdc-teal border-ewsdc-teal/20 hover:bg-ewsdc-teal/15">Textiles</Badge>
                <Badge className="bg-ewsdc-teal/10 text-ewsdc-teal border-ewsdc-teal/20 hover:bg-ewsdc-teal/15">Automotive</Badge>
                <Badge className="bg-ewsdc-teal/10 text-ewsdc-teal border-ewsdc-teal/20 hover:bg-ewsdc-teal/15">Petrochemicals</Badge>
                <Badge className="bg-ewsdc-teal/10 text-ewsdc-teal border-ewsdc-teal/20 hover:bg-ewsdc-teal/15">Green Fuel</Badge>
                <Badge className="bg-ewsdc-teal/10 text-ewsdc-teal border-ewsdc-teal/20 hover:bg-ewsdc-teal/15">Solar Energy</Badge>
                <Badge className="bg-ewsdc-teal/10 text-ewsdc-teal border-ewsdc-teal/20 hover:bg-ewsdc-teal/15">Pharma</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SECTORS ═══════ */}
      <section id="sectors" className="py-24 md:py-32 bg-ewsdc-surface relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-reveal text-center mb-14">
            <span className="text-ewsdc-teal font-semibold text-sm tracking-widest uppercase">Industry Focus</span>
            <h2 className="text-3xl md:text-4xl font-bold text-ewsdc-navy mt-2">
              Priority Industrial Sectors
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              Aligned with Egypt&apos;s industrial strategy and Vision 2030, we focus on high-impact sectors driving national economic transformation.
            </p>
          </div>

          {/* Creative hex grid for sectors */}
          <div className="section-reveal flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
            {SECTORS.map((sector, i) => {
              const colors = [
                "from-ewsdc-teal/10 to-ewsdc-teal/5 border-ewsdc-teal/20 text-ewsdc-teal-dark",
                "from-ewsdc-cyan/10 to-ewsdc-cyan/5 border-ewsdc-cyan/20 text-cyan-700",
                "from-ewsdc-amber/10 to-ewsdc-amber/5 border-ewsdc-amber/20 text-amber-700",
                "from-ewsdc-emerald/10 to-ewsdc-emerald/5 border-ewsdc-emerald/20 text-emerald-700",
                "from-purple-50 to-purple-100/50 border-purple-200 text-purple-700",
              ];
              const colorClass = colors[i % colors.length];
              return (
                <div
                  key={i}
                  className={`group relative bg-gradient-to-br ${colorClass} border rounded-xl px-5 py-3.5 cursor-default hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]`}
                >
                  <span className="text-sm font-medium">{sector}</span>
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${colorClass} opacity-0 group-hover:opacity-100 transition-opacity`} />
                </div>
              );
            })}
          </div>

          {/* Renewable Energy Feature */}
          <div className="section-reveal mt-20 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <span className="text-ewsdc-emerald font-semibold text-sm tracking-widest uppercase">Green Transition</span>
              <h3 className="text-2xl md:text-3xl font-bold text-ewsdc-navy leading-tight">
                Powering Egypt&apos;s Green Industrial Future
              </h3>
              <p className="text-gray-600 leading-relaxed">
                EWSDC is at the forefront of supporting Egypt&apos;s transition toward sustainable industries.
                Our specialized programs in renewable energy, green hydrogen, and carbon accounting prepare
                the workforce needed for a net-zero future.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Solar PV Systems", value: "Advanced" },
                  { label: "Wind Energy", value: "Comprehensive" },
                  { label: "Green Hydrogen", value: "Emerging" },
                  { label: "Carbon Accounting", value: "Certified" },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-lg p-4 border border-gray-100">
                    <p className="text-ewsdc-navy font-semibold text-sm">{item.label}</p>
                    <p className="text-ewsdc-emerald text-xs mt-1">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={asset("/images/renewable-img.png")}
                  alt="Renewable energy training"
                  width={600}
                  height={600}
                  className="w-full h-[350px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ IMPACT ═══════ */}
      <section id="impact" className="py-24 md:py-32 bg-ewsdc-navy relative overflow-hidden">
        <div className="absolute inset-0 network-bg opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-reveal text-center mb-16">
            <span className="text-ewsdc-amber font-semibold text-sm tracking-widest uppercase">Our Target</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
              Expected Impact by <span className="gradient-text-amber">2030</span>
            </h2>
            <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
              Ambitious yet achievable targets that will transform Egypt&apos;s industrial landscape and workforce capabilities.
            </p>
          </div>

          <div className="section-reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {IMPACT_ITEMS.map((item, i) => (
              <div
                key={i}
                className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ewsdc-teal to-ewsdc-cyan flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <AnimatedCounter target={item.target} suffix={item.unit} />
                  </div>
                </div>
                <p className="text-gray-400 text-sm">{item.label}</p>
                <div className="mt-3 w-full bg-white/10 rounded-full h-1.5">
                  <div
                    className="bg-gradient-to-r from-ewsdc-teal to-ewsdc-amber h-1.5 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(90, 30 + i * 12)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Geographic Coverage */}
          <div className="section-reveal mt-16">
            <h3 className="text-xl font-bold text-white text-center mb-8">Geographic Coverage</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {["Greater Cairo", "SCZone", "Alexandria", "Delta Region", "Upper Egypt", "New Industrial Cities"].map((region, i) => (
                <div key={i} className="flex items-center gap-2 px-5 py-2.5 rounded-full glass text-white text-sm">
                  <MapPin className="w-4 h-4 text-ewsdc-teal-light" />
                  {region}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ PARTNERS ═══════ */}
      <section id="partners" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-reveal text-center mb-16">
            <span className="text-ewsdc-teal font-semibold text-sm tracking-widest uppercase">Our Ecosystem</span>
            <h2 className="text-3xl md:text-4xl font-bold text-ewsdc-navy mt-2">
              Strategic Partners
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              Building a comprehensive ecosystem through partnerships with government, industry, academia, and international organizations.
            </p>
          </div>

          <div className="section-reveal space-y-10">
            {Object.entries(PARTNERS).map(([category, partners]) => {
              const categoryStyles: Record<string, string> = {
                Government: "border-ewsdc-teal/20 bg-ewsdc-teal/5",
                Industrial: "border-ewsdc-amber/20 bg-ewsdc-amber/5",
                Academic: "border-purple-200 bg-purple-50",
                International: "border-ewsdc-cyan/20 bg-ewsdc-cyan/5",
              };
              const badgeStyles: Record<string, string> = {
                Government: "bg-ewsdc-teal/10 text-ewsdc-teal-dark",
                Industrial: "bg-ewsdc-amber/10 text-amber-700",
                Academic: "bg-purple-100 text-purple-700",
                International: "bg-ewsdc-cyan/10 text-cyan-700",
              };
              return (
                <div key={category} className={`rounded-2xl border p-6 md:p-8 ${categoryStyles[category] || ""}`}>
                  <Badge className={`${badgeStyles[category] || ""} mb-5`} variant="outline">
                    {category}
                  </Badge>
                  <div className="flex flex-wrap gap-2">
                    {partners.map((partner, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 rounded-lg bg-white border border-gray-100 text-gray-700 text-sm hover:shadow-md transition-all duration-200 cursor-default"
                      >
                        {partner}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ CTA BANNER ═══════ */}
      <section className="py-20 bg-gradient-to-r from-ewsdc-teal-dark via-ewsdc-teal to-ewsdc-cyan relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Empowering Skills ... Transforming Industry ... Building Egypt&apos;s Future
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Join us in building the workforce that will drive Egypt&apos;s industrial transformation and economic growth.
          </p>
          <a href="#contact">
            <Button size="lg" className="bg-white text-ewsdc-teal-dark hover:bg-gray-100 border-0 shadow-xl text-base px-10 font-semibold">
              Partner With Us
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </a>
        </div>
      </section>

      {/* ═══════ CONTACT ═══════ */}
      <section id="contact" className="py-24 md:py-32 bg-ewsdc-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-reveal grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <span className="text-ewsdc-teal font-semibold text-sm tracking-widest uppercase">Get in Touch</span>
                <h2 className="text-3xl md:text-4xl font-bold text-ewsdc-navy mt-2">Let&apos;s Build Together</h2>
                <p className="text-gray-500 mt-3 leading-relaxed">
                  Whether you are an industry partner seeking skilled workforce, a professional looking for
                  career development, or an organization interested in collaboration, we would love to hear from you.
                </p>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-ewsdc-teal/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-ewsdc-teal" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-ewsdc-navy">Headquarters</h4>
                    <p className="text-gray-500 text-sm mt-1">
                      58C, Bait ElWatan, Crazy Water<br />
                      Sheikh Zayed, Egypt
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-ewsdc-teal/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-ewsdc-teal" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-ewsdc-navy">Email</h4>
                    <a href="mailto:info@afys-ewb.org" className="text-ewsdc-teal hover:text-ewsdc-teal-dark text-sm transition-colors">
                      info@afys-ewb.org
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-ewsdc-teal/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-ewsdc-teal" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-ewsdc-navy">Phone</h4>
                    <p className="text-gray-500 text-sm">(+2) 01000020489</p>
                  </div>
                </div>
              </div>

              {/* AFYS Parent Organization */}
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <p className="text-xs text-gray-400 mb-1">Parent Organization</p>
                <p className="font-semibold text-ewsdc-navy">Arab Foundation of Young Scientists (AFYS)</p>
                <p className="text-gray-500 text-sm mt-1">
                  Established 2014 | Registration No. 9483<br />
                  A civil society organization with public benefit status
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-xl shadow-black/5 border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-ewsdc-navy">Full Name</label>
                    <Input
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="border-gray-200 focus:border-ewsdc-teal focus:ring-ewsdc-teal/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-ewsdc-navy">Email</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="border-gray-200 focus:border-ewsdc-teal focus:ring-ewsdc-teal/20"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-ewsdc-navy">Subject</label>
                  <Input
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="border-gray-200 focus:border-ewsdc-teal focus:ring-ewsdc-teal/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-ewsdc-navy">Message</label>
                  <Textarea
                    placeholder="Tell us about your needs..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="border-gray-200 focus:border-ewsdc-teal focus:ring-ewsdc-teal/20"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-ewsdc-teal to-ewsdc-cyan hover:from-ewsdc-teal-dark hover:to-ewsdc-teal text-white border-0 shadow-lg shadow-ewsdc-teal/25 text-base py-6"
                >
                  {submitting ? "Sending..." : "Send Message"}
                  {!submitting && <ArrowRight className="w-5 h-5 ml-2" />}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="bg-ewsdc-navy text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            {/* Brand */}
            <div className="space-y-4 lg:col-span-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-ewsdc-teal to-ewsdc-cyan flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="font-bold text-lg">EWSDC</span>
                  <span className="block text-[10px] text-ewsdc-teal-light tracking-widest uppercase">Egypt Workforce Development</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Building Egypt&apos;s Workforce for Industry 4.0 and Beyond. Empowering Skills, Transforming Industry, Building Egypt&apos;s Future.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4 text-ewsdc-teal-light">Quick Links</h4>
              <ul className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-gray-400 hover:text-ewsdc-teal-light text-sm transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold mb-4 text-ewsdc-teal-light">Key Services</h4>
              <ul className="space-y-2">
                {[
                  "Industrial Workforce Development",
                  "Advanced Manufacturing",
                  "Renewable Energy Training",
                  "Green Industry Transformation",
                  "Workforce Certification",
                  "Leadership Development",
                ].map((s, i) => (
                  <li key={i}>
                    <a href="#services" className="text-gray-400 hover:text-ewsdc-teal-light text-sm transition-colors">
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4 text-ewsdc-teal-light">Contact</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 text-ewsdc-teal flex-shrink-0" />
                  <span>58C, Bait ElWatan, Crazy Water, Sheikh Zayed, Egypt</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Mail className="w-4 h-4 text-ewsdc-teal flex-shrink-0" />
                  <a href="mailto:info@afys-ewb.org" className="hover:text-ewsdc-teal-light transition-colors">
                    info@afys-ewb.org
                  </a>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Phone className="w-4 h-4 text-ewsdc-teal flex-shrink-0" />
                  <span>(+2) 01000020489</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <ExternalLink className="w-4 h-4 text-ewsdc-teal flex-shrink-0" />
                  <span>Suez Canal Economic Zone</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Egypt Workforce & Skills Development Corporation (EWSDC). All rights reserved.
            </p>
            <p className="text-gray-600 text-xs">
              A subsidiary of the Arab Foundation of Young Scientists (AFYS) | Est. 2014
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
