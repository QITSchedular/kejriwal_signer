import "devextreme/dist/css/dx.light.css";
import SignIn from "./Components/Forms/SignIn";
import { Routes, Route } from "react-router-dom";
import PdfForm from "./Components/Forms/SendToSign/PdfForm";
import PageContext from "./Context/PageContext";
import { useState } from "react";
import Loader from "./Components/Loader/Loader";
import Checkout from "./Layouts/Checkout/Checkout";
import SignUp from "./Layouts/Authentication/Signup";

function App() {
  const [token, setToken] = useState("");
  return (
    <div className="App">
      {/* <SignIn /> */}
      <PageContext.Provider value={{ token, setToken }}>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/sendpdf" element={<PdfForm />} />
          <Route path="/loader" element={<Loader />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </PageContext.Provider>
    </div>
  );
}

export default App;
