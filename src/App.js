import "./App.css";
import Feed from "./pages/Feed";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/@:userName' element={<UserProfile></UserProfile>}></Route>
        <Route path='/' element={<Feed></Feed>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
