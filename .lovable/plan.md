Aktuell liegt im Hero-Bereich über dem Video eine untere Info-Zeile mit Sterne-Bewertung ("5.0 · über 500 Bewertungen") und einem "TÜV-geprüft"-Badge. Diese sollen entfernt werden, damit das Hero-Video aufgeräumter wirkt.

Geplante Änderung:
- In `src/routes/index.tsx` innerhalb der `HeroSection` den `<div>` mit der unteren Video-Overlay-Zeile (Sterne + TÜV-Badge) entfernen.
- Oberes "MIRO-DRIVE · Bochum"-Badge und der dunkle Farbverlauf bleiben erhalten.
- Die separate Trust-Zeile unter dem Hero-Text (5.0 · über 500 Bewertungen / TÜV-geprüft) bleibt unverändert, da sie nicht direkt über dem Video liegt.

Danach Build prüfen.