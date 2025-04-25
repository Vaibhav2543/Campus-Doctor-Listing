
export interface Doctor {
  id: string;
  name: string;
  image: string;
  specialty: string[];
  qualifications: string;
  additionalQualification?: string;
  experience: number;
  fees: number;
  clinic: string;
  location: string;
  consultationMode: {
    videoConsult: boolean;
    inClinic: boolean;
  };
}
