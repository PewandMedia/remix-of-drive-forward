## Problem

Auf dem VPS zeigen Unterseiten (z. B. `/erste-hilfe-kurs`) beim SSR „Backend server env missing". Ursache: `src/lib/public-data.server.ts` liest ausschließlich `process.env.SUPABASE_URL` / `process.env.SUPABASE_PUBLISHABLE_KEY`. Diese Vars sind auf dem VPS nicht gesetzt — nur die `VITE_`-Varianten stehen in der `.env`.

## Fix

`src/lib/public-data.server.ts` so anpassen, dass die Werte in dieser Reihenfolge gelesen werden:

1. `process.env.SUPABASE_URL` → Fallback `process.env.VITE_SUPABASE_URL`
2. `process.env.SUPABASE_PUBLISHABLE_KEY` → Fallback `process.env.VITE_SUPABASE_PUBLISHABLE_KEY`

Wenn beide Paare leer sind, weiterhin klar loggen und werfen (damit Diagnose möglich bleibt).

Alles andere (Fetch-Shim, Auth-Optionen) bleibt unverändert.

## Betroffene Datei

- `src/lib/public-data.server.ts` — nur die `serverPublicClient()`-Funktion

## Ergebnis

Nach `git pull && bun run build && pm2 restart` laden alle SSR-Unterseiten auf dem VPS wieder Inhalte, weil der Server die vorhandenen `VITE_`-Vars nutzt.
