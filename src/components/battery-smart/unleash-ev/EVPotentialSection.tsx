import { useEffect, useRef, useState } from "react";
import rawHtml from "@/pages/ev-potential/section.html?raw";
import "@/pages/ev-potential/ev-potential.css";

const EVPotentialSection = () => {
  const [html, setHtml] = useState("");
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const fixed = rawHtml
      .replace(/srcset="[^"]*"/g, "")
      .replace(
        /src="\/_next\/image\?url=%2F_next%2Fstatic%2Fmedia%2FgreenBackground[^"]*"/g,
        'src="/greenBackground.webp"',
      )
      .replace('viewBox="0 0 1109 7155"', 'viewBox="0 0 1109 1700"')
      .replace(/<stop stop-color="white"><\/stop>/g, '<stop stop-color="#00ce7e"></stop>');
    setHtml(fixed);
  }, []);

  useEffect(() => {
    if (!html || !ref.current) return;
    const row = ref.current.querySelector(".Vehicles_Vehicles__y0XsI");
    const heading = ref.current.querySelector(".VehicleContainer_heading__pgx2u");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05 },
    );
    if (row) io.observe(row);
    if (heading) io.observe(heading);
    return () => io.disconnect();
  }, [html]);

  return (
    <section ref={ref} className="evp-page evp-section">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </section>
  );
};

export default EVPotentialSection;
