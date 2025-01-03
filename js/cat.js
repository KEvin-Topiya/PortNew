let scene, camera, renderer, foxModel;

function init() {
    // Scene setup
    scene = new THREE.Scene();

    // Camera setup
    const width = document.querySelector('.fox').clientWidth;
    const height = document.querySelector('.fox').clientHeight;
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Set alpha: true for transparent background
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0); // Transparent background
    document.querySelector('.fox').appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);


    // Load the 3D model
    const loader = new THREE.GLTFLoader();
    loader.load('js/cute_fox.glb', function(gltf) {
        foxModel = gltf.scene;
        scene.add(foxModel);

        // Adjust the size of the model to fit the 30vh container
        const box = new THREE.Box3().setFromObject(foxModel);
        const size = new THREE.Vector3();
        box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 4 / maxDim; // Adjust scale to fit the container
        foxModel.scale.set(scale, scale, scale);

        // Center the model
        const center = new THREE.Vector3();
        box.getCenter(center);
        foxModel.position.sub(center);
    });

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);

    // Hover effect
    const foxDiv = document.querySelector('.fox');
    foxDiv.addEventListener('mousemove', onMouseMove);
    foxDiv.addEventListener('mouseenter', onMouseEnter);
    foxDiv.addEventListener('mouseleave', onMouseLeave);

    animate();
}

function onWindowResize() {
    const width = document.querySelector('.fox').clientWidth;
    const height = document.querySelector('.fox').clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

let isHovered = false;
let mouseX = 0;

function onMouseMove(event) {
    if (isHovered) {
        // Calculate mouse position relative to the .fox container
        const rect = event.target.getBoundingClientRect();
        mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1; // Normalize to [-1, 1] }
    }
}

function onMouseEnter() {
    isHovered = true;
}

function onMouseLeave() {
    isHovered = false;
}

let rotationSpeed = 0.01;


function animate() {
    requestAnimationFrame(animate);

    if (foxModel) {
        if (isHovered) {
            // Rotate the fox toward the mouse pointer
            const targetRotation = mouseX * (Math.PI / 2);  // Calculate angle based on mouse position
            foxModel.rotation.y = THREE.MathUtils.lerp(foxModel.rotation.y, targetRotation, 0.1); // Smoothly interpolate rotation
        } else {
            // Automatically rotate the fox horizontally
            foxModel.rotation.y += rotationSpeed;
        }
    }

    renderer.render(scene, camera);
}

init();