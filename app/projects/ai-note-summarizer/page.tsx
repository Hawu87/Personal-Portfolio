"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ExternalLink, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function AINoteSummarizerPage() {
  const techStack = [
    "Next.js",
    "TypeScript",
    "Tailwind",
    "shadcn/ui",
    "Supabase",
    "OpenAI",
    "Vercel"
  ]

  const features = [
    "Email/password auth with Supabase",
    "Notes are private per user (RLS)",
    "One-click AI summaries",
    "Clean dashboard with recent notes",
    "Dark/light mode UI"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8">
        <Link href="/#projects">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            AI Note Summarizer
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Create notes, summarize with AI, and keep everything private per user.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" asChild>
              <a
                href="https://ai-notes-summarizer-alpha.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Screenshot Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="relative h-64 md:h-96 rounded-3xl border border-border bg-muted/30 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground text-lg mb-2">AI Note Summarizer</p>
                <p className="text-muted-foreground/70 text-sm">Screenshot placeholder</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Features</h2>
          <div className="bg-card rounded-3xl border border-border p-8">
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1 flex-shrink-0">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-lg text-muted-foreground">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* Tech Stack Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Tech Stack</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {techStack.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.section>

        {/* Build Notes Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">What I Built</h2>
          <div className="bg-card rounded-3xl border border-border p-8">
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              AI Note Summarizer is a full-stack web application that enables users to create, 
              organize, and summarize notes using AI. I built this to explore modern web development 
              practices and integrate AI capabilities into a user-friendly interface.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Key challenges I solved included implementing secure authentication with Supabase, 
              setting up Row Level Security (RLS) policies to ensure user data privacy, integrating 
              OpenAI&apos;s API for intelligent note summarization, and creating a responsive, 
              accessible UI with dark/light mode support using shadcn/ui components.
            </p>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="bg-card rounded-3xl border border-border p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to try it out?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Experience the AI Note Summarizer for yourself.
            </p>
            <Button size="lg" asChild>
              <a
                href="https://ai-notes-summarizer-alpha.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Try the App
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </motion.section>
      </section>
    </div>
  )
}

