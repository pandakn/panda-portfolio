"use client";

import { useEffect, useRef, useState } from "react";
import { Lightbulb, RotateCcw } from "lucide-react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { createDesk } from "./desk-model";
import styles from "./desk.module.css";

export default function DeskScene() {
  const host = useRef<HTMLDivElement>(null);
  const actions = useRef<{
    reset: () => void;
    light: (on: boolean) => void;
  } | null>(null);
  const [status, setStatus] = useState<"ready" | "fallback">("fallback");
  const [lightOn, setLightOn] = useState(true);

  useEffect(() => {
    const container = host.current;
    if (!container) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    const canvas = renderer.domElement;
    canvas.setAttribute(
      "aria-label",
      "Interactive 3D model of my desk. Drag or use the arrow keys to rotate.",
    );
    canvas.setAttribute("role", "img");
    canvas.tabIndex = 0;
    container.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-5, 5, 4, -4, 0.1, 60);
    camera.position.set(8, 10.1, 8);
    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 2.1, 0);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.minAzimuthAngle = -0.85;
    controls.maxAzimuthAngle = 0.95;
    controls.minPolarAngle = 0.65;
    controls.maxPolarAngle = 1.35;
    controls.rotateSpeed = 0.65;
    controls.update();
    controls.saveState();
    // Preserve vertical page scrolling on touch screens.
    canvas.style.touchAction = "pan-y";

    const desk = createDesk();
    scene.add(desk.group);
    scene.add(new THREE.HemisphereLight("#fff9ee", "#a6b3a3", 2.5));
    const sunlight = new THREE.DirectionalLight("#fff1d6", 3.8);
    sunlight.position.set(-3, 8, 5);
    sunlight.castShadow = true;
    sunlight.shadow.mapSize.set(2048, 2048);
    Object.assign(sunlight.shadow.camera, {
      left: -6,
      right: 6,
      top: 6,
      bottom: -6,
      near: 0.1,
      far: 25,
    });
    sunlight.shadow.normalBias = 0.035;
    sunlight.shadow.bias = -0.0001;
    sunlight.shadow.radius = 4;
    scene.add(sunlight);
    const floorGeometry = new THREE.PlaneGeometry(200, 200);
    const floorMaterial = new THREE.ShadowMaterial({ opacity: 0.13 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0.005;
    floor.receiveShadow = true;
    scene.add(floor);

    let visible = true;
    let frame = 0;
    function render() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (
          visible &&
          !document.hidden &&
          !renderer.getContext().isContextLost()
        ) {
          renderer.render(scene, camera);
          setStatus("ready");
        }
      });
    }
    function resize() {
      if (!container) return;
      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;
      const aspect = width / height;
      const viewHeight = Math.max(6.6, 8.5 / aspect);
      camera.left = (-viewHeight * aspect) / 2;
      camera.right = (viewHeight * aspect) / 2;
      camera.top = viewHeight / 2;
      camera.bottom = -viewHeight / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      render();
    }
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) render();
    });
    intersectionObserver.observe(container);
    controls.addEventListener("change", render);
    document.addEventListener("visibilitychange", render);
    function keydown(event: KeyboardEvent) {
      if (
        !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)
      )
        return;
      event.preventDefault();
      const offset = camera.position.clone().sub(controls.target);
      const spherical = new THREE.Spherical().setFromVector3(offset);
      if (event.key === "ArrowLeft") spherical.theta -= 0.12;
      if (event.key === "ArrowRight") spherical.theta += 0.12;
      if (event.key === "ArrowUp") spherical.phi -= 0.08;
      if (event.key === "ArrowDown") spherical.phi += 0.08;
      camera.position
        .copy(controls.target)
        .add(new THREE.Vector3().setFromSpherical(spherical));
      controls.update();
    }
    canvas.addEventListener("keydown", keydown);
    function contextLost(event: Event) {
      event.preventDefault();
      setStatus("fallback");
    }
    function contextRestored() {
      setStatus("ready");
      render();
    }
    canvas.addEventListener("webglcontextlost", contextLost);
    canvas.addEventListener("webglcontextrestored", contextRestored);
    actions.current = {
      reset: () => {
        controls.reset();
        render();
      },
      light: (on) => {
        desk.setLamp(on);
        render();
      },
    };
    resize();
    return () => {
      actions.current = null;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", render);
      canvas.removeEventListener("keydown", keydown);
      canvas.removeEventListener("webglcontextlost", contextLost);
      canvas.removeEventListener("webglcontextrestored", contextRestored);
      controls.dispose();
      desk.dispose();
      floorGeometry.dispose();
      floorMaterial.dispose();
      sunlight.shadow.dispose();
      renderer.dispose();
      canvas.remove();
    };
  }, []);

  return (
    <figure
      className={styles.figure}
      aria-label="An isometric recreation of my desk setup"
    >
      <div
        className={styles.scene}
        ref={host}
        data-ready={status === "ready"}
      />
      {status !== "ready" && (
        <div
          className={styles.fallback}
          role="img"
          aria-label="Isometric wooden desk with one monitor, keyboard, speakers, plants, and laptop"
        />
      )}
      <div className={styles.topline}>
        <span className={styles.dot} /> MY LITTLE CORNER OF THE INTERNET
      </div>
      <figcaption className={styles.caption}>
        <span>
          {status === "ready"
            ? "Made of pixels. Based on my desk."
            : "My desk, in miniature."}
        </span>
        <div className={styles.controls}>
          <button
            type="button"
            aria-label={lightOn ? "Turn desk light off" : "Turn desk light on"}
            aria-pressed={lightOn}
            disabled={status !== "ready"}
            onClick={() => {
              actions.current?.light(!lightOn);
              setLightOn(!lightOn);
            }}
          >
            <Lightbulb size={16} />
          </button>
          <button
            type="button"
            aria-label="Reset desk view"
            disabled={status !== "ready"}
            onClick={() => actions.current?.reset()}
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </figcaption>
      {status === "ready" && (
        <p className={styles.hint}>
          drag to explore <span aria-hidden="true">↔</span>
        </p>
      )}
    </figure>
  );
}
