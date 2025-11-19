import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * Token Store - 管理用户认证 token
 */
export const useTokenStore = defineStore('token', () => {
  // 状态
  const token = ref(localStorage.getItem('token') || '')

  // 设置 token
  const setToken = (newToken) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  // 移除 token
  const removeToken = () => {
    token.value = ''
    localStorage.removeItem('token')
  }

  return {
    token,
    setToken,
    removeToken
  }
})

