## Änderung

In `src/routes/auth.tsx` den Registrieren-Tab entfernen, sodass nur noch das Login-Formular sichtbar ist.

### Details
- `Tabs`/`TabsList`/`TabsTrigger`/`TabsContent` entfernen und stattdessen direkt das Login-Formular rendern.
- `handleSignup` und den `bootstrapFirstAdmin`-Import entfernen (nicht mehr benötigt).
- Einleitungstext anpassen: nur noch „Login für den Inhaber der Fahrschule."
- Überschrift bleibt „Admin-Bereich".

Keine weiteren Dateien betroffen. Bestehende Admins können sich weiterhin einloggen.