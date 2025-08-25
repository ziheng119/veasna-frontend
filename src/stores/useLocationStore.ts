import { Location } from "@/lib/types/location";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface LocationState {
  locations: Location[];
  currentLocation: Location | null;
  hasHydrated: boolean;

  setHasHydrated: (state: boolean) => void;
  setCurrentLocation: (location: Location) => void;
  addLocation: (location: Location) => void;
  removeLocation: (locationId: string) => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      locations: [
        { id: '1', name: 'Location A'},
        { id: '2', name: 'Location B'},
        { id: '3', name: 'Location C'},
      ],
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
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentLocation : state.currentLocation,
        locations: state.locations,
      }),

      // Called when Zustand finishes rehydrating the store from localStorage
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
        }
      },
    }
  )
);
