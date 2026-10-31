import { describe, it, expect } from "vitest";
import { generateThreeWheelerSVG } from "@/components/battery-smart/isometric/threeWheelerAssets";
import { generateEcosystemPlotsSVG } from "@/components/battery-smart/isometric/ecosystemPlots";
import { generateMainStationOverlaySVG } from "@/components/battery-smart/isometric/stationOverlay";
import heroSvgMarkup from "@/assets/battery-smart-hero-v2.svg?raw";

describe("TotooGo Bangladeshi EV Three-Wheeler Assets", () => {
  it("generates a passenger three-wheeler with authentic details", () => {
    const svg = generateThreeWheelerSVG({
      id: "testPassenger",
      variant: "passenger",
      orientation: "down-left",
    });

    expect(svg).toContain('id="testPassenger"');
    expect(svg).toContain('class="tg-three-wheeler');
    expect(svg).toContain('class="tg-passenger-cabin"');
    expect(svg).toContain('class="tg-roof-canopy"');
    expect(svg).toContain('class="tg-driver"');
    expect(svg).toContain('fill="#00A651"'); // TotooGo Green
    expect(svg).toContain('fill="#1E293B"'); // Canopy black
    expect(svg).toContain("totooGO");
  });

  it("generates a cargo three-wheeler with cargo box enclosure", () => {
    const svg = generateThreeWheelerSVG({
      id: "testCargo",
      variant: "cargo",
      orientation: "down-right",
    });

    expect(svg).toContain('id="testCargo"');
    expect(svg).toContain('class="tg-cargo-box"');
    expect(svg).toContain("CARGO EV");
    expect(svg).toContain("scale(-1, 1)"); // Down-right mirror
  });
});

describe("TotooGo 8 Business Ecosystem Scenes", () => {
  const scenesSvg = generateEcosystemPlotsSVG();

  it("contains all 8 business plots and local details", () => {
    expect(scenesSvg).toContain('id="tg_EcosystemBusinessScenes"');

    // Plot 8: Driver Onboarding & Vehicle Purchase
    expect(scenesSvg).toContain('id="plot8_DriverOnboarding"');
    expect(scenesSvg).toContain("totooGO ONBOARDING");
    expect(scenesSvg).toContain("ড্রাইভার নিবন্ধন ও গাড়ি হস্তান্তর");

    // Plot 6: Fleet Operations Hub
    expect(scenesSvg).toContain('id="plot6_FleetOperations"');
    expect(scenesSvg).toContain("totooGO FLEET HUB");

    // Plot 1: Battery Swapping (Main Station Dock)
    expect(scenesSvg).toContain('id="plot1_BatterySwappingDock"');
    expect(scenesSvg).toContain("SWAP OK");
    expect(scenesSvg).toContain('class="tg-swap-cabinet"');
    expect(scenesSvg).toContain('class="tg-swapping-battery"');

    // Plot 2: Service & Support Bay
    expect(scenesSvg).toContain('id="plot2_ServiceSupportBay"');
    expect(scenesSvg).toContain("totooGO SERVICE &amp; CARE");

    // Plot 3: Partner Network Kiosk
    expect(scenesSvg).toContain('id="plot3_PartnerNetworkKiosk"');
    expect(scenesSvg).toContain("রহমান অটো পার্টস");

    // Plot 4: Clean Energy & Solar Infrastructure
    expect(scenesSvg).toContain('id="plot4_TechnologyCleanEnergy"');

    // Plot 7: Authentic Bangladeshi Neighborhood Details
    expect(scenesSvg).toContain('id="neighborhood_TongTeaStall"');
    expect(scenesSvg).toContain("মামা রং চা স্টল");
    expect(scenesSvg).toContain('id="neighborhood_MudirDokan"');
    expect(scenesSvg).toContain("জনতা মুদি স্টোর");
    expect(scenesSvg).toContain('id="neighborhood_Pharmacy"');
    expect(scenesSvg).toContain("গ্রীন লাইফ ফার্মেসি");
    expect(scenesSvg).toContain('id="neighborhood_ApartmentBuilding"');
  });
});

