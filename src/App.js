import LoginPage from "./component/loginPage";
import TodoList from "./component/todoList";
import BonusView from "./component/bonus";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<LoginPage />} />
      <Route exact path="/todo" element={<TodoList />} />
      <Route exact path="/bonus" element={<BonusView />} />
    </Routes>
  );
}

export default App;
