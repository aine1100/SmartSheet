<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">AI Analysis</h1>
        <p class="text-gray-600 mt-1">Get intelligent insights from your spreadsheet data</p>
      </div>
      <button 
        v-if="currentAnalysis" 
        @click="exportResults" 
        class="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
        Export Results
      </button>
    </div>

    <!-- File Selection Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Select Data Source</h2>
      
      <!-- Spreadsheet Selection -->
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Choose from existing spreadsheets:</label>
          <CustomDropdown
            v-model="selectedSpreadsheet"
            :options="spreadsheetOptions"
            placeholder="Select a spreadsheet..."
            @change="onSpreadsheetSelect"
            class="w-full"
          />
        </div>
        
        <div class="text-center text-gray-500">or</div>
        
        <!-- File Upload -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Upload a new file:</label>
          <div 
            @drop="handleFileDrop"
            @dragover.prevent
            @dragenter="handleDragEnter"
            @dragleave="handleDragLeave"
            class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors cursor-pointer"
            :class="{ 'border-green-400 bg-green-50': isDragging }"></div>
            <input 
              ref="fileInput"
              type="file" 
              @change="handleFileSelect"
              accept=".csv,.xlsx,.xls"
              class="hidden">
            <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p class="text-gray-600 mb-2">Drop your file here or click to browse</p>
            <p class="text-sm text-gray-500">Supports CSV, Excel (.xlsx, .xls)</p>
            <button 
              @click="$refs.fileInput.click()"
              class="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Choose File
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isAnalyzing" class="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Analyzing Your Data</h3>
        <p class="text-gray-600">Please wait while we generate insights from your spreadsheet...</p>
      </div>
    </div>

    <!-- Analysis Results -->
    <div v-if="currentAnalysis" class="bg-white rounded-xl shadow-sm border border-gray-100">
      <div class="px-6 py-4 border-b border-gray-100">
        <h3 class="text-lg font-semibold text-gray-900">Analysis Results</h3>
        <p class="text-sm text-gray-500">{{ currentAnalysis.fileName }}</p>
      </div>
      
      <div class="p-6 space-y-6">
        <!-- Summary Section -->
        <div class="bg-green-50 rounded-lg p-4 border border-green-200">
          <h4 class="font-semibold text-gray-900 mb-2 flex items-center">
            <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Summary
          </h4>
          <p class="text-gray-700">{{ currentAnalysis.summary }}</p>
        </div>

        <!-- Key Insights -->
        <div>
          <h4 class="font-semibold text-gray-900 mb-3 flex items-center">
            <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Key Insights
          </h4>
          <div class="space-y-2">
            <div v-for="insight in currentAnalysis.insights" :key="insight" 
                 class="flex items-start space-x-2">
              <span class="text-green-600 mt-1">•</span>
              <span class="text-gray-700">{{ insight }}</span>
            </div>
          </div>
        </div>

        <!-- Trends -->
        <div v-if="currentAnalysis.trends.length > 0">
          <h4 class="font-semibold text-gray-900 mb-3 flex items-center">
            <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Trends
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="trend in currentAnalysis.trends" :key="trend.metric" 
                 class="bg-gray-50 rounded-lg p-4 border">
              <div class="flex items-center justify-between mb-2">
                <span class="font-medium text-gray-900">{{ trend.metric }}</span>
                <span :class="trend.change >= 0 ? 'text-green-600' : 'text-red-600'" 
                      class="text-sm font-medium">
                  {{ trend.change >= 0 ? '+' : '' }}{{ trend.change }}%
                </span>
              </div>
              <p class="text-sm text-gray-600">{{ trend.description }}</p>
            </div>
          </div>
        </div>

        <!-- Basic Chart Visualization -->
        <div v-if="currentAnalysis.chartData">
          <h4 class="font-semibold text-gray-900 mb-3 flex items-center">
            <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Data Visualization
          </h4>
          <div class="bg-gray-50 rounded-lg p-6 border">
            <div class="h-64 flex items-center justify-center">
              <div class="text-center">
                <svg class="w-16 h-16 text-green-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p class="text-gray-600 font-medium">{{ currentAnalysis.chartData.title }}</p>
                <p class="text-sm text-gray-500 mt-1">{{ currentAnalysis.chartData.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Recommendations -->
        <div v-if="currentAnalysis.recommendations.length > 0">
          <h4 class="font-semibold text-gray-900 mb-3 flex items-center">
            <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Recommendations
          </h4>
          <div class="space-y-3">
            <div v-for="rec in currentAnalysis.recommendations" :key="rec" 
                 class="bg-green-50 border border-green-200 rounded-lg p-4">
              <p class="text-gray-700">{{ rec }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- AI Chat Section -->
    <div v-if="currentAnalysis" class="bg-white rounded-xl shadow-sm border border-gray-100">
      <div class="px-6 py-4 border-b border-gray-100">
        <h3 class="text-lg font-semibold text-gray-900 flex items-center">
          <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Ask AI About Your Data
        </h3>
        <p class="text-sm text-gray-500 mt-1">Get specific insights about your analysis</p>
      </div>
      
      <div class="p-6">
        <!-- Chat Messages -->
        <div class="space-y-4 mb-4 max-h-64 overflow-y-auto" ref="chatContainer">
          <div v-for="message in chatMessages" :key="message.id" 
               :class="['flex', message.type === 'user' ? 'justify-end' : 'justify-start']">
            <div :class="[
              'max-w-xs lg:max-w-md px-4 py-2 rounded-lg',
              message.type === 'user' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 text-gray-900'
            ]">
              <p class="text-sm">{{ message.content }}</p>
              <span class="text-xs opacity-75 mt-1 block">{{ message.timestamp }}</span>
            </div>
          </div>
          
          <!-- Typing indicator -->
          <div v-if="isTyping" class="flex justify-start">
            <div class="bg-gray-100 text-gray-900 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
              <div class="flex space-x-1">
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Chat Input -->
        <div class="flex space-x-3">
          <input
            v-model="chatInput"
            @keypress.enter="sendChatMessage"
            type="text"
            placeholder="Ask about your data analysis..."
            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <button
            @click="sendChatMessage"
            :disabled="!chatInput.trim() || isTyping"
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        
        <!-- Quick Questions -->
        <div class="mt-4">
          <p class="text-sm text-gray-600 mb-2">Quick questions:</p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="question in quickQuestions"
              :key="question"
              @click="askQuickQuestion(question)"
              class="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-green-100 hover:text-green-700 transition-colors">
              {{ question }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Analysis Actions -->
    <div v-if="!currentAnalysis && !isAnalyzing" class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div class="text-center">
        <svg class="w-16 h-16 text-green-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Ready to Analyze</h3>
        <p class="text-gray-600 mb-4">Select a spreadsheet or upload a file to get started with AI-powered insights</p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <button 
            @click="$refs.fileInput?.click()"
            class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
            Upload File
          </button>
          <button 
            v-if="spreadsheets.length > 0"
            @click="scrollToSelection"
            class="px-6 py-2 bg-white border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium">
            Choose Existing
          </button>
        </div>
      </div>
    </div>
</template>

<script>
import CustomDropdown from '../../components/CustomDropdown.vue'

export default {
  name: 'AIAnalysis',
  components: {
    CustomDropdown
  },
  data() {
    return {
      selectedSpreadsheet: '',
      currentAnalysis: null,
      isDragging: false,
      isAnalyzing: false,
      chatInput: '',
      chatMessages: [],
      isTyping: false,
      spreadsheets: [
        { id: 1, name: 'Q4 Revenue Analysis' },
        { id: 2, name: 'Client Invoice Tracker' },
        { id: 3, name: 'Project Budget 2024' },
        { id: 4, name: 'Expense Report March' }
      ],
      quickQuestions: [
        'What are the main trends?',
        'Any concerning patterns?',
        'Best performing metrics?',
        'Recommendations summary?'
      ]
    }
  },
  computed: {
    spreadsheetOptions() {
      return this.spreadsheets.map(sheet => ({
        value: sheet.id,
        label: sheet.name,
        description: `Spreadsheet created ${this.getRelativeDate()}`
      }))
    }
  },
  methods: {
    onSpreadsheetSelect(option) {
      if (option && option.value) {
        const selectedSheet = this.spreadsheets.find(s => s.id === option.value)
        if (selectedSheet) {
          this.runAnalysis(selectedSheet.name)
        }
      }
    },

    getRelativeDate() {
      const dates = ['2 days ago', '1 week ago', '3 days ago', '5 days ago']
      return dates[Math.floor(Math.random() * dates.length)]
    },

    scrollToSelection() {
      // Scroll to the selection area
      const selectionElement = document.querySelector('.bg-white.rounded-xl.shadow-sm.border.border-gray-100')
      if (selectionElement) {
        selectionElement.scrollIntoView({ behavior: 'smooth' })
      }
    },

    handleFileSelect(event) {
      const file = event.target.files[0]
      if (file) {
        this.processFile(file)
      }
    },

    handleFileDrop(event) {
      event.preventDefault()
      this.isDragging = false
      const file = event.dataTransfer.files[0]
      if (file) {
        this.processFile(file)
      }
    },

    handleDragEnter(event) {
      event.preventDefault()
      this.isDragging = true
    },

    handleDragLeave(event) {
      event.preventDefault()
      this.isDragging = false
    },

    processFile(file) {
      // Validate file type
      const allowedTypes = ['.csv', '.xlsx', '.xls']
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase()
      
      if (!allowedTypes.includes(fileExtension)) {
        alert('Please upload a CSV or Excel file (.csv, .xlsx, .xls)')
        return
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB')
        return
      }

      this.runAnalysis(file.name)
    },

    runAnalysis(fileName) {
      this.isAnalyzing = true
      this.chatMessages = [] // Clear previous chat
      
      // Simulate AI analysis processing
      setTimeout(() => {
        this.currentAnalysis = this.generateMockAnalysis(fileName)
        this.isAnalyzing = false
        
        // Add welcome message to chat
        this.chatMessages.push({
          id: Date.now(),
          type: 'ai',
          content: `Analysis complete for ${fileName}! I've identified key insights and trends. Feel free to ask me any questions about your data.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        })
      }, 2000)
    },

    generateMockAnalysis(fileName) {
      const analysisTypes = {
        'revenue': {
          summary: 'Your revenue data shows strong growth patterns with seasonal variations. Total revenue increased by 23% compared to the previous period.',
          insights: [
            'Revenue peaked in March with $15,100, representing 18% month-over-month growth',
            'Consistent upward trend observed across all quarters',
            'Average monthly growth rate of 12.5% indicates healthy business expansion',
            'Q4 performance exceeded projections by 8%'
          ],
          trends: [
            { metric: 'Monthly Revenue', change: 15.2, description: 'Steady increase over the analysis period' },
            { metric: 'Growth Rate', change: 12.5, description: 'Accelerating growth momentum' }
          ],
          recommendations: [
            'Continue current growth strategies as they are showing positive results',
            'Consider expanding marketing efforts during peak months (March-April)',
            'Prepare for seasonal variations by building cash reserves during high-revenue periods'
          ]
        },
        'expense': {
          summary: 'Expense analysis reveals optimization opportunities with 23% of costs in discretionary categories. Total monthly expenses average $8,400.',
          insights: [
            'Software subscriptions account for 28% of total expenses',
            'Office supplies represent 32% of monthly costs',
            'Travel expenses decreased by 15% compared to last quarter',
            'Potential savings of $1,200 per month identified'
          ],
          trends: [
            { metric: 'Total Expenses', change: -5.3, description: 'Successful cost reduction initiatives' },
            { metric: 'Software Costs', change: 8.2, description: 'Increased investment in productivity tools' }
          ],
          recommendations: [
            'Review software subscriptions for unused or duplicate services',
            'Negotiate bulk pricing for office supplies',
            'Implement expense approval workflow for discretionary spending'
          ]
        },
        'default': {
          summary: 'Comprehensive data analysis completed. Your dataset shows positive trends with several optimization opportunities identified.',
          insights: [
            'Data quality is excellent with 98% completeness across all fields',
            'Strong correlation found between key performance indicators',
            'Seasonal patterns detected that can inform future planning',
            'Growth trajectory is sustainable based on current metrics'
          ],
          trends: [
            { metric: 'Overall Performance', change: 11.8, description: 'Positive trend across key metrics' },
            { metric: 'Data Quality', change: 2.1, description: 'Improved data collection processes' }
          ],
          recommendations: [
            'Maintain current data collection practices',
            'Focus on areas showing the strongest positive trends',
            'Monitor seasonal patterns for strategic planning'
          ]
        }
      }

      // Determine analysis type based on filename
      let analysisType = 'default'
      if (fileName.toLowerCase().includes('revenue') || fileName.toLowerCase().includes('sales')) {
        analysisType = 'revenue'
      } else if (fileName.toLowerCase().includes('expense') || fileName.toLowerCase().includes('cost')) {
        analysisType = 'expense'
      }

      const analysis = analysisTypes[analysisType]

      return {
        fileName: fileName,
        timestamp: new Date().toLocaleString(),
        summary: analysis.summary,
        insights: analysis.insights,
        trends: analysis.trends,
        recommendations: analysis.recommendations,
        chartData: {
          title: `${fileName} - Trend Analysis`,
          description: 'Visual representation of key metrics and trends over time'
        }
      }
    },

    exportResults() {
      if (!this.currentAnalysis) return
      
      // Create export data
      const exportData = {
        fileName: this.currentAnalysis.fileName,
        analysisDate: this.currentAnalysis.timestamp,
        summary: this.currentAnalysis.summary,
        insights: this.currentAnalysis.insights,
        trends: this.currentAnalysis.trends,
        recommendations: this.currentAnalysis.recommendations
      }

      // Convert to JSON and download
      const dataStr = JSON.stringify(exportData, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = `analysis-${this.currentAnalysis.fileName}-${Date.now()}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    },

    sendChatMessage() {
      if (!this.chatInput.trim() || this.isTyping) return
      
      const userMessage = {
        id: Date.now(),
        type: 'user',
        content: this.chatInput.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      
      this.chatMessages.push(userMessage)
      const question = this.chatInput.trim()
      this.chatInput = ''
      
      // Simulate AI response
      this.isTyping = true
      setTimeout(() => {e(question)
        this.chatMessages.push({
          id: Date.now() + 1,
          type: 'ai',
          content: aiResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        })
        this.isTyping = false
        this.scrollChatToBottom()
      }, 1500)
      
      this.scrollChatom()
    },

    askQuickQuestion(question) {
      this.chatInput = question
      this.sendChatMessage()
    },

    generateAIResponse(question) {
      const responses = {
        'trends': 'Based on your data analysis, the main trends show consistent growth with seasonal variations. Revenue has increased by 15.2% month-over-month, and there\'s a clear upward trajectory in key performance metrics.',
        'concerning': 'I don\'t see any major red flags in your data. However, keep an eye on the slight dip in Q3 performance and monitor expense growth to ensure it stays proportional to revenue increases.',
        'performing': 'Your best performing metrics are Monthly Revenue (15.2% growth) and Growth Rate (12.5% acceleration). These indicate strong business momentum and effective strategies.',
        'recommendations': 'Key recommendations include: Continue current growth strategies, expand marketing during peak months, and build cash reserves for seasonal variations. Focus on maintaining data quality and monitoring trends.',
        'default': 'That\'s a great question! Based on your current analysis, I can see strong positive trends across most metrics. Your data shows healthy growth patterns with good potential for continued expansion.'
      }

      const lowerQuestion = question.toLowerCase()
      
      if (lowerQuestion.includes('trend')) return responses.trends
      if (lowerQuestion.includes('concern') || lowerQuestion.includes('problem')) return responses.concerning
      if (lowerQuestion.includes('best') || lowerQuestion.includes('perform')) return responses.performing
      if (lowerQuestion.includes('recommend')) return responses.recommendations
      
      return responses.default
    },

    scrollChatToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.chatContainer
        if (container) {
          container.scrollTop = container.scrollHeight
        }
      })
    }
  }
}
</script>