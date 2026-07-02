Das MIRO-DRIVE Logo im Footer soll in Rot statt in Weiß (Invert) angezeigt werden.

Änderung: In `src/components/site/Footer.tsx` wird der aktuelle `invert`-Filter durch eine rotfärbende CSS-Technik ersetzt (z. B. `filter: brightness(0) saturate(100%) invert(18%) sepia(95%) saturate(5000%) hue-rotate(350deg) brightness(95%)` oder einfacher `filter: invert(1) brightness(0.5) sepia(1) hue-rotate(-50deg) saturate(5)`), damit das Logo in der Markenfarbe Rot erscheint und trotzdem auf dem dunklen Hintergrund gut lesbar bleibt.

Nur eine Datei betroffen: `src/components/site/Footer.tsx`.