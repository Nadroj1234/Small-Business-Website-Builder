import { useState } from "react";
import { useAuth } from "../auth/useAuth";
import { getPlanById } from "./plans";
import { PlanContext } from "./PlanContext";

const STORAGE_KEY = "jak-selected-plan";

export function PlanProvider({ children }) {
  const { isAdminUser } = useAuth();
  const adminPreviewEnabled = isAdminUser;

  const [planId, setPlanId] = useState(() => {
    if (typeof window === "undefined") {
      return "free";
    }

    return window.localStorage.getItem(STORAGE_KEY) ?? "free";
  });

  const changePlan = (nextPlanId) => {
    if (!adminPreviewEnabled) {
      return;
    }

    const safePlan = getPlanById(nextPlanId).id;
    setPlanId(safePlan);
    window.localStorage.setItem(STORAGE_KEY, safePlan);
  };

  const value = {
    planId: adminPreviewEnabled ? planId : "free",
    currentPlan: getPlanById(adminPreviewEnabled ? planId : "free"),
    adminPreviewEnabled,
    setPlanId: changePlan,
  };

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}
