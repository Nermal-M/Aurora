export interface FacultyAdvisor {
  name: string;
  role: string;
  department: string;
  designation: string;
  institution: string;
  imageUrl: string;
  bio: string;
}

export interface StudentLeader {
  name: string;
  role: string;
  subsystem: string;
  imageUrl: string;
}

export interface TeamEdition {
  edition: string;
  academicYear: string;
  tagline: string;
  faculty: FacultyAdvisor[];
  studentLeadership: StudentLeader[];
}

export const facultyData: FacultyAdvisor[] = [
  {
    name: "Dr. Nagarjun J",
    role: "Faculty Incharge",
    department: "Dept. of Mechanical Engineering",
    designation: "Assistant Professor (Selection Grade)",
    institution: "PSG Institute of Technology and Applied Research",
    imageUrl: "/images/team/Nagarjun.jpg",
    bio: "Mentoring the team in mechanical design, structural kinematics, and payload mechanisms for harsh analog terrain environments.",
  },
  {
    name: "Dr. Ravikrishna S",
    role: "Faculty Advisor",
    department: "Dept. of Electrical and Electronics Engineering",
    designation: "Assistant Professor (Senior Grade)",
    institution: "PSG Institute of Technology and Applied Research",
    imageUrl: "/images/team/ravikrishna.jpg",
    bio: "Guiding custom power systems, battery safety architectures, and high-efficiency motor drive control circuits.",
  },
  {
    name: "Dr. D Venkatesh",
    role: "Faculty Advisor",
    department: "Dept. of Electronics and Communication Engineering",
    designation: "Assistant Professor (Senior Grade)",
    institution: "PSG Institute of Technology and Applied Research",
    imageUrl: "/images/team/venkatesh.jpg",
    bio: "Advising RF communication systems, wireless data links, and embedded sensor telemetry interfaces.",
  },
];

export const studentLeadershipData: StudentLeader[] = [
  {
    name: "Tharakeshwaran",
    role: "Team Lead",
    subsystem: "Mechanical Engineering",
    imageUrl: "/images/team/Tharakeshwaran.jpg",
  },
  {
    name: "Shivani Varsha",
    role: "Autonomy & Systems Lead",
    subsystem: "ROS & Autonomous",
    imageUrl: "/images/team/Shivani.jpg",
  },
  {
    name: "Kamali S",
    role: "Electronics Lead",
    subsystem: "Electrical",
    imageUrl: "/images/team/Kamali.jpg",
  },
  {
    name: "Sania Franklin",
    role: "Science Payload Lead",
    subsystem: "Science & Sensors",
    imageUrl: "/images/team/Sania.jpg",
  },
];

export const teamEditions: TeamEdition[] = [
  {
    edition: "6.0",
    academicYear: "2024 - 2025",
    tagline: "Descent to Mars — Building Tarush for IRC & MBC 2025",
    faculty: facultyData,
    studentLeadership: studentLeadershipData,
  },
];
