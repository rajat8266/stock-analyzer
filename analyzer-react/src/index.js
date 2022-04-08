import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Apps from "./App";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/stock/:ticker" element={<Apps />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<Apps />, document.getElementById("root"));