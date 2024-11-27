import { create } from 'zustand';

const useEarthquakeStore = create((set) => ({
  filters: {
    minMagnitude: 0,
    timeRange: '24h',
  },
  setFilters: (filters) => set({ filters }),
  selectedQuake: null,
  setSelectedQuake: (quake) => set({ selectedQuake: quake }),
}));

export default useEarthquakeStore;