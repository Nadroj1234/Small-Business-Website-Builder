import { Link, useNavigate } from "react-router-dom";
import { usePlan } from "../plans/usePlan";
import { PLAN_ORDER, getPlanById } from "../plans/plans";

const plans = PLAN_ORDER.map((planId) => getPlanById(planId));

function PricingCard({ plan, isCurrent, onPreviewPlan, previewEnabled }) {
  return (
    <article
      style={{
        background: plan.featured
          ? "linear-gradient(180deg, #0f172a 0%, #172554 100%)"
          : "rgba(255, 255, 255, 0.86)",
        color: plan.featured ? "white" : "#0f172a",
        borderRadius: "28px",
        padding: "2rem",
        border: isCurrent
          ? `2px solid ${plan.accent}`
          : plan.featured
            ? `2px solid ${plan.accent}`
            : "1px solid rgba(148, 163, 184, 0.24)",
        boxShadow: plan.featured
          ? "0 30px 80px rgba(15, 23, 42, 0.28)"
          : "0 24px 60px rgba(15, 23, 42, 0.08)",
        backdropFilter: "blur(10px)",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        position: "relative",
        overflow: "hidden",
        transform: plan.featured ? "translateY(-8px)" : "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "auto -40px -60px auto",
          width: "180px",
          height: "180px",
          borderRadius: "999px",
          background: plan.featured
            ? "rgba(96, 165, 250, 0.14)"
            : "rgba(59, 130, 246, 0.06)",
          filter: "blur(4px)",
        }}
      />

      <div>
        {plan.featured && (
          <span
            style={{
              display: "inline-block",
              marginBottom: "0.9rem",
              padding: "0.35rem 0.7rem",
              borderRadius: "999px",
              background: "rgba(255, 255, 255, 0.14)",
              fontSize: "0.78rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Most Popular
          </span>
        )}

        {isCurrent && (
          <span
            style={{
              display: "inline-block",
              marginLeft: plan.featured ? "0.6rem" : 0,
              marginBottom: "0.9rem",
              padding: "0.35rem 0.7rem",
              borderRadius: "999px",
              background: plan.featured ? "rgba(255,255,255,0.18)" : "#dbeafe",
              color: plan.featured ? "white" : "#1d4ed8",
              fontSize: "0.78rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Previewing Now
          </span>
        )}

        <h2
          style={{
            margin: 0,
            color: plan.featured ? "white" : "#0f172a",
            fontSize: "1.7rem",
            position: "relative",
          }}
        >
          {plan.name}
        </h2>
        <p
          style={{
            marginTop: "0.75rem",
            lineHeight: 1.7,
            color: plan.featured ? "rgba(255,255,255,0.82)" : "#475569",
            position: "relative",
          }}
        >
          {plan.description}
        </p>
      </div>

      <div>
        <span style={{ fontSize: "3.1rem", fontWeight: 800 }}>
          {plan.price}
        </span>
        <span
          style={{
            marginLeft: "0.3rem",
            color: plan.featured ? "rgba(255,255,255,0.8)" : "#64748b",
          }}
        >
          {plan.frequency}
        </span>
      </div>

      <div style={{ display: "grid", gap: "0.75rem" }}>
        {previewEnabled && (
          <button
            type="button"
            onClick={() => onPreviewPlan(plan.id)}
            style={{
              width: "100%",
              padding: "0.95rem 1.2rem",
              borderRadius: "999px",
              border: "none",
              background: plan.featured
                ? "linear-gradient(135deg, #3b82f6, #2563eb)"
                : "#0f172a",
              color: "white",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: plan.featured
                ? "0 18px 35px rgba(37, 99, 235, 0.35)"
                : "0 12px 30px rgba(15, 23, 42, 0.18)",
            }}
          >
            Preview {plan.name}
          </button>
        )}

        <Link to="/builder" style={{ textDecoration: "none" }}>
          <button
            style={{
              width: "100%",
              padding: "0.95rem 1.2rem",
              borderRadius: "999px",
              border: plan.featured ? "1px solid rgba(255,255,255,0.22)" : `1px solid ${plan.accent}`,
              background: "transparent",
              color: plan.featured ? "white" : plan.accent,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Open Builder
          </button>
        </Link>
      </div>

      <div style={{ display: "grid", gap: "0.75rem", marginTop: "0.5rem" }}>
        {plan.featureList.map((feature) => (
          <div
            key={feature}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.7rem",
              lineHeight: 1.6,
              color: plan.featured ? "rgba(255,255,255,0.92)" : "#334155",
              position: "relative",
            }}
          >
            <span
              style={{
                width: "0.7rem",
                height: "0.7rem",
                borderRadius: "999px",
                background: plan.featured ? "#93c5fd" : plan.accent,
                marginTop: "0.45rem",
                flexShrink: 0,
              }}
            />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

export default function Pricing() {
  const navigate = useNavigate();
  const { currentPlan, setPlanId, adminPreviewEnabled } = usePlan();

  const previewPlan = (planId) => {
    setPlanId(planId);
  };

  return (
    <main
      style={{
        padding: "2rem",
        background:
          "radial-gradient(circle at top left, rgba(59, 130, 246, 0.16), transparent 24%), radial-gradient(circle at top right, rgba(249, 115, 22, 0.14), transparent 22%), linear-gradient(180deg, #eff6ff 0%, #fff7ed 52%, #ffffff 100%)",
      }}
    >
      <section
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          textAlign: "left",
        }}
      >
        <div
          style={{
            marginBottom: "2.5rem",
            maxWidth: "860px",
            padding: "2.4rem",
            borderRadius: "30px",
            background: "rgba(255, 255, 255, 0.6)",
            border: "1px solid rgba(219, 234, 254, 0.9)",
            boxShadow: "0 22px 60px rgba(15, 23, 42, 0.08)",
            backdropFilter: "blur(8px)",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(2.5rem, 5vw, 4.25rem)",
              lineHeight: 1,
              color: "#1d4ed8",
              letterSpacing: "-0.04em",
            }}
          >
            Pricing
          </h1>
          <p
            style={{
              marginTop: "1rem",
              fontSize: "1.14rem",
              lineHeight: 1.85,
              color: "#475569",
              maxWidth: "44rem",
            }}
          >
            Start with a free plan to explore the builder, then upgrade when you
            need more websites, stronger branding control, and premium business
            features.
          </p>

          <div
            style={{
              marginTop: "1.5rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            {adminPreviewEnabled && (
              <>
                <span
                  style={{
                    padding: "0.45rem 0.85rem",
                    borderRadius: "999px",
                    background: "#dbeafe",
                    color: "#1d4ed8",
                    fontWeight: 700,
                  }}
                >
                  Preview mode: {currentPlan.name}
                </span>

                <button
                  type="button"
                  onClick={() => navigate("/builder")}
                  style={{
                    padding: "0.8rem 1.2rem",
                    borderRadius: "999px",
                    border: "none",
                    background: "#0f172a",
                    color: "white",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  View this plan in the builder
                </button>
              </>
            )}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.6rem",
            alignItems: "start",
          }}
        >
          {plans.map((plan) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              isCurrent={adminPreviewEnabled && currentPlan.id === plan.id}
              previewEnabled={adminPreviewEnabled}
              onPreviewPlan={adminPreviewEnabled ? previewPlan : () => {}}
            />
          ))}
        </div>

        <div
          style={{
            marginTop: "2rem",
            padding: "1.75rem",
            borderRadius: "26px",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.84), rgba(239,246,255,0.92))",
            border: "1px solid #dbeafe",
            boxShadow: "0 16px 40px rgba(15, 23, 42, 0.06)",
          }}
        >
          <h2 style={{ marginTop: 0, color: "#0062ff" }}>
            What is gated right now
          </h2>
          <p style={{ color: "#475569", lineHeight: 1.8 }}>
            Free keeps JAK branding on the site, limits template saves, and
            locks advanced editor fields and extra sections. Pro and Business
            unlock the advanced builder experience, while Business also enables
            the highest set of premium capabilities.
          </p>
        </div>
      </section>
    </main>
  );
}
