import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * User Store - 管理用户登录信息和个人资料
 */
export const useUserStore = defineStore('user', () => {
  // ==================== 状态 ====================
  const userInfo = ref({
    id: '',
    name: '',
    email: '',
    phone: '',
    avatar: '',
    department: '',
    studentId: '',
    grade: '',
    enrollmentYear: ''
  })

  // 用户统计数据
  const userStats = ref({
    registered: 0,    // 已报名活动数
    completed: 0,     // 已完成活动数
    awards: 0,        // 获奖数
    points: 0         // 积分
  })

  // 是否已登录
  const isLoggedIn = ref(false)

  // ==================== Getters ====================
  const fullName = computed(() => userInfo.value.name || '未登录用户')
  
  const userDisplayInfo = computed(() => {
    if (!isLoggedIn.value) return '请登录'
    return `${userInfo.value.department} · ${userInfo.value.studentId}`
  })

  const hasAvatar = computed(() => {
    return userInfo.value.avatar && userInfo.value.avatar !== ''
  })

  // ==================== Actions ====================
  
  /**
   * 设置用户信息
   */
  const setUserInfo = (info) => {
    userInfo.value = { ...userInfo.value, ...info }
    isLoggedIn.value = true
    // 保存到 localStorage
    localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
  }

  /**
   * 更新用户统计数据
   */
  const updateUserStats = (stats) => {
    userStats.value = { ...userStats.value, ...stats }
    localStorage.setItem('userStats', JSON.stringify(userStats.value))
  }

  /**
   * 用户登录
   */
  const login = async (loginData) => {
    try {
      // TODO: 调用登录 API
      // const response = await loginAPI(loginData)
      
      // 模拟登录响应数据
      const mockUserData = {
        id: '1',
        name: loginData.username || '张三',
        email: 'zhangsan@example.com',
        phone: '13800138000',
        avatar: '/src/assets/avatar.jpg',
        department: '计算机学院',
        studentId: '20230001',
        grade: '2023级',
        enrollmentYear: '2023'
      }
      
      setUserInfo(mockUserData)
      
      // 初始化统计数据
      updateUserStats({
        registered: 3,
        completed: 5,
        awards: 2,
        points: 150
      })
      
      return { success: true, message: '登录成功' }
    } catch (error) {
      console.error('登录失败:', error)
      return { success: false, message: '登录失败，请检查用户名和密码' }
    }
  }

  /**
   * 用户注册
   */
  const register = async (registerData) => {
    try {
      // TODO: 调用注册 API
      // const response = await registerAPI(registerData)
      
      return { success: true, message: '注册成功，请登录' }
    } catch (error) {
      console.error('注册失败:', error)
      return { success: false, message: '注册失败，请稍后重试' }
    }
  }

  /**
   * 用户登出
   */
  const logout = () => {
    userInfo.value = {
      id: '',
      name: '',
      email: '',
      phone: '',
      avatar: '',
      department: '',
      studentId: '',
      grade: '',
      enrollmentYear: ''
    }
    userStats.value = {
      registered: 0,
      completed: 0,
      awards: 0,
      points: 0
    }
    isLoggedIn.value = false
    
    // 清除 localStorage
    localStorage.removeItem('userInfo')
    localStorage.removeItem('userStats')
    localStorage.removeItem('token')
  }

  /**
   * 从 localStorage 恢复用户信息
   */
  const restoreUserInfo = () => {
    const savedUserInfo = localStorage.getItem('userInfo')
    const savedUserStats = localStorage.getItem('userStats')
    const token = localStorage.getItem('token')
    
    if (savedUserInfo && token) {
      userInfo.value = JSON.parse(savedUserInfo)
      isLoggedIn.value = true
    }
    
    if (savedUserStats) {
      userStats.value = JSON.parse(savedUserStats)
    }
  }

  /**
   * 更新用户头像
   */
  const updateAvatar = (avatarUrl) => {
    userInfo.value.avatar = avatarUrl
    localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
  }

  /**
   * 增加活动报名数
   */
  const incrementRegistered = () => {
    userStats.value.registered++
    localStorage.setItem('userStats', JSON.stringify(userStats.value))
  }

  /**
   * 增加活动完成数
   */
  const incrementCompleted = () => {
    userStats.value.completed++
    localStorage.setItem('userStats', JSON.stringify(userStats.value))
  }

  /**
   * 增加获奖数
   */
  const incrementAwards = () => {
    userStats.value.awards++
    localStorage.setItem('userStats', JSON.stringify(userStats.value))
  }

  // ==================== 初始化 ====================
  // 页面加载时恢复用户信息
  restoreUserInfo()

  return {
    // 状态
    userInfo,
    userStats,
    isLoggedIn,
    
    // Getters
    fullName,
    userDisplayInfo,
    hasAvatar,
    
    // Actions
    setUserInfo,
    updateUserStats,
    login,
    register,
    logout,
    restoreUserInfo,
    updateAvatar,
    incrementRegistered,
    incrementCompleted,
    incrementAwards
  }
})

