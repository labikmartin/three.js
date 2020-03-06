import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class SceneController {
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({ antialias: true });
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);

  sceneEl = this.renderer.domElement;

  controls = new OrbitControls(this.camera, this.sceneEl);

  shapes: Record<string, unknown> = {};

  init() {
    document.body.appendChild(this.sceneEl);

    this.setDefaultSettings();
    this.createSphereScene();
    this.reRender();
    this.attachEventListeners();
  }

  setDefaultSettings() {
    this.camera.position.z = 5;

    this.controls.screenSpacePanning = true;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 40;
    this.controls.target.set(0, 0, 0);
    this.controls.update();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor('#dedede');
    this.reRender();
  }

  reRender(scene?: THREE.Scene, camera?: THREE.Camera) {
    this.renderer.render(scene || this.scene, camera || this.camera);
  }

  handleResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.reRender();
  }

  createSphereScene() {
    const mainSphereObject = {
      geometry: new THREE.SphereGeometry(2, 15, 15),
      material: new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true }),
      get mesh() {
        return new THREE.Mesh(this.geometry, this.material);
      },
    };
    this.shapes.mainSphereObject = mainSphereObject;

    var ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    var pointLight = new THREE.PointLight(0xffffff, 1);

    this.scene.add(mainSphereObject.mesh, ambientLight);
    this.camera.add(pointLight);

    const controlsAnimation = () => {
      requestAnimationFrame(controlsAnimation);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    };

    controlsAnimation();
  }

  attachEventListeners() {
    window.addEventListener('resize', () => this.handleResize());
  }
}
