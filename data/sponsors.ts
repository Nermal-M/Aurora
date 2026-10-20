export interface Sponsor {
  name: string;
  tier: "Gold" | "Silver" | "Bronze" | "Technical Partner";
  tierLabel: string;
  logo: string;
  description: string;
  websiteUrl?: string;
}

export const sponsorsData: Sponsor[] = [
  {
    name: "Altium",
    tier: "Bronze",
    tierLabel: "Bronze Sponsor",
    logo: "/images/altium.png",
    description: "Empowering Team Aurora with industry-grade Altium Designer PCB layout and high-speed simulation software suites.",
  },
  {
    name: "Ansys",
    tier: "Bronze",
    tierLabel: "Bronze Sponsor",
    logo: "/images/ansys.png",
    description: "Enabling finite element analysis (FEA) and computational fluid dynamics (CFD) for Tarush's lightweight chassis structural optimization.",
  },
  {
    name: "SolidWorks",
    tier: "Bronze",
    tierLabel: "Bronze Sponsor",
    logo: "/images/solidworks.png",
    description: "Providing 3D mechanical CAD modeling, kinematics simulation, and robotic manipulator tolerance analysis.",
  },
  {
    name: "Iva Technos",
    tier: "Bronze",
    tierLabel: "Bronze Sponsor",
    logo: "/images/iva.jpg",
    description: "Supporting aerospace component fabrication and high-precision CNC machining for rover drivetrain parts.",
  },
  {
    name: "VAR TECH",
    tier: "Bronze",
    tierLabel: "Bronze Sponsor",
    logo: "/images/vartech.png",
    description: "Equipping our lab with precision test instruments, oscilloscopes, and soldering rework stations.",
  },
];

export const sponsorshipTiers = [
  {
    tier: "Title Sponsor",
    amount: "₹2,50,000+",
    perks: ["Prominent logo on Tarush chassis & mast", "Featured on competition team jersey", "Full digital presence & event banners", "Campus recruitment access"],
  },
  {
    tier: "Gold Sponsor",
    amount: "₹1,00,000",
    perks: ["Logo on rover body & team apparel", "Social media campaign & website highlight", "Access to campus technical demo days"],
  },
  {
    tier: "Silver & Technical",
    amount: "₹50,000 / In-kind",
    perks: ["Logo on team website & documentation", "Dedicated showcase on sponsor marquee", "Product endorsement & case studies"],
  },
];
