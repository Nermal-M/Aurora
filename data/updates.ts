export interface UpdateItem {
  id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  description: string;
  imageUrl: string;
  tagColor: string;
}

export const updatesData: UpdateItem[] = [
  {
    id: "update-workshops",
    title: "Recruitment & Robotics Workshops",
    date: "April - July 2025",
    location: "Campus & Virtual",
    category: "COMMUNITY & RECRUITMENT",
    description:
      "To onboard fresh engineering talent and cultivate aerospace innovation, Team Aurora conducts comprehensive hands-on workshops in embedded systems, motor kinematics, and ROS 2 autonomy.",
    imageUrl: "/images/recruit.png",
    tagColor: "#2EE6C5",
  },
  {
    id: "update-pcb-prodigy",
    title: "PCB Prodigy @ Yukta 2025",
    date: "March 2025",
    location: "PSG iTech, Coimbatore",
    category: "TECHNICAL WORKSHOP",
    description:
      "During Yukta 2025, Team Aurora hosted the signature 'PCB Prodigy' workshop, introducing over 100 participants to schematic capture, multi-layer routing, high-speed differential pairs, and SMD soldering techniques.",
    imageUrl: "/images/workshop.jpeg",
    tagColor: "#FFC93C",
  },
  {
    id: "update-irc-deployment",
    title: "Tarush Field Trials for IRC 2025",
    date: "December 2024 - January 2025",
    location: "Analog Quarry Terrain",
    category: "FIELD TESTING",
    description:
      "Rigorous pre-competition trial runs verifying 6-wheel rocker-bogie obstacle navigation, 5.8 GHz link budget over 1.2km, and robotic arm inverse kinematics under harsh dust conditions.",
    imageUrl: "/images/clg_gp.jpg",
    tagColor: "#E2552B",
  },
];
