export interface RecruitedMember {
  name: string;
  department: string;
  degree: string;
}

export interface DepartmentRecruitment {
  id: string;
  name: string;
  shortName: string;
  count: number;
  iconName: string;
  color: string;
  members: RecruitedMember[];
}

export const recruitmentResultsData: DepartmentRecruitment[] = [
  {
    id: "ros",
    name: "ROS & Autonomous",
    shortName: "ROS",
    count: 6,
    iconName: "Cpu",
    color: "#00E5FF",
    members: [
      { name: "Nandhikeshwaraa", department: "Electronics & Communication", degree: "B.E ECE" },
      { name: "Nakshatra V S", department: "Computer Science", degree: "B.E CSE" },
      { name: "Haridhraa", department: "AI & Data Science", degree: "B.Tech AI & DS" },
      { name: "Sri Ram", department: "Computer Science", degree: "B.E CSE" },
      { name: "Srinidhi", department: "Computer Science", degree: "B.E CSE" },
      { name: "Nithish", department: "Electrical & Electronics", degree: "B.E EEE" },
    ],
  },
  {
    id: "electrical",
    name: "Electrical",
    shortName: "Electrical",
    count: 5,
    iconName: "Zap",
    color: "#FFC93C",
    members: [
      { name: "Aakash R M", department: "Electronics & Communication", degree: "B.E ECE" },
      { name: "Harinarayan D", department: "Electronics & Communication", degree: "B.E ECE" },
      { name: "Aarthi Srimathy S", department: "Electronics & Communication", degree: "B.E ECE" },
      { name: "Sundara Nellaiappan S C", department: "VLSI Design & Tech", degree: "B.Tech VLSI" },
      { name: "Samrithi E M", department: "VLSI Design & Tech", degree: "B.Tech VLSI" },
    ],
  },
  {
    id: "science",
    name: "Sensors & Science",
    shortName: "Science",
    count: 5,
    iconName: "Microscope",
    color: "#2EE6C5",
    members: [
      { name: "Jorenz Angello P", department: "Electronics & Communication", degree: "B.E ECE" },
      { name: "Vetrivel S", department: "Electronics & Communication", degree: "B.E ECE" },
      { name: "Shashwanth S", department: "VLSI Design & Tech", degree: "B.Tech VLSI" },
      { name: "Yugan Krishnaa R S", department: "Electronics & Communication", degree: "B.E ECE" },
      { name: "Parthiv Krishna S", department: "Electronics & Communication", degree: "B.E ECE" },
    ],
  },
  {
    id: "mechanical",
    name: "Mechanical",
    shortName: "Mechanical",
    count: 6,
    iconName: "Wrench",
    color: "#FF6B35",
    members: [
      { name: "Kavi Prasath", department: "Mechanical Engineering", degree: "B.E Mech" },
      { name: "Sibiyasini", department: "Mechanical Engineering", degree: "B.E Mech" },
      { name: "Lathika Anbarasu", department: "Mechanical Engineering", degree: "B.E Mech" },
      { name: "Sureka", department: "Mechanical Engineering", degree: "B.E Mech" },
      { name: "Yadhin", department: "Mechanical Engineering", degree: "B.E Mech" },
      { name: "Kameshwaran", department: "Mechanical Engineering", degree: "B.E Mech" },
    ],
  },
  {
    id: "communication",
    name: "Communication",
    shortName: "Comms",
    count: 2,
    iconName: "Radio",
    color: "#8B6CFF",
    members: [
      { name: "Nesanth R K", department: "Electronics & Communication", degree: "B.E ECE" },
      { name: "Priyadarshini K", department: "Electronics & Communication", degree: "B.E ECE" },
    ],
  },
];

export const totalRecruits = recruitmentResultsData.reduce((acc, curr) => acc + curr.count, 0); // 24
