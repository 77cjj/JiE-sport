<template>
  <div class="layout">
    <Navbar />
    <main class="content with-navbar-offset">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
</script>

<style scoped>
.div {
  display: flex;
  flex-direction: column;
  height: 100%;
}
main {
  flex: 1;
}
/* 预留与固定导航相同的高度（64px）并稍加余量避免贴边 */
.with-navbar-offset {
  padding-top: 64px;
}
</style>
