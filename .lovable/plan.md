## Plan: Vite Server allowedHosts Fix

**Problem:** Requests an `mirodrive.pewandmedia.de` werden vom Vite-Dev-Server blockiert.

**Lösung:** `vite.config.ts` erweitern.

### Schritte

1. **Datei `vite.config.ts` aktualisieren**
   - Bestehende `allowedHosts` um `www.mirodrive.pewandmedia.de` erweitern.
   - `host: "0.0.0.0"` unter `vite.server` hinzufügen, damit der Server extern erreichbar ist.
   - Keine bestehenden Einträge (`mirodrive.pewandmedia.de`, `.pewandmedia.de`, `.lovable.app`) entfernen oder duplizieren.

2. **Dev-Server neu starten**
   - Nach der Konfigurationsänderung den Vite-Dev-Server neu starten, damit die neuen allowedHosts aktiv werden.

### Erwartetes Ergebnis
```typescript
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    server: {
      host: "0.0.0.0",
      allowedHosts: [
        "mirodrive.pewandmedia.de",
        "www.mirodrive.pewandmedia.de",
        ".pewandmedia.de",
        ".lovable.app",
      ],
    },
  },
});
```

**Keine Änderungen an Design, Inhalten, Funktionen oder anderen Dateien.**