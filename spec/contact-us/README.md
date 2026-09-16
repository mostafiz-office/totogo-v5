# Contact Us Page — Spec Index

Source: Google Doc → "Contact Us Tab". All copy below is verbatim from the document.

## Goal

Give every audience (driver, fleet operator, station partner, investor, business) a clear way to reach totooGO: topic chooser, enquiry form, direct contact details, and a closing book-a-call CTA.

## Route

- `/contact` and `/contact/` (footer already links to `/contact/` — no nav/footer edits needed).

## Page structure (5 sections, in document order)

1. **Hero** — "Let's Build the Future of Mobility Together"
2. **How Can We Help?** — 4 topic cards (slider on mobile, grid on desktop)
3. **Contact Form** — "Send Us a Message"
4. **Direct Contact** — "Prefer to Reach Us Directly?"
5. **Final CTA** — "Have an Idea? Let's Talk." (navy band, same pattern as Investment/The Idea)

## Exact copy (verbatim from the document)

### Section 1 — Hero
- H1: **Let's Build the Future of Mobility Together**
- Body: "Whether you're a driver, fleet operator, station partner, investor, or business looking to collaborate, the totooGO team is ready to connect."
- CTA: **Get in Touch** → smooth-scrolls to `#contact-form`

### Section 2 — How Can We Help?
- Heading: **Choose What You'd Like to Talk About**
- Cards:
  1. **Driver Support** — "Questions about battery swapping, the Driver App, or using the totooGO network."
  2. **Fleet Solutions** — "Interested in moving your 2- or 3-wheeler fleet to electric."
  3. **Partnerships** — "Explore opportunities to become a swapping station or ecosystem partner."
  4. **Investment** — "Connect with our team regarding the current investment opportunity."
- Each card is clickable: it scrolls to the form and pre-selects the matching "I'm Interested In" option.

### Section 3 — Contact Form
- Heading: **Send Us a Message**
- Fields (all required except Company):
  - Full Name (text)
  - Phone Number (tel)
  - Email Address (email)
  - I'm Interested In (select): Driver Support / Fleet Onboarding / Station Partnership / Business Partnership / Investment / General Enquiry
  - Company / Organization (text, optional)
  - Message (textarea)
- CTA button: **Submit Enquiry**
- Submission: no backend is connected yet. The form validates client-side and opens the visitor's mail app via `mailto:hello@totoogo.com` with the enquiry pre-filled, showing an inline confirmation note. Marked as a known placeholder until a backend/form service is chosen.

### Section 4 — Direct Contact
- Heading: **Prefer to Reach Us Directly?**
- **Investment Enquiries**
  - Email: hyder@totoogo.com (mailto link)
  - Phone: +8801711083456 (tel link, display as +880 17 1108 3456)
- Note from the document: general/partnership/support emails and phones are not yet provided — do NOT invent them. Show only Investment Enquiries; layout must allow adding more contacts later.

### Section 5 — Final CTA
- Heading: **Have an Idea? Let's Talk.**
- Body: "From electric mobility and fleet transformation to battery swapping and strategic partnerships, we're open to conversations that can move the ecosystem forward."
- CTA: **Book a Call** → `href="#"` placeholder (Calendly/Google link pending — same status as Investment page).

## Shared rules (same as all other pages)

- Reuse `SiteHeader`, `Footer`, global `.reveal`/`useReveal`, design tokens only (no hardcoded colors).
- One H1, semantic sections, 44px minimum touch targets, visible focus states.
- Hero: two-column (text left, generated photo right) like Investment/The Idea; stacks on mobile.
- Section 2 uses the shared `SolutionSlider` on mobile and a 4-column grid on desktop, or a 2×2 grid with mobile swipe — follow `spec/solutions/shared-patterns.md`.
- Final CTA reuses the navy band pattern from The Idea's `IdeaVisionCTA`.
- Scoped stylesheet `src/pages/contact/contact.css` under `.contact-page`.
- Metadata: title "Contact Us | totooGO", description from hero body.

## Tasks

| ID | Task | Status |
|----|------|--------|
| CU-01 | Page shell, route `/contact` + `/contact/`, metadata | Not started |
| CU-02 | Hero section + hero photo | Not started |
| CU-03 | "How Can We Help?" topic cards (click → pre-select form topic) | Not started |
| CU-04 | Contact form with validation + mailto submit | Not started |
| CU-05 | Direct Contact section (investment email/phone only) | Not started |
| CU-06 | Final CTA navy band | Not started |
| CU-07 | Icons, hero image asset, alt text | Not started |
| CU-08 | Responsive QA (360/768/1280), accessibility, build check | Not started |

## Resolved decisions

- No new nav/footer links needed — footer already points to `/contact/`.
- Only the investment email/phone are shown; other contacts are not invented.
- Form uses mailto fallback until a backend is chosen (no Lovable Cloud connected).
- Book a Call stays `href="#"` until the real Calendly/Google link is supplied.
