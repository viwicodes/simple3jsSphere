import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Camer
//Scene
const scene = new THREE.Scene();
//Create our sphere
const geometry = new THREE.SphereGeometry(1, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
//Light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 10, 5);
scene.add(light);
//Camera
var camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
);
camera.position.z = 2;

scene.add(camera);
// Render
const renderer = new THREE.WebGLRenderer({ antialias: true });

// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// renderer.setClearColor(0xffffff, 1);
renderer.render(scene, camera);

document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);

// Update the screen
function tick(): void {
  renderer.render(scene, camera);

  controls.update();

  window.requestAnimationFrame(tick);
}

tick();

// Handle resize
window.addEventListener(
  "resize",
  function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  },
  false,
);
