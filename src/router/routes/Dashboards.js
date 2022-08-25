import { lazy } from 'react'

const DashboardRoutes = [
  // Dashboards
  {
    path: '/dashboard/analytics',
    component: lazy(() => import('../../views/dashboard/analytics'))
  },
  {
    path: '/dashboard/ecommerce',
    component: lazy(() => import('../../views/dashboard/ecommerce')),
    exact: true
  },
  {
    path: '/dashboard/companies',
    component: lazy(() => import('../../views/pages/companies')),
    exact: true
  },
  {
    path: '/dashboard/user',
    component: lazy(() => import('../../views/pages/User')),
    exact: true
  },
  {
    path: '/dashboard/consumer',
    component: lazy(() => import('../../views/pages/adminp')),
    exact: true
  },
  // {
  //   path: '/dashboard/consumerType',
  //   component: lazy(() => import('../../views/pages/consumerType')),
  //   exact: true
  // },
  {
    path: '/dashboard/producer',
    component: lazy(() => import('../../views/pages/Producer')),
    exact: true
  },
  {
    path: '/dashboard/producerType',
    component: lazy(() => import('../../views/pages/ProducerType')),
    exact: true
  },
  {
    path: '/dashboard/categories',
    component: lazy(() => import('../../views/pages/categories')),
    exact: true
  },
  {
    path: '/dashboard/vehicles',
    component: lazy(() => import('../../views/pages/vehicles')),
    exact: true
  },
  {
    path: '/dashboard/product',
    component: lazy(() => import('../../views/pages/product')),
    exact: true
  }
]

export default DashboardRoutes
