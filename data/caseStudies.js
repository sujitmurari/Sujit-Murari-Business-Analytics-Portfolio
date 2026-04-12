export const caseStudies = [
  {
    id: "airline",
    title: "Airline Pricing Optimization",
    tabs: [
      {
        name: "Problem",
        content: `
          <h3>The Business Problem</h3>
          <p class="text-grey mb-3">A major carrier was experiencing highly volatile yields on popular domestic routes. Manual pricing interventions were failing to capture willingness-to-pay (WTP) effectively, leading to either empty seats or sold-out flights well below market clearing prices.</p>
          <div class="card" style="background-color: var(--navy-bg);">
            <ul style="list-style-type: none; padding: 0;">
              <li style="margin-bottom: 0.5rem;"><strong class="text-white">Objective:</strong> Maximize Revenue per Available Seat Mile (RASM).</li>
              <li><strong class="text-white">Constraint:</strong> Maintain competitive load factors above 80%.</li>
            </ul>
          </div>
        `
      },
      {
        name: "Data",
        content: `
          <h3>Data Assets</h3>
          <p class="text-grey mb-3">Extracted over 300,000 historical PNR (Passenger Name Record) and pricing transactions representing 6 months of domestic travel data.</p>
          <table class="data-table mb-3">
            <tr><th>Feature</th><th>Type</th><th>Relevance</th></tr>
            <tr><td>Airline</td><td>Categorical</td><td>Carrier specific premium baseline</td></tr>
            <tr><td>Source/Destination</td><td>Categorical</td><td>Route popularity & demand density</td></tr>
            <tr><td>Duration</td><td>Numeric</td><td>Proxy for operational cost & flight length</td></tr>
            <tr><td>Total Stops</td><td>Numeric</td><td>Convenience penalty proxy</td></tr>
            <tr><td>Price</td><td>Target</td><td>Dependent variable for modeling</td></tr>
          </table>
        `
      },
      {
        name: "Analysis",
        content: `
          <h3>Analytical Approach</h3>
          <p class="text-grey mb-3">Conducted Exploratory Data Analysis (EDA) focused on identifying price discriminators.</p>
          <ul class="text-grey" style="padding-left: 1.5rem; margin-bottom: 1.5rem;">
            <li class="mb-1"><strong>Correlation Analysis:</strong> Mapped continuous variables against Price.</li>
            <li class="mb-1"><strong>Categorical Variance:</strong> Used ANOVA to confirm that 'Airline' and 'Stops' are statistically significant drivers of fare variance.</li>
            <li><strong>Feature Engineering:</strong> Created 'Time of Day' buckets and 'Advance Purchase Window' estimates.</li>
          </ul>
        `
      },
      {
        name: "Insights",
        content: `
          <h3>Key Insights</h3>
          <div class="insight-highlight mb-3">
            <strong>Insight 1: Stop Penalties versus Operating Costs.</strong> Counter-intuitively, prices consistently increased by ~20% for flights with 1 or more stops. While direct flights command a premium, the structural cost of operating multi-leg journeys forces a higher baseline floor.
          </div>
          <div class="insight-highlight mb-3">
            <strong>Insight 2: Duration Correlation.</strong> There is a moderate positive correlation (r &approx; 0.65) between flight duration and price, confirming distance-based pricing floors hold true despite dynamic pricing layers over the top.
          </div>
        `
      },
      {
        name: "Recommendation",
        content: `
          <h3>Strategic Recommendation</h3>
          <p class="text-grey mb-3">Restructure the yield management curves based on the stop-penalty insight.</p>
          <p class="text-grey mb-3">Instead of universally discounting multi-leg flights to capture budget travelers, algorithmically identify long-duration direct flights where the 'convenience premium' is currently under-priced against competitors' multi-leg options.</p>
        `
      },
      {
        name: "Business Impact",
        content: `
          <h3>Decision & Impact</h3>
          <div style="background-color: rgba(16, 185, 129, 0.1); border: 1px solid var(--success-green); padding: 1.5rem; border-radius: 8px;">
            <h4 style="color: var(--success-green); margin-bottom: 1rem;">Expected Outcomes</h4>
            <p class="text-white mb-2"><strong>Decision:</strong> Deploy dynamic pricing floors based on direct-flight scarcity within specific duration bands.</p>
            <p class="text-white" style="font-size: 1.25rem;"><strong>Impact: Projected 12% yield increase</strong> on direct route inventories without sacrificing the 80% load factor baseline.</p>
          </div>
        `
      }
    ]
  },
  {
    id: "ecommerce",
    title: "E-commerce Margin Optimization",
    tabs: [
      {
        name: "Problem",
        content: `
          <h3>The Business Problem</h3>
          <p class="text-grey mb-3">Heavy reliance on seasonal discounting led to a "race to the bottom". Overall gross merchandise value (GMV) was up, but net profit margins were eroding rapidly.</p>
          <div class="card" style="background-color: var(--navy-bg);">
            <strong class="text-white">Objective:</strong> Identify the point of diminishing returns for discount strategies and protect gross margins.
          </div>
        `
      },
      {
        name: "Data",
        content: `
          <h3>Data Assets</h3>
          <table class="data-table mb-3">
            <tr><th>Metric</th><th>Scope</th></tr>
            <tr><td>Transaction Logs</td><td>100,000+ orders across 6 categories</td></tr>
            <tr><td>Discount Depth</td><td>From 0% to 50% off MSRP</td></tr>
            <tr><td>Conversion Rates</td><td>By session depth and category</td></tr>
          </table>
        `
      },
      {
        name: "Analysis",
        content: `
          <h3>Analytical Approach</h3>
          <p class="text-grey mb-3">Modeled Price Elasticity of Demand across different product categories to determine where discounts drive volume versus where they simply give away margin.</p>
        `
      },
      {
        name: "Insights",
        content: `
          <h3>Key Insights</h3>
          <div class="insight-highlight mb-3">
            <strong>Inelastic Categories:</strong> Electronics volume did not scale linearly with discounts deeper than 12%. The discount destroyed margin faster than volume could replace the lost revenue.
          </div>
        `
      },
      {
        name: "Recommendation",
        content: `
          <h3>Strategic Recommendation</h3>
          <p class="text-grey">Cap structural discounts on electronics at 10-12% and redeploy promotional budgets towards high-margin fashion lines where consumer demand is highly elastic.</p>
        `
      },
      {
        name: "Business Impact",
        content: `
          <h3>Decision & Impact</h3>
          <div style="background-color: rgba(16, 185, 129, 0.1); border: 1px solid var(--success-green); padding: 1.5rem; border-radius: 8px;">
            <p class="text-white mb-2"><strong>Decision:</strong> Restructure pricing tier automation in the CMS based on category elasticity.</p>
            <p class="text-white" style="font-size: 1.25rem;"><strong>Impact: 8% lift in blended gross margin</strong> projected within the first active quarter.</p>
          </div>
        `
      }
    ]
  }
];
