import { IRoutingProps } from './interfaces/IProps'
import { HomeView } from './views/Home'

import { Routes, Route } from 'react-router-dom'
import { ToInsert } from './views/ToInsert'
import { AddWordView } from './views/AddWord'
import { AddClassView } from './views/AddClass'
import { OverViewView } from './views/OverVievView'

type TRoute = {
  path: string, 
  element: React.ReactNode,
  children?: {
    path: string,
    element: React.ReactNode
  } []
}[]

export const AppRouting = ({}: IRoutingProps) => {
  const routesArray: TRoute = [
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
      element: <ToInsert/>,
      children: [
        {
          path: "/ToInsert",
          element: <div>Overview and send saved data</div>
          //element: <OverViewView />
          // needs useContext before impöementation

        },
        {
          path: "/ToInsert/AddWordView",
          element: <AddWordView />
        },
        {
          path: "/ToInsert/AddClassView",
          element: <AddClassView />
        },
      ]
    }
  ]

  return (
    <Routes>
      {routesArray.map((route) => {
        return <Route 
          key={route.path}
          path={route.path} 
          element={route.element}
        >
          {route.children && (
            route.children.map(childRoute => (
              <Route 
                key={childRoute.path}
                path={childRoute.path} 
                element={childRoute.element}
              />
            ))
          )}
        </Route>
      })}
    </Routes>
  )
}
