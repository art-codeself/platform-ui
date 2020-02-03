import Vue from 'vue'

import syContainer from './sy-container'
import syContainerFrame from './sy-container-frame'
import syBaseContainer from './sy-base-container'

// 注意 有些组件使用异步加载会有影响
Vue.component('sy-base-container', syBaseContainer)
Vue.component('sy-container', syContainer)
Vue.component('sy-container-iframe', syContainerFrame)
Vue.component('sy-icon', () => import('./sy-icon'))
Vue.component('sy-icon-svg', () => import('./sy-icon-svg/index.vue'))
Vue.component('sy-icon-select', () => import('./sy-icon-select/index.vue'))
Vue.component('sy-icon-svg-select', () => import('./sy-icon-svg-select/index.vue'))
Vue.component('tree-table', () => import('./TreeTable/index.vue'))
Vue.component('sy-role-member-set', () => import('./syplatform/role/member-set.vue'))
Vue.component('sy-role-permission-set', () => import('./syplatform/role/permission-set.vue'))
Vue.component('sy-select-tree', () => import('./sy-select-tree/index.vue'))
Vue.component('sy-dept-member-set', () => import('./syplatform/dept/dept-member-set.vue'))
Vue.component('sy-dept-position-set', () => import('./syplatform/dept/dept-position-set.vue'))
Vue.component('sy-dept-role-set', () => import('./syplatform/dept/dept-role-set.vue'))
Vue.component('sy-dept-menu-set', () => import('./syplatform/dept/dept-menu-set.vue'))
Vue.component('sy-position-member-set', () => import('./syplatform/position/position-member-set.vue'))
Vue.component('sy-position-menu-set', () => import('./syplatform/position/position-menu-set.vue'))
Vue.component('sy-group-member-set', () => import('./syplatform/usergroup/group-member-set.vue'))
Vue.component('sy-group-role-set', () => import('./syplatform/usergroup/group-role-set.vue'))
Vue.component('sy-user-role-set', () => import('./syplatform/user/user-role-set.vue'))
