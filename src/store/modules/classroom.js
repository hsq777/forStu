/*
 * @Author: hsq     779306
 * @Description:
 * @Date: 2022-09-14 19:52:05
 */
import { getStudentList, stuOnline, stuOffline } from '@/api/student'
// import Vue from 'vue'

const state = {
  student: []
}

const mutations = {
  SET_STUDENT: (state, student) => {
    // Vue.set(state, 'student', student)
    state.student.push(student)
  }
}
// 判断该学生是否已存在
const isIn = (id) => {
  return state.student.findIndex((student) => {
    return student.id === id
  })
}
const actions = {
  stuOffline({ dispatch }, id) {
    return new Promise((resolve, reject) => {
      stuOffline(id).then(async() => {
        dispatch('getStudentList', 'offline', id)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getStudentList({ commit }, type, id) {
    return new Promise((resolve, reject) => {
      getStudentList().then(res => {
        let stu = state.student
        if (type === 'online') {
          if (isIn(id) > -1) {
            console.log('该学生已上线')
          } else {
            stu.push(res.data)
          }
        } else if (type === 'offline') {
          const index = isIn(id)
          if (index > -1) {
            stu.splice(index, 1)
          } else {
            console.log('该学生未上线')
          }
        } else {
          stu = res.data
        }
        commit('SET_STUDENT', stu)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  stuOnline({ dispatch }, data) {
    return new Promise((resolve, reject) => {
      stuOnline(data).then(async() => {
        const { id } = data
        dispatch('getStudentList', 'online', id)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
