<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Integrations</h1>
        <p class="text-gray-600">Connect SmartSheet with your favorite tools and services</p>
      </div>
      <button class="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors">
        Browse All Integrations
      </button>
    </div>

    <!-- Connected Integrations -->
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Connected Integrations</h3>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="integration in connectedIntegrations" :key="integration.id" 
               class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center space-x-3">
                <img :src="integration.logo" :alt="integration.name" class="w-10 h-10 rounded-lg">
                <div>
                  <h4 class="font-medium text-gray-900">{{ integration.name }}</h4>
                  <p class="text-sm text-gray-500">{{ integration.category }}</p>
                </div>
              </div>
              <span class="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                Connected
              </span>
            </div>
            <p class="text-sm text-gray-600 mb-4">{{ integration.description }}</p>
            <div class="flex items-center justify-between">
              <span class="text-xs text-gray-500">Last sync: {{ integration.lastSync }}</span>
              <div class="flex space-x-2">
                <button class="text-primary hover:text-primary-dark text-sm font-medium">Configure</button>
                <button class="text-red-600 hover:text-red-900 text-sm font-medium">Disconnect</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Available Integrations -->
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 class="text-lg font-medium text-gray-900">Available Integrations</h3>
        <div class="flex items-center space-x-4">
          <CustomDropdown
            v-model="selectedCategory"
            :options="categoryOptions"
            placeholder="All Categories"
            class="w-40"
          />
          <div class="relative">
            <input v-model="searchQuery" type="text" placeholder="Search integrations..." 
                   class="pl-8 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent">
            <svg class="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="integration in filteredAvailableIntegrations" :key="integration.id" 
               class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="flex items-center space-x-3 mb-3">
              <img :src="integration.logo" :alt="integration.name" class="w-10 h-10 rounded-lg">
              <div>
                <h4 class="font-medium text-gray-900">{{ integration.name }}</h4>
                <p class="text-sm text-gray-500">{{ integration.category }}</p>
              </div>
            </div>
            <p class="text-sm text-gray-600 mb-4">{{ integration.description }}</p>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <div class="flex">
                  <svg v-for="i in 5" :key="i" 
                       :class="i <= integration.rating ? 'text-yellow-400' : 'text-gray-300'" 
                       class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span class="text-xs text-gray-500">({{ integration.reviews }})</span>
              </div>
              <button @click="connectIntegration(integration)" 
                      class="bg-primary text-white px-3 py-1 rounded text-sm font-medium hover:bg-primary-dark transition-colors">
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Integration Categories -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="category in integrationCategories" :key="category.id" 
           class="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow cursor-pointer">
        <div class="flex items-center mb-4">
          <div :class="category.iconBg" class="p-2 rounded-lg mr-3">
            <component :is="category.icon" class="w-6 h-6" :class="category.iconColor" />
          </div>
          <h3 class="font-semibold text-gray-900">{{ category.name }}</h3>
        </div>
        <p class="text-gray-600 text-sm mb-4">{{ category.description }}</p>
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-500">{{ category.count }} integrations</span>
          <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Integration Stats -->
    <div class="bg-white rounded-lg shadow p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Integration Activity</h3>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="text-center">
          <div class="text-2xl font-bold text-primary">{{ stats.totalConnections }}</div>
          <div class="text-sm text-gray-600">Total Connections</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-green-600">{{ stats.activeSync }}</div>
          <div class="text-sm text-gray-600">Active Syncs</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-blue-600">{{ stats.dataTransferred }}</div>
          <div class="text-sm text-gray-600">Data Transferred</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-purple-600">{{ stats.automations }}</div>
          <div class="text-sm text-gray-600">Automations</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomDropdown from '../../components/CustomDropdown.vue'

