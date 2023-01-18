import React from 'react'
import {Route, Routes} from 'react-router'
import Home from './pages'
import Layout from "./layouts/layout";
import HomeEtiquette from "./pages/etiquettes";
import HomeQuestion from './pages/questions';
import HomeLogin from './pages/auth';

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Layout/>}>
        <Route index element={<Home />} />

        <Route path={"/etiquettes"}>
          <Route index element={<HomeEtiquette />} />
        </Route>

        <Route path={"/questions"}>
          <Route index element={<HomeQuestion />} />
        </Route>
       
        
      </Route>
      <Route path='/authentication'>
            <Route index element={<HomeLogin />} />
            
        </Route>
    </Routes>
  )
}

export default App
