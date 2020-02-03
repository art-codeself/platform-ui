import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'dashboard' },
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: 'dashboard',
        name: 'dashboard',
        meta: {
          title: '首页',
          auth: true
        },
        component: _import('system/dashboard')
      },
      // 系统 前端日志
      {
        path: 'syslog',
        name: 'syslog',
        meta: {
          title: '前端日志',
          auth: true
        },
        component: _import('system/log')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: _import('system/function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: _import('system/function/redirect')
      }
    ]
  },
  // iframe
  {
    path: '/myiframe',
    redirect: '/myiframe',
    component: layoutHeaderAside,
    children: [
      {
        path: ':routerPath',
        name: 'iframe',
        meta: {
          auth: true,
          title: 'iframe'
        },
        component: () => import('@/views/system/iframe')
      }
    ]
  },
  {
    path: '/admin',
    component: layoutHeaderAside,
    meta: {
      auth: true,
      title: '系统管理'
    },
    children: [
      {
        path: 'user',
        name: 'user',
        meta: {
          auth: true,
          title: '用户管理'
        },
        component: () => import('@/views/syplatform/admin/user')
      },
      {
        path: 'menu',
        name: 'menu',
        meta: {
          auth: true,
          title: '菜单管理'
        },
        component: () => import('@/views/syplatform/admin/menu')
      },
      {
        path: 'role',
        name: 'role',
        meta: {
          auth: true,
          title: '角色管理'
        },
        component: () => import('@/views/syplatform/admin/role')
      },
      {
        path: 'auth',
        name: 'auth',
        meta: {
          auth: true,
          title: '权限管理'
        },
        component: () => import('@/views/syplatform/admin/auth')
      },
      {
        path: 'log',
        name: 'log',
        meta: {
          auth: true,
          title: '日志管理'
        },
        component: () => import('@/views/syplatform/admin/log')
      },
      {
        path: 'dict',
        name: 'dict',
        meta: {
          auth: true,
          title: '字典管理'
        },
        component: () => import('@/views/syplatform/admin/dict')
      },
      {
        path: 'dept',
        name: 'dept',
        meta: {
          auth: true,
          title: '部门管理'
        },
        component: () => import('@/views/syplatform/admin/dept')
      },
      {
        path: 'route',
        name: 'route',
        meta: {
          auth: true,
          title: '路由管理'
        },
        component: () => import('@/views/syplatform/admin/route')
      },
      {
        path: 'client',
        name: 'client',
        meta: {
          auth: true,
          title: '客户端管理'
        },
        component: () => import('@/views/syplatform/admin/client')
      },
      {
        path: 'tenant',
        name: 'tenant',
        meta: {
          auth: true,
          title: '租户管理'
        },
        component: () => import('@/views/syplatform/admin/tenant')
      },
      {
        path: 'position',
        name: 'position',
        meta: {
          auth: true,
          title: '职位管理'
        },
        component: () => import('@/views/syplatform/admin/position')
      },
      {
        path: 'usergroup',
        name: 'usergroup',
        meta: {
          auth: true,
          title: '用户组管理'
        },
        component: () => import('@/views/syplatform/admin/usergroup')
      }
    ]
  },
  {
    path: '/sy-admin',
    component: layoutHeaderAside,
    meta: {
      auth: true,
      title: '服务管理'
    },
    children: [
      {
        path: 'sy-api',
        name: 'sy-api',
        meta: {
          auth: true,
          title: '接口文档'
        },
        component: () => import('@/views/syplatform/service/swagger')
      },
      {
        path: 'sy-governance',
        name: 'sy-governance',
        meta: {
          auth: true,
          title: '服务治理'
        },
        component: () => import('@/views/syplatform/service/governance')
      },
      {
        path: 'sy-sentinel',
        name: 'sy-sentinel',
        meta: {
          auth: true,
          title: 'Sentinel 控制台'
        },
        component: () => import('@/views/syplatform/service/sentinel')
      }
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('system/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
