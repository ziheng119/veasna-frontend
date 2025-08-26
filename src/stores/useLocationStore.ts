import { Location } from "@/lib/types/location";
import { SAMPLE_LOCATIONS } from "@/sample_data/sample_locations";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const getNext6AM = () => {
  const now = new Date();
  const next6am = new Date();

  next6am.setHours(6, 0, 0, 0); // today 6am

  if (now >= next6am) {
    // if it's already past 6am today → move to tomorrow 6am
    next6am.setDate(next6am.getDate() + 1);
  }

  return next6am.getTime();
};

interface LocationState {
  locations: Location[];
  currentLocation: Location | null;
  hasHydrated: boolean;

  setHasHydrated: (state: boolean) => void;
  setCurrentLocation: (location: Location) => void;
  addLocation: (location: Location) => void;
  removeLocation: (locationId: number) => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      locations: SAMPLE_LOCATIONS,
      currentLocation: null,
      hasHydrated: false,

      setHasHydrated: (state: boolean) => set({ hasHydrated: state }),
      setCurrentLocation: (location: Location) => set({ currentLocation: location }),
      addLocation: (location: Location) =>
        set((state) => ({
          locations: [...state.locations,location],
        })),
      removeLocation: (locationId) =>
        set((state) => {
          const filtered = state.locations.filter((loc) => loc.id !== locationId);
          const stillValid = state.currentLocation && state.currentLocation.id !== locationId;
          return {
             locations: filtered,
            currentLocation: stillValid ? state.currentLocation : filtered[0] || null,
          };
       })
    }),
    {
      name: "location-storage",
      storage: createJSONStorage(() => ({
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;

          const data = JSON.parse(str);

          if (Date.now() > data.expiry) {
            localStorage.removeItem(name);
            return null; // expired → fallback to defaults
          }

          return data.value;
        },
        setItem: (name, value) => {
          localStorage.setItem(
            name,
            JSON.stringify({
              value,
              expiry: getNext6AM(),
            })
          );
        },
        removeItem: (name) => localStorage.removeItem(name),
      })),
      partialize: (state) => ({
        currentLocation: state.currentLocation,
        locations: state.locations,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
        }
      },
    }
  )
);
