<template>
  <div class="classroom-container">
    <div>
      <div>
        <router-link to="/classroom/teacher">
          老师入口
        </router-link>
      </div>
      <div>
        <router-link to="/classroom/student/1">
          学生1入口
        </router-link>
        <router-link to="/classroom/student/2">
          学生2入口
        </router-link>
        <router-link to="/classroom/student/3">
          学生3入口
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

  }
}
</script>
