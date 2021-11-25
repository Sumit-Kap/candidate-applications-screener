import React from "react";
import Routes from "./routes";
import { Route, Routes as Router } from "react-router-dom";
// import Header from "./components/Header";
function App() {
  return (
    <React.Fragment>
      {/* <Header /> */}
      <Router>
        {Routes.map((item, index) => (
          <Route key={index} element={item.component} path={item.path} exact />
        ))}
      </Router>
    </React.Fragment>
  );
}

export default App;
