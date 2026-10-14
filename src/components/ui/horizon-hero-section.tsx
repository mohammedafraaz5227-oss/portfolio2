// HeroSection.jsx / horizon-hero-section.tsx
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { Mail, ArrowDown, Sparkles, Bot, Orbit, FileText, Calendar } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/social-icons';
import DisplayCards, { type DisplayCardProps } from '@/components/ui/display-cards';
import { Secret } from '@/components/ui/hover-text-reveal-1';
import { portfolioData } from '@/data/portfolio';

gsap.registerPlugin(ScrollTrigger);

interface ThreeRefs {
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
  composer: EffectComposer | null;
  stars: THREE.Points[];
  nebula: THREE.Mesh | null;
  mountains: THREE.Mesh[];
  animationId: number | null;
  targetCameraX?: number;
  targetCameraY?: number;
  targetCameraZ?: number;
  locations?: number[];
}

const projectDisplayCards: DisplayCardProps[] = [
  {
    className:
      "[grid-area:stack] -translate-x-6 sm:-translate-x-12 -translate-y-7 sm:-translate-y-9 hover:-translate-y-12 hover:scale-105 hover:z-50 z-10",
    icon: <Bot className="size-4 text-cyan-400" />,
    title: "Student Chaos Dossier",
    description: "Interactive broadsheet dossier & kinetic AI challenge dashboard engineered for IEEE Day.",
    date: "IEEE AI Challenge",
    href: "https://chaos-rho-lovat.vercel.app/",
    tag: "Next.js · AI",
    titleClassName: "text-cyan-200",
  },
  {
    className:
      "[grid-area:stack] -translate-x-2 sm:-translate-x-4 -translate-y-2 sm:-translate-y-3 hover:-translate-y-6 hover:scale-105 hover:z-50 z-20",
    icon: <Orbit className="size-4 text-cyan-400" />,
    title: "Cosmic Explorer",
    description: "Immersive 3D solar system with Three.js real-time orbital physics & AI astronomy assistant.",
    date: "Three.js · WebGL",
    href: "https://cosmic-explorer-ten.vercel.app/",
    tag: "3D Universe",
    titleClassName: "text-cyan-200",
  },
  {
    className:
      "[grid-area:stack] translate-x-2 sm:translate-x-4 translate-y-3 sm:translate-y-3 hover:translate-y-0 hover:scale-105 hover:z-50 z-30",
    icon: <FileText className="size-4 text-cyan-400" />,
    title: "ResumeIQ",
    description: "Intelligent AI resume analyzer parsing PDFs, scoring ATS matches & actionable rewrites.",
    date: "React · NLP",
    href: "https://mohammedafraaz5227-oss.github.io/resume-analyzer/",
    tag: "AI Tool",
    titleClassName: "text-cyan-200",
  },
  {
    className:
      "[grid-area:stack] translate-x-6 sm:translate-x-12 translate-y-8 sm:translate-y-9 hover:translate-y-6 hover:scale-105 hover:z-50 z-40",
    icon: <Calendar className="size-4 text-cyan-400" />,
    title: "SmileCare Dental",
    description: "Modern clinical landing page with online booking, WhatsApp confirmation & admin dashboard.",
    date: "Web Platform",
    href: "https://dentaldemo-theta.vercel.app/",
    tag: "Client Demo",
    titleClassName: "text-cyan-200",
  },
];


