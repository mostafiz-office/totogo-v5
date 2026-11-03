/**
 * Authentic Bangladeshi TotooGo Electric Three-Wheeler (CNG / Auto / Tom-Tom)
 * Rendered in accurate 30-degree isometric projection.
 *
 * Variants:
 * 1. Passenger Variant: Driver cabin + passenger seating bench with open side access.
 * 2. Cargo Variant: Driver cabin + enclosed cargo delivery box with TotooGo Delivery branding.
 *
 * Orientations:
 * - "down-right" (facing Southeast along the main road)
 * - "down-left"  (facing Southwest, parked or at swap bay)
 * - "up-right"    (facing Northeast)
 */

export interface ThreeWheelerProps {
  id?: string;
  variant?: "passenger" | "cargo";
  orientation?: "down-right" | "down-left" | "up-right";
  x?: number;
  y?: number;
  scale?: number;
  opacity?: number;
  className?: string;
}

export function generateThreeWheelerSVG({
  id = "",
  variant = "passenger",
  orientation = "down-right",
  x = 0,
  y = 0,
  scale = 1.0,
  opacity = 1.0,
  className = "",
}: ThreeWheelerProps): string {
  const idAttr = id ? `id="${id}"` : "";
  const transform = `translate(${x}, ${y}) scale(${scale})`;
  const isFlipped = orientation === "down-right";
  const mirrorX = isFlipped ? "scale(-1, 1)" : "scale(1, 1)";
  const decalTransform = isFlipped ? "scale(-1, 1) skewY(-30)" : "skewY(30)";

  // The base model is crafted facing down-left (30° isometric standard).
  // Facing down-right is achieved by horizontal mirror reflection around center.
  
  const cargoBox = `
    <!-- Cargo Box Enclosure -->
    <g class="tg-cargo-box">
      <!-- Shadow on chassis -->
      <polygon points="-8,-28 28,-49 28,-18 -8,3" fill="#003D20" opacity="0.6"/>
      <!-- Rear Face -->
      <polygon points="28,-49 46,-39 46,-12 28,-22" fill="#005A32"/>
      <!-- Top Face of Box -->
      <polygon points="-8,-49 10,-59 46,-39 28,-29" fill="#00A651"/>
      <!-- Side Face of Cargo Box (Facing Viewer) -->
      <polygon points="-8,-49 28,-29 28,-2 -8,-22" fill="#008744"/>
      <!-- Cargo Door Seams & Hinges -->
      <line x1="10" y1="-39" x2="10" y2="-12" stroke="#005A32" stroke-width="1"/>
      <circle cx="8" cy="-24" r="1.5" fill="#E2E8F0"/>
      <!-- TotooGo Delivery Decal -->
      <g transform="translate(10, -25) ${decalTransform} scale(0.65)">
        <rect x="-18" y="-9" width="36" height="15" rx="3" fill="#FFFFFF" opacity="0.95"/>
        <text x="0" y="2" font-family="'Rubik', sans-serif" font-size="7" font-weight="800" fill="#00A651" text-anchor="middle">totooGO</text>
        <text x="0" y="8" font-family="'Rubik', sans-serif" font-size="4" font-weight="700" fill="#1E293B" text-anchor="middle">CARGO EV</text>
      </g>
    </g>
  `;

  const passengerCabin = `
    <!-- Passenger Cabin -->
    <g class="tg-passenger-cabin">
      <!-- Passenger Bench Interior Floor & Backrest -->
      <polygon points="-2,-24 24,-39 24,-28 -2,-13" fill="#0F172A"/>
      <polygon points="8,-35 22,-43 22,-26 8,-18" fill="#1E293B"/>
      <!-- Seat Cushion (Classic Maroon / Dark Brown) -->
      <polygon points="-2,-22 18,-33 22,-31 2,-20" fill="#7F1D1D"/>
      <polygon points="-2,-22 2,-20 2,-16 -2,-18" fill="#5A1212"/>
      <!-- Passenger Silhouette (Local commuter) -->
      <g transform="translate(10, -32)">
        <circle cx="0" cy="-6" r="3.5" fill="#8D5B4C"/>
        <path d="M-4, -2 C-4,-5 4,-5 4,-2 L3, 7 L-3, 7 Z" fill="#2563EB"/>
      </g>
      <!-- Open Side Safety Rail (Silver chrome tube) -->
      <path d="M-8,-19 L-8,-12 L20,-28 L20,-35" fill="none" stroke="#CBD5E1" stroke-width="1.6" stroke-linecap="round"/>
      <!-- Green Lower Skirt / Side Panel -->
      <polygon points="-8,-16 22,-33 22,-26 -8,-9" fill="#008744"/>
      <polygon points="-8,-9 22,-26 22,-22 -8,-5" fill="#005A32"/>
      <!-- Door branding pill -->
      <g transform="translate(6, -21) ${decalTransform} scale(0.6)">
        <rect x="-16" y="-7" width="32" height="12" rx="3" fill="#FFFFFF" opacity="0.9"/>
        <text x="0" y="2" font-family="'Rubik', sans-serif" font-size="6.5" font-weight="800" fill="#00A651" text-anchor="middle">totooGO</text>
      </g>
    </g>
  `;

  return `
    <g ${idAttr} class="tg-three-wheeler ${className}" transform="${transform}" opacity="${opacity}">
      <g transform="${mirrorX}">
        <!-- 1. Ground Contact Shadow (Soft multiply blur) -->
        <ellipse cx="2" cy="5" rx="32" ry="14" fill="#0F172A" opacity="0.28" style="mix-blend-mode: multiply;"/>
        <ellipse cx="2" cy="5" rx="24" ry="10" fill="#000000" opacity="0.18" style="mix-blend-mode: multiply;"/>

        <!-- 2. Wheels -->
        <!-- Rear Left Wheel (Behind body) -->
        <g class="wheel-rear-left" transform="translate(18, -12)">
          <ellipse cx="0" cy="0" rx="5.5" ry="9" fill="#1E293B"/>
          <ellipse cx="0" cy="0" rx="3.5" ry="6" fill="#64748B"/>
          <ellipse cx="0" cy="0" rx="1.5" ry="3" fill="#CBD5E1"/>
        </g>

        <!-- 3. Lower Chassis & Battery Bay Box -->
        <!-- Battery tray underneath (highlighted with TotooGo green battery indicator) -->
        <polygon points="-12,-12 16,-28 20,-26 -8,-10" fill="#0F172A"/>
        <polygon points="-6,-10 6,-17 6,-12 -6,-5" fill="#00E676" opacity="0.9"/>
        <polygon points="6,-17 12,-14 12,-9 6,-12" fill="#00B0FF" opacity="0.4"/>

        <!-- 4. Front Body & Driver Cabin -->
        <!-- Front Wheel (Centered in front) -->
        <g class="wheel-front" transform="translate(-24, 7)">
          <ellipse cx="0" cy="0" rx="4.5" ry="8" fill="#0F172A"/>
          <ellipse cx="0" cy="0" rx="2.5" ry="5" fill="#64748B"/>
          <ellipse cx="0" cy="0" rx="1.2" ry="2.2" fill="#E2E8F0"/>
          <!-- Mudguard / Fender (Vibrant Green) -->
          <path d="M-4,-4 Q-3,-11 3,-8 L2,-4 Z" fill="#00A651"/>
        </g>

        <!-- Front Cowl & Apron (Aerodynamic bulbous nose in TotooGo green) -->
        <!-- Front-left sloping face -->
        <polygon points="-32,-2 -22,-16 -12,-11 -22,3" fill="#00A651"/>
        <!-- Front leading curved nose -->
        <polygon points="-34,-1 -32,-2 -22,3 -24,4" fill="#008744"/>
        <!-- Front bumper bar -->
        <polygon points="-35,1 -22,7 -22,9 -35,3" fill="#1E293B"/>
        <!-- Bright Round Headlight (Yellow warm beam) -->
        <ellipse cx="-28" cy="1" rx="2.8" ry="3.5" fill="#FEF08A"/>
        <ellipse cx="-28" cy="1" rx="1.6" ry="2.2" fill="#FFFFFF"/>
        <!-- Chrome headlight bezel -->
        <ellipse cx="-28" cy="1" rx="3.2" ry="3.8" fill="none" stroke="#CBD5E1" stroke-width="0.8"/>
        <!-- Left indicator blinker -->
        <ellipse cx="-21" cy="4" rx="1.2" ry="1.6" fill="#F97316"/>

        <!-- Driver Cabin Floor & Pedals -->
        <polygon points="-22,3 -12,-2 -4,3 -14,8" fill="#1E293B"/>
        
        <!-- Driver Figure (Seated driver with green TotooGo uniform shirt) -->
        <g class="tg-driver" transform="translate(-12, -10)">
          <!-- Head / Hair -->
          <circle cx="0" cy="-10" r="3.6" fill="#78350F"/>
          <path d="M-3,-13 Q0,-16 3,-13 Z" fill="#1E293B"/>
          <!-- Body / Torso -->
          <path d="M-3,-6 L2,-9 L3,2 L-2,5 Z" fill="#00A651"/>
          <!-- Arm holding handlebars -->
          <path d="M-1,-4 L-7, -1 L-9, -2" fill="none" stroke="#008744" stroke-width="2.2" stroke-linecap="round"/>
          <circle cx="-9" cy="-2" r="1.2" fill="#78350F"/>
          <!-- Handlebar steering column -->
          <line x1="-8" y1="-2" x2="-14" y2="4" stroke="#475569" stroke-width="1.8"/>
        </g>

        <!-- Windshield Frame & Glass -->
        <polygon points="-25,-14 -12,-28 -8,-25 -21,-11" fill="#BAE6FD" opacity="0.75"/>
        <!-- Specular reflection glint on windshield -->
        <line x1="-22" y1="-14" x2="-12" y2="-25" stroke="#FFFFFF" stroke-width="1.4" opacity="0.85"/>
        <!-- Windshield rubber border -->
        <polygon points="-25,-14 -12,-28 -8,-25 -21,-11" fill="none" stroke="#0F172A" stroke-width="1.2"/>
        <!-- Wiper blade -->
        <line x1="-16" y1="-14" x2="-19" y2="-21" stroke="#0F172A" stroke-width="1.2" stroke-linecap="round"/>

        <!-- Middle Body Structure -->
        ${variant === "cargo" ? cargoBox : passengerCabin}

        <!-- 5. Signature Black Canopy Roof (Curved aerodynamic top) -->
        <g class="tg-roof-canopy">
          <!-- Roof Ceiling / Underside shadow -->
          <polygon points="-24,-27 -9,-38 29,-18 14,-7" fill="#0A0F1D"/>
          <!-- Roof Top Slab (Deep black / charcoal with soft highlight) -->
          <polygon points="-25,-29 -10,-40 28,-20 13,-9" fill="#1E293B"/>
          <!-- Roof Highlight ridge -->
          <polygon points="-23,-30 -9,-40 26,-21 12,-11" fill="#334155" opacity="0.85"/>
          <!-- Front curved canopy overhang visor -->
          <polygon points="-27,-27 -25,-29 13,-9 11,-7" fill="#0F172A"/>
          <!-- Canopy support pillars (Front left, center left, rear left) -->
          <line x1="-21" y1="-11" x2="-23" y2="-28" stroke="#1E293B" stroke-width="1.8" stroke-linecap="round"/>
          <line x1="-6" y1="-20" x2="-8" y2="-35" stroke="#1E293B" stroke-width="1.8" stroke-linecap="round"/>
          <line x1="22" y1="-33" x2="22" y2="-22" stroke="#1E293B" stroke-width="1.8" stroke-linecap="round"/>
          <!-- Side mirror -->
          <line x1="-24" y1="-12" x2="-27" y2="-15" stroke="#1E293B" stroke-width="1.2"/>
          <ellipse cx="-28" cy="-15" rx="1.4" ry="2.2" fill="#334155"/>
          <ellipse cx="-28" cy="-15" rx="1.0" ry="1.6" fill="#E2E8F0"/>
        </g>

        <!-- 6. Near-Side Rear Wheel (Front-most wheel in isometric projection) -->
        <g class="wheel-rear-right" transform="translate(6, 1)">
          <!-- Tire -->
          <ellipse cx="0" cy="0" rx="5.8" ry="10" fill="#0F172A"/>
          <!-- Steel rim -->
          <ellipse cx="0" cy="0" rx="3.6" ry="6.8" fill="#64748B"/>
          <!-- Chrome hubcap -->
          <ellipse cx="0" cy="0" rx="1.8" ry="3.4" fill="#E2E8F0"/>
          <!-- Flared Green Wheel Arch / Mudguard -->
          <path d="M-6,-4 Q0,-12 6,-8 L5,-3 Z" fill="#00A651"/>
        </g>
      </g>
    </g>
  `;
}
