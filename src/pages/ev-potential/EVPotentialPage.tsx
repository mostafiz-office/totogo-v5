import { useEffect, useState } from "react";
import rawHtml from "./section.html?raw";
import "./ev-potential.css";

const EVPotentialPage = () => {
  const [html, setHtml] = useState("");

  useEffect(() => {
    // Rewrite Next.js image proxy URLs to the local public asset.
    const fixed = rawHtml
      .replace(/srcset="[^"]*"/g, "")
      .replace(
        /src="\/_next\/image\?url=%2F_next%2Fstatic%2Fmedia%2FgreenBackground[^"]*"/g,
        'src="/greenBackground.svg"',
      )
      .replace('viewBox="0 0 1109 7155"', 'viewBox="0 0 1109 1700"');
    setHtml(fixed);
  }, []);

  return (
    <div className="evp-page">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export default EVPotentialPage;
