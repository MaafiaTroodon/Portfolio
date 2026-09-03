"use client";

import { HomeHero } from "@/components/sections/HomeHero";
import { AboutBlocks } from "@/components/sections/AboutBlocks";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { ContactForm } from "@/components/sections/ContactForm";
import { CommandK } from "@/components/shared/CommandK";
import { ResumeSection } from "@/components/sections/ResumeSection";
import { BeyondScreen } from "@/components/sections/BeyondScreen";
import Reveal from "@/components/motion/Reveal";

export default function HomePage() {
  return (
    <>
      <CommandK />
      <div className="relative">
        <section id="home" className="min-h-screen">
          <HomeHero />
        </section>
        
        <section id="about" className="content-backdrop scroll-mt-16 px-4 py-20 sm:py-24">
          <div className="container mx-auto px-0 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="mb-14 text-center text-4xl font-bold sm:text-5xl md:text-6xl">
                About Me
              </h2>
            </Reveal>
            <AboutBlocks />
          </div>
        </section>
        
        <section id="projects" className="content-backdrop min-h-screen scroll-mt-16 px-4 py-20 sm:py-24">
          <div className="container mx-auto px-0 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="mb-14 text-center text-4xl font-bold sm:text-5xl md:text-6xl">
                Projects
              </h2>
            </Reveal>
            <ProjectsGrid />
          </div>
        </section>

        <section id="beyond-screen" className="content-backdrop scroll-mt-16 px-4 py-20 sm:py-24">
          <div className="container mx-auto px-0 sm:px-6 lg:px-8">
            <Reveal>
              <BeyondScreen />
            </Reveal>
          </div>
        </section>
        
        <section id="resume" className="content-backdrop min-h-screen scroll-mt-16 px-4 py-20 sm:py-24">
          <div className="container mx-auto px-0 sm:px-6 lg:px-8">
            <ResumeSection />
          </div>
        </section>
        
        <section id="contact" className="content-backdrop min-h-screen scroll-mt-16 px-4 py-20 sm:py-24">
          <div className="container mx-auto px-0 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="mb-14 text-center text-4xl font-bold sm:text-5xl md:text-6xl">
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