describe("TotooGo Main Station Enhancements", () => {
  it("contains high-efficiency rooftop solar array and station branding", () => {
    const overlaySvg = generateMainStationOverlaySVG();
    expect(overlaySvg).toContain('id="totoogoMainStationEnhancements"');
    expect(overlaySvg).toContain('id="mainStation_SolarArray"');
    expect(overlaySvg).toContain('id="mainStation_EntranceBranding"');
    expect(overlaySvg).toContain('id="mainStation_BayMarkers"');
    expect(overlaySvg).toContain("totooGO");
    expect(overlaySvg).toContain("ব্যাটারি সোয়াপিং স্টেশন • BANGLADESH");
  });
});

describe("XML Parsing Validity", () => {
  function checkValidXml(svgStr: string, name: string) {
    const doc = new DOMParser().parseFromString(
      `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${svgStr}</svg>`,
      "image/svg+xml"
    );
    const err = doc.querySelector("parsererror");
    if (err) {
      console.error(`Parser error in ${name}:`, err.textContent);
    }
    expect(err).toBeNull();
  }

  it("parses all three-wheeler variants without XML errors", () => {
    checkValidXml(generateThreeWheelerSVG({ variant: "passenger", orientation: "down-left" }), "passenger down-left");
    checkValidXml(generateThreeWheelerSVG({ variant: "passenger", orientation: "down-right" }), "passenger down-right");
    checkValidXml(generateThreeWheelerSVG({ variant: "cargo", orientation: "down-left" }), "cargo down-left");
    checkValidXml(generateThreeWheelerSVG({ variant: "cargo", orientation: "down-right" }), "cargo down-right");
  });

  it("parses ecosystem plots without XML errors", () => {
    checkValidXml(generateEcosystemPlotsSVG(), "ecosystem plots");
  });

  it("parses station overlay without XML errors", () => {
    checkValidXml(generateMainStationOverlaySVG(), "station overlay");
  });
});

