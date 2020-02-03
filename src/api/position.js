import request from '@/plugin/axios'

export function fetchList (query) {
  return request({
    url: '/admin/position/page',
    method: 'get',
    params: query
  })
}

export function deptPositionList (deptId) {
  return request({
    url: '/admin/position/positionList/' + deptId,
    method: 'get'
  })
}

export function addObj (obj) {
  return request({
    url: '/admin/position/',
    method: 'post',
    data: obj
  })
}

export function getObj (id) {
  return request({
    url: '/admin/position/' + id,
    method: 'get'
  })
}

export function delObj (id) {
  return request({
    url: '/admin/position/' + id,
    method: 'delete'
  })
}

export function putObj (obj) {
  return request({
    url: '/admin/position',
    method: 'put',
    data: obj
  })
}

// 成员设置
export function positionMembersUpd (positionId, userIds, operate) {
  return request({
    url: `/admin/position/members/${operate}`,
    method: 'put',
    data: {
      positionId,
      userIds
    }
  })
}

export function positionMembersAdded (positionId, params) {
  return request({
    url: `/admin/position/members/added/${positionId}`,
    method: 'get',
    params
  })
}

export function positionMembersNotin (positionId, params) {
  return request({
    url: `/admin/position/members/notin/${positionId}`,
    method: 'get',
    params
  })
}

// 角色设置
export function positionRolesUpd (positionId, roleIds, operate) {
  return request({
    url: `/admin/position/roles/${operate}`,
    method: 'put',
    data: {
      positionId,
      roleIds
    }
  })
}

export function positionRolesAdded (positionId, params) {
  return request({
    url: `/admin/position/roles/added/${positionId}`,
    method: 'get',
    params
  })
}

export function positionRolesNotin (positionId, params) {
  return request({
    url: `/admin/position/roles/notin/${positionId}`,
    method: 'get',
    params
  })
}

// 菜单设置
export function fetchPositionMenuTree (positionId) {
  return request({
    url: '/admin/menu/positionTree/' + positionId,
    method: 'get'
  })
}

export function positionMenuUpd (positionId, menuIds) {
  return request({
    url: '/admin/position/positionMenuUpd',
    method: 'put',
    data: {
      positionId: positionId,
      menuIds: menuIds
    }
  })
}
