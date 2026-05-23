export const PLAN_DEFINITIONS = {
  free: {
    id: "free",
    name: "Free",
    price: "$0",
    frequency: "/mo",
    description: "A simple way to try the builder and launch your first draft.",
    accent: "#94a3b8",
    featured: false,
    limits: {
      templates: 3,
      websites: 1,
    },
    features: {
      advancedBuilder: false,
      advancedSections: false,
      removeBranding: false,
      customDomain: false,
      analytics: false,
      premiumTemplates: false,
      teamAccess: false,
    },
    featureList: [
      "1 website",
      "Up to 3 saved templates",
      "Basic text and color editing",
      "Google sign-in",
      "JAK branding on site",
      "Subdomain-only publishing later",
    ],
  },
  pro: {
    id: "pro",
    name: "Pro",
    price: "$24",
    frequency: "/mo",
    description: "Best for most small businesses that need a polished public site.",
    accent: "#1d4ed8",
    featured: true,
    limits: {
      templates: Infinity,
      websites: 5,
    },
    features: {
      advancedBuilder: true,
      advancedSections: true,
      removeBranding: true,
      customDomain: true,
      analytics: true,
      premiumTemplates: false,
      teamAccess: false,
    },
    featureList: [
      "Up to 5 websites",
      "Unlimited saved templates",
      "Advanced builder sections",
      "Custom domain support",
      "Remove JAK branding",
      "Basic traffic and lead analytics",
    ],
  },
  business: {
    id: "business",
    name: "Business",
    price: "$59",
    frequency: "/mo",
    description: "For operators managing multiple brands or client projects.",
    accent: "#ea580c",
    featured: false,
    limits: {
      templates: Infinity,
      websites: 25,
    },
    features: {
      advancedBuilder: true,
      advancedSections: true,
      removeBranding: true,
      customDomain: true,
      analytics: true,
      premiumTemplates: true,
      teamAccess: true,
    },
    featureList: [
      "Up to 25 websites",
      "Premium template library",
      "Team access",
      "Priority support",
      "Advanced analytics",
      "Client-ready handoff tools",
    ],
  },
};

export const PLAN_ORDER = ["free", "pro", "business"];

export function getPlanById(planId) {
  return PLAN_DEFINITIONS[planId] ?? PLAN_DEFINITIONS.free;
}
