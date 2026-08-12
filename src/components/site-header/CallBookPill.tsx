import type { ReactNode } from "react";

type CTA = { label: string; href: string; icon?: ReactNode };

type Props = {
  call: CTA;
  book: CTA;
};

const CallBookPill = ({ call, book }: Props) => (
  <div className="site-dual-cta" role="group" aria-label="Call or book">
    <a
      className="site-dual-cta-call"
      href={call.href}
      aria-label={`Call: ${call.label}`}
    >
      {call.icon}
      <span>{call.label}</span>
    </a>
    <span className="site-dual-cta-or" aria-hidden="true">Or</span>
    <a
      className="site-dual-cta-book"
      href={book.href}
      aria-label={`Book: ${book.label}`}
    >
      {book.icon}
      <span>{book.label}</span>
    </a>
  </div>
);

export default CallBookPill;
