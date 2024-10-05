// Scene, Camera, Renderer setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf5f5dc); // Set background color

const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(500, 500); // Set renderer size to match the div size

const container = document.querySelector('.fox');
container.style.width = '500px'; // Ensure the container is 500px
container.style.height = '500px'; // Ensure the container is 500px
container.appendChild(renderer.domElement);

// Add ambient light
scene.add(new THREE.AmbientLight(0xffffff, 1)); // White light at full intensity

// Load GLTF model
const loader = new THREE.GLTFLoader();
let model;

loader.load('js/3d/cute_fox.glb', (gltf) => {
    model = gltf.scene;

    // Scale model to fit inside 500x500 div
    const desiredSize = 500; // Desired size of the div
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const scale = (desiredSize - 200) / Math.max(size.x, size.y, size.z); // Scale to fit desired size

    model.scale.set(scale, scale, scale);

    // Center the model
    box.setFromObject(model);
    model.position.sub(box.getCenter(new THREE.Vector3())); // Center the model

    scene.add(model);
    animate();
}, undefined, (error) => {
    console.error(error);
});

// Set camera position
camera.position.z = 500; // Adjust to fit the model within the view

// Mouse hover rotation logic
let mouseX = 0;
let isHovered = false;

container.addEventListener('mousemove', (event) => {
    if (isHovered) {
        mouseX = (event.clientX / container.clientWidth) * 2 - 1; // Normalize mouse position
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

// Responsive resize
window.addEventListener('resize', () => {
    const width = 500; // Keep width fixed
    const height = 500; // Keep height fixed
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
