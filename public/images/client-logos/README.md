# 120VC Approved Client Logo Pack

This pack contains the 17 client/brand marks shown in the approved logo strips supplied in the conversation.

## Included brands

- AT&T
- Blizzard Entertainment
- CA Technologies
- Cisco
- Comcast
- Disney
- Epic Games
- Hoag
- Mattel
- Okta
- ResMed
- Riot Games
- Sony Pictures
- Toyota Financial Services
- Activision
- AECOM
- Amgen

## Folders

- `individual-transparent/` — tightly cropped transparent grayscale PNGs for flexible website use.
- `marquee-ready/` — normalized 600×240 transparent canvases, centered for a moving logo rail.
- `contact-sheet.jpg` — visual QA sheet of all marks.

## Recommended website treatment

Use the `marquee-ready/` files in the homepage logo rail. Set a consistent rendered box rather than forcing every logo to the same width. Preserve aspect ratio.

Recommended CSS concept:

```css
.client-logo {
  width: 180px;
  height: 72px;
  object-fit: contain;
  opacity: .72;
  flex: 0 0 auto;
}
```

For taller marks such as Sony Pictures and Epic Games, allow a slightly smaller maximum width while keeping the same visual height.

## Note

These assets were extracted from the exact approved logo artwork supplied by the user so the visual marks match the versions already used by 120VC. They are not a substitute for original vector master files. If vector masters are later available, swap them into the same filenames/canvas system without changing the marquee component.
