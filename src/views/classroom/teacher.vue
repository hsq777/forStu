<template>
  <div>
    <div class="teacher-container">
      <canvas
        id="myCanvas"
        ref="canvas"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="handleLeave"
        @mouseout="handleLeave"
      />
    </div>
    <div class="header">
      <div class="header-count">
        <template v-if="studentList.length > 0">当前有{{ studentList.length }} 名学生连接</template>
        <template v-else>
          当前无学生连接
        </template>
      </div>
      <!-- <el-button @click="handleQuit">退出课堂</el-button> -->
      <el-button icon="el-icon-edit" :type="status === 'pen' ? 'primary' : 'default'" @click="handlePen" />
      <el-button icon="el-icon-delete" :type="status === 'eraser' ? 'primary' : 'default'" @click="handleEraser" />
    </div>
  </div>
</template>

<script>

// import { mapGetters, mapState } from 'vuex'
import io from 'socket.io-client'
import { getStudentList } from '@/api/student'
export default {
  name: 'Teacher',
  data() {
    return {
      color: 'white',
      x1: 0,
      y1: 0,
      isDraw: false,
      status: 'pen', // pen | eraser
      socket: io('ws://127.0.0.1:9526'),
      studentList: []
    }
  },
  computed: {
    // ...mapGetters([
    //   'students'
    // ]),
    students() {
      return this.$store.state.classroom.student
    }
    // ...mapState({
    //   students: state => state.student.student
    // })
  },
  mounted() {
    this.canvasNode = this.$refs.canvas
    this.canvasNode.width = 800
    this.canvasNode.height = 500
    this.getStudents()
    this.socket.on('refreshStu', () => {
      // debugger
      console.log('收到学生上/下线通知')
      this.getStudents()
      // this.getStudents()
    })
  },
  methods: {
    // 获取学生列表
    async getStudents() {
      await getStudentList().then(res => {
        if (res.code === 20000) {
          this.studentList = res.data
        }
      })
    },
    handleMouseDown(e) {
      this.isDraw = true
      this.x1 = e.clientX - 215
      this.y1 = e.clientY - 84
    },
    handleLeave() {
      this.isDraw = false
      this.x1 = 0
      this.y1 = 0
    },
    handleMouseMove(e) {
      e.preventDefault()
      if (!this.isDraw) {
        return
      }
      const curColor = this.status === 'pen' ? this.color : 'black'
      const ctx = this.canvasNode.getContext('2d')
      ctx.beginPath()
      ctx.moveTo(this.x1, this.y1)
      ctx.lineTo(e.clientX - 215, e.clientY - 84)
      ctx.strokeStyle = curColor
      ctx.lineWidth = 10
      ctx.stroke()
      ctx.closePath()
      this.x1 = e.clientX - 215
      this.y1 = e.clientY - 84
      // 发送画布数据
      this.socket.emit('sendDraw', this.canvasNode.toDataURL())
    },
    // 画笔
    handlePen() {
      this.status = 'pen'
      this.x1 = 0
      this.y1 = 0
    },
    // 板擦
    handleEraser() {
      this.status = 'eraser'
      this.x1 = 215
      this.y1 = 84
    },
    // 退出课堂
    handleQuit() {
    // 刷新学生端数据
      this.socket.emit('sendDraw', null)
      // 关闭页签
      // window.close()
      this.$store.dispatch('student/delView', this.$route)
    }
  }
}
</script>
<style lang="scss">
.header {
  width: 80%;
  margin: 30px auto;
  line-height: 30px;

  &-count {
    display: inline-block;
    font-size: 24px;
  }

  button {
    margin-left: 30px;
  }
}

.teacher-container {
  border: 1px solid #ddd;
}

canvas {
  background: black;
}
</style>
