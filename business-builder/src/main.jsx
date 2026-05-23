import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import { PlanProvider } from "./plans/PlanProvider";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <PlanProvider>
        <App />
      </PlanProvider>
    </AuthProvider>
  </BrowserRouter>,
);
