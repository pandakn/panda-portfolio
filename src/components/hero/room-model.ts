import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

type Triple = [number, number, number];

export function createRoom() {
  const group = new THREE.Group();
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  function material(color: string, roughness = 0.8, metalness = 0) {
    const surface = new THREE.MeshStandardMaterial({
      color,
      roughness,
      metalness,
    });
    materials.add(surface);
    return surface;
  }
  const plaster = material("#d6d9d0");
  const trim = material("#eeece2");
  const white = material("#f2f1eb", 0.5);
  const cushion = material("#e3e3dc");
  const dark = material("#343936");
  const chrome = material("#bfc6c3", 0.28, 0.7);
  const maple = material("#cba574", 0.55);
  const red = material("#d95f50", 0.48);
  const pickguard = material("#eee5cc", 0.45);
  function mesh(
    geometry: THREE.BufferGeometry,
    surface: THREE.Material,
    at: Triple,
    parent: THREE.Object3D = group,
  ) {
    geometries.add(geometry);
    const object = new THREE.Mesh(geometry, surface);
    object.position.set(...at);
    object.castShadow = true;
    object.receiveShadow = true;
    parent.add(object);
    return object;
  }
  function box(
    size: Triple,
    at: Triple,
    surface: THREE.Material,
    parent: THREE.Object3D = group,
    radius = 0.04,
  ) {
    return mesh(
      new RoundedBoxGeometry(
        ...size,
        2,
        Math.min(radius, Math.min(...size) / 2),
      ),
      surface,
      at,
      parent,
    );
  }
  function rod(
    from: Triple,
    to: Triple,
    radius: number,
    surface: THREE.Material,
    parent: THREE.Object3D,
  ) {
    const start = new THREE.Vector3(...from);
    const end = new THREE.Vector3(...to);
    const direction = end.clone().sub(start);
    const object = mesh(
      new THREE.CylinderGeometry(radius, radius, direction.length(), 10),
      surface,
      [0, 0, 0],
      parent,
    );
    object.position.copy(start.add(end).multiplyScalar(0.5));
    object.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize(),
    );
    return object;
  }

  // The open sides face the camera; the original desk stays at the origin.
  box([8.2, 0.26, 5.95], [-0.3, -0.15, 1.2], trim, group, 0.1);
  const floorColors = ["#b9aa91", "#c4b59d", "#bdaf97"].map((color) =>
    material(color),
  );
  for (let i = 0; i < 10; i++) {
    const z = -1.39 + i * 0.58;
    const seam = i % 2 ? -0.8 : 1.4;
    for (const [left, right] of [
      [-4.34, seam],
      [seam + 0.015, 3.74],
    ]) {
      box(
        [right - left, 0.035, 0.565],
        [(left + right) / 2, -0.002, z],
        floorColors[i % 3],
        group,
        0.008,
      );
    }
  }
  box([8.25, 5.65, 0.18], [-0.3, 2.68, -1.72], plaster);
  box([0.18, 5.65, 5.95], [-4.4, 2.68, 1.2], plaster);
  box([8.1, 0.19, 0.08], [-0.3, 0.12, -1.58], trim);
  box([0.08, 0.19, 5.75], [-4.27, 0.12, 1.2], trim);
  box([8.3, 0.12, 0.25], [-0.3, 5.51, -1.72], trim);
  box([0.25, 0.12, 6], [-4.4, 5.51, 1.2], trim);

  // A single quiet print balances the monitor without filling the wall.
  const artwork = new THREE.Group();
  artwork.position.set(-4.27, 3.6, 1.45);
  artwork.rotation.y = Math.PI / 2;
  group.add(artwork);
  box([1.55, 1.95, 0.07], [0, 0, 0], maple, artwork, 0.015);
  box([1.43, 1.83, 0.015], [0, 0, 0.043], pickguard, artwork, 0.004);
  const ink = material("#7c8978");
  const clay = material("#b57d63");
  const sun = mesh(
    new THREE.SphereGeometry(0.32, 32, 16),
    clay,
    [0.23, 0.4, 0.06],
    artwork,
  );
  sun.scale.z = 0.015;
  box([0.52, 0.75, 0.012], [-0.27, -0.25, 0.06], ink, artwork, 0.005);
  box([0.47, 0.34, 0.012], [0.25, -0.45, 0.06], clay, artwork, 0.005);
  box([0.9, 0.018, 0.012], [0, -0.71, 0.06], ink, artwork, 0.004);

  // White ergonomic task chair, facing the monitor along negative Z.
  const chair = new THREE.Group();
  chair.position.set(0.25, 0, 2.55);
  chair.rotation.y = -0.1;
  group.add(chair);
  box([1.43, 0.18, 1.34], [0, 1.18, 0], white, chair, 0.15);
  box([1.34, 0.21, 1.24], [0, 1.3, -0.035], cushion, chair, 0.1);
  rod([0, 0.25, 0], [0, 1.11, 0], 0.085, chrome, chair);
  rod([0, 0.25, 0], [0, 0.6, 0], 0.13, white, chair);
  for (let i = 0; i < 5; i++) {
    const angle = (i * Math.PI * 2) / 5;
    const x = Math.sin(angle) * 0.87;
    const z = Math.cos(angle) * 0.87;
    rod([0, 0.32, 0], [x, 0.18, z], 0.055, white, chair);
    rod([x, 0.1, z - 0.07], [x, 0.1, z + 0.07], 0.1, dark, chair);
  }
  for (const x of [-0.76, 0.76]) {
    rod([x, 1.12, 0.22], [x, 1.82, 0.12], 0.045, white, chair);
    box([0.19, 0.09, 0.68], [x, 1.83, -0.04], white, chair, 0.045);
  }
  const back = new THREE.Group();
  back.position.set(0, 1.42, 0.53);
  back.rotation.x = 0.12;
  chair.add(back);
  for (const x of [-0.61, 0.61]) {
    rod([x, -0.2, 0], [x, 1.35, 0], 0.055, white, back);
  }
  box([1.22, 0.1, 0.1], [0, 1.35, 0], white, back);
  box([1.22, 0.1, 0.1], [0, 0.02, 0], white, back);
  // Open woven mesh geometry lets light through instead of using an opaque slab.
  const meshThread = material("#dedfd9", 0.95);
  for (let i = 0; i < 27; i++) {
    const x = -0.57 + (i * 1.14) / 26;
    rod([x, 0.06, 0], [x, 1.3, 0], 0.008, meshThread, back);
  }
  for (let i = 0; i < 30; i++) {
    const y = 0.07 + (i * 1.22) / 29;
    rod([-0.57, y, 0], [0.57, y, 0], 0.007, meshThread, back);
  }
  rod([0, -0.3, 0.12], [0, 0.53, 0.12], 0.055, white, back);
  box([0.94, 0.15, 0.09], [0, 0.35, 0.1], white, back);

  // Compact blackface-style combo with woven grille and cream control knobs.
  const amp = new THREE.Group();
  amp.position.set(-3.65, 0, 2.65);
  amp.rotation.y = 0.95;
  group.add(amp);
  box([1.35, 1.1, 0.66], [0, 0.65, 0], dark, amp, 0.07);
  const grille = material("#89897c");
  box([1.18, 0.73, 0.025], [0, 0.57, 0.342], grille, amp, 0.01);
  const weave = material("#b6b3a0");
  for (let i = 0; i < 31; i++) {
    box(
      [0.009, 0.71, 0.008],
      [-0.56 + i * 0.037, 0.57, 0.36],
      weave,
      amp,
      0.002,
    );
  }
  box([1.18, 0.16, 0.03], [0, 1.04, 0.345], chrome, amp);
  for (let i = 0; i < 6; i++) {
    mesh(
      new THREE.SphereGeometry(0.032, 10, 8),
      pickguard,
      [-0.46 + i * 0.14, 1.04, 0.38],
      amp,
    );
  }
  box([0.38, 0.06, 0.12], [0, 1.23, 0], dark, amp);
  for (const x of [-0.5, 0.5]) box([0.12, 0.1, 0.42], [x, 0.08, 0], dark, amp);
  box([0.25, 0.065, 0.012], [0.37, 0.83, 0.37], trim, amp, 0.005);

  // Double-cutaway Strat silhouette, six-in-line headstock and aged finish.
  const guitar = new THREE.Group();
  guitar.position.set(-3.55, 0.28, 1.2);
  guitar.rotation.set(-0.12, 0.65, -0.13);
  group.add(guitar);
  const body = new THREE.Shape();
  body.moveTo(-0.08, 0.93);
  body.bezierCurveTo(-0.16, 1.2, -0.34, 1.45, -0.4, 1.31);
  body.bezierCurveTo(-0.46, 1.17, -0.26, 1.04, -0.38, 0.85);
  body.bezierCurveTo(-0.66, 0.67, -0.67, 0.24, -0.46, 0.09);
  body.bezierCurveTo(-0.24, -0.06, 0.27, -0.07, 0.46, 0.1);
  body.bezierCurveTo(0.67, 0.3, 0.52, 0.64, 0.35, 0.78);
  body.bezierCurveTo(0.23, 0.93, 0.49, 1.07, 0.36, 1.15);
  body.bezierCurveTo(0.22, 1.2, 0.18, 0.97, 0.08, 0.93);
  body.closePath();
  const bodyGeometry = new THREE.ExtrudeGeometry(body, {
    depth: 0.12,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.045,
    bevelThickness: 0.04,
    curveSegments: 18,
  });
  mesh(bodyGeometry, red, [0, 0, 0], guitar);
  const guardGeometry = new THREE.ShapeGeometry(body);
  const guard = mesh(guardGeometry, pickguard, [0.015, 0.15, 0.166], guitar);
  guard.scale.set(0.69, 0.69, 1);
  box([0.16, 1.38, 0.1], [0, 1.58, 0.06], maple, guitar, 0.015);
  box(
    [0.145, 1.34, 0.015],
    [0, 1.59, 0.12],
    material("#a78355"),
    guitar,
    0.004,
  );
  const head = box(
    [0.23, 0.47, 0.1],
    [0.045, 2.47, 0.065],
    maple,
    guitar,
    0.055,
  );
  head.rotation.z = -0.12;
  for (let i = 0; i < 6; i++) {
    box(
      [0.1, 0.035, 0.055],
      [0.2, 2.29 + i * 0.065, 0.06],
      chrome,
      guitar,
      0.012,
    );
  }
  for (let i = 0; i < 19; i++) {
    const y =
      0.98 + (1.23 * (1 - Math.pow(0.92, i))) / (1 - Math.pow(0.92, 19));
    box([0.15, 0.009, 0.01], [0, y, 0.134], chrome, guitar, 0.001);
  }
  for (let i = 0; i < 3; i++) {
    const pickup = box(
      [0.29, 0.065, 0.035],
      [0, 0.52 + i * 0.17, 0.19],
      pickguard,
      guitar,
      0.014,
    );
    pickup.rotation.z = i === 0 ? -0.15 : 0;
    for (let pole = 0; pole < 6; pole++) {
      mesh(
        new THREE.SphereGeometry(0.009, 6, 4),
        chrome,
        [-0.11 + pole * 0.044, 0.52 + i * 0.17, 0.211],
        guitar,
      );
    }
  }
  box([0.28, 0.13, 0.035], [0, 0.32, 0.19], chrome, guitar, 0.008);
  for (let i = 0; i < 6; i++)
    rod(
      [-0.055 + i * 0.022, 0.3, 0.215],
      [-0.055 + i * 0.022, 2.52, 0.15],
      0.0025,
      chrome,
      guitar,
    );
  for (let i = 0; i < 3; i++)
    mesh(
      new THREE.SphereGeometry(0.038, 12, 8),
      pickguard,
      [0.29 + i * 0.025, 0.52 - i * 0.13, 0.19],
      guitar,
    );
  // Small exposed-wood chips, kept to the edge of the red finish.
  for (const [x, y, length] of [
    [-0.47, 0.27, 0.1],
    [-0.5, 0.43, 0.06],
    [0.33, 0.12, 0.11],
    [-0.32, 0.12, 0.05],
  ]) {
    const chip = mesh(
      new THREE.SphereGeometry(1, 8, 6),
      maple,
      [x, y, 0.167],
      guitar,
    );
    chip.scale.set(0.025, length, 0.008);
  }
  const stand = new THREE.Group();
  stand.position.set(-3.55, 0, 1.2);
  stand.rotation.y = 0.65;
  group.add(stand);
  rod([0, 0.1, -0.16], [0, 1.02, -0.2], 0.025, dark, stand);
  for (const x of [-0.43, 0.43]) {
    rod([0, 0.3, -0.15], [x, 0.05, 0.3], 0.025, dark, stand);
    rod([x * 0.6, 0.2, -0.1], [x * 0.6, 0.23, 0.25], 0.035, dark, stand);
  }
  rod([0, 0.3, -0.15], [0, 0.05, -0.5], 0.025, dark, stand);

  return {
    group,
    dispose() {
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((surface) => surface.dispose());
    },
  };
}
