import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Services from '../views/Services.vue'
import Pricing from '../views/Pricing.vue'
import Contact from '../views/Contact.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/services',
    name: 'Services',
    component: Services
  },
  {
    path: '/pricing',
    name: 'Pricing',
    component: Pricing
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/dashboard',
    component: () => import('../layouts/DashboardLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue')
      },
      {
        path: 'spreadsheets',
        name: 'Spreadsheets',
        component: () => import('../views/dashboard/Spreadsheets.vue')
      },
      {
        path: 'ai-analysis',
        name: 'AIAnalysis',
        component: () => import('../views/dashboard/AIAnalysis.vue')
      },
      {
        path: 'charts',
        name: 'Charts',
        component: () => import('../views/dashboard/Charts.vue')
      },
      {
        path: 'integrations',
        name: 'Integrations',
        component: () => import('../views/dashboard/Integrations.vue')
      },
      {
        path: 'reports',
        name: 'Reports',
        component: () => import('../views/dashboard/Reports.vue')
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('../views/dashboard/Settings.vue')
      },
      {
        path: 'spreadsheet-editor/:id',
        name: 'SpreadsheetEditor',
        component: () => import('../views/dashboard/SpreadsheetEditor.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_, __, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Navigation guard for protected routes
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = localStorage.getItem('smartsheet_user')

  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router