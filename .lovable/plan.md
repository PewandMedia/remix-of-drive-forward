Auf der mobilen Preisseite sollen die Führerscheinklassen klar beschrieben werden, damit Besucher sofort verstehen, was B, B197 und B78 bedeuten.

Änderung in `src/routes/preise.tsx`:
- Ersetze den reinen Kurz-Code (`Klasse B`, `Klasse B197`, `Klasse B78`) in der Karten-Überschrift auf Mobile durch beschreibende Labels:
  - **Klasse B** → „Klasse B – Schaltgetriebe“
  - **Klasse B197** → „Klasse B197 – Automatik mit Schaltberechtigung“
  - **Klasse B78** → „Klasse B78 – Reine Automatik“
- Die Desktop-Ansicht behält die bestehende Darstellung bei oder zeigt ebenfalls das Klartext-Label, je nachdem was besser aussieht.
- Keine Datenbank- oder Routing-Änderungen nötig.