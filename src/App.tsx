import React, {useEffect, useState} from 'react'
import {Route, Routes} from 'react-router'
import Home from './pages'
import Layout from "./layouts/layout";
import HomeEtiquette from "./pages/etiquettes";
import HomeQuestion from './pages/questions';
import Login from "./pages/auth/login";
import { AuthenticationContext} from './contexts/AuthenticationContext'
import {IUser} from "@obsidian/type";

function App() {
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    console.log(user)
  }, [user])
  return (
    <div>
      <AuthenticationContext.Provider value={{ user, setUser}}>
          <Routes>
              <Route path={"/login"} element={<Login />}/>
            <Route path={"/manager"} element={<Layout/>}>
              <Route index element={<Home />} />

              <Route path={"/manager/etiquettes"}>
                <Route index element={<HomeEtiquette />} />
              </Route>

              <Route path={"/manager/questions"}>
                <Route index element={<HomeQuestion />} />
              </Route>
            </Route>


          </Routes>



      </AuthenticationContext.Provider>
    </div>
  )
}

export default App
