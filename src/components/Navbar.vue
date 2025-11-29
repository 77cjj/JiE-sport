<template>
  <div class="navbar-wrapper">
    <header class="navbar">
      <div class="navbar-container">
        <!-- Logo -->
        <div class="logo" @click="$router.push('/home')">
          计E体育
        </div>
        
        <!-- PC端导航菜单 -->
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
        
        <!-- 移动端汉堡菜单图标 -->
        <div class="hamburger-menu" @click="drawerVisible = true">
          <el-icon :size="24">
            <Menu />
          </el-icon>
        </div>
        
        <!-- 用户头像 -->
        <el-dropdown trigger="click" @command="handleCommand" class="user-dropdown">
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

    <!-- 移动端侧边抽屉导航 - 移到 header 外面 -->
    <el-drawer
      v-model="drawerVisible"
      title="菜单"
      direction="ltr"
      :size="280"
      class="mobile-drawer"
      :z-index="2000"
    >
    <!-- 用户信息区 -->
    <div class="drawer-user-info">
      <el-avatar
        :size="60"
        src="https://www.gravatar.com/avatar?d=identicon"
      />
      <div class="user-details">
        <div class="user-name">{{ userStore.fullName }}</div>
        <div class="user-info-text">{{ userStore.userDisplayInfo }}</div>
      </div>
    </div>

    <!-- 导航菜单 -->
    <el-menu
      :default-active="activeMenu"
      class="drawer-menu"
      @select="handleMenuSelect"
    >
      <el-menu-item index="/home">
        <el-icon><HomeFilled /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/eventdoc">
        <el-icon><Document /></el-icon>
        <span>活动文档</span>
      </el-menu-item>
      <el-menu-item index="/registration">
        <el-icon><Edit /></el-icon>
        <span>报名入口</span>
      </el-menu-item>
      <el-menu-item index="/profile">
        <el-icon><User /></el-icon>
        <span>个人主页</span>
      </el-menu-item>
    </el-menu>

    <!-- 底部操作按钮 -->
    <div class="drawer-footer">
      <el-button type="danger" plain @click="handleLogoutFromDrawer" style="width: 100%">
        <el-icon><SwitchButton /></el-icon>
        <span>退出登录</span>
      </el-button>
    </div>
  </el-drawer>

  <!-- 回到顶部按钮 -->
  <transition name="fade">
    <div 
      v-show="showBackToTop" 
      class="back-to-top"
      @click="scrollToTop"
    >
      <el-icon :size="24">
        <Top />
      </el-icon>
    </div>
  </transition>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, watch, onMounted, onUnmounted } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { Menu, HomeFilled, Document, Edit, User, SwitchButton, Top } from "@element-plus/icons-vue";
import { useUserStore } from "@/stores/userStore";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const menuIndexes = ["/home", "/eventdoc", "/registration", "/profile"];

// 控制移动端抽屉显示
const drawerVisible = ref(false);

// 控制回到顶部按钮显示
const showBackToTop = ref(false);

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

// 处理移动端菜单选择
const handleMenuSelect = (index) => {
  router.push(index);
  drawerVisible.value = false; // 选择后关闭抽屉
};

// 处理下拉菜单命令
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

// 从抽屉中退出登录
const handleLogoutFromDrawer = async () => {
  try {
    await ElMessageBox.confirm("确定要退出当前账号吗？", "退出登录", {
      confirmButtonText: "退出",
      cancelButtonText: "取消",
      type: "warning",
    });
    userStore.logout();
    ElMessage.success("已退出登录");
    drawerVisible.value = false;
    router.push("/login");
  } catch (_) {
    // 用户取消
  }
};

// ==================== 回到顶部功能 ====================
// 监听页面滚动
const handleScroll = () => {
  // 当滚动超过 300px 时显示按钮
  showBackToTop.value = window.scrollY > 300;
};

// 平滑滚动到顶部
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// 生命周期钩子
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
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

/* 汉堡菜单图标 - 默认隐藏 */
.hamburger-menu {
  display: none;
  cursor: pointer;
  padding: 8px;
  margin-right: 12px;
  color: #409eff;
  transition: all 0.3s;
  border-radius: 6px;
}

.hamburger-menu:hover {
  background: rgba(64, 158, 255, 0.1);
  transform: scale(1.1);
}

.hamburger-menu:active {
  transform: scale(0.95);
}

/* ==================== 移动端抽屉样式 ==================== */
.mobile-drawer :deep(.el-drawer__header) {
  margin-bottom: 20px;
  padding: 20px;
  border-bottom: 1px solid #e6e9f0;
}

.mobile-drawer :deep(.el-drawer__body) {
  padding: 0;
  display: flex;
  flex-direction: column;
}

/* 抽屉用户信息区 */
.drawer-user-info {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: linear-gradient(135deg, #409eff, #66b1ff);
  color: white;
  margin-bottom: 10px;
}

.user-details {
  flex: 1;
}

.user-name {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
}

.user-info-text {
  font-size: 13px;
  opacity: 0.9;
}

/* 抽屉菜单 */
.drawer-menu {
  flex: 1;
  border: none;
  padding: 10px;
}

.drawer-menu :deep(.el-menu-item) {
  height: 50px;
  line-height: 50px;
  margin-bottom: 8px;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.3s;
}

.drawer-menu :deep(.el-menu-item:hover) {
  background: rgba(64, 158, 255, 0.1);
}

.drawer-menu :deep(.el-menu-item.is-active) {
  background: rgba(64, 158, 255, 0.15);
  color: #409eff;
  font-weight: 600;
}

.drawer-menu :deep(.el-icon) {
  margin-right: 12px;
  font-size: 18px;
}

/* 抽屉底部 */
.drawer-footer {
  padding: 20px;
  border-top: 1px solid #e6e9f0;
}

.drawer-footer .el-button {
  height: 44px;
  font-size: 15px;
}

.drawer-footer .el-icon {
  margin-right: 8px;
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
    position: absolute; /* 移动端改为绝对定位，随页面滚动 */
  }
  
  .navbar-container {
    padding: 0 16px;
  }
  
  .logo {
    font-size: 18px;
    margin-right: auto;
    flex: 1;
  }
  
  /* 移动端隐藏PC菜单 */
  .nav-menu {
    display: none;
  }
  
  /* 移动端显示汉堡菜单图标 */
  .hamburger-menu {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  /* 移动端隐藏用户头像 */
  .user-dropdown {
    display: none;
  }
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
  
  .hamburger-menu {
    margin-right: 8px;
  }
}

/* ==================== 回到顶部按钮 ==================== */
.back-to-top {
  position: fixed;
  right: 30px;
  bottom: 50px;
  z-index: 1500;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #409eff;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.4);
  transition: all 0.3s ease;
}

.back-to-top:hover {
  background: #66b1ff;
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(64, 158, 255, 0.5);
}

.back-to-top:active {
  transform: translateY(-2px);
}

/* 移动端回到顶部按钮调整 */
@media (max-width: 768px) {
  .back-to-top {
    right: 20px;
    bottom: 80px;
    width: 44px;
    height: 44px;
  }
}

@media (max-width: 480px) {
  .back-to-top {
    right: 16px;
    bottom: 70px;
    width: 40px;
    height: 40px;
  }
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px) scale(0.9);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.9);
}
</style>



