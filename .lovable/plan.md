## Team-Seite mit echten MIRO-DRIVE Personen befüllen

Die hochgeladenen Bilder sind Referenz-Screenshots der bestehenden Team-Übersicht. Ich übernehme **Namen, Rollen und Sprachen** in die Datenbank. Die Portrait-Fotos werden NICHT übernommen (Screenshots, keine sauberen Einzelbilder) — stattdessen werden die Karten mit stilvollen Initialen-Avataren im MIRO-Branding (schwarz/rot) dargestellt. Echte Fotos können später jederzeit über das Admin-Panel hochgeladen werden.

### Schritt 1: Bestehende Team-Einträge entfernen
Platzhalter-Einträge in `team_members` werden gelöscht.

### Schritt 2: Echte Team-Daten einfügen

**Kategorie „Fahrlehrer:innen"** (sort_order 1–7):
| Name | Rolle | Sprachen |
|------|-------|----------|
| Ilkay | Inhaber & Fahrlehrer | Deutsch, Türkisch, Englisch |
| Azad | Fahrlehrer | Deutsch, Arabisch, Kurdisch |
| Lukman | Fahrlehrer | Deutsch, Arabisch, Kurdisch |
| Alan | Fahrlehrer | Deutsch, Arabisch, Kurdisch |
| Burak | Fahrlehrer | Deutsch, Englisch, Türkisch |
| Derya | Fahrlehrerin | Deutsch, Englisch, Türkisch |
| Renas | Fahrlehreranwärter | Deutsch, Kurdisch, Arabisch, Türkisch |

**Kategorie „Bürokräfte"** (sort_order 8–12):
| Name | Rolle | – |
|------|-------|---|
| Bahar | Organisation und Buchhaltung | – |
| Rawshan | Bürokraft | – |
| Dilan | Bürokraft | – |
| Dalaa | Bürokraft | – |
| Jiyan | Auszubildende für Büromanagement | – |

Sprachen werden im Feld `bio` als „Sprachen: …" gespeichert (passt zum bestehenden Schema, kein DB-Schema-Change nötig).

### Schritt 3: Team-Seite anpassen
- Gruppierung in zwei Sektionen: **Fahrlehrer:innen** und **Bürokräfte** (Kategorie-Feld nutzen).
- Avatar-Fallback: runde Karten mit Initialen auf schwarzem Hintergrund + rotem Akzentring, falls kein Foto vorhanden.
- Sprachen als kleine Badges unter dem Namen.

### Offen
Falls du echte Portrait-Fotos hast, lade sie bitte einzeln hoch — dann ersetze ich die Initialen-Avatare durch die echten Bilder.