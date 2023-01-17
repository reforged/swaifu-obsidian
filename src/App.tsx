import React from 'react'
import {Route, Routes} from 'react-router'
import Home from './pages'
import Layout from "./layouts/layout";
import HomeEtiquette from "./pages/etiquettes";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Layout/>}>
        <Route index element={<Home />} />

        <Route path={"/etiquettes"}>
          <Route index element={<HomeEtiquette />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
