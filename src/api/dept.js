import request from '@/plugin/axios'

export function listAll (query) {
  return request({
    url: '/admin/dept/list',
    method: 'get',
    params: query
  })
}

export function fetchTree (query) {
  return request({
    url: '/admin/dept/tree',
    method: 'get',
    params: query
  })
}

export function addObj (obj) {
  return request({
    url: '/admin/dept/',
    method: 'post',
    data: obj
  })
}

export function getObj (id) {
  return request({
    url: '/admin/dept/' + id,
    method: 'get'
  })
}

export function delObj (id) {
  return request({
    url: '/admin/dept/' + id,
    method: 'delete'
  })
}

export function putObj (obj) {
  return request({
    url: '/admin/dept/',
    method: 'put',
    data: obj
  })
}

// 成员设置
export function deptMembersUpd (deptId, userIds, operate) {
  return request({
    url: `/admin/dept/members/${operate}`,
    method: 'put',
    data: {
      deptId,
      userIds
    }
  })
}

export function deptMembersAdded (deptId, params) {
  return request({
    url: `/admin/dept/members/added/${deptId}`,
    method: 'get',
    params
  })
}

export function deptMembersNotin (deptId, params) {
  return request({
    url: `/admin/dept/members/notin/${deptId}`,
    method: 'get',
    params
  })
}

// 职位设置
export function deptPositionsUpd (deptId, positionIds, operate) {
  return request({
    url: `/admin/dept/positions/${operate}`,
    method: 'put',
    data: {
      deptId,
      positionIds
    }
  })
}

export function deptPositionsAdded (deptId, params) {
  return request({
    url: `/admin/dept/positions/added/${deptId}`,
    method: 'get',
    params
  })
}

export function deptPositionsNotin (deptId, params) {
  return request({
    url: `/admin/dept/positions/notin/${deptId}`,
    method: 'get',
    params
  })
}

// 角色设置
export function deptRolesUpd (deptId, roleIds, operate) {
  return request({
    url: `/admin/dept/roles/${operate}`,
    method: 'put',
    data: {
      deptId,
      roleIds
    }
  })
}

export function deptRolesAdded (deptId, params) {
  return request({
    url: `/admin/dept/roles/added/${deptId}`,
    method: 'get',
    params
  })
}

export function deptRolesNotin (deptId, params) {
  return request({
    url: `/admin/dept/roles/notin/${deptId}`,
    method: 'get',
    params
  })
}

// 菜单设置
// 获取部门授权菜单Id集合 (不包含父菜单)
export function fetchDeptMenuTree (deptId) {
  return request({
    url: '/admin/menu/deptTree/' + deptId,
    method: 'get'
  })
}

// 获取部门授权菜单信息 (包括父菜单)
export function fetchDeptAuthorizationTree (deptId) {
  return request({
    url: '/admin/menu/deptAuthorizationTree/' + deptId,
    method: 'get'
  })
}

export function deptMenuUpd (deptId, menuIds) {
  return request({
    url: '/admin/dept/deptMenuUpd',
    method: 'put',
    data: {
      deptId: deptId,
      menuIds: menuIds
    }
  })
}
