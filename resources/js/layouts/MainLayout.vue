<template>
  <div class="main-layout">
    <Navbar />
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'MainLayout',
  components: {
    Navbar
  }
};
</script>

<style lang="scss" scoped>
.main-layout {
  min-height: 100vh;
  background: #f9fafb;
}

.main-content {
  padding-top: 64px; // Высота навбара
  min-height: calc(100vh - 64px);
}
</style> 