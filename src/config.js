import LoginPage from "./component/loginPage";
import { Link, Route, Switch } from "react-router-dom";
const Config = () => {
  return (
    <>
      <Switch>
        <Route exact path="/login">
          <LoginPage />
        </Route>
      </Switch>
    </>
  );
};

export default Config;
