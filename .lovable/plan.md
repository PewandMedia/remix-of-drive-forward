Alle WhatsApp-Buttons auf der Website sollen einheitlich in der offiziellen WhatsApp-Grün-Farbe (#25D366) dargestellt werden.

Betroffene Stellen:
1. **Startseite (src/routes/index.tsx)**
   - Hero-Button "Jetzt per WhatsApp anmelden" (derzeit rot/bg-primary)
   - Bento-Panel "Chat starten" Link (derzeit nur Text in primary)

2. **Preise (src/routes/preise.tsx)**
   - WhatsApp-Buttons in den 3 Preis-Karten (derzeit rot bei Featured, dunkel bei anderen)

3. **Leistungen (src/routes/leistungen.tsx)**
   - Button "Per WhatsApp fragen" am Seitenende (derzeit rot/bg-primary)

4. **Kontakt (src/routes/kontakt.tsx)**
   - WhatsApp-Kontakt-Button (derzeit weißer Button, nur Icon-Container grün)

5. **Footer (src/components/site/Footer.tsx)**
   - WhatsApp-Social-Icon (derzeit rot/bg-primary)

Umsetzung: Konsequente Anwendung von `bg-[#25D366]` und passendem Text-Kontrast (weiß) auf allen WhatsApp-Elementen. Keine weiteren Seiten betroffen.