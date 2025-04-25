
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export type FilterState = {
  searchTerm: string;
  consultationMode: string;
  specialties: string[];
  sortBy: string;
}

export const useUrlFilters = (
  filters: FilterState,
  setFilters: (filters: FilterState) => void
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Update URL when filters change
  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    
    if (filters.searchTerm) {
      newSearchParams.set('search', filters.searchTerm);
    }
    
    if (filters.consultationMode) {
      newSearchParams.set('mode', filters.consultationMode);
    }
    
    if (filters.specialties.length > 0) {
      newSearchParams.set('specialties', filters.specialties.join(','));
    }
    
    if (filters.sortBy) {
      newSearchParams.set('sort', filters.sortBy);
    }
    
    setSearchParams(newSearchParams);
  }, [filters, setSearchParams]);

  // Update filters from URL on initial load
  useEffect(() => {
    const search = searchParams.get('search') || '';
    const mode = searchParams.get('mode') || '';
    const specialtiesParam = searchParams.get('specialties');
    const specialties = specialtiesParam ? specialtiesParam.split(',') : [];
    const sortBy = searchParams.get('sort') || '';

    setFilters({
      searchTerm: search,
      consultationMode: mode,
      specialties,
      sortBy
    });
  }, []);
};
