import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./Components/Main";
import Tasks from "./Components/Tasks";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import Counterpage from "./Components/Counterpage";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/counter" element={<Counterpage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
