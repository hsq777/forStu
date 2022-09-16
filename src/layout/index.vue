<template>
  <div class="app-wrapper">
    <section class="app-main">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <router-view :key="key" />
        </keep-alive>
      </transition>
    </section>
  </div>
</template>

<script>

export default {
  name: 'Layout',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }

  .app-main {
    width: 100%;
    position: relative;
    overflow: hidden;
  }

</style>
