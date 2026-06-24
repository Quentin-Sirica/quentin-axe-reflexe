Replace the current Quentin portrait on the homepage with the new photo attached to the chat.

Plan:
1. Upload the attached image `Quentin-portrait-2.jpeg` via the `lovable-assets` CLI to create a CDN asset pointer in `src/assets/`.
2. Update the import in `src/routes/index.tsx` (line 9) to reference the new asset pointer instead of `quentin-portrait.jpg.asset.json`.
3. Delete the old `quentin-portrait.jpg.asset.json` pointer and its CDN asset once it is no longer referenced anywhere.
4. Verify the new portrait renders correctly in both the small avatar (≈line 461) and the main about-section image (≈line 603).