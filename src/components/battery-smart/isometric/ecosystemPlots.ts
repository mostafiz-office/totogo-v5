/**
 * TotooGo EV Mobility Ecosystem — 8 Business Scenes & Local Bangladeshi Context
 * Accurate 30-degree isometric projection designed to seamlessly integrate into
 * the main hero SVG canvas (viewBox="0 0 1922 2083").
 */

import { generateThreeWheelerSVG } from "./threeWheelerAssets";

export function generateEcosystemPlotsSVG(): string {
  // ── Plot 8: Driver Onboarding & Vehicle Purchase (x: 290, y: 1510) ─────────
  // Story Step 1: A driver joins TotooGo, completes onboarding, and receives vehicle
  const plot8_Onboarding = `
    <g id="plot8_DriverOnboarding" class="tg-plot" transform="translate(300, 1510)">
      <!-- Ground shadow -->
      <polygon points="0,0 120,-69 220,-12 100,57" fill="#0F172A" opacity="0.12" style="mix-blend-mode: multiply;"/>
      <!-- Onboarding Paved Plaza Floor -->
      <polygon points="0,0 110,-63 210,-6 100,57" fill="#E2E8F0"/>
      <polygon points="5,-1 105,-61 205,-7 105,53" fill="#F8FAFC"/>

      <!-- Onboarding Booth / Desk Structure -->
      <g transform="translate(45, -20)">
        <!-- Canopy Roof (TotooGo Green with white stripe) -->
        <polygon points="-30,-50 15,-76 65,-47 20,-21" fill="#00A651"/>
        <polygon points="-30,-47 15,-73 65,-44 20,-18" fill="#008744"/>
        <polygon points="-30,-47 -30,-44 20,-18 20,-21" fill="#005A32"/>
        <polygon points="20,-21 20,-18 65,-44 65,-47" fill="#003D20"/>
        <!-- Banner Signboard -->
        <g transform="translate(18, -32) skewY(30) scale(0.7)">
          <rect x="-35" y="-12" width="70" height="18" rx="3" fill="#FFFFFF" stroke="#00A651" stroke-width="1.5"/>
          <text x="0" y="0" font-family="'Rubik', sans-serif" font-size="7" font-weight="800" fill="#00A651" text-anchor="middle">totooGO ONBOARDING</text>
          <text x="0" y="6" font-family="'Hind Siliguri', 'Rubik', sans-serif" font-size="5" font-weight="700" fill="#1E293B" text-anchor="middle">ড্রাইভার নিবন্ধন ও গাড়ি হস্তান্তর</text>
        </g>
        <!-- Canopy pillars -->
        <line x1="-25" y1="-44" x2="-25" y2="0" stroke="#64748B" stroke-width="2.5"/>
        <line x1="15" y1="-67" x2="15" y2="-23" stroke="#64748B" stroke-width="2.5"/>
        <line x1="60" y1="-41" x2="60" y2="3" stroke="#64748B" stroke-width="2.5"/>
        <line x1="18" y1="-18" x2="18" y2="26" stroke="#64748B" stroke-width="2.5"/>

        <!-- Consultation Desk & Chairs -->
        <polygon points="-5,5 25,-12 45,-1 15,16" fill="#CBD5E1"/>
        <polygon points="-5,5 15,16 15,22 -5,11" fill="#94A3B8"/>
        <polygon points="15,16 45,-1 45,5 15,22" fill="#64748B"/>
        <!-- Laptop / Tablet on desk -->
        <polygon points="12,4 20,0 24,5 16,9" fill="#0F172A"/>
        <polygon points="20,0 24,5 24,-2 20,-7" fill="#38BDF8"/>

        <!-- TotooGo Officer (Standing, holding key & certificate) -->
        <g transform="translate(28, -6)">
          <circle cx="0" cy="-22" r="4" fill="#8D5B4C"/>
          <path d="M-4,-18 L4,-18 L5,-3 L-4,-3 Z" fill="#00A651"/> <!-- TotooGo Polo -->
          <!-- Arm extending with ceremonial vehicle key -->
          <line x1="0" y1="-14" x2="-8" y2="-10" stroke="#8D5B4C" stroke-width="2.5" stroke-linecap="round"/>
          <circle cx="-9" cy="-10" r="1.5" fill="#F59E0B"/> <!-- Gold Key -->
          <line x1="-3" y1="-3" x2="-3" y2="12" stroke="#1E293B" stroke-width="3"/>
          <line x1="3" y1="-3" x2="3" y2="12" stroke="#1E293B" stroke-width="3"/>
        </g>

        <!-- New Driver Joining (Receiving key, smiling, traditional cap/panjabi) -->
        <g transform="translate(10, 8)">
          <circle cx="0" cy="-20" r="3.8" fill="#78350F"/>
          <ellipse cx="0" cy="-23" rx="3.5" ry="1.8" fill="#FFFFFF"/> <!-- White prayer cap -->
          <path d="M-4,-16 L4,-16 L4,-1 L-4,-1 Z" fill="#F1F5F9"/> <!-- Panjabi -->
          <!-- Arm reaching to take key -->
          <line x1="-1" y1="-12" x2="7" y2="-10" stroke="#78350F" stroke-width="2.2" stroke-linecap="round"/>
          <line x1="-3" y1="-1" x2="-3" y2="14" stroke="#475569" stroke-width="2.8"/>
          <line x1="3" y1="-1" x2="3" y2="14" stroke="#475569" stroke-width="2.8"/>
        </g>
      </g>

      <!-- Handover Ready Vehicle: Shiny new TotooGo passenger EV with ceremonial red bow -->
      <g transform="translate(120, 10)">
        ${generateThreeWheelerSVG({ variant: "passenger", orientation: "down-left", scale: 0.95 })}
        <!-- Red Handover Ribbon / Bow on Front Cowl -->
        <g transform="translate(-28, -2) scale(0.9)">
          <ellipse cx="0" cy="0" rx="4" ry="2.5" fill="#DC2626"/>
          <path d="M-4,0 Q-8,-6 -1,-5 Q-4,0 0,0" fill="#EF4444"/>
          <path d="M4,0 Q8,-6 1,-5 Q4,0 0,0" fill="#EF4444"/>
          <line x1="-2" y1="2" x2="-5" y2="8" stroke="#DC2626" stroke-width="1.5"/>
          <line x1="2" y1="2" x2="5" y2="8" stroke="#DC2626" stroke-width="1.5"/>
        </g>
      </g>
    </g>
  `;

  // ── Plot 6: Fleet Operations Hub (x: 480, y: 1390) ─────────────────────────
  // Story Step 2: Newly inducted vehicle joins organized fleet ready for daily service
  const plot6_FleetOps = `
    <g id="plot6_FleetOperations" class="tg-plot" transform="translate(480, 1380)">
      <!-- Base Slab -->
      <polygon points="0,0 160,-92 280,-23 120,69" fill="#0F172A" opacity="0.14" style="mix-blend-mode: multiply;"/>
      <polygon points="5,-3 155,-89 275,-20 125,66" fill="#E2E8F0"/>
      <polygon points="10,-6 150,-86 270,-17 130,63" fill="#CBD5E1"/>

      <!-- Shaded Fleet Canopy Structure (Modern Solar Roof Shelter) -->
      <g transform="translate(60, -35)">
        <!-- Canopy Roof Slab -->
        <polygon points="-40,-70 50,-122 170,-53 80,-1" fill="#00A651"/>
        <polygon points="-40,-67 50,-119 170,-50 80,2" fill="#008744"/>
        <!-- Photovoltaic Solar Panels on Fleet Canopy -->
        <g opacity="0.85">
          <polygon points="-25,-75 40,-112 85,-86 20,-49" fill="#1E3A8A"/>
          <polygon points="25,-46 90,-83 135,-57 70,-20" fill="#1E3A8A"/>
          <!-- Panel Grids -->
          <line x1="5" y1="-93" x2="50" y2="-67" stroke="#38BDF8" stroke-width="0.8"/>
          <line x1="55" y1="-64" x2="100" y2="-38" stroke="#38BDF8" stroke-width="0.8"/>
        </g>
        <!-- Fleet Operations Signboard -->
        <g transform="translate(65, -8) skewY(30) scale(0.75)">
          <rect x="-42" y="-12" width="84" height="19" rx="3" fill="#0A0F1D" stroke="#00A651" stroke-width="1.8"/>
          <text x="0" y="0" font-family="'Rubik', sans-serif" font-size="7.5" font-weight="800" fill="#00E676" text-anchor="middle">totooGO FLEET HUB</text>
          <text x="0" y="6" font-family="'Hind Siliguri', 'Rubik', sans-serif" font-size="5" font-weight="700" fill="#E2E8F0" text-anchor="middle">ফ্লিট অপারেশনস ও পার্কিং বে</text>
        </g>
        <!-- Support Trusses -->
        <line x1="-35" y1="-64" x2="-35" y2="10" stroke="#475569" stroke-width="3"/>
        <line x1="45" y1="-110" x2="45" y2="-36" stroke="#475569" stroke-width="3"/>
        <line x1="165" y1="-47" x2="165" y2="27" stroke="#475569" stroke-width="3"/>
        <line x1="75" y1="2" x2="75" y2="76" stroke="#475569" stroke-width="3"/>
      </g>

      <!-- Parking Bay Markings & Numbered Stalls -->
      <!-- Bay 1 (Passenger EV) -->
      <g transform="translate(45, 10)">
        <polygon points="-20,-11 15,-31 35,-19 0,1" fill="#F8FAFC" opacity="0.3"/>
        <line x1="-20" y1="-11" x2="0" y2="1" stroke="#FEF08A" stroke-width="1.5" stroke-dasharray="4 2"/>
        ${generateThreeWheelerSVG({ variant: "passenger", orientation: "down-left", scale: 0.85 })}
      </g>

      <!-- Bay 2 (Cargo EV) -->
      <g transform="translate(95, -18)">
        <polygon points="-20,-11 15,-31 35,-19 0,1" fill="#F8FAFC" opacity="0.3"/>
        <line x1="-20" y1="-11" x2="0" y2="1" stroke="#FEF08A" stroke-width="1.5" stroke-dasharray="4 2"/>
        ${generateThreeWheelerSVG({ variant: "cargo", orientation: "down-left", scale: 0.85 })}
      </g>

      <!-- Bay 3 (Passenger EV staged to pull out) -->
      <g transform="translate(145, -46)">
        <polygon points="-20,-11 15,-31 35,-19 0,1" fill="#F8FAFC" opacity="0.3"/>
        <line x1="-20" y1="-11" x2="0" y2="1" stroke="#FEF08A" stroke-width="1.5" stroke-dasharray="4 2"/>
        ${generateThreeWheelerSVG({ variant: "passenger", orientation: "down-left", scale: 0.85 })}
      </g>

      <!-- Fleet Manager with Clipboard (Checking tyre pressure & battery SoC) -->
      <g transform="translate(125, 25)">
        <ellipse cx="0" cy="6" rx="6" ry="3" fill="#0F172A" opacity="0.25"/>
        <circle cx="0" cy="-22" r="3.8" fill="#8D5B4C"/>
        <!-- Yellow High-Vis Safety Vest over TotooGo Shirt -->
        <path d="M-4,-18 L4,-18 L5,-3 L-4,-3 Z" fill="#00A651"/>
        <path d="M-3,-17 L3,-17 L4,-4 L-3,-4 Z" fill="#EAB308"/>
        <line x1="-1" y1="-14" x2="1" y2="-14" stroke="#FFFFFF" stroke-width="1"/>
        <!-- Clipboard in hand -->
        <polygon points="5,-14 9,-12 6,-6 2,-8" fill="#78350F"/>
        <polygon points="6,-13 9,-11 7,-7 4,-9" fill="#F8FAFC"/>
        <line x1="-3" y1="-3" x2="-3" y2="12" stroke="#1E293B" stroke-width="2.8"/>
        <line x1="3" y1="-3" x2="3" y2="12" stroke="#1E293B" stroke-width="2.8"/>
      </g>
    </g>
  `;

  // ── Plot 1: Battery Swapping (Main Station Centerpiece, x: 800, y: 1200) ────
  // Story Step 4: Driver pulls into swap bay; depleted battery replaced with fully charged pack
  const plot1_BatterySwapping = `
    <g id="plot1_BatterySwappingDock" class="tg-plot" transform="translate(790, 1220)">
      <!-- Swapping Bay Concrete Drive-in Pad -->
      <polygon points="-40,0 40,-46 140,11 60,57" fill="#0F172A" opacity="0.16" style="mix-blend-mode: multiply;"/>
      <polygon points="-35,-2 40,-45 135,10 60,53" fill="#E2E8F0"/>
      <!-- Green illuminated guide border -->
      <polygon points="-30,-1 38,-40 128,12 60,51" fill="#CBD5E1"/>
      <polygon points="-20,2 35,-30 115,16 60,48" fill="#F1F5F9"/>

      <!-- Chevron Guide Markings for Vehicle Alignment -->
      <path d="M10,-10 L30,2 L50,-10" fill="none" stroke="#00E676" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M25,-2 L45,10 L65,-2" fill="none" stroke="#00E676" stroke-width="2.5" stroke-linecap="round"/>

      <!-- Three-Wheeler parked at swap bay (Driver watching the 60-second swap) -->
      <g transform="translate(42, 6)">
        ${generateThreeWheelerSVG({ variant: "passenger", orientation: "down-left", scale: 0.95 })}
      </g>

      <!-- TotooGo Smart Battery Swap Cabinets (2 Units side-by-side with LED status matrix) -->
      <g transform="translate(125, -25)">
        <!-- Cabinet 1 -->
        <g class="tg-swap-cabinet" transform="translate(0, 0)">
          <!-- Ground Shadow -->
          <polygon points="-12,0 12,-14 28,-5 4,9" fill="#0F172A" opacity="0.3" style="mix-blend-mode: multiply;"/>
          <!-- Cabinet Body (Matte Black with Emerald Accents) -->
          <!-- Left side face -->
          <polygon points="-12,-48 4,-39 4,0 -12,-9" fill="#0F172A"/>
          <!-- Front face (facing viewer) -->
          <polygon points="4,-39 28,-53 28,-14 4,0" fill="#1E293B"/>
          <!-- Top face -->
          <polygon points="-12,-48 12,-62 28,-53 4,-39" fill="#334155"/>
          <!-- Glowing Green Battery Slots (12 slots, 10 charged green, 2 charging blue) -->
          <g transform="translate(10, -42) skewY(-30) scale(0.8)">
            <!-- Column 1 -->
            <rect x="0" y="0" width="6" height="5" rx="1" fill="#00E676"/>
            <rect x="0" y="7" width="6" height="5" rx="1" fill="#00E676"/>
            <rect x="0" y="14" width="6" height="5" rx="1" fill="#00E676"/>
            <rect x="0" y="21" width="6" height="5" rx="1" fill="#38BDF8" class="tg-led-charging"/> <!-- Charging -->
            <!-- Column 2 -->
            <rect x="8" y="0" width="6" height="5" rx="1" fill="#00E676"/>
            <rect x="8" y="7" width="6" height="5" rx="1" fill="#00E676"/>
            <rect x="8" y="14" width="6" height="5" rx="1" fill="#00E676"/>
            <rect x="8" y="21" width="6" height="5" rx="1" fill="#00E676"/>
          </g>
          <!-- Cabinet Digital Screen (Status: Ready / সোয়াপ প্রস্তুত) -->
          <g transform="translate(12, -49) skewY(-30) scale(0.6)">
            <rect x="0" y="0" width="16" height="7" rx="1" fill="#00E676"/>
            <text x="8" y="5" font-family="'Rubik', sans-serif" font-size="4" font-weight="800" fill="#0F172A" text-anchor="middle">SWAP OK</text>
          </g>
        </g>

        <!-- Cabinet 2 (Adjacent Unit) -->
        <g class="tg-swap-cabinet" transform="translate(25, -14)">
          <polygon points="-12,-48 4,-39 4,0 -12,-9" fill="#0F172A"/>
          <polygon points="4,-39 28,-53 28,-14 4,0" fill="#1E293B"/>
          <polygon points="-12,-48 12,-62 28,-53 4,-39" fill="#334155"/>
          <g transform="translate(10, -42) skewY(-30) scale(0.8)">
            <rect x="0" y="0" width="6" height="5" rx="1" fill="#00E676"/>
            <rect x="0" y="7" width="6" height="5" rx="1" fill="#00E676"/>
            <rect x="0" y="14" width="6" height="5" rx="1" fill="#00E676"/>
            <rect x="0" y="21" width="6" height="5" rx="1" fill="#00E676"/>
            <rect x="8" y="0" width="6" height="5" rx="1" fill="#00E676"/>
            <rect x="8" y="7" width="6" height="5" rx="1" fill="#38BDF8" class="tg-led-charging"/>
            <rect x="8" y="14" width="6" height="5" rx="1" fill="#00E676"/>
            <rect x="8" y="21" width="6" height="5" rx="1" fill="#00E676"/>
          </g>
        </g>
      </g>

      <!-- Battery Swapping Interaction: Technician with Green Battery Pack -->
      <g transform="translate(85, -2)">
        <!-- Station Technician in Green TotooGo Overall / Vest -->
        <ellipse cx="0" cy="8" rx="5" ry="2.5" fill="#0F172A" opacity="0.25"/>
        <circle cx="0" cy="-22" r="3.8" fill="#8D5B4C"/>
        <!-- Yellow safety cap -->
        <path d="M-4,-23 C-4,-27 4,-27 4,-23 Z" fill="#FACC15"/>
        <path d="M-4,-18 L4,-18 L5,-2 L-4,-2 Z" fill="#00A651"/>
        <!-- Heavy work gloves holding Battery Module -->
        <g class="tg-swapping-battery" transform="translate(-10, -10)">
          <!-- TotooGo Smart Battery Pack (Compact emerald module with handle & LED) -->
          <polygon points="-6,-6 4,-12 12,-7 2,-1" fill="#10B981"/>
          <polygon points="-6,-6 2,-1 2,6 -6,1" fill="#059669"/>
          <polygon points="2,-1 12,-7 12,0 2,6" fill="#047857"/>
          <!-- Glowing charge indicator on battery -->
          <circle cx="3" cy="2" r="1.4" fill="#6EE7B7"/>
          <circle cx="7" cy="0" r="1.4" fill="#6EE7B7"/>
          <!-- Sturdy lifting handle -->
          <path d="M1,-8 L5,-10 L7,-9" fill="none" stroke="#FFFFFF" stroke-width="1.2"/>
        </g>
        <!-- Pants / Boots -->
        <line x1="-3" y1="-2" x2="-3" y2="12" stroke="#1E293B" stroke-width="2.8"/>
        <line x1="3" y1="-2" x2="3" y2="12" stroke="#1E293B" stroke-width="2.8"/>
      </g>

      <!-- Second Technician receiving depleted pack onto mobile cart -->
      <g transform="translate(30, -20)">
        <!-- Mobile Battery Dolly / Cart -->
        <polygon points="-10,0 10,-11 20,-5 0,6" fill="#475569"/>
        <circle cx="-5" cy="5" r="2" fill="#0F172A"/>
        <circle cx="15" cy="-2" r="2" fill="#0F172A"/>
        <!-- Depleted battery pack on cart -->
        <polygon points="-2,-2 6,-7 12,-3 4,2" fill="#64748B"/>
        <polygon points="-2,-2 4,2 4,6 -2,2" fill="#475569"/>
      </g>
    </g>
  `;

  // ── Plot 2: Service & Support (Diagnostic & Maintenance Bay, x: 1140, y: 1330) ─
  // Diagnostic and technical service point (NOT another swap station, NOT sales)
  const plot2_ServiceSupport = `
    <g id="plot2_ServiceSupportBay" class="tg-plot" transform="translate(1140, 1330)">
      <!-- Ground shadow & concrete pad -->
      <polygon points="0,0 100,-58 180,-12 80,46" fill="#0F172A" opacity="0.14" style="mix-blend-mode: multiply;"/>
      <polygon points="5,-2 95,-55 175,-9 85,44" fill="#E2E8F0"/>
      <polygon points="10,-4 90,-51 170,-6 90,40" fill="#CBD5E1"/>

      <!-- Service Bay Canopy (Blue / White Service Tone) -->
      <g transform="translate(50, -30)">
        <polygon points="-30,-45 20,-74 70,-45 20,-16" fill="#0284C7"/>
        <polygon points="-30,-42 20,-71 70,-42 20,-13" fill="#0369A1"/>
        <!-- Signboard -->
        <g transform="translate(20, -22) skewY(30) scale(0.7)">
          <rect x="-38" y="-12" width="76" height="18" rx="3" fill="#FFFFFF" stroke="#0284C7" stroke-width="1.5"/>
          <text x="0" y="0" font-family="'Rubik', sans-serif" font-size="7" font-weight="800" fill="#0284C7" text-anchor="middle">totooGO SERVICE &amp; CARE</text>
          <text x="0" y="6" font-family="'Hind Siliguri', 'Rubik', sans-serif" font-size="5" font-weight="700" fill="#1E293B" text-anchor="middle">সার্ভিস, ডায়াগনস্টিক ও রক্ষণাবেক্ষণ</text>
        </g>
        <!-- Steel posts -->
        <line x1="-25" y1="-40" x2="-25" y2="10" stroke="#64748B" stroke-width="2.5"/>
        <line x1="20" y1="-65" x2="20" y2="-15" stroke="#64748B" stroke-width="2.5"/>
        <line x1="65" y1="-38" x2="65" y2="12" stroke="#64748B" stroke-width="2.5"/>
        <line x1="20" y1="-13" x2="20" y2="35" stroke="#64748B" stroke-width="2.5"/>
      </g>

      <!-- Hydraulic Inspection Lift with Three-Wheeler elevated for undercarriage check -->
      <g transform="translate(60, 5)">
        <!-- Lift Ramps (Yellow Steel) -->
        <polygon points="-25,-5 0,-20 20,-8 -5,7" fill="#EAB308"/>
        <!-- Hydraulic cylinder -->
        <line x1="-3" y1="1" x2="-3" y2="12" stroke="#94A3B8" stroke-width="5"/>
        <!-- Vehicle elevated on lift -->
        <g transform="translate(-3, -15)">
          ${generateThreeWheelerSVG({ variant: "passenger", orientation: "down-left", scale: 0.85 })}
        </g>
      </g>

      <!-- Certified Technician with Diagnostic Tablet under vehicle -->
      <g transform="translate(105, 12)">
        <ellipse cx="0" cy="5" rx="5" ry="2.5" fill="#0F172A" opacity="0.25"/>
        <circle cx="0" cy="-22" r="3.6" fill="#8D5B4C"/>
        <!-- Service Uniform (Navy Blue with TotooGo green collar) -->
        <path d="M-4,-18 L4,-18 L5,-3 L-4,-3 Z" fill="#1E3A8A"/>
        <!-- Diagnostic tablet with green signal graph -->
        <polygon points="-8,-12 -2,-15 1,-9 -5,-6" fill="#0F172A"/>
        <polygon points="-7,-11 -3,-14 -1,-10 -5,-7" fill="#00E676"/>
        <line x1="-3" y1="-3" x2="-3" y2="10" stroke="#0F172A" stroke-width="2.8"/>
        <line x1="3" y1="-3" x2="3" y2="10" stroke="#0F172A" stroke-width="2.8"/>
      </g>

      <!-- Tool Chest & Diagnostic Equipment Tower -->
      <g transform="translate(25, -15)">
        <!-- Red Professional Tool Trolley -->
        <polygon points="-10,-12 4,-20 14,-14 0,-6" fill="#DC2626"/>
        <polygon points="-10,-12 0,-6 0,8 -10,2" fill="#B91C1C"/>
        <polygon points="0,-6 14,-14 14,0 0,8" fill="#991B1B"/>
        <!-- Drawer lines -->
        <line x1="-8" y1="-3" x2="-1" y2="1" stroke="#F87171" stroke-width="1"/>
        <line x1="-8" y1="1" x2="-1" y2="5" stroke="#F87171" stroke-width="1"/>
      </g>
    </g>
  `;

  // ── Plot 3: Partner Network Kiosk (x: 1390, y: 1160) ───────────────────────
  // Smaller partner-operated TotooGo swap cabinet integrated with a local business
  const plot3_PartnerNetwork = `
    <g id="plot3_PartnerNetworkKiosk" class="tg-plot" transform="translate(1380, 1150)">
      <!-- Ground Shadow & sidewalk placement -->
      <polygon points="0,0 80,-46 140,-12 60,34" fill="#0F172A" opacity="0.14" style="mix-blend-mode: multiply;"/>
      <polygon points="5,-2 75,-43 135,-9 65,32" fill="#CBD5E1"/>

      <!-- Partner Shop Structure (Neighborhood Auto Parts & Tea) -->
      <g transform="translate(20, -15)">
        <!-- Shop wall -->
        <polygon points="0,-40 50,-69 50,-29 0,0" fill="#D97706"/>
        <polygon points="50,-69 85,-49 85,-9 50,-29" fill="#B45309"/>
        <!-- Striped Awning (Orange & White) -->
        <polygon points="-10,-42 45,-74 75,-57 20,-25" fill="#F97316"/>
        <polygon points="-10,-39 45,-71 75,-54 20,-22" fill="#EA580C"/>
        <!-- Shop sign -->
        <g transform="translate(25, -42) skewY(-30) scale(0.65)">
          <rect x="-24" y="-8" width="48" height="15" rx="2" fill="#FFFFFF"/>
          <text x="0" y="2" font-family="'Hind Siliguri', 'Rubik', sans-serif" font-size="6" font-weight="700" fill="#9A3412" text-anchor="middle">রহমান অটো পার্টস</text>
        </g>
      </g>

      <!-- Compact 6-Slot TotooGo Partner Swap Cabinet -->
      <g transform="translate(75, 5)">
        <polygon points="-10,-36 3,-29 3,2 -10,-5" fill="#0F172A"/>
        <polygon points="3,-29 20,-39 20,-8 3,2" fill="#1E293B"/>
        <polygon points="-10,-36 7,-46 20,-39 3,-29" fill="#334155"/>
        <!-- 6 Battery Slots with glowing LEDs -->
        <g transform="translate(7, -31) skewY(-30) scale(0.7)">
          <rect x="0" y="0" width="5" height="4.5" rx="1" fill="#00E676"/>
          <rect x="0" y="6" width="5" height="4.5" rx="1" fill="#00E676"/>
          <rect x="0" y="12" width="5" height="4.5" rx="1" fill="#38BDF8"/>
          <rect x="7" y="0" width="5" height="4.5" rx="1" fill="#00E676"/>
          <rect x="7" y="6" width="5" height="4.5" rx="1" fill="#00E676"/>
          <rect x="7" y="12" width="5" height="4.5" rx="1" fill="#00E676"/>
        </g>
        <!-- Distinct Partner Point Signage on Top -->
        <g transform="translate(5, -45) skewY(30) scale(0.6)">
          <rect x="-18" y="-9" width="36" height="15" rx="2" fill="#00A651" stroke="#FFFFFF" stroke-width="1"/>
          <text x="0" y="0" font-family="'Rubik', sans-serif" font-size="6" font-weight="800" fill="#FFFFFF" text-anchor="middle">totooGO</text>
          <text x="0" y="6" font-family="'Hind Siliguri', 'Rubik', sans-serif" font-size="4.5" font-weight="700" fill="#FEF08A" text-anchor="middle">পার্টনার স্টেশন</text>
        </g>
      </g>

      <!-- Driver exchanging battery with shop partner -->
      <g transform="translate(105, 18)">
        <ellipse cx="0" cy="5" rx="4" ry="2" fill="#0F172A" opacity="0.25"/>
        <circle cx="0" cy="-18" r="3.2" fill="#78350F"/>
        <path d="M-3,-15 L3,-15 L4,-2 L-3,-2 Z" fill="#0D9488"/>
        <line x1="-2" y1="-2" x2="-2" y2="10" stroke="#1E293B" stroke-width="2.5"/>
        <line x1="2" y1="-2" x2="2" y2="10" stroke="#1E293B" stroke-width="2.5"/>
      </g>
    </g>
  `;

  // ── Plot 4: Technology & Clean Energy (x: 680, y: 580) ──────────────────────
  // Rooftop / Ground Solar arrays, power inverters, battery storage racks (BESS)
  const plot4_TechEnergy = `
    <g id="plot4_TechnologyCleanEnergy" class="tg-plot" transform="translate(680, 580)">
      <!-- Energy Facility Perimeter Base -->
      <polygon points="0,0 120,-69 220,-12 100,57" fill="#0F172A" opacity="0.1" style="mix-blend-mode: multiply;"/>
      <polygon points="5,-2 115,-66 215,-9 105,54" fill="#F1F5F9"/>

      <!-- Advanced Commercial Solar PV Array (Dual Rows) -->
      <g transform="translate(30, -10)">
        <!-- Row 1 -->
        <polygon points="-20,-25 35,-57 90,-25 35,7" fill="#0284C7"/>
        <polygon points="-18,-24 35,-55 88,-25 35,6" fill="#1E3A8A"/>
        <!-- Grid Cells -->
        <line x1="0" y1="-38" x2="55" y2="-6" stroke="#38BDF8" stroke-width="0.9"/>
        <line x1="18" y1="-48" x2="73" y2="-16" stroke="#38BDF8" stroke-width="0.9"/>
        <line x1="8" y1="-10" x2="62" y2="-41" stroke="#38BDF8" stroke-width="0.9"/>

        <!-- Row 2 (Staggered Solar Panels) -->
        <g transform="translate(45, -26)">
          <polygon points="-20,-25 35,-57 90,-25 35,7" fill="#0284C7"/>
          <polygon points="-18,-24 35,-55 88,-25 35,6" fill="#1E3A8A"/>
          <line x1="0" y1="-38" x2="55" y2="-6" stroke="#38BDF8" stroke-width="0.9"/>
          <line x1="18" y1="-48" x2="73" y2="-16" stroke="#38BDF8" stroke-width="0.9"/>
        </g>
      </g>

      <!-- Battery Energy Storage System (BESS Racks) -->
      <g transform="translate(130, 20)">
        <!-- Storage Cabinet 1 -->
        <polygon points="-10,-32 8,-42 22,-34 4,-24" fill="#E2E8F0"/>
        <polygon points="-10,-32 4,-24 4,5 -10,-3" fill="#94A3B8"/>
        <polygon points="4,-24 22,-34 22,-5 4,5" fill="#64748B"/>
        <!-- LED Status Strips (Green Clean Energy Flow) -->
        <line x1="7" y1="-21" x2="19" y2="-28" stroke="#00E676" stroke-width="1.8"/>
        <line x1="7" y1="-15" x2="19" y2="-22" stroke="#00E676" stroke-width="1.8"/>
        <line x1="7" y1="-9" x2="19" y2="-16" stroke="#00E676" stroke-width="1.8"/>

        <!-- Inverter Unit with Digital Dial & TotooGo Energy Emblem -->
        <g transform="translate(-25, 12)">
          <polygon points="-8,-24 4,-31 16,-24 4,-17" fill="#38BDF8"/>
          <polygon points="-8,-24 4,-17 4,4 -8,-3" fill="#0284C7"/>
          <polygon points="4,-17 16,-24 16,-3 4,4" fill="#0369A1"/>
          <!-- Energy Flow Arrow -->
          <path d="M-2,-7 L2,-13 L6,-8 L12,-16" fill="none" stroke="#FACC15" stroke-width="2" stroke-linecap="round"/>
        </g>
      </g>

      <!-- Clean Energy Flow Conduit (Luminescent green pipeline connecting to main station) -->
      <path d="M125,40 L115,70 L80,90" fill="none" stroke="#00E676" stroke-width="3" stroke-dasharray="6 3" opacity="0.85"/>
    </g>
  `;

  // ── Plot 7: Authentic Bangladeshi Neighborhood Life ────────────────────────
  // Tong tea stall, local mudir dokan, pharmacy, fruit crates, apartment balconies
  const plot7_BangladeshiNeighborhood = `
    <g id="plot7_BangladeshiNeighborhood" class="tg-plot">
      <!-- 1. Roadside Tong / Tea Stall ("রং চা স্টল") at x: 230, y: 1240 -->
      <g id="neighborhood_TongTeaStall" transform="translate(230, 1240)">
        <!-- Shadow -->
        <polygon points="-15,0 45,-35 85,-12 25,23" fill="#0F172A" opacity="0.14" style="mix-blend-mode: multiply;"/>
        <polygon points="-10,-2 40,-31 80,-8 30,21" fill="#EADFC4"/>

        <!-- Bamboo & Tin Shed Wooden Tong Structure -->
        <!-- Corrugated Tin Roof with weathered texture -->
        <polygon points="-20,-38 25,-64 65,-41 20,-15" fill="#64748B"/>
        <polygon points="-20,-36 25,-62 65,-39 20,-13" fill="#475569"/>
        <!-- Roof ridges -->
        <line x1="-10" y1="-43" x2="30" y2="-20" stroke="#94A3B8" stroke-width="1"/>
        <line x1="5" y1="-51" x2="45" y2="-28" stroke="#94A3B8" stroke-width="1"/>

        <!-- Wooden Support Poles -->
        <line x1="-16" y1="-34" x2="-16" y2="8" stroke="#78350F" stroke-width="2.5"/>
        <line x1="22" y1="-58" x2="22" y2="-18" stroke="#78350F" stroke-width="2.5"/>
        <line x1="60" y1="-37" x2="60" y2="12" stroke="#78350F" stroke-width="2.5"/>
        <line x1="18" y1="-13" x2="18" y2="28" stroke="#78350F" stroke-width="2.5"/>

        <!-- Tong Signboard in Bengali Script -->
        <g transform="translate(18, -26) skewY(30) scale(0.65)">
          <rect x="-24" y="-8" width="48" height="15" rx="2" fill="#FEF08A" stroke="#B45309" stroke-width="1.2"/>
          <text x="0" y="2" font-family="'Hind Siliguri', 'Rubik', sans-serif" font-size="7" font-weight="800" fill="#B45309" text-anchor="middle">মামা রং চা স্টল</text>
        </g>

        <!-- Tea Stove, Giant Aluminum Kettle & Clear Tea Glasses -->
        <g transform="translate(10, 4)">
          <!-- Wooden Service Counter -->
          <polygon points="-12,-4 15,-19 28,-12 1,3" fill="#A16207"/>
          <polygon points="-12,-4 1,3 1,12 -12,5" fill="#78350F"/>
          <polygon points="1,3 28,-12 28,-3 1,12" fill="#5A2E05"/>
          <!-- Classic Aluminum Tea Kettle (With spout and handle) -->
          <ellipse cx="6" cy="-14" rx="4" ry="5" fill="#E2E8F0"/>
          <ellipse cx="6" cy="-18" rx="2.5" ry="1.5" fill="#CBD5E1"/>
          <!-- Kettle Spout -->
          <path d="M10,-14 Q14,-15 15,-11" fill="none" stroke="#E2E8F0" stroke-width="2" stroke-linecap="round"/>
          <!-- Steam rising from hot milk tea -->
          <path d="M15,-12 Q18,-18 16,-23" fill="none" stroke="#FFFFFF" stroke-width="1.2" opacity="0.75"/>
          <!-- Condensed milk cans stacked -->
          <cylinder cx="-4" cy="-10" r="2" fill="#DC2626"/>
          <rect x="-6" y="-12" width="4" height="6" fill="#DC2626"/>
          <!-- Transparent Tea Glasses on tray -->
          <rect x="18" y="-7" width="2.5" height="4" rx="0.5" fill="#BAE6FD" opacity="0.8"/>
          <rect x="22" y="-9" width="2.5" height="4" rx="0.5" fill="#BAE6FD" opacity="0.8"/>
        </g>

        <!-- Wooden Bench with Local Customers Chatting (One in authentic lungi & vest, one in shirt) -->
        <g transform="translate(42, 14)">
          <!-- Wooden Bench -->
          <polygon points="-15,0 12,-15 16,-13 -11,2" fill="#A16207"/>
          <line x1="-14" y1="1" x2="-14" y2="8" stroke="#78350F" stroke-width="2"/>
          <line x1="14" y1="-13" x2="14" y2="-6" stroke="#78350F" stroke-width="2"/>
          <!-- Customer 1 (Wearing checkered Bangladeshi Lungi and genji/vest) -->
          <g transform="translate(-8, -4)">
            <circle cx="0" cy="-16" r="3.2" fill="#8D5B4C"/>
            <path d="M-3,-13 L3,-13 L3,-2 L-3,-2 Z" fill="#F8FAFC"/> <!-- White Genji -->
            <!-- Traditional Blue Checkered Lungi wrapped around waist -->
            <polygon points="-3,-2 3,-2 4,10 -4,10" fill="#0284C7"/>
            <line x1="-3" y1="2" x2="3" y2="2" stroke="#FFFFFF" stroke-width="0.8" opacity="0.6"/>
            <line x1="-4" y1="6" x2="4" y2="6" stroke="#FFFFFF" stroke-width="0.8" opacity="0.6"/>
          </g>
          <!-- Customer 2 holding tea glass -->
          <g transform="translate(6, -11)">
            <circle cx="0" cy="-16" r="3.2" fill="#78350F"/>
            <path d="M-3,-13 L3,-13 L3,-2 L-3,-2 Z" fill="#059669"/> <!-- Green Kurta -->
            <line x1="-2" y1="-2" x2="-2" y2="10" stroke="#1E293B" stroke-width="2.2"/>
            <line x1="2" y1="-2" x2="2" y2="10" stroke="#1E293B" stroke-width="2.2"/>
          </g>
        </g>
      </g>

      <!-- 2. Grocery Shop ("মুদি দোকান" & Fruit Stalls) at x: 1520, y: 980 -->
      <g id="neighborhood_MudirDokan" transform="translate(1520, 970)">
        <!-- Shop Base -->
        <polygon points="-20,-30 40,-65 80,-42 20,-7" fill="#D97706"/>
        <polygon points="20,-7 80,-42 80,5 20,40" fill="#B45309"/>
        <!-- Striped Green & Yellow Awning -->
        <polygon points="-25,-32 35,-67 75,-44 15,-9" fill="#16A34A"/>
        <polygon points="-25,-29 35,-64 75,-41 15,-6" fill="#CA8A04"/>

        <!-- Shop Name Banner -->
        <g transform="translate(35, -28) skewY(30) scale(0.68)">
          <rect x="-30" y="-9" width="60" height="16" rx="2" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.4"/>
          <text x="0" y="2" font-family="'Hind Siliguri', 'Rubik', sans-serif" font-size="7" font-weight="800" fill="#15803D" text-anchor="middle">জনতা মুদি স্টোর</text>
        </g>

        <!-- Fresh Produce Crates (Green Bananas, Mangoes, Coconuts, Potatoes) -->
        <g transform="translate(25, 20)">
          <!-- Crate 1 (Yellow Bananas / Mangoes) -->
          <polygon points="-8,-4 4,-11 12,-7 0,0" fill="#B45309"/>
          <ellipse cx="2" cy="-6" rx="4" ry="2.5" fill="#FACC15"/>
          <!-- Crate 2 (Green Vegetables & Papaya) -->
          <polygon points="6,-14 18,-21 26,-17 14,-10" fill="#B45309"/>
          <ellipse cx="16" cy="-16" rx="4" ry="2.5" fill="#22C55E"/>
          <!-- Hanging Bananas cluster -->
          <path d="M-15,-20 Q-10,-10 -15,-2" fill="none" stroke="#EAB308" stroke-width="3" stroke-linecap="round"/>
        </g>
      </g>

      <!-- 3. Local Pharmacy ("ফার্মেসি" with Green Cross) at x: 1300, y: 920 -->
      <g id="neighborhood_Pharmacy" transform="translate(1300, 920)">
        <!-- Building Facade -->
        <polygon points="0,-45 45,-71 75,-54 30,-28" fill="#F8FAFC"/>
        <polygon points="30,-28 75,-54 75,-14 30,12" fill="#E2E8F0"/>
        <!-- Blue & White Clean Medical Awning -->
        <polygon points="-5,-47 40,-73 70,-56 25,-30" fill="#0284C7"/>
        <!-- Green Cross Healthcare Signboard -->
        <g transform="translate(42, -36) skewY(30) scale(0.65)">
          <rect x="-26" y="-10" width="52" height="18" rx="3" fill="#FFFFFF" stroke="#059669" stroke-width="1.5"/>
          <!-- Green Cross Symbol -->
          <path d="M-16,-4 L-16,2 L-20,2 L-20,6 L-16,6 L-16,12 L-12,12 L-12,6 L-8,6 L-8,2 L-12,2 L-12,-4 Z" fill="#059669" transform="scale(0.6) translate(-8,-2)"/>
          <text x="3" y="1" font-family="'Hind Siliguri', 'Rubik', sans-serif" font-size="7" font-weight="800" fill="#059669" text-anchor="middle">গ্রীন লাইফ ফার্মেসি</text>
        </g>
      </g>

      <!-- 4. Apartment Building with Balconies, Verandas, and Clotheslines -->
      <!-- Placed in residential background corner (x: 1600, y: 840) -->
      <g id="neighborhood_ApartmentBuilding" transform="translate(1620, 840)">
        <!-- Tall Multistory Apartment Block -->
        <polygon points="-30,-120 40,-160 90,-131 20,-91" fill="#FEF3C7"/>
        <polygon points="-30,-120 20,-91 20,10 -30,-19" fill="#FDE68A"/>
        <polygon points="20,-91 90,-131 90,-30 20,10" fill="#D97706" opacity="0.85"/>
        
        <!-- Floor 3 Balcony & Railing with Laundry -->
        <g transform="translate(-10, -60)">
          <!-- Balcony projection -->
          <polygon points="-12,-6 8,-17 18,-11 -2,0" fill="#E2E8F0"/>
          <!-- Grill Railings -->
          <line x1="-12" y1="-6" x2="-12" y2="-16" stroke="#475569" stroke-width="1.2"/>
          <line x1="-2" y1="0" x2="-2" y2="-10" stroke="#475569" stroke-width="1.2"/>
          <line x1="-12" y1="-16" x2="-2" y2="-10" stroke="#475569" stroke-width="1.5"/>
          <!-- Colorful clothes drying in Bangladesh sun -->
          <rect x="-10" y="-14" width="4" height="6" fill="#EF4444"/> <!-- Red sari -->
          <rect x="-5" y="-12" width="3" height="5" fill="#3B82F6"/> <!-- Blue shirt -->
        </g>

        <!-- Floor 2 Balcony with plants -->
        <g transform="translate(-10, -25)">
          <polygon points="-12,-6 8,-17 18,-11 -2,0" fill="#E2E8F0"/>
          <line x1="-12" y1="-16" x2="-2" y2="-10" stroke="#475569" stroke-width="1.5"/>
          <!-- Potted green plants on veranda -->
          <circle cx="-7" cy="-12" r="2.5" fill="#15803D"/>
          <circle cx="2" cy="-8" r="2.2" fill="#15803D"/>
        </g>
      </g>
    </g>
  `;

  return `
    <g id="tg_EcosystemBusinessScenes" class="tg-ecosystem-scenes">
      <defs>
        <style>
          @keyframes tgLedPulse {
            0%, 100% { opacity: 0.95; }
            50% { opacity: 0.35; }
          }
          @keyframes tgBatteryFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-3px); }
          }
          .tg-led-charging {
            animation: tgLedPulse 1.8s ease-in-out infinite;
          }
          .tg-swapping-battery {
            animation: tgBatteryFloat 2.6s ease-in-out infinite;
          }
        </style>
      </defs>
      <!-- Plot 8: Driver Onboarding & Vehicle Purchase -->
      ${plot8_Onboarding}

      <!-- Plot 6: Fleet Operations -->
      ${plot6_FleetOps}

      <!-- Plot 1: Battery Swapping (Main Station Centerpiece) -->
      ${plot1_BatterySwapping}

      <!-- Plot 2: Service & Support -->
      ${plot2_ServiceSupport}

      <!-- Plot 3: Partner Network -->
      ${plot3_PartnerNetwork}

      <!-- Plot 4: Technology & Clean Energy -->
      ${plot4_TechEnergy}

      <!-- Plot 7: Authentic Bangladeshi Neighborhood Life -->
      ${plot7_BangladeshiNeighborhood}
    </g>
  `;
}
