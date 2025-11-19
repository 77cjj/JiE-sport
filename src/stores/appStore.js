import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * App Store - 管理应用全局组件状态
 */
export const useAppStore = defineStore('app', () => {
  // ==================== 状态 ====================
  
  // 侧边栏状态
  const sidebarCollapsed = ref(false)
  
  // 主题模式
  const theme = ref(localStorage.getItem('theme') || 'light')
  
  // 加载状态
  const loading = ref(false)
  
  // 移动端状态
  const isMobile = ref(false)
  
  // 弹窗显示状态
  const dialogStates = ref({
    eventDetail: false,
    userProfile: false,
    settings: false
  })
  
  // 当前选中的活动（用于详情弹窗）
  const selectedEvent = ref(null)
  
  // 面包屑导航
  const breadcrumbs = ref([])
  
  // 全局提示消息队列
  const messages = ref([])

  // ==================== Getters ====================
  
  const isDarkMode = computed(() => theme.value === 'dark')
  
  const hasMessages = computed(() => messages.value.length > 0)

  // ==================== Actions ====================
  
  /**
   * 切换侧边栏
   */
  const toggleSidebar = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value
    localStorage.setItem('sidebarCollapsed', sidebarCollapsed.value)
  }
  
  /**
   * 设置侧边栏状态
   */
  const setSidebarCollapsed = (collapsed) => {
    sidebarCollapsed.value = collapsed
    localStorage.setItem('sidebarCollapsed', collapsed)
  }
  
  /**
   * 切换主题
   */
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', theme.value)
    applyTheme()
  }
  
  /**
   * 设置主题
   */
  const setTheme = (newTheme) => {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
    applyTheme()
  }
  
  /**
   * 应用主题到 DOM
   */
  const applyTheme = () => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme.value)
      if (theme.value === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }
  
  /**
   * 设置加载状态
   */
  const setLoading = (isLoading) => {
    loading.value = isLoading
  }
  
  /**
   * 检测并设置移动端状态
   */
  const checkMobile = () => {
    if (typeof window !== 'undefined') {
      isMobile.value = window.innerWidth <= 768
    }
  }
  
  /**
   * 设置移动端状态
   */
  const setMobile = (mobile) => {
    isMobile.value = mobile
  }
  
  /**
   * 打开弹窗
   */
  const openDialog = (dialogName) => {
    if (dialogStates.value.hasOwnProperty(dialogName)) {
      dialogStates.value[dialogName] = true
    }
  }
  
  /**
   * 关闭弹窗
   */
  const closeDialog = (dialogName) => {
    if (dialogStates.value.hasOwnProperty(dialogName)) {
      dialogStates.value[dialogName] = false
    }
  }
  
  /**
   * 关闭所有弹窗
   */
  const closeAllDialogs = () => {
    Object.keys(dialogStates.value).forEach(key => {
      dialogStates.value[key] = false
    })
  }
  
  /**
   * 设置选中的活动
   */
  const setSelectedEvent = (event) => {
    selectedEvent.value = event
  }
  
  /**
   * 清除选中的活动
   */
  const clearSelectedEvent = () => {
    selectedEvent.value = null
  }
  
  /**
   * 设置面包屑导航
   */
  const setBreadcrumbs = (crumbs) => {
    breadcrumbs.value = crumbs
  }
  
  /**
   * 添加面包屑
   */
  const addBreadcrumb = (crumb) => {
    breadcrumbs.value.push(crumb)
  }
  
  /**
   * 清空面包屑
   */
  const clearBreadcrumbs = () => {
    breadcrumbs.value = []
  }
  
  /**
   * 添加消息
   */
  const addMessage = (message) => {
    const msg = {
      id: Date.now(),
      ...message,
      timestamp: new Date().toISOString()
    }
    messages.value.push(msg)
    
    // 3秒后自动移除
    setTimeout(() => {
      removeMessage(msg.id)
    }, 3000)
  }
  
  /**
   * 移除消息
   */
  const removeMessage = (messageId) => {
    const index = messages.value.findIndex(m => m.id === messageId)
    if (index !== -1) {
      messages.value.splice(index, 1)
    }
  }
  
  /**
   * 清空所有消息
   */
  const clearMessages = () => {
    messages.value = []
  }
  
  /**
   * 显示成功消息
   */
  const showSuccess = (text) => {
    addMessage({ type: 'success', text })
  }
  
  /**
   * 显示错误消息
   */
  const showError = (text) => {
    addMessage({ type: 'error', text })
  }
  
  /**
   * 显示警告消息
   */
  const showWarning = (text) => {
    addMessage({ type: 'warning', text })
  }
  
  /**
   * 显示信息消息
   */
  const showInfo = (text) => {
    addMessage({ type: 'info', text })
  }
  
  /**
   * 从 localStorage 恢复状态
   */
  const restoreAppState = () => {
    const savedSidebarState = localStorage.getItem('sidebarCollapsed')
    const savedTheme = localStorage.getItem('theme')
    
    if (savedSidebarState !== null) {
      sidebarCollapsed.value = savedSidebarState === 'true'
    }
    
    if (savedTheme) {
      theme.value = savedTheme
      applyTheme()
    }
    
    checkMobile()
  }
  
  // ==================== 初始化 ====================
  restoreAppState()

  return {
    // 状态
    sidebarCollapsed,
    theme,
    loading,
    isMobile,
    dialogStates,
    selectedEvent,
    breadcrumbs,
    messages,
    
    // Getters
    isDarkMode,
    hasMessages,
    
    // Actions
    toggleSidebar,
    setSidebarCollapsed,
    toggleTheme,
    setTheme,
    applyTheme,
    setLoading,
    checkMobile,
    setMobile,
    openDialog,
    closeDialog,
    closeAllDialogs,
    setSelectedEvent,
    clearSelectedEvent,
    setBreadcrumbs,
    addBreadcrumb,
    clearBreadcrumbs,
    addMessage,
    removeMessage,
    clearMessages,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    restoreAppState
  }
})

