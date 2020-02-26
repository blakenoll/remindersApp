const deleteReminder = async (id, session) => {
  try {
    const response = await fetch("http://localhost:8080/api/reminders/" + id, {
      method: "DELETE",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${session.credentials.accessToken}`,
        "Content-type": "application/json"
      }
    });
    const json = await response.json();
    if (json.status === "deleted") {
      return { deleted: true };
    }
  } catch (error) {
    return { error: error };
  }
};

export default deleteReminder;
