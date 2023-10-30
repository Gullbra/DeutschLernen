import { IRoutingProps } from './interfaces/IProps'
import { HomeView } from './views/Home'

import { Routes, Route } from 'react-router-dom'
import { ToInsert } from './views/ToInsert'

export const AppRouting = ({}: IRoutingProps) => {
  const routesArray: {path: string, element: React.ReactNode}[] = [
    {
      path: "*",
      element: <div>Ops! Nothing here: 404</div>
    },
    {
      path: "/",
      element: <HomeView/>
    },
    {
      path: "/ToInsert",
      element: <ToInsert/>
    }
  ]

  return (
    <Routes>
      {routesArray.map((route) => {
        return <Route 
          key={route.path}
          path={route.path} 
          element={route.element} 
        />
      })}
    </Routes>
  )
}