"use client";

import { useEffect, useRef, useState } from "react";
import { Lightbulb, RotateCcw } from "lucide-react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { createDesk } from "./desk-model";
import { createRoom } from "./room-model";
import styles from "./desk.module.css";

export default function DeskScene() {
  const host = useRef<HTMLDivElement>(null);
  const actions = useRef<{
    reset: () => void;
    light: (on: boolean) => void;
  } | null>(null);
  const [status, setStatus] = useState<"ready" | "fallback">("fallback");
  const [lightOn, setLightOn] = useState(false);

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
      "Interactive isometric room with my desk, white office chair, red guitar and amplifier. Drag or use the arrow keys to rotate.",
    );
    canvas.setAttribute("role", "img");
    canvas.tabIndex = 0;
    container.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-5, 5, 4, -4, 0.1, 60);
    camera.position.set(8, 10.1, 8);
    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0.3, 3, 0.6);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.minAzimuthAngle = 0.15;
    controls.maxAzimuthAngle = 1.35;
    controls.minPolarAngle = 0.65;
    controls.maxPolarAngle = 1.35;
    controls.rotateSpeed = 0.65;
    controls.update();
    controls.saveState();
    // Preserve vertical page scrolling on touch screens.
    canvas.style.touchAction = "pan-y";

    const desk = createDesk();
    const room = createRoom();
    scene.add(desk.group, room.group);
    const ambient = new THREE.HemisphereLight("#f4f7ff", "#a5a18d", 2.2);
    scene.add(ambient);
    const sunlight = new THREE.DirectionalLight("#fff4e2", 3.2);
    sunlight.position.set(3, 9, 6);
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
    floor.position.y = -0.29;
    floor.receiveShadow = true;
    scene.add(floor);
    const daylight = {
      sky: new THREE.Color("#f4f7ff"),
      ground: new THREE.Color("#a5a18d"),
      sun: new THREE.Color("#fff4e2"),
    };
    const night = {
      sky: new THREE.Color("#b9c4de"),
      ground: new THREE.Color("#66523c"),
      sun: new THREE.Color("#b6c4e3"),
    };
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lightLevel = 0;
    let transition: { from: number; to: number; startedAt: number } | null =
      null;
    function setLighting(level: number) {
      lightLevel = level;
      desk.setLamp(level);
      ambient.intensity = THREE.MathUtils.lerp(2.2, 0.45, level);
      ambient.color.lerpColors(daylight.sky, night.sky, level);
      ambient.groundColor.lerpColors(daylight.ground, night.ground, level);
      sunlight.intensity = THREE.MathUtils.lerp(3.2, 0.16, level);
      sunlight.color.lerpColors(daylight.sun, night.sun, level);
      renderer.toneMappingExposure = THREE.MathUtils.lerp(1.15, 0.95, level);
      floorMaterial.opacity = THREE.MathUtils.lerp(0.13, 0.035, level);
      container?.parentElement?.style.setProperty("--night-mix", String(level));
    }
    setLighting(0);

    let visible = true;
    let frame = 0;
    function render() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame((now) => {
        if (
          visible &&
          !document.hidden &&
          !renderer.getContext().isContextLost()
        ) {
          if (transition) {
            const progress = reducedMotion.matches
              ? 1
              : Math.min((now - transition.startedAt) / 1000, 1);
            const eased = progress * progress * (3 - 2 * progress);
            setLighting(
              THREE.MathUtils.lerp(transition.from, transition.to, eased),
            );
            if (progress === 1) transition = null;
          }
          renderer.render(scene, camera);
          setStatus("ready");
          if (transition) render();
        }
      });
    }
    function resize() {
      if (!container) return;
      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;
      const aspect = width / height;
      const viewHeight = Math.max(10.5, 14.1 / aspect);
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
        transition = {
          from: lightLevel,
          to: on ? 1 : 0,
          startedAt: performance.now(),
        };
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
      room.dispose();
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
      data-night={lightOn}
      aria-label="An isometric recreation of my desk in a cozy room"
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
            className={styles.lightToggle}
            aria-label="Lightbar"
            aria-pressed={lightOn}
            disabled={status !== "ready"}
            onClick={() => {
              actions.current?.light(!lightOn);
              setLightOn(!lightOn);
            }}
          >
            <Lightbulb size={16} aria-hidden="true" />
            <span>Lightbar: {lightOn ? "On" : "Off"}</span>
          </button>
          <button
            type="button"
            aria-label="Reset desk view"
            disabled={status !== "ready"}
            onClick={() => actions.current?.reset()}
          >
            <RotateCcw size={15} aria-hidden="true" />
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
