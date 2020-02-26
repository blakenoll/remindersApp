import React from "react";
import Layout from "./components/layout";
import IndexPage from "./pages/index";
import CallBackPage from "./pages/callBack";
import CreateReminderPage from "./pages/createReminder";
import { GlobalStateProvider } from "./utils/globalState";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Amplify.configure(awsconfig);

function App() {
  return (
    <GlobalStateProvider>
      <Layout>
        <Router>
          <Switch>
            <Route path="/callback">
              <CallBackPage />
            </Route>
            <Route path="/create">
              <CreateReminderPage />
            </Route>
            <Route
              path="/signup"
              component={() =>
                (window.location.href =
                  "https://blakesreminders.auth.us-west-2.amazoncognito.com/login?client_id=6fsodqvgk8vc4o8g6qacohsrmh&response_type=code&scope=aws.cognito.signin.user.admin+email+http://localhost:8080/api.all+openid+phone+profile&redirect_uri=http://localhost:8080/callback")
              }
            />
            <Route
              path="/signin"
              component={() =>
                (window.location.href =
                  "https://blakesreminders.auth.us-west-2.amazoncognito.com/login?client_id=6fsodqvgk8vc4o8g6qacohsrmh&response_type=code&scope=aws.cognito.signin.user.admin+email+http://localhost:8080/api.all+openid+phone+profile&redirect_uri=http://localhost:8080/callback")
              }
            />
            <Route path="/">
              <IndexPage />
            </Route>
          </Switch>
        </Router>
      </Layout>
    </GlobalStateProvider>
  );
}

export default App;