export default {
  name: 'Integrations',
  components: {
    CustomDropdown
  },
  data() {
    return {
      selectedCategory: 'all',
      searchQuery: '',
      categoryOptions: [
        { value: 'all', label: 'All Categories', icon: 'GridIcon' },
        { value: 'productivity', label: 'Productivity', icon: 'ProductivityIcon' },
        { value: 'communication', label: 'Communication', icon: 'CommunicationIcon' },
        { value: 'analytics', label: 'Analytics', icon: 'AnalyticsIcon' },
        { value: 'storage', label: 'Cloud Storage', icon: 'StorageIcon' },
        { value: 'crm', label: 'CRM', icon: 'CRMIcon' }
      ],
      connectedIntegrations: [
        {
          id: 1,
          name: 'Google Sheets',
          category: 'Productivity',
          description: 'Sync data between SmartSheet and Google Sheets automatically',
          logo: 'https://via.placeholder.com/40x40/4285F4/white?text=GS',
          lastSync: '2 minutes ago'
        },
        {
          id: 2,
          name: 'Slack',
          category: 'Communication',
          description: 'Get notifications and updates directly in your Slack channels',
          logo: 'https://via.placeholder.com/40x40/4A154B/white?text=S',
          lastSync: '1 hour ago'
        },
        {
          id: 3,
          name: 'Salesforce',
          category: 'CRM',
          description: 'Sync customer data and sales information with Salesforce',
          logo: 'https://via.placeholder.com/40x40/00A1E0/white?text=SF',
          lastSync: '3 hours ago'
        }
      ],
      availableIntegrations: [
        {
          id: 4,
          name: 'Microsoft Excel',
          category: 'productivity',
          description: 'Import and export data to Microsoft Excel files',
          logo: 'https://via.placeholder.com/40x40/217346/white?text=XL',
          rating: 5,
          reviews: 1234
        },
        {
          id: 5,
          name: 'Zapier',
          category: 'productivity',
          description: 'Connect with 3000+ apps through Zapier automation',
          logo: 'https://via.placeholder.com/40x40/FF4A00/white?text=Z',
          rating: 4,
          reviews: 856
        },
        {
          id: 6,
          name: 'Dropbox',
          category: 'storage',
          description: 'Store and sync your spreadsheets with Dropbox',
          logo: 'https://via.placeholder.com/40x40/0061FF/white?text=DB',
          rating: 4,
          reviews: 567
        },
        {
          id: 7,
          name: 'Microsoft Teams',
          category: 'communication',
          description: 'Share spreadsheets and collaborate in Teams',
          logo: 'https://via.placeholder.com/40x40/6264A7/white?text=MT',
          rating: 4,
          reviews: 432
        },
        {
          id: 8,
          name: 'Tableau',
          category: 'analytics',
          description: 'Create advanced visualizations with Tableau',
          logo: 'https://via.placeholder.com/40x40/E97627/white?text=T',
          rating: 5,
          reviews: 789
        },
        {
          id: 9,
          name: 'HubSpot',
          category: 'crm',
          description: 'Sync marketing and sales data with HubSpot',
          logo: 'https://via.placeholder.com/40x40/FF7A59/white?text=HS',
          rating: 4,
          reviews: 654
        }
      ],
      integrationCategories: [
        {
          id: 1,
          name: 'Productivity',
          description: 'Tools to enhance your workflow and productivity',
          count: 25,
          icon: 'ProductivityIcon',
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600'
        },
        {
          id: 2,
          name: 'Communication',
          description: 'Stay connected with your team and clients',
          count: 18,
          icon: 'CommunicationIcon',
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600'
        },
        {
          id: 3,
          name: 'Analytics',
          description: 'Advanced data analysis and visualization tools',
          count: 12,
          icon: 'AnalyticsIcon',
          iconBg: 'bg-purple-100',
          iconColor: 'text-purple-600'
        },
        {
          id: 4,
          name: 'Cloud Storage',
          description: 'Secure storage and file synchronization',
          count: 15,
          icon: 'StorageIcon',
          iconBg: 'bg-yellow-100',
          iconColor: 'text-yellow-600'
        },
        {
          id: 5,
          name: 'CRM',
          description: 'Customer relationship management systems',
          count: 20,
          icon: 'CRMIcon',
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600'
        },
        {
          id: 6,
          name: 'Automation',
          description: 'Workflow automation and process optimization',
          count: 30,
          icon: 'AutomationIcon',
          iconBg: 'bg-indigo-100',
          iconColor: 'text-indigo-600'
        }
      ],
      stats: {
        totalConnections: 12,
        activeSync: 8,
        dataTransferred: '2.4GB',
        automations: 15
      }
    }
  },
  computed: {
    filteredAvailableIntegrations() {
      let filtered = this.availableIntegrations

      // Apply search filter
      if (this.searchQuery) {
        filtered = filtered.filter(integration => 
          integration.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          integration.description.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      }

      // Apply category filter
      if (this.selectedCategory !== 'all') {
        filtered = filtered.filter(integration => integration.category === this.selectedCategory)
      }

      return filtered
    }
  },
  methods: {
    connectIntegration(integration) {
      console.log('Connecting integration:', integration.name)
      // Handle integration connection
    }
  },
  components: {
    ProductivityIcon: {
      template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>`
    },
    CommunicationIcon: {
      template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>`
    },
    AnalyticsIcon: {
      template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>`
    },
    StorageIcon: {
      template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" /></svg>`
    },
    CRMIcon: {
      template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>`
    },
    AutomationIcon: {
      template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`
    },
    GridIcon: {
      template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>`
    }
  }
}
</script>