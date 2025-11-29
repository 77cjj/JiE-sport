<template>
  <div class="mobile-doc-selector" v-if="isMobile">
    <!-- 汉堡菜单按钮 -->
    <div class="selector-button" @click="showDrawer = true">
      <el-icon class="menu-icon" :size="20">
        <Menu />
      </el-icon>
      <span class="current-doc">{{ currentDocTitle }}</span>
    </div>

    <!-- 文档选择侧边抽屉 -->
    <el-drawer
      v-model="showDrawer"
      title="文档列表"
      direction="ltr"
      :size="280"
      :z-index="2000"
      class="doc-drawer"
    >
      <div class="doc-list">
        <div
          v-for="doc in docs"
          :key="doc.id"
          :class="['doc-item', { active: doc.id === currentDocId }]"
          @click="selectDoc(doc)"
        >
          <span class="doc-title">{{ doc.title }}</span>
          <el-icon v-if="doc.id === currentDocId" class="check-icon">
            <Check />
          </el-icon>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Menu, Check } from '@element-plus/icons-vue';

const route = useRoute();
const router = useRouter();

// 文档列表
const docs = [
  { id: 'overview', title: '各类活动历年时间线一览' },
  { id: 'sportsMeeting', title: '运动会文档' },
  { id: 'smallSoccer', title: '足球小院赛文档' },
  { id: 'bigSoccer', title: '足球大院赛文档' },
  { id: 'smallBasketball', title: '篮球新生赛文档' },
  { id: 'bigBasketball', title: '篮球大院赛文档' },
  { id: 'smallBadminton', title: '羽毛球迎新赛文档' },
  { id: 'bigBadminton', title: '羽毛球大院赛文档' },
  { id: 'bigWoodball', title: '木球大院赛文档' },
  { id: 'bigTableTennis', title: '乒乓球大院赛文档' },
];

const showDrawer = ref(false);
const isMobile = ref(false);

// 当前文档ID
const currentDocId = computed(() => {
  return route.params.id || 'overview';
});

// 当前文档标题
const currentDocTitle = computed(() => {
  const doc = docs.find(d => d.id === currentDocId.value);
  return doc ? doc.title : '选择文档';
});

// 选择文档
const selectDoc = (doc) => {
  router.push(`/eventdoc/${doc.id}`);
  showDrawer.value = false;
};

// 检测是否为移动端
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});
</script>

<style scoped>
.mobile-doc-selector {
  position: sticky;
  top: 0; /* 滚动到顶部时固定在页面顶端 */
  z-index: 999;
  background: white;
  border-bottom: 1px solid #e6e9f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  
  /* 全宽显示 */
  width: 100vw;
  margin-left: calc(-50vw + 50%);
}

.selector-button {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  cursor: pointer;
  transition: background 0.3s;
  user-select: none;
}

.selector-button:active {
  background: #f5f7fa;
}

.menu-icon {
  color: #409eff;
  flex-shrink: 0;
  transition: color 0.3s;
}

.selector-button:hover .menu-icon {
  color: #66b1ff;
}

.current-doc {
  font-size: 15px;
  font-weight: 500;
  color: #303133;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 文档列表 */
.doc-list {
  padding: 8px 0;
}

.doc-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  cursor: pointer;
  transition: background 0.2s;
  border-bottom: 1px solid #f0f0f0;
}

.doc-item:last-child {
  border-bottom: none;
}

.doc-item:active {
  background: #f5f7fa;
}

.doc-item.active {
  background: #ecf5ff;
}

.doc-title {
  font-size: 15px;
  color: #303133;
  flex: 1;
}

.doc-item.active .doc-title {
  color: #409eff;
  font-weight: 600;
}

.check-icon {
  color: #409eff;
  font-size: 18px;
}

/* 抽屉样式 */
.doc-drawer :deep(.el-drawer__header) {
  padding: 16px 20px;
  margin-bottom: 0;
  border-bottom: 1px solid #e6e9f0;
}

.doc-drawer :deep(.el-drawer__body) {
  padding: 0;
  max-height: 60vh;
  overflow-y: auto;
}

.doc-drawer :deep(.el-drawer__title) {
  font-size: 16px;
  font-weight: 600;
}
</style>

