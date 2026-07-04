## Ziel

Die Seite soll deployment-ready sein, ohne sichtbare Lovable-Referenzen. Wichtig: Ein Teil der Lovable-Pakete (`@lovable.dev/vite-tanstack-config`, `bunfig.toml`, `vite.config.ts`, sowie interne Supabase-Integrationsdateien) ist Teil des Build-Systems dieser Plattform. Diese zu entfernen würde den Build brechen — sie werden nicht ausgeliefert und tauchen für Endnutzer nicht auf. Ich lasse sie deshalb unangetastet.

## Änderungen

1. **`src/routes/__root.tsx`**
   - Import `reportLovableError` entfernen.
   - `useEffect(() => reportLovableError(...))` in `ErrorComponent` entfernen (Boundary bleibt funktional).

2. **`src/lib/lovable-error-reporting.ts`**
   - Datei löschen (wird nach Schritt 1 nicht mehr importiert).

3. **„Edit with Lovable"-Badge ausblenden**
   - Über `publish_settings--set_badge_visibility` (`hide_badge: true`) beim nächsten Publish. Erfordert Pro-Plan.

## Nicht angerührt (Begründung)

- `vite.config.ts`, `bunfig.toml`, `package.json` (`@lovable.dev/*`) — Build-Infrastruktur, nicht user-facing.
- `src/integrations/supabase/*` — auto-generiert, Kommentare erwähnen Lovable intern; kein Output für Endnutzer.
- `AGENTS.md` — reines Repo-Doc.

## Verifikation

- `bun run build` grün.
- Grep `rg -i lovable src public` liefert keine Treffer mehr in ausgeliefertem Code.
