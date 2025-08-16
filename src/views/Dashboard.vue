<template>
  <div class="space-y-8">
    <!-- Welcome Section -->
    <div class="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-8 text-white">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold mb-2 text-white">Welcome back, {{ userName }}! 👋</h1>
          <p class=" opacity-90 text-white">{{ currentDate }}</p>
          <p class="text-white/80 mt-2">Ready to analyze your data and create insights?</p>
        </div>
        <div class="hidden md:block">
          <div class="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
            <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <button @click="createNewSpreadsheet" class="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all duration-200">
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
            <svg class="w-6 h-6 text-primary group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <div class="text-left">
            <h3 class="font-semibold text-gray-900 group-hover:text-primary">Create New</h3>
            <p class="text-sm text-gray-500">Start from scratch</p>
          </div>
        </div>
      </button>

      <div class="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all duration-200 relative">
        <input
          ref="fileInput"
          type="file"
          accept=".xlsx,.xls,.csv"
          multiple
          @change="handleFileUpload"
          class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div class="flex items-center space-x-4 pointer-events-none">
          <div class="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-colors">
            <svg class="w-6 h-6 text-blue-500 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
          </div>
          <div class="text-left">
            <h3 class="font-semibold text-gray-900 group-hover:text-blue-500">Upload</h3>
            <p class="text-sm text-gray-500">Import Excel, CSV files</p>
          </div>
        </div>
      </div>

      <button @click="runAIAnalysis" class="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all duration-200">
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-purple-50 rounded-lg group-hover:bg-purple-500 group-hover:text-white transition-colors">
            <svg class="w-6 h-6 text-purple-500 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div class="text-left">
            <h3 class="font-semibold text-gray-900 group-hover:text-purple-500">AI Analysis</h3>
            <p class="text-sm text-gray-500">Get instant insights</p>
          </div>
        </div>
      </button>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Spreadsheets</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">{{ stats.totalSpreadsheets }}</p>
            <p class="text-sm text-green-600 mt-1">+{{ stats.spreadsheetGrowth }}% this month</p>
          </div>
          <div class="p-3 bg-primary/10 rounded-lg">
            <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">AI Analyses Run</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">{{ stats.totalAnalyses }}</p>
            <p class="text-sm text-green-600 mt-1">+{{ stats.analysisGrowth }}% this month</p>
          </div>
          <div class="p-3 bg-purple-100 rounded-lg">
            <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Last Forecast</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">${{ stats.lastForecast }}</p>
            <p class="text-sm text-gray-500 mt-1">Revenue projection</p>
          </div>
          <div class="p-3 bg-green-100 rounded-lg">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Recent Files -->
      <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
        <div class="px-6 py-4 border-b border-gray-100">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Recent Files</h3>
            <router-link to="/dashboard/spreadsheets" class="text-primary hover:text-primary-dark text-sm font-medium">
              View All
            </router-link>
          </div>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="file in recentFiles" :key="file.id" 
                 @click="openFile(file)"
                 class="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group">
              <div class="flex items-center space-x-4">
                <div class="p-2 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                  <svg class="w-5 h-5 text-primary group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900 group-hover:text-primary">{{ file.name }}</h4>
                  <p class="text-sm text-gray-500">{{ file.lastModified }}</p>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <span :class="getStatusClass(file.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                  {{ file.status }}
                </span>
                <div class="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button class="p-1 text-gray-400 hover:text-primary">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button class="p-1 text-gray-400 hover:text-primary">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- AI Insights Panel -->
      <div class="space-y-6">
        <!-- AI Insights -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100">
          <div class="px-6 py-4 border-b border-gray-100">
            <h3 class="text-lg font-semibold text-gray-900">AI Insights</h3>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div v-for="insight in aiInsights" :key="insight.id" 
                   class="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100">
                <div class="flex items-start space-x-3">
                  <div class="p-1 bg-purple-100 rounded-full">
                    <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ insight.title }}</p>
                    <p class="text-xs text-gray-600 mt-1">{{ insight.description }}</p>
                    <button class="text-xs text-purple-600 hover:text-purple-800 mt-2 font-medium">
                      Apply Suggestion →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100">
          <div class="px-6 py-4 border-b border-gray-100">
            <h3 class="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </div>
          <div class="p-6">
            <div class="space-y-3">
              <button @click="createNewSpreadsheet" class="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <div class="p-2 bg-primary/10 rounded-lg">
                  <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">Create New</p>
                  <p class="text-xs text-gray-500">Start from scratch</p>
                </div>
              </button>
              <button @click="runAIAnalysis" class="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <div class="p-2 bg-purple-100 rounded-lg">
                  <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">AI Analysis</p>
                  <p class="text-xs text-gray-500">Get instant insights</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      stats: {
        totalSpreadsheets: 24,
        spreadsheetGrowth: 12,
        totalAnalyses: 156,
        analysisGrowth: 23,
        lastForecast: '45.2K'
      },
      recentFiles: [
        {
          id: 1,
          name: 'Q4 Revenue Analysis',
          lastModified: '2 hours ago',
          status: 'Processing'
        },
        {
          id: 2,
          name: 'Client Invoice Tracker',
          lastModified: '1 day ago',
          status: 'Completed'
        },
        {
          id: 3,
          name: 'Project Budget 2024',
          lastModified: '3 days ago',
          status: 'Draft'
        },
        {
          id: 4,
          name: 'Expense Report March',
          lastModified: '1 week ago',
          status: 'Completed'
        }
      ],
      aiInsights: [
        {
          id: 1,
          title: 'Revenue Trend Detected',
          description: 'Your income has grown 15% this quarter. Consider expanding your services.'
        },
        {
          id: 2,
          title: 'Expense Optimization',
          description: 'AI found potential savings of $1,200/month in your expense categories.'
        },
        {
          id: 3,
          title: 'Client Pattern Analysis',
          description: 'Your top 3 clients generate 67% of revenue. Focus on similar prospects.'
        }
      ],

    }
  },
  computed: {
    userName() {
      const user = JSON.parse(localStorage.getItem('smartsheet_user') || '{}')
      return user.name || 'John'
    },
    currentDate() {
      return new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    }
  },
  methods: {
    createNewSpreadsheet() {
      this.$router.push('/dashboard/spreadsheet-editor/new')
    },
    handleFileUpload(event) {
      const files = event.target.files
      if (files.length > 0) {
        for (let file of files) {
          this.processUploadedFile(file)
        }
      }
    },
    processUploadedFile(file) {
      // Create a new spreadsheet entry
      const newSpreadsheet = {
        id: Date.now() + Math.random(),
        name: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
        description: `Uploaded ${file.type || 'file'}`,
        lastModified: 'Just now',
        status: 'Processing',
        size: this.formatFileSize(file.size),
        file: file
      }
      
      // Add to recent files
      this.recentFiles.unshift(newSpreadsheet)
      if (this.recentFiles.length > 4) {
        this.recentFiles.pop()
      }
      
      // Simulate processing
      setTimeout(() => {
        newSpreadsheet.status = 'Completed'
        this.$router.push(`/dashboard/spreadsheet-editor/${newSpreadsheet.id}`)
      }, 1500)
    },
    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    },
    runAIAnalysis() {
      this.$router.push('/dashboard/ai-analysis')
    },
    openFile(file) {
      this.$router.push(`/dashboard/spreadsheet-editor/${file.id}`)
    },

    getStatusClass(status) {
      switch (status) {
        case 'Completed':
          return 'bg-green-100 text-green-800'
        case 'Processing':
          return 'bg-blue-100 text-blue-800'
        case 'Draft':
          return 'bg-yellow-100 text-yellow-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    }
  },

}
</script>