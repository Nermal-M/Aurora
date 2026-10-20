export interface NavItem {
  label: string;
  href: string;
  id: string;
}

export interface TelemetryData {
  alt: string;
  temp: string;
  signal: string;
  uptime: string;
  battery: string;
  latLong: string;
}

export interface RoverSpecCallout {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  anchor: [number, number, number]; // 3D coordinates on Tarush
}

export interface StatItem {
  value: string;
  numberValue: number;
  suffix?: string;
  label: string;
  sublabel: string;
}

export const siteConfig = {
  name: "PSG Team Aurora",
  shortName: "Aurora",
  roverName: "Tarush",
  institution: "PSG Institute of Technology and Applied Research (PSG iTech)",
  location: "Coimbatore, Tamil Nadu, India",
  tagline: "Mars Rover Team | Descent to Mars",
  // TODO: PLACEHOLDER: Meta description
  description: "Official website of PSG Team Aurora, an undergraduate Mars rover robotics team from PSG iTech, building the Tarush autonomous rover for international analog competitions.",
  foundedYear: 2019,
  socialLinks: {
    // TODO: PLACEHOLDER: Contact email, LinkedIn, Instagram
    email: "teamaurora@psgitech.ac.in",
    linkedin: "https://www.linkedin.com/company/psg-team-aurora",
    instagram: "https://www.instagram.com/psgteamaurora",
    github: "https://github.com/psg-team-aurora",
    website: "https://psgteamaurora.in",
  },
  address: "PSG Institute of Technology and Applied Research, Neelambur, Coimbatore - 641062, Tamil Nadu, India",
  mapUrl: "https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Psg%20itech+(PSG%20Team%20Aurora)&t=&z=14&ie=UTF8&iwloc=B&output=embed",
};

export const navItems: NavItem[] = [
  { label: "Home", href: "#hero", id: "hero" },
  { label: "About", href: "#about", id: "about" },
  { label: "Subsystems", href: "#subsystems", id: "subsystems" },
  { label: "Team", href: "#team", id: "team" },
  { label: "Challenges", href: "#challenges", id: "challenges" },
  { label: "Updates", href: "#updates", id: "updates" },
  { label: "Sponsors", href: "#sponsors", id: "sponsors" },
];

export const telemetryData: TelemetryData = {
  alt: "248.6 KM",
  temp: "-63°C",
  signal: "98.4%",
  uptime: "SOL 142",
  battery: "94.2 V",
  latLong: "18.65°N 77.43°E",
};

export const aboutStats: StatItem[] = [
  {
    value: "2019",
    numberValue: 2019,
    label: "FOUNDED",
    sublabel: "Active since IRC inception",
  },
  {
    value: "45+",
    numberValue: 45,
    suffix: "+",
    label: "ENGINEERS",
    sublabel: "Cross-disciplinary students",
  },
  {
    value: "12+",
    numberValue: 12,
    suffix: "+",
    label: "MISSIONS",
    sublabel: "Global & national challenges",
  },
  {
    value: "2ND",
    numberValue: 2,
    suffix: "ND",
    label: "BEST GLOBAL RANK",
    sublabel: "International Rover Design Challenge",
  },
];

// 5 Rover Specs for Section 7.4
export const roverSpecs: RoverSpecCallout[] = [
  {
    id: "spec-drivetrain",
    index: "01",
    title: "ROCKER-BOGIE DRIVETRAIN",
    subtitle: "High-Torque Planetary Planetary Drives",
    description: "Six-wheel articulated suspension maintaining ground contact over 45° inclines and rough Martian regolith analogs.",
    tag: "MECHANICAL",
    anchor: [0.32, -0.3, 0.25],
  },
  {
    id: "spec-power",
    index: "02",
    title: "CUSTOM POWER DISTRIBUTION",
    subtitle: "24V LiFePO4 Array with Active BMS",
    description: "Isolated buck-boost conversion planes providing clean transient power to drive motors, onboard GPU, and science payloads.",
    tag: "ELECTRICAL",
    anchor: [0.0, 0.28, -0.15],
  },
  {
    id: "spec-sensors",
    index: "03",
    title: "PERCEPTION & SENSOR SUITE",
    subtitle: "Stereo Depth + LiDAR + 9-Axis IMU",
    description: "Multi-modal sensor fusion delivering real-time point-cloud voxel mapping and hazardous obstacle avoidance.",
    tag: "SENSORS",
    anchor: [0.0, 0.38, 0.35],
  },
  {
    id: "spec-autonomy",
    index: "04",
    title: "ROS2 AUTONOMOUS CORE",
    subtitle: "SLAM Navigation & Path Planning Stack",
    description: "Edge AI compute running Nav2, visual odometry, and autonomous waypoint navigation without human intervention.",
    tag: "AUTONOMY",
    anchor: [0.0, 0.05, 0.0],
  },
  {
    id: "spec-comms",
    index: "05",
    title: "5.8 GHz TELEMETRY LINK",
    subtitle: "Dual-Band Mesh Antenna Array",
    description: "Long-range bi-directional telemetry delivering HD video feeds and low-latency motor commands across a 1.5 km baseline.",
    tag: "COMMUNICATION",
    anchor: [-0.25, 0.35, -0.3],
  },
];
