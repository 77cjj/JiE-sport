<template>
  <div class="layout">
    <!-- ==================== 顶部导航区域 ==================== -->
    <!-- PC端和移动端共用导航栏 -->
    <Navbar />
    
    <!-- TODO: 移动端专用顶部栏（可选）
    <MobileTopBar v-if="isMobile" />
    -->
    
    <!-- ==================== 主内容区域 ==================== -->
    <main class="main-content">
      <router-view :key="$route.fullPath" />
    </main>
    
    <!-- ==================== 底部区域 ==================== -->
    <!-- TODO: 移动端底部导航栏（可选）
    <MobileBottomNav v-if="isMobile" />
    -->
    
    <!-- PC端页脚 -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

// TODO: 移动端组件导入（预留）
// import MobileTopBar from "@/components/mobile/MobileTopBar.vue";
// import MobileBottomNav from "@/components/mobile/MobileBottomNav.vue";

// ==================== 响应式检测 ====================
// 检测是否为移动端（预留）
const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});
</script>

<style scoped>
/* ==================== PC端布局 ==================== */
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background: #fafbfc;
}

.main-content {
  flex: 1;
  width: 100%;
  /* PC端：预留顶部导航栏高度 64px */
  padding-top: 64px;
  min-height: calc(100vh - 64px);
  transition: padding 0.3s ease;
}

/* ==================== 移动端布局 ==================== */
/* 平板适配 (768px - 1024px) */
@media (max-width: 1024px) and (min-width: 769px) {
  .main-content {
    padding-top: 64px;
  }
}

/* 移动端适配 (≤768px) */
@media (max-width: 768px) {
  .layout {
    background: #f5f7fa;
  }
  
  .main-content {
    /* 移动端：预留顶部导航栏高度 56px */
    padding-top: 56px;
    min-height: calc(100vh - 56px);
    
    /* TODO: 如果有底部导航栏，取消注释 */
    /* padding-bottom: 60px; */
    /* min-height: calc(100vh - 116px); */
  }
}

/* 小屏移动端适配 (≤480px) */
@media (max-width: 480px) {
  .main-content {
    padding-top: 56px;
  }
}

/* ==================== 移动端底部导航预留空间 ==================== */
/* TODO: 移动端底部导航栏启用时取消注释
@media (max-width: 768px) {
  .main-content {
    padding-bottom: 60px;
    min-height: calc(100vh - 116px);
  }
}
*/
</style>
