
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AutocompleteSearch from '@/components/AutocompleteSearch';
import FilterPanel from '@/components/FilterPanel';
import DoctorList from '@/components/DoctorList';
import { fetchDoctors, getAllSpecialties } from '@/services/doctorService';
import { Doctor } from '@/types/doctor';
import { FilterState, useUrlFilters } from '@/utils/urlUtils';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const { toast } = useToast();
  
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    consultationMode: '',
    specialties: [],
    sortBy: ''
  });

  // Connect to URL parameters
  useUrlFilters(filters, setFilters);
  
  // Fetch doctors data
  useEffect(() => {
    const loadDoctors = async () => {
      setLoading(true);
      try {
        const data = await fetchDoctors();
        setDoctors(data);
        
        // Extract all unique specialties
        const allSpecialties = getAllSpecialties(data);
        setSpecialties(allSpecialties);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
        toast({
          title: "Error",
          description: "Failed to load doctor data. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadDoctors();
  }, [toast]);
  
  // Apply filters when filters or doctors change
  useEffect(() => {
    if (!doctors.length) return;
    
    let result = [...doctors];
    
    // Apply search filter
    if (filters.searchTerm) {
      result = result.filter(doctor => 
        doctor.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }
    
    // Apply consultation mode filter
    if (filters.consultationMode) {
      result = result.filter(doctor => 
        doctor.consultationMode[filters.consultationMode as keyof typeof doctor.consultationMode]
      );
    }
    
    // Apply specialty filters
    if (filters.specialties.length > 0) {
      result = result.filter(doctor => 
        filters.specialties.some(specialty => doctor.specialty.includes(specialty))
      );
    }
    
    // Apply sorting
    if (filters.sortBy) {
      if (filters.sortBy === 'fees') {
        result.sort((a, b) => a.fees - b.fees);
      } else if (filters.sortBy === 'experience') {
        result.sort((a, b) => b.experience - a.experience);
      }
    }
    
    setFilteredDoctors(result);
  }, [doctors, filters]);
  
  // Handlers for filter changes
  const handleSearch = (searchTerm: string) => {
    setFilters({ ...filters, searchTerm });
  };
  
  const handleConsultationModeChange = (mode: string) => {
    setFilters({ ...filters, consultationMode: mode });
  };
  
  const handleSpecialtyChange = (specialty: string) => {
    const updatedSpecialties = filters.specialties.includes(specialty)
      ? filters.specialties.filter(s => s !== specialty)
      : [...filters.specialties, specialty];
    
    setFilters({ ...filters, specialties: updatedSpecialties });
  };
  
  const handleSortChange = (sortBy: string) => {
    setFilters({ ...filters, sortBy });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with search */}
      <header className="bg-blue-DEFAULT py-4 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <AutocompleteSearch 
              doctors={doctors} 
              onSearch={handleSearch} 
              searchTerm={filters.searchTerm}
            />
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter sidebar */}
          <div className="md:w-1/3 lg:w-1/4">
            <FilterPanel
              specialties={specialties}
              selectedSpecialties={filters.specialties}
              consultationMode={filters.consultationMode}
              sortBy={filters.sortBy}
              onSpecialtyChange={handleSpecialtyChange}
              onConsultationModeChange={handleConsultationModeChange}
              onSortChange={handleSortChange}
            />
          </div>
          
          {/* Doctor listing */}
          <div className="md:w-2/3 lg:w-3/4">
            <DoctorList doctors={filteredDoctors} loading={loading} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
