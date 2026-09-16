# CU-04 — Contact form

**Status:** Not started

## Content (verbatim)

- Heading: **Send Us a Message**
- Section anchor: `id="contact-form"`

## Fields

| Field | Type | Required |
|-------|------|----------|
| Full Name | text | yes |
| Phone Number | tel | yes |
| Email Address | email | yes |
| I'm Interested In | select | yes |
| Company / Organization | text | no |
| Message | textarea | yes |

Select options (exact order): Driver Support / Fleet Onboarding / Station Partnership / Business Partnership / Investment / General Enquiry

- Every field has a visible `<label>` (no placeholder-only labels).
- Submit button: **Submit Enquiry**

## Validation & submission

- Client-side validation: required fields, valid email format; inline error messages under each invalid field; focus moves to the first error on submit.
- No backend is connected. On valid submit, open `mailto:hello@totoogo.com` with subject `Website enquiry — <topic>` and the field values in the body, and show an inline confirmation note ("Your email app should open with your enquiry pre-filled. If not, write to hello@totoogo.com.").
- This mailto fallback is a known placeholder until a form backend is chosen.

## Layout

- Desktop: two-column field grid, Message full width.
- Mobile: single column, inputs ≥44px tall, full-width submit.

## Acceptance

- Empty submit shows inline errors and focuses the first one.
- Valid submit triggers the mailto and confirmation note.
- Topic pre-select from CU-03 works.
