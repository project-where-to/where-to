import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import Events from './Components/Events/Events.jsx'
import Login from './Components/LogIn/Login.jsx'
import Home from './Components/Home/Home.jsx'
import SignUp from './Components/SignUp/SignUp.jsx'
import Create from './Components/Create/Create.jsx'
import MyCalendar from './Components/MyCalendar/MyCalendar.jsx'
import Profile from './Components/Profile/Profile.jsx'
import About from './Components/About/About.jsx'
import Goal from './Components/Goal/Goal.jsx'
import Team from './Components/Team/Team.jsx'
import Contact from './Components/Contact/Contact.jsx'
import Testing from './Components/Testing/Testing.jsx'
import { createTheme, ThemeProvider } from '@mui/material'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/testing' element={<Testing />}/>
      <Route index element={<Home />}/>
      <Route path='/events' element={<Events />}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/create' element={<Create/>}/>
      <Route path='/myCalendar' element={<MyCalendar/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/goal' element={<Goal/>}/>
      <Route path='/team' element={<Team/>}/> 
      <Route path='/contact' element={<Contact/>}/>
      
    </Route>
  )
)

const theme = createTheme({
  palette: {
    primary: {
      main: '#bf00ff'
    },
    secondary: {
      main: '#ac00e6'
    },
    background: {
      main: "#99D5C9"
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={ theme }>
    <RouterProvider router={router}/>
    </ThemeProvider>
  </React.StrictMode>,
)
