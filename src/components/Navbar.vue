<template>
  <header class="navbar">
    <div class="navbar-container">
      <!-- Logo -->
      <div class="logo" @click="$router.push('/home')">
        计E体育
      </div>
      
      <!-- 导航菜单 -->
      <el-menu
        mode="horizontal"
        :default-active="activeMenu"
        router
        class="nav-menu"
      >
        <el-menu-item index="/home">首页</el-menu-item>
        <el-menu-item index="/eventdoc">活动文档</el-menu-item>
        <el-menu-item index="/registration">报名入口</el-menu-item>
        <el-menu-item index="/profile">个人主页</el-menu-item>
      </el-menu>
      
      <!-- 用户头像 -->
      <el-dropdown trigger="click" @command="handleCommand">
        <div class="user-avatar">
          <el-avatar
            size="default"
            src="https://www.gravatar.com/avatar?d=identicon"
          />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="profile">个人主页</el-dropdown-item>
            <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, watch } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { useUserStore } from "@/stores/userStore";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const menuIndexes = ["/home", "/eventdoc", "/registration", "/profile"];

const resolveActive = (path) => {
  const match = menuIndexes.find(
    (index) => path === index || path.startsWith(`${index}/`)
  );
  return match || path;
};

const activeMenu = ref(resolveActive(route.path));

// 监听路由变化，更新导航高亮
watch(
  () => route.path,
  (newPath) => {
    activeMenu.value = resolveActive(newPath);
  },
  { immediate: true }
);

const handleCommand = async (command) => {
  if (command === "profile") {
    router.push("/profile");
    return;
  }
  if (command === "logout") {
    try {
      await ElMessageBox.confirm("确定要退出当前账号吗？", "退出登录", {
        confirmButtonText: "退出",
        cancelButtonText: "取消",
        type: "warning",
      });
      userStore.logout();
      ElMessage.success("已退出登录");
      router.push("/login");
    } catch (_) {
      // 用户取消
    }
  }
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 64px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px) saturate(150%);
  -webkit-backdrop-filter: blur(10px) saturate(150%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  padding: 0;
}

.navbar-container {
  max-width: 1400px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
}

.logo {
  font-size: 22px;
  font-weight: bold;
  color: #409eff;
  cursor: pointer;
  user-select: none;
  transition: color 0.3s;
  margin-right: 40px;
}

.logo:hover {
  color: #66b1ff;
}

.nav-menu {
  flex: 1;
  display: flex;
  justify-content: center;
  background: transparent;
  border: none;
}

.nav-menu :deep(.el-menu-item) {
  font-size: 15px;
  padding: 0 20px;
  border-bottom: none;
}

.nav-menu :deep(.el-menu-item:hover) {
  background: rgba(64, 158, 255, 0.08);
}

.nav-menu :deep(.el-menu-item.is-active) {
  border-bottom: 2px solid #409eff;
  color: #409eff;
  font-weight: 500;
}

.user-avatar {
  margin-left: 20px;
  cursor: pointer;
  transition: transform 0.3s;
}

.user-avatar:hover {
  transform: scale(1.1);
}

/* ==================== 移动端适配 ==================== */
/* 平板适配 */
@media (max-width: 1024px) {
  .navbar-container {
    padding: 0 20px;
  }
  
  .logo {
    margin-right: 20px;
    font-size: 20px;
  }
  
  .nav-menu :deep(.el-menu-item) {
    padding: 0 15px;
    font-size: 14px;
  }
}

/* 移动端适配 - 768px以下 */
@media (max-width: 768px) {
  .navbar {
    height: 56px;
  }
  
  .navbar-container {
    padding: 0 16px;
  }
  
  .logo {
    font-size: 18px;
    margin-right: 10px;
  }
  
  /* 移动端隐藏菜单，显示汉堡菜单图标 */
  .nav-menu {
    display: none;
  }
  
  /* TODO: 移动端需要添加汉堡菜单和侧边抽屉导航 */
  /* .hamburger-menu { display: block; } */
}

/* 小屏移动端适配 */
@media (max-width: 480px) {
  .logo {
    font-size: 16px;
  }
  
  .user-avatar :deep(.el-avatar) {
    width: 32px;
    height: 32px;
  }
}
</style>



