'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { SmilePlus, Search, Palette, Layout, Users, ArrowRight, CheckCircle, Menu, X, Phone, Mail, MessageSquare, Send, Lightbulb, Microscope, PenTool, Repeat, Eye, Zap, MapPin, ChevronDown, PlusCircle, Rocket, Clock, Sparkles } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { SectionWrapper } from '@/components/section-wrapper'
import { SectionHeader } from '@/components/section-header'
import { Label } from "@/components/ui/label"

type FormData = {
  name: string
  email: string
  projectTypes: string[]
  message: string
}

type FormErrors = {
  [K in keyof FormData]?: string
}

type SectionWrapperProps = {
  children: React.ReactNode
  id: string
}

type SectionHeaderProps = {
  title: string
  subtitle: string
}

const SectionWrapper = ({ children, id }: SectionWrapperProps) => (
  <section id={id} className="py-24">
    {children}
  </section>
)

const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => (
  <div className="text-center mb-12">
    <h2 className="text-3xl font-bold mb-4">{title}</h2>
    <p className="text-zinc-400">{subtitle}</p>
  </div>
)

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectTypes: [] as string[],
    message: ""
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    projectTypes: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const projectTypeOptions = [
    "Website Redesign",
    "Mobile App",
    "AI Integration",
    "UX Audit"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleProjectTypeChange = (checked: boolean, type: string) => {
    setFormData(prev => ({
      ...prev,
      projectTypes: checked 
        ? [...prev.projectTypes, type]
        : prev.projectTypes.filter(t => t !== type)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrors(prev => ({ ...prev, submit: 'An error occurred. Please try again.' }))
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const sections = ['services', 'startup', 'process', 'faq', 'about', 'contact']
      
      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId)
        if (section) {
          const sectionTop = section.offsetTop - 100
          const sectionBottom = sectionTop + section.offsetHeight
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            const link = document.querySelector(`[data-section="${sectionId}"]`)
            if (link) {
              link.classList.add('text-primary')
            }
          } else {
            const link = document.querySelector(`[data-section="${sectionId}"]`)
            if (link) {
              link.classList.remove('text-primary')
            }
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Add 'dark' class to the <html> element to enable dark mode by default
    document.documentElement.classList.add('dark')
  }, [])

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (formData.projectTypes.length === 0) newErrors.projectTypes = "Please select at least one project type";
    if (!formData.message) newErrors.message = "Message is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <main className="min-h-screen bg-black">
      <header className="fixed top-0 w-full z-50 border-b border-zinc-800 bg-black">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <SmilePlus className="h-6 w-6 text-zinc-100" />
            <span className="font-medium text-zinc-100">happyux.ai</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-12">
            <a href="#services" className="text-sm text-zinc-100 hover:text-zinc-300 transition-colors">
              Services
            </a>
            <a href="#startups" className="text-sm text-zinc-100 hover:text-zinc-300 transition-colors">
              For Startups
            </a>
            <a href="#process" className="text-sm text-zinc-100 hover:text-zinc-300 transition-colors">
              Process
            </a>
            <a href="#faq" className="text-sm text-zinc-100 hover:text-zinc-300 transition-colors">
              FAQ
            </a>
            <a href="#about" className="text-sm text-zinc-100 hover:text-zinc-300 transition-colors">
              About
            </a>
            <a href="#contact" className="text-sm text-zinc-100 hover:text-zinc-300 transition-colors">
              Contact
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-black border-b border-zinc-800">
            <nav className="max-w-[1400px] mx-auto px-6 py-4 flex flex-col gap-4">
              <a href="#services" className="text-sm text-zinc-100 hover:text-zinc-300 transition-colors">
                Services
              </a>
              <a href="#startups" className="text-sm text-zinc-100 hover:text-zinc-300 transition-colors">
                For Startups
              </a>
              <a href="#process" className="text-sm text-zinc-100 hover:text-zinc-300 transition-colors">
                Process
              </a>
              <a href="#faq" className="text-sm text-zinc-100 hover:text-zinc-300 transition-colors">
                FAQ
              </a>
              <a href="#about" className="text-sm text-zinc-100 hover:text-zinc-300 transition-colors">
                About
              </a>
              <a href="#contact" className="text-sm text-zinc-100 hover:text-zinc-300 transition-colors">
                Contact
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center">
        <div className="max-w-[1400px] mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-zinc-100 leading-tight">
              AI-Powered UX: Rapid Innovation for Tech Startups
            </h1>
            <p className="text-lg text-zinc-400 max-w-xl">
              happyux.ai combines cutting-edge AI technology with human-centered design to create intelligent digital experiences that adapt, delight users, and drive business growth. Perfect for tech startups looking to revamp their UI/UX quickly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href="#services" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-black font-medium hover:bg-zinc-200 transition-colors"
              >
                Explore Our AI-Driven Services
                <span className="ml-2">→</span>
              </a>
              <a 
                href="#startups" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-zinc-900 text-white font-medium hover:bg-zinc-800 transition-colors"
              >
                Tech Startup Solutions
                <span className="ml-2">🚀</span>
              </a>
            </div>
          </div>

          {/* Right Column - Image/Visual with adjusted height */}
          <div className="flex items-center">
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="/happyux.gif"
                alt="AI UX Design Animation"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <SectionWrapper id="services">
        <div className="max-w-[1400px] mx-auto px-6">
          {/* Section Header */}
          <SectionHeader title="Our AI-Powered Services" subtitle="Elevate your digital products with our cutting-edge AI solutions that blend data-driven insights with human creativity. Rapid delivery for tech startups and established businesses alike." />

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group p-6 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
              <div className="bg-zinc-800 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-zinc-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-zinc-100 mb-3">
                AI-Enhanced User Research
              </h3>
              <p className="text-zinc-400 mb-6">
                Uncover deep insights about your users' needs, behaviors, and pain points using advanced AI analytics.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-zinc-400">
                  <svg className="w-4 h-4 mr-2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  AI-powered User Interviews & Surveys
                </li>
                <li className="flex items-center text-sm text-zinc-400">
                  <svg className="w-4 h-4 mr-2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Predictive Usability Testing
                </li>
                <li className="flex items-center text-sm text-zinc-400">
                  <svg className="w-4 h-4 mr-2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Machine Learning Data Analysis
                </li>
                <li className="flex items-center text-sm text-zinc-400">
                  <svg className="w-4 h-4 mr-2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  AI-assisted Persona Development
                </li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="group p-6 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
              <div className="bg-zinc-800 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-zinc-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-zinc-100 mb-3">
                Intelligent Experience Design
              </h3>
              <p className="text-zinc-400 mb-6">
                Create adaptive and intuitive user experiences that learn and evolve with your customers.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-zinc-400">
                  <svg className="w-4 h-4 mr-2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  AI-optimized User Flows
                </li>
                <li className="flex items-center text-sm text-zinc-400">
                  <svg className="w-4 h-4 mr-2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Adaptive Information Architecture
                </li>
                <li className="flex items-center text-sm text-zinc-400">
                  <svg className="w-4 h-4 mr-2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Intelligent Wireframing & Prototyping
                </li>
                <li className="flex items-center text-sm text-zinc-400">
                  <svg className="w-4 h-4 mr-2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  AI-enhanced Interaction Design
                </li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="group p-6 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
              <div className="bg-zinc-800 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-zinc-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-zinc-100 mb-3">
                AI-Driven Visual UI Design
              </h3>
              <p className="text-zinc-400 mb-6">
                Design visually stunning interfaces that dynamically align with your brand and user preferences.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-zinc-400">
                  <svg className="w-4 h-4 mr-2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  AI-generated UI Component Creation
                </li>
                <li className="flex items-center text-sm text-zinc-400">
                  <svg className="w-4 h-4 mr-2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Adaptive Design System Development
                </li>
                <li className="flex items-center text-sm text-zinc-400">
                  <svg className="w-4 h-4 mr-2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  AI-powered Visual Hierarchy Optimization
                </li>
                <li className="flex items-center text-sm text-zinc-400">
                  <svg className="w-4 h-4 mr-2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Intelligent Responsive Design
                </li>
              </ul>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Startups Section */}
      <SectionWrapper id="startups">
        <div className="max-w-[1400px] mx-auto px-6">
          {/* Section Header */}
          <SectionHeader title="Supercharge Your Tech Startup" subtitle="Revamp your UI/UX and accelerate your growth with our AI-powered design solutions tailored for tech startups." />

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature cards with hover effect */}
            <div className="group p-6 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
              <div className="bg-zinc-800 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-zinc-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-zinc-100 mb-3">Rapid Prototyping</h3>
              <p className="text-zinc-400">Go from idea to interactive prototype in days, not weeks. Our AI-assisted design process accelerates your product development cycle.</p>
            </div>

            <div className="group p-6 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
              <div className="bg-zinc-800 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-zinc-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-zinc-100 mb-3">User-Centric Design</h3>
              <p className="text-zinc-400">Leverage AI-driven user research to create experiences that resonate with your target audience and drive engagement.</p>
            </div>

            <div className="group p-6 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
              <div className="bg-zinc-800 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-zinc-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-zinc-100 mb-3">Competitive Edge</h3>
              <p className="text-zinc-400">Stand out in the crowded tech landscape with cutting-edge UI/UX that adapts to user behavior and market trends.</p>
            </div>

            <div className="group p-6 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
              <div className="bg-zinc-800 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-zinc-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-zinc-100 mb-3">Quick Turnaround</h3>
              <p className="text-zinc-400">We understand the pace of startups. Our streamlined process ensures fast delivery without compromising on quality.</p>
            </div>

            <div className="group p-6 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
              <div className="bg-zinc-800 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-zinc-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-zinc-100 mb-3">Scalable Design Systems</h3>
              <p className="text-zinc-400">Build a foundation that grows with your startup. Our AI-powered design systems adapt as your product evolves.</p>
            </div>

            <div className="group p-6 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
              <div className="bg-zinc-800 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-zinc-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-zinc-100">Innovation-Driven</h3>
              <p className="text-zinc-400">Stay ahead of the curve with AI-generated design concepts that push the boundaries of user experience.</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-16">
            <a href="#contact" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-black font-medium hover:bg-zinc-100 transition-colors">
              Accelerate Your Startup's UX
              <span className="ml-2">→</span>
            </a>
          </div>
        </div>
      </SectionWrapper>

      {/* Process Section */}
      <SectionWrapper id="process">
        <div className="max-w-[1400px] mx-auto px-6">
          {/* Section Header */}
          <SectionHeader title="Our AI-Driven Design Process" subtitle="Experience the future of UX design with our innovative AI-powered approach" />

          {/* Process Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Process Card 1 */}
            <div className="group p-6 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-zinc-800 w-12 h-12 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-zinc-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-zinc-100">AI-Powered Discovery</h3>
              </div>
              <p className="text-zinc-400 mb-6">
                We use AI to analyze your business goals, user needs, and market landscape for deeper insights.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-zinc-400">
                  <svg className="w-4 h-4 mr-2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  AI-driven stakeholder interview analysis
                </li>
                <li className="flex items-center text-sm text-zinc-400">
                  <svg className="w-4 h-4 mr-2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Predictive data insights
                </li>
                <li className="flex items-center text-sm text-zinc-400">
                  <svg className="w-4 h-4 mr-2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  AI-assisted KPI identification
                </li>
                <li className="flex items-center text-sm text-zinc-400">
                  <svg className="w-4 h-4 mr-2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Intelligent project scope definition
                </li>
              </ul>
            </div>

            {/* Process Card 2 */}
            <div className="group p-6 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-zinc-800 w-12 h-12 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-zinc-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-zinc-100">AI-Enhanced User Research</h3>
              </div>
              <p className="text-zinc-400 mb-6">
                Our AI tools conduct thorough user research to inform design decisions and validate assumptions.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-zinc-400">
                  <svg className="w-4 h-4 mr-2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  AI-powered user interviews and survey analysis
                </li>
                <li className="flex items-center text-sm text-zinc-400">
                  <svg className="w-4 h-4 mr-2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Machine learning-driven persona creation
                </li>
                <li className="flex items-center text-sm text-zinc-400">
                  <svg className="w-4 h-4 mr-2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  AI-assisted competitive analysis
                </li>
                <li className="flex items-center text-sm text-zinc-400">
                  <svg className="w-4 h-4 mr-2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Predictive pain point and opportunity identification
                </li>
              </ul>
            </div>

            {/* Process Card 3 */}
            <div className="group p-6 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-zinc-800 w-12 h-12 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-zinc-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-zinc-100">AI-Augmented Design</h3>
              </div>
              <p className="text-zinc-400 mb-6">
                We create intuitive interfaces and seamless user experiences using AI-powered design tools.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-zinc-400">
                  <svg className="w-4 h-4 mr-2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  AI-optimized information architecture
                </li>
                <li className="flex items-center text-sm text-zinc-400">
                  <svg className="w-4 h-4 mr-2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Generative AI wireframing
                </li>
                <li className="flex items-center text-sm text-zinc-400">
                  <svg className="w-4 h-4 mr-2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  AI-assisted high-fidelity mockups and prototypes
                </li>
                <li className="flex items-center text-sm text-zinc-400">
                  <svg className="w-4 h-4 mr-2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Intelligent usability testing and refinement
                </li>
              </ul>
            </div>

            {/* Process Card 4 */}
            <div className="group p-6 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-zinc-800 w-12 h-12 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-zinc-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-zinc-100">AI-Driven Continuous Improvement</h3>
              </div>
              <p className="text-zinc-400 mb-6">
                Our AI continuously refines and optimizes based on user feedback and performance metrics.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-zinc-400">
                  <svg className="w-4 h-4 mr-2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Real-time AI user behavior analysis
                </li>
                <li className="flex items-center text-sm text-zinc-400">
                  <svg className="w-4 h-4 mr-2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Predictive improvement identification
                </li>
                <li className="flex items-center text-sm text-zinc-400">
                  <svg className="w-4 h-4 mr-2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  AI-powered design optimization
                </li>
                <li className="flex items-center text-sm text-zinc-400">
                  <svg className="w-4 h-4 mr-2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Intelligent design iteration and refinement
                </li>
              </ul>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* FAQ Section */}
      <SectionWrapper id="faq">
        <div className="max-w-[1400px] mx-auto px-6">
          {/* Section Header */}
          <SectionHeader title="Frequently Asked Questions" subtitle="Get answers to common questions about our AI-powered UX design services and process." />

          {/* FAQ Card */}
          <div className="w-full max-w-3xl mx-auto">
            <div className="p-6 rounded-xl bg-zinc-900/30 border border-zinc-800/50">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {[
                  {
                    question: "What makes happyux.ai different from other UX design agencies?",
                    answer: "At happyux.ai, we combine cutting-edge AI technology with human-centered design principles. Our approach is data-driven and adaptive, ensuring that every design decision is backed by AI-powered user insights and aligned with business goals. We're not just designers; we're your strategic partners in creating intelligent digital experiences, especially for tech startups looking to innovate rapidly."
                  },
                  {
                    question: "How quickly can you deliver results for my startup?",
                    answer: "We understand the fast-paced nature of startups. Our AI-powered processes allow us to work efficiently, often delivering initial prototypes within days and complete design overhauls within weeks. The exact timeline depends on the project scope, but we pride ourselves on our quick turnaround without compromising quality."
                  },
                  {
                    question: "How does AI enhance your UX design process?",
                    answer: "AI enhances our UX design process in multiple ways. It helps us analyze vast amounts of user data quickly, generate and test design variations, predict user behavior, and continuously optimize experiences. This allows us to create more personalized, efficient, and effective user experiences while significantly reducing time-to-market - a crucial advantage for startups."
                  },
                  {
                    question: "Can you work with my existing tech stack?",
                    answer: "Our AI-powered UX solutions are designed to be flexible and integrative. We have experience working with a wide range of tech stacks and can adapt our AI tools to work seamlessly with your existing infrastructure. Whether you're using cutting-edge technologies or have legacy systems, we ensure smooth integration and knowledge transfer to your team."
                  },
                  {
                    question: "How do you measure the success of an AI-enhanced UX design project?",
                    answer: "We establish clear, measurable KPIs at the start of each project, tailored to your business goals. These might include improvements in user engagement, conversion rates, task completion times, or customer satisfaction scores. Our AI systems continuously monitor these metrics, providing real-time insights and predictive analytics. This allows us to demonstrate the tangible impact of our work and make data-driven decisions for ongoing optimization."
                  }
                ].map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border border-zinc-800/50 rounded-lg overflow-hidden"
                  >
                    <AccordionTrigger className="px-6 py-4 text-left hover:bg-zinc-800/30 text-zinc-100">
                      <span className="flex items-center gap-3">
                        <PlusCircle className="h-5 w-5 text-zinc-400" aria-hidden="true" />
                        <span>{faq.question}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 py-4 text-zinc-400">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* About Section */}
      <section id="about" className="min-h-screen py-32 bg-black relative overflow-hidden">
        {/* Background Gradient Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/20 to-black pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto px-6 relative">
          {/* Section Header with enhanced typography */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-5xl font-bold text-zinc-100 mb-6 tracking-tight">
              About happyux.ai
            </h2>
            <p className="text-lg text-zinc-400 leading-relaxed">
              We're a team of passionate UX designers, AI specialists, and tech enthusiasts dedicated to revolutionizing digital experiences.
            </p>
          </div>

          {/* Main Content with improved shadows and hover effects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
            {/* Left Column - Text Content */}
            <div className="space-y-8 p-8 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 backdrop-blur-sm 
                hover:bg-zinc-900/40 hover:border-zinc-700/50 transition-all duration-300">
              <div>
                <h3 className="text-2xl font-bold text-zinc-100 mb-4 flex items-center gap-3">
                  <div className="bg-zinc-800 w-10 h-10 rounded-full flex items-center justify-center
                      shadow-lg shadow-black/50 hover:shadow-black/70 transition-shadow">
                    <svg className="w-5 h-5 text-zinc-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  Our Mission
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  At happyux.ai, we're on a mission to bridge the gap between human-centered design and artificial intelligence. We believe that by harnessing the power of AI, we can create digital experiences that are not only beautiful and intuitive but also intelligent and adaptive.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-zinc-100 mb-4 flex items-center gap-3">
                  <div className="bg-zinc-800 w-10 h-10 rounded-full flex items-center justify-center
                      shadow-lg shadow-black/50 hover:shadow-black/70 transition-shadow">
                    <svg className="w-5 h-5 text-zinc-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  Our Approach
                </h3>
                <p className="text-zinc-400 mb-6 leading-relaxed">
                  We combine cutting-edge AI technology with years of UX design expertise to deliver solutions that are:
                </p>
                <ul className="space-y-4">
                  {[
                    "Data-driven yet human-centered",
                    "Innovative yet user-friendly",
                    "Efficient yet thorough",
                    "Scalable yet personalized"
                  ].map((item, index) => (
                    <li key={index} 
                        className="flex items-center gap-3 text-zinc-400 bg-zinc-800/30 p-4 rounded-lg 
                          border border-zinc-700/30 hover:bg-zinc-800/40 hover:border-zinc-700/50 
                          transition-all duration-300 group">
                      <div className="bg-zinc-800 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                          shadow-md shadow-black/50 group-hover:shadow-black/70 transition-shadow">
                        <svg className="w-4 h-4 text-zinc-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="group-hover:text-zinc-300 transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  width={600}
                  height={400}
                  alt="Team of UX designers and AI specialists collaborating on a project"
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-lg"></div>
              </div>
            </div>
            <div
              className="mt-12 text-center"
            >
              <Button size="lg" onClick={() => scrollToSection('contact')}>
                Join Us in Shaping the Future of UX
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-background/80" aria-labelledby="contact-title">
          <div className="container px-4 md:px-6">
            <div
              className="text-center mb-12"
            >
              <h2 id="contact-title" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Get in Touch</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Ready to elevate your UX with AI? Let's start a conversation about your project.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <Card className="dark:bg-black-900">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-primary mr-2" aria-hidden="true" />
                      <p>123 AI Boulevard, Tech City, TC 12345</p>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-primary mr-2" aria-hidden="true" />
                      <p>+1 (555) 123-4567</p>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-primary mr-2" aria-hidden="true" />
                      <p>hello@happyux.ai</p>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="h-5 w-5 text-primary mr-2" aria-hidden="true" />
                      <p>Live chat available 24/7</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card className="dark:bg-black-900">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">Send us a Message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={errors.name ? 'border-red-500' : ''}
                          aria-invalid={errors.name ? 'true' : 'false'}
                          aria-describedby={errors.name ? 'name-error' : undefined}
                        />
                        {errors.name && (
                          <p id="name-error" className="text-sm text-red-500 mt-1">{errors.name}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={errors.email ? 'border-red-500' : ''}
                          aria-invalid={errors.email ? 'true' : 'false'}
                          aria-describedby={errors.email ? 'email-error' : undefined}
                        />
                        {errors.email && (
                          <p id="email-error" className="text-sm text-red-500 mt-1">{errors.email}</p>
                        )}
                      </div>
                      <div>
                        <Label>Project Type</Label>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          {projectTypeOptions.map((type) => (
                            <div key={type} className="flex items-center space-x-2">
                              <Checkbox
                                id={type}
                                checked={formData.projectTypes.includes(type)}
                                onCheckedChange={(checked) => handleProjectTypeChange(checked as boolean, type)}
                              />
                              <Label htmlFor={type}>{type}</Label>
                            </div>
                          ))}
                        </div>
                        {errors.projectTypes && (
                          <p className="text-sm text-red-500 mt-1">{errors.projectTypes}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell us about your project..."
                          value={formData.message}
                          onChange={handleInputChange}
                          className={errors.message ? 'border-red-500' : ''}
                          aria-invalid={errors.message ? 'true' : 'false'}
                          aria-describedby={errors.message ? 'message-error' : undefined}
                        />
                        {errors.message && (
                          <p id="message-error" className="text-sm text-red-500 mt-1">{errors.message}</p>
                        )}
                      </div>
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <span className="animate-spin mr-2">⏳</span>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="ml-2 h-5 w-5" aria-hidden="true" />
                          </>
                        )}
                      </Button>
                    </form>
                    {isSubmitted && (
                      <div
                        className="mt-4 p-4 bg-green-100 text-green-700 rounded-md"
                      >
                        <p className="font-semibold">Thank you for your message!</p>
                        <p>We'll get back to you as soon as possible.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}