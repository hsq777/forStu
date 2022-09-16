/*
 * @Author: hsq     <ledgehsq@163.com>
 * @Description:
 * @Date: 2022-09-15 22:36:57
 */
const express = require('express')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, { origins: '*:*' })
const bodyParser = require('body-parser')
const cors = require('cors')

const port = 9526
// const version = '/1.0'
const students = [] // 学生信息，此处直接保存在内存中

// 判断该学生是否已存在
const isIn = (id) => {
  return students.findIndex((student) => {
    return student.id === id
  })
}

app.use(bodyParser.json())
app.use(cors())

// 监听 socket 连接
io.on('connection', (socket) => {
  // 广播画布数据
  socket.on('sendDraw', data => {
    socket.broadcast.emit('draw', data)
  })

  socket.on('disconnect', () => {
    console.log('disconnect')
  })

  socket.on('login', () => {
    socket.broadcast.emit('refreshStu')
  })

  socket.on('logout', ({ id }) => {
    const index = isIn(id)
    if (index > -1) {
      students.splice(index, 1)
    } else {
      console.log('该学生未上线')
    }
    socket.broadcast.emit('refreshStu')
  })
})

server.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
