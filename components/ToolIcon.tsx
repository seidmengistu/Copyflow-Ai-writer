import {
  AlignLeft,
  Briefcase,
  Camera,
  FileText,
  Hash,
  Mail,
  Megaphone,
  PenLine,
  Repeat,
  Search,
  Send,
  ShoppingBag,
  Sparkles,
  Star,
  Video,
} from "lucide-react";

const MAP = {
  Camera,
  PenLine,
  ShoppingBag,
  Mail,
  Video,
  Megaphone,
  Sparkles,
  Briefcase,
  FileText,
  Repeat,
  AlignLeft,
  Hash,
  Send,
  Search,
  Star,
} as const;

export function ToolIcon({ name, className }: { name: string; className?: string }) {
  const Icon = MAP[name as keyof typeof MAP] ?? Sparkles;
  return <Icon className={className} />;
}
