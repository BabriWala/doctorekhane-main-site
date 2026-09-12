import {
  Activity, Baby, Bone, Brain, BrainCircuit, BriefcaseMedical, ClipboardPlus,
  Ear, Eye, Fingerprint, GraduationCap, HeartPulse, Network, Pill, Ribbon,
  ScanFace, Scissors, Smile, Stethoscope, Wind,
} from "lucide-react";

function OrganIcon({ kind, ...props }) {
  const paths = {
    stomach: <><path d="M10 3v5c0 2-2 3-4 3-3 0-4 4-2 6 2 3 6 4 10 3 5-1 8-5 7-9-.5-3-3-5-5-3-2 2-3 1-3-1V3" /><path d="M4 18v3m3-1v1" /></>,
    kidney: <><path d="M8 4C3 4 2 9 3 14c.5 4 4 6 6 3 1-2-2-3-2-5s3-3 3-5c0-2-1-3-2-3Zm8 0c5 0 6 5 5 10-.5 4-4 6-6 3-1-2 2-3 2-5s-3-3-3-5c0-2 1-3 2-3Z" /><path d="M9 12c3 0 2 6 2 9m4-9c-3 0-2 6-2 9" /></>,
    bladder: <><path d="M6 3v5m12-5v5M12 8c-3-3-8-1-8 3 0 4 4 7 8 7s8-3 8-7c0-4-5-6-8-3Zm-2 10v3m4-3v3" /></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>{paths[kind]}</svg>;
}

// More specific labels come first so related departments retain distinct icons.
const departments = [
  [/psychiatr|phychiatr|মানসিক/i, Brain],
  [/cardiol|হৃদ/i, HeartPulse],
  [/dermatol|চর্ম/i, Fingerprint],
  [/endocrin|হরমোন/i, Activity],
  [/gastro|পরিপাক|পাকস্থলী/i, "stomach"],
  [/neuro\s*surger|নিউরোসার্জ/i, BrainCircuit],
  [/surger|শল্য/i, Scissors],
  [/gyne|gynae|obstetric|স্ত্রী|প্রসূতি/i, Baby],
  [/internal\s*medicine/i, ClipboardPlus],
  [/mbbs|bcs|fcps|macp/i, GraduationCap],
  [/medicine\s*specialist/i, BriefcaseMedical],
  [/medicine|মেডিসিন/i, Pill],
  [/nephro|কিডনি/i, "kidney"],
  [/neuro|স্নায়ু/i, Network],
  [/oncol|cancer|ক্যান্সার/i, Ribbon],
  [/orthop|হাড়/i, Bone],
  [/skin/i, ScanFace],
  [/urol|মূত্র/i, "bladder"],
  [/ophthalm|eye|চক্ষু/i, Eye],
  [/\bent\b|otolaryng|কান/i, Ear],
  [/dental|dentist|দাঁত/i, Smile],
  [/pulmon|respiratory|বক্ষ/i, Wind],
];

export default function DepartmentIcon({ name, className }) {
  const icon = departments.find(([pattern]) => pattern.test(name))?.[1] || Stethoscope;
  if (typeof icon === "string") return <OrganIcon kind={icon} className={className} aria-hidden="true" />;
  const Icon = icon;
  return <Icon className={className} aria-hidden="true" />;
}
