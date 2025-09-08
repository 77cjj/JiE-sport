// utils/slugify.js
export function slugify(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/[\s]+/g, "-")   // 空格 -> -
    .replace(/[^\w-]/g, "");  // 去掉特殊字符
}
