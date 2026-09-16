# WI-03 — Remove unnecessary blur/fade on mobile image

- **Source row:** SL 3, tab "Website Issues"
- **Screenshot:** `screenshots/WI-03-mobile-image-blur.png`
- **Client remark (verbatim):** "This blurr on mobile devices is not necessary."
- **Area:** Photo below the "Join our waitlist" block (CTA section)
- **Viewport in screenshot:** Mobile
- **Status:** Not started

## Observed behaviour

On mobile, the photograph of the totoGO three-wheeler beside the swap cabinet has a soft blurred / washed-out band along its left edge where a gradient overlay fades the image into the mint background. The client's arrow points at that faded band. On mobile this reads as a rendering defect rather than a design flourish.

## Expected behaviour

On mobile the photo renders clean and sharp edge to edge — no blur, no fade overlay, no gradient wash on top of the image. The desktop treatment may keep the fade if it is intentional there.

## Likely files

- `src/components/battery-smart/CTASection.tsx` — the gradient overlay `linear-gradient(90deg, #CFF1DF 0%, rgba(207,241,223,0.4) 25%, transparent 60%)` over the image, plus the decorative `blur-[120px]` glow elements

## Acceptance criteria

1. At 360px and 768px, the CTA photo shows no blur, fade, or gradient overlay across its surface or edges.
2. The image keeps its aspect ratio, corner radius, and position within the section.
3. Desktop (1280px) appearance is unchanged unless the same overlay is judged to be the defect there too — if so, confirm with the owner first.
4. Text contrast and readability around the image are unaffected.

## DO NOT

- Do not replace, recrop, or regenerate the photo.
- Do not change the CTA copy or the "Join our waitlist" button.
- Do not change section background colours.
