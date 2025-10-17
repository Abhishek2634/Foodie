// File: /js/3d-background.js

import * as THREE from 'three';
// Import the loader we defined in the importmap
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// --- SCENE, CAMERA, RENDERER ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15; // Move camera back to see the models

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#three-js-canvas'),
    antialias: true,
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


// --- LIGHTING (Crucial for 3D models) ---
// Good lighting makes the models look realistic.
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);


// --- MODEL LOADING ---
const loader = new GLTFLoader();
const foodItems = new THREE.Group(); // Use a Group to manage all models
scene.add(foodItems);

const modelsToLoad = [
    { url: '/assets/strawberry.glb', count: 12, scale: 0.5 },
    { url: '/assets/melon_slice.glb', count: 10, scale: 0.8 }
];

modelsToLoad.forEach(modelInfo => {
    // The URLs like '/assets/strawberry.glb' point to your `public` folder
    loader.load(modelInfo.url, (gltf) => {
        // We load the model once, then clone it for much better performance.
        for (let i = 0; i < modelInfo.count; i++) {
            const mesh = gltf.scene.clone();

            // Set a random position within a large 3D box
            mesh.position.set(
                (Math.random() - 0.5) * 30, // X position
                (Math.random() - 0.5) * 30, // Y position
                (Math.random() - 0.5) * 30  // Z position
            );

            // Set a random starting rotation
            mesh.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );

            // Set the scale, with a slight random variation for a more natural look
            const scale = modelInfo.scale * (0.9 + Math.random() * 0.2);
            mesh.scale.set(scale, scale, scale);

            foodItems.add(mesh); // Add the finished clone to our group
        }
    }, undefined, (error) => {
        console.error(`An error happened loading ${modelInfo.url}:`, error);
    });
});


// --- MOUSE INTERACTION (Parallax Effect) ---
const mouse = new THREE.Vector2();
window.addEventListener('mousemove', (event) => {
    // Normalize mouse position from -1 to 1 for both X and Y
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});


// --- ANIMATION LOOP ---
const clock = new THREE.Clock();
function animate() {
    const elapsedTime = clock.getElapsedTime();

    // Gently rotate the entire group of food items for a floaty effect
    foodItems.rotation.y = elapsedTime * 0.05;
    foodItems.rotation.x = elapsedTime * 0.05;
    
    // Move the camera slightly based on mouse position for a parallax effect
    // The "0.02" value creates a smooth, dampened movement
    camera.position.x += (mouse.x * 2 - camera.position.x) * 0.02;
    camera.position.y += (-mouse.y * 2 - camera.position.y) * 0.02;
    camera.lookAt(scene.position); // Ensure camera always looks at the center

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();


// --- HANDLE RESIZING (Same as your working version) ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});