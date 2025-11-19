# 📱 布局系统使用说明

## 📂 文件结构

```
src/
├── Layouts/
│   └── DefaultLayout.vue          # 主布局容器（已预留移动端位置）
├── components/
│   ├── Navbar.vue                 # 响应式导航栏（PC端和移动端共用）
│   ├── Footer.vue                 # 页脚组件
│   └── mobile/                    # 移动端专用组件（预留）
│       ├── MobileTopBar.vue       # 移动端顶部栏（可选）
│       └── MobileBottomNav.vue    # 移动端底部导航（可选）
```

---

## 🎯 当前布局状态

### ✅ 已实现功能
- **响应式导航栏**：PC端和移动端自动适配
- **布局容器**：已预留移动端组件位置
- **响应式检测**：自动检测屏幕宽度切换布局
- **样式适配**：PC端、平板、移动端三种断点

### 📱 移动端预留位置
在 `DefaultLayout.vue` 中已预留以下位置：
1. **顶部区域**：可放置移动端专用顶部栏
2. **底部区域**：可放置移动端底部导航栏
3. **响应式逻辑**：`isMobile` 变量已声明，可直接使用

---

## 🚀 如何启用移动端组件

### 方式一：使用预留的移动端组件

#### 1. 在 `DefaultLayout.vue` 中启用移动端组件

**取消注释以下代码：**

```vue
<!-- 顶部区域 -->
<MobileTopBar v-if="isMobile" />

<!-- 底部区域 -->
<MobileBottomNav v-if="isMobile" />
```

**并添加导入：**

```javascript
import MobileTopBar from "@/components/mobile/MobileTopBar.vue";
import MobileBottomNav from "@/components/mobile/MobileBottomNav.vue";
```

#### 2. 调整样式预留空间

**如果启用底部导航栏，取消注释：**

```css
/* 在 DefaultLayout.vue 底部的样式中 */
@media (max-width: 768px) {
  .main-content {
    padding-bottom: 60px;
    min-height: calc(100vh - 116px);
  }
}
```

---

### 方式二：创建自定义移动端布局

#### 1. 创建新的移动端布局文件

```bash
src/Layouts/MobileLayout.vue
```

#### 2. 在路由中指定不同的布局

```javascript
// router/index.js
{
  path: '/mobile',
  component: () => import('@/Layouts/MobileLayout.vue'),
  children: [
    // 移动端专用路由
  ]
}
```

---

## 🎨 响应式断点

```css
/* PC端 (> 1024px) */
默认样式

/* 平板 (769px - 1024px) */
@media (max-width: 1024px) and (min-width: 769px)

/* 移动端 (≤ 768px) */
@media (max-width: 768px)

/* 小屏移动端 (≤ 480px) */
@media (max-width: 480px)
```

---

## 📏 布局高度说明

### PC端
- **导航栏高度**：64px
- **主内容区**：padding-top: 64px

### 移动端
- **顶部栏高度**：56px
- **底部导航高度**：60px（可选）
- **主内容区**：
  - 无底部导航：padding-top: 56px
  - 有底部导航：padding-top: 56px + padding-bottom: 60px

---

## 🔧 自定义配置

### 修改响应式断点

在 `DefaultLayout.vue` 中修改：

```javascript
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768; // 修改这个数值
};
```

### 修改导航栏高度

在相应组件的样式中修改：

```css
/* PC端 */
.navbar { height: 64px; }

/* 移动端 */
@media (max-width: 768px) {
  .navbar { height: 56px; }
}
```

---

## 📝 示例：启用完整移动端布局

### 1. 修改 `DefaultLayout.vue`

```vue
<template>
  <div class="layout">
    <!-- PC端导航 -->
    <Navbar v-if="!isMobile" />
    
    <!-- 移动端顶部栏 -->
    <MobileTopBar v-else />
    
    <!-- 主内容 -->
    <main class="main-content" :class="{ 'has-bottom-nav': isMobile }">
      <router-view :key="$route.fullPath" />
    </main>
    
    <!-- 移动端底部导航 -->
    <MobileBottomNav v-if="isMobile" />
    
    <!-- PC端页脚 -->
    <Footer v-if="!isMobile" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Navbar from "@/components/Navbar.vue";
import MobileTopBar from "@/components/mobile/MobileTopBar.vue";
import MobileBottomNav from "@/components/mobile/MobileBottomNav.vue";
import Footer from "@/components/Footer.vue";

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
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

.main-content {
  flex: 1;
  width: 100%;
  padding-top: 64px;
  min-height: calc(100vh - 64px);
}

@media (max-width: 768px) {
  .main-content {
    padding-top: 56px;
    min-height: calc(100vh - 56px);
  }
  
  .main-content.has-bottom-nav {
    padding-bottom: 60px;
    min-height: calc(100vh - 116px);
  }
}
</style>
```

---

## 🎉 完成！

现在你的布局系统已经完全预留好移动端位置，可以根据需要随时启用移动端组件。

### 当前状态
- ✅ PC端和移动端共用导航栏
- ✅ 响应式自动适配
- ✅ 移动端组件已创建（`src/components/mobile/`）
- ⏳ 移动端组件等待启用（注释状态）

### 下一步
根据项目需求，选择启用移动端专用组件或继续使用当前的响应式导航栏。




