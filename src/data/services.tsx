export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export const services: Service[] = [
  {
    id: "strength",
    title: "Strength Training",
    description: "Build power and endurance with our expert-led strength sessions.",
    icon: "/icons/vector.svg",
  },
  {
    id: "cardio",
    title: "Cardio Classes",
    description: "High-energy cardio classes designed to boost heart health.",
    icon: "/icons/vector-2.svg",
  },
  {
    id: "nutrition",
    title: "Nutrition Coaching",
    description: "Personalized meal plans to help you meet your fitness goals.",
    icon: "/icons/vector-3.svg",
  },
];
