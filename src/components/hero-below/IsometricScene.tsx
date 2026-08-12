import sceneImg from "@/assets/hero-below/isometric-scene.png";

/**
 * Layer A, Isometric city illustration.
 * Diagonal bottom cut (chevron) is achieved with a clip-path so the pipe
 * (Layer B) can "exit" the scene cleanly at the two diagonal points.
 */
const IsometricScene = () => (
  <div
    className="relative mx-auto w-full max-w-[1280px]"
    style={{
      // chevron bottom: full at sides (95% y), notched at center (78% y)
      clipPath: "polygon(0 0, 100% 0, 100% 95%, 50% 78%, 0 95%)",
    }}
  >
    <div
      className="relative"
      style={{ background: "hsl(var(--ev-sky))" }}
    >
      <img
        src={sceneImg}
        alt=""
        aria-hidden="true"
        width={1920}
        height={1080}
        loading="lazy"
        className="block h-auto w-full"
        style={{ objectFit: "contain", objectPosition: "center top" }}
      />
    </div>
  </div>
);

export default IsometricScene;
