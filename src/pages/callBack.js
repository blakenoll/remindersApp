import React, { useEffect } from "react";
import { useLocation, Redirect } from "react-router-dom";
import { useGlobalState } from "../utils/globalState";
import cognitoUtils from "../utils/cognitoUtils";
import Container from "../components/container";
import Loader from "../components/loader";

// callback page to get code from amazon cognito and set the user seesion
const CallBackPage = ({ className }) => {
  const [{ session }, dispatch] = useGlobalState();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();

  // grab the code from aws cognito after sign in on mount
  useEffect(() => {
    async function setSession(callbackURL) {
      try {
        if (query.get("code")) {
          await cognitoUtils.parseCognitoWebResponse(callbackURL);
          const session = await cognitoUtils.getCognitoSession();
          dispatch({ type: "setSession", session });
        }
      } catch (error) {
        console.log(error);
      }
    }

    setSession(window.location.href);
  }, [query, dispatch]);

  return (
    <Container>
      {!session ? <Loader /> : <Redirect to={{ pathname: "/" }} />}
    </Container>
  );
};

export default CallBackPage;
