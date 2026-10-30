import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import type { MotionValue } from "motion/react";

/* Random iridescent chrome wireframes (rods and ball joints, no faces)
   scattered over the whole screen. Each one
   gets its own heading, speed and spin axis on load; scrolling pushes every
   shape along its heading, and they wrap around the edges (off-screen) so the
   field never empties. The reflections come from a procedural room
   environment, so nothing is fetched. */

const COUNT = 16;
/** Scene units travelled by a speed-1 shape over the whole page. */
const TRAVEL = 40;
/** Extra room past the visible edges so the wrap-around jump stays hidden. */
const MARGIN = 2;

const ROD = 0.035;
const UP = new THREE.Vector3(0, 1, 0);

/** Turns a solid into its edge frame: one thin cylinder per edge, a ball on every vertex. */
function rods(source: THREE.BufferGeometry): THREE.BufferGeometry {
  const edges = new THREE.EdgesGeometry(source);
  const pos = edges.attributes.position;
  const parts: THREE.BufferGeometry[] = [];
  const joints = new Map<string, THREE.Vector3>();
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const dir = new THREE.Vector3();

  for (let i = 0; i < pos.count; i += 2) {
    a.fromBufferAttribute(pos, i);
    b.fromBufferAttribute(pos, i + 1);
    dir.subVectors(b, a);
    const rod = new THREE.CylinderGeometry(ROD, ROD, dir.length(), 8, 1, true); // open ends hide under the joints
    rod.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(UP, dir.normalize()));
    rod.translate((a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2);
    parts.push(rod);
    for (const v of [a, b]) joints.set(v.toArray().map((n) => n.toFixed(3)).join(), v.clone());
  }
  for (const v of joints.values()) parts.push(new THREE.SphereGeometry(ROD * 1.7, 12, 8).translate(v.x, v.y, v.z));

  const merged = mergeGeometries(parts);
  for (const g of [source, edges, ...parts]) g.dispose();
  return merged;
}

// Mostly rod frames; the two rings are already thin tubes, so they read as rods too.
const GEOMETRIES = [
  rods(new THREE.BoxGeometry(1, 1, 1)),
  rods(new THREE.IcosahedronGeometry(0.75)),
  rods(new THREE.OctahedronGeometry(0.8)),
  rods(new THREE.DodecahedronGeometry(0.75)),
  rods(new THREE.TetrahedronGeometry(0.9)),
  rods(new THREE.ConeGeometry(0.6, 1.1, 6)),
  rods(new THREE.CylinderGeometry(0.45, 0.45, 1, 6)),
  new THREE.TorusGeometry(0.55, ROD, 12, 64),
  new THREE.TorusKnotGeometry(0.45, ROD, 160, 8),
];

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const wrap = (v: number, half: number) => ((((v + half) % (2 * half)) + 2 * half) % (2 * half)) - half;

type Props = { progress: MotionValue<number>; px: MotionValue<number>; py: MotionValue<number> };

export default function Shapes({ progress, px, py }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    // Coloured light blobs in the room so the chrome reflects holographic hues, not just grey.
    for (const [color, x, y, z] of [
      [0xff2bd6, -5, 2, 2],
      [0x00e5ff, 5, -1, 2],
      [0xffd400, 0, 5, -3],
      [0x7a5cff, 0, -5, 3],
    ] as const) {
      const light = new THREE.Mesh(
        new THREE.SphereGeometry(1.4, 16, 8),
        new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(6) }),
      );
      light.position.set(x, y, z);
      room.add(light);
    }
    const env = pmrem.fromScene(room, 0.04).texture;
    room.dispose();
    scene.environment = env;

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.z = 12;

    const material = new THREE.MeshPhysicalMaterial({
      metalness: 1,
      roughness: 0.08,
      iridescence: 1,
      iridescenceIOR: 1.8,
      iridescenceThicknessRange: [0, 420], // no thickness map → max is used; ~400nm is the most vivid
    });

    const group = new THREE.Group();
    scene.add(group);

    // Half-extents of the wrap box, refreshed on resize to match the viewport.
    const bounds = { x: 1, y: 1 };

    const shapes = Array.from({ length: COUNT }, () => {
      const mesh = new THREE.Mesh(GEOMETRIES[Math.floor(Math.random() * GEOMETRIES.length)], material);
      mesh.scale.setScalar(rand(0.5, 1.3));
      group.add(mesh);
      const angle = rand(0, Math.PI * 2);
      return {
        mesh,
        start: new THREE.Vector3(rand(-1, 1), rand(-1, 1), rand(-4, 2)), // x, y as fractions of bounds
        heading: new THREE.Vector2(Math.cos(angle), Math.sin(angle)).multiplyScalar(rand(0.4, 1.2)),
        axis: new THREE.Vector3(rand(-1, 1), rand(-1, 1), rand(-1, 1)).normalize(),
        spin: rand(-1, 1),
        phase: rand(0, Math.PI * 2),
      };
    });

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      const halfH = camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      bounds.y = halfH + MARGIN;
      bounds.x = halfH * camera.aspect + MARGIN;
    };
    resize();
    window.addEventListener("resize", resize);

    const q = new THREE.Quaternion();
    renderer.setAnimationLoop((t) => {
      const s = progress.get() * TRAVEL;
      for (const shape of shapes) {
        const { mesh, start, heading, axis, spin, phase } = shape;
        mesh.position.set(
          wrap(start.x * bounds.x + heading.x * s, bounds.x),
          wrap(start.y * bounds.y + heading.y * s + Math.sin(t * 0.0006 + phase) * 0.15, bounds.y),
          start.z,
        );
        mesh.quaternion.copy(q.setFromAxisAngle(axis, phase + spin * (t * 0.0004 + s * 0.6)));
      }
      group.rotation.y = px.get() * 0.12;
      group.rotation.x = py.get() * 0.08;
      renderer.render(scene, camera);
    });

    return () => {
      renderer.setAnimationLoop(null);
      window.removeEventListener("resize", resize);
      material.dispose();
      env.dispose();
      pmrem.dispose();
      renderer.dispose();
    };
  }, [progress, px, py]);

  return <canvas ref={ref} />;
}
