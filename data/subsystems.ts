export interface Member {
  name: string;
  role?: string;
  department?: string;
  year?: string;
  imageUrl: string;
}

export interface Subsystem {
  id: string;
  deckNumber: string;
  deckIndex: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  accentColor: string;
  accentHex: string;
  iconName: string;
  capabilities: string[];
  specs: { label: string; value: string }[];
  leadEngineer: string;
  statusBadge: string;
  members: Member[];
}

export const subsystemsData: Subsystem[] = [
  {
    id: "mechanical",
    deckNumber: "DECK 01",
    deckIndex: "01 / 06",
    name: "Mechanical Subsystem",
    shortName: "Mechanical",
    tagline: "Chassis, Rocker-Bogie & Robotic Arm Mechanics",
    description:
      "Responsible for the structural integrity, custom planetary wheel hubs, 6-DOF robotic manipulator, differential rocker-bogie kinematics, and extreme terrain mobility.",
    accentColor: "border-orange-500 text-orange-400 bg-orange-500/10",
    accentHex: "#FF6B35",
    iconName: "Wrench",
    leadEngineer: "Tharakeshwaran",
    statusBadge: "FLIGHT READY // STRUCTURAL LOCK",
    capabilities: [
      "6-DOF Robotic Manipulator",
      "Differential Rocker-Bogie",
      "Planetary Gearbox Hubs",
      "Carbon Fiber Reinforcement",
    ],
    specs: [
      { label: "PAYLOAD CAPACITY", value: "15 KG ARM LOAD" },
      { label: "CHASSIS MASS", value: "38.5 KG STRUCTURAL" },
      { label: "TRAVERSAL GRADE", value: "45° INCLINE GRADE" },
    ],
    members: [
      { name: "Tharakeshwaran", role: "Mechanical Lead", imageUrl: "/images/team/Tharakeshwaran.jpg" },
      { name: "Sailesh", role: "Chassis & Mobility", imageUrl: "/images/team/Sailesh.jpg" },
      { name: "Jerome Flawin J", role: "Manipulator Design", imageUrl: "/images/team/Jerome.jpg" },
      { name: "Akash S", role: "CAD & Structural Analysis", imageUrl: "/images/team/Akash.jpg" },
    ],
  },
  {
    id: "electrical",
    deckNumber: "DECK 02",
    deckIndex: "02 / 06",
    name: "Electrical Subsystem",
    shortName: "Electrical",
    tagline: "Power Architectures, Custom PCBs & Motor Drives",
    description:
      "Engineers custom isolated power distribution boards, brushless DC motor drivers, high-current protection circuitry, battery management systems, and wiring harnesses.",
    accentColor: "border-yellow-400 text-yellow-300 bg-yellow-400/10",
    accentHex: "#FFC93C",
    iconName: "Zap",
    leadEngineer: "Kamali S & Harshaa",
    statusBadge: "POWER GRID STABLE // 48V ISOLATED",
    capabilities: [
      "Custom 48V Distribution PCBs",
      "CAN-Bus 2.0B Architecture",
      "BLDC FOC Motor Control",
      "Active Cell-Balance BMS",
    ],
    specs: [
      { label: "BUS VOLTAGE", value: "48V DC BUS ISOLATED" },
      { label: "PEAK DISCHARGE", value: "120A TRANSIENT" },
      { label: "COMM BUS", value: "CAN 2.0B / 1 Mbps" },
    ],
    members: [
      { name: "Kamali S", role: "Subsystem Engineer", imageUrl: "/images/team/Kamali.jpg" },
      { name: "Harshaa", role: "Subsystem Engineer", imageUrl: "/images/team/Harshaa.jpg" },
      { name: "Selvadharshini S", role: "PCB Layout & Power", imageUrl: "/images/team/Selvadharshini.jpg" },
      { name: "Vismitha", role: "Embedded Electronics", imageUrl: "/images/team/Vismitha.jpeg" },
      { name: "Modhika", role: "Electronics Integration", imageUrl: "/images/team/Modhika.jpg" },
      { name: "Leninsingharam", role: "Hardware Verification", imageUrl: "/images/team/Lenin.jpeg" },
      { name: "Barath Krishna", role: "Motor Control Systems", imageUrl: "/images/team/Barath.jpg" },
      { name: "Anandh", role: "Power Distribution", imageUrl: "/images/team/Anandh.jpg" },
      { name: "Mahadev", role: "Sensors & Actuation", imageUrl: "/images/team/Mahadev.jpg" },
      { name: "Ankit Chandran R", role: "Circuit Prototyping", imageUrl: "/images/team/Ankit.jpg" },
    ],
  },
  {
    id: "science",
    deckNumber: "DECK 03",
    deckIndex: "03 / 06",
    name: "Science & Sensors Subsystem",
    shortName: "Science & Sensors",
    tagline: "Soil Analysis, Life Detection & Soil Sampling",
    description:
      "Develops automated chemical assay tests, spectroscopic soil evaluation chambers, moisture/methane telemetry, and biological sample collection modules for astrobiology tasks.",
    accentColor: "border-emerald-400 text-emerald-300 bg-emerald-400/10",
    accentHex: "#2EE6C5",
    iconName: "Microscope",
    leadEngineer: "Sania Franklin",
    statusBadge: "BIO-ASSAY READY // SENSORS ONLINE",
    capabilities: [
      "Automated Chemical Assays",
      "NIR Soil Spectroscopy",
      "Subsurface Coring Drill",
      "Hermetic Soil Chambers",
    ],
    specs: [
      { label: "SPECTRAL BAND", value: "400 - 1000 nm NIR" },
      { label: "SAMPLE DRILL", value: "15 CM DEPTH PENETRATION" },
      { label: "TELEMETRY", value: "CH4, CO2, RH SENSING" },
    ],
    members: [
      { name: "Sania Franklin", role: "Science Lead", imageUrl: "/images/team/Sania.jpg" },
      { name: "Gopinath", role: "Soil Testing Lead", imageUrl: "/images/team/Gopinath.jpg" },
      { name: "Varsha RD", role: "Assay Analysis", imageUrl: "/images/team/VarshaRD.jpeg" },
      { name: "Varsha RS", role: "Spectroscopy", imageUrl: "/images/team/VarshaRS.jpg" },
      { name: "Aksheta", role: "Astrobiology Lead", imageUrl: "/images/team/Aksheta.jpg" },
      { name: "Priya L", role: "Chemical Sensors", imageUrl: "/images/team/Priya.jpg" },
      { name: "Shashwathra", role: "Sample Handling", imageUrl: "/images/team/Shaswathra.jpg" },
      { name: "Sri Harish", role: "Atmospheric Telemetry", imageUrl: "/images/team/SriHarish.jpeg" },
      { name: "Bavishyaa", role: "Biochemical Assay", imageUrl: "/images/team/Bavishyaa.jpg" },
      { name: "Thrisha", role: "Sensor Calibration", imageUrl: "/images/team/Thrisha.jpg" },
      { name: "Priyadharshini", role: "Payload Electronics", imageUrl: "/images/team/Priyadharshini.jpg" },
    ],
  },
  {
    id: "ros-autonomy",
    deckNumber: "DECK 04",
    deckIndex: "04 / 06",
    name: "ROS & Autonomous Subsystem",
    shortName: "ROS & Autonomy",
    tagline: "Edge Compute, SLAM Navigation & Computer Vision",
    description:
      "Architects the full ROS 2 autonomy pipeline: LiDAR voxel mapping, Nav2 global path planning, AR tag detection, stereo visual odometry, and obstacle avoidance algorithms.",
    accentColor: "border-cyan-400 text-cyan-300 bg-cyan-400/10",
    accentHex: "#00E5FF",
    iconName: "Cpu",
    leadEngineer: "Shivani Varsha",
    statusBadge: "SLAM LOCK ACQUIRED // WAYPOINT AUTONOMY",
    capabilities: [
      "3D LiDAR Voxel Octree",
      "ROS 2 Nav2 Costmaps",
      "YOLOv8 AR-Tag Detection",
      "Stereo Visual Odometry",
    ],
    specs: [
      { label: "COMPUTE PLATFORM", value: "NVIDIA JETSON ORIN" },
      { label: "LOCALIZATION", value: "RTAB-MAP + EKF FUSION" },
      { label: "INFERENCE SPEED", value: "35 FPS OBJECT DETECT" },
    ],
    members: [
      { name: "Shivani Varsha", role: "Autonomy Lead", imageUrl: "/images/team/Shivani.jpg" },
      { name: "Sree Snehan", role: "SLAM & Navigation", imageUrl: "/images/team/Snehan.jpeg" },
      { name: "Ashwin M", role: "Computer Vision", imageUrl: "/images/team/Ashwin.jpg" },
      { name: "Sandeep S", role: "Path Planning", imageUrl: "/images/team/Sandeep.jpeg" },
      { name: "Harikrishna S", role: "ROS2 Integration", imageUrl: "/images/team/Harikrishna.jpg" },
      { name: "Risheekesh", role: "Sensors & Simulation", imageUrl: "/images/team/Risheekesh.jpeg" },
      { name: "Gautham Prasath", role: "Depth Perception", imageUrl: "/images/team/Gautham.jpg" },
      { name: "Deepak Chandrasekar", role: "Embedded Compute", imageUrl: "/images/team/Deepak.jpg" },
      { name: "Lakshana G", role: "Visual Odometry", imageUrl: "/images/team/Lakshana.jpg" },
      { name: "Waafiq Raakin", role: "Navigation Stack", imageUrl: "/images/team/Waafiq.jpeg" },
      { name: "Roshini Priya", role: "Algorithm Optimization", imageUrl: "/images/team/Roshini.jpg" },
      { name: "Laxmisrii K", role: "Payload Vision", imageUrl: "/images/team/Laxmisrii.jpeg" },
    ],
  },
  {
    id: "communication",
    deckNumber: "DECK 05",
    deckIndex: "05 / 06",
    name: "Communication Subsystem",
    shortName: "Communication",
    tagline: "Long-Range RF Mesh, Base Station & Telemetry",
    description:
      "Deploys robust 5.8 GHz and 2.4 GHz long-range RF links, real-time video streaming codecs, web-based base station telemetry dashboards, and directional antenna tracking.",
    accentColor: "border-purple-400 text-purple-300 bg-purple-400/10",
    accentHex: "#8B6CFF",
    iconName: "Radio",
    leadEngineer: "Abishek M",
    statusBadge: "RF LINK LOCKED // TELEMETRY VERIFIED",
    capabilities: [
      "5.8 GHz OFDM Mesh Links",
      "Low-Latency H.265 Streams",
      "Base Station Web Telemetry",
      "Automatic Antenna Tracking",
    ],
    specs: [
      { label: "LINK RANGE", value: "1.5 KM LINE-OF-SIGHT" },
      { label: "THROUGHPUT", value: "150 MBPS RF LINK" },
      { label: "LATENCY", value: "< 45 MS REALTIME STREAM" },
    ],
    members: [
      { name: "Abishek M", role: "Comms Lead", imageUrl: "/images/team/Abishek.jpg" },
      { name: "Dousik M", role: "RF Networks", imageUrl: "/images/team/Dousik.jpg" },
      { name: "Sri Harini", role: "Base Station Protocols", imageUrl: "/images/team/SriHarini.jpg" },
    ],
  },
  {
    id: "website",
    deckNumber: "DECK 06",
    deckIndex: "06 / 06",
    name: "Website & Digital Media",
    shortName: "Website",
    tagline: "Web Architecture, 3D Graphics & Team Presence",
    description:
      "Crafts Team Aurora's digital presence, high-performance web experiences, 3D telemetry visualization, and interactive mission showcases.",
    accentColor: "border-rose-400 text-rose-300 bg-rose-400/10",
    accentHex: "#E2552B",
    iconName: "Globe",
    leadEngineer: "Deepak Chandrasekar",
    statusBadge: "TELEMETRY DASHBOARD // LIVE DEPLOYED",
    capabilities: [
      "Next.js App Architecture",
      "Interactive 3D Three.js / R3F",
      "GSAP Scrollytelling Engine",
      "Mobile-First Responsive UI",
    ],
    specs: [
      { label: "FRAMEWORK", value: "NEXT.JS 16 APPS" },
      { label: "RENDER ENGINE", value: "WEBGL 2.0 / THREE.JS" },
      { label: "TARGET FPS", value: "60 FPS SMOOTH ANIMATION" },
    ],
    members: [
      { name: "Deepak Chandrasekar", role: "Frontend Architect", imageUrl: "/images/team/Deepak.jpg" },
      { name: "Risheekesh", role: "Full-Stack & Media", imageUrl: "/images/team/Risheekesh.jpeg" },
    ],
  },
];
