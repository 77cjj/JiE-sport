<template>
  <div class="not-found">
    <div class="content">
      <h1>404</h1>
      <p>抱歉，您访问的页面不存在或已被移动。</p>
      <el-button type="primary" @click="goHome">返回首页</el-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => {
  router.push("/home");
};
</script>

<style scoped>
.not-found {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7fa;
  text-align: center;
}

.content {
  padding: 40px 60px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.content h1 {
  font-size: 72px;
  margin: 0 0 16px;
  color: #409eff;
}

.content p {
  margin-bottom: 24px;
  color: #606266;
}
</style>

