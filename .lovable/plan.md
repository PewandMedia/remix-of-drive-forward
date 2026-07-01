## Team-Seite – Mobile Optimierung

### Ziel
Die Team-Seite auf Mobile kompakter gestalten (weniger Scrollen) und Birtan korrekt den Fahrlehrern zuordnen.

### Änderungen
1. **Birtan umkategorisieren**  
   Im Code wird Birtan aktuell dem Büro-Personal (sort_order ≥ 8) zugeordnet. Er soll stattdessen in die Fahrlehrer-Gruppe (sort_order < 8) verschoben werden, damit er unter "Fahrlehrer" gelistet wird.

2. **Mobile Layout: 2er-Reihen**  
   - Fahrlehrer (inkl. Birtan): Grid auf Mobile von 1 Spalte auf **`grid-cols-2`** umstellen.  
   - Bürokräfte: Gleichermaßen **`grid-cols-2`** auf Mobile.  
   - Ilkay bleibt als einzelnes, hervorgehobenes Element ganz oben (Owner-Card).

3. **Desktop unverändert**  
   Ab `sm`/`lg`/`xl` bleiben die bestehenden Spaltenanzahlen (2 / 3 / 4) wie gehabt.

### Datei
- `src/routes/team.tsx`
