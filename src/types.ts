export interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

export interface Idol {
  id: string;
  name: string;
  avatar: string;
  role: string;
  greeting: string;
  color: string;
  tagline: string;
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  category: string;
}

export interface Skill {
  name: string;
  category: "frontend" | "backend" | "ai" | "other";
  level: number; // 1-100
}
