import { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "./contexts/AuthProvider";
import axios from "axios";
import TodoList from "./components/TodoList";
import "./App.css";
function App() {
  const [profile, setProfile] = useState(null);
  const { user, setUser } = useAuth();
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  //effect that will retrieve the user profile from google
  //This effect will run when the user is logged in
  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  // log out function to log the user out of google and set the profileto null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };
  return (
    <div className="app">
      {/* Conditionally render the user information and a logout button only after a profile has been retrieved */}
      {profile ? (
        <div>
          <header>
            <p>Hello, {profile.name}</p>
            <button onClick={logOut}>Log out</button>
          </header>
          <TodoList />
        </div>
      ) : (
        // show the login button if the user is not logged in
        <button onClick={() => login()}>Sign in with Google 🚀 </button>
      )}
    </div>
  );
}

export default App;
