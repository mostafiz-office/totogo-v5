import type { ElementType } from "react";

type BrandHeadingProps = {
  as?: "h1" | "h2" | "h3";
  lead: string;
  accent: string;
  className?: string;
};

const BrandHeading = ({ as = "h2", lead, accent, className = "" }: BrandHeadingProps) => {
  const Tag: ElementType = as;

  return (
    <Tag className={`brand-heading text-balance ${className}`.trim()}>
      <span className="brand-heading__lead">{lead}</span>{" "}
      <span className="brand-heading__accent">{accent}</span>
    </Tag>
  );
};

export default BrandHeading;