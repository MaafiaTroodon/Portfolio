"use client";

import { HomeHero } from "@/components/sections/HomeHero";
import { AboutBlocks } from "@/components/sections/AboutBlocks";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { ContactForm } from "@/components/sections/ContactForm";
import { CommandK } from "@/components/shared/CommandK";
import { ResumeSection } from "@/components/sections/ResumeSection";

export default function HomePage() {
  return (
    <>
      <CommandK />
      <div className="relative">
        <section id="home" className="min-h-screen">
          <HomeHero />
        </section>
        
        <section id="about" className="min-h-screen py-24 px-4">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
              About Me
            </h2>
            <AboutBlocks />
          </div>
        </section>
        
        <section id="projects" className="min-h-screen py-24 px-4 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
              Projects
            </h2>
            <ProjectsGrid />
          </div>
        </section>
        
        <section id="resume" className="min-h-screen py-24 px-4">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ResumeSection />
          </div>
        </section>
        
        <section id="contact" className="min-h-screen py-24 px-4 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <ContactForm />
          </div>
        </section>
      </div>
    </>
  );
}
