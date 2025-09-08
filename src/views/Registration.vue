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
                <el-link type="primary" :underline="false" @click="openRules"
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
import { ElMessageBox } from "element-plus";

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
          image: "../public/images/1.jpg",
          cta: "现在报名",
          query: { event: "篮球联赛" },
        },
        {
          id: "h3",
          badge: "10.20截止！",
          title: "羽毛球公开赛报名",
          subtitle: "单打双打，等你来战。",
          image: "../public/images/1.jpg",
          cta: "立即参与",
          query: { event: "羽毛球公开赛" },
        },
        {
          id: "h4",
          badge: "10.28截止！",
          title: "游泳邀请赛报名",
          subtitle: "自由泳/蛙泳/仰泳/蝶泳项目开放报名。",
          image: "../public/images/1.jpg",
          cta: "去报名",
          query: { event: "游泳邀请赛" },
        },
        {
          id: "h4",
          badge: "10.28截止！",
          title: "游泳邀请赛报名",
          subtitle: "自由泳/蛙泳/仰泳/蝶泳项目开放报名。",
          image: "../public/images/1.jpg",
          cta: "去报名",
          query: { event: "游泳邀请赛" },
        },
      ]);
    }, 280);
  });

const moreHeroes = ref([]);

onMounted(async () => {
  moreHeroes.value = await fetchMoreHeroesApi();
});

const goToForm = () => {
  router.push("/registration/form");
};

const goToFormWith = (h) => {
  router.push({ path: "/registration/form", query: h.query || {} });
};

const openRules = () => {
  ElMessageBox.alert(
    "1. 每人可报不超过2个单人项目；2. 参赛当天需携带有效证件；3. 若因身体原因不适合参赛，请及时向组委会报备。",
    "竞赛报名须知",
    { confirmButtonText: "我知道了" }
  );
};
</script>
