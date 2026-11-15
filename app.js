const PREVIEW_SAMPLES = {
  sow: `SECTION 6 — CLIENT RESPONSIBILITIES & THE "STALLED PROJECT" CLAUSE

6.2 Project Pause / Dormancy: If Client delays feedback, required assets, or milestone approvals by more than ten (10) business days, Provider may place the project on Inactive Hold and reallocate schedule capacity to other active clients.

6.3 Restart Fee & Kill Protection: Resuming a project from Inactive Hold is subject to Provider's next open production window and a $350 Context-Reload & Rescheduling Fee. If a project remains stalled due to Client inaction for thirty (30) calendar days, Provider may invoice in full for all completed milestones (minimum 50% of remaining contract value) and close this SOW.

[+ Full 9-Section Plain-English SOW, IP-on-Final-Payment Clause & Change-Order Form inside the Vault]`,

  script: `SCRIPT #1 — THE POLITE SCOPE-CREEP PIVOT ("YES, AND HERE'S THE PRICE")

Subject: Re: [Project Name] — Quick note on [Requested Addition]

Hi [Name],

Great idea — adding [Requested Addition] makes total sense for [Client Goal].

Since that sits outside our current SOW deliverables (keeping us locked on launching v1 by [Launch Date]), we have two clean ways to handle it:

1. Add it now via Change Order: I can build and QA [Requested Addition] for $[Fee], adding +[X] business days to our timeline.
2. Phase 2 Backlog: Keep our current launch date and budget untouched, ship v1 on [Launch Date], and tackle this right after launch.

Which works best for your timeline?

[+ 14 more scripts for Discount Pushback, Ghosted Proposals, 3-Stage Late Invoices & Retainer Pitches]`,

  suite: `INCLUDED SOFTWARE: SCOPESHIELD PRO OFFLINE SUITE (.HTML + PERT SPREADSHEET)

• 100% Private, Zero-Subscription Browser App (runs offline on Mac, Windows & Linux)
• 3-Tier Price Anchoring Engine: Auto-calculates Option 1 (Core), Option 2 (Growth - Recommended), and Option 3 (Complete Turnkey) + exports clean Client Proposal PDFs
• 60-Second Change-Order PDF & Slack/Email Reply Generator
• Interactive Discovery Call Red-Flag Detector (scores toxic client risk before you quote)
• PERT-Weighted Margin Estimator Spreadsheet (.CSV for Google Sheets & Excel)`
};

function fmtUSD(n) {
  return '$' + Math.round(n).toLocaleString('en-US');
}

function calculateFreeTool() {
  const income = +document.getElementById('fIncome').value || 0;
  const overhead = +document.getElementById('fOverhead').value || 0;
  const taxPct = Math.min(65, Math.max(0, +document.getElementById('fTax').value || 0)) / 100;
  const billable = Math.max(1, +document.getElementById('fHours').value || 22);
  const weeks = Math.max(1, +document.getElementById('fWeeks').value || 46);
  const projHours = Math.max(1, +document.getElementById('fProjHours').value || 35);

  const annualHours = billable * weeks;
  const grossRequired = (income / (1 - taxPct)) + overhead;
  const breakEvenHourly = grossRequired / annualHours;
  const recommendedHourly = breakEvenHourly / 0.8; // 20% studio margin

  const unbufferedQuote = projHours * recommendedHourly;
  const bufferedQuote = Math.round((unbufferedQuote * 1.22) / 10) * 10; // 22% scope/revision armor
  const scopeLeakLoss = bufferedQuote - Math.round(unbufferedQuote);

  document.getElementById('resMinRate').textContent = fmtUSD(breakEvenHourly) + '/hr';
  document.getElementById('resTargetRate').textContent = fmtUSD(recommendedHourly) + '/hr';
  document.getElementById('resProjectQuote').textContent = fmtUSD(bufferedQuote);
  document.getElementById('resDeposit').textContent = fmtUSD(bufferedQuote * 0.5);
  document.getElementById('resLeakAmount').textContent = fmtUSD(scopeLeakLoss);
}

function selectPreview(key, btn) {
  document.querySelectorAll('.ptab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('previewContent').textContent = PREVIEW_SAMPLES[key];
}

function printFreeEstimate() {
  const quote = document.getElementById('resProjectQuote').textContent;
  const deposit = document.getElementById('resDeposit').textContent;
  const hrs = document.getElementById('fProjHours').value;
  const rate = document.getElementById('resTargetRate').textContent;
  const today = new Date().toISOString().slice(0, 10);

  document.getElementById('printQuoteSheet').innerHTML = `
    <h1 style="font-size:1.75rem;margin-bottom:0.35rem;">Project Scope Estimate</h1>
    <p style="color:#475569;margin-bottom:1.5rem;">Generated on ${today} via ScopeShield</p>
    <table style="width:100%;border-collapse:collapse;margin-bottom:1.5rem;">
      <tr style="border-bottom:1px solid #cbd5e1;"><th style="text-align:left;padding:0.6rem 0;">Estimated Effort</th><td>${hrs} Scoped Hours (includes 22% revision & QA buffer)</td></tr>
      <tr style="border-bottom:1px solid #cbd5e1;"><th style="text-align:left;padding:0.6rem 0;">Effective Studio Rate</th><td>${rate}</td></tr>
      <tr style="border-bottom:1px solid #cbd5e1;"><th style="text-align:left;padding:0.6rem 0;">Total Fixed Estimate</th><td><strong>${quote} USD</strong></td></tr>
      <tr style="border-bottom:1px solid #cbd5e1;"><th style="text-align:left;padding:0.6rem 0;">50% Kickoff Deposit</th><td><strong>${deposit} USD</strong> due upon SOW signing</td></tr>
    </table>
    <p style="font-size:0.85rem;color:#475569;">Note: Estimate valid for 10 calendar days. Subject to formal Statement of Work (SOW) & 2 consolidated revision rounds.</p>
  `;
  window.print();
}

function triggerCheckout() {
  const cfg = window.SCOPESHIELD_CONFIG || {};
  const url = (cfg.CHECKOUT_URL || '').trim();
  if (!url || url.includes('PASTE_YOUR_')) {
    document.getElementById('setupModal').classList.add('open');
    return;
  }
  window.open(url, '_blank', 'noopener');
}

function closeModal() {
  document.getElementById('setupModal').classList.remove('open');
}

document.addEventListener('DOMContentLoaded', () => {
  const cfg = window.SCOPESHIELD_CONFIG || {};
  document.querySelectorAll('.js-price-now').forEach(el => {
    if (cfg.LAUNCH_PRICE) el.textContent = cfg.LAUNCH_PRICE;
  });
  document.querySelectorAll('.js-price-old').forEach(el => {
    if (cfg.REGULAR_PRICE) el.textContent = cfg.REGULAR_PRICE;
  });
  document.getElementById('previewContent').textContent = PREVIEW_SAMPLES.sow;
  calculateFreeTool();
});
