# Mobile menu: stop the sideways shift when opening

## What is happening

When the menu opens, the page's scrolling is frozen by hiding the page scrollbar. Removing that scrollbar frees up the space it occupied, so the whole page — including the logo, Call button and menu icon — instantly widens and slides to the right. Closing the menu brings the scrollbar back and everything jumps left again. It reads as an unwanted right-side animation.

## The fix

1. Reserve the scrollbar space permanently so it never disappears: the page keeps a stable gutter whether the menu is open or closed.
2. When locking the page, add a matching compensation equal to the measured scrollbar width, so the header and content stay in exactly the same horizontal place.
3. Keep the existing behaviour intact: background does not scroll while the menu is open, and the exact scroll position is preserved on close.

## Validation

- Open and close the menu at 360px, 393px and 768px: header logo, Call button and menu icon must not move horizontally by even a pixel.
- Confirm the page behind the menu still cannot scroll and the scroll position is unchanged after closing.
- Confirm the desktop header at 1280px is visually unchanged.

## Technical scope

- `src/index.css`: add `scrollbar-gutter: stable` on `html` so the gutter is always reserved.
- `src/components/site-header/SiteHeader.tsx` (`useBodyScrollLock`): measure `window.innerWidth - document.documentElement.clientWidth` before locking and apply it as compensating padding on the fixed body, removing it on unlock; keep the current instant scroll restoration.
- No changes to navigation data, routes, or desktop components.
