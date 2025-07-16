import { createBrowserRouter,Outlet,RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

import {PersistGate} from 'redux-persist/integration/react'
import appStore,{persistor} from './utils/appStore'

import PrivateRoute from './components/privateroute/PrivateRoute'
import Body from "./components/body/Body"
import AuthPage from './components/auth/AuthPage'
import Dashboard from './components/dashboard/Dashboard'
import Transactions from './components/transaction/Transactions'
import Budget from './components/budget/Budget'


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
        element:<PrivateRoute><Outlet/></PrivateRoute>,
        children:[

          {
            path:"/dashboard",
            element:<Dashboard/>,
          },
          {
            path:"/transaction",
            element:<Transactions/>,
          },
          {
            path:"/budget",
            element:<Budget/>,
          }
          
        ],
      }

    ]
  
  }])

  return (
    <>  
      <Provider store={appStore}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={appRouter}/>
        </PersistGate>
      </Provider>
    </>
  )
}

export default App
