import * as THREE from 'three';

export default class SceneController {
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({ antialias: true });
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);

  sceneEl = this.renderer.domElement;

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
      material: new THREE.MeshBasicMaterial({ color: 0xff0000, vertexColors: true }),
      get mesh() {
        return new THREE.Mesh(this.geometry, this.material);
      },
    };

    this.shapes.mainSphereObject = mainSphereObject;

    this.scene.add(mainSphereObject.mesh);
  }

  attachEventListeners() {
    window.addEventListener('resize', () => this.handleResize());

    this.sceneEl.addEventListener(
      'mousewheel',
      (event: Event) => {
        const e = event as MouseWheelEvent;

        e.preventDefault();

        this.camera.position.z = this.camera.position.z + (e.deltaY > 0 ? 0.05 : -0.05);

        this.reRender();

        return true;
      },
      false,
    );
  }
}
