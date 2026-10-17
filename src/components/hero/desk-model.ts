import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

type Position = [number, number, number];

function canvasTexture(
  width: number,
  height: number,
  draw: (ctx: CanvasRenderingContext2D) => void,
) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is unavailable");
  draw(ctx);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createDesk() {
  const group = new THREE.Group();
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();
  const geometryCache = new Map<string, THREE.BufferGeometry>();
  function material(color: string, roughness = 0.75) {
    const result = new THREE.MeshStandardMaterial({ color, roughness });
    materials.add(result);
    return result;
  }
  const oak = material("#cfaa75");
  const woodTexture = canvasTexture(512, 256, (ctx) => {
    ctx.fillStyle = "#e0bd89";
    ctx.fillRect(0, 0, 512, 256);
    for (let i = 0; i < 220; i++) {
      const y = (i * 37.71) % 256;
      ctx.strokeStyle = i % 3 ? "#a47a4830" : "#fff2d950";
      ctx.lineWidth = i % 5 === 0 ? 1.5 : 0.5;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.bezierCurveTo(180, y + Math.sin(i) * 8, 350, y - 5, 512, y + 2);
      ctx.stroke();
    }
  });
  textures.add(woodTexture);
  oak.map = woodTexture;
  const cream = material("#f2eee3");
  const black = material("#262c2b");
  const rubber = material("#151a19");
  const silver = material("#bfc3bd", 0.4);
  const sage = material("#959f8a");
  const taupe = material("#a89776");
  const fabric = material("#c9c5b5");

  function mesh(
    geometry: THREE.BufferGeometry,
    surface: THREE.Material,
    position: Position,
    parent: THREE.Object3D = group,
  ) {
    geometries.add(geometry);
    const object = new THREE.Mesh(geometry, surface);
    object.position.set(...position);
    object.castShadow = true;
    object.receiveShadow = true;
    parent.add(object);
    return object;
  }
  function box(
    size: Position,
    position: Position,
    surface = cream,
    radius = 0.035,
    parent: THREE.Object3D = group,
  ) {
    const key = [...size, radius].join(",");
    let geometry = geometryCache.get(key);
    if (!geometry) {
      geometry = new RoundedBoxGeometry(
        ...size,
        2,
        Math.min(radius, Math.min(...size) / 2),
      );
      geometryCache.set(key, geometry);
    }
    return mesh(geometry, surface, position, parent);
  }
  function cylinder(
    radius: number,
    height: number,
    position: Position,
    surface = cream,
    topRadius = radius,
  ) {
    return mesh(
      new THREE.CylinderGeometry(topRadius, radius, height, 32),
      surface,
      position,
    );
  }
  function ellipsoid(size: Position, position: Position, surface = cream) {
    const object = mesh(new THREE.SphereGeometry(1, 20, 12), surface, position);
    object.scale.set(...size);
    return object;
  }

  // The photo's oak desk and raised monitor shelf.
  box([6.4, 0.2, 2.85], [0, 1.95, 0], oak, 0.07);
  for (const x of [-2.65, 2.65]) {
    for (const z of [-0.95, 0.95]) box([0.13, 1.8, 0.14], [x, 0.95, z]);
    box([0.24, 0.12, 2.45], [x, 0.08, 0]);
  }
  box([5.2, 0.13, 0.77], [0, 2.42, -0.74], oak);
  for (const x of [-2.2, 2.2]) box([0.11, 0.36, 0.65], [x, 2.2, -0.74], oak);
  box([4.2, 0.1, 0.12], [0, 1.5, -1.02], silver);

  // A single large display, its green cutting-mat wallpaper, and light bar.
  box([0.78, 0.06, 0.46], [0, 2.52, -0.81], black);
  box([0.15, 0.55, 0.13], [0, 2.76, -0.94], black);
  box([2.95, 1.72, 0.12], [0, 3.49, -0.88], black, 0.045);
  const screenTexture = canvasTexture(960, 540, (ctx) => {
    ctx.fillStyle = "#28685d";
    ctx.fillRect(0, 0, 960, 540);
    for (let i = 0; i <= 960; i += 30) {
      ctx.strokeStyle = i % 150 === 0 ? "#b7d4b775" : "#a8c8ae38";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 540);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(960, i);
      ctx.stroke();
    }
    ctx.strokeStyle = "#d7e7c655";
    ctx.beginPath();
    ctx.moveTo(0, 540);
    ctx.lineTo(540, 0);
    ctx.stroke();
    ctx.fillStyle = "#eef1db";
    ctx.font = "24px monospace";
    ctx.fillText("hello, world_", 345, 260);
    ctx.font = "12px monospace";
    ctx.fillStyle = "#bed4bf";
    ctx.fillText("a little space to make things.", 345, 289);
    ctx.fillStyle = "#e8ead9";
    ctx.fillRect(22, 25, 96, 92);
    ctx.fillStyle = "#658770";
    ctx.font = "14px monospace";
    ctx.fillText("FRI", 35, 49);
    ctx.font = "38px monospace";
    ctx.fillText("16", 35, 93);
    ctx.fillStyle = "#dce5d578";
    ctx.fillRect(317, 508, 326, 22);
    for (let i = 0; i < 14; i++) {
      ctx.fillStyle = ["#efbb6d", "#cfdece", "#82b6b2", "#d5876e"][i % 4];
      ctx.fillRect(325 + i * 23, 512, 16, 14);
    }
  });
  textures.add(screenTexture);
  const screen = new THREE.MeshBasicMaterial({ map: screenTexture });
  materials.add(screen);
  mesh(new THREE.PlaneGeometry(2.79, 1.55), screen, [0, 3.5, -0.813]);
  box([2.2, 0.09, 0.12], [0, 4.39, -0.8], black);
  box([0.25, 0.13, 0.18], [0, 4.36, -0.91], black);
  const lampMaterial = material("#fff1c6");
  lampMaterial.emissive.set("#ffdc98");
  lampMaterial.emissiveIntensity = 1.4;
  box([2.05, 0.025, 0.045], [0, 4.345, -0.75], lampMaterial);
  box([2.05, 0.045, 0.025], [0, 4.375, -0.72], lampMaterial, 0.005);
  const lamp = new THREE.SpotLight("#ffe3b0", 34, 10, 1.02, 0.85, 2);
  lamp.position.set(0, 4.34, -0.65);
  lamp.target.position.set(0.15, 2.05, 0.65);
  lamp.castShadow = true;
  lamp.shadow.mapSize.set(1024, 1024);
  lamp.shadow.camera.near = 0.1;
  lamp.shadow.normalBias = 0.015;
  lamp.shadow.bias = -0.0002;
  lamp.shadow.radius = 4;
  // A little reflected light reaches the walls and the chair.
  const bounce = new THREE.PointLight("#ffd7a0", 3, 7, 2);
  bounce.position.set(0, 2.8, 0.9);
  group.add(lamp, lamp.target, bounce);

  // Fabric mat, individually modelled keycaps, wooden wrist rest, and mouse.
  box([3.6, 0.035, 1.35], [0.48, 2.07, 0.52], fabric, 0.05);
  box([2.08, 0.12, 0.73], [0.15, 2.15, 0.39], silver);
  box([1.99, 0.035, 0.65], [0.15, 2.22, 0.39], black);
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 14; col++) {
      if (row === 4 && col > 3 && col < 10) continue;
      const keyMaterial =
        col === 0 || col === 13
          ? cream
          : row === 0 || col === 1
            ? black
            : taupe;
      box(
        [0.12, 0.07, 0.103],
        [-0.75 + col * 0.139, 2.265, 0.12 + row * 0.128],
        keyMaterial,
        0.018,
      );
    }
  }
  box([0.83, 0.07, 0.105], [0.15, 2.265, 0.632], cream, 0.02);
  box([2.15, 0.11, 0.34], [0.16, 2.14, 0.98], oak);
  ellipsoid([0.2, 0.1, 0.31], [1.56, 2.18, 0.35]);
  box([0.012, 0.008, 0.19], [1.56, 2.279, 0.2], silver, 0.003);
  box([0.037, 0.025, 0.085], [1.56, 2.28, 0.23], silver, 0.01);
  const cable = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.1, 2.21, 0),
    new THREE.Vector3(0.05, 2.1, -0.22),
    new THREE.Vector3(-0.28, 2.09, -0.36),
    new THREE.Vector3(-0.4, 2.1, -0.8),
  ]);
  mesh(new THREE.TubeGeometry(cable, 24, 0.014, 6, false), taupe, [0, 0, 0]);

  // White nearfield speakers with recessed black drivers.
  for (const x of [-2.85, 2.85]) {
    box([0.57, 0.055, 0.59], [x, 2.08, -0.61], silver);
    box([0.49, 0.82, 0.43], [x, 2.51, -0.67], cream, 0.045);
    for (const [y, radius] of [
      [2.37, 0.165],
      [2.7, 0.075],
    ]) {
      const rim = cylinder(radius, 0.025, [x, y, -0.44], black);
      rim.rotation.x = Math.PI / 2;
      ellipsoid([radius * 0.73, radius * 0.73, 0.035], [x, y, -0.415], rubber);
    }
  }

  function plant(x: number, z: number, height = 0.3) {
    cylinder(0.13, 0.2, [x, 2.59, z], cream, 0.17);
    cylinder(0.145, 0.012, [x, 2.695, z], material("#61503c"));
    for (let i = 0; i < 9; i++) {
      const angle = i * 2.4;
      const leaf = ellipsoid(
        [0.045, height / 2, 0.065],
        [
          x + Math.sin(angle) * 0.08,
          2.74 + height / 4,
          z + Math.cos(angle) * 0.08,
        ],
        i % 2 ? sage : material("#536e48"),
      );
      leaf.rotation.z = Math.sin(angle) * 0.65;
      leaf.rotation.x = Math.cos(angle) * 0.65;
    }
  }
  plant(-2.12, -0.69, 0.4);
  plant(1.8, -0.86, 0.24);
  cylinder(0.23, 0.06, [0.99, 2.52, -0.52], material("#80573c"));
  plant(0.99, -0.52, 0.25);

  // Notebook and scrambled cube beside the monitor.
  box([0.65, 0.065, 0.43], [-1.25, 2.52, -0.56], taupe);
  const cubeColors = [
    "#e8bd39",
    "#bc4936",
    "#f1eee0",
    "#3d789b",
    "#59955a",
    "#d78031",
  ].map((c) => material(c));
  const cube = new THREE.Group();
  cube.position.set(-1.25, 2.77, -0.57);
  cube.rotation.y = -0.15;
  group.add(cube);
  for (let x = 0; x < 3; x++)
    for (let y = 0; y < 3; y++)
      for (let z = 0; z < 3; z++) {
        box(
          [0.125, 0.125, 0.125],
          [(x - 1) * 0.135, (y - 1) * 0.135, (z - 1) * 0.135],
          cubeColors[(x * 3 + y * 2 + z) % 6],
          0.009,
          cube,
        );
      }
  box([0.47, 0.32, 0.065], [0.35, 2.67, -0.41], cream).rotation.x = -0.2;
  box(
    [0.38, 0.235, 0.014],
    [0.35, 2.68, -0.368],
    material("#778780"),
    0.01,
  ).rotation.x = -0.2;
  cylinder(0.17, 0.13, [1.45, 2.55, -0.43], black);

  // Desktop microphone on its circular stand.
  cylinder(0.25, 0.055, [2.32, 2.09, 0.02]);
  cylinder(0.035, 0.46, [2.32, 2.34, 0.02], black);
  box([0.38, 0.11, 0.12], [2.32, 2.56, 0.02], black);
  for (const x of [2.12, 2.52])
    box([0.035, 0.36, 0.06], [x, 2.71, 0.02], black);
  box([0.29, 0.48, 0.25], [2.32, 2.83, 0.02], silver, 0.1);
  box([0.28, 0.23, 0.25], [2.32, 3.0, 0.02], black, 0.07);
  for (let i = 0; i < 6; i++)
    box([0.225, 0.008, 0.012], [2.32, 2.92 + i * 0.028, 0.149], silver, 0.002);

  // Closed sticker-covered laptop at the front left.
  const laptop = box([1.23, 0.085, 0.85], [-2.15, 2.13, 0.68], silver);
  laptop.rotation.y = 0.12;
  const stickers = canvasTexture(384, 256, (ctx) => {
    ctx.fillStyle = "#bcc4bb";
    ctx.fillRect(0, 0, 384, 256);
    const colors = [
      "#eee1aa",
      "#c98a7c",
      "#d9e6d5",
      "#6f9994",
      "#363e39",
      "#e2b3b0",
    ];
    const labels = ["✿", "hi!", "{ }", "MAKE", ":)", "♡"];
    for (let i = 0; i < 12; i++) {
      const x = 38 + (i % 4) * 94;
      const y = 40 + Math.floor(i / 4) * 82;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.sin(i * 2) * 0.3);
      ctx.fillStyle = colors[i % colors.length];
      ctx.fillRect(-27, -23, 58, 48);
      ctx.fillStyle = i % 6 === 4 ? "#f6f1d8" : "#303d34";
      ctx.font = "bold 18px monospace";
      ctx.textAlign = "center";
      ctx.fillText(labels[i % labels.length], 2, 6);
      ctx.restore();
    }
  });
  textures.add(stickers);
  const stickerMaterial = new THREE.MeshStandardMaterial({
    map: stickers,
    roughness: 0.8,
  });
  materials.add(stickerMaterial);
  const lid = mesh(
    new THREE.PlaneGeometry(1.16, 0.79),
    stickerMaterial,
    [-2.15, 2.176, 0.68],
  );
  lid.rotation.set(-Math.PI / 2, 0, 0.12);
  cylinder(0.21, 0.045, [-2.66, 2.09, 0.08], material("#80573c"));
  cylinder(0.17, 0.008, [-2.66, 2.117, 0.08], taupe);

  const lampOffColor = new THREE.Color("#c7c4b9");
  const lampOnColor = new THREE.Color("#fff1c6");
  return {
    group,
    setLamp(level: number) {
      lamp.visible = level > 0;
      bounce.visible = level > 0;
      lamp.intensity = 34 * level;
      bounce.intensity = 3 * level;
      lampMaterial.color.lerpColors(lampOffColor, lampOnColor, level);
      lampMaterial.emissiveIntensity = 3 * level;
    },
    dispose() {
      lamp.shadow.dispose();
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((surface) => surface.dispose());
      textures.forEach((texture) => texture.dispose());
    },
  };
}
