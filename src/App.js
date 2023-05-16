import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import RQDataFetching from "./components/RQDataFetching";
import NormalDataFetching from "./components/NormalDataFetching";
import RQSuperHero from "./components/RQSuperHero";
import QueryByID from "./components/QueryByID";
import ParallelQueries from "./components/ParallelQueries";
import DynamicParallelpage from "./components/DynamicParallel.page";
import DependentQuery from "./components/DependentQuery";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/rq-super-heros/:heroId" element={<RQSuperHero />} />
          <Route path="rq-df" element={<RQDataFetching />} />
          <Route path="rq-query-by-id" element={<QueryByID />} />
          <Route path="tr-df" element={<NormalDataFetching />} />
          <Route path="parallel-queries" element={<ParallelQueries />} />
          <Route
            path="dynamic-parallel-queries"
            element={<DynamicParallelpage heroIDs={[1, 3]} />}
          />
          {/* to access above page use =>  http://localhost:3000/dynamic-parallel-queries */}
          <Route
            path="dependent-query"
            element={<DependentQuery email="santhosh@example.com" />}
          />
          {/* to access above page use =>  http://localhost:3000/dependent-query */}
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      {/* Initial is open prevents dev tools open as default  */}
    </QueryClientProvider>
  );
}

export default App;
