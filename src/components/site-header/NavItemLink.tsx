import { useLayoutEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { NavItem } from "./nav-config";

const normalize = (p: string) => (p.endsWith("/") ? p : `${p}/`);
export const isRouteActive = (current: string, target: string) => {
  if (target === "/") return current === "/";
  const c = normalize(current);
  const t = normalize(target);
  return c === t || c.startsWith(t);
};

type Props = {
  item: NavItem;
  currentPath: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onLinkClick: () => void;
};

const HOVER_CLOSE_MS = 150;

const NavItemLink = ({ item, currentPath, isOpen, onOpen, onClose, onLinkClick }: Props) => {
  const closeTimer = useRef<number | null>(null);
  const liRef = useRef<HTMLLIElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ left?: number; right?: number }>({ left: 0 });
  const hasChildren = !!item.children?.length;
  const active = isRouteActive(currentPath, item.path);

  useLayoutEffect(() => {
    if (!isOpen || !liRef.current || !panelRef.current) return;
    const compute = () => {
      const li = liRef.current!;
      const panel = panelRef.current!;
      const margin = 16;
      const vw = window.innerWidth;
      const liRect = li.getBoundingClientRect();
      const panelWidth = Math.min(panel.offsetWidth, vw - margin * 2);
      // Prefer anchoring to left of nav item; flip to right if it overflows.
      if (liRect.left + panelWidth + margin > vw) {
        setPos({ right: Math.max(margin - (vw - liRect.right), 0) });
      } else {
        setPos({ left: Math.max(margin - liRect.left, 0) });
      }
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [isOpen]);

  const cancelClose = () => {
    if (closeTimer.current != null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(onClose, HOVER_CLOSE_MS);
  };

  return (
    <li
      ref={liRef}
      className="relative"
      onMouseEnter={() => { cancelClose(); if (hasChildren) onOpen(); }}
      onMouseLeave={() => { if (hasChildren) scheduleClose(); }}
      onFocus={() => { if (hasChildren) onOpen(); }}
      onBlur={(e) => {
        if (hasChildren && !e.currentTarget.contains(e.relatedTarget as Node)) onClose();
      }}
    >
      <a
        href={item.path}
        className="site-nav-item"
        data-active={active || undefined}
        data-open={isOpen || undefined}
        aria-haspopup={hasChildren ? "menu" : undefined}
        aria-expanded={hasChildren ? isOpen : undefined}
        aria-current={active ? "page" : undefined}
        onClick={onLinkClick}
      >
        {item.label}
        {hasChildren && <ChevronDown size={12} strokeWidth={2.5} aria-hidden="true" />}
      </a>

      {hasChildren && isOpen && (
        <div
          ref={panelRef}
          className="absolute top-full pt-2"
          style={{ left: pos.left, right: pos.right }}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          {item.mega ? (
            <div className="site-mega-panel" role="menu" aria-label={`${item.label} menu`}>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {item.children!.map((c) => (
                  <a
                    key={c.path}
                    href={c.path}
                    role="menuitem"
                    className="site-mega-card"
                    onClick={onLinkClick}
                  >
                    {c.icon && <span className="site-mega-card-icon">{c.icon}</span>}
                    <span>
                      <span className="site-mega-card-title block">{c.label}</span>
                      <span className="site-mega-card-desc block">{c.description}</span>
                    </span>
                  </a>
                ))}
              </div>

              <div className="site-mega-footer">
                <a href={item.path} onClick={onLinkClick}>
                  View all {item.label.toLowerCase()} →
                </a>
              </div>
            </div>
          ) : (
            <div className="site-dropdown" role="menu" aria-label={`${item.label} menu`}>
              {item.children!.map((c) => (
                <a
                  key={c.path}
                  href={c.path}
                  role="menuitem"
                  className="site-mega-card"
                  onClick={onLinkClick}
                >
                  {c.icon && <span className="site-mega-card-icon">{c.icon}</span>}
                  <span>
                    <span className="site-mega-card-title block">{c.label}</span>
                    <span className="site-mega-card-desc block">{c.description}</span>
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </li>
  );
};

export default NavItemLink;
