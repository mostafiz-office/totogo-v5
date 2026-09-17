import type { ReactNode } from "react";
import BrandHeading from "./BrandHeading";

type BrandCTAProps = {
  image: string;
  imageAlt: string;
  lead: string;
  accent: string;
  body?: ReactNode;
  actions: ReactNode;
  className?: string;
};

const BrandCTA = ({ image, imageAlt, lead, accent, body, actions, className = "" }: BrandCTAProps) => (
  <div className={`brand-cta reveal ${className}`.trim()}>
    <div className="brand-cta__copy">
      <BrandHeading lead={lead} accent={accent} className="brand-cta__title" />
      {body ? <div className="brand-cta__body">{body}</div> : null}
      <div className="brand-cta__actions">{actions}</div>
    </div>
    <div className="brand-cta__visual">
      <img src={image} alt={imageAlt} loading="lazy" width={1280} height={896} />
      <span className="brand-cta__fade" aria-hidden="true" />
    </div>
    <span className="brand-cta__line" aria-hidden="true" />
  </div>
);

export default BrandCTA;