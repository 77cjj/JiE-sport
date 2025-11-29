<template>
  <div class="doc-page">
    <!-- 移动端文档选择器 -->
    <MobileDocSelector />
    
    <!-- 左侧文章列表 -->
    <LeftNav class="left-nav" :docs="docList" />

    <!-- 中间正文 -->
    <main class="main">
      <div
        class="content markdown-body"
        v-if="renderedContent"
        v-html="renderedContent"
      ></div>
      <div v-else>加载中...</div>
    </main>

    <!-- 右侧目录 -->
    <RightContent class="RightContent" :content="renderedContent" />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import MarkdownIt from "markdown-it";
import LeftNav from "../components/LeftNav.vue";
import RightContent from "../components/RightContent.vue";
import MobileDocSelector from "../components/MobileDocSelector.vue";
import eventDocs from "../data/eventDocs.js";

const md = new MarkdownIt();
const renderedContent = ref("");
const route = useRoute();

// 模拟文章列表，用于左侧导航
const docList = ref([
  { id: "overview", title: "各类活动历年时间一览" },
  { id: "soccer", title: "足球赛事" },
  { id: "basketball", title: "篮球赛事" },
  { id: "sportsMeeting", title: "运动会" },
]);

// 模拟请求文章数据函数
function fetchDoc(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(eventDocs[id] || "# 文章不存在");
    }, 300); // 模拟网络延迟
  });
}

// 异步加载文章
async function loadDoc(id) {
  const content = await fetchDoc(id || "overview"); // 默认文章
  renderedContent.value = md.render(content);
}

// 监听路由变化
watch(
  () => route.params.id,
  (id) => loadDoc(id),
  { immediate: true }
);
</script>
<style scoped>
.doc-page {
  display: grid;
  grid-template-columns: 220px 1fr 200px;
  gap: 24px;
  padding: 16px 24px 40px;
  box-sizing: border-box;
  background: #fafbff;
  color: #2a2f37;
  min-height: 100vh;
}

/* 右侧目录 - 使用 grid 布局，不需要 fixed */
.RightContent {
  /* 移除 fixed 定位，让组件自身的 sticky 生效 */
  /* position: fixed; */
  /* top: 80px; */
  /* right: 4px; */
  width: 220px;
  /* RightContent 组件内部已经有 sticky 定位和 max-height 了 */
}

/* 左侧文章列表 */
.left-nav {
  border-right: 1px solid #e6e9f0;
  padding-right: 8px;
}

/* 中间正文 */
.main {
  min-height: 70vh;
}
.content {
  max-width: 860px;
  line-height: 1.7;
  font-size: 16px;
}
.content h1 {
  font-size: 28px;
  margin: 20px 0 12px;
}
.content h2 {
  font-size: 22px;
  margin: 24px 0 12px;
}
.content p {
  margin: 10px 0;
  color: #444;
}

/* ----------- 响应式部分 ----------- */

/* 小于 1200px 时，隐藏右侧目录，只保留左 + 中 */
@media (max-width: 1200px) {
  .doc-page {
    grid-template-columns: 220px 1fr;
  }
  .RightContent {
    display: none;
  }
}

/* 小于 768px 时，再隐藏左侧，只保留正文 */
@media (max-width: 768px) {
  .doc-page {
    grid-template-columns: 1fr;
    padding: 56px 16px 12px; /* 顶部留出 navbar 空间，左右保持 padding */
    position: relative;
  }
  .left-nav {
    display: none;
  }
  
  /* 让选择器紧贴在 navbar 下方，并且全宽 */
  .doc-page > :first-child {
    margin-top: -56px; /* 向上移动到 navbar 下方 */
    margin-left: -16px; /* 突破左侧 padding */
    margin-right: -16px; /* 突破右侧 padding */
    width: calc(100% + 32px); /* 补偿左右 margin */
  }
}
</style>
