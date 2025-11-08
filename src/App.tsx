import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/anime/:id" element={<DetailPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
