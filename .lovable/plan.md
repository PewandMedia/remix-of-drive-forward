## Erste-Hilfe-Kurs Sektion auf der Startseite optimieren

### Änderungen in `src/routes/index.tsx` (Zeilen 443-475)

1. Die gesamte rechte Bento-Grafik entfernen (rotes Kreuz-Motiv + „50 € Kursgebühr" Card + „Monatlich Neue Termine" Card + „Offiziell anerkannt / Für TÜV & Führerschein-Antrag" Balken) — diese Infos stehen ohnehin bereits im linken Textblock und den InfoStats.
2. Stattdessen **ein einziges KI-generiertes Bild** rechts platzieren: großformatig, `aspect-[4/3]`, `rounded-3xl`, mit dezentem Primary-Glow dahinter.

### KI-Bild generieren

- Tool: `imagegen--generate_image` (premium quality, weil realistisch/hochwertig)
- Motiv: Erste-Hilfe-Kurs im MIRO-DRIVE Kontext — junge Fahrschüler:innen in modernem, hellem Kursraum, eine Person übt Herzdruckmassage an einer Übungspuppe, freundliche Atmosphäre, subtile rote Akzente (passend zur Brand), moderne Optik.
- Speicherpfad: `src/assets/erste-hilfe-hero.jpg`
- Format: 1280×960 (4:3, passend zum Container)

### Ergebnis

Rechte Seite zeigt nur noch ein sauberes, professionelles Foto — links bleibt Titel, Beschreibung, 3 InfoStats und CTA-Button unverändert. Weniger visuelles Rauschen, keine doppelten Infos.
