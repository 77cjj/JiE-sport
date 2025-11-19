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
                @click="showEventDetail(event)"
              >
                查看详情
              </el-button>
            </el-card>
          </div>
        </div>
      </div>
    </div>

    <!-- 活动详情弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="selectedEvent?.title"
      width="600px"
      :before-close="handleClose"
      class="event-dialog"
      align-center
    >
      <div v-if="selectedEvent" class="event-detail">
        <!-- 活动封面 -->
        <div class="detail-cover">
          <img :src="selectedEvent.cover" alt="活动封面" />
        </div>
        
        <!-- 活动信息 -->
        <div class="detail-info">
          <div class="info-item">
            <el-icon><Calendar /></el-icon>
            <span>{{ selectedEvent.date }}</span>
          </div>
          <div class="info-item">
            <el-icon><Location /></el-icon>
            <span>{{ selectedEvent.location }}</span>
          </div>
          <div class="info-item">
            <el-icon><User /></el-icon>
            <span>{{ selectedEvent.participants }}</span>
          </div>
        </div>

        <!-- 活动描述 -->
        <div class="detail-description">
          <h4>活动简介</h4>
          <p>{{ selectedEvent.description }}</p>
        </div>

        <!-- 活动亮点 -->
        <div class="detail-highlights">
          <h4>活动亮点</h4>
          <ul>
            <li v-for="(highlight, index) in selectedEvent.highlights" :key="index">
              {{ highlight }}
            </li>
          </ul>
        </div>

        <!-- 操作按钮 -->
        <div class="detail-actions">
          <el-button 
            type="primary" 
            size="large" 
            @click="goToRegistration"
            :icon="Edit"
          >
            立即报名
          </el-button>
          <el-button 
            size="large" 
            @click="handleClose"
          >
            稍后再看
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { Calendar, Location, User, Edit } from '@element-plus/icons-vue';

const router = useRouter();

// 弹窗控制
const dialogVisible = ref(false);
const selectedEvent = ref(null);

// 活动数据（包含完整信息）
const hotEvents = ref([
  {
    id: 1,
    title: "春季篮球赛",
    desc: "报名截止时间：3月20日",
    cover: "../public/images/1.jpg",
    date: "2025年3月25日 - 4月10日",
    location: "校体育馆篮球场",
    participants: "5人制，限额16支队伍",
    description: "春季篮球赛是学校最具影响力的体育赛事之一，旨在增强学生体质，培养团队精神，丰富校园文化生活。比赛采用淘汰赛制，为期两周。",
    highlights: [
      "🏆 冠军队伍可获得奖金及荣誉证书",
      "🎖️ 表现优异者有机会入选校队",
      "📸 全程专业摄影记录精彩瞬间",
      "🎁 所有参赛队员均可获得纪念品"
    ]
  },
  {
    id: 2,
    title: "校园马拉松",
    desc: "报名截止时间：4月5日",
    cover: "../public/images/1.jpg",
    date: "2025年4月10日 上午8:00",
    location: "校园环形跑道（全程5公里）",
    participants: "个人赛，不限人数",
    description: "校园马拉松是一项全校性的长跑活动，鼓励全体师生参与，提倡健康生活方式，挑战自我极限。赛道环绕校园最美风景线。",
    highlights: [
      "🏃 完赛者均可获得完赛奖牌",
      "⏱️ 前10名选手获得特别奖励",
      "💧 全程补给站提供能量补给",
      "🎵 赛道沿途设置音乐加油站"
    ]
  },
  {
    id: 3,
    title: "足球友谊赛",
    desc: "报名截止时间：4月15日",
    cover: "../public/images/1.jpg",
    date: "2025年4月20日 - 4月30日",
    location: "校足球场",
    participants: "11人制，限额12支队伍",
    description: "足球友谊赛是促进各学院交流的重要平台，以友谊第一、比赛第二为宗旨，在绿茵场上挥洒青春汗水，展现团队协作精神。",
    highlights: [
      "⚽ 提供专业裁判和比赛用球",
      "🥇 设置最佳射手、最佳守门员等单项奖",
      "🎪 决赛现场设置观众互动环节",
      "📺 比赛全程线上直播"
    ]
  },
  {
    id: 4,
    title: "足球小院赛",
    desc: "报名截止时间：5月15日",
    cover: "../public/images/1.jpg",
    date: "2025年5月20日 - 6月5日",
    location: "各学院足球场",
    participants: "5人制，各学院内部选拔",
    description: "足球小院赛是专为大一新生设计的院内足球赛事，旨在帮助新生快速融入校园生活，发现和培养足球人才，为校队选拔储备力量。",
    highlights: [
      "🌟 大一新生专属赛事",
      "🎓 表现优异者可代表学院参加大院赛",
      "🏅 获得人文分及综合分奖励",
      "👥 认识更多志同道合的球友"
    ]
  },
  {
    id: 5,
    title: "羽毛球赛",
    desc: "即将开始",
    cover: "../public/images/1.jpg",
    date: "2025年5月10日 - 5月25日",
    location: "校体育馆羽毛球场",
    participants: "单打/双打，不限人数",
    description: "羽毛球赛是一项深受师生喜爱的体育赛事，比赛分为男单、女单、男双、女双、混双五个项目，满足不同水平选手的参赛需求。",
    highlights: [
      "🏸 提供专业羽毛球及场地",
      "🎯 按水平分组，确保比赛公平性",
      "🏆 各项目前三名颁发奖杯及奖品",
      "🎬 精彩对决视频剪辑分享"
    ]
  },
  {
    id: 6,
    title: "乒乓球赛",
    desc: "火热报名中",
    cover: "../public/images/1.jpg",
    date: "2025年6月1日 - 6月15日",
    location: "校乒乓球馆",
    participants: "单打/双打，不限人数",
    description: "乒乓球赛是国球项目的校园盛会，比赛采用国际标准规则，为乒乓球爱好者提供切磋技艺、交流经验的平台。",
    highlights: [
      "🏓 专业裁判执法，规范比赛流程",
      "🎖️ 设置新人组和公开组两个级别",
      "🎁 所有参赛者获得纪念T恤",
      "📊 赛后数据统计及技术分析"
    ]
  },
  { 
    id: 7, 
    title: "排球赛", 
    desc: "敬请期待", 
    cover: "../public/images/1.jpg",
    date: "2025年9月15日 - 9月30日",
    location: "校排球场",
    participants: "6人制，限额10支队伍",
    description: "排球赛是展现团队配合和战术素养的集体项目，比赛氛围热烈，观赏性强，是校园体育文化的重要组成部分。",
    highlights: [
      "🏐 提供专业排球及护具",
      "👨‍🏫 赛前提供技术培训",
      "🎊 冠军队伍获得团队建设基金",
      "📷 团队写真拍摄"
    ]
  },
  {
    id: 8,
    title: "棋类联赛",
    desc: "周末开赛",
    cover: "../public/images/1.jpg",
    date: "每周末 14:00-17:00",
    location: "学生活动中心棋艺室",
    participants: "个人赛，不限人数",
    description: "棋类联赛包含中国象棋、国际象棋、围棋三个项目，是智力运动爱好者的竞技舞台，通过对弈促进思维能力和心理素质的提升。",
    highlights: [
      "♟️ 三个项目独立计分排名",
      "🧠 定期邀请棋艺大师指导",
      "📚 提供棋谱分析和复盘讲解",
      "🎓 优秀选手推荐参加省级比赛"
    ]
  },
]);

