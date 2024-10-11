import React, { useRef, useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    sceneRef.current = new THREE.Scene();
    cameraRef.current = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    rendererRef.current = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(rendererRef.current.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    sceneRef.current.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 10, 5);
    sceneRef.current.add(directionalLight);

    // Load animated characters
    const loader = new GLTFLoader();
    const characterPositions = [
      { x: -2, y: 0, z: -3 },
      { x: 0, y: 0, z: -4 },
      { x: 2, y: 0, z: -3 },
    ];

    characterPositions.forEach((position, index) => {
      loader.load(
        `/models/character${index + 1}.glb`,
        (gltf) => {
          const model = gltf.scene;
          model.position.set(position.x, position.y, position.z);
          model.scale.set(0.5, 0.5, 0.5);
          sceneRef.current?.add(model);

          // Animation
          const mixer = new THREE.AnimationMixer(model);
          const action = mixer.clipAction(gltf.animations[0]);
          action.play();

          // Update animation in render loop
          const animate = () => {
            requestAnimationFrame(animate);
            mixer.update(0.016);
          };
          animate();
        },
        undefined,
        (error) => console.error('An error occurred loading the model:', error)
      );
    });

    // Create flying technology icons
    const iconGeometry = new THREE.PlaneGeometry(0.5, 0.5);
    const iconMaterials = [
      new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('/icons/react.png'), transparent: true }),
      new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('/icons/nodejs.png'), transparent: true }),
      new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('/icons/python.png'), transparent: true }),
    ];

    const icons: THREE.Mesh[] = [];

    for (let i = 0; i < 15; i++) {
      const icon = new THREE.Mesh(iconGeometry, iconMaterials[i % iconMaterials.length]);
      icon.position.set(
        Math.random() * 10 - 5,
        Math.random() * 5 + 2,
        Math.random() * 5 - 10
      );
      sceneRef.current?.add(icon);
      icons.push(icon);
    }

    cameraRef.current.position.z = 5;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Animate flying icons
      icons.forEach((icon) => {
        icon.position.x += Math.sin(Date.now() * 0.001 + icon.position.y) * 0.01;
        icon.position.y += Math.cos(Date.now() * 0.002 + icon.position.x) * 0.01;
        icon.rotation.z += 0.01;
      });

      // Move icons based on mouse position
      icons.forEach((icon) => {
        icon.position.x += (mousePosition.x * 0.001 - icon.position.x) * 0.05;
        icon.position.y += (-mousePosition.y * 0.001 - icon.position.y) * 0.05;
      });

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    // Handle mouse move
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const headingAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 300,
  });

  const subheadingAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 600,
  });

  const buttonAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 900,
  });

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div ref={containerRef} className="absolute inset-0" />
      <div className="relative z-10 text-center text-white">
        <animated.h1 style={headingAnimation} className="text-5xl font-bold mb-4">
          Empowering Digital Transformation
        </animated.h1>
        <animated.p style={subheadingAnimation} className="text-xl mb-8">
          Custom Software Solutions for AI, IT Consulting, and More
        </animated.p>
        <animated.div style={buttonAnimation} className="space-x-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105">
            Get Started
          </button>
          <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-blue-600 transition-colors duration-300 flex items-center">
            Learn More
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </animated.div>
      </div>
    </div>
  );
};

export default HeroSection;