## Navbar-Optimierung: Entferne CTA & erweitere Mobile-Navigation

### Was geändert wird
1. **"Jetzt anmelden"-Button entfernen** – Sowohl in der Desktop-Navigation als auch im mobilen Vollbild-Menü (unterhalb der Nav-Links).
2. **Mobile Sidebar erweitern** – Die Links "FAQ" (`/faq`) und "Über uns" (`/ueber-uns`) werden ausschließlich im mobilen Menü ergänzt. Auf dem Desktop bleiben sie aus der Top-Navigation herausgenommen (da nicht erwähnt).

### Technische Details
- `src/components/site/Navbar.tsx`:
  - Entferne den `<Link to="/kontakt">Jetzt anmelden</Link>`-Block aus der Desktop-Nav (`.hidden lg:flex`).
  - Entferne denselben Button aus der mobilen Nav (`fixed inset-0 ... lg:hidden`).
  - Erstelle eine separate `mobileNavLinks`-Liste (z. B. durch Spread von `NAV_LINKS` + Anhängen von FAQ & Über uns) und rendere diese im mobilen Menü.

### Keine neuen Routen
Die Seiten `/faq` und `/ueber-uns` existieren bereits (`src/routes/faq.tsx`, `src/routes/ueber-uns.tsx`). Es sind nur Link-Ergänzungen in der Navbar nötig.