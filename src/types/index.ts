export interface Donor {
  _id: string;
  name: string;
  email: string;
  bloodGroup: string;
  division: string;
  district: string;
  upazila: string;
  lastDonationDate?: string;
  isAvailable: boolean;
  phone: string;
  image?: string;
}

export interface AuthContextType {
  isAuth: boolean;
  profData: Partial<Donor>;
  token: string | null;
  setAccessToken: (token: string | null) => void;
  isLoading: boolean;
}
