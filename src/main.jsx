import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { TeamProvider } from "../providers/TeamsProvider.jsx";
import StartModal from "./components/StartModal.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <TeamProvider>
    <StartModal />
    <App />
  </TeamProvider>
);
