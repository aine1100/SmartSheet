<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Top Navigation Bar -->
    <nav class="bg-white shadow-sm border-b border-gray-100 fixed w-full top-0 z-50">
      <div class="px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <button @click="toggleSidebar"
              class="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 lg:hidden transition-colors">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div class="flex-shrink-0 flex items-center ml-4 lg:ml-0">
              <div class="flex items-center space-x-3">
                <div
                  class="w-9 h-9 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg">
                  <span class="text-white font-bold text-lg">S</span>
                </div>
                <div>
                  <span class="text-xl font-bold text-gray-900">SmartSheet</span>
                  <span class="text-sm text-primary font-medium ml-1">AI</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Center - AI Search -->
          <div class="flex-1 flex items-center justify-center px-6 max-w-2xl">
            <div class="relative w-full">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <input v-model="searchQuery" @keyup.enter="handleAISearch"
                class="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white transition-all"
                placeholder="Ask AI to analyze data, create charts, or generate insights..." type="search">
            </div>
          </div>

          <!-- Right - Notifications & Profile -->
          <div class="flex items-center space-x-3">
            <!-- Quick Actions -->
            <button @click="createNewSpreadsheet"
              class="hidden md:flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-dark transition-all transform hover:scale-105">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>New</span>
            </button>

            <!-- Notifications -->
            <button
              class="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 17h5l-5 5v-5zM11 19H6a2 2 0 01-2-2V7a2 2 0 012-2h5m5 0v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span class="absolute -top-1 -right-1 block h-3 w-3 rounded-full bg-red-400 ring-2 ring-white"></span>
            </button>

            <!-- Profile Menu -->
            <div class="relative">
              <button @click="showProfileMenu = !showProfileMenu"
                class="flex items-center space-x-3 p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <div
                  class="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center">
                  <span class="text-white font-medium text-sm">{{ userInitials }}</span>
                </div>
                <div class="hidden md:block text-left">
                  <p class="text-sm font-medium text-gray-900">{{ userName }}</p>
                  <p class="text-xs text-gray-500">Freelancer</p>
                </div>
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <!-- Profile Dropdown -->
              <div v-if="showProfileMenu"
                class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                <div class="px-4 py-3 border-b border-gray-100">
                  <p class="text-sm font-medium text-gray-900">{{ userName }}</p>
                  <p class="text-xs text-gray-500">{{ userEmail }}</p>
                </div>
                <router-link to="/dashboard/settings"
                  class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <svg class="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Account Settings
                </router-link>
                <a href="#" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <svg class="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  Subscription
                </a>
                <a href="#" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <svg class="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Help & Support
                </a>
                <hr class="my-2">
                <button @click="handleLogout"
                  class="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                  <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Sidebar -->
    <div class="flex pt-16">
      <div :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
        class="fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:top-16 lg:h-screen pt-16">
        <div class="flex flex-col h-full">
          <!-- User Profile Section -->
         
          <nav class="px-4 pb-6 space-y-2">
            <router-link v-for="item in navigation" :key="item.name" :to="item.href" :class="[
              $route.path === item.href
                ? 'bg-primary text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              'group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200'
            ]">
              <component :is="item.icon" :class="$route.path === item.href ? 'text-white' : 'text-gray-400'"
                class="mr-3 h-5 w-5" />
              <span class="flex-1">{{ item.name }}</span>
              <span v-if="item.badge"
                :class="$route.path === item.href ? 'bg-white text-primary' : 'bg-red-100 text-red-600'"
                class="ml-auto text-xs font-medium px-2 py-0.5 rounded-full">
                {{ item.badge }}
              </span>
            </router-link>
          </nav>

          <!-- Subscription Status Card -->
          <div class="px-4 pb-6">
            <div class="bg-gradient-to-br from-primary to-primary-dark rounded-xl p-4 text-white shadow-lg">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold">{{ subscriptionPlan }}</span>
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-white rounded-full mr-2"></div>
                  <span class="text-xs">Active</span>
                </div>
              </div>
              <div class="mb-3">
                <p class="text-xs opacity-90 text-white">{{ daysRemaining }} days remaining</p>
                <div class="w-full bg-white/20 rounded-full h-1.5 mt-2">
                  <div class="bg-white h-1.5 rounded-full transition-all duration-300"
                    :style="{ width: subscriptionProgress + '%' }"></div>
                </div>
              </div>
              <button @click="upgradeSubscription"
                class="w-full bg-white text-primary text-sm font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors">
                {{ subscriptionPlan === 'Free Plan' ? 'Upgrade Now' : 'Extend Plan' }}
              </button>
            </div>
          </div>


        </div>
      </div>

      <!-- Overlay for mobile -->
      <div v-if="sidebarOpen" @click="sidebarOpen = false"
        class="fixed inset-0 z-30 bg-gray-600 bg-opacity-50 lg:hidden"></div>

      <!-- Main Content -->
      <div class="flex-1 lg:ml-0">
        <main class="p-6">
          <router-view />
        </main>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: 'DashboardLayout',
  data() {
    return {
      sidebarOpen: false,
      showProfileMenu: false,
      searchQuery: '',
      subscriptionPlan: 'Free Plan', // or 'Pro Plan', 'Premium Plan'
      subscriptionEndDate: new Date('2024-04-15'), // Example end date
      navigation: [
        {
          name: 'Dashboard',
          href: '/dashboard',
          icon: 'HomeIcon'
        },
        {
          name: 'My Spreadsheets',
          href: '/dashboard/spreadsheets',
          icon: 'DocumentIcon'
        },
        {
          name: 'AI Analysis',
          href: '/dashboard/ai-analysis',
          icon: 'AIIcon'
        },
        {
          name: 'Charts & Visualizations',
          href: '/dashboard/charts',
          icon: 'ChartIcon'
        },

        {
          name: 'Reports',
          href: '/dashboard/reports',
          icon: 'ReportIcon'
        },
        {
          name: 'Integrations',
          href: '/dashboard/integrations',
          icon: 'IntegrationIcon'
        },
        {
          name: 'Settings',
          href: '/dashboard/settings',
          icon: 'CogIcon'
        }
      ]
    }
  },
  computed: {
    userInitials() {
      const user = JSON.parse(localStorage.getItem('smartsheet_user') || '{}')
      const name = user.name || 'User'
      return name.charAt(0).toUpperCase()
    },
    userName() {
      const user = JSON.parse(localStorage.getItem('smartsheet_user') || '{}')
      return user.name || 'John Doe'
    },
    userEmail() {
      const user = JSON.parse(localStorage.getItem('smartsheet_user') || '{}')
      return user.email || 'john@example.com'
    },
    daysRemaining() {
      const today = new Date()
      const timeDiff = this.subscriptionEndDate.getTime() - today.getTime()
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
      return Math.max(0, daysDiff)
    },
    subscriptionProgress() {
      // Assuming a 30-day subscription cycle
      const totalDays = 30
      const remaining = this.daysRemaining
      return Math.max(0, Math.min(100, (remaining / totalDays) * 100))
    }
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
    },
    handleLogout() {
      localStorage.removeItem('smartsheet_user')
      this.showProfileMenu = false
      this.$router.push('/')
    },
    handleAISearch() {
      if (this.searchQuery.trim()) {
        this.$router.push(`/dashboard/ai-analysis?q=${encodeURIComponent(this.searchQuery)}`)
        this.searchQuery = ''
      }
    },
    createNewSpreadsheet() {
      this.$router.push('/dashboard/spreadsheet-editor/new')
    },
    upgradeSubscription() {
      // Handle subscription upgrade
      this.$router.push('/dashboard/settings?tab=subscription')
    }
  },
  components: {
    HomeIcon: {
      template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>`
    },
    DocumentIcon: {
      template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>`
    },
    AIIcon: {
      template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>`
    },
    ChartIcon: {
      template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>`
    },

    ReportIcon: {
      template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>`
    },
    IntegrationIcon: {
      template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>`
    },
    CogIcon: {
      template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`
    }
  },
  mounted() {
    // Close menus when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.showProfileMenu = false
      }
    })
  }
}
</script>