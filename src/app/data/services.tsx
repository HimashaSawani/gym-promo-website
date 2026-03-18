export type Service = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  details: string;
};

export const services: Service[] = [
  {
    id: 1,
    slug: "personal-training",
    title: "Personal Training",
    summary: "One-on-one coaching tailored to your goals.",
    details:
      "Our certified trainers create personalized workouts, track your progress, and help you move safely and efficiently.",
  },
  {
    id: 2,
    slug: "group-classes",
    title: "Group Classes",
    summary: "High-energy classes for strength, cardio, and mobility.",
    details:
      "From HIIT to mobility sessions, our group classes keep training fun while improving performance and consistency.",
  },
  {
    id: 3,
    slug: "nutrition-coaching",
    title: "Nutrition Coaching",
    summary: "Build practical meal habits that support your training.",
    details:
      "Get expert nutrition guidance and realistic plans designed to match your lifestyle and fitness targets.",
  },
];
