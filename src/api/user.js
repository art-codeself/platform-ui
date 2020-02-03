import request from '@/plugin/axios'

export function fetchList (query) {
  return request({
    url: '/admin/user/userPage',
    method: 'get',
    params: query
  })
}

export function addObj (obj) {
  return request({
    url: '/admin/user/',
    method: 'post',
    data: obj
  })
}

export function getObj (id) {
  return request({
    url: '/admin/user/' + id,
    method: 'get'
  })
}

export function delObj (id) {
  return request({
    url: '/admin/user/' + id,
    method: 'delete'
  })
}

export function putObj (obj) {
  return request({
    url: '/admin/user',
    method: 'put',
    data: obj
  })
}

export function sendSmsCode (mobile) {
  return request({
    url: `/admin/user/smsCode/${mobile}`,
    method: 'get'
  })
}

// 角色设置
export function userRolesUpd (userId, roleIds, operate) {
  return request({
    url: `/admin/user/roles/${operate}`,
    method: 'put',
    data: {
      userId,
      roleIds
    }
  })
}

export function userRolesAdded (userId, params) {
  return request({
    url: `/admin/user/roles/added/${userId}`,
    method: 'get',
    params
  })
}

export function userRolesNotin (userId, params) {
  return request({
    url: `/admin/user/roles/notin/${userId}`,
    method: 'get',
    params
  })
}
