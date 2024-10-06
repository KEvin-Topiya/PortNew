// Scene, Camera, Renderer setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf5f5dc); // Set background color

const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // Aspect ratio will be updated later

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
const container = document.querySelector('.fox');
renderer.setSize(container.clientWidth, container.clientHeight); // Set initial renderer size
container.appendChild(renderer.domElement);

// Add ambient light
scene.add(new THREE.AmbientLight(0xffffff, 1)); // White light at full intensity

// Load GLTF model
const loader = new THREE.GLTFLoader();
let model;

loader.load('js/3d/cute_fox.glb', (gltf) => {
    model = gltf.scene;

    // Fit model inside the div container
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const scale = Math.min(
        container.clientWidth / size.x,
        container.clientHeight / size.y
    );
    model.scale.set(scale * 0.9, scale * 0.9, scale * 0.9); // Scale slightly smaller to fit

    // Center the model
    box.setFromObject(model);
    model.position.sub(box.getCenter(new THREE.Vector3())); // Center the model in the scene

    scene.add(model);
    animate();
}, undefined, (error) => {
    console.error(error);
});

// Set camera position to fit the model
camera.position.z = 500; // Adjust camera distance based on model size

// Mouse hover rotation logic
let mouseX = 0;
let isHovered = false;

container.addEventListener('mousemove', (event) => {
    if (isHovered) {
        const rect = container.getBoundingClientRect();
        mouseX = (event.clientX - rect.left) / container.clientWidth * 2 - 1; // Normalize mouse position
    }
});

container.addEventListener('mouseenter', () => isHovered = true);
container.addEventListener('mouseleave', () => isHovered = false);

function animate() {
    requestAnimationFrame(animate);

    if (model && isHovered) {
        model.rotation.y = mouseX * Math.PI * 0.5; // Rotate on Y-axis based on mouse movement
    }

    renderer.render(scene, camera);
}

// Responsive resize logic
window.addEventListener('resize', () => {
    const width = container.clientWidth;
    const height = container.clientHeight;

    renderer.setSize(width, height); // Adjust renderer size
    camera.aspect = width / height; // Adjust camera aspect ratio
    camera.updateProjectionMatrix();

    // Adjust model scaling dynamically on resize
    if (model) {
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const scale = Math.min(width / size.x, height / size.y);
        model.scale.set(scale * 0.9, scale * 0.9, scale * 0.9); // Scale model to fit new size
    }
});
  