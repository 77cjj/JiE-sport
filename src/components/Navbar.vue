<template>
  <el-header class="navbar">
    <div class="logo">计E体育</div>
    <el-menu
      mode="horizontal"
      :default-active="activeMenu"
      router
      class="nav-menu"
    >
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/eventdoc">活动文档</el-menu-item>
      <el-menu-item index="/registration">报名入口</el-menu-item>
      <el-menu-item index="/profile">个人主页</el-menu-item>
    </el-menu>
    <div class="user-avatar">
      <el-avatar
        size="medium"
        src="https://www.gravatar.com/avatar?d=identicon"
      />
    </div>
  </el-header>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, watch } from "vue";

const route = useRoute();
const activeMenu = ref(route.path);

// 监听路由变化，更新导航高亮
watch(
  () => route.path,
  (newPath) => {
    activeMenu.value = newPath;
  }
);
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px) saturate(150%);
  -webkit-backdrop-filter: blur(10px) saturate(150%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.35);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.logo {
  font-size: 20px;
  font-weight: bold;
  margin-right: 40px;
}

.nav-menu {
  flex: 1;
  display: flex;
  justify-content: center; /* 居中菜单项 */
  background: transparent; /* 透明以配合毛玻璃 */
}

.user-avatar {
  margin-left: 20px;
}
</style>
