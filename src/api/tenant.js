import request from '@/plugin/axios'

export function fetchList (query) {
  return request({
    url: '/admin/tenant/page',
    method: 'get',
    params: query
  })
}

export function addObj (obj) {
  return request({
    url: '/admin/tenant/',
    method: 'post',
    data: obj
  })
}

export function getObj (id) {
  return request({
    url: '/admin/tenant/' + id,
    method: 'get'
  })
}

export function delObj (id) {
  return request({
    url: '/admin/tenant/' + id,
    method: 'delete'
  })
}

export function putObj (obj) {
  return request({
    url: '/admin/tenant',
    method: 'put',
    data: obj
  })
}

export function selectList (obj) {
  return request({
    url: '/admin/tenant/selectList',
    method: 'get',
    data: obj
  })
}
