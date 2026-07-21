## Neues Auto-Bild hinzufügen

1. Upload via `lovable-assets create` aus `/mnt/user-uploads/2841F223-042E-4B66-8406-5C391B3595F6.jpg` → Pointer nach `src/assets/auto-vogelperspektive.jpg.asset.json`.
2. In `src/components/site/FilialeGallery.tsx` das neue Bild als drittes Auto-Bild ergänzen (Kennzeichen BO FM 623, Vogelperspektive mit Logo auf Motorhaube).
3. Bei 3 Bildern greift automatisch das bestehende Mosaik-Layout (Hero + 2 kleine) – ohne Caption-Overlay (`showCaption={false}` bleibt via `active.id === "autos"`).
