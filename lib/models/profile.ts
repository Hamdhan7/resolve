import type { Role, UUID } from "@/lib/models/common";

export type Profile = {
  id: UUID;
  role: Role;
  full_name: string;
  phone_number: string;
  email: string;
  vendor_id?: UUID;
};

