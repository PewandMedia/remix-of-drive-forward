## Ziel
Der Sprachen-Streifen (`LanguageStrip`) auf der Startseite soll auf der Mobile-Ansicht als endlos wiederholender Marquee von rechts nach links laufen. Desktop bleibt statisch.

## Änderungen

### 1. CSS-Animation in `src/styles.css`
Neue Keyframes `marquee-scroll` und Utility `animate-marquee` hinzufügen:
```css
@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@utility animate-marquee {
  animation: marquee-scroll 20s linear infinite;
}
```

### 2. `LanguageStrip` in `src/routes/index.tsx` umbauen
- Sprachenliste duplizieren, damit der Durchlauf nahtlos ist.
- Inneren Container auf Mobile (`max-sm`) als flex-Row mit `animate-marquee` und `w-max` rendern.
- Desktop weiterhin als statische, zentrierte Liste belassen.
- Container auf Mobile `overflow-hidden`, damit nur die sichtbare Breite läuft.
- Interaktion/Hover-Animationen im mobilen Marquee deaktivieren oder vereinfachen, damit nichts wackelt.

### 3. Responsives Verhalten
- `< sm`: Marquee läuft automatisch, horizontaler Overflow wird versteckt.
- `>= sm`: Bestehendes Layout mit statischen Sprach-Chips.

## Nicht Teil des Plans
- Keine Änderung an den Sprachen selbst.
- Keine Änderung an Desktop-Layout oder Inhalt.
- Keine neuen Daten oder Server-Funktionen.