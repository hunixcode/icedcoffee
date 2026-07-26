import js from "../assets/js.svg";
import react from "../assets/react.svg";
import mongodb from "../assets/mongodb.svg";
import supabase from "../assets/supabase.svg";
import postgresql from "../assets/postgresql.svg";
import java from "../assets/java.svg";

export interface StackItem {
  name: string;
  src: string;
  /** rendered height in px at the 1440px reference width */
  size: number;
}

export const stack: StackItem[] = [
  { name: "JavaScript", src: js, size: 46 },
  { name: "React", src: react, size: 42 },
  { name: "MongoDB", src: mongodb, size: 41 },
  { name: "Supabase", src: supabase, size: 40 },
  { name: "PostgreSQL", src: postgresql, size: 42 },
  { name: "Java", src: java, size: 50 },
];
