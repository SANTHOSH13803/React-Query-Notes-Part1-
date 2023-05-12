import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import RQDataFetching from "./components/RQDataFetching";
import NormalDataFetching from "./components/NormalDataFetching";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="rq-df" element={<RQDataFetching />} />
          <Route path="tr-df" element={<NormalDataFetching />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      {/* Initial is open prevents dev tools open as default  */}
    </QueryClientProvider>
  );
}

export default App;
