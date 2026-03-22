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
  address?: string;
  isSeak?: boolean;
  location?: {
    thana?: string;
    upazila?: string;
    district?: string;
    division?: string;
  };
}

export interface AuthContextType {
  isAuth: boolean;
  profData: Partial<Donor>;
  token: string | null;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
  isLoading: boolean;
}
