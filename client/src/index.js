import ReactDOM from "react-dom/client";
import { MealContextProvider } from "./store/MealItemContext";
import AddressContextProvider from "./store/AddressContext";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MealContextProvider>
      <AddressContextProvider>
             <App />
      </AddressContextProvider>
  </MealContextProvider>
);
