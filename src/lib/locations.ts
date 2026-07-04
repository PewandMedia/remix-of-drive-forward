export type OpeningHour = { day: string; time: string };

export type Location = {
  id: string;
  label: string;
  name: string;
  street: string;
  zip: string;
  city: string;
  hours: OpeningHour[];
};

export const LOCATIONS: Location[] = [
  {
    id: "bochum-zentrum",
    label: "Standort 1",
    name: "Bochum Zentrum (Brückstraße)",
    street: "Brückstraße 53",
    zip: "44787",
    city: "Bochum",
    hours: [
      { day: "Di. – Do.", time: "14:00 – 20:00" },
      { day: "Fr.", time: "14:00 – 18:00" },
      { day: "Sa. – Mo.", time: "geschlossen" },
    ],
  },
  {
    id: "bochum-riemke",
    label: "Standort 2",
    name: "Bochum Riemke (Herner Str.)",
    street: "Herner Straße 365",
    zip: "44807",
    city: "Bochum",
    hours: [
      { day: "Di. – Do.", time: "14:00 – 20:00" },
      { day: "Fr.", time: "14:00 – 18:00" },
      { day: "Sa. – Mo.", time: "geschlossen" },
    ],
  },
];

export function fullAddress(loc: Location) {
  return `${loc.street}, ${loc.zip} ${loc.city}`;
}

export function navigationUrl(loc: Location) {
  const destination = encodeURIComponent(fullAddress(loc));
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
}