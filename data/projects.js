// data/projects.js
export const projectsData = [
  {
    id: "zomato-growth",
    title: "Zomato Growth Analysis",
    businessProblem: "Identifying core drivers for restaurant retention and predicting churn factors.",
    datasetContext: "2.4M transactions across 1.2K restaurant partners.",
    analyticalMethod: "Logistic Regression & Market Basket Analysis",
    keyInsight: "Restaurants enabling order tracking experienced 42% lower churn.",
    businessRecommendation: "Mandate real-time tracking integration for premium positioning to reduce 3-month churn.",
    caseStudyId: "zomato"
  },
  {
    id: "airline-pricing",
    title: "Dynamic Pricing Optimization",
    businessProblem: "Revenue leakage during off-peak flight bookings.",
    datasetContext: "450K historical flight booking records and competitive pricing data.",
    analyticalMethod: "Time Series Forecasting and Elasticity Modeling",
    keyInsight: "Booking volumes were highly elastic at the 14-day mark, dropping significantly when prices increased > 5%.",
    businessRecommendation: "Implement an algorithmic pacing model capped at 4.5% premium 14 days out.",
    caseStudyId: "airline"
  },
  {
    id: "customer-segmentation",
    title: "Retail Customer Segmentation",
    businessProblem: "Inefficient ad-spend on generic retention campaigns.",
    datasetContext: "Purchase history of 85,000 loyalty program members.",
    analyticalMethod: "K-Means Clustering & RFM Analysis",
    keyInsight: "Top 15% of customers drive 65% of revenue but receive the same automated discounting as low-value shoppers.",
    businessRecommendation: "Shift promotional budget exclusively to at-risk 'Champions' to maximize ROI.",
    caseStudyId: "retail"
  }
];
