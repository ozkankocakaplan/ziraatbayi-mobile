export default interface DealerResponse {
  id: number;
  companyImage: string;
  dealerId: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  glnNumber: string;
  taxNumber: string;
  taxOffice: string;
  address: string;
  isActive: boolean;
  isApproved: boolean;
}
