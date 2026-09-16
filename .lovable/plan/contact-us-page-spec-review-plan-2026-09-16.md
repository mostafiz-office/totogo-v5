# Contact Us Page — Spec Review Plan

## Situation

The Contact Us tab in your document was already used to write a full spec and build the page:

- `spec/contact-us/` — README (spec index + exact copy), `wireframe.md`, tasks CU-01 → CU-08, and `CHECKLIST.md` (gap analysis + audit)
- The page itself is already built at `/contact/` and passed QA on phone, tablet and desktop

## What this plan does

Rather than writing a duplicate spec, this plan verifies the existing spec against the document tab and closes it out:

1. **Copy check** — compare every heading, body text, form field, dropdown option, email and phone number in `spec/contact-us/README.md` against the Contact Us tab, word for word.
2. **Audit refresh** — confirm the gap analysis in `spec/contact-us/CHECKLIST.md` is still accurate (footer link, routes, slider pattern, navy CTA pattern, mailto placeholder, Book-a-Call placeholder).
3. **Spec polish** — fix anything the copy check finds; add a short "brand consistency" note to the spec (tokens, section rhythm, hero pattern shared with Investment/The Idea) so the UI/UX guidance is explicit.
4. **Report** — confirm the task list (CU-01 → CU-08, all currently Done) and what remains open.

## The five sections the spec covers

```text
1. Hero — "Let's Build the Future of Mobility Together" + photo
2. Choose What You'd Like to Talk About — 4 topic cards
3. Send Us a Message — form (name, phone, email, topic, company, message)
4. Prefer to Reach Us Directly? — investment email + phone only
5. Have an Idea? Let's Talk. — navy closing band, Book a Call
```

## Known placeholders (unchanged)

- Form submit opens the visitor's email app pre-filled (no backend connected yet).
- Book a Call waits for your Calendly/Google link.
- General/partnership/support contact details are not invented — only the investment email/phone from the document are shown.

## Technical details

- Files touched: only `spec/contact-us/*` (spec text). No website code changes unless the copy check finds a mismatch.
- Page code already lives in `src/pages/contact/` and `src/components/contact/`, route `/contact/` registered in `src/App.tsx`.
