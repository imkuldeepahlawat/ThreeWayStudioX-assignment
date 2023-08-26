import "./App.css";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./redux/userReducer";
import TransporterDashboard from "./components/TransporterDashboard";
import ManufacturerDashboard from "./components/ManufacturerDashboard";
import CreateOrder from "./components/CreateOrder";

const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <div className="bg-[#0C1326] w-[100vw] h-[100vh]">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/manufacturerDashboard"
            element={<ManufacturerDashboard />}
          />
          <Route
            exact
            path="/transporterDashboard"
            element={<TransporterDashboard />}
          />
          <Route exact path="/createOrder" element={<CreateOrder />} />
        </Routes>
      </div>
    </Provider>
  );
};

export default App;
