import React, { useEffect } from 'react';
import Lenis from 'lenis';

import CustomCursor from '../components/landing/CustomCursor';
import LandingNavbar from '../components/landing/LandingNavbar';
import LandingHero from '../components/landing/LandingHero';
import AnimatedStatsSection from '../components/landing/AnimatedStatsSection';
import LandingProblemSection from '../components/landing/LandingProblemSection';
import LandingSolutionFlow from '../components/landing/LandingSolutionFlow';
import LandingThreePillars from '../components/landing/LandingThreePillars';
import InteractiveMetroCanvas from '../components/landing/InteractiveMetroCanvas';
import HorizontalModulesScroll from '../components/landing/HorizontalModulesScroll';
import AwwwardsBentoGrid from '../components/landing/AwwwardsBentoGrid';
import LiveDeviceMockup from '../components/landing/LiveDeviceMockup';
import InteractiveAIPromptShowcase from '../components/landing/InteractiveAIPromptShowcase';
import CinematicScrollStory from '../components/landing/CinematicScrollStory';
import LandingClosingSection from '../components/landing/LandingClosingSection';
import AwwwardsFooter from '../components/landing/AwwwardsFooter';
import InteractiveParticlesCanvas from '../components/landing/InteractiveParticlesCanvas';

export default function LandingPageView({ onLaunchWorkspace }) {
  useEffect(() => {
    // Initialize Lenis Smooth Scroll Engine
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-purple-500/40 selection:text-white font-sans overflow-x-hidden bg-grid-cyber animate-fade-in">
      {/* 60 FPS HTML5 Dynamic Kinetic Particle Canvas Background */}
      <InteractiveParticlesCanvas />

      {/* Multi-Layered Animated Ambient Color Light Spheres */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[800px] h-[800px] bg-purple-500/20 rounded-full blur-[160px] animate-float-orb" />
        <div className="absolute top-[35%] right-[-5%] w-[900px] h-[900px] bg-cyan-500/20 rounded-full blur-[180px] animate-float-orb" style={{ animationDelay: '5s' }} />
        <div className="absolute bottom-[-10%] left-[20%] w-[950px] h-[950px] bg-fuchsia-500/15 rounded-full blur-[190px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10">
        {/* Interactive Custom Magnetic Trailing Cursor */}
        <CustomCursor />

        {/* Floating Glass Navbar */}
        <LandingNavbar onLaunchWorkspace={onLaunchWorkspace} />

        {/* Hero Section */}
        <div id="hero">
          <LandingHero onLaunchWorkspace={onLaunchWorkspace} />
        </div>

        {/* Animated Metrics Bar */}
        <div id="stats">
          <AnimatedStatsSection />
        </div>

        {/* Part 2: The Problem */}
        <div id="problem">
          <LandingProblemSection />
        </div>

        {/* Part 3: From Document to Decision */}
        <div id="solution">
          <LandingSolutionFlow onLaunchWorkspace={onLaunchWorkspace} />
        </div>

        {/* Part 4: The Three Core Workspaces */}
        <div id="pillars">
          <LandingThreePillars onLaunchWorkspace={onLaunchWorkspace} />
        </div>

        {/* Metro Interactive Canvas Node Network */}
        <div id="canvas">
          <InteractiveMetroCanvas onLaunchWorkspace={onLaunchWorkspace} />
        </div>

        {/* Horizontal Modules Scroll */}
        <div id="modules">
          <HorizontalModulesScroll onLaunchWorkspace={onLaunchWorkspace} />
        </div>

        {/* Bento Grid Features */}
        <div id="bento">
          <AwwwardsBentoGrid onLaunchWorkspace={onLaunchWorkspace} />
        </div>

        {/* Live Interactive UI Device Mockup */}
        <div id="mockup">
          <LiveDeviceMockup onLaunchWorkspace={onLaunchWorkspace} />
        </div>

        {/* Multilingual RAG Intelligence Prompt Showcase */}
        <div id="rag">
          <InteractiveAIPromptShowcase onLaunchWorkspace={onLaunchWorkspace} />
        </div>

        {/* Cinematic Scroll Story */}
        <div id="story">
          <CinematicScrollStory onLaunchWorkspace={onLaunchWorkspace} />
        </div>

        {/* Final Closing Statement & CTA */}
        <div id="closing">
          <LandingClosingSection onLaunchWorkspace={onLaunchWorkspace} />
        </div>

        {/* Premium WebGL Kinetic Footer */}
        <AwwwardsFooter onLaunchWorkspace={onLaunchWorkspace} />
      </div>
    </div>
  );
}
