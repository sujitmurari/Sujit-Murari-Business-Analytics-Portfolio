import re

filepath = 'case-study.html'
with open(filepath, 'r', encoding='utf-8') as f:
    html = f.read()

# Split the HTML at <main class="page-content"> and </main>
parts = re.split(r'(<main class="page-content">.*?</main>)', html, flags=re.DOTALL)

if len(parts) >= 3:
    header = parts[0]
    footer = parts[2]
    
    # We build the new main content
    new_main = """<main class="page-content">
  <section class="page-hero section" style="padding-bottom:0;">
    <div class="container">
      <div class="page-hero-path">Portfolio / PROJECTS &gt; CASE STUDY</div>
      <div class="section-header" data-reveal>
        <h1>ZOMATO <span class="text-cyan">GROWTH STRATEGY</span></h1>
      </div>
    </div>
  </section>

  <section class="section" style="padding-top:20px;">
    <div class="container">

      <!-- Report Header -->
      <div class="report-header-card" data-reveal>
        <div class="rh-badge"><div class="rh-badge-dot"></div> STRATEGY · FINANCIAL ANALYSIS</div>
        <div class="rh-title">Zomato Sacrifices Profits to Capture Market Share</div>
        <div class="rh-subtitle">India's Food Delivery Market Growth Mechanics</div>
        <div class="rh-meta">
          <div class="rh-meta-item"><span class="rh-meta-label">SOURCE</span><span class="rh-meta-value">Zomato Investor Reports</span></div>
          <div class="rh-meta-item"><span class="rh-meta-label">INDUSTRY</span><span class="rh-meta-value">FoodTech</span></div>
          <div class="rh-meta-item"><span class="rh-meta-label">KEY METRIC</span><span class="rh-meta-value">LTV &gt; CAC</span></div>
          <div class="rh-meta-item"><span class="rh-meta-label">PROMOTIONS</span><span class="rh-meta-value">₹396 Cr Spent</span></div>
        </div>
      </div>

      <div class="report-layout" style="grid-template-columns: 1fr;">

        <!-- Main report content -->
        <div style="max-width: 900px; margin: 0 auto;">

          <!-- ══ 01 CORE THESIS ══ -->
          <div class="report-section" id="sec-problem" data-reveal>
            <div class="rs-label">01 // THE STRATEGY</div>
            <div class="rs-title">Discounts, CAC & Repeat Orders Drive Growth</div>
            <div class="rs-body">
              <p style="margin-bottom:16px;">Zomato operates in the hyper-competitive Indian food delivery market. Its primary strategy involves <strong>intentionally sacrificing short-term profitability</strong> to aggressively capture market share, build user habits, and achieve economies of scale.</p>
              
              <div class="insight-card">
                <div class="ic-label">CORE PHILOSOPHY</div>
                <div class="ic-text"><strong>Scale First. Profit Later.</strong> First orders are often entirely loss-making in order to drastically reduce Customer Acquisition Cost (CAC) and onboard users to the platform.</div>
              </div>
            </div>
          </div>

          <!-- ══ 02 FINANCIAL MECHANICS ══ -->
          <div class="report-section" id="sec-fin" data-reveal>
            <div class="rs-title">The Master Equation: LTV &gt; CAC</div>
            <div class="rs-body" style="margin-bottom:16px;">
              By spending heavily on promotions (e.g., spending <strong>₹396 Cr</strong> across a financial reporting period), Zomato brings millions of active users into its ecosystem.
            </div>

            <div class="eda-grid">
              <div class="eda-stat">
                <div class="eda-stat-label">CUSTOMER ACQUISITION</div>
                <div class="eda-stat-val">Loss-Making</div>
                <div class="eda-stat-desc">Heavy discounts applied to first orders to break entry barriers.</div>
              </div>
              <div class="eda-stat" style="border-color: rgba(155,92,255,0.4);">
                <div class="eda-stat-label">LIFETIME VALUE (LTV)</div>
                <div class="eda-stat-val">Highly Profitable</div>
                <div class="eda-stat-desc">Repeat orders over years generate massive compounding revenue.</div>
              </div>
            </div>
            
            <p style="margin-top:16px;" class="rs-body">As long as the <strong>Lifetime Value (LTV)</strong> of an acquired user is greater than the <strong>Customer Acquisition Cost (CAC)</strong>, spending ₹396 Cr on promotions is not a business loss—it is a hyper-growth investment.</p>
          </div>

          <!-- ══ 03 REVENUE MODEL ══ -->
          <div class="report-section" id="sec-model" data-reveal>
            <div class="rs-title">Three Core Pillars of Revenue</div>
            <div class="rs-body" style="margin-bottom:16px;">
              Once a user is acquired and habitually ordering, Zomato generates cash flow across three primary streams:
            </div>

            <div class="step-list">
              <div class="step-row">
                <span class="step-num">01</span>
                <div class="step-text">
                  <strong>18–25% Commission from Restaurants:</strong> Zomato takes a significant cut of every successful order from the restaurant partner, shifting the marketing burden away from restaurants onto the platform.
                </div>
              </div>
              <div class="step-row">
                <span class="step-num">02</span>
                <div class="step-text">
                  <strong>Delivery Fees:</strong> Charged directly to the consumer to offset the logistical costs of maintaining a massive fleet of delivery partners.
                </div>
              </div>
              <div class="step-row">
                <span class="step-num">03</span>
                <div class="step-text">
                  <strong>Platform Charges:</strong> Incremental convenience fees added to the cart, serving as pure high-margin profit lines.
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</main>"""

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(header + new_main + footer)
    print("Done")
else:
    print("Failed to parsed main tag")
