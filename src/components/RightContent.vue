<template>
  <nav class="toc">
    <div class="toc-title">目录</div>
    <ul>
      <li v-for="item in tocItems" :key="item.id">
        <a
          href="#"
          @click.prevent="scrollToHeading(item.id)"
          :class="{ active: activeId === item.id }"
        >
          <span
            class="toc-text"
            :style="{ marginLeft: (item.level - 1) * 16 + 'px' }"
          >
            {{ item.text }}
          </span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from "vue";
import { slugify } from "@/utils/slugify";

const props = defineProps({
  content: String, // 父组件传入的 renderedContent
});

const tocItems = ref([]);
const activeId = ref("");
let scrollHandler = null;

// 节流函数
function throttle(fn, wait) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn(...args);
    }
  };
}

// 生成 TOC
function generateToc() {
  const container = document.querySelector(".content");
  if (!container) return;

  const headings = Array.from(container.querySelectorAll("h1, h2, h3")).map(
    (heading, i) => {
      let id = heading.id;
      if (!id) {
        id = slugify(heading.textContent) || `heading-${i}`;
        heading.id = id;
      }
      return {
        id,
        text: heading.textContent,
        level: Number(heading.tagName[1]),
        el: heading,
      };
    }
  );

  tocItems.value = headings;

  // 设置 scroll 监听更新 activeId
  if (scrollHandler) window.removeEventListener("scroll", scrollHandler);
  scrollHandler = throttle(() => {
    if (isScrollingByClick) return; // 忽略点击滚动期间
    const scrollTop = window.scrollY || window.pageYOffset;
    let current = tocItems.value[0]?.id || "";
    for (const h of tocItems.value) {
      if (scrollTop + 20 >= h.el.offsetTop) {
        current = h.id;
      } else break;
    }
    activeId.value = current;
  }, 100);
  window.addEventListener("scroll", scrollHandler);
}

let isScrollingByClick = false;

function scrollToHeading(id) {
  const el = document.getElementById(id);
  if (!el) return;

  isScrollingByClick = true; // 禁止 scroll 时更新 activeId

  const offset = 64; // 导航栏高度
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "auto" });

  activeId.value = id;

  // 估算滚动结束后恢复监听
  setTimeout(() => {
    isScrollingByClick = false;
  }, 400);
}

// 监听 content 变化
watch(
  () => props.content,
  async () => {
    await nextTick();
    generateToc();
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  if (scrollHandler) window.removeEventListener("scroll", scrollHandler);
});
</script>

<style scoped>
.toc {
  position: sticky;
  top: 16px;
  align-self: start;
  border-left: 1px solid #e6e9f0;
  padding-left: 16px;
  color: #6b7280;
}
.toc-title {
  font-size: 13px;
  margin-bottom: 10px;
  color: #7a8394;
}
.toc ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.toc li {
  padding: 6px 0;
}
.toc a {
  display: block;
  position: relative;
  padding-left: 16px; /* 给锚点留位置 */
  color: #4a5568;
  text-decoration: none;
  transition: color 0.2s;
}
.toc a.active {
  color: #1e40af;
  font-weight: 600;
}
.toc a.active::before {
  content: "";
  position: absolute;
  left: 0; /* 锚点固定 */
  top: 50%;
  transform: translateY(-50%);
  width: 6px; /* 粗一点 */
  height: 100%;
  background-color: #1e40af;
  border-radius: 3px; /* 圆角 */
}
.toc-text {
  display: inline-block;
}
</style>
