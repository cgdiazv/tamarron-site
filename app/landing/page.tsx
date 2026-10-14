"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Menu,
  X,
  Star,
  Phone,
  ShieldCheck,
  CalendarCheck,
} from "lucide-react";

interface FormState {
  name: string;
  phone: string;
  email: string;
  zip: string;
  service: string;
  details: string;
}

const SERVICES_DATA = [
  {
    id: "roof-extensions",
    title: "Roof Extensions",
    description: "Add comfortable covered space that blends with your home.",
    image: "/landing/service-roof.png",
  },
  {
    id: "pergolas-gazebos",
    title: "Pergolas & Gazebos",
    description: "Add shade, style, and structure to your backyard.",
    image: "/landing/service-pergolas.png",
  },
  {
    id: "concrete-patios",
    title: "Concrete Patios & Driveways",
    description: "Durable concrete solutions for patios, driveways, and walkways.",
    image: "/landing/service-concrete.png",
  },
  {
    id: "stamped-concrete",
    title: "Stamped Concrete",
    description: "Get the look of stone, brick, or wood with durable concrete.",
    image: "/landing/service-stamped.png",
  },
  {
    id: "spray-deck",
    title: "Spray Deck",
    description: "Refresh concrete with a textured, slip-resistant finish.",
    image: "/landing/service-spraydeck.png",
  },
  {
    id: "pavers",
    title: "Pavers",
    description: "Upgrade patios and walkways with custom patterns and finishes.",
    image: "/landing/service-pavers.png",
  },
  {
    id: "outdoor-kitchens",
    title: "Outdoor Kitchens",
    description: "Create a functional space for cooking and entertaining outdoors.",
    image: "/landing/service-kitchens.png",
  },
];

