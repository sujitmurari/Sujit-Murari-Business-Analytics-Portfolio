// data/caseStudies.js
export const caseStudiesData = {
  "zomato": {
    tabs: {
      problem: "Zomato was losing mid-tier restaurant partners within their first 6 months. We needed to understand what behaviors or operational friction points drove this churn.",
      data: "The dataset consisted of 2.4M order records from 1.2K partners over a two-year period, covering delivery times, defect rates, customer ratings, and platform login frequency.",
      analysis: "Applied Logistic Regression to model churn likelihood. Used Feature Importance to rank variables. High variability in order preparation time emerged as a significant predictor.",
      insights: "Partners with an average prep-time variance > 12 minutes had a 3x higher probability of leaving the platform. Additionally, enabling real-time GPS tracking reduced order cancellations, improving partner retention by 42%.",
      recommendation: "Introduce an automated alert system for highly variable prep times to offer operational coaching, and mandate GPS tracking features to boost confidence and reduce cancellations."
    }
  },
  "airline": {
    tabs: {
      problem: "The carrier experienced significant revenue leakage during off-peak scheduling, failing to dynamically match competitor discounting.",
      data: "450K historical flight booking records, blended with API competitor pricing metrics over an 18-month period.",
      analysis: "Developed a Time Series Forecasting model integrated with a Price Elasticity matrix to understand demand thresholds at T-14 and T-7 days to departure.",
      insights: "Booking volume proved extremely elastic at the 14-day mark, dropping by 18% when fare premiums went above 5% compared to the daily median.",
      recommendation: "Deploy an algorithmic pacing cap at 4.5% maximum premium 14 days prior to departure, ensuring competitive parity and avoiding immediate volume drop-off."
    }
  },
  "retail": {
    tabs: {
      problem: "Marketing spend was misaligned, applying uniform 10% discount campaigns to the entire loyalty base regardless of historical value.",
      data: "85,000 distinct customer profiles containing 3 years of transaction history, mapped to demographic clusters and seasonal purchasing habits.",
      analysis: "Conducted RFM (Recency, Frequency, Monetary) analysis followed by K-Means Clustering to identify distinct behavioral segments.",
      insights: "The top 15% of frequent buyers ('Champions') commanded 65% of total revenue. However, 'At-Risk' mid-tier buyers showed the highest ROI when stimulated with targeted discounting.",
      recommendation: "Reallocate blanket promotional budgets: remove discounts for 'Champions' (who purchase regardless of price) and hyper-target the 'At-Risk' segment with aggressive limited-time offers."
    }
  }
};
