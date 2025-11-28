<template>
  <el-dialog
    :model-value="modelValue"
    :title="event?.title || '活动详情'"
    width="600px"
    align-center
    @close="handleClose"
    @closed="$emit('closed')"
    class="event-dialog"
  >
    <div v-if="event" class="event-detail">
      <div class="detail-cover" v-if="event.cover">
        <img :src="event.cover" alt="活动封面" />
      </div>

      <div class="detail-info" v-if="event.date || event.location || event.participants">
        <div class="info-item" v-if="event.date">
          <el-icon><Calendar /></el-icon>
          <span>{{ event.date }}</span>
        </div>
        <div class="info-item" v-if="event.location">
          <el-icon><Location /></el-icon>
          <span>{{ event.location }}</span>
        </div>
        <div class="info-item" v-if="event.participants">
          <el-icon><User /></el-icon>
          <span>{{ event.participants }}</span>
        </div>
      </div>

      <div class="detail-description" v-if="event.description">
        <h4>活动简介</h4>
        <p>{{ event.description }}</p>
      </div>

      <div class="detail-highlights" v-if="event.highlights?.length">
        <h4>活动亮点</h4>
        <ul>
          <li v-for="(highlight, index) in event.highlights" :key="index">
            {{ highlight }}
          </li>
        </ul>
      </div>

      <div class="detail-actions" v-if="showPrimary || showSecondary">
        <el-button
          v-if="showPrimary"
          type="primary"
          size="large"
          :icon="primaryIcon"
          @click="handlePrimary"
        >
          {{ primaryText }}
        </el-button>
        <el-button
          v-if="showSecondary"
          size="large"
          @click="handleClose"
        >
          {{ secondaryText }}
        </el-button>
      </div>
    </div>
    <div v-else class="empty-state">
      暂无活动信息
    </div>
  </el-dialog>
</template>

<script setup>
import { Calendar, Location, User, Edit } from "@element-plus/icons-vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  event: {
    type: Object,
    default: () => null,
  },
  primaryText: {
    type: String,
    default: "立即报名",
  },
  secondaryText: {
    type: String,
    default: "稍后再看",
  },
  showPrimary: {
    type: Boolean,
    default: true,
  },
  showSecondary: {
    type: Boolean,
    default: true,
  },
  primaryIcon: {
    type: [Object, String],
    default: () => Edit,
  },
});

const emit = defineEmits(["update:modelValue", "primary-action", "closed"]);

const handleClose = () => {
  emit("update:modelValue", false);
};

const handlePrimary = () => {
  emit("primary-action", props.event);
};
</script>

<style scoped>
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

.empty-state {
  text-align: center;
  color: #909399;
  padding: 30px 0;
}

::v-deep(.el-dialog) {
  border-radius: 16px;
  overflow: hidden;
}

::v-deep(.el-dialog__header) {
  background: linear-gradient(135deg, #409eff, #66b1ff);
  color: white;
  padding: 20px 24px;
  margin: 0;
}

::v-deep(.el-dialog__title) {
  color: white;
  font-size: 20px;
  font-weight: 600;
}

::v-deep(.el-dialog__headerbtn .el-dialog__close) {
  color: white;
  font-size: 20px;
}

::v-deep(.el-dialog__headerbtn:hover .el-dialog__close) {
  color: #f0f0f0;
}

::v-deep(.el-dialog__body) {
  padding: 24px;
  max-height: 70vh;
  overflow-y: auto;
}

@media (max-width: 768px) {
  ::v-deep(.el-dialog) {
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

