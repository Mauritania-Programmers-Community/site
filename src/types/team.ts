export interface TeamMemberLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  bio: string;
  bioAr: string;
  image: string;
  skills?: string[];
  links: TeamMemberLinks;
}

export interface TeamData {
  founders: TeamMember[];
  admins: TeamMember[];
}
