import teamData from "@/../data/team.json";
import type { TeamData, TeamMember } from "@/types/team";

const data = teamData as TeamData;

export function getFounders(): TeamMember[] {
  return data.founders;
}

export function getAdmins(): TeamMember[] {
  return data.admins;
}

export function getAllTeamMembers(): TeamMember[] {
  return [...data.founders, ...data.admins];
}

export function getTeamMemberById(id: string): TeamMember | undefined {
  return getAllTeamMembers().find((member) => member.id === id);
}

export function getLocalizedName(member: TeamMember, locale: string): string {
  return locale === "ar" ? member.nameAr : member.name;
}

export function getLocalizedRole(member: TeamMember, locale: string): string {
  return locale === "ar" ? member.roleAr : member.role;
}

export function getLocalizedBio(member: TeamMember, locale: string): string {
  return locale === "ar" ? member.bioAr : member.bio;
}
