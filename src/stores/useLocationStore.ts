'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Location {
    id: string;
    name: string;
}

interface LocationState {
    locations: Location[];
    currentLocation: Location | null;
    setCurrentLocation: (location: Location) => void;
    addLocation: (location: Location) => void;
    removeLocation: (locationId: string) => void;
}

export const useLocationStore = create<LocationState>()(
    persist(
      (set) => ({
        locations: [
          { id: '1', name: 'Location A' },
          { id: '2', name: 'Location B' },
          { id: '3', name: 'Location C' },
        ],
        currentLocation: null, // Default location
        setCurrentLocation: (location) => set({ currentLocation: location }),
        addLocation: (location) => 
          set((state) => ({ 
            locations: [...state.locations, location] 
          })),
        removeLocation: (locationId) =>
          set((state) => ({
            locations: state.locations.filter((loc) => loc.id !== locationId),
            currentLocation: state.currentLocation?.id === locationId 
              ? state.locations.find(loc => loc.id !== locationId) || null 
              : state.currentLocation,
          })),
      }),
      {
        name: 'location-storage', // unique name for localStorage key
        partialize: (state) => ({ 
          currentLocation: state.currentLocation,
          locations: state.locations 
        }),
      }
    )
  );