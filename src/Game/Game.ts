import * as THREE from 'three';

export default class GameController {
  camera = new THREE.PerspectiveCamera();
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({ antialias: true });
  geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  material = new THREE.MeshNormalMaterial();
  mesh = new THREE.Mesh(this.geometry, this.material);

  init() {
    this.camera.position.z = 1;

    this.scene.add(this.mesh);

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    document.querySelector('.App')?.appendChild(this.renderer.domElement);

    this.animate();
  }

  animate() {
    window.requestAnimationFrame(() => this.animate());

    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.02;

    this.renderer.render(this.scene, this.camera);
  }
}
