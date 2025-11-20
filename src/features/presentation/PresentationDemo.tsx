import { useEffect, useRef, useState, useCallback } from 'react';
import { Box } from '@mantine/core';
import { motion, useScroll, useSpring } from 'framer-motion';
import { PresentationHero } from './components/PresentationHero';
import { ExecutiveSummary } from './components/ExecutiveSummary';
import { TechStack } from './components/TechStack';
import { Architecture } from './components/Architecture';
import { FeaturesShowcase } from './components/FeaturesShowcase';
import { ProjectStructure } from './components/ProjectStructure';
import { CodeStandards } from './components/CodeStandards';
import { CallToAction } from './components/CallToAction';
import { FullscreenControls } from './components/FullscreenControls';
import { useFullscreen } from './hooks/useFullscreen';
import './styles/presentation.module.css';

export function PresentationDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const { enterFullscreen } = useFullscreen();
  const [currentSection, setCurrentSection] = useState(0);
  const sectionsRef = useRef<HTMLElement[]>([]);

  // Color alternado para cada slide
  const sectionColors = [
    'var(--mantine-color-primary-6)', // Hero - azul
    'var(--mantine-color-gray-0)', // Resumen - gris claro
    'var(--mantine-color-body)', // TechStack - body
    'var(--mantine-color-gray-0)', // Architecture - gris claro
    'var(--mantine-color-body)', // Features - body
    'var(--mantine-color-gray-0)', // Structure - gris claro
    'var(--mantine-color-body)', // Standards - body
    'var(--mantine-color-primary-6)', // CTA - azul
  ];

  useEffect(() => {
    // Enter fullscreen automatically when component mounts
    const timer = setTimeout(() => {
      if (containerRef.current) {
        enterFullscreen(containerRef.current);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [enterFullscreen]);

  useEffect(() => {
    // Get all sections
    if (containerRef.current) {
      const hero = containerRef.current.querySelector('[data-hero]') as HTMLElement;
      const sections = Array.from(
        containerRef.current.querySelectorAll('[data-section]')
      ) as HTMLElement[];
      sectionsRef.current = hero ? [hero, ...sections] : sections;
    }
  }, []);

  useEffect(() => {
    // Detect current section based on scroll position
    const handleScroll = () => {
      if (!containerRef.current || sectionsRef.current.length === 0) return;

      const container = containerRef.current;
      const scrollPosition = container.scrollTop + container.clientHeight / 2;

      for (let i = 0; i < sectionsRef.current.length; i++) {
        const section = sectionsRef.current[i];
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setCurrentSection(i);
          break;
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollToSection = useCallback((index: number) => {
    if (sectionsRef.current[index]) {
      sectionsRef.current[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
      setCurrentSection(index);
    }
  }, []);

  const scrollToNext = () => {
    scrollToSection(1);
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        const nextSection = Math.min(currentSection + 1, sectionsRef.current.length - 1);
        scrollToSection(nextSection);
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        const prevSection = Math.max(currentSection - 1, 0);
        scrollToSection(prevSection);
      }
    },
    [currentSection, scrollToSection]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <Box
      ref={containerRef}
      style={{
        width: '100vw',
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        position: 'relative',
        scrollBehavior: 'smooth',
        backgroundColor: 'var(--mantine-color-body)',
      }}
    >
      {/* Progress bar */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'var(--mantine-color-primary-6)',
          transformOrigin: '0%',
          zIndex: 9999,
          scaleX,
        }}
      />

      <FullscreenControls />

      <Box
        data-hero
        style={{
          backgroundColor: sectionColors[0],
        }}
      >
        <PresentationHero onScrollToNext={scrollToNext} />
      </Box>

      <Box
        data-section
        style={{
          backgroundColor: sectionColors[1],
        }}
      >
        <ExecutiveSummary />
      </Box>

      <Box
        data-section
        style={{
          backgroundColor: sectionColors[2],
        }}
      >
        <TechStack />
      </Box>

      <Box
        data-section
        style={{
          backgroundColor: sectionColors[3],
        }}
      >
        <Architecture />
      </Box>

      <Box
        data-section
        style={{
          backgroundColor: sectionColors[4],
        }}
      >
        <FeaturesShowcase />
      </Box>

      <Box
        data-section
        style={{
          backgroundColor: sectionColors[5],
        }}
      >
        <ProjectStructure />
      </Box>

      <Box
        data-section
        style={{
          backgroundColor: sectionColors[6],
        }}
      >
        <CodeStandards />
      </Box>

      <Box
        data-section
        style={{
          backgroundColor: sectionColors[7],
        }}
      >
        <CallToAction />
      </Box>
    </Box>
  );
}

