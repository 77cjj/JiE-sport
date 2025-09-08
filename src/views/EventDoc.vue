<template>
  <div class="doc-page">
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
      const fakeDb = {
        overview: `
# 各类活动历年时间一览

以下文档包括体育部承办和对接的若干活动，列有大致报名时间、比赛时间、比赛性质等。

## 足球小院赛
**时间**：9月中旬报名，10月中旬比赛，一年一度  
**对象**：大一新生
院内需经过一轮选拔确认人员名单（共19），有机会获得人文分综合分等奖励

## 足球大院赛
**时间**：1月报名，3月比赛  
**对象**：本科生与研究生
由小院赛中表现较好的同学中挑选出15名进行校内对战

## 篮球新生赛
**时间**：9月报名，10月比赛  
**对象**：大一新生
计算机学院各班组成球队，进行班级对战

## 运动会
`,

        soccer: "# 足球赛事\n\n这里是足球赛事的内容",
        basketball: "# 篮球赛事\n\n这里是篮球赛事的内容",
        sportsMeeting: `# 运动会
        
参与运动会有机会获得丰厚物质奖励
比赛项目获得名次可为学院加分，每分100元！

### 项目介绍
- 田赛类：铅球、铁饼、实心球、跳高、跳远
- 径赛类：100m、200m、400m、800m、1500m、5000m、110m栏、400m栏、接力
**计分方法**：按 9、7、6、5、4、3、2、1 计分，接力与全能项目按单项 2 倍计分
        
# 径赛类项目
## 100m
历届男子前八名稳定在12.3s 女子前八名稳定在15s
男生若可以达到12.8s水平都可以报名尝试
女生若跑进15.5s都可以报名尝试
100m属于短跑类项目，容易受伤，确保比赛前做好热身活动。
100m项目分为预赛和决赛，挑选前八名进入决赛进入第二轮比赛。
苏炳添、吴艳妮们，快来踊跃报名吧！
# 田赛类项目
## 实心球
假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容
## 铅球
假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容
假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容

## 铁饼
假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容
假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容

## 跳高
假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容
假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容


## 跳远
假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容
假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容假装有内容

## 


        `,
      };
      resolve(fakeDb[id] || "# 文章不存在");
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

/* 右侧目录固定 */
.RightContent {
  position: fixed;
  top: 80px; /* 顶部导航高度 + margin */
  right: 4px;
  width: 220px;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  border-left: 1px solid #e6e9f0;
  padding-left: 16px;
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
    padding: 12px 16px;
  }
  .left-nav {
    display: none;
  }
}
</style>