// 显示活动详情
const showEventDetail = (event) => {
  selectedEvent.value = event;
  dialogVisible.value = true;
};

// 关闭弹窗
const handleClose = () => {
  dialogVisible.value = false;
  setTimeout(() => {
    selectedEvent.value = null;
  }, 300);
};

// 跳转到报名页
const goToRegistration = () => {
  handleClose();
  router.push('/registration');
};

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
});

onBeforeUnmount(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
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

/* ==================== 活动详情弹窗样式 ==================== */
.event-detail {
  padding: 10px 0;
}

.detail-cover {
  width: 100%;
  height: 280px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.detail-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.detail-cover:hover img {
  transform: scale(1.05);
}

.detail-info {
  display: flex;
  justify-content: space-around;
  margin-bottom: 24px;
  padding: 16px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%);
  border-radius: 12px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #606266;
  font-size: 14px;
}

.info-item .el-icon {
  font-size: 18px;
  color: #409eff;
}

.detail-description,
.detail-highlights {
  margin-bottom: 24px;
}

.detail-description h4,
.detail-highlights h4 {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 12px;
  padding-left: 12px;
  border-left: 4px solid #409eff;
}

.detail-description p {
  line-height: 1.8;
  color: #606266;
  text-align: justify;
  font-size: 14px;
}

.detail-highlights ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.detail-highlights li {
  padding: 10px 16px;
  margin-bottom: 8px;
  background: #f8f9fa;
  border-radius: 8px;
  color: #606266;
  font-size: 14px;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

.detail-highlights li:hover {
  background: #ecf5ff;
  border-left-color: #409eff;
  transform: translateX(5px);
}

.detail-actions {
  display: flex;
  gap: 12px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e4e7ed;
}

.detail-actions .el-button {
  flex: 1;
}

/* 弹窗动画增强 */
:deep(.el-dialog) {
  border-radius: 16px;
  overflow: hidden;
}

:deep(.el-dialog__header) {
  background: linear-gradient(135deg, #409eff, #66b1ff);
  color: white;
  padding: 20px 24px;
  margin: 0;
}

:deep(.el-dialog__title) {
  color: white;
  font-size: 20px;
  font-weight: 600;
}

:deep(.el-dialog__headerbtn .el-dialog__close) {
  color: white;
  font-size: 20px;
}

:deep(.el-dialog__headerbtn:hover .el-dialog__close) {
  color: #f0f0f0;
}

:deep(.el-dialog__body) {
  padding: 24px;
  max-height: 70vh;
  overflow-y: auto;
}

/* 响应式设计 */
@media (max-width: 768px) {
  :deep(.el-dialog) {
    width: 90% !important;
    margin: 20px auto;
  }

  .detail-info {
    flex-direction: column;
    gap: 12px;
  }

  .detail-cover {
    height: 200px;
  }

  .detail-actions {
    flex-direction: column;
  }

  .detail-actions .el-button {
    width: 100%;
  }
}
</style>

