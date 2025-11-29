<script setup>
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();

const docs = [
  { id: "overview", title: "各类活动历年时间线一览" },
  { id: "sportsMeeting", title: "运动会文档" },
  { id: "smallSoccer", title: "足球小院赛文档" },
  { id: "bigSoccer", title: "足球大院赛文档" },
  { id: "smallBasketball", title: "篮球新生赛文档" },
  { id: "bigBasketball", title: "篮球大院赛文档" },
  { id: "smallBadminton", title: "羽毛球迎新赛文档" },
  { id: "bigBadminton", title: "羽毛球大院赛文档" },
  { id: "bigWoodball", title: "木球大院赛文档" },
  { id: "bigTableTennis", title: "乒乓球大院赛文档" },
];
</script>

<template>
  <aside class="left-nav">
    <div class="section-title">文章列表</div>
    <ul class="nav-items">
      <li
        v-for="doc in docs"
        :key="doc.id"
        :class="{
          active:
            doc.id === route.params.id ||
            (!route.params.id && doc.id === 'overview'),
        }"
      >
        <RouterLink :to="`/eventdoc/${doc.id}`">{{ doc.title }}</RouterLink>
      </li>
    </ul>
  </aside>
</template>

<style scoped>
.left-nav {
  position: sticky;
  top: 80px;
  align-self: flex-start;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  border-right: 1px solid #e6e9f0;
  padding-right: 12px;
  padding-bottom: 12px;
  background: rgba(250, 251, 255, 0.9);
}
.left-nav::-webkit-scrollbar {
  width: 6px;
}
.left-nav::-webkit-scrollbar-thumb {
  background: rgba(30, 64, 175, 0.2);
  border-radius: 4px;
}
.left-nav::-webkit-scrollbar-track {
  background: transparent;
}
.section-title {
  font-size: 13px;
  color: #7a8394;
  margin-bottom: 12px;
}
.nav-items {
  list-style: none;
  padding: 0;
  margin: 0;
}
.nav-items li {
  margin-bottom: 8px;
  transition: transform 0.15s, background 0.2s;
  border-radius: 8px;
}
.nav-items li a {
  display: block;
  padding: 6px 10px;
  color: #4a5568;
  text-decoration: none;
  border-radius: 8px;
  transition: color 0.2s;
}
.nav-items li.active a {
  color: #3990fb; /* 蓝色文字 */
  background: #e0f0ff; /* 淡蓝色背景 */
  font-weight: 600;
}
.nav-items li:hover {
  transform: scale(0.98);
}
.nav-items li:hover a {
  color: #3990fb;
}
</style>
