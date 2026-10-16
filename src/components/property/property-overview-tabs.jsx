"use client";

import { useRef, useState } from "react";
import { Building2, Calculator, Info } from "lucide-react";
import { POSSESSION_LABEL } from "@/data/constants";
import { formatPrice, formatPriceFull } from "@/lib/format";
import { PropertyDetails } from "./property-details";

const TABS = [
  { id: "details", label: "Property details", Icon: Building2 },
  { id: "payment", label: "Payment plan", Icon: Calculator },
];

const formatAmount = (amount, currency) => formatPriceFull(amount, currency);

function monthlyRepayment(principal, annualRate, termMonths) {
  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) return principal / termMonths;
  const growth = (1 + monthlyRate) ** termMonths;
  return (principal * monthlyRate * growth) / (growth - 1);
}

function PaymentPlan({ property }) {
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [termYears, setTermYears] = useState(20);
  const [annualRate, setAnnualRate] = useState("");
  const downPayment = (property.price * downPaymentPercent) / 100;
  const loanAmount = property.price - downPayment;
  const monthlyPrincipal = Math.round(loanAmount / (termYears * 12));
  const rateValue = annualRate === "" ? null : Number(annualRate);
  const monthlyPayment =
    rateValue === null
      ? monthlyPrincipal
      : Math.round(monthlyRepayment(loanAmount, rateValue, termYears * 12));

  if (property.purpose !== "sale") {
    return (
      <div className="rounded-lg border border-line bg-white p-5 sm:p-6">
        <h2 className="text-xl font-semibold">Rental payment information</h2>
        <p className="mt-3 text-sm leading-6 text-muted">
          The listed rent is{" "}
          <span className="font-semibold text-ink">
            {formatPrice(property.price, property.currency, property.purpose)}
          </span>
          . Deposit amount and rent payment frequency are not specified in this
          listing. Contact the listing agent to confirm the terms.
        </p>
        <a
          href="#contact"
          className="mt-4 hidden min-h-11 items-center rounded-md bg-emerald px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 lg:inline-flex"
        >
          Ask about rental terms
        </a>
        <a
          href="#enquiry-mobile"
          className="mt-4 inline-flex min-h-11 items-center rounded-md bg-emerald px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 lg:hidden"
        >
          Ask about rental terms
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold">Payment plan estimate</h2>
        <p className="mt-1 text-sm text-muted">
          Based on this listing’s asking price of{" "}
          <span className="font-semibold text-ink">
            {formatPrice(property.price, property.currency)}
          </span>
          .
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-line bg-white p-4">
          <label
            htmlFor="payment-down-payment"
            className="block text-sm font-medium"
          >
            Down payment
          </label>
          <div className="mt-3 flex items-center gap-3">
            <input
              id="payment-down-payment"
              type="range"
              min="10"
              max="80"
              step="5"
              value={downPaymentPercent}
              onChange={(event) =>
                setDownPaymentPercent(Number(event.target.value))
              }
              className="min-w-0 flex-1 accent-emerald"
            />
            <span className="w-12 text-right text-sm font-semibold">
              {downPaymentPercent}%
            </span>
          </div>
          <p className="mt-2 text-sm text-muted">
            {formatAmount(downPayment, property.currency)}
          </p>
        </div>

        <div className="rounded-lg border border-line bg-white p-4">
          <label
            htmlFor="payment-term"
            className="block text-sm font-medium"
          >
            Repayment period
          </label>
          <select
            id="payment-term"
            value={termYears}
            onChange={(event) => setTermYears(Number(event.target.value))}
            className="field mt-3"
          >
            {[5, 10, 15, 20, 25, 30].map((years) => (
              <option key={years} value={years}>
                {years} years
              </option>
            ))}
          </select>
          <p className="mt-2 text-sm text-muted">
            Estimated loan: {formatAmount(loanAmount, property.currency)}
          </p>
        </div>

        <div className="rounded-lg border border-line bg-white p-4">
          <label
            htmlFor="payment-interest-rate"
            className="block text-sm font-medium"
          >
            Annual interest rate
          </label>
          <div className="relative mt-3">
            <input
              id="payment-interest-rate"
              type="number"
              min="0"
              max="30"
              step="0.1"
              inputMode="decimal"
              placeholder="Enter lender rate"
              value={annualRate}
              onChange={(event) => {
                const value = event.target.value;
                if (
                  value === "" ||
                  (Number(value) >= 0 && Number(value) <= 30)
                ) {
                  setAnnualRate(value);
                }
              }}
              aria-describedby="payment-interest-help"
              className="field pr-8"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted"
            >
              %
            </span>
          </div>
          <p id="payment-interest-help" className="mt-2 text-sm text-muted">
            Use the rate quoted by your lender.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-lg bg-sand p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium">
            {rateValue === null
              ? "Monthly principal (excluding interest)"
              : "Estimated monthly loan payment"}
          </p>
          <p className="mt-1 text-2xl font-semibold tracking-tight">
            {formatAmount(monthlyPayment, property.currency)}
            <span className="ml-1 text-sm font-normal text-muted">/ month</span>
          </p>
        </div>
        <p className="text-sm text-muted">
          Possession:{" "}
          <span className="font-medium text-ink">
            {POSSESSION_LABEL[property.possession] ?? "Not specified"}
          </span>
        </p>
      </div>

      <p className="flex gap-2 text-sm leading-6 text-muted">
        <Info
          className="mt-0.5 h-4 w-4 shrink-0 text-emerald"
          aria-hidden="true"
        />
        <span>
          This is an estimate based on the listed price and your selected
          assumptions, not a confirmed developer payment schedule or loan
          offer. The monthly amount excludes taxes and fees; unless you enter
          an interest rate, it also excludes interest. Confirm the final terms
          with the listing agent and your lender.
        </span>
      </p>
    </div>
  );
}

export function PropertyOverviewTabs({ rows, property }) {
  const [activeTab, setActiveTab] = useState("details");
  const tabRefs = useRef([]);

  function handleTabKeyDown(event, currentIndex) {
    let nextIndex;
    if (event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % TABS.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (currentIndex + TABS.length - 1) % TABS.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = TABS.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    setActiveTab(TABS[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Property information"
        className="mb-5 flex border-b border-line"
      >
        {TABS.map(({ id, label, Icon }, index) => (
          <button
            key={id}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            id={`property-tab-${id}`}
            type="button"
            role="tab"
            aria-selected={activeTab === id}
            aria-controls={`property-panel-${id}`}
            tabIndex={activeTab === id ? 0 : -1}
            onClick={() => setActiveTab(id)}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
            className={`-mb-px inline-flex min-h-12 items-center gap-2 border-b-2 px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald ${
              activeTab === id
                ? "border-emerald text-emerald"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>

      <div
        id="property-panel-details"
        role="tabpanel"
        aria-labelledby="property-tab-details"
        hidden={activeTab !== "details"}
        tabIndex={0}
      >
        <PropertyDetails rows={rows} />
      </div>
      <div
        id="property-panel-payment"
        role="tabpanel"
        aria-labelledby="property-tab-payment"
        hidden={activeTab !== "payment"}
        tabIndex={0}
      >
        <PaymentPlan property={property} />
      </div>
    </div>
  );
}
