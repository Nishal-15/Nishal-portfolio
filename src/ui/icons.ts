import { Globe, Lightbulb, Rocket, Satellite, Scale, ShoppingBag, Trophy, type LucideIcon } from "lucide-react";
import type { Achievement, Project } from "../data/resume";

export const projectIcons: Record<Project["posterIcon"], LucideIcon> = {
  scale: Scale,
  bag: ShoppingBag,
  globe: Globe,
};

export const achievementIcons: Record<Achievement["icon"], LucideIcon> = {
  trophy: Trophy,
  rocket: Rocket,
  satellite: Satellite,
  lightbulb: Lightbulb,
};
