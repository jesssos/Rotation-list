export interface Staff {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'CIL' | 'MANAGEMENT' | 'STAFF';
  houses: string[];
}

export interface House {
  id: string;
  name: string;
  staff: Staff[];
  address: string;
  phone: string;
}