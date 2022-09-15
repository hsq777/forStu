/*
 * @Author: hsq     779306
 * @Description:
 * @Date: 2022-09-14 19:51:47
 */

const students = [] // 学生信息，此处直接保存在内存中

// 判断该学生是否已存在
const isIn = (id) => {
  return students.findIndex((student) => {
    return student.id === id
  })
}

module.exports = [
  {
    url: '/hsq-admin/student/list',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: students
      }
    }
  },
  {
    url: '/hsq-admin/student/online',
    type: 'post',
    response: config => {
      const { id } = config.body
      if (isIn(id) > -1) {
        console.log('该学生已上线')
      } else {
        students.push(config.body)
      }
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/hsq-admin/student/offline',
    type: 'post',
    response: config => {
      // debugger
      const { id } = config.body
      const index = isIn(id)
      if (index > -1) {
        students.splice(index, 1)
      } else {
        console.log('该学生未上线')
      }
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