export const Component = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);

  const smoothCameraPos = useRef({ x: 0, y: 30, z: 100 });
  
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(1);
  const [isReady, setIsReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const totalSections = 3;
  
  const threeRefs = useRef<ThreeRefs>({
    scene: null,
    camera: null,
    renderer: null,
    composer: null,
    stars: [],
    nebula: null,
    mountains: [],
    animationId: null
  });

  // Initialize Three.js - Exactly preserving the cosmic landing page animation
  useEffect(() => {
    const { current: refs } = threeRefs;

    const createStarField = () => {
      if (!refs.scene) return;
      const starCount = 5000;
      
      for (let i = 0; i < 3; i++) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);

        for (let j = 0; j < starCount; j++) {
          const radius = 200 + Math.random() * 800;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(Math.random() * 2 - 1);

          positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
          positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[j * 3 + 2] = radius * Math.cos(phi);

          // Color variation matching deep space cosmic aesthetic
          const color = new THREE.Color();
          const colorChoice = Math.random();
          if (colorChoice < 0.7) {
            color.setHSL(0, 0, 0.8 + Math.random() * 0.2);
          } else if (colorChoice < 0.9) {
            color.setHSL(0.08, 0.5, 0.8);
          } else {
            color.setHSL(0.6, 0.5, 0.8);
          }
          
          colors[j * 3] = color.r;
          colors[j * 3 + 1] = color.g;
          colors[j * 3 + 2] = color.b;

          sizes[j] = Math.random() * 2 + 0.5;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            depth: { value: i }
          },
          vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float time;
            uniform float depth;
            
            void main() {
              vColor = color;
              vec3 pos = position;
              
              // Slow rotation based on depth
              float angle = time * 0.05 * (1.0 - depth * 0.3);
              mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
              pos.xy = rot * pos.xy;
              
              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = size * (300.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            varying vec3 vColor;
            
            void main() {
              float dist = length(gl_PointCoord - vec2(0.5));
              if (dist > 0.5) discard;
              
              float opacity = 1.0 - smoothstep(0.0, 0.5, dist);
              gl_FragColor = vec4(vColor, opacity);
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });

        const stars = new THREE.Points(geometry, material);
        refs.scene.add(stars);
        refs.stars.push(stars);
      }
    };

    const createNebula = () => {
      if (!refs.scene) return;
      const geometry = new THREE.PlaneGeometry(8000, 4000, 100, 100);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color1: { value: new THREE.Color(0x0033ff) },
          color2: { value: new THREE.Color(0xff0066) },
          opacity: { value: 0.3 }
        },
        vertexShader: `
          varying vec2 vUv;
          varying float vElevation;
          uniform float time;
          
          void main() {
            vUv = uv;
            vec3 pos = position;
            
            float elevation = sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 20.0;
            pos.z += elevation;
            vElevation = elevation;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float opacity;
          uniform float time;
          varying vec2 vUv;
          varying float vElevation;
          
          void main() {
            float mixFactor = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time);
            vec3 color = mix(color1, color2, mixFactor * 0.5 + 0.5);
            
            float alpha = opacity * (1.0 - length(vUv - 0.5) * 2.0);
            alpha *= 1.0 + vElevation * 0.01;
            
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false
      });

      const nebula = new THREE.Mesh(geometry, material);
      nebula.position.z = -1050;
      nebula.rotation.x = 0;
      refs.scene.add(nebula);
      refs.nebula = nebula;
    };

    const createMountains = () => {
      if (!refs.scene) return;
      const layers = [
        { distance: -50, height: 60, color: 0x1a1a2e, opacity: 1 },
        { distance: -100, height: 80, color: 0x16213e, opacity: 0.8 },
        { distance: -150, height: 100, color: 0x0f3460, opacity: 0.6 },
        { distance: -200, height: 120, color: 0x0a4668, opacity: 0.4 }
      ];

      layers.forEach((layer, index) => {
        const points = [];
        const segments = 50;
        
        for (let i = 0; i <= segments; i++) {
          const x = (i / segments - 0.5) * 1000;
          const y = Math.sin(i * 0.1) * layer.height + 
                   Math.sin(i * 0.05) * layer.height * 0.5 +
                   Math.random() * layer.height * 0.2 - 100;
          points.push(new THREE.Vector2(x, y));
        }
        
        points.push(new THREE.Vector2(5000, -300));
        points.push(new THREE.Vector2(-5000, -300));

        const shape = new THREE.Shape(points);
        const geometry = new THREE.ShapeGeometry(shape);
        const material = new THREE.MeshBasicMaterial({
          color: layer.color,
          transparent: true,
          opacity: layer.opacity,
          side: THREE.DoubleSide
        });

        const mountain = new THREE.Mesh(geometry, material);
        mountain.position.z = layer.distance;
        mountain.position.y = layer.distance;
        mountain.userData = { baseZ: layer.distance, index };
        if (refs.scene) {
          refs.scene.add(mountain);
        }
        refs.mountains.push(mountain);
      });
    };

    const createAtmosphere = () => {
      if (!refs.scene) return;
      const geometry = new THREE.SphereGeometry(600, 32, 32);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 }
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          uniform float time;
          
          void main() {
            float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            vec3 atmosphere = vec3(0.3, 0.6, 1.0) * intensity;
            
            float pulse = sin(time * 2.0) * 0.1 + 0.9;
            atmosphere *= pulse;
            
            gl_FragColor = vec4(atmosphere, intensity * 0.25);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
      });

      const atmosphere = new THREE.Mesh(geometry, material);
      refs.scene.add(atmosphere);
    };

    const getLocation = () => {
      const locations: number[] = [];
      refs.mountains.forEach((mountain, i) => {
        locations[i] = mountain.position.z;
      });
      refs.locations = locations;
    };

    const animate = () => {
      refs.animationId = requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;

      // Update stars
      refs.stars.forEach((starField) => {
        const mat = starField.material as THREE.ShaderMaterial;
        if (mat.uniforms) {
          mat.uniforms.time.value = time;
        }
      });

      // Update nebula
      if (refs.nebula) {
        const mat = refs.nebula.material as THREE.ShaderMaterial;
        if (mat.uniforms) {
          mat.uniforms.time.value = time * 0.5;
        }
      }

      // Smooth camera movement with easing
      if (refs.camera && refs.targetCameraX !== undefined) {
        const smoothingFactor = 0.05; // Lower = smoother but slower
        
        smoothCameraPos.current.x += (refs.targetCameraX - smoothCameraPos.current.x) * smoothingFactor;
        smoothCameraPos.current.y += ((refs.targetCameraY ?? 30) - smoothCameraPos.current.y) * smoothingFactor;
        smoothCameraPos.current.z += ((refs.targetCameraZ ?? 100) - smoothCameraPos.current.z) * smoothingFactor;
        
        // Add subtle floating motion
        const floatX = Math.sin(time * 0.1) * 2;
        const floatY = Math.cos(time * 0.15) * 1;
        
        refs.camera.position.x = smoothCameraPos.current.x + floatX;
        refs.camera.position.y = smoothCameraPos.current.y + floatY;
        refs.camera.position.z = smoothCameraPos.current.z;
        refs.camera.lookAt(0, 10, -600);
      }

      // Parallax mountains with subtle animation
      refs.mountains.forEach((mountain, i) => {
        const parallaxFactor = 1 + i * 0.5;
        mountain.position.x = Math.sin(time * 0.1) * 2 * parallaxFactor;
        mountain.position.y = 50 + (Math.cos(time * 0.15) * 1 * parallaxFactor);
      });

      if (refs.composer) {
        refs.composer.render();
      }
    };

    const initThree = () => {
      if (!canvasRef.current) return;
      
      refs.scene = new THREE.Scene();
      refs.scene.fog = new THREE.FogExp2(0x000000, 0.00025);

      refs.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
      );
      refs.camera.position.z = 100;
      refs.camera.position.y = 20;

      refs.renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true
      });
      refs.renderer.setSize(window.innerWidth, window.innerHeight);
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      refs.renderer.toneMappingExposure = 0.55;

      refs.composer = new EffectComposer(refs.renderer);
      const renderPass = new RenderPass(refs.scene, refs.camera);
      refs.composer.addPass(renderPass);

      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.8,
        0.4,
        0.85
      );
      refs.composer.addPass(bloomPass);

      createStarField();
      createNebula();
      createMountains();
      createAtmosphere();
      getLocation();

      animate();
      setIsReady(true);
    };

    initThree();

    const handleResize = () => {
      if (refs.camera && refs.renderer && refs.composer) {
        refs.camera.aspect = window.innerWidth / window.innerHeight;
        refs.camera.updateProjectionMatrix();
        refs.renderer.setSize(window.innerWidth, window.innerHeight);
        refs.composer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (refs.animationId) {
        cancelAnimationFrame(refs.animationId);
      }

      window.removeEventListener('resize', handleResize);

      refs.stars.forEach(starField => {
        starField.geometry.dispose();
        if (Array.isArray(starField.material)) {
          starField.material.forEach(m => m.dispose());
        } else {
          starField.material.dispose();
        }
      });

      refs.mountains.forEach(mountain => {
        mountain.geometry.dispose();
        if (Array.isArray(mountain.material)) {
          mountain.material.forEach(m => m.dispose());
        } else {
          mountain.material.dispose();
        }
      });

      if (refs.nebula) {
        refs.nebula.geometry.dispose();
        if (Array.isArray(refs.nebula.material)) {
          refs.nebula.material.forEach(m => m.dispose());
        } else {
          refs.nebula.material.dispose();
        }
      }

      if (refs.renderer) {
        refs.renderer.dispose();
      }
    };
  }, []);

  // GSAP Animations - Entrance effect for hero
  useEffect(() => {
    if (!isReady) return;
    
    gsap.set([menuRef.current, titleRef.current, subtitleRef.current, scrollProgressRef.current, actionRef.current], {
      visibility: 'visible'
    });

    const tl = gsap.timeline();

    if (menuRef.current) {
      tl.from(menuRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    }

    if (titleRef.current) {
      const titleChars = titleRef.current.querySelectorAll('.title-char');
      tl.from(titleChars, {
        y: 180,
        opacity: 0,
        duration: 1.4,
        stagger: 0.04,
        ease: "power4.out"
      }, "-=0.5");
    }

    if (subtitleRef.current) {
      const subtitleLines = subtitleRef.current.querySelectorAll('.subtitle-line');
      tl.from(subtitleLines, {
        y: 45,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      }, "-=0.7");
    }

    if (actionRef.current) {
      tl.from(actionRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: "power2.out"
      }, "-=0.5");
    }

    if (scrollProgressRef.current) {
      tl.from(scrollProgressRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out"
      }, "-=0.5");
    }

    return () => {
      tl.kill();
    };
  }, [isReady]);

  // Scroll handling across the 3 sections with camera progression
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const maxScroll = Math.max(documentHeight - windowHeight, 1);
      const progress = Math.min(scrollY / maxScroll, 1);
      
      setScrollProgress(progress);
      const newSection = Math.min(Math.floor(progress * totalSections) + 1, totalSections);
      setCurrentSection(newSection);

      const { current: refs } = threeRefs;
      
      const totalProgress = progress * (totalSections - 1);
      const sectionProgress = totalProgress % 1;
      const sectionIndex = Math.floor(totalProgress);
      
      // Camera positions for the 3 distinct phases
      const cameraPositions = [
        { x: 0, y: 30, z: 300 },    // Section 1 - AFRAAZ HERO
        { x: 0, y: 40, z: -50 },     // Section 2 - SELECTED PROJECTS
        { x: 0, y: 50, z: -700 }     // Section 3 - CONNECT & CONTACT
      ];
      
      const currentPos = cameraPositions[sectionIndex] || cameraPositions[0];
      const nextPos = cameraPositions[sectionIndex + 1] || currentPos;
      
      refs.targetCameraX = currentPos.x + (nextPos.x - currentPos.x) * sectionProgress;
      refs.targetCameraY = currentPos.y + (nextPos.y - currentPos.y) * sectionProgress;
      refs.targetCameraZ = currentPos.z + (nextPos.z - currentPos.z) * sectionProgress;
      
      // Parallax for mountains
      refs.mountains.forEach((mountain, i) => {
        const speed = 1 + i * 0.9;
        const targetZ = mountain.userData.baseZ + scrollY * speed * 0.5;
        if (refs.nebula) {
          refs.nebula.position.z = (targetZ + progress * speed * 0.01) - 100;
        }
        
        mountain.userData.targetZ = targetZ;
        if (progress > 0.7) {
          mountain.position.z = 600000;
        } else if (refs.locations) {
          mountain.position.z = refs.locations[i];
        }
      });

      if (refs.nebula && refs.mountains[3]) {
        refs.nebula.position.z = refs.mountains[3].position.z;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    const rafId = requestAnimationFrame(handleScroll);
    
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [totalSections]);

  const splitTitle = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="title-char">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  const scrollToPhase = (phaseIndex: number) => {
    setMenuOpen(false);
    const windowHeight = window.innerHeight;
    const targetY = phaseIndex * windowHeight;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="hero-container cosmos-style relative bg-black text-white selection:bg-cyan-500/30">
      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="hero-canvas" />
      
      {/* Side Menu & Quick Navigation */}
      <div ref={menuRef} className="side-menu" style={{ visibility: 'hidden' }}>
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="menu-icon p-2 focus:outline-none"
          aria-label="Navigation Menu"
        >
          <span className={`transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`}></span>
          <span className={`transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
        </button>
        <div className="vertical-text">AFRAAZ · 2026</div>
      </div>

      {/* Side Menu Drawer Dropdown */}
      {menuOpen && (
        <div className="fixed top-24 left-16 z-50 p-6 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl space-y-4 animate-in fade-in slide-in-from-left-4">
          <div className="font-mono text-[10px] text-cyan-400 tracking-widest uppercase">
            Quick Jump
          </div>
          <button 
            onClick={() => scrollToPhase(0)}
            className="block text-left text-sm font-semibold hover:text-cyan-300 transition-colors"
          >
            01 / AFRAAZ
          </button>
          <button 
            onClick={() => scrollToPhase(1)}
            className="block text-left text-sm font-semibold hover:text-cyan-300 transition-colors"
          >
            02 / PROJECTS
          </button>
          <button 
            onClick={() => scrollToPhase(2)}
            className="block text-left text-sm font-semibold hover:text-cyan-300 transition-colors"
          >
            03 / CONNECT
          </button>
        </div>
      )}

      {/* SECTION 1: AFRAAZ HERO */}
      <div className="hero-content cosmos-content min-h-screen flex flex-col justify-center items-center text-center px-6 relative z-10">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 backdrop-blur-md mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-xs text-cyan-200 tracking-wider">
            {portfolioData.personal.availability}
          </span>
        </div>

        {/* Name — Afraaz as the Main Centerpiece */}
        <h1 ref={titleRef} className="hero-title">
          {splitTitle(portfolioData.personal.name)}
        </h1>
        
        {/* Subtitle — Authentic Profession and Philosophy */}
        <div ref={subtitleRef} className="hero-subtitle cosmos-subtitle mb-8">
          <p className="subtitle-line font-medium text-white/95 text-lg md:text-xl">
            {portfolioData.personal.headline}
          </p>
          <p className="subtitle-line text-sm md:text-base text-gray-400 max-w-xl mx-auto mt-2">
            {portfolioData.personal.tagline}
          </p>
        </div>

        {/* Hero Actions */}
        <div ref={actionRef} className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => scrollToPhase(1)}
            className="group px-7 py-3 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 text-sm font-medium tracking-wide transition-all hover:bg-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] flex items-center gap-2"
          >
            <span>Explore Work</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={() => scrollToPhase(2)}
            className="px-7 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm font-medium tracking-wide transition-all hover:bg-white/10 hover:text-white"
          >
            <span>Get in Touch</span>
          </button>
        </div>
      </div>

      {/* SECTION 2 & 3: SCROLL-DRIVEN CHAPTERS */}
      <div className="scroll-sections relative z-10">
        {/* SECTION 2: SELECTED PROJECTS */}
        <section className="content-section min-h-screen flex flex-col items-center justify-center text-center px-6 py-20">
          <div className="max-w-5xl mx-auto w-full">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 tracking-widest uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Phase 02 — Portfolio</span>
            </div>

            <h2 className="hero-title mb-6 w-full flex justify-center items-center text-center">
              {splitTitle('FEATURED WORK')}
            </h2>

            <div className="hero-subtitle cosmos-subtitle max-w-2xl mx-auto mb-12">
              <p className="subtitle-line font-medium text-white/90 text-base md:text-lg">
                Interactive 3D environments, AI tools & full-stack web applications
              </p>
              <p className="subtitle-line text-xs md:text-sm text-cyan-200/70 mt-1">
                Every project is crafted with high-performance WebGL, real-time shaders, and production-grade code
              </p>
            </div>

            {/* Skewed Transparent Glass DisplayCards */}
            <div className="w-full flex flex-col justify-center items-center py-4">
              <div className="relative flex items-center justify-center w-full min-h-[260px] sm:min-h-[290px] py-4">
                <DisplayCards cards={projectDisplayCards} />
              </div>
              <p className="mt-6 font-mono text-xs text-cyan-300/80 flex items-center justify-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>Click any card to launch deployment in a new tab ↗</span>
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: CONNECT & DIRECT LINKS */}
        <section className="content-section min-h-screen flex flex-col items-center justify-center text-center px-4 py-20 w-full overflow-hidden">
          <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 tracking-widest uppercase mb-4">
              <span>Phase 03 — Collaboration</span>
            </div>

            <h2 className="hero-title mb-6 w-full flex justify-center items-center text-center">
              {splitTitle('CONNECT')}
            </h2>

            <div className="hero-subtitle cosmos-subtitle max-w-xl mx-auto mb-10 text-center">
              <p className="subtitle-line font-medium text-white/95 text-lg md:text-xl">
                Have an ambitious idea or digital experience to build?
              </p>
              <p className="subtitle-line text-sm text-gray-400 mt-2">
                Let's turn vision into cinematic reality across 3D, code & storytelling.
              </p>
            </div>

            {/* Redesigned Reach Out Card with Hover Text Reveal */}
            <div className="max-w-2xl w-full mx-auto space-y-5">
              <div
                onClick={() => {
                  window.location.href = `mailto:${portfolioData.personal.email}`;
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    window.location.href = `mailto:${portfolioData.personal.email}`;
                  }
                }}
                role="button"
                tabIndex={0}
                className="block group cursor-pointer focus:outline-none"
                title="Click to send an email"
              >
                <div className="relative">
                  <div className="absolute -top-3 left-6 z-10 px-3 py-0.5 rounded-full bg-cyan-950/90 border border-cyan-400/40 text-[10px] font-mono text-cyan-300 uppercase tracking-widest flex items-center gap-1.5 shadow-lg pointer-events-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span>Hover to Reveal · Click to Email</span>
                  </div>
                  <Secret
                    items={["LET'S", "CONNECT"]}
                    className="cursor-pointer group-hover:border-cyan-400/70 group-hover:shadow-[0_0_40px_rgba(6,182,212,0.35)] transition-all"
                  />
                </div>
              </div>

              {/* Direct email address & Social channels */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#020813]/70 backdrop-blur-xl border border-cyan-500/20 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  className="font-mono text-sm sm:text-base text-cyan-300 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <Mail className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span>{portfolioData.personal.email}</span>
                </a>

                <div className="flex items-center gap-3">
                  <a
                    href="https://www.linkedin.com/in/mohammed-afraaz-4b9416344/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-cyan-400/40 hover:bg-white/10 transition-all flex items-center gap-2 text-xs font-mono"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5 text-cyan-400" />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href="https://github.com/mohammedafraaz5227-oss"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-cyan-400/40 hover:bg-white/10 transition-all flex items-center gap-2 text-xs font-mono"
                  >
                    <GithubIcon className="w-3.5 h-3.5 text-cyan-400" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>

            <p className="font-mono text-[11px] text-gray-600 mt-12">
              {portfolioData.personal.copyright}
            </p>
          </div>
        </section>
      </div>

      {/* Live Scroll Progress Track & Section Counter */}
      <div ref={scrollProgressRef} className="scroll-progress" style={{ visibility: 'hidden' }}>
        <div className="scroll-text">SCROLL</div>
        <div className="progress-track">
          <div 
            className="progress-fill" 
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
        <div className="section-counter">
          {String(currentSection).padStart(2, '0')} / {String(totalSections).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};

export default Component;
