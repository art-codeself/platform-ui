import request from '@/plugin/axios'

export function fetchList (query) {
  return request({
    url: '/admin/usergroup/page',
    method: 'get',
    params: query
  })
}

export function addObj (obj) {
  return request({
    url: '/admin/usergroup/',
    method: 'post',
    data: obj
  })
}

export function getObj (id) {
  return request({
    url: '/admin/usergroup/' + id,
    method: 'get'
  })
}

export function delObj (id) {
  return request({
    url: '/admin/usergroup/' + id,
    method: 'delete'
  })
}

export function putObj (obj) {
  return request({
    url: '/admin/usergroup',
    method: 'put',
    data: obj
  })
}

// 成员设置
export function usergroupMembersUpd (groupId, userIds, operate) {
  return request({
    url: `/admin/usergroup/members/${operate}`,
    method: 'put',
    data: {
      groupId,
      userIds
    }
  })
}

export function usergroupMembersAdded (groupId, params) {
  return request({
    url: `/admin/usergroup/members/added/${groupId}`,
    method: 'get',
    params
  })
}

export function usergroupMembersNotin (groupId, params) {
  return request({
    url: `/admin/usergroup/members/notin/${groupId}`,
    method: 'get',
    params
  })
}

// 角色设置
export function usergroupRolesUpd (groupId, roleIds, operate) {
  return request({
    url: `/admin/usergroup/roles/${operate}`,
    method: 'put',
    data: {
      groupId,
      roleIds
    }
  })
}

export function usergroupRolesAdded (groupId, params) {
  return request({
    url: `/admin/usergroup/roles/added/${groupId}`,
    method: 'get',
    params
  })
}

export function usergroupRolesNotin (groupId, params) {
  return request({
    url: `/admin/usergroup/roles/notin/${groupId}`,
    method: 'get',
    params
  })
}
