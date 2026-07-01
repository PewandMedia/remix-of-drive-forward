export const CONTACT = {
  whatsapp: "https://wa.me/491234567890",
  whatsappText: "+49 123 4567890",
  instagram: "https://instagram.com/mirodrive",
  tiktok: "https://tiktok.com/@mirodrive",
  phone: "+491234567890",
  phoneDisplay: "+49 123 4567890",
  email: "info@miro-drive.de",
  address: "Musterstraße 1, 44787 Bochum",
  hours: [
    { day: "Mo – Fr", time: "09:00 – 19:00" },
    { day: "Sa", time: "10:00 – 14:00" },
    { day: "So", time: "geschlossen" },
  ],
  googleRating: "5,0",
  googleReviewCount: 549,
  googleProfileUrl:
    "https://www.google.com/maps/search/?api=1&query=Fahrschule+Miro-Drive+Inh.+Ilkay+Altin+Bochum",
  googleReviewUrl:
    "https://www.google.com/maps/search/?api=1&query=Fahrschule+Miro-Drive+Inh.+Ilkay+Altin+Bochum",
} as const;

export const NAV_LINKS = [
  { to: "/", label: "Startseite" },
  { to: "/preise", label: "Preise" },
  { to: "/leistungen", label: "Leistungen" },
  { to: "/angebote", label: "Angebote" },
  { to: "/erste-hilfe-kurs", label: "Erste-Hilfe-Kurs" },
  { to: "/team", label: "Team" },
  { to: "/kontakt", label: "Kontakt" },
] as const;