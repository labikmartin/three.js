import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import SphereTexture from '../assets/me.jpg';
import { TimelineMax, Expo } from 'gsap';
import SphereSceneShapes from '../types/SphereSceneTypes';

export default class SceneController {
  timeline = new TimelineMax();

  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({ antialias: true });
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 250);

  sceneEl = this.renderer.domElement;

  controls = new OrbitControls(this.camera, this.sceneEl);

  shapes: Partial<SphereSceneShapes> = {};

  init() {
    document.body.appendChild(this.sceneEl);

    this.setDefaultSettings();
    this.createSphereScene();
    this.reRender();
    this.attachEventListeners();
  }

  setDefaultSettings() {
    this.camera.position.z = 50;

    this.controls.screenSpacePanning = true;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 250;
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
    this.shapes.mainSphereObject = {};

    const { mainSphereObject } = this.shapes;
    mainSphereObject.texture = new THREE.TextureLoader().load(SphereTexture);
    mainSphereObject.geometry = new THREE.SphereGeometry(10, 32, 32);
    mainSphereObject.material = new THREE.MeshLambertMaterial({
      map: mainSphereObject.texture,
      reflectivity: 1,
    });
    mainSphereObject.mesh = new THREE.Mesh(mainSphereObject.geometry, mainSphereObject.material);

    const fog = new THREE.Fog(0x3f7b9d, 1, 400);
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    ambientLight.position.set(10, 0, 25);

    // const pointLight = new THREE.PointLight(0xffffff, 1, 1000);
    // pointLight.position.set(10, 0, 25);

    this.scene.fog = fog;
    this.scene.add(this.shapes.mainSphereObject!.mesh!, /* pointLight, */ ambientLight);

    this.rotateSphere();
    this.scaleSphere();

    const controlsAnimation = () => {
      requestAnimationFrame(controlsAnimation);
      this.controls.update();

      this.reRender();
    };

    controlsAnimation();
  }

  rotateSphere() {
    const {mainSphereObject} = this.shapes;

    if (mainSphereObject?.mesh) {
      mainSphereObject.mesh.rotation.y += 0.01;

      requestAnimationFrame(this.rotateSphere.bind(this));
    }
  }

  scaleSphere() {
    const {mainSphereObject} = this.shapes;
    const timeline = new TimelineMax();

    timeline.to(mainSphereObject?.mesh?.scale || null, 1, { x: 1.2, ease: Expo.easeOut });
    timeline.to(mainSphereObject?.mesh?.scale || null, 1, { y: 1.2, ease: Expo.easeOut });
    timeline.to(mainSphereObject?.mesh?.scale || null, 1, { z: 1.2, ease: Expo.easeOut });
  }

  attachEventListeners() {
    window.addEventListener('resize', () => this.handleResize());
  }
}
