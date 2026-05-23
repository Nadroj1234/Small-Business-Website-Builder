import { useContext } from "react";
import { PlanContext } from "./PlanContext";

export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used within PlanProvider");
  }

  return context;
}
