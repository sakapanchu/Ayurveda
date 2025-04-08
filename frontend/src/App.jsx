import { Outlet } from "react-router-dom";

import Navigation from "./pages/Auth/Navigation";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatBox from "./components/ChatBox";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const App = () => {
  return (
    <PayPalScriptProvider options={{ "client-id": "your-client-id-here" }}>
      <>
        <ToastContainer />
        <Navigation />

        <main className="py-3">
          <Outlet />
        </main>
        <ChatBox />
      </>
    </PayPalScriptProvider>
  );
};

export default App;
