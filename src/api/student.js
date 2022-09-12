import request from '@/utils/request'

export function getStudentList(data) {
  return request({
    url: '/hsq-admin/student/list',
    method: 'get',
    data
  })
}

export function stuOnline(data) {
  return request({
    url: '/hsq-admin/student/online',
    method: 'post',
    data
  })
}

export function stuOffline(data) {
  return request({
    url: '/hsq-admin/student/offline',
    method: 'post',
    data
  })
}
