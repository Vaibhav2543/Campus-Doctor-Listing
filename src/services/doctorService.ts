
import { Doctor } from "@/types/doctor";

const API_URL = "https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json";

interface ApiDoctor {
  id: string;
  name: string;
  photo: string;
  specialities: { name: string }[];
  fees: string;
  experience: string;
  languages: string[];
  clinic: {
    name: string;
    address: {
      locality: string;
      city: string;
    }
  };
  video_consult: boolean;
  in_clinic: boolean;
}

export async function fetchDoctors(): Promise<Doctor[]> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch doctor data");
    }
    const data = await response.json();
    
    // Map API response to our Doctor type
    return data.map((apiDoctor: ApiDoctor): Doctor => {
      // Extract experience years from string like "13 Years of experience"
      const experienceMatch = apiDoctor.experience.match(/(\d+)/);
      const experienceYears = experienceMatch ? parseInt(experienceMatch[0], 10) : 0;
      
      // Extract fee amount from string like "₹ 500"
      const feesMatch = apiDoctor.fees.match(/(\d+)/);
      const fees = feesMatch ? parseInt(feesMatch[0], 10) : 0;
      
      // Map specialities array of objects to array of strings
      const specialty = apiDoctor.specialities.map(spec => spec.name);
      
      return {
        id: apiDoctor.id,
        name: apiDoctor.name,
        image: apiDoctor.photo,
        specialty: specialty,
        qualifications: "", // This field isn't in the API
        experience: experienceYears,
        fees: fees,
        clinic: apiDoctor.clinic.name,
        location: `${apiDoctor.clinic.address.locality}, ${apiDoctor.clinic.address.city}`,
        consultationMode: {
          videoConsult: apiDoctor.video_consult,
          inClinic: apiDoctor.in_clinic
        }
      };
    });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
}

export function getAllSpecialties(doctors: Doctor[]): string[] {
  const specialtiesSet = new Set<string>();
  
  doctors.forEach(doctor => {
    doctor.specialty.forEach(specialty => {
      specialtiesSet.add(specialty);
    });
  });
  
  return Array.from(specialtiesSet).sort();
}
