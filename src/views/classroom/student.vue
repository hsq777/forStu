<template>
  <div class="student-container">
    <el-button @click="handleLogout">退出课堂</el-button>
    <div v-if="imgUrl">
      <img :src="imgUrl" alt="">
    </div>
    <div v-else>模拟黑板投屏</div>
  </div>
</template>

<script>

import io from 'socket.io-client'
import { stuOnline, stuOffline } from '@/api/student'
export default {
  name: 'Student',
  data() {
    return {
      socket: io('ws://127.0.0.1:9526'),
      imgUrl: '',
      curRoute: '',
      curId: '',
      students: []
    }
  },
  created() {
    this.curId = this.$route.params && this.$route.params.id
  },
  mounted() {
    // debugger
    // 学生上线 通知老师查询列表
    if (this.isIn(this.curId) > -1) {
      console.log('该学生已上线')
    } else {
      const student = {
        id: this.curId,
        name: this.curId
      }
      this.students.push(student)
      stuOnline(student).then(res => {
        console.log('学生上线')
        this.socket.emit('login')
      })
    }
    // this.$store.dispatch('classroom/stuOnline', {
    //   id: this.curId,
    //   name: this.curId
    // })
    this.socket.on('draw', data => {
      this.imgUrl = data
    })
  },
  activated() {
    console.log('activated')
  },
  beforeDestroy() {
    // 下线
    // debugger
    // this.$store.dispatch('classroom/stuOffline', this.curId)
    stuOffline({ id: this.curId })
    this.socket.disconnect(true)

    // this.socket.emit('logout', {
    //   id: this.curId
    // })
  },
  methods: {
    // 判断该学生是否已存在
    isIn(id) {
      return this.students.findIndex((student) => {
        return student.id === id
      })
    },
    handleLogout() {
      // 此时用 http 无法告知教师端刷新学生数据
      // 因此采用 socket 通知下线
      this.socket.emit('logout', {
        id: this.curId
      })
      stuOffline({ id: this.curId })
      window.close()
      // 关闭当前页签
      // this.$store.dispatch('tagsView/delView', this.curRoute)
    }
  }
}
</script>
<style>
  img {
    background-color: black;
  }
</style>
