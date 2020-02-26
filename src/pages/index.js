import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from "../utils/globalState";
import Container from "../components/container";
import Loader from "../components/loader";
import Reminder from "../components/reminder";
import PlusIcon from "../components/icons/plusIcon";
import Button from "../components/button";

const IndexPage = ({ className }) => {
  const [{ session }] = useGlobalState();
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(false);
  // load reminders on load if session is set
  useEffect(() => {
    const tryFetch = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/reminders", {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${session.credentials.accessToken}`
        }
      });
      setReminders(await response.json());
      setLoading(false);
    };
    if (session) {
      tryFetch();
    }
  }, [session]);

  // if loading show the loader and if not loading and logged in show reminders
  // if not loading an dnot logged in show sign up
  return (
    <Container>
      {loading ? (
        <Loader />
      ) : !session ? (
        <Link to="signup">Login / Signup</Link>
      ) : (
        <div>
          <Link to="/create">
            <Button>
              Create Reminder <PlusIcon />
            </Button>
          </Link>
          <br />
          {reminders.map(reminder => (
            <Reminder reminder={reminder} setReminders={setReminders} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default IndexPage;
