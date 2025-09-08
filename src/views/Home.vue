<template>
  <div class="home">
    <!-- 横幅 -->
    <section class="banner">
      <h1>欢迎来到 计E体育</h1>
      <p>这里是校园体育赛事的发布、报名与交流平台</p>
      <el-button type="primary" size="large" @click="$router.push('/eventdoc')">
        查看活动
      </el-button>
    </section>

    <!-- 活动推荐 -->
    <h2>热门活动</h2>
    <div class="events">
      <div
        class="events-scroller"
        ref="eventsScroller"
        @wheel.prevent="onWheelWithMomentum"
      >
        <div class="events-track">
          <div class="event-item" v-for="event in hotEvents" :key="event.id">
            <el-card shadow="hover" class="event-card">
              <img :src="event.cover" class="event-img" />
              <h3>{{ event.title }}</h3>
              <p>{{ event.desc }}</p>
              <el-button
                type="primary"
                link
                @click="$router.push(`/events/${event.id}`)"
              >
                查看详情
              </el-button>
            </el-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const hotEvents = ref([
  {
    id: 1,
    title: "春季篮球赛",
    desc: "报名截止时间：3月20日",
    cover: "../public/images/1.jpg",
  },
  {
    id: 2,
    title: "校园马拉松",
    desc: "报名截止时间：4月5日",
    cover: "../public/images/1.jpg",
  },
  {
    id: 3,
    title: "足球友谊赛",
    desc: "报名截止时间：4月15日",
    cover: "../public/images/1.jpg",
  },
  {
    id: 4,
    title: "足球小院赛",
    desc: "报名截止时间：5月15日",
    cover: "../public/images/1.jpg",
  },
  {
    id: 5,
    title: "羽毛球赛",
    desc: "即将开始",
    cover: "../public/images/1.jpg",
  },
  {
    id: 6,
    title: "乒乓球赛",
    desc: "火热报名中",
    cover: "../public/images/1.jpg",
  },
  { id: 7, title: "排球赛", desc: "敬请期待", cover: "../public/images/1.jpg" },
  {
    id: 8,
    title: "棋类联赛",
    desc: "周末开赛",
    cover: "../public/images/1.jpg",
  },
]);

// 丝滑惯性横向滚动
const eventsScroller = ref(null);
let animationFrameId = 0;
let targetLeft = 0;
let isAnimating = false;

const animate = () => {
  if (!eventsScroller.value) return;
  const el = eventsScroller.value;
  const current = el.scrollLeft;
  const distance = targetLeft - current;
  const next = current + distance * 0.15;
  el.scrollLeft = next;
  if (Math.abs(distance) > 0.5) {
    animationFrameId = requestAnimationFrame(animate);
    isAnimating = true;
  } else {
    el.scrollLeft = targetLeft;
    cancelAnimationFrame(animationFrameId);
    isAnimating = false;
  }
};

const onWheelWithMomentum = (e) => {
  const el = eventsScroller.value;
  if (!el) return;
  const maxLeft = el.scrollWidth - el.clientWidth;
  targetLeft = Math.max(0, Math.min(maxLeft, targetLeft + e.deltaY * 0.9));
  if (!isAnimating) animate();
};

onMounted(() => {
  if (eventsScroller.value) targetLeft = eventsScroller.value.scrollLeft;
  play();
});

onBeforeUnmount(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  pause();
});
</script>

<style scoped>
.home {
  padding: 20px;
}

/* 横幅 */
.banner {
  text-align: center;
  padding: 80px 20px;
  background: linear-gradient(135deg, #409eff, #66b1ff);
  color: white;
  border-radius: 12px;
  margin-bottom: 40px;
}

.banner h1 {
  font-size: 36px;
  margin-bottom: 16px;
}

.banner p {
  font-size: 18px;
  margin-bottom: 24px;
}

/* 活动推荐 */
.events {
  margin-bottom: 40px;
}
/* 外层横向滚动容器 */
.events-scroller {
  overflow-x: auto;
  overflow-y: hidden; /* 使用更大的上下内边距来避免裁剪 */
  padding: 30px 20px 30px 30px; /* 上下留白让放大/上浮不越界被裁剪 */
  scroll-snap-type: x proximity;
  -ms-overflow-style: none;
  scrollbar-width: none;
  overscroll-behavior-x: contain;
}
.events-scroller::-webkit-scrollbar {
  height: 0; /* 隐藏滚动条 */
}

/* 轨道与卡片（重叠 + hover 层叠效果）*/
.events-track {
  display: flex;
  align-items: stretch;
}
.event-item {
  flex: 0 0 auto;
  width: 320px; /* 略加宽，默认间距更舒展 */
  transition: transform 250ms ease;
  will-change: transform;
}
/* 形成重叠效果：减小负间距，拉开基础距离 */
.event-item:not(:first-child) {
  margin-left: -110px;
}
/* Hover 当前卡片上浮并稍微放大 */
.event-item:hover {
  z-index: 3;
}
.event-item:hover .event-card {
  transform: translateY(-12px) scale(1.06);
}
/* 让后续兄弟卡片依次向右偏移，形成层叠错落 */
.event-item:hover ~ .event-item {
  transform: translateX(110px);
}

/* 卡片质感与阴影（默认轻微 + hover 加深，多层阴影）*/
.event-card {
  position: relative; /* 阴影独立渲染 */
  border-radius: 12px;
  overflow: visible; /* 防止阴影、放大被裁剪 */
  width: 100%;
  text-align: center;
  background: #ffffff;
  transition: transform 300ms ease, box-shadow 300ms ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.16), 0 10px 20px rgba(0, 0, 0, 0.44);
}
.event-card:hover {
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.28), 0 18px 36px rgba(0, 0, 0, 0.24);
}

.event-img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  margin-bottom: 12px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}
</style>

