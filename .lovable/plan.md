## Ziel
Die 9 aktuellen Bilder in der Instagram-Sektion der Startseite entfernen und nur die 4 neu hochgeladenen Fotos anzeigen. Weitere Bilder folgen später und werden dann ergänzt.

## Vorgehen

### 1. Neue Bilder als Assets ablegen
- Die 4 Uploads über `lovable-assets` als CDN-Pointer unter `src/assets/insta/` ablegen:
  - `bestanden-neu-1.jpg` (Mercedes CLA, Daumen hoch)
  - `bestanden-neu-2.jpg` (Mercedes GLA grau, Filialen-Aufkleber)
  - `bestanden-neu-3.jpg` (VW Tiguan silber)
  - `bestanden-neu-4.jpg` (Mercedes A-Klasse schwarz, Hijab)

### 2. Alte Bilder entfernen
- Die 9 alten `bestanden-1.jpg` … `bestanden-9.jpg` unter `src/assets/insta/` löschen (jeweils der `.asset.json`-Pointer per `lovable-assets delete`).

### 3. `InstagramSection.tsx` anpassen
- Imports auf die 4 neuen Bilder umstellen.
- `POSTS`-Array auf 4 Einträge reduzieren.
- Grid bleibt `grid-cols-2 md:grid-cols-3`, quadratische Karten — mit 4 Bildern ergibt das auf Mobile 2×2, auf Desktop eine Reihe à 3 + 1.

### 4. Nicht betroffen
- `index.tsx`, Layout, restliche Sektionen — keine Änderung.

## Ergebnis
Insta-Sektion zeigt nur noch die 4 neuen echten Bestanden-Fotos, sauber im Grid. Weitere Bilder können später einfach an das `POSTS`-Array angehängt werden.
