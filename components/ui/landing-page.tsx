"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { 
  Linkedin, 
  Github, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  Menu, 
  X,
  ExternalLink,
  Download,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import Link from "next/link"

export function HawulethuLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 100], [1, 0.95])

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Reset status when user starts typing
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle')
      setSubmitMessage('')
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error')
      setSubmitMessage('Please fill in all fields.')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setSubmitMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      // Success
      setSubmitStatus('success')
      setSubmitMessage('Thank you! Your message has been sent successfully.')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
      setSubmitMessage(error instanceof Error ? error.message : 'Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
        }`}
        style={{ opacity }}
      >
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold cursor-pointer"
            onClick={() => scrollToSection("hero")}
          >
            Hawulethu
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {["About", "Experience", "Projects", "Leadership", "Skills", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </button>
            ))}
            <div className="flex gap-3">
              <Button variant="outline" size="sm" asChild>
                <a href="/Hawulethu%20Ndlovu%20Resume.pdf" download>
                  <Download className="w-4 h-4 mr-2" />
                  Resume
                </a>
              </Button>
              <Button size="sm" asChild>
                <a href="https://github.com/Hawu87" target="_blank" rel="noopener noreferrer">
                  Portfolio
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-border"
          >
            <div className="container mx-auto px-4 py-4 space-y-3">
              {["About", "Experience", "Projects", "Leadership", "Skills", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left text-sm font-medium py-2"
                >
                  {item}
                </button>
              ))}
              <div className="pt-4 space-y-2">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href="/Hawulethu%20Ndlovu%20Resume.pdf" download>
                    <Download className="w-4 h-4 mr-2" />
                    Resume
                  </a>
                </Button>
                <Button size="sm" className="w-full" asChild>
                  <a href="https://hawu87.github.io" target="_blank" rel="noopener noreferrer">
                    Portfolio
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
              >
                AI Product Management & Data Storytelling
              </motion.div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Hawulethu Ndlovu
                </span>
                . I build data-driven products at the intersection of AI, analytics, and user experience.
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Computer Science & Mathematics at the University of Arkansas at Pine Bluff - May &apos;26
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={() => scrollToSection("projects")}>
                  View My Work
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="https://www.linkedin.com/in/hawulethu" target="_blank" rel="noopener noreferrer">
                    Connect on LinkedIn
                  </a>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden border border-border"
            >
              <Image
                src="/1Q5A3167.jpg"
                alt="Hawulethu Ndlovu"
                fill
                className="object-cover"
                style={{ objectPosition: 'center top' }}
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">About Me</h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
              I’m a Computer Science and Mathematics student who enjoys building practical, intuitive products powered by AI. I focus on creating tools that simplify complex tasks, improve workflows, and offer clear, enjoyable user experiences. I’m driven by curiosity, problem-solving, and the challenge of turning ideas into something useful.
              </p>
              
              <div className="pt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p><strong className="text-foreground">Current Focus:</strong> AI Product Management, leveraging AI to build products that scale</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p><strong className="text-foreground">Problem Types:</strong> Workflow optimization, data-driven decision making, user experience design</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p><strong className="text-foreground">Interests:</strong> Hiking, biking, reading, sports, and continuous learning</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Experience
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                company: "Intuit",
                role: "AI Product Management Intern",
                location: "Mountain View, CA",
                period: "May 2025 – Present",
                highlights: [
                  "10+ customer interviews → 3 core product features",
                  "Partnered with 3 AI engineers & 2 designers → 90% prototype approval rate",
                  "Drove alignment across 2 cross-functional teams → 25% increase in early user engagement"
                ],
                description: "QuickBooks AI Agent to help 5M+ small businesses get paid faster"
              },
              {
                company: "Walton Enterprises",
                role: "Product Management Intern",
                location: "Bentonville, AR",
                period: "Jun – Dec 2024",
                highlights: [
                  "Collaborated with engineering team of 4; wrote user stories",
                  "15+ user interviews; identified 3 key pain points for new workflow",
                  "Managed JIRA backlog, led sprints → increased on-time deliverables"
                ],
                description: "Migrating education team from email-based contracts to Laserfiche"
              },
              {
                company: "Bain & Company",
                role: "Building Entrepreneurial Leaders Intern",
                location: "San Francisco, CA",
                period: "May 2024",
                highlights: [
                  "Led analysis with team of 5; Excel modeling cut anticipated project timeline by 1 week",
                  "Synthesized surveys, expert calls, G2 insights → 3 high-potential growth opportunities",
                  "Delivered data-driven PowerPoint story for Partners"
                ],
                description: "Real client case with consultants"
              }
            ].map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-3xl border border-border bg-card hover:shadow-lg transition-all"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-1">{exp.company}</h3>
                  <p className="text-primary font-medium mb-1">{exp.role}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                    <MapPin className="w-3 h-3" />
                    {exp.location}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">{exp.period}</p>
                  <p className="text-sm text-muted-foreground mb-4">{exp.description}</p>
                </div>
                <ul className="space-y-2">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Projects
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "AI Note Summarizer",
                tagline: "Create notes, summarize with AI, and keep everything private per user.",
                date: "2025",
                description: "A full-stack web application that enables users to create, organize, and summarize notes using AI. Built with Next.js, Supabase, and OpenAI integration.",
                tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui", "Supabase", "OpenAI", "Vercel"],
                image: "/AI cover photo.png",
                detailPage: "/projects/ai-note-summarizer",
                liveUrl: "https://ai-notes-summarizer-alpha.vercel.app"
              },
              {
                title: "Virulence Genes Insights WebApp",
                role: "Product Manager & Developer",
                date: "Nov 2025",
                team: "Team of 3",
                description: "Built a data-driven website using React, Tailwind CSS, Plotly.js. Created 6 visualizations of virulence genes and validated Excel summaries for 18 gene entries. Designed a clear data storyline and UX so users can interpret gene patterns effectively.",
                tech: ["React", "Tailwind CSS", "Plotly.js"],
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
                liveUrl: "https://gene-visualizations.vercel.app/"
              },
              {
                title: "Global Internet Prices and Disparities",
                role: "Data Analyst",
                date: "Apr 2025",
                description: "Research on global internet usage & pricing, presented at MAA OK-AR conference. Used R, Excel, Tableau, PowerPoint. Identified trends and disparities in pricing & usage; focused on affordability & user experience.",
                tech: ["R", "Excel", "Tableau", "PowerPoint"],
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
                liveUrl: "https://github.com/Hawu87/Sales_Data_Analysis"
              }
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="rounded-3xl border border-border bg-card overflow-hidden hover:shadow-lg transition-all"
              >
                {/* Image section - clickable if detailPage exists */}
                {project.detailPage ? (
                  <Link href={project.detailPage} className="block">
                    <div className="relative h-48">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>
                ) : (
                  <div className="relative h-48">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="p-6">
                  {/* Title and metadata - clickable if detailPage exists */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      {project.detailPage ? (
                        <Link href={project.detailPage} className="block hover:opacity-80 transition-opacity">
                          <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                        </Link>
                      ) : (
                        <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                      )}
                      {project.role && (
                        <p className="text-sm text-muted-foreground">{project.role} • {project.date}</p>
                      )}
                      {!project.role && project.date && (
                        <p className="text-sm text-muted-foreground">{project.date}</p>
                      )}
                      {project.tagline && (
                        <p className="text-sm text-muted-foreground mt-1 italic">{project.tagline}</p>
                      )}
                      {project.team && <p className="text-sm text-muted-foreground">{project.team}</p>}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {/* Action buttons - separate from card link */}
                  <div className="flex gap-3">
                    {project.detailPage && (
                      <Link href={project.detailPage}>
                        <Button variant="outline" size="sm">
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant={project.detailPage ? "default" : "outline"} size="sm">
                          {project.detailPage ? "Live Demo" : "View Project"}
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Leadership & Involvement
          </motion.h2>
          <div className="space-y-6">
            {[
              {
                role: "Captain",
                organization: "Honda All-Star Campus Challenge",
                period: "Nov 2022 – Present",
                highlights: [
                  "Captained a 4-member QuizBowl team → reached 2023 nationals",
                  "Led recruitment via flyers & strategy → 10+ new members"
                ]
              },
              {
                role: "Vice Chair",
                organization: "Association for Computing Machinery",
                period: "Aug 2024 – Present",
                highlights: [
                  "Organizes bi-weekly meetings for 15+ members",
                  "Coordinates alumni guest speakers, technical interview prep sessions",
                  "Leads resume workshops & feedback sessions"
                ]
              }
            ].map((item, index) => (
              <motion.div
                key={item.organization}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-3xl border border-border bg-card hover:shadow-lg transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{item.organization}</h3>
                    <p className="text-primary font-medium">{item.role}</p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 md:mt-0">{item.period}</p>
                </div>
                <ul className="space-y-2">
                  {item.highlights.map((highlight, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Skills & Toolbox
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                category: "Languages",
                skills: ["C++", "Python", "JavaScript", "HTML & CSS", "SQL", "R"]
              },
              {
                category: "Data & Analytics",
                skills: ["Tableau", "R", "Excel", "Google Analytics", "Amplitude", "Julia"]
              },
              {
                category: "Product & Collaboration",
                skills: ["Git", "GitHub", "Figma", "JIRA", "Smartsheet", "Laserfiche", "Lucidchart", "Microsoft Suite"]
              },
              {
                category: "Core Skills",
                skills: ["Agile development", "UX analysis", "Usability testing", "Design thinking", "Backlog prioritization"]
              }
            ].map((group, index) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-3xl border border-border bg-card"
              >
                <h3 className="text-lg font-bold mb-4">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Let&apos;s Talk</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              I&apos;m open to connecting with recruiters, collaborators, and teams for internships, product roles, or exciting projects.
              Feel free to reach out!
            </p>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a href="mailto:hawundlovu57@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
                      hawundlovu57@gmail.com
                    </a>
                  </div>
                </div>
            
                
                <div className="flex gap-4 pt-4">
                  <Button variant="outline" size="lg" asChild>
                    <a href="https://github.com/Hawu87" target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Portfolio
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href="https://www.linkedin.com/in/hawulethu" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </a>
                  </Button>
                </div>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your Message"
                    className="min-h-[120px]"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                
                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <p className="text-sm">{submitMessage}</p>
                  </motion.div>
                )}
                
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <p className="text-sm">{submitMessage}</p>
                  </motion.div>
                )}
                
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Hawulethu Ndlovu. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/hawulethu"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <Linkedin className="w-5 h-5 text-muted-foreground hover:text-foreground" />
              </a>
              <a
                href="https://github.com/Hawu87"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <Github className="w-5 h-5 text-muted-foreground hover:text-foreground" />
              </a>
              <a
                href="mailto:hawundlovu57@gmail.com"
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <Mail className="w-5 h-5 text-muted-foreground hover:text-foreground" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

