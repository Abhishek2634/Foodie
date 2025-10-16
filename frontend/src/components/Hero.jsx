// src/components/Hero.jsx

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './Hero.css'; // We will create this CSS file next

const Hero = () => {
  const canvasRef = useRef(null);

  // This useEffect hook will run only ONCE, after the component mounts.
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    // === ALL YOUR 3D-BACKGROUND.JS CODE GOES HERE ===

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current, // Target the canvas using the ref
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // 3. Objects (Particles)
    const particles = [];
    const geometry = new THREE.SphereGeometry(0.05, 16, 16);
    const material = new THREE.MeshStandardMaterial({
      color: 0xE63946, // The foodie-friendly red
      roughness: 0.4
    });
    for (let i = 0; i < 250; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(12));
      mesh.position.set(x, y, z);
      scene.add(mesh);
      particles.push(mesh);
    }

    // 4. Animation Loop
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      for (const particle of particles) {
        particle.position.y += Math.sin(elapsedTime + particle.position.x) * 0.001;
        particle.rotation.x += 0.002;
        particle.rotation.y += 0.002;
      }
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // 5. Handle Resizing
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // The empty array [] ensures this effect runs only once.

  return (
    <>
      {/* The canvas is now part of the component's JSX */}
      <canvas ref={canvasRef} id="three-js-canvas"></canvas>
      
      <section className="hero-container">
        <div className="hero-content">
          <div className="hero-main">
            <h1 className="hero-title">
              <span className="title-line-1">Discover & Create</span>
              <span className="title-line-2 gradient-text">Delicious Meals</span>
            </h1>
            <p className="hero-description">
              Join our community to find thousands of recipes, share your creations, and master the art of cooking.
            </p>
            <div className="hero-actions">
              <button className="cta-primary">
                <span>Explore Recipes</span>
                <div className="button-shine"></div>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;