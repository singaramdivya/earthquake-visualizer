import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useEarthquakeStore from '../store/earthquakeStore';

const fetchEarthquakes = async (timeRange, minMagnitude) => {
  try {
    const response = await axios.get(
      `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_${timeRange}.geojson`
    );
    return response.data.features.filter(
      (quake) => quake.properties.mag >= minMagnitude
    );
  } catch (error) {
    throw new Error('Failed to fetch earthquake data');
  }
};

export const useEarthquakes = () => {
  const { filters } = useEarthquakeStore();
  
  return useQuery({
    queryKey: ['earthquakes', filters],
    queryFn: () => fetchEarthquakes(filters.timeRange, filters.minMagnitude),
    refetchInterval: 300000, // Refetch every 5 minutes
    retry: 3,
    staleTime: 60000, // Consider data stale after 1 minute
  });
};