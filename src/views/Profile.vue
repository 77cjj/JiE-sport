<template>
  <div class="profile-page">
    <!-- 左侧：用户信息区 -->
    <aside class="sidebar">
      <el-card class="user-card">
        <div class="user-info">
          <el-avatar :size="80" src="../assets/avatar.jpg" />
          <h3>{{ user.name }}</h3>
          <p>{{ user.department }} · {{ user.id }}</p>
        </div>
      </el-card>

      <el-card class="stats-card">
        <el-statistic title="已报名" :value="user.stats.registered" />
        <el-statistic title="已完成" :value="user.stats.completed" />
        <el-statistic title="获奖数" :value="user.stats.awards" />
      </el-card>
    </aside>

    <!-- 中间：活动管理区 -->
    <main class="content">
      <el-card class="section-card">
        <h3>即将参加的活动</h3>
        <el-empty v-if="upcoming.length === 0" description="暂无活动" />
        <el-timeline v-else>
          <el-timeline-item
            v-for="(event, index) in upcoming"
            :key="index"
            :timestamp="event.date"
          >
            <el-card>
              <h4>{{ event.title }}</h4>
              <p>{{ event.location }}</p>
              <el-button size="small" type="danger">取消报名</el-button>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-card>

      <el-card class="section-card">
        <h3>历史活动记录</h3>
        <el-table :data="history">
          <el-table-column prop="title" label="活动" />
          <el-table-column prop="date" label="时间" />
          <el-table-column prop="result" label="成绩" />
        </el-table>
      </el-card>
    </main>

    <!-- 右侧：通知栏 -->
    <aside class="sidebar-right">
      <el-card class="notice-card">
        <h3>通知中心</h3>
        <el-empty v-if="notices.length === 0" description="暂无通知" />
        <el-timeline v-else>
          <el-timeline-item
            v-for="(notice, index) in notices"
            :key="index"
            :timestamp="notice.date"
            type="primary"
          >
            {{ notice.message }}
          </el-timeline-item>
        </el-timeline>
      </el-card>
    </aside>
  </div>
</template>

<script setup>
import { ref } from "vue";

const user = ref({
  name: "张三",
  department: "计算机学院",
  id: "20230001",
  stats: {
    registered: 3,
    completed: 5,
    awards: 2,
  },
});

const upcoming = ref([
  { title: "校运会 100 米预赛", date: "2025-09-10", location: "东操场" },
  { title: "篮球友谊赛", date: "2025-09-15", location: "体育馆" },
]);

const history = ref([
  { title: "羽毛球公开赛", date: "2025-05-03", result: "八强" },
  { title: "足球院系杯", date: "2025-06-20", result: "季军" },
]);

const notices = ref([
  { message: "你已成功报名校运会 100 米预赛", date: "2025-09-01" },
  { message: "篮球友谊赛报名截止时间：9月12日", date: "2025-09-02" },
]);
</script>

<style scoped>
.profile-page {
  display: grid;
  grid-template-columns: 250px 1fr 250px;
  gap: 16px;
  padding: 20px;
}

.sidebar,
.sidebar-right {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-card {
  margin-bottom: 20px;
}
</style>
