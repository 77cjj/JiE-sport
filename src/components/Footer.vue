<template>
  <el-footer class="footer">
    <div class="footer-inner">
      <!-- 链接区域 -->
      <div class="footer-links">
        <el-link
          v-for="(link, index) in links"
          :key="index"
          :underline="false"
          href="#"
        >
          {{ link }}
        </el-link>
      </div>

      <el-divider class="footer-divider" />

      <!-- 备案与版权 -->
      <div class="footer-meta">
        <div class="copy">© 2024 计E体育 · All rights reserved.</div>
        <div class="records">
          <a
            class="record-item"
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener"
          >
            ICP备案：京ICP备XXXXXX号-1
          </a>
          <span class="sep">|</span>
          <a
            class="record-item police"
            href="https://beian.mps.gov.cn/#/query/webSearch"
            target="_blank"
            rel="noopener"
          >
            <span class="police-icon"></span>
            公安备案：京公网安备 XXXXXXXXXXXXX号
          </a>
        </div>
      </div>
    </div>
  </el-footer>
</template>

<script setup>
import { ref } from "vue";

const links = ref(["加入我们", "联系我们", "用户反馈", "友情链接", "公众号"]);
</script>

<style scoped>
.footer {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-top: 1px solid #e0e6f0;
  color: #4b5563;
  padding: 20px 0;
  font-family: "Segoe UI", "PingFang SC", sans-serif;
}

.footer-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 16px;
  text-align: center;
}

.footer-links {
  margin-bottom: 12px;
}
.footer-links .el-link {
  margin: 0 12px;
  color: #409eff;
  font-size: 14px;
  transition: color 0.2s;
}
.footer-links .el-link:hover {
  color: #66b1ff;
}

.footer-divider {
  margin: 12px auto 16px;
  width: 85%;
  border-color: #d1d5db;
}

.footer-meta {
  font-size: 12px;
  color: #6b7280;
  line-height: 1.5;
}
.copy {
  margin-bottom: 6px;
}
.records {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}
.sep {
  color: #c1c7d0;
}
.record-item {
  color: #6b7280;
  text-decoration: none;
  font-size: 12px;
}
.record-item:hover {
  color: #374151;
  text-decoration: underline;
}

/* 公安备案小图标 */
.police {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.police-icon {
  width: 14px;
  height: 14px;
  display: inline-block;
  border-radius: 3px;
  background: linear-gradient(180deg, #5b89ff, #2f59d6);
  position: relative;
}
.police-icon::after {
  content: "";
  position: absolute;
  inset: 3px;
  border: 2px solid #fff;
  border-radius: 3px 3px 6px 6px;
}

/* 小屏适配 */
@media (max-width: 600px) {
  .footer-inner {
    padding: 0 12px;
  }
  .footer-links .el-link {
    margin: 0 6px;
    font-size: 13px;
  }
  .records {
    gap: 6px;
  }
  .record-item {
    font-size: 11px;
  }
}
</style>
