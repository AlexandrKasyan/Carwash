import { observer } from "mobx-react-lite";
import React, { useContext, useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter.js";
import { NavBar } from "./components/NavBar.jsx";
import { check } from "./http/userAPI.js";
import { Context } from "./index.js";

const App = observer(() => {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await check()
      if (!data)
        return
      user.setUser(data)
      user.setIsAuth(true)
    }
    fetchData()
    setLoading(false)
  }, [])

  if (loading) {
    return <Spinner animation={"grow"} />
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
})

export default App;
