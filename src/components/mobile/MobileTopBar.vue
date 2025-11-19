<!-- 
  移动端顶部栏组件（预留）
  用于移动端独立的顶部导航栏
  如需启用，请在 DefaultLayout.vue 中取消注释相关代码
-->
<template>
  <header class="mobile-top-bar">
    <div class="left">
      <i class="menu-icon">☰</i>
    </div>
    
    <div class="center">
      <span class="title">计E体育</span>
    </div>
    
    <div class="right">
      <el-avatar
        size="small"
        src="https://www.gravatar.com/avatar?d=identicon"
      />
    </div>
  </header>
</template>

<script setup>
// 移动端顶部栏逻辑
</script>

<style scoped>
.mobile-top-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.left, .right {
  flex: 1;
}

.center {
  flex: 2;
  text-align: center;
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #409eff;
}

.menu-icon {
  font-size: 24px;
  cursor: pointer;
}
</style>




