# Correct the desktop “How It Works” rail-following motion

## Goal
Make SWAP and EARN behave like BUY: each step remains attached to the moving rail, travels left with it, and rises only when its matching rail bend reaches the presentation area.

## Changes
- Remove the horizontal pinning/compensation that currently freezes SWAP and EARN near the center while the rail continues moving.
- Keep the shared horizontal track movement for all three steps so SWAP and EARN continue from right to center and then off toward the left.
- Retain only a vertical offset for SWAP and EARN:
  - SWAP begins rising when its rail bend reaches the presentation point, while continuing left.
  - EARN follows the same motion at its own later bend.
- Calculate each rise timing from the measured rail/step positions rather than fixed visual guesses, keeping the text aligned with its corresponding horizontal rail segment throughout the scroll.
- Synchronize the green rail reveal with the same scroll progress.
- Leave the mobile stacked version unchanged.

## Technical details
- Replace `computePinnedStepFrame` with a rail-following frame model that returns vertical movement only; horizontal movement remains entirely controlled by the parent track.
- Use each step’s measured horizontal distance and the active desktop travel duration to derive when its upward transition starts and ends.
- Update focused motion tests to assert that no child-level horizontal compensation occurs and that SWAP/EARN rise sequentially.

## Verification
- Check multiple scroll checkpoints at 1280px, 1440px, and the current 1519px desktop width.
- Confirm BUY remains unchanged.
- Confirm SWAP and EARN cross the horizontal presentation point, continue left with their rail segments, and rise at their respective bends.
- Confirm the line and text never visually separate.
- Confirm the mobile layout is unchanged and all tests/build checks pass.
