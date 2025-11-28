<template>
  <div class="profile-page">
    <!-- 左侧：用户信息区 -->
    <aside class="sidebar">
      <el-card class="user-card">
        <div class="user-info">
          <el-avatar 
            :size="80" 
            :src="userStore.userInfo.avatar || '/src/assets/avatar.jpg'" 
          />
          <h3>{{ userStore.fullName }}</h3>
          <p>{{ userStore.userDisplayInfo }}</p>
          <el-tag v-if="!userStore.isLoggedIn" type="info">未登录</el-tag>
        </div>
      </el-card>

      <el-card class="stats-card">
        <el-statistic title="已报名" :value="userStore.userStats.registered" />
        <el-statistic title="已完成" :value="userStore.userStats.completed" />
        <el-statistic title="获奖数" :value="userStore.userStats.awards" />
      </el-card>

      <!-- 用户操作按钮 -->
      <el-card class="action-card">
        <el-button 
          v-if="userStore.isLoggedIn" 
          type="danger" 
          plain 
          @click="handleLogout"
          style="width: 100%"
        >
          退出登录
        </el-button>
        <el-button 
          v-else 
          type="primary" 
          @click="goToLogin"
          style="width: 100%"
        >
          立即登录
        </el-button>
      </el-card>
    </aside>

    <!-- 中间：活动管理区 -->
    <main class="content">
      <el-card class="section-card">
        <div class="card-header">
          <h3>即将参加的活动</h3>
          <el-badge 
            :value="eventsStore.upcomingEvents.length" 
            :max="99" 
            :hidden="eventsStore.upcomingEvents.length === 0"
            class="badge"
          />
        </div>
        <el-empty v-if="eventsStore.upcomingEvents.length === 0" description="暂无活动" />
        <el-timeline v-else>
          <el-timeline-item
            v-for="event in eventsStore.upcomingEvents"
            :key="event.id"
            :timestamp="event.date"
          >
            <el-card>
              <div class="event-item-content">
                <div>
                  <h4>{{ event.title }}</h4>
                  <p class="event-location">
                    <el-icon><Location /></el-icon>
                    {{ event.location }}
                  </p>
                </div>
                <el-button 
                  size="small" 
                  type="danger" 
                  @click="handleCancelRegistration(event.id)"
                >
                  取消报名
                </el-button>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-card>

      <el-card class="section-card">
        <div class="card-header">
          <h3>历史活动记录</h3>
          <el-badge 
            :value="eventsStore.completedEvents.length" 
            :max="99" 
            :hidden="eventsStore.completedEvents.length === 0"
            class="badge"
          />
        </div>
        <el-table :data="eventsStore.completedEvents" style="width: 100%">
          <el-table-column prop="title" label="活动" min-width="150" />
          <el-table-column prop="date" label="时间" width="120" />
          <el-table-column prop="result" label="成绩" width="100">
            <template #default="{ row }">
              <el-tag :type="getResultType(row.result)">{{ row.result }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template #default="{ row }">
              <el-button 
                link 
                type="primary" 
                size="small"
                @click="viewEventDetail(row)"
              >
                查看详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </main>

    <!-- 右侧：通知栏 -->
    <aside class="sidebar-right">
      <el-card class="notice-card">
        <div class="card-header">
          <h3>通知中心</h3>
          <el-badge 
            :value="eventsStore.unreadNotificationsCount" 
            :max="99" 
            :hidden="eventsStore.unreadNotificationsCount === 0"
            class="badge"
          >
            <el-button 
              v-if="eventsStore.notifications.length > 0"
              link 
              size="small"
              @click="handleMarkAllAsRead"
            >
              全部已读
            </el-button>
          </el-badge>
        </div>
        <el-empty v-if="eventsStore.notifications.length === 0" description="暂无通知" />
        <el-timeline v-else>
          <el-timeline-item
            v-for="notice in eventsStore.notifications"
            :key="notice.id"
            :timestamp="notice.date"
            :type="getNoticeType(notice.type)"
            :hollow="notice.read"
          >
            <div 
              class="notice-item"
              :class="{ 'notice-unread': !notice.read }"
              @click="handleMarkAsRead(notice.id)"
            >
              {{ notice.message }}
            </div>
          </el-timeline-item>
        </el-timeline>
      </el-card>
    </aside>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from 'element-plus';
import { Location } from '@element-plus/icons-vue';
import { useUserStore } from '@/stores/userStore';
import { useEventsStore } from '@/stores/eventsStore';

const router = useRouter();

// 使用 Pinia stores
const userStore = useUserStore();
const eventsStore = useEventsStore();

// ==================== 事件处理函数 ====================

/**
 * 取消报名活动
 */
const handleCancelRegistration = async (eventId) => {
  try {
    const result = await ElMessageBox.confirm(
      '确定要取消报名该活动吗？',
      '取消报名',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    );

    if (result === 'confirm') {
      const response = await eventsStore.cancelRegistration(eventId);
      if (response.success) {
        ElMessage.success(response.message);
        // 更新用户统计数据
        userStore.updateUserStats({
          registered: userStore.userStats.registered - 1
        });
      } else {
        ElMessage.error(response.message);
      }
    }
  } catch (error) {
    // 用户取消操作
    console.log('取消操作');
  }
};

/**
 * 查看活动详情
 */
const viewEventDetail = (event) => {
  ElMessageBox.alert(
    `活动：${event.title}\n时间：${event.date}\n地点：${event.location}\n成绩：${event.result}`,
    '活动详情',
    {
      confirmButtonText: '确定'
    }
  );
};

/**
 * 标记通知为已读
 */
const handleMarkAsRead = (notificationId) => {
  eventsStore.markNotificationAsRead(notificationId);
};

/**
 * 标记所有通知为已读
 */
const handleMarkAllAsRead = () => {
  eventsStore.markAllNotificationsAsRead();
  ElMessage.success('所有通知已标记为已读');
};

/**
 * 退出登录
 */
const handleLogout = async () => {
  try {
    const result = await ElMessageBox.confirm(
      '确定要退出登录吗？',
      '退出登录',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    );

    if (result === 'confirm') {
      userStore.logout();
      ElMessage.success('已退出登录');
      router.push('/login');
    }
  } catch (error) {
    // 用户取消操作
    console.log('取消退出');
  }
};

/**
 * 跳转到登录页
 */
const goToLogin = () => {
  router.push('/login');
};

/**
 * 根据成绩获取标签类型
 */
const getResultType = (result) => {
  const typeMap = {
    '冠军': 'danger',
    '亚军': 'warning',
    '季军': 'success',
    '八强': 'info',
    '参赛': ''
  };
  return typeMap[result] || 'info';
};

/**
 * 根据通知类型获取时间线类型
 */
const getNoticeType = (type) => {
  const typeMap = {
    'success': 'success',
    'warning': 'warning',
    'error': 'danger',
    'info': 'primary'
  };
  return typeMap[type] || 'primary';
};

// ==================== 生命周期 ====================

onMounted(() => {
  // 页面加载时，如果没有登录，自动模拟登录（开发测试用）
  if (!userStore.isLoggedIn) {
    // 模拟自动登录
    userStore.login({ username: '张三' });
  }
  
  // 恢复活动数据
  eventsStore.restoreEventsData();
});
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

/* 用户信息卡片 */
.user-card {
  text-align: center;
}

.user-info {
  padding: 16px 0;
}

.user-info h3 {
  margin: 16px 0 8px;
  font-size: 20px;
  color: #303133;
}

.user-info p {
  color: #909399;
  font-size: 14px;
  margin-bottom: 8px;
}

/* 统计卡片 */
.stats-card {
  display: flex;
  justify-content: space-around;
  padding: 20px 0;
}

.stats-card :deep(.el-statistic) {
  text-align: center;
}

/* 操作按钮卡片 */
.action-card {
  padding: 12px;
}

/* 卡片头部 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.card-header h3 {
  margin: 0;
  font-size: 18px;
  color: #303133;
}

.badge {
  margin-left: 8px;
}

/* 活动项内容 */
.event-item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.event-item-content h4 {
  margin: 0 0 8px;
  font-size: 16px;
  color: #303133;
}

.event-location {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #909399;
  font-size: 14px;
  margin: 0;
}

/* 通知项 */
.notice-item {
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.notice-item:hover {
  background-color: #f5f7fa;
}

.notice-unread {
  font-weight: 600;
  color: #303133;
}

/* 通知卡片 */
.notice-card h3 {
  margin-bottom: 16px;
  font-size: 18px;
  color: #303133;
}

/* 区块卡片 */
.section-card {
  margin-bottom: 20px;
}

.section-card h3 {
  margin: 0 0 16px;
  font-size: 18px;
  color: #303133;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .profile-page {
    grid-template-columns: 220px 1fr 220px;
  }
}

@media (max-width: 992px) {
  .profile-page {
    grid-template-columns: 1fr;
  }
  
  .sidebar,
  .sidebar-right {
    order: 2;
  }
  
  .content {
    order: 1;
  }
}

@media (max-width: 768px) {
  .profile-page {
    padding: 12px;
    gap: 12px;
  }
  
  .stats-card {
    flex-direction: column;
    gap: 16px;
  }
}
</style>
