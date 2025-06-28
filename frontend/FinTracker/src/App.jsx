import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'

import Body from "./components/body/Body"
import AuthPage from './components/auth/AuthPage'
import Dashboard from './components/dashboard/Dashboard'



const App = ()=> {

  const appRouter = createBrowserRouter([{
    path:"/",
    element:<Body/>,
    children:[
      {
        path:"/auth",
        element:<AuthPage/>,
      },
      {
        path:"/dashboard",
        element:<Dashboard/>,
      }
    ]
  
  }])

  return (
    <>  
      <Provider store={appStore}>
        <RouterProvider router={appRouter}/>
      </Provider>
    </>
  )
}

export default App
