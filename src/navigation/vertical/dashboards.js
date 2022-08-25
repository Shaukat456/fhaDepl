/* eslint-disable import/no-anonymous-default-export */
import { Home, Circle } from 'react-feather'

export default [
  {
    id: 'dashboards',
    title: 'Dashboards',
    icon: <Home size={20} />,
    badge: 'light-warning',
    badgeText: '2',
    children: [
      {
        id: 'analyticsDash',
        title: 'Analytics',
        icon: <Circle size={12} />,
        navLink: '/dashboard/analytics'
      },
      {
        id: 'eCommerceDash',
        title: 'eCommerce',
        icon: <Circle size={12} />,
        navLink: '/dashboard/ecommerce'
      },
      {
        id: 'compnies',
        title: 'Companies',
        icon: <Circle size={12} />,
        navLink: '/dashboard/companies'
      },
      {
        id: 'categories',
        title: 'Categories',
        icon: <Circle size={12} />,
        navLink: '/dashboard/categories'
      },
      {
        id: 'Consumer',
        title: 'Consumer',
        icon: <Circle size={12} />,
        navLink: '/dashboard/consumer'
      },
      // {
      //   id: 'Consumer type ',
      //   title: 'Consumer type ',
      //   icon: <Circle size={12} />,
      //   navLink: '/dashboard/consumerType'
      // },
      {
        id: 'Producer',
        title: 'Producer',
        icon: <Circle size={12} />,
        navLink: '/dashboard/producer'
      },
      {
        id: 'ProducerType',
        title: 'Producer Type',
        icon: <Circle size={12} />,
        navLink: '/dashboard/producerType'
      },
      {
        id: 'User',
        title: 'User',
        icon: <Circle size={12} />,
        navLink: '/dashboard/user'
      },
      {
        id: 'vehicles',
        title: 'Vehicle',
        icon: <Circle size={12} />,
        navLink: '/dashboard/vehicles'
      },
      {
        id: 'product',
        title: 'Product',
        icon: <Circle size={12} />,
        navLink: '/dashboard/product'
      }
    ]
  }
]
