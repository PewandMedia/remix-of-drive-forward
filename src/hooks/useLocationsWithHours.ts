import { useQuery } from "@tanstack/react-query";
import { getLocationHours } from "@/lib/public-data.functions";
import { LOCATIONS, type Location, type OpeningHour } from "@/lib/locations";

export function useLocationsWithHours(): Location[] {
  const { data } = useQuery({
    queryKey: ["location-hours"],
    queryFn: () => getLocationHours(),
    staleTime: 60_000,
  });

  if (!data || data.length === 0) return LOCATIONS;

  const byLocation = new Map<string, OpeningHour[]>();
  for (const row of data) {
    const arr = byLocation.get(row.location_id) ?? [];
    arr.push({ day: row.day_label, time: row.time_label });
    byLocation.set(row.location_id, arr);
  }

  return LOCATIONS.map((loc) => {
    const hours = byLocation.get(loc.id);
    return hours && hours.length > 0 ? { ...loc, hours } : loc;
  });
}
