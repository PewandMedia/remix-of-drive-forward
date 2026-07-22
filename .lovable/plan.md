# Instagram-Beiträge dynamisch verwalten

Aktuell sind die vier Instagram-Bilder in `src/components/site/InstagramSection.tsx` fest hinterlegt. Die Tabelle `instagram_posts` existiert bereits (Spalten: `image_url`, `post_url`, `caption`, `sort_order`, `active`), wird aber nirgends genutzt. Ziel: Beiträge im Admin-Panel hinzufügen / löschen / (de)aktivieren, Anzeige auf der Startseite kommt aus der DB.

## Umsetzung

**1. Storage-Bucket `instagram` (öffentlich lesbar)**
- Migration: Bucket anlegen + Policies (public read, admin write/delete).

**2. Server-Funktionen** (`src/lib/instagram.functions.ts`)
- `getActiveInstagramPosts` – public, liefert aktive Posts sortiert nach `sort_order` für die Startseite.
- `listInstagramPostsAdmin` – `requireSupabaseAuth` + Admin-Check, liefert alle Posts.
- `createInstagramPost({ image_url, post_url?, caption?, sort_order? })` – Admin.
- `updateInstagramPost({ id, ... })` – Admin (aktiv/inaktiv, Reihenfolge, Link).
- `deleteInstagramPost({ id })` – Admin, löscht Zeile und Storage-Datei (wenn im `instagram`-Bucket).

**3. Startseite** (`InstagramSection.tsx`)
- Bilder aus `getActiveInstagramPosts` via TanStack Query laden.
- Fallback: wenn leer, Sektion ausblenden.
- Jeder Kachel-Link nutzt `post_url` falls gesetzt, sonst `CONTACT.instagram`.

**4. Admin-Panel** (`src/routes/_authenticated/admin.tsx`)
- Neuer Tab „Instagram".
- Grid mit vorhandenen Beiträgen (Vorschaubild, Caption, Aktiv-Toggle, Löschen-Button).
- Upload-Formular: Datei auswählen → Upload in Storage-Bucket → `createInstagramPost` mit `publicUrl`. Optional Felder Caption, Post-URL, Sortierung.

## Offene Punkte
Keine – Reihenfolge über `sort_order` (Zahleneingabe), Drag-and-Drop nicht nötig.
