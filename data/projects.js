export const projects = [
  {
    id: "flight-pricing",
    domain: "Aviation & Travel",
    title: "Flight Pricing Analysis",
    problem: "High variance in ticket pricing leading to unpredictable revenue forecasting and sub-optimal inventory yield.",
    data: "300,000+ historical flight records including source, destination, duration, stops, airline, and fare.",
    method: "Exploratory Data Analysis (EDA), Correlation Analysis, Feature Engineering.",
    insight: "Prices consistently increase by ~20% for flights with 1 or more stops compared to direct flights. Duration exhibits a moderate positive correlation (r ≈ 0.65) with ticket fare.",
    decision: "Implement a dynamic pricing model penalizing long layovers but capturing a premium for direct route convenience.",
    impact: "Expected 12% increase in yield per seat on direct routes."
  },
  {
    id: "ecommerce-pricing",
    domain: "Retail E-commerce",
    title: "E-commerce Pricing Strategy",
    problem: "Discounting strategies were cannibalizing profit margins without driving sufficient volume to offset the loss.",
    data: "100K+ transaction records, product categories, discount percentages, and final revenue numbers.",
    method: "Price Elasticity Analysis, Profit Margin Optimization Modelling.",
    insight: "Discounts greater than 15% in electronics drove volume but destroyed margin, whereas fashion items sustained margin up to 25% discounts.",
    decision: "Cap electronics discounting at 12% and redeploy promotional budget to fashion lines.",
    impact: "Projected 8% lift in overall blended gross margin."
  },
  {
    id: "gym-performance",
    domain: "Health & Fitness",
    title: "Gym Performance & Efficiency",
    problem: "Low member retention rates and suboptimal class scheduling leading to underutilized peak hours.",
    data: "Attendance logs, class schedules, member demographics, and engagement scores over 12 months.",
    method: "Cohort Analysis, Time-Series Forecasting of traffic.",
    insight: "Peak utilization hits a hard bottleneck between 5 PM and 7 PM, but retention drops for members who only attend during these hours due to crowding.",
    decision: "Reallocate top-tier equipment to secondary zones and introduce 'off-peak' incentive memberships.",
    impact: "Estimated 15% reduction in peak churn and better asset utilization."
  },
  {
    id: "decathlon-retail",
    domain: "Retail Operations",
    title: "Decathlon Retail Analysis",
    problem: "Inventory stockouts on high-velocity items and overstock on seasonal items resulting in capital lockup.",
    data: "Store-level sales data, inventory turnover ratios, and regional footfall metrics.",
    method: "Inventory Turnover Analysis, Demand Forecasting.",
    insight: "Top 20% of SKUs (Pareto principle) drove 75% of revenue but experienced stockouts 10% of the time.",
    decision: "Shift to a Just-In-Time (JIT) replenishment model for top decile SKUs supported by weekly micro-deliveries.",
    impact: "Projected 20% reduction in working capital requirements with near-zero stockouts for top items."
  }
];
