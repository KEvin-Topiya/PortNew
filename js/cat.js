const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

const container = document.querySelector('.cat');
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 1); // soft white light
scene.add(ambientLight);

const loader = new THREE.GLTFLoader();
loader.load('3d/an_animated_cat.glb', function(gltf) {
  const model = gltf.scene;
  scene.add(model);

  model.position.set(0, 0, 0);
  model.scale.set(0.5, 0.5, 0.5);

  function animate() {
    requestAnimationFrame(animate);
    model.rotation.y += 0.01;  // Rotate the model
    renderer.render(scene, camera);
  }


  animate();
}, undefined, function(error) {
  console.error('An error occurred while loading the model:', error);
});

camera.position.z = 5;


window.addEventListener('resize', () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });