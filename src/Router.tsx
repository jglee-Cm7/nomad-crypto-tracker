import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./Routes/404";
import Chart from "./Routes/Chart";
import Coin from "./Routes/Coin";
import Coins from "./Routes/Coins";
import Price from "./Routes/Price";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:coinId" element={<Coin />}>
          <Route path="price" element={<Price />} />
          <Route path="chart" element={<Chart />} />
        </Route>
        <Route path="/" element={<Coins />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
