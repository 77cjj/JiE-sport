import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * Events Store - 管理活动数据
 */
export const useEventsStore = defineStore('events', () => {
  // ==================== 状态 ====================
  
  // 所有活动列表
  const allEvents = ref([])
  
  // 热门活动列表
  const hotEvents = ref([
    {
      id: 1,
      title: "春季篮球赛",
      desc: "报名截止时间：3月20日",
      cover: "../public/images/1.jpg",
      date: "2025年3月25日 - 4月10日",
      location: "校体育馆篮球场",
      participants: "5人制，限额16支队伍",
      status: "报名中",
      category: "篮球",
      description: "春季篮球赛是学校最具影响力的体育赛事之一，旨在增强学生体质，培养团队精神，丰富校园文化生活。比赛采用淘汰赛制，为期两周。",
      highlights: [
        "🏆 冠军队伍可获得奖金及荣誉证书",
        "🎖️ 表现优异者有机会入选校队",
        "📸 全程专业摄影记录精彩瞬间",
        "🎁 所有参赛队员均可获得纪念品"
      ]
    },
    {
      id: 2,
      title: "校园马拉松",
      desc: "报名截止时间：4月5日",
      cover: "../public/images/1.jpg",
      date: "2025年4月10日 上午8:00",
      location: "校园环形跑道（全程5公里）",
      participants: "个人赛，不限人数",
      status: "报名中",
      category: "田径",
      description: "校园马拉松是一项全校性的长跑活动，鼓励全体师生参与，提倡健康生活方式，挑战自我极限。赛道环绕校园最美风景线。",
      highlights: [
        "🏃 完赛者均可获得完赛奖牌",
        "⏱️ 前10名选手获得特别奖励",
        "💧 全程补给站提供能量补给",
        "🎵 赛道沿途设置音乐加油站"
      ]
    },
    {
      id: 3,
      title: "足球友谊赛",
      desc: "报名截止时间：4月15日",
      cover: "../public/images/1.jpg",
      date: "2025年4月20日 - 4月30日",
      location: "校足球场",
      participants: "11人制，限额12支队伍",
      status: "报名中",
      category: "足球",
      description: "足球友谊赛是促进各学院交流的重要平台，以友谊第一、比赛第二为宗旨，在绿茵场上挥洒青春汗水，展现团队协作精神。",
      highlights: [
        "⚽ 提供专业裁判和比赛用球",
        "🥇 设置最佳射手、最佳守门员等单项奖",
        "🎪 决赛现场设置观众互动环节",
        "📺 比赛全程线上直播"
      ]
    }
  ])
  
  // 用户已报名的活动
  const registeredEvents = ref([
    { 
      id: 101,
      title: "校运会 100 米预赛", 
      date: "2025-09-10", 
      location: "东操场",
      status: "upcoming",
      registrationTime: "2025-09-01"
    },
    { 
      id: 102,
      title: "篮球友谊赛", 
      date: "2025-09-15", 
      location: "体育馆",
      status: "upcoming",
      registrationTime: "2025-09-02"
    }
  ])
  
  // 用户历史活动记录
  const historyEvents = ref([
    { 
      id: 201,
      title: "羽毛球公开赛", 
      date: "2025-05-03", 
      result: "八强",
      location: "羽毛球馆",
      status: "completed"
    },
    { 
      id: 202,
      title: "足球院系杯", 
      date: "2025-06-20", 
      result: "季军",
      location: "足球场",
      status: "completed"
    }
  ])
  
  // 用户通知列表
  const notifications = ref([
    { 
      id: 1,
      message: "你已成功报名校运会 100 米预赛", 
      date: "2025-09-01",
      type: "success",
      read: false
    },
    { 
      id: 2,
      message: "篮球友谊赛报名截止时间：9月12日", 
      date: "2025-09-02",
      type: "warning",
      read: false
    }
  ])

  // ==================== Getters ====================
  
  // 获取进行中的活动
  const ongoingEvents = computed(() => {
    return hotEvents.value.filter(event => event.status === '报名中')
  })
  
  // 获取即将开始的活动（已报名）
  const upcomingEvents = computed(() => {
    return registeredEvents.value.filter(event => event.status === 'upcoming')
  })
  
  // 获取已完成的活动
  const completedEvents = computed(() => {
    return historyEvents.value.filter(event => event.status === 'completed')
  })
  
  // 未读通知数量
  const unreadNotificationsCount = computed(() => {
    return notifications.value.filter(n => !n.read).length
  })
  
  // 按分类获取活动
  const getEventsByCategory = computed(() => {
    return (category) => {
      return hotEvents.value.filter(event => event.category === category)
    }
  })

  // ==================== Actions ====================
  
  /**
   * 获取所有活动（从 API）
   */
  const fetchAllEvents = async () => {
    try {
      // TODO: 调用 API
      // const response = await getEventsAPI()
      // allEvents.value = response.data
      
      // 暂时使用 hotEvents 作为所有活动
      allEvents.value = hotEvents.value
      return { success: true }
    } catch (error) {
      console.error('获取活动失败:', error)
      return { success: false, message: '获取活动失败' }
    }
  }
  
  /**
   * 根据 ID 获取活动详情
   */
  const getEventById = (eventId) => {
    return hotEvents.value.find(event => event.id === eventId) || 
           registeredEvents.value.find(event => event.id === eventId) ||
           historyEvents.value.find(event => event.id === eventId)
  }
  
  /**
   * 报名活动
   */
  const registerEvent = async (eventId) => {
    try {
      const event = getEventById(eventId)
      if (!event) {
        return { success: false, message: '活动不存在' }
      }
      
      // 检查是否已报名
      const alreadyRegistered = registeredEvents.value.some(e => e.id === eventId)
      if (alreadyRegistered) {
        return { success: false, message: '您已报名该活动' }
      }
      
      // TODO: 调用报名 API
      // const response = await registerEventAPI(eventId)
      
      // 添加到已报名列表
      registeredEvents.value.push({
        id: eventId,
        title: event.title,
        date: event.date,
        location: event.location,
        status: 'upcoming',
        registrationTime: new Date().toISOString().split('T')[0]
      })
      
      // 添加通知
      notifications.value.unshift({
        id: Date.now(),
        message: `你已成功报名 ${event.title}`,
        date: new Date().toISOString().split('T')[0],
        type: 'success',
        read: false
      })
      
      // 保存到 localStorage
      localStorage.setItem('registeredEvents', JSON.stringify(registeredEvents.value))
      localStorage.setItem('notifications', JSON.stringify(notifications.value))
      
      return { success: true, message: '报名成功' }
    } catch (error) {
      console.error('报名失败:', error)
      return { success: false, message: '报名失败，请稍后重试' }
    }
  }
  
  /**
   * 取消报名
   */
  const cancelRegistration = async (eventId) => {
    try {
      // TODO: 调用取消报名 API
      // const response = await cancelRegistrationAPI(eventId)
      
      const index = registeredEvents.value.findIndex(e => e.id === eventId)
      if (index === -1) {
        return { success: false, message: '未找到该报名记录' }
      }
      
      const event = registeredEvents.value[index]
      registeredEvents.value.splice(index, 1)
      
      // 添加通知
      notifications.value.unshift({
        id: Date.now(),
        message: `你已取消报名 ${event.title}`,
        date: new Date().toISOString().split('T')[0],
        type: 'info',
        read: false
      })
      
      // 保存到 localStorage
      localStorage.setItem('registeredEvents', JSON.stringify(registeredEvents.value))
      localStorage.setItem('notifications', JSON.stringify(notifications.value))
      
      return { success: true, message: '取消报名成功' }
    } catch (error) {
      console.error('取消报名失败:', error)
      return { success: false, message: '取消报名失败' }
    }
  }
  
  /**
   * 标记通知为已读
   */
  const markNotificationAsRead = (notificationId) => {
    const notification = notifications.value.find(n => n.id === notificationId)
    if (notification) {
      notification.read = true
      localStorage.setItem('notifications', JSON.stringify(notifications.value))
    }
  }
  
  /**
   * 标记所有通知为已读
   */
  const markAllNotificationsAsRead = () => {
    notifications.value.forEach(n => n.read = true)
    localStorage.setItem('notifications', JSON.stringify(notifications.value))
  }
  
  /**
   * 添加活动到历史记录
   */
  const addToHistory = (event, result) => {
    historyEvents.value.push({
      ...event,
      result,
      status: 'completed'
    })
    localStorage.setItem('historyEvents', JSON.stringify(historyEvents.value))
  }
  
  /**
   * 从 localStorage 恢复数据
   */
  const restoreEventsData = () => {
    const savedRegistered = localStorage.getItem('registeredEvents')
    const savedHistory = localStorage.getItem('historyEvents')
    const savedNotifications = localStorage.getItem('notifications')
    
    if (savedRegistered) {
      registeredEvents.value = JSON.parse(savedRegistered)
    }
    
    if (savedHistory) {
      historyEvents.value = JSON.parse(savedHistory)
    }
    
    if (savedNotifications) {
      notifications.value = JSON.parse(savedNotifications)
    }
  }
  
  // ==================== 初始化 ====================
  restoreEventsData()

  return {
    // 状态
    allEvents,
    hotEvents,
    registeredEvents,
    historyEvents,
    notifications,
    
    // Getters
    ongoingEvents,
    upcomingEvents,
    completedEvents,
    unreadNotificationsCount,
    getEventsByCategory,
    
    // Actions
    fetchAllEvents,
    getEventById,
    registerEvent,
    cancelRegistration,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    addToHistory,
    restoreEventsData
  }
})

