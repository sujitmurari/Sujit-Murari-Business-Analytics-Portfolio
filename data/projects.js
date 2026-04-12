export const projects = [
  {
    id: "airline-pricing",
    title: "Dynamic Pricing Optimization",
    domain: "Aviation & Airline",
    problem: "Excessive discounting during peak seasons leading to diluted margins.",
    data: "3 Years of booking data, 2.4M records, competitor pricing APIs.",
    method: "Price Elasticity Modeling & Time-Series Forecasting (ARIMA).",
    insight: "Found that last-minute corporate travelers had near-zero price sensitivity, but were given 15% discounts.",
    decision: "Eliminated automatic discounts for bookings within 48 hours of departure.",
    impact: "Recaptured $1.2M in annual revenue margin."
  },
  {
    id: "vendor-logistics",
    title: "Logistics Optimization",
    domain: "Supply Chain",
    problem: "High early vendor churn due to operational bottlenecks.",
    data: "Vendor performance logs, 500K deliveries, compliance reports.",
    method: "Correlation Analysis & Process Mining.",
    insight: "Vendors with untracked deliveries experienced 42% higher churn within the first 30 days.",
    decision: "Mandate real-time tracking integration for all new vendors.",
    impact: "Reduced early vendor churn by 25% over 6 months."
  }
];
