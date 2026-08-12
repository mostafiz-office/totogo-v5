import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

/**
 * Battery Smart 3D Hero Scene
 * Low-poly isometric city with:
 *  - Road network (Y-shape)
 *  - Battery swap stations (pulsing top lights)
 *  - EV scooters & rickshaws moving along roads
 *  - Trees / greenery
 *  - Subtle camera orbit
 *
 * All units in meters; 1 unit ≈ 1m.
 * Color palette matches Battery Smart brand (blue #00109E, green #00CE7E).
 */

const BLUE = "#00109e";
const GREEN = "#00ce7e";
const GREEN_SOFT = "#b6f0d6";
const ROAD = "#2d3748";
const ROAD_LINE = "#f6e05e";
const GROUND = "#e8f5ee";
const BUILDING_COLORS = ["#ffffff", "#e0e7ff", "#dbeafe", "#fef3c7", "#fce7f3"];

// ----- Building -----
function Building({
  position,
  size,
  color,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
}) {
  const [w, h, d] = size;
  return (
    <group position={position}>
      {/* main mass */}
      <mesh position={[0, h / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial color={color} roughness={0.85} />
      </mesh>
      {/* roof accent */}
      <mesh position={[0, h + 0.05, 0]}>
        <boxGeometry args={[w * 1.02, 0.1, d * 1.02]} />
        <meshStandardMaterial color={BLUE} roughness={0.6} />
      </mesh>
      {/* windows: a couple of dark strips */}
      {Array.from({ length: Math.max(1, Math.floor(h / 0.7)) }).map((_, i) => (
        <mesh
          key={i}
          position={[0, 0.5 + i * 0.7, d / 2 + 0.001]}
        >
          <planeGeometry args={[w * 0.7, 0.25]} />
          <meshStandardMaterial color="#1e293b" emissive="#1e293b" emissiveIntensity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

// ----- Tree -----
function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.25, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.1, 0.5, 6]} />
        <meshStandardMaterial color="#92400e" />
      </mesh>
      <mesh position={[0, 0.75, 0]} castShadow>
        <coneGeometry args={[0.45, 1.1, 8]} />
        <meshStandardMaterial color={GREEN} roughness={0.7} />
      </mesh>
    </group>
  );
}

// ----- Swap Station -----
function SwapStation({ position }: { position: [number, number, number] }) {
  const lightRef = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(({ clock }) => {
    if (lightRef.current) {
      const t = clock.getElapsedTime();
      lightRef.current.emissiveIntensity = 0.6 + Math.sin(t * 2.4) * 0.5;
    }
  });
  return (
    <group position={position}>
      {/* base */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[1.4, 0.1, 1.4]} />
        <meshStandardMaterial color="#cbd5e1" />
      </mesh>
      {/* cabin */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <boxGeometry args={[1.0, 1.2, 1.0]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* green band */}
      <mesh position={[0, 1.0, 0.501]}>
        <planeGeometry args={[1.0, 0.25]} />
        <meshStandardMaterial color={GREEN} />
      </mesh>
      {/* roof */}
      <mesh position={[0, 1.35, 0]} castShadow>
        <boxGeometry args={[1.1, 0.1, 1.1]} />
        <meshStandardMaterial color={BLUE} />
      </mesh>
      {/* pulsing top light */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial
          ref={lightRef}
          color={GREEN}
          emissive={GREEN}
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
}

// ----- Vehicle (scooter or rickshaw simplified) -----
function Vehicle({
  pathPoints,
  speed,
  color,
  type,
  offset,
}: {
  pathPoints: THREE.Vector3[];
  speed: number;
  color: string;
  type: "scooter" | "rickshaw";
  offset: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(pathPoints, true, "catmullrom", 0.2),
    [pathPoints]
  );

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = ((clock.getElapsedTime() * speed + offset) % 1 + 1) % 1;
    const pt = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t);
    ref.current.position.set(pt.x, pt.y, pt.z);
    ref.current.rotation.y = Math.atan2(tangent.x, tangent.z);
  });

  return (
    <group ref={ref}>
      {type === "scooter" ? (
        <>
          <mesh position={[0, 0.18, 0]} castShadow>
            <boxGeometry args={[0.55, 0.18, 0.22]} />
            <meshStandardMaterial color={color} />
          </mesh>
          {/* rider */}
          <mesh position={[0, 0.45, -0.05]} castShadow>
            <capsuleGeometry args={[0.08, 0.25, 4, 8]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          {/* wheels */}
          <mesh position={[0.22, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.08, 0.03, 6, 12]} />
            <meshStandardMaterial color="#1f2937" />
          </mesh>
          <mesh position={[-0.22, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.08, 0.03, 6, 12]} />
            <meshStandardMaterial color="#1f2937" />
          </mesh>
        </>
      ) : (
        <>
          {/* rickshaw body */}
          <mesh position={[0, 0.25, 0]} castShadow>
            <boxGeometry args={[0.7, 0.35, 0.5]} />
            <meshStandardMaterial color={color} />
          </mesh>
          {/* roof */}
          <mesh position={[0, 0.5, 0]} castShadow>
            <boxGeometry args={[0.65, 0.08, 0.45]} />
            <meshStandardMaterial color={GREEN} />
          </mesh>
          {/* wheels */}
          <mesh position={[0.28, 0.1, 0.18]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.1, 0.04, 6, 12]} />
            <meshStandardMaterial color="#1f2937" />
          </mesh>
          <mesh position={[0.28, 0.1, -0.18]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.1, 0.04, 6, 12]} />
            <meshStandardMaterial color="#1f2937" />
          </mesh>
          <mesh position={[-0.3, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.1, 0.04, 6, 12]} />
            <meshStandardMaterial color="#1f2937" />
          </mesh>
        </>
      )}
    </group>
  );
}

// ----- Road segment (simple flat plane) -----
function Road({
  from,
  to,
  width = 1.2,
}: {
  from: [number, number];
  to: [number, number];
  width?: number;
}) {
  const dx = to[0] - from[0];
  const dz = to[1] - from[1];
  const length = Math.sqrt(dx * dx + dz * dz);
  const angle = Math.atan2(dx, dz);
  const cx = (from[0] + to[0]) / 2;
  const cz = (from[1] + to[1]) / 2;
  return (
    <group position={[cx, 0.005, cz]} rotation={[0, angle, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial color={ROAD} roughness={0.95} />
      </mesh>
      {/* dashed center line */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <planeGeometry args={[0.06, length * 0.85]} />
        <meshStandardMaterial color={ROAD_LINE} />
      </mesh>
    </group>
  );
}

// ----- City -----
function City() {
  // Building grid (positioned to leave roads clear)
  const buildings = useMemo(
    () => [
      { p: [-3.2, 0, -2.5], s: [1.2, 1.6, 1.2] },
      { p: [-3.2, 0, -0.8], s: [1.0, 2.2, 1.0] },
      { p: [-3.2, 0, 1.0], s: [1.4, 1.3, 1.0] },
      { p: [-3.2, 0, 2.6], s: [1.0, 1.8, 1.2] },
      { p: [3.2, 0, -2.5], s: [1.2, 2.0, 1.0] },
      { p: [3.2, 0, -0.8], s: [1.0, 1.4, 1.2] },
      { p: [3.2, 0, 1.0], s: [1.3, 2.4, 1.0] },
      { p: [3.2, 0, 2.6], s: [1.0, 1.6, 1.0] },
      { p: [-1.5, 0, -3.5], s: [1.0, 1.2, 1.0] },
      { p: [1.5, 0, -3.5], s: [1.0, 1.5, 1.0] },
      { p: [0, 0, -3.5], s: [1.0, 2.0, 1.0] },
    ],
    []
  );

  const trees = useMemo(
    () => [
      [-2.0, 0, -1.5],
      [-2.0, 0, 0.2],
      [-2.0, 0, 1.8],
      [2.0, 0, -1.5],
      [2.0, 0, 0.2],
      [2.0, 0, 1.8],
      [-1.0, 0, 3.0],
      [1.0, 0, 3.0],
      [-2.5, 0, 3.5],
      [2.5, 0, 3.5],
    ],
    []
  );

  return (
    <group>
      {/* ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color={GROUND} />
      </mesh>

      {/* roads, main horizontal + Y-fork going forward */}
      <Road from={[-5, 0]} to={[5, 0]} width={1.4} />
      <Road from={[0, 0]} to={[-2.2, 4]} width={1.2} />
      <Road from={[0, 0]} to={[2.2, 4]} width={1.2} />

      {/* buildings */}
      {buildings.map((b, i) => (
        <Building
          key={i}
          position={b.p as [number, number, number]}
          size={b.s as [number, number, number]}
          color={BUILDING_COLORS[i % BUILDING_COLORS.length]}
        />
      ))}

      {/* swap stations at strategic points */}
      <SwapStation position={[-2.0, 0, -2.0]} />
      <SwapStation position={[2.0, 0, 2.0]} />
      <SwapStation position={[0, 0, 4.2]} />

      {/* trees */}
      {trees.map((t, i) => (
        <Tree key={i} position={t as [number, number, number]} />
      ))}

      {/* vehicles on the main horizontal road */}
      <Vehicle
        type="scooter"
        color={GREEN}
        speed={0.06}
        offset={0}
        pathPoints={[
          new THREE.Vector3(-4.5, 0, -0.3),
          new THREE.Vector3(4.5, 0, -0.3),
          new THREE.Vector3(4.5, 0, 0.3),
          new THREE.Vector3(-4.5, 0, 0.3),
        ]}
      />
      <Vehicle
        type="rickshaw"
        color="#fbbf24"
        speed={0.04}
        offset={0.4}
        pathPoints={[
          new THREE.Vector3(-4.5, 0, 0.3),
          new THREE.Vector3(4.5, 0, 0.3),
          new THREE.Vector3(4.5, 0, -0.3),
          new THREE.Vector3(-4.5, 0, -0.3),
        ]}
      />
      <Vehicle
        type="scooter"
        color={BLUE}
        speed={0.05}
        offset={0.7}
        pathPoints={[
          new THREE.Vector3(-4.5, 0, -0.3),
          new THREE.Vector3(4.5, 0, -0.3),
          new THREE.Vector3(4.5, 0, 0.3),
          new THREE.Vector3(-4.5, 0, 0.3),
        ]}
      />

      {/* vehicles on the Y-fork (left branch) */}
      <Vehicle
        type="scooter"
        color="#ef4444"
        speed={0.07}
        offset={0.2}
        pathPoints={[
          new THREE.Vector3(-0.3, 0, 0.4),
          new THREE.Vector3(-2.4, 0, 4.0),
          new THREE.Vector3(-2.0, 0, 4.0),
          new THREE.Vector3(0.3, 0, 0.4),
        ]}
      />

      {/* right branch */}
      <Vehicle
        type="rickshaw"
        color={GREEN_SOFT}
        speed={0.05}
        offset={0.6}
        pathPoints={[
          new THREE.Vector3(0.3, 0, 0.4),
          new THREE.Vector3(2.4, 0, 4.0),
          new THREE.Vector3(2.0, 0, 4.0),
          new THREE.Vector3(-0.3, 0, 0.4),
        ]}
      />
    </group>
  );
}

// ----- Camera rig with subtle orbit -----
function CameraRig() {
  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime() * 0.08;
    const r = 9;
    camera.position.x = Math.sin(t) * r;
    camera.position.z = Math.cos(t) * r + 3;
    camera.position.y = 6.5;
    camera.lookAt(0, 0.5, 0.5);
  });
  return null;
}

const HeroScene3D = () => {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 6.5, 9], fov: 35 }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#ffffff"]} />
      <fog attach="fog" args={["#e8f5ee", 12, 22]} />

      {/* Lights */}
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[6, 10, 4]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <directionalLight position={[-5, 5, -5]} intensity={0.3} color={GREEN} />

      <Suspense fallback={null}>
        <City />
      </Suspense>

      <CameraRig />
    </Canvas>
  );
};

export default HeroScene3D;
