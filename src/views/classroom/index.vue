<template>
  <div class="classroom-container">
    <div>
      <div>
        <router-link target="_blank" to="/classroom/teacher">
          <svg-icon icon-class="education" />老师入口
        </router-link>
      </div>
      <div>
        <router-link target="_blank" to="/classroom/student/1">
          <svg-icon icon-class="people" />学生1入口
        </router-link>
        <router-link target="_blank" to="/classroom/student/2">
          <svg-icon icon-class="people" />学生2入口
        </router-link>
        <router-link target="_blank" to="/classroom/student/3">
          <svg-icon icon-class="people" />学生3入口
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Classroom',
  data() {
    return {
    }
  },
  created() {

  },
  methods: {
    testPatn() {
      window.open('/student/1', '_blank')
    }
  }
}
</script>
