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
import { stuOnline, stuoOfline } from '@/api/student'
export default {
  name: 'Student',
  data() {
    return {
      socket: io('ws://127.0.0.1:9527'),
      imgUrl: '',
      tempRoute: {},
      curRoute: '',
      curId: ''
    }
  },
  created() {
    this.curId = this.$route.params && this.$route.params.id
    this.tempRoute = Object.assign({}, this.$route)
    this.setTagsViewTitle(this.curId)
  },
  mounted() {
    debugger
    this.$store.dispatch('student/stuOnline', {
      id: this.curId,
      name: this.curId
    })
    // stuOnline(student).then(res => {
    //   console.log('学生上线')
    // })
    this.socket.on('draw', data => {
      this.imgUrl = data
    })
    this.socket.emit('login')
  },
  beforeDestroy() {
    // 下线
    debugger
    this.$store.dispatch('student/stuOffline', this.curId)
    // stuoOfline({ id: this.curId })
    this.socket.disconnect(true)

    // this.socket.emit('logout', {
    //   id: this.curId
    // })
  },
  methods: {
    handleLogout() {
      // 此时用 http 无法告知教师端刷新学生数据
      // 因此采用 socket 通知下线
      this.socket.emit('logout', {
        id: this.curId
      })
      // 关闭当前页签
      this.$store.dispatch('tagsView/delView', this.curRoute)
    },
    setTagsViewTitle(id) {
      const title = 'student'
      this.curRoute = Object.assign({}, this.tempRoute, { title: `${title}-${id}` })
      this.$store.dispatch('tagsView/updateVisitedView', this.curRoute)
    }
  }
}
</script>
<style>
  img {
    background-color: black;
  }
</style>
