<template>
  <div class="registration-page">
    <!-- 模拟后端返回的多个相同样式宣传块 -->
    <section v-if="moreHeroes.length" class="more-heroes">
      <div v-for="h in moreHeroes" :key="h.id" class="hero">
        <el-row :gutter="24" align="middle">
          <el-col :xs="24" :md="12">
            <div class="hero__content">
              <div class="hero__badge">{{ h.badge }}</div>
              <h1 class="hero__title">{{ h.title }}</h1>
              <p class="hero__subtitle">{{ h.subtitle }}</p>
              <el-space>
                <el-button
                  type="primary"
                  size="large"
                  @click="goToFormWith(h)"
                  >{{ h.cta || "报名参加" }}</el-button
                >
              <el-link type="primary" :underline="false" @click="openDetail(h)"
                >点击了解 详情</el-link
                >
              </el-space>
            </div>
          </el-col>
          <el-col :xs="24" :md="12">
            <el-image class="hero__image" :src="h.image" fit="cover" lazy />
          </el-col>
        </el-row>
      </div>
    </section>
  

    <EventDetailDialog
      v-model="detailVisible"
      :event="detailEvent"
      @primary-action="handleDetailPrimary"
      @closed="handleDetailClosed"
    />
  </div>
</template>

<style scoped>
.registration-page {
  display: flex;
  justify-content: center;
  padding: 16px 20px 32px;
}

.hero {
  background: var(--el-bg-color);
  border-radius: 12px;
  max-width: 600px;
  padding: 28px 24px;
  margin-bottom: 24px;
  flex: 1 1 45%;
  box-shadow: var(--el-box-shadow-light);
}

.more-heroes {
  display: flex;
  flex-wrap: wrap; /* 自动换行 */
  justify-content: center; /* 居中对齐 */
  gap: 20px;
}
.more-heroes .hero {
  margin-top: 16px;
}

.hero__content {
  display: flex;

  flex-direction: column;
  gap: 16px;
}

.hero__badge {
  width: fit-content;
  padding: 4px 10px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
  border-radius: 999px;
  font-weight: 600;
  font-size: 12px;
}

.hero__title {
  margin: 0;
  font-size: 42px;
  line-height: 1.2;
  letter-spacing: 1px;
}

.hero__subtitle {
  margin: 0 0 8px;
  color: var(--el-text-color-secondary);
}

.hero__image {
  width: 100%;
  height: 320px;
  border-radius: 12px;

  box-shadow: var(--el-box-shadow);
}

@media (max-width: 768px) {
  .hero__title {
    font-size: 32px;
  }
  .hero__image {
    height: 220px;
  }
}
</style>



<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import EventDetailDialog from "../components/EventDetailDialog.vue";

const router = useRouter();
const heroImage = "/images/track.jpg";

// 模拟后端接口：返回多个与上方相同样式的宣传块
const fetchMoreHeroesApi = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "h2",
          badge: "10.15截止！",
          title: "篮球联赛报名",
          subtitle: "班级为单位，团队协作，赛场见！",
          image: "/images/1.jpg",
          cover: "/images/1.jpg",
          cta: "现在报名",
          query: { event: "basketballLeague" },
          date: "2025年10月20日 - 11月5日",
          location: "校体育馆主场",
          participants: "5人制，限额20支队伍",
          description:
            "篮球联赛是秋季重磅赛事，强调班级荣誉与团队配合，设有淘汰赛与明星赛两个环节。",
          highlights: [
            "🏀 专业裁判团队执法",
            "📊 提供技术统计与数据榜单",
            "🎤 决赛现场设拉拉队加油环节",
            "🎁 冠军获得球队周边礼包",
          ],
        },
        {
          id: "h3",
          badge: "10.20截止！",
          title: "羽毛球公开赛报名",
          subtitle: "单打双打，等你来战。",
          image: "/images/1.jpg",
          cover: "/images/1.jpg",
          cta: "立即参与",
          query: { event: "badmintonOpen" },
          date: "2025年11月1日 - 11月15日",
          location: "体育馆羽毛球场",
          participants: "单打/双打，不限人数",
          description:
            "羽毛球公开赛按水平分组，面向全校开放，鼓励不同年级和学院的同学同场竞技。",
          highlights: [
            "🏸 设男单、女单、混双等项目",
            "🎥 全程录像供选手复盘",
            "🎯 技术教练提供现场指导",
            "🥇 前三名获得奖杯与训练卡",
          ],
        },
        {
          id: "h4",
          badge: "10.28截止！",
          title: "游泳邀请赛报名",
          subtitle: "自由泳/蛙泳/仰泳/蝶泳项目开放报名。",
          image: "/images/1.jpg",
          cover: "/images/1.jpg",
          cta: "去报名",
          query: { event: "swimmingInvite" },
          date: "2025年11月20日",
          location: "游泳馆",
          participants: "个人赛，项目任选",
          description:
            "游泳邀请赛分为多个泳姿项目，采用电动计时，确保公平公正，欢迎有水上项目基础的同学参加。",
          highlights: [
            "🏊‍♂️ 设预赛与决赛两轮",
            "💧 现场提供热身池与理疗区",
            "🎖️ 设最佳泳姿与突破奖",
            "📸 赛事摄影团队跟拍",
          ],
        },
        {
          id: "h5",
          badge: "11.05截止！",
          title: "田径公开赛报名",
          subtitle: "短跑、中长跑、跳远、铅球全面开放。",
          image: "/images/1.jpg",
          cover: "/images/1.jpg",
          cta: "去报名",
          query: { event: "trackOpen" },
          date: "2025年12月1日 - 12月3日",
          location: "田径场",
          participants: "个人赛，可报 2 个项目",
          description:
            "田径公开赛为冬训成果展示提供舞台，涵盖短跑、长跑、跳跃与投掷项目。",
          highlights: [
            "⏱️ 电子计时和成绩同步发布",
            "🧊 赛后提供放松恢复区",
            "🎤 解说团队现场讲解战术",
            "🎁 完赛即可获得纪念勋章",
          ],
        },
      ]);
    }, 280);
  });

const moreHeroes = ref([]);
const detailVisible = ref(false);
const detailEvent = ref(null);

onMounted(async () => {
  moreHeroes.value = await fetchMoreHeroesApi();
});

const goToForm = () => {
  router.push("/registration/form");
};

const goToFormWith = (h) => {
  router.push({ path: "/registration/form", query: h.query || {} });
};

const openDetail = (hero) => {
  detailEvent.value = hero;
  detailVisible.value = true;
};

const handleDetailPrimary = (hero) => {
  detailVisible.value = false;
  const target = hero || detailEvent.value;
  if (target) {
    goToFormWith(target);
  } else {
    goToForm();
  }
};

const handleDetailClosed = () => {
  detailEvent.value = null;
};
</script>
