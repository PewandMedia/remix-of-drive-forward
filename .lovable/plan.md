## Ziel
Damit die Instagram-Section in der Vorschau nicht leer bleibt, sollen Beispiel-Beiträge sichtbar sein – auch ohne dass du vorher im Admin etwas hochlädst.

## Vorgehen
- 6 Platzhalter-Beiträge in die Tabelle `instagram_posts` einfügen via `supabase--insert`:
  - `image_url`: generische, frei verwendbare Auto-/Führerschein-Bilder von Unsplash (stabile URLs, kein Upload nötig).
  - `caption`: realistische deutsche „Führerschein bestanden"-Texte (z. B. „Glückwunsch, Lina! 🎉 Klasse B bestanden ✅").
  - `post_url`: zeigt vorerst auf das Profil `https://www.instagram.com/miro_drive/` (echte Beitrags-Links kannst du später im Admin nachtragen).
  - `sort_order`: 1–6, `active`: true.
- Keine Code-Änderung nötig – die Karussell-Komponente rendert die Posts automatisch.

## Hinweis
Sobald du echte Screenshots deiner Instagram-Beiträge im Admin-Bereich hochlädst, kannst du die Platzhalter dort deaktivieren oder löschen. Soll ich genau so vorgehen?