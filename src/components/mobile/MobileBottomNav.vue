<!-- 
  移动端底部导航栏组件（预留）
  用于移动端底部Tab导航
  如需启用，请在 DefaultLayout.vue 中取消注释相关代码
-->
<template>
  <nav class="mobile-bottom-nav">
    <div
      v-for="item in navItems"
      :key="item.path"
      class="nav-item"
      :class="{ active: isActive(item.path) }"
      @click="navigateTo(item.path)"
    >
      <span class="nav-icon">{{ item.icon }}</span>
      <span class="nav-label">{{ item.label }}</span>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// 导航项配置
const navItems = ref([
  { path: '/home', label: '首页', icon: '🏠' },
  { path: '/eventdoc', label: '文档', icon: '📄' },
  { path: '/registration', label: '报名', icon: '✍️' },
  { path: '/profile', label: '我的', icon: '👤' }
]);

// 判断是否为当前激活路由
const isActive = (path) => {
  return route.path.startsWith(path);
};

// 导航跳转
const navigateTo = (path) => {
  router.push(path);
};
</script>

<style scoped>
.mobile-bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.04);
  padding: 0 8px;
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
  cursor: pointer;
  transition: all 0.3s;
  color: #909399;
  user-select: none;
}

.nav-icon {
  font-size: 22px;
  margin-bottom: 4px;
  transition: all 0.3s;
}

.nav-label {
  font-size: 11px;
  transition: all 0.3s;
}

/* 激活状态 */
.nav-item.active {
  color: #409eff;
}

.nav-item.active .nav-icon {
  transform: scale(1.15);
}

.nav-item.active .nav-label {
  font-weight: 600;
}

/* 点击效果 */
.nav-item:active {
  transform: scale(0.95);
}
</style>




