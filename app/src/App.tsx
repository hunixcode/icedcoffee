import Home from './pages/Home'
import Profile from './pages/Profile'
import MainLayout from './Layout'

import {Routes, Route} from 'react-router-dom'

export default function App(){
  return (
    <Routes>
      <Route element={<MainLayout/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Route>
    </Routes>
  )
}
  