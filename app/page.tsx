'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { SmilePlus, Search, Palette, Layout, Users, ArrowRight, CheckCircle, Menu, X, Phone, Mail, MessageSquare, Send, Lightbulb, Microscope, PenTool, Repeat, Eye, Zap, MapPin, ChevronDown, PlusCircle, Rocket, Clock, Sparkles } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

type FormData = {
  name: string
  email: string
  projectTypes: string[]
  message: string
}

type FormErrors = {
  [K in keyof FormData]?: string
}

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    projectTypes: [],
    message: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const projectTypeOptions = [
    'Website Redesign',
    'Mobile App Design',
    'Branding & UI',
    'Other'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleProjectTypeChange = (checked: boolean, value: string) => {
    setFormData(prev => ({
      ...prev,
      projectTypes: checked
        ? [...prev.projectTypes, value]
        : prev.projectTypes.filter(type => type !== value)
    }))
    setErrors(prev => ({ ...prev, projectTypes: '' }))
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (formData.projectTypes.length === 0) newErrors.projectTypes = 'Please select at least one project type'
    if (!formData.message.trim()) newErrors.message = 'Message is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

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

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground dark">
      {/* Skip to main content link */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md">
        Skip to main content
      </a>

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-4">
          <Link className="flex items-center justify-center" href="#" aria-label="happyux.ai home">
            <div className="relative group">
              <SmilePlus className="h-6 w-6 text-primary transition-colors duration-300" aria-hidden="true" />
              <SmilePlus className="absolute inset-0 h-6 w-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
            </div>
            <span className="ml-2 text-2xl font-bold text-primary">happyux.ai</span>
          </Link>
          <nav className="hidden md:flex ml-auto gap-6" aria-label="Main Navigation">
            {["Services", "For Startups", "Process", "FAQ", "About", "Contact"].map((item) => (
              <button
                key={item}
                className="text-sm font-medium hover:text-primary transition-colors cursor-pointer relative group focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={() => scrollToSection(item.toLowerCase().replace(' ', ''))}
                data-section={item.toLowerCase().replace(' ', '')}
              >
                {item}
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
              </button>
            ))}
          </nav>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden ml-auto"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
            {isMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </Button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-16 left-0 right-0 bg-background border-b z-30"
          >
            <nav className="container py-4" aria-label="Mobile Navigation">
              {["Services", "For Startups", "Process", "FAQ", "About", "Contact"].map((item) => (
                <button
                  key={item}
                  className="block w-full text-left py-2 text-sm font-medium hover:text-primary transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', ''))}
                  data-section={item.toLowerCase().replace(' ', '')}
                >
                  {item}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-background/80">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <motion.div
                className="flex flex-col justify-center space-y-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-foreground">
                    AI-Powered UX: Rapid Innovation for Tech Startups
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    happyux.ai combines cutting-edge AI technology with human-centered design to create intelligent digital experiences that adapt, delight users, and drive business growth. Perfect for tech startups looking to revamp their UI/UX quickly.
                  </p>
                </div>
                <div className="flex flex-col gap-4 min-[400px]:flex-row">
                  <Button size="lg" className="w-full sm:w-auto" onClick={() => scrollToSection('services')}>
                    Explore Our AI-Driven Services
                    <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                  </Button>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto" onClick={() => scrollToSection('startup')}>
                    Tech Startup Solutions
                    <Rocket className="ml-2 h-5 w-5" aria-hidden="true" />
                  </Button>
                </div>
              </motion.div>
              <motion.div
                className="mx-auto aspect-video overflow-hidden rounded-xl sm:w-full lg:order-last"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  width={600}
                  height={400}
                  alt="AI-powered UX design process visualization showing a team collaborating with AI tools on a digital project"
                  className="object-cover object-center w-full h-full"
                />
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex justify-center mt-12"
            >
              <Button
                variant="ghost"
                size="icon"
                className="animate-bounce"
                onClick={() => scrollToSection('services')}
                aria-label="Scroll to services section"
              >
                <ChevronDown className="h-6 w-6" aria-hidden="true" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50" aria-labelledby="services-title">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 id="services-title" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Our AI-Powered Services</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Elevate your digital products with our cutting-edge AI solutions that blend data-driven insights with human creativity. Rapid delivery for tech startups and established businesses alike.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  icon: Search,
                  title: "AI-Enhanced User Research",
                  description: "Uncover deep insights about your users' needs, behaviors, and pain points using advanced AI analytics.",
                  features: [
                    "AI-powered User Interviews & Surveys",
                    "Predictive Usability Testing",
                    "Machine Learning Data Analysis",
                    "AI-assisted Persona Development"
                  ],
                },
                {
                  icon: Eye,
                  title: "Intelligent Experience Design",
                  description: "Create adaptive and intuitive user experiences that learn and evolve with your customers.",
                  features: [
                    "AI-optimized User Flows",
                    "Adaptive Information Architecture",
                    "Intelligent Wireframing & Prototyping",
                    "AI-enhanced Interaction Design"
                  ],
                },
                {
                  icon: Palette,
                  title: "AI-Driven Visual UI Design",
                  description: "Design visually stunning interfaces that dynamically align with your brand and user preferences.",
                  features: [
                    "AI-generated UI Component Creation",
                    "Adaptive Design System Development",
                    "AI-powered Visual Hierarchy Optimization",
                    "Intelligent Responsive Design"
                  ],
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="w-full"
                >
                  <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 dark:bg-black-900">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <service.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                      </div>
                      <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ul className="space-y-2" aria-label={`${service.title} features`}>
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" aria-hidden="true" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* For Startups Section */}
        <section id="startup" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-background/80" aria-labelledby="startup-title">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 id="startup-title" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Supercharge Your Tech Startup</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Revamp your UI/UX and accelerate your growth with our AI-powered design solutions tailored for tech startups.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  icon: Rocket,
                  title: "Rapid Prototyping",
                  description: "Go from idea to interactive prototype in days, not weeks. Our AI-assisted design process accelerates your product development cycle.",
                },
                {
                  icon: Users,
                  title: "User-Centric Design",
                  description: "Leverage AI-driven user research to create experiences that resonate with your target audience and drive engagement.",
                },
                {
                  icon: Sparkles,
                  title: "Competitive Edge",
                  description: "Stand out in the crowded tech landscape with cutting-edge UI/UX that adapts to user behavior and market trends.",
                },
                {
                  icon: Clock,
                  title: "Quick Turnaround",
                  description: "We understand the pace of startups. Our streamlined process ensures fast delivery without compromising on quality.",
                },
                {
                  icon: Zap,
                  title: "Scalable Design Systems",
                  description: "Build a foundation that grows with your startup. Our AI-powered design systems adapt as your product evolves.",
                },
                {
                  icon: Lightbulb,
                  title: "Innovation-Driven",
                  description: "Stay ahead of the curve with AI-generated design concepts that push the boundaries of user experience.",
                },
              ].map(({ icon: Icon, title, description }, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="w-full"
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 dark:bg-black-900">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                      </div>
                      <CardTitle className="text-xl mb-2">{title}</CardTitle>
                      <CardDescription>{description}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-12 text-center"
            >
              <Button size="lg" onClick={() => scrollToSection('contact')}>
                Accelerate Your Startup's UX
                <Rocket className="ml-2 h-5 w-5" aria-hidden="true" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50" aria-labelledby="process-title">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 id="process-title" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our AI-Driven Design Process</h2>
              <p className="mt-4 text-xl text-muted-foreground">
                Experience the future of UX design with our innovative AI-powered approach
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">
              {[
                {
                  id: "discovery",
                  title: "AI-Powered Discovery",
                  icon: Lightbulb,
                  description: "We use AI to analyze your business goals, user needs, and market landscape for deeper insights.",
                  details: [
                    "AI-driven stakeholder interview analysis",
                    "Predictive data insights",
                    "AI-assisted KPI identification",
                    "Intelligent project scope definition"
                  ]
                },
                {
                  id: "research",
                  title: "AI-Enhanced User Research",
                  icon: Microscope,
                  description: "Our AI tools conduct thorough user research to inform design decisions and validate assumptions.",
                  details: [
                    "AI-powered user interviews and survey analysis",
                    "Machine learning-driven persona creation",
                    "AI-assisted competitive analysis",
                    "Predictive pain point and opportunity identification"
                  ]
                },
                {
                  id: "design",
                  title: "AI-Augmented Design",
                  icon: PenTool,
                  description: "We create intuitive interfaces and seamless user experiences using AI-powered design tools.",
                  details: [
                    "AI-optimized information architecture",
                    "Generative AI wireframing",
                    "AI-assisted high-fidelity mockups and prototypes",
                    "Intelligent usability testing and refinement"
                  ]
                },
                {
                  id: "iterate",
                  title: "AI-Driven Continuous Improvement",
                  icon: Repeat,
                  description: "Our AI continuously refines and optimizes based on user feedback and performance metrics.",
                  details: [
                    "Real-time AI user behavior analysis",
                    "Predictive improvement identification",
                    "AI-powered A/B testing",
                    "Adaptive design refinement"
                  ]
                }
              ].map((process, index) => (
                <motion.div
                  key={process.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full"
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 dark:bg-black-900">
                    <CardHeader>
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                          <process.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                        </div>
                        <CardTitle className="text-xl">{process.title}</CardTitle>
                      </div>
                      <CardDescription>{process.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2" aria-label={`${process.title} details`}>
                        {process.details.map((detail, detailIndex) => (
                          <motion.li
                            key={detailIndex}
                            className="flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: (index * 0.1) + (detailIndex * 0.05) }}
                          >
                            <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" aria-hidden="true" />
                            <span>{detail}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 text-center"
            >
              <Button size="lg" onClick={() => scrollToSection('contact')}>
                Start Your AI-Powered UX Journey
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-background/80" aria-labelledby="faq-title">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 id="faq-title" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Frequently Asked Questions</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Get answers to common questions about our AI-powered UX design services and process.
              </p>
            </motion.div>
            <Card className="w-full max-w-3xl mx-auto dark:bg-black-900">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Have a question? We're here to help!</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
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
                    <AccordionItem value={`item-${index}`} key={index}>
                      <AccordionTrigger className="text-left">
                        <span className="flex items-center">
                          <PlusCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                          {faq.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 text-center"
            >
              <Button size="lg" onClick={() => scrollToSection('contact')}>
                Still have questions? Contact us
              </Button>
            </motion.div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="w-full py-12I'd be happy to go over all the code for your happyux.ai landing page and help address the errors you encountered during testing. Let's review the main components of your project and make sure everything is working correctly.



Let's start with the main page component. I'll provide the complete code for `app/page.tsx`, and then we'll go through other essential files:

```tsx project="HappyUX Landing Page" file="app/page.tsx" type="react"
'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { SmilePlus, Search, Palette, Layout, Users, ArrowRight, CheckCircle, Menu, X, Phone, Mail, MessageSquare, Send, Lightbulb, Microscope, PenTool, Repeat, Eye, Zap, MapPin, ChevronDown, PlusCircle, Rocket, Clock, Sparkles } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

type FormData = {
  name: string
  email: string
  projectTypes: string[]
  message: string
}

type FormErrors = {
  [K in keyof FormData]?: string
}

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    projectTypes: [],
    message: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const projectTypeOptions = [
    'Website Redesign',
    'Mobile App Design',
    'Branding & UI',
    'Other'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleProjectTypeChange = (checked: boolean, value: string) => {
    setFormData(prev => ({
      ...prev,
      projectTypes: checked
        ? [...prev.projectTypes, value]
        : prev.projectTypes.filter(type => type !== value)
    }))
    setErrors(prev => ({ ...prev, projectTypes: '' }))
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (formData.projectTypes.length === 0) newErrors.projectTypes = 'Please select at least one project type'
    if (!formData.message.trim()) newErrors.message = 'Message is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

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

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground dark">
      {/* Skip to main content link */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md">
        Skip to main content
      </a>

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-4">
          <Link className="flex items-center justify-center" href="#" aria-label="happyux.ai home">
            <div className="relative group">
              <SmilePlus className="h-6 w-6 text-primary transition-colors duration-300" aria-hidden="true" />
              <SmilePlus className="absolute inset-0 h-6 w-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
            </div>
            <span className="ml-2 text-2xl font-bold text-primary">happyux.ai</span>
          </Link>
          <nav className="hidden md:flex ml-auto gap-6" aria-label="Main Navigation">
            {["Services", "For Startups", "Process", "FAQ", "About", "Contact"].map((item) => (
              <button
                key={item}
                className="text-sm font-medium hover:text-primary transition-colors cursor-pointer relative group focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={() => scrollToSection(item.toLowerCase().replace(' ', ''))}
                data-section={item.toLowerCase().replace(' ', '')}
              >
                {item}
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
              </button>
            ))}
          </nav>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden ml-auto"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
            {isMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </Button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-16 left-0 right-0 bg-background border-b z-30"
          >
            <nav className="container py-4" aria-label="Mobile Navigation">
              {["Services", "For Startups", "Process", "FAQ", "About", "Contact"].map((item) => (
                <button
                  key={item}
                  className="block w-full text-left py-2 text-sm font-medium hover:text-primary transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', ''))}
                  data-section={item.toLowerCase().replace(' ', '')}
                >
                  {item}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-background/80">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <motion.div
                className="flex flex-col justify-center space-y-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-foreground">
                    AI-Powered UX: Rapid Innovation for Tech Startups
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    happyux.ai combines cutting-edge AI technology with human-centered design to create intelligent digital experiences that adapt, delight users, and drive business growth. Perfect for tech startups looking to revamp their UI/UX quickly.
                  </p>
                </div>
                <div className="flex flex-col gap-4 min-[400px]:flex-row">
                  <Button size="lg" className="w-full sm:w-auto" onClick={() => scrollToSection('services')}>
                    Explore Our AI-Driven Services
                    <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                  </Button>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto" onClick={() => scrollToSection('startup')}>
                    Tech Startup Solutions
                    <Rocket className="ml-2 h-5 w-5" aria-hidden="true" />
                  </Button>
                </div>
              </motion.div>
              <motion.div
                className="mx-auto aspect-video overflow-hidden rounded-xl sm:w-full lg:order-last"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  width={600}
                  height={400}
                  alt="AI-powered UX design process visualization showing a team collaborating with AI tools on a digital project"
                  className="object-cover object-center w-full h-full"
                />
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex justify-center mt-12"
            >
              <Button
                variant="ghost"
                size="icon"
                className="animate-bounce"
                onClick={() => scrollToSection('services')}
                aria-label="Scroll to services section"
              >
                <ChevronDown className="h-6 w-6" aria-hidden="true" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50" aria-labelledby="services-title">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 id="services-title" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Our AI-Powered Services</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Elevate your digital products with our cutting-edge AI solutions that blend data-driven insights with human creativity. Rapid delivery for tech startups and established businesses alike.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  icon: Search,
                  title: "AI-Enhanced User Research",
                  description: "Uncover deep insights about your users' needs, behaviors, and pain points using advanced AI analytics.",
                  features: [
                    "AI-powered User Interviews & Surveys",
                    "Predictive Usability Testing",
                    "Machine Learning Data Analysis",
                    "AI-assisted Persona Development"
                  ],
                },
                {
                  icon: Eye,
                  title: "Intelligent Experience Design",
                  description: "Create adaptive and intuitive user experiences that learn and evolve with your customers.",
                  features: [
                    "AI-optimized User Flows",
                    "Adaptive Information Architecture",
                    "Intelligent Wireframing & Prototyping",
                    "AI-enhanced Interaction Design"
                  ],
                },
                {
                  icon: Palette,
                  title: "AI-Driven Visual UI Design",
                  description: "Design visually stunning interfaces that dynamically align with your brand and user preferences.",
                  features: [
                    "AI-generated UI Component Creation",
                    "Adaptive Design System Development",
                    "AI-powered Visual Hierarchy Optimization",
                    "Intelligent Responsive Design"
                  ],
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="w-full"
                >
                  <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 dark:bg-black-900">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <service.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                      </div>
                      <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ul className="space-y-2" aria-label={`${service.title} features`}>
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" aria-hidden="true" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* For Startups Section */}
        <section id="startup" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-background/80" aria-labelledby="startup-title">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 id="startup-title" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Supercharge Your Tech Startup</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Revamp your UI/UX and accelerate your growth with our AI-powered design solutions tailored for tech startups.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  icon: Rocket,
                  title: "Rapid Prototyping",
                  description: "Go from idea to interactive prototype in days, not weeks. Our AI-assisted design process accelerates your product development cycle.",
                },
                {
                  icon: Users,
                  title: "User-Centric Design",
                  description: "Leverage AI-driven user research to create experiences that resonate with your target audience and drive engagement.",
                },
                {
                  icon: Sparkles,
                  title: "Competitive Edge",
                  description: "Stand out in the crowded tech landscape with cutting-edge UI/UX that adapts to user behavior and market trends.",
                },
                {
                  icon: Clock,
                  title: "Quick Turnaround",
                  description: "We understand the pace of startups. Our streamlined process ensures fast delivery without compromising on quality.",
                },
                {
                  icon: Zap,
                  title: "Scalable Design Systems",
                  description: "Build a foundation that grows with your startup. Our AI-powered design systems adapt as your product evolves.",
                },
                {
                  icon: Lightbulb,
                  title: "Innovation-Driven",
                  description: "Stay ahead of the curve with AI-generated design concepts that push the boundaries of user experience.",
                },
              ].map(({ icon: Icon, title, description }, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="w-full"
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 dark:bg-black-900">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                      </div>
                      <CardTitle className="text-xl mb-2">{title}</CardTitle>
                      <CardDescription>{description}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-12 text-center"
            >
              <Button size="lg" onClick={() => scrollToSection('contact')}>
                Accelerate Your Startup's UX
                <Rocket className="ml-2 h-5 w-5" aria-hidden="true" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50" aria-labelledby="process-title">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 id="process-title" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our AI-Driven Design Process</h2>
              <p className="mt-4 text-xl text-muted-foreground">
                Experience the future of UX design with our innovative AI-powered approach
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">
              {[
                {
                  id: "discovery",
                  title: "AI-Powered Discovery",
                  icon: Lightbulb,
                  description: "We use AI to analyze your business goals, user needs, and market landscape for deeper insights.",
                  details: [
                    "AI-driven stakeholder interview analysis",
                    "Predictive data insights",
                    "AI-assisted KPI identification",
                    "Intelligent project scope definition"
                  ]
                },
                {
                  id: "research",
                  title: "AI-Enhanced User Research",
                  icon: Microscope,
                  description: "Our AI tools conduct thorough user research to inform design decisions and validate assumptions.",
                  details: [
                    "AI-powered user interviews and survey analysis",
                    "Machine learning-driven persona creation",
                    "AI-assisted competitive analysis",
                    "Predictive pain point and opportunity identification"
                  ]
                },
                {
                  id: "design",
                  title: "AI-Augmented Design",
                  icon: PenTool,
                  description: "We create intuitive interfaces and seamless user experiences using AI-powered design tools.",
                  details: [
                    "AI-optimized information architecture",
                    "Generative AI wireframing",
                    "AI-assisted high-fidelity mockups and prototypes",
                    "Intelligent usability testing and refinement"
                  ]
                },
                {
                  id: "iterate",
                  title: "AI-Driven Continuous Improvement",
                  icon: Repeat,
                  description: "Our AI continuously refines and optimizes based on user feedback and performance metrics.",
                  details: [
                    "Real-time AI user behavior analysis",
                    "Predictive improvement identification",
                    "AI-powered A/B testing",
                    "Adaptive design refinement"
                  ]
                }
              ].map((process, index) => (
                <motion.div
                  key={process.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full"
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 dark:bg-black-900">
                    <CardHeader>
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                          <process.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                        </div>
                        <CardTitle className="text-xl">{process.title}</CardTitle>
                      </div>
                      <CardDescription>{process.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2" aria-label={`${process.title} details`}>
                        {process.details.map((detail, detailIndex) => (
                          <motion.li
                            key={detailIndex}
                            className="flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: (index * 0.1) + (detailIndex * 0.05) }}
                          >
                            <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" aria-hidden="true" />
                            <span>{detail}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 text-center"
            >
              <Button size="lg" onClick={() => scrollToSection('contact')}>
                Start Your AI-Powered UX Journey
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-background/80" aria-labelledby="faq-title">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 id="faq-title" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Frequently Asked Questions</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Get answers to common questions about our AI-powered UX design services and process.
              </p>
            </motion.div>
            <Card className="w-full max-w-3xl mx-auto dark:bg-black-900">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Have a question? We're here to help!</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
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
                    <AccordionItem value={`item-${index}`} key={index}>
                      <AccordionTrigger className="text-left">
                        <span className="flex items-center">
                          <PlusCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                          {faq.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 text-center"
            >
              <Button size="lg" onClick={() => scrollToSection('contact')}>
                Still have questions? Contact us
              </Button>
            </motion.div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50" aria-labelledby="about-title">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 id="about-title" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">About happyux.ai</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                We're a team of passionate UX designers, AI specialists, and tech enthusiasts dedicated to revolutionizing digital experiences.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground mb-6">
                  At happyux.ai, we're on a mission to bridge the gap between human-centered design and artificial intelligence. We believe that by harnessing the power of AI, we can create digital experiences that are not only beautiful and intuitive but also intelligent and adaptive.
                </p>
                <h3 className="text-2xl font-bold mb-4">Our Approach</h3>
                <p className="text-muted-foreground mb-6">
                  We combine cutting-edge AI technology with years of UX design expertise to deliver solutions that are:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Data-driven yet human-centered</li>
                  <li>Innovative yet user-friendly</li>
                  <li>Efficient yet thorough</li>
                  <li>Scalable yet personalized</li>
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  width={600}
                  height={400}
                  alt="Team of UX designers and AI specialists collaborating on a project"
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-lg"></div>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 text-center"
            >
              <Button size="lg" onClick={() => scrollToSection('contact')}>
                Join Us in Shaping the Future of UX
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-background/80" aria-labelledby="contact-title">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 id="contact-title" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Get in Touch</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Ready to elevate your UX with AI? Let's start a conversation about your project.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
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
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
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
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mt-4 p-4 bg-green-100 text-green-700 rounded-md"
                      >
                        <p className="font-semibold">Thank you for your message!</p>
                        <p>We'll get back to you as soon as possible.</p>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 bg-background border-t">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Services</h3>
              <ul className="space-y-2">
                <li><Link href="#services" className="text-sm text-muted-foreground hover:text-primary">AI-Enhanced User Research</Link></li>
                <li><Link href="#services" className="text-sm text-muted-foreground hover:text-primary">Intelligent Experience Design</Link></li>
                <li><Link href="#services" className="text-sm text-muted-foreground hover:text-primary">AI-Driven Visual UI Design</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Company</h3>
              <ul className="space-y-2">
                <li><Link href="#about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Careers</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Blog</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Documentation</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Case Studies</Link></li>
                <li><Link href="#faq" className="text-sm text-muted-foreground hover:text-primary">FAQ</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">Facebook</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">Twitter</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">LinkedIn</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-4 md:mt-0">
              © 2024 happyux.ai. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}