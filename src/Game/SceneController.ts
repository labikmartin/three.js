import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import SphereTexture from '../assets/me.jpg';

export default class SceneController {
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({ antialias: true });
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);

  sceneEl = this.renderer.domElement;

  controls = new OrbitControls(this.camera, this.sceneEl);

  shapes: Record<string, any> = {};

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
    this.renderer.setClearColor('#000');
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
      get sphereTexture() {
        const sphereTexture = new THREE.TextureLoader().load(SphereTexture);
        sphereTexture.repeat.set(2, 1);

        return sphereTexture;
      },
      get material() {
        return new THREE.MeshBasicMaterial({
          map: this.sphereTexture,
          reflectivity: 1,
        });
      },
      get mesh() {
        return new THREE.Mesh(this.geometry, this.material);
      },
    };
    this.shapes.mainSphereObject = mainSphereObject;

    this.scene.add(this.shapes.mainSphereObject.mesh);

    this.reRender();

    const ambientLight = new THREE.AmbientLight(0xffd600, 1);
    const pointLight = new THREE.PointLight(0xffd600, 1);
    const fog = new THREE.Fog(0x3f7b9d, 1, 7);

    this.scene.fog = fog;
    this.scene.add(ambientLight);

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
