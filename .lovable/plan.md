## Problem
Die Domain `mirodrive.pewandmedia.de` wird von Vite blockiert („Blocked request. This host is not allowed").

## Lösung
In `vite.config.ts` die `allowedHosts` erweitern, damit die Custom Domain (und Subdomains) zugelassen sind.

```ts
export default defineConfig({
  tanstackStart: { server: { entry: "server" } },
  vite: {
    server: {
      allowedHosts: ["mirodrive.pewandmedia.de", ".pewandmedia.de", ".lovable.app"],
    },
  },
});
```

Danach lädt die Seite unter der Domain normal.
