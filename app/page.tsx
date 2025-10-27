"use client";

import { HomeHero } from "@/components/sections/HomeHero";
import { AboutBlocks } from "@/components/sections/AboutBlocks";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { ContactForm } from "@/components/sections/ContactForm";
import { CommandK } from "@/components/shared/CommandK";
import { ResumeSection } from "@/components/sections/ResumeSection";
import Reveal from "@/components/motion/Reveal";

export default function HomePage() {
  return (
    <>
      <CommandK />
      <div className="relative">
        <section id="home" className="min-h-screen">
          <HomeHero />
        </section>
        
        <section id="about" className="min-h-screen py-24 px-4 content-backdrop">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center">
                About Me
              </h2>
            </Reveal>
            <AboutBlocks />
          </div>
        </section>
        
        <section id="projects" className="min-h-screen py-24 px-4 content-backdrop">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center">
                Projects
              </h2>
            </Reveal>
            <ProjectsGrid />
          </div>
        </section>
        
        <section id="resume" className="min-h-screen py-24 px-4 content-backdrop">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ResumeSection />
          </div>
        </section>
        
        <section id="contact" className="min-h-screen py-24 px-4 content-backdrop">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center">
                Get In Touch
              </h2>
            </Reveal>
            <ContactForm />
          </div>
        </section>
      </div>
    </>
  );
}
