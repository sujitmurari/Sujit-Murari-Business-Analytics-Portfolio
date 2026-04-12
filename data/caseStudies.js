export const caseStudies = [
  {
    id: "airline-pricing",
    title: "Aviation Dynamic Pricing Model",
    tabs: {
      problem: "The airline was suffering from diluted margins due to aggressive, static discounting rules applied blanketly across all routes during peak seasons. They needed a more dynamic approach that segmented customers by price elasticity.",
      data: "Utilized a 3-year historical dataset comprising 2.4 million PNR (Passenger Name Record) entries, merged with competitor API pricing and macro-economic factors.",
      analysis: "Developed a Price Elasticity Model using Python (Pandas/Scikit-Learn). Applied ARIMA for time-series forecasting to predict peak demand windows.",
      insights: "The segmentation model revealed a critical anomaly: corporate travelers booking within 48 hours of flight departure were receiving an automatic 15% system discount despite exhibiting near-zero price sensitivity.",
      recommendation: "Implement dynamic pricing floors for short-window bookings on designated corporate routes. Remove standard discount codes within the 48-hour window.",
      impact: "Decision: Rolled out dynamic floor pricing.\nImpact: Improved margins by 8% on business routes, directly recapturing $1.2M in annual revenue."
    }
  },
  {
    id: "vendor-logistics",
    title: "Vendor Onboarding & Logistics",
    tabs: {
      problem: "The platform experienced high early vendor churn. Anecdotal feedback suggested operational friction, but management lacked quantitative evidence to prioritize technical fixes.",
      data: "Analyzed 500,000 delivery logs, vendor onboarding timestamps, and compliance event streams over a 12-month period.",
      analysis: "Used SQL for data extraction and transformation. Conducted cohort analysis to map vendor lifecycle and identified drop-off points.",
      insights: "Correlation analysis showed that vendors utilizing untracked/manual delivery ledgers experienced a 42% higher churn rate within their first 30 days compared to API-integrated vendors.",
      recommendation: "Stop allowing manual ledger entries for high-volume vendors. Overhaul the onboarding flow to mandate real-time tracking API integration.",
      impact: "Decision: Mandated tracking API integration for new vendors and built an automated support flow.\nImpact: Reduced 30-day vendor churn by 25%."
    }
  }
];
