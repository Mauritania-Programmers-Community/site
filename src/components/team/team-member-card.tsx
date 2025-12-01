"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Github, Linkedin, Twitter, Globe, Crown, Shield } from "lucide-react";
import type { TeamMember } from "@/types/team";
import { getLocalizedName, getLocalizedRole, getLocalizedBio } from "@/lib/team";

interface TeamMemberCardProps {
  member: TeamMember;
  locale: string;
  index?: number;
  variant?: "founder" | "admin";
}

export function TeamMemberCard({
  member,
  locale,
  index = 0,
  variant = "admin",
}: TeamMemberCardProps) {
  const name = getLocalizedName(member, locale);
  const role = getLocalizedRole(member, locale);
  const bio = getLocalizedBio(member, locale);
  const isFounder = variant === "founder";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        className={`group relative h-full overflow-hidden transition-all duration-500 hover:shadow-2xl ${
          isFounder
            ? "border-2 border-mpc-gold-500/50 bg-gradient-to-b from-mpc-gold-500/5 to-background hover:border-mpc-gold-500"
            : "border-2 hover:border-mpc-green-500/50"
        }`}
      >
        {/* Background gradient on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${
            isFounder
              ? "from-mpc-gold-500/10 to-mpc-green-500/5"
              : "from-mpc-green-500/5 to-transparent"
          } opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
        />

        {/* Header with avatar */}
        <div
          className={`relative flex flex-col items-center pb-0 pt-8 ${
            isFounder
              ? "bg-gradient-to-br from-mpc-gold-500/20 to-mpc-green-500/10"
              : "bg-gradient-to-br from-mpc-green-500/10 to-mpc-green-700/5"
          }`}
        >
          {/* Badge */}
          {isFounder && (
            <motion.div
              className="absolute end-4 top-4"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: index * 0.1 + 0.2 }}
            >
              <Badge className="gap-1 bg-mpc-gold-500 text-black">
                <Crown className="h-3 w-3" />
                Founder
              </Badge>
            </motion.div>
          )}

          {/* Avatar */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Avatar
              className={`h-28 w-28 border-4 shadow-xl ${
                isFounder
                  ? "border-mpc-gold-500/50"
                  : "border-mpc-green-500/30"
              }`}
            >
              <AvatarImage src={member.image} alt={name} />
              <AvatarFallback
                className={`text-3xl font-bold ${
                  isFounder
                    ? "bg-mpc-gold-500/20 text-mpc-gold-600"
                    : "bg-mpc-green-500/20 text-mpc-green-600"
                }`}
              >
                {name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            {/* Status indicator */}
            <div
              className={`absolute -bottom-1 -end-1 h-6 w-6 rounded-full border-4 border-background ${
                isFounder ? "bg-mpc-gold-500" : "bg-mpc-green-500"
              }`}
            />
          </motion.div>

          {/* Decorative element */}
          <div className="mt-4 h-px w-16 bg-gradient-to-r from-transparent via-mpc-green-500/50 to-transparent" />
        </div>

        <CardContent className="relative p-6 text-center">
          {/* Name */}
          <motion.h3
            className="mb-1 text-xl font-bold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.1 }}
          >
            {name}
          </motion.h3>

          {/* Role */}
          <p
            className={`mb-3 text-sm font-medium ${
              isFounder ? "text-mpc-gold-500" : "text-mpc-green-500"
            }`}
          >
            {role}
          </p>

          {/* Bio */}
          <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
            {bio}
          </p>

          {/* Skills */}
          {member.skills && member.skills.length > 0 && (
            <div className="mb-4 flex flex-wrap justify-center gap-1.5">
              {member.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="text-xs font-normal"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          )}

          {/* Social links */}
          <div className="flex justify-center gap-2">
            {member.links.github && (
              <motion.div
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full hover:bg-mpc-green-500/10 hover:text-mpc-green-500"
                  asChild
                >
                  <a
                    href={member.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
              </motion.div>
            )}
            {member.links.linkedin && (
              <motion.div
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full hover:bg-blue-500/10 hover:text-blue-500"
                  asChild
                >
                  <a
                    href={member.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
              </motion.div>
            )}
            {member.links.twitter && (
              <motion.div
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full hover:bg-sky-500/10 hover:text-sky-500"
                  asChild
                >
                  <a
                    href={member.links.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                </Button>
              </motion.div>
            )}
            {member.links.website && (
              <motion.div
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full hover:bg-purple-500/10 hover:text-purple-500"
                  asChild
                >
                  <a
                    href={member.links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe className="h-4 w-4" />
                  </a>
                </Button>
              </motion.div>
            )}
          </div>
        </CardContent>

        {/* Hover glow effect */}
        <div
          className={`absolute -bottom-20 -end-20 h-40 w-40 rounded-full blur-3xl transition-opacity duration-500 ${
            isFounder
              ? "bg-mpc-gold-500/20 opacity-0 group-hover:opacity-100"
              : "bg-mpc-green-500/20 opacity-0 group-hover:opacity-100"
          }`}
        />
      </Card>
    </motion.div>
  );
}
