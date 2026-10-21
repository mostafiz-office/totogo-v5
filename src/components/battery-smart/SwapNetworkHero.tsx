import "./swap-network-hero.css";
import heroContentMarkup from "@/assets/swap-network-hero.html?raw";

const SwapNetworkHero = () => {
  return (
    <section
      className="tg-hero"
      aria-label="TotooGo battery swap network — animated scene"
      dangerouslySetInnerHTML={{ __html: heroContentMarkup }}
    />
  );
};

export default SwapNetworkHero;
