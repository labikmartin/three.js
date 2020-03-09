import { SphereGeometry, Texture, MeshLambertMaterial, Mesh } from 'three';

export type MainSphereShape = {
  geometry?: SphereGeometry;
  texture?: Texture;
  material?: MeshLambertMaterial;
  mesh?: Mesh;
};

type SphereSceneShapes = {
  mainSphereObject: MainSphereShape;
};
export default SphereSceneShapes;
