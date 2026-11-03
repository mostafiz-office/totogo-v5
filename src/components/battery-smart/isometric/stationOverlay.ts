/**
 * TotooGo Main Swapping Station Enhancements (Step 4)
 * - Branded green TotooGo signage & logo on station entrance
 * - High-efficiency blue crystalline rooftop solar panels with cell grid lines
 * - Battery cabinet status indicators & service bay lighting
 * Scaled and positioned in exact 30-degree isometric alignment with HQ building footprint.
 */

export function generateMainStationOverlaySVG(): string {
  return `
    <g id="totoogoMainStationEnhancements" class="tg-station-enhancements" pointer-events="none">
      <defs>
        <style>
          @keyframes tgStationBeaconPulse {
            0%, 100% { opacity: 0.25; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.35); }
          }
          .tg-beacon-pulse {
            transform-box: fill-box;
            transform-origin: center;
            animation: tgStationBeaconPulse 2.2s ease-in-out infinite;
          }
        </style>
      </defs>
      <!-- 1. Main Station Rooftop Solar Array (Blue Crystalline PV Modules) -->
      <!-- Positioned on the flat roof slab of the main HQ building (approx x: 740, y: 920) -->
      <g id="mainStation_SolarArray" transform="translate(850, 930)">
        <!-- Solar Panel Bank A -->
        <g transform="translate(-110, -50)">
          <!-- Panel Tray Base -->
          <polygon points="-50,-28 20,-68 90,-28 20,12" fill="#0A192F" opacity="0.6"/>
          <!-- Solar Cells Surface (Deep Ocean Blue) -->
          <polygon points="-48,-28 18,-66 86,-27 20,11" fill="#1E3A8A"/>
          <polygon points="-47,-27 18,-64 84,-26 19,10" fill="#0284C7" opacity="0.75"/>
          <!-- Crystalline Grid Lines (Silver/cyan reflection) -->
          <line x1="-30" y1="-38" x2="38" y2="1" stroke="#38BDF8" stroke-width="0.8" opacity="0.85"/>
          <line x1="-12" y1="-48" x2="56" y2="-9" stroke="#38BDF8" stroke-width="0.8" opacity="0.85"/>
          <line x1="6" y1="-58" x2="74" y2="-19" stroke="#38BDF8" stroke-width="0.8" opacity="0.85"/>
          <!-- Vertical String Dividers -->
          <line x1="-15" y1="-10" x2="53" y2="-49" stroke="#E2E8F0" stroke-width="0.9" opacity="0.8"/>
          <!-- Photovoltaic Specular Sheen -->
          <line x1="-20" y1="-28" x2="45" y2="-45" stroke="#FFFFFF" stroke-width="1.6" opacity="0.4" stroke-linecap="round"/>
        </g>

        <!-- Solar Panel Bank B (Adjacent Roof Section) -->
        <g transform="translate(0, 5)">
          <polygon points="-50,-28 20,-68 90,-28 20,12" fill="#0A192F" opacity="0.6"/>
          <polygon points="-48,-28 18,-66 86,-27 20,11" fill="#1E3A8A"/>
          <polygon points="-47,-27 18,-64 84,-26 19,10" fill="#0284C7" opacity="0.75"/>
          <line x1="-30" y1="-38" x2="38" y2="1" stroke="#38BDF8" stroke-width="0.8" opacity="0.85"/>
          <line x1="-12" y1="-48" x2="56" y2="-9" stroke="#38BDF8" stroke-width="0.8" opacity="0.85"/>
          <line x1="6" y1="-58" x2="74" y2="-19" stroke="#38BDF8" stroke-width="0.8" opacity="0.85"/>
          <line x1="-15" y1="-10" x2="53" y2="-49" stroke="#E2E8F0" stroke-width="0.9" opacity="0.8"/>
        </g>
      </g>

      <!-- 2. Main Station Facade Branding ("totooGO Battery Swapping Central") -->
      <!-- Prominently displayed over the main entrance portal (approx x: 730, y: 1100) -->
      <g id="mainStation_EntranceBranding" transform="translate(745, 1105) skewY(30) scale(0.9)">
        <!-- Illuminated White/Green Brand Plaque -->
        <rect x="-65" y="-18" width="130" height="34" rx="4" fill="#00A651" stroke="#FFFFFF" stroke-width="2"/>
        <rect x="-62" y="-15" width="124" height="28" rx="3" fill="#0A0F1D"/>
        <!-- TotooGo Brand Logo & Subtitle -->
        <circle cx="-42" cy="-1" r="9" fill="#00E676" opacity="0.2"/>
        <circle cx="-42" cy="-1" r="6" fill="#00A651"/>
        <circle cx="-42" cy="-1" r="2.5" fill="#FFFFFF"/>
        <text x="12" y="3" font-family="'Rubik', sans-serif" font-size="13" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.5">totooGO</text>
        <text x="0" y="10" font-family="'Hind Siliguri', 'Rubik', sans-serif" font-size="6.5" font-weight="700" fill="#00E676" text-anchor="middle">ব্যাটারি সোয়াপিং স্টেশন • BANGLADESH</text>
      </g>

      <!-- 3. Drive-in Bay Clearance Arch & Green LED Beacons -->
      <g id="mainStation_BayMarkers" transform="translate(735, 1225)">
        <!-- Left Entrance Pylon with Pulsing Green Indicator -->
        <g transform="translate(-15, 0)">
          <polygon points="-4,-25 4,-30 4,5 -4,10" fill="#00A651"/>
          <circle cx="0" cy="-28" r="3" fill="#00E676"/>
          <circle cx="0" cy="-28" r="5" fill="#00E676" opacity="0.35" class="tg-beacon-pulse"/>
        </g>
        <!-- Right Entrance Pylon -->
        <g transform="translate(95, -63)">
          <polygon points="-4,-25 4,-30 4,5 -4,10" fill="#00A651"/>
          <circle cx="0" cy="-28" r="3" fill="#00E676"/>
          <circle cx="0" cy="-28" r="5" fill="#00E676" opacity="0.35" class="tg-beacon-pulse"/>
        </g>
        <!-- High-Vis Driveway Apron Markings -->
        <polygon points="-12,8 90,-51 98,-46 -4,13" fill="#00E676" opacity="0.4"/>
      </g>
    </g>
  `;
}