const BENEFITS_DATA = [
  {
    title: "Custom Design",
    description: "Built around your home, needs, and vision.",
    icon: "/landing/icon-custom-design.svg",
  },
  {
    title: "Permit Support",
    description: "We help with HOA and City permit requirements.",
    icon: "/landing/icon-permit-support.svg",
  },
  {
    title: "Professional Execution",
    description: "Quality workmanship from planning to installation.",
    icon: "/landing/icon-professional-execution.svg",
  },
  {
    title: "Financing Available",
    description: "Flexible financing options for qualified customers.",
    icon: "/landing/icon-financing.svg",
  },
  {
    title: "Built Around You",
    description: "A personalized solution for your home.",
    icon: "/landing/icon-built-around-you.svg",
  },
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    zip: "",
    service: "Roof Extensions",
    details: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const carouselRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 380;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!form.name || !form.phone || !form.email) {
      setErrorMessage("Please complete all required fields (Name, Phone, Email).");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/landing-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Unable to send request. Please try again.");
      }

      setSubmitted(true);
      setForm({
        name: "",
        phone: "",
        email: "",
        zip: "",
        service: "Roof Extensions",
        details: "",
      });
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to submit estimate request.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#00a4dd] selection:text-white">
      {/* ========================================================
          1. DEDICATED LANDING HEADER (FIGMA SPEC)
          ======================================================== */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 md:h-24 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/landing" className="flex items-center gap-2">
            <Image
              src="/landing/tamarron-logo.png"
              alt="Tamarron Services"
              width={220}
              height={70}
              priority
              className="h-10 md:h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav Pill (Cyan #00a4dd as in Figma) */}
          <nav className="hidden md:flex items-center bg-[#00a4dd] text-white rounded-full px-6 py-2.5 shadow-md">
            <a
              href="#services"
              className="px-4 py-1 text-sm font-semibold tracking-wide hover:opacity-90 transition-opacity"
            >
              Services
            </a>
            <span className="w-px h-4 bg-white/40" />
            <a
              href="#benefits"
              className="px-4 py-1 text-sm font-semibold tracking-wide hover:opacity-90 transition-opacity"
            >
              Benefits
            </a>
            <span className="w-px h-4 bg-white/40" />
            <a
              href="#success-stories"
              className="px-4 py-1 text-sm font-semibold tracking-wide hover:opacity-90 transition-opacity"
            >
              Success Stories
            </a>
            <span className="w-px h-4 bg-white/40" />
            <a
              href="#financing"
              className="px-4 py-1 text-sm font-semibold tracking-wide hover:opacity-90 transition-opacity"
            >
              Financing
            </a>
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-[#00a4dd] focus:outline-hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-6 py-5 space-y-3 animate-in fade-in slide-in-from-top-2">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-semibold text-slate-800 hover:text-[#00a4dd] py-2"
            >
              Services
            </a>
            <a
              href="#benefits"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-semibold text-slate-800 hover:text-[#00a4dd] py-2"
            >
              Benefits
            </a>
            <a
              href="#success-stories"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-semibold text-slate-800 hover:text-[#00a4dd] py-2"
            >
              Success Stories
            </a>
            <a
              href="#financing"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-semibold text-slate-800 hover:text-[#00a4dd] py-2"
            >
              Financing
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                scrollToForm();
              }}
              className="w-full mt-2 flex items-center justify-center gap-2 bg-[#00a4dd] text-white font-bold py-3 rounded-xl shadow-md"
            >
              <span>Request Free Estimate</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </header>

      {/* ========================================================
          2. HERO SECTION + LEAD FORM (FIGMA SPEC)
          ======================================================== */}
      <section className="relative isolate min-h-[640px] lg:min-h-[720px] flex items-center overflow-hidden bg-[#01295f]">
        {/* Background Image with Dark Contrast Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/landing/hero-bg.jpg"
            alt="Custom backyard patio and pergola"
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover object-center"
          />
          {/* Left-weighted contrast gradient for crisp headline legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-black/10 z-10" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Headline (Figma: Narrower text block) */}
            <div className="lg:col-span-5 text-white space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.12] text-white max-w-sm sm:max-w-md drop-shadow-md">
                Turn Your Backyard <br />
                Into More of <br />
                <span className="text-[#00a4dd] drop-shadow-sm">
                  Your Home
                </span>
              </h1>
            </div>

            {/* Right Form Card (Figma: Wider 2-column form card) */}
            <div ref={formRef} className="lg:col-span-7 w-full max-w-3xl ml-auto">
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-9 shadow-2xl border border-white/80">
                <div className="mb-6 text-center sm:text-left">
                  <h2 className="text-2xl sm:text-[28px] font-bold text-[#01295f] tracking-tight">
                    Tell Us About Your Project
                  </h2>
                  <p className="text-sm font-medium text-slate-500 mt-1">
                    Ready to upgrade your backyard?
                  </p>
                </div>

                {submitted ? (
                  <div className="text-center py-8 space-y-4 animate-in fade-in zoom-in-95">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 size={36} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">
                      Request Received!
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto">
                      Thank you! One of our outdoor project specialists will contact you shortly to
                      discuss your vision and schedule your free estimate.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-4 text-xs font-semibold text-[#00a4dd] hover:underline"
                    >
                      Submit another request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {errorMessage && (
                      <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                        <AlertCircle size={16} className="shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Symmetrical 2-Column Form Layout matching Figma */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Left Column: Name, Email, Service */}
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="lead-name"
                            className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1"
                          >
                            Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="lead-name"
                            type="text"
                            name="name"
                            required
                            value={form.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#00a4dd] focus:border-transparent transition"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="lead-email"
                            className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1"
                          >
                            Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="lead-email"
                            type="email"
                            name="email"
                            required
                            value={form.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#00a4dd] focus:border-transparent transition"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="lead-service"
                            className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1"
                          >
                            Service Interested In
                          </label>
                          <select
                            id="lead-service"
                            name="service"
                            value={form.service}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00a4dd] focus:border-transparent transition"
                          >
                            <option value="Roof Extensions">Roof Extensions</option>
                            <option value="Pergolas & Gazebos">Pergolas &amp; Gazebos</option>
                            <option value="Concrete Patios & Driveways">Concrete Patios &amp; Driveways</option>
                            <option value="Stamped Concrete">Stamped Concrete</option>
                            <option value="Spray Deck">Spray Deck</option>
                            <option value="Pavers">Pavers</option>
                            <option value="Outdoor Kitchens">Outdoor Kitchens</option>
                            <option value="Full Backyard Transformation">Full Backyard Transformation</option>
                          </select>
                        </div>
                      </div>

                      {/* Right Column: Phone, ZIP, Tell Us About Your Project */}
                      <div className="space-y-4 flex flex-col justify-between">
                        <div>
                          <label
                            htmlFor="lead-phone"
                            className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1"
                          >
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="lead-phone"
                            type="tel"
                            name="phone"
                            required
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="(832) 000-0000"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#00a4dd] focus:border-transparent transition"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="lead-zip"
                            className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1"
                          >
                            ZIP Code
                          </label>
                          <input
                            id="lead-zip"
                            type="text"
                            name="zip"
                            value={form.zip}
                            onChange={handleChange}
                            placeholder="77494"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#00a4dd] focus:border-transparent transition"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="lead-details"
                            className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1"
                          >
                            Tell Us About Your Project
                          </label>
                          <input
                            id="lead-details"
                            type="text"
                            name="details"
                            value={form.details}
                            onChange={handleChange}
                            placeholder="Briefly describe your project..."
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#00a4dd] focus:border-transparent transition"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Submit Button aligned right on desktop matching Figma */}
                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full sm:w-auto min-w-[260px] flex items-center justify-center gap-3 bg-[#01295f] hover:bg-[#001e47] text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-60 cursor-pointer"
                      >
                        {submitting ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            <span>Sending Request...</span>
                          </>
                        ) : (
                          <>
                            <ArrowRight size={18} className="text-[#00a4dd]" />
                            <span>Request My Free Estimate</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. VALUE PROPOSITION SUB-BANNER (FIGMA SPEC)
          ======================================================== */}
      <section className="py-14 sm:py-20 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-medium text-slate-700 leading-relaxed tracking-tight">
            Custom outdoor spaces designed for your home and lifestyle.
            <span className="block text-[#01295f] font-bold mt-1">
              From roof extensions and pergolas to concrete patios.
            </span>
          </p>
        </div>
      </section>

      {/* ========================================================
          4. SERVICES SECTION (CAROUSEL & CARDS) (FIGMA SPEC)
          ======================================================== */}
      <section id="services" className="py-16 md:py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main flex container aligning the navy block and the carousel vertically */}
          <div className="relative flex flex-col lg:flex-row items-center">
            {/* Left Navy Block (Taller, Square Corners) */}
            <div className="w-full lg:w-[380px] xl:w-[420px] shrink-0 bg-[#01295f] text-white p-8 sm:p-12 lg:p-14 rounded-none shadow-xl flex flex-col justify-center min-h-[280px] lg:min-h-[520px] relative z-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                Services
              </h2>
              <p className="text-lg text-slate-300 mt-4 leading-snug">
                Build the Outdoor Space Your Home Is Missing
              </p>
            </div>

            {/* Right Carousel Container overlapping the right edge of the blue box */}
            <div className="w-full lg:flex-1 min-w-0 relative lg:-ml-12 xl:-ml-16 z-20 mt-6 lg:mt-0">
              <div
                ref={carouselRef}
                className="flex gap-6 overflow-x-auto py-4 pl-4 lg:pl-0 pr-4 scroll-smooth snap-x snap-mandatory focus:outline-hidden no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                tabIndex={0}
                aria-label="Services carousel"
              >
                {SERVICES_DATA.map((srv) => (
                  <div
                    key={srv.id}
                    className="snap-start shrink-0 w-[280px] sm:w-[320px] md:w-[340px] h-[360px] sm:h-[390px] lg:h-[410px] relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                  >
                    {/* Full-bleed photo with gradient overlay */}
                    <Image
                      src={srv.image}
                      alt={srv.title}
                      fill
                      sizes="(max-width: 768px) 300px, 340px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />

                    {/* Title and Description inside the image */}
                    <div className="absolute bottom-6 left-6 right-6 space-y-1.5 z-10">
                      <h3 className="text-lg sm:text-xl font-bold text-white drop-shadow-sm">
                        {srv.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-200 leading-snug drop-shadow-sm">
                        {srv.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Carousel Controls at bottom right */}
              <div className="flex items-center justify-end gap-2 pt-4 pr-4">
                <button
                  onClick={() => scrollCarousel("left")}
                  className="w-11 h-11 rounded-full border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 flex items-center justify-center transition shadow-xs hover:shadow cursor-pointer"
                  aria-label="Previous service"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => scrollCarousel("right")}
                  className="w-11 h-11 rounded-full bg-[#00a4dd] hover:bg-[#008fbf] text-white flex items-center justify-center transition shadow-md hover:shadow-lg cursor-pointer"
                  aria-label="Next service"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. BENEFITS SECTION (GLASSMORPHIC CARDS) (FIGMA SPEC)
          ======================================================== */}
      <section id="benefits" className="relative isolate py-20 lg:py-28 text-white overflow-hidden bg-[#01295f]">
        {/* Background Image with Dark Navy Blue Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/landing/benefits-bg.jpg"
            alt="Custom patio construction"
            fill
            sizes="100vw"
            quality={90}
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#01295f]/75 via-[#01295f]/60 to-[#001738]/70 z-10" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Title & Action */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Benefits
              </h2>
              <p className="text-2xl sm:text-3xl font-medium text-slate-200 leading-snug">
                One Team. A Simpler Way to Build.
              </p>

              <div>
                <button
                  onClick={scrollToForm}
                  className="inline-flex items-center gap-3 bg-[#00a4dd] hover:bg-[#008fbf] text-white font-bold py-3.5 px-7 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <ArrowRight size={18} />
                  <span>Get Your Free Estimate</span>
                </button>
              </div>
            </div>

            {/* Right: 5 Glassmorphic Feature Cards (Figma Spec) */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {BENEFITS_DATA.map((item, idx) => (
                  <div
                    key={item.title}
                    className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:scale-[1.02] flex flex-col justify-between ${
                      idx === 4 ? "sm:col-span-2 lg:col-span-1" : ""
                    }`}
                  >
                    <div>
                      {/* White Vector Icon from Figma */}
                      <div className="w-14 h-14 mb-4 flex items-center justify-start">
                        <Image
                          src={item.icon}
                          alt={item.title}
                          width={56}
                          height={56}
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. SUCCESS STORIES SECTION (FIGMA SPEC)
          ======================================================== */}
      <section id="success-stories" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#01295f] tracking-tight">
              Success Stories
            </h2>
            <p className="text-base sm:text-lg text-slate-500 mt-3 font-medium">
              Real Projects. Real Homeowners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 pb-8">
            {/* Story 1: Paver Installation */}
            <div className="relative group">
              {/* Image container with rounded corners */}
              <div className="relative h-80 sm:h-96 md:h-[400px] w-full rounded-3xl overflow-hidden shadow-md bg-slate-200">
                <Image
                  src="/landing/success-paver.png"
                  alt="Custom Paver Installation project in Katy TX"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Overlapping Description Card positioned at bottom-left matching screenshot */}
              <div className="relative z-10 -mt-16 sm:-mt-20 -ml-[10px] max-w-[88%] sm:max-w-[84%] bg-white p-6 sm:p-7 shadow-xl border border-slate-100 rounded-none">
                <h3 className="text-xl sm:text-2xl font-bold text-[#01295f] mb-2">
                  Paver Installation
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  Homeowners highlight our professionalism, communication, and punctuality.
                </p>
              </div>
            </div>

            {/* Story 2: Patio Expansion */}
            <div className="relative group">
              {/* Image container with rounded corners */}
              <div className="relative h-80 sm:h-96 md:h-[400px] w-full rounded-3xl overflow-hidden shadow-md bg-slate-200">
                <Image
                  src="/landing/success-patio.png"
                  alt="Patio Expansion and Roof Extension project"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Overlapping Description Card positioned at bottom-left matching screenshot */}
              <div className="relative z-10 -mt-16 sm:-mt-20 -ml-[10px] max-w-[88%] sm:max-w-[84%] bg-white p-6 sm:p-7 shadow-xl border border-slate-100 rounded-none">
                <h3 className="text-xl sm:text-2xl font-bold text-[#01295f] mb-2">
                  Patio Expansion
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  Clients value our quality, project management, and customer service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. FINANCING SECTION (FIGMA SPEC)
          ======================================================== */}
      <section id="financing" className="pt-16 md:pt-24 pb-0 bg-slate-50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch translate-y-[20px] -mb-[20px] relative z-20">
            {/* Left Card: Financing Details */}
            <div className="lg:col-span-6 bg-[#f0f0f0] rounded-3xl p-8 sm:p-12 lg:p-14 shadow-xl border border-slate-200 flex flex-col justify-between min-h-[460px] sm:min-h-[520px] lg:min-h-[580px]">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#01295f] tracking-tight">
                  Financing
                </h2>
                <p className="text-xl sm:text-2xl font-bold text-slate-800 mt-2">
                  Build Now. Pay Over Time.
                </p>

                <p className="text-slate-600 text-base sm:text-lg leading-relaxed mt-4">
                  Financing options make it easier to move forward with your outdoor project
                  without delaying your plans. Low monthly payment options to fit your budget.
                </p>
              </div>

              <div className="mt-8 pt-6">
                {/* Wisetack Highlight Banner (Figma Spec) */}
                <div className="bg-[#00a4dd] text-white font-bold text-base sm:text-lg px-6 py-4 rounded-none shadow-sm text-left">
                  Available through Wisetack for qualified customers.
                </div>

                <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                  * Subject to credit approval. Terms, rates, and conditions may vary based on creditworthiness.
                </p>
              </div>
            </div>

            {/* Right Card: High-Res Completed Project Image */}
            <div className="lg:col-span-6 flex">
              <div className="relative h-full min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] w-full rounded-3xl overflow-hidden shadow-xl bg-slate-200">
                <Image
                  src="/landing/financing-feature.png"
                  alt="Outdoor living pergola and modern patio"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          8. BOTTOM CTA BANNER (CYAN #00A4DD FIGMA SPEC)
          ======================================================== */}
      <section className="bg-[#00a4dd] text-white pt-24 pb-20 lg:pt-28 lg:pb-24 relative z-0">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow-xs">
            Ready to Upgrade Your Backyard?
          </h2>

          <p className="text-base sm:text-xl text-white/95 max-w-2xl mx-auto leading-relaxed">
            Tell us what you want to build and let Tamarron Services take care of the process.
            Start with a free estimate today.
          </p>

          <p className="text-sm font-bold tracking-wide uppercase text-white/90">
            Start with a free estimate today.
          </p>

          {/* Action Buttons (Figma Spec: Navy Button + White Button) */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={scrollToForm}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#01295f] hover:bg-[#001e47] text-white font-bold text-base px-8 py-4 rounded-none shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <ArrowRight size={18} className="text-[#00a4dd]" />
              <span>Get My Free Estimate</span>
            </button>

            <a
              href="#financing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-[#01295f] font-bold text-base px-8 py-4 rounded-none shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <ArrowRight size={18} className="text-[#00a4dd]" />
              <span>Ask About Financing</span>
            </a>
          </div>

          <p className="text-xs sm:text-sm text-white/80 pt-8 font-medium">
            Serving Katy, Texas and surrounding areas.
          </p>
        </div>
      </section>

      {/* ========================================================
          9. LANDING FOOTER (CLEAN & DEDICATED)
          ======================================================== */}
      <footer className="bg-[#00316b] text-white/70 py-8 text-xs border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">Tamarron Services</span>
            <span>• Outdoor Living Solutions</span>
          </div>
          <div>
            &copy; {new Date().getFullYear()} Tamarron Services. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
