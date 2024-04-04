import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Publish } from './pages/Publish'
import { Blogs } from './pages/Blogs'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import './App.css'
import {BrowserRouter ,Route,Routes} from 'react-router-dom'
function App() {
  const [count, setCount] = useState(0)

  return (
    < >
      <div className='' >
        <div>
          <BrowserRouter>
          <Routes>
            <Route path='/signup' element={<Signup></Signup>}></Route>
            <Route path='/signin' element={<Signin></Signin>}></Route>
            <Route path='/blogs' element={<Blogs></Blogs>}></Route>
            <Route path="/blog/:id" element={<Blog />} />
            <Route path='/publish' element={<Publish></Publish>}></Route>
            </Routes>
          </BrowserRouter>
        </div>
        
      </div>

      
    </>
  )
}

export default App