describe("TotooGo Hero Banner SVG Sequential Animation Assets", () => {
  it("contains all 7 sequential narrative text callouts", () => {
    // Stage 1
    expect(heroSvgMarkup).toContain('id="Both"');
    expect(heroSvgMarkup).toContain('id="network"');
    // Stage 2
    expect(heroSvgMarkup).toContain('id="quickBatterySwapping"');
    expect(heroSvgMarkup).toContain('id="PartnerApp"');
    expect(heroSvgMarkup).toContain('id="driverApp"');
    // Stage 3
    expect(heroSvgMarkup).toContain('id="support247"');
    expect(heroSvgMarkup).toContain('id="batteryPerformance"');
  });

  it("contains active moving vehicles on the road network", () => {
    expect(heroSvgMarkup).toContain('id="loader"');
    expect(heroSvgMarkup).toContain('id="twoWheeler1"');
    // Three wheeler base element or hero group
    expect(heroSvgMarkup).toContain('id="Group 238935"');
  });

  it("contains main station antenna and wave ripple rings", () => {
    expect(heroSvgMarkup).toContain('id="innerCircle"');
    expect(heroSvgMarkup).toContain('id="middleCircle"');
    expect(heroSvgMarkup).toContain('id="outerCircle"');
    expect(heroSvgMarkup).toContain('id="batteryIcon"');
  });

  it("contains network connection spoke lines from main station", () => {
    expect(heroSvgMarkup).toContain('id="loaderLine"');
    expect(heroSvgMarkup).toContain('id="threeWheelerLine"');
    expect(heroSvgMarkup).toContain('id="twoWheelerLine"');
  });

  it("contains charging status highlights for all three substations", () => {
    expect(heroSvgMarkup).toContain('id="loaderHighlight"');
    expect(heroSvgMarkup).toContain('id="partnerAppHighlight"');
    expect(heroSvgMarkup).toContain('id="threeWheelerHighlight"');
    expect(heroSvgMarkup).toContain('id="driverAppHighlight"');
    expect(heroSvgMarkup).toContain('id="twoWheelerHighlight"');
    expect(heroSvgMarkup).toContain('id="denseHighlight"');
  });

  it("parses the complete hero SVG markup without XML errors", () => {
    const doc = new DOMParser().parseFromString(heroSvgMarkup, "image/svg+xml");
    const err = doc.querySelector("parsererror");
    expect(err).toBeNull();
  });

  it("restores the original buildings matching Figma and Image 4", () => {
    // 1. Silo cooling tower at bottom-center
    expect(heroSvgMarkup).toContain('id="Group 239532"');
    expect(heroSvgMarkup).toContain('id="Vector_132"');

    // 2. Far-right office building
    expect(heroSvgMarkup).toContain('id="Group_310"');
    expect(heroSvgMarkup).toContain('id="Vector_2597"');

    // 3. Top-left square segmented tower building
    expect(heroSvgMarkup).toContain('id="Group_310_2"');
    expect(heroSvgMarkup).toContain('id="Vector_2597_2"');
  });

  it("contains authentic Bangladeshi roadside shops in designated empty locations", () => {
    expect(heroSvgMarkup).toContain('id="bangladeshiRoadsideShops"');

    // 1. Top-Right: Dedicated EV Quick Service & Spares Mart (Upper plot beside Group_28)
    expect(heroSvgMarkup).toContain('id="shopCafeMart"');
    expect(heroSvgMarkup).toContain('EV AUTO MART');
    expect(heroSvgMarkup).toContain('tg-ev-auto-mart');

    // 2. Lower-Left Shop: Modern Ground-Floor EV Cafe & Lounge (Repositioned to vacant sidewalk plot on the left)
    expect(heroSvgMarkup).toContain('id="shopEvMartCafe"');
    expect(heroSvgMarkup).toContain('EV CAFE');
    expect(heroSvgMarkup).toContain('tg-ev-cafe-lounge');
    expect(heroSvgMarkup).toContain('class="timber-slats-left');
    expect(heroSvgMarkup).toContain('cafeEspressoMachine');
    expect(heroSvgMarkup).toContain('cafePastryCase');
    expect(heroSvgMarkup).toContain('cafeCustomerFigure');

    // 3. Vacant Plot behind Station Bays: Modern Grocery Store ("GROCERY MART" / মুদি দোকান)
    expect(heroSvgMarkup).toContain('id="shopGroceryStore"');
    expect(heroSvgMarkup).toContain('GROCERY MART');
    expect(heroSvgMarkup).toContain('tg-grocery-mart');
    expect(heroSvgMarkup).toContain('id="groceryAwning"');
    expect(heroSvgMarkup).toContain('id="signGroceryMart"');
    expect(heroSvgMarkup).toContain('id="groceryProduceDisplay"');
    expect(heroSvgMarkup).toContain('id="groceryShopper1"');

    // 4. Lower-Right Foreground Plot: Modern Grocery Mart & Fresh Fruit Store (image_9a101f.png Reference Match)
    expect(heroSvgMarkup).toContain('id="shopSupermarket"');
    expect(heroSvgMarkup).toContain('tg-supermarket-building');
    expect(heroSvgMarkup).toContain('id="supermarketAwning"');
    expect(heroSvgMarkup).toContain('id="supermarketSignboard"');
    expect(heroSvgMarkup).toContain('id="supermarketAcUnit"');
    expect(heroSvgMarkup).toContain('id="supermarketSideTree"');
    expect(heroSvgMarkup).toContain('id="supermarketGlassDoors"');
    expect(heroSvgMarkup).toContain('id="crateCitrusLemons"');
    expect(heroSvgMarkup).toContain('id="crateGreenCabbages"');
    expect(heroSvgMarkup).toContain('id="crateRedApplesTomatoes"');
    expect(heroSvgMarkup).toContain('id="crateOrangeCitrus"');
    expect(heroSvgMarkup).toContain('id="supermarketShopper1"');
    expect(heroSvgMarkup).toContain('id="supermarketShopper2"');

    // 5. Vacant Plot to the Left of main totooGo station: Traditional Tea Stall / Cafe (চায়ের দোকান)
    expect(heroSvgMarkup).toContain('id="shopTraditionalTeaStall"');
    expect(heroSvgMarkup).toContain('tg-traditional-tea-stall');
    expect(heroSvgMarkup).toContain('id="teaStallAwning"');
    expect(heroSvgMarkup).toContain('id="teaStallSignboard"');
    expect(heroSvgMarkup).toContain('TEA &amp; SNACKS');
    expect(heroSvgMarkup).toContain('id="teaKettleMain"');
    expect(heroSvgMarkup).toContain('id="snackJar1"');
    expect(heroSvgMarkup).toContain('id="snackJar2"');
    expect(heroSvgMarkup).toContain('id="teaSideTable"');
    expect(heroSvgMarkup).toContain('id="teaCustomer1"');
    expect(heroSvgMarkup).toContain('id="teaCustomer2"');
    expect(heroSvgMarkup).toContain('id="teaShopkeeper"');

    // Confirms removed legacy duplicate stall is not present
    expect(heroSvgMarkup).not.toContain('id="shopTeaStall"');
    expect(heroSvgMarkup).not.toContain('id="shopTelecomKiosk"');
  });

  it("contains clean renewable energy micro-grid with deep navy solar panels and micro-wind turbines", () => {
    // 1. Photovoltaic solar array with deep navy-blue cells, 6x4 matrix and solid block pedestals
    expect(heroSvgMarkup).toContain('id="Solar panels"');
    expect(heroSvgMarkup).toContain('id="pvCellGradient"');
    expect(heroSvgMarkup).toContain('class="tg-solar-panel-unit"');
    expect(heroSvgMarkup).toContain('class="pv-grid"');
    expect(heroSvgMarkup).toContain('id="Group_196"');
    expect(heroSvgMarkup).toContain('id="Group_201"');
    expect(heroSvgMarkup).toContain('id="Group_206"');
    expect(heroSvgMarkup).toContain('id="Group_211"');
    expect(heroSvgMarkup).toContain('id="Group_216"');
    expect(heroSvgMarkup).toContain('id="Group_221"');

    // 2. Stylized green tree beside front-right solar panel
    expect(heroSvgMarkup).toContain('id="tgSolarParkTree"');

    // 3. Micro-wind turbines with conical weighted bases, 3-blade rotors and motion fade
    expect(heroSvgMarkup).toContain('id="windmills"');
    expect(heroSvgMarkup).toContain('id="turbineRotor1"');
    expect(heroSvgMarkup).toContain('id="turbineRotor2"');
    expect(heroSvgMarkup).toContain('id="turbineRotor3"');
    expect(heroSvgMarkup).toContain('id="turbineRotor4"');
    expect(heroSvgMarkup).toContain('tg-wind-turbine');
  });

  it("contains stylized female pedestrian with natural dynamic walking stride on white walkway", () => {
    expect(heroSvgMarkup).toContain('id="yellowGirl"');
    expect(heroSvgMarkup).toContain('id="Woman F"');
    expect(heroSvgMarkup).toContain('class="tg-pedestrian-female"');
    expect(heroSvgMarkup).toContain('id="leftLeg"');
    expect(heroSvgMarkup).toContain('id="rightLeg"');
    expect(heroSvgMarkup).toContain('id="leftHand"');
    expect(heroSvgMarkup).toContain('id="rightHand"');
  });
});


