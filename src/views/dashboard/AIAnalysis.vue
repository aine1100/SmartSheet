<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">AI Analysis</h1>
        <p class="text-gray-600 mt-1">Get intelligent insights from your spreadsheet data</p>
      </div>
      <div class="flex items-center space-x-3">
        <CustomDropdown
          v-model="selectedSpreadsheet"
          :options="spreadsheetOptions"
          placeholder="Select spreadsheet..."
          searchable
          class="w-64"
        />
        <button @click="exportResults" class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
          Export Results
        </button>
      </div>
    </div>

    <!-- AI Prompt Section -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div class="flex items-center space-x-3 mb-6">
        <div class="p-3 bg-gradient-to-br from-primary to-primary-dark rounded-xl">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <h2 class="text-xl font-semibold text-gray-900">AI Assistant</h2>
          <p class="text-gray-500">Ask questions about your data or request analysis</p>
        </div>
      </div>

      <div class="relative">
        <textarea v-model="aiPrompt" 
                  @keydown.ctrl.enter="runAnalysis"
                  placeholder="Ask me anything about your data... 

Examples:
• Analyze sales trends for the last quarter
• Find patterns in customer behavior
• Predict next month's revenue
• Identify top performing products
• Compare expenses across categories"
                  class="w-full h-32 px-4 outline-none py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-gray-900 placeholder-gray-500"
                  rows="4"></textarea>
        <div class="absolute bottom-4 right-4 flex items-center space-x-2">
          <span class="text-xs text-gray-400">Ctrl + Enter to send</span>
          <button @click="runAnalysis" 
                  :disabled="!aiPrompt.trim() || isAnalyzing"
                  :class="[
                    'px-4 py-2 rounded-lg font-medium transition-all',
                    aiPrompt.trim() && !isAnalyzing 
                      ? 'bg-primary text-white hover:bg-primary-dark' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  ]">
            <span v-if="isAnalyzing" class="flex items-center space-x-2">
              <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Analyzing...</span>
            </span>
            <span v-else>Analyze</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Analysis Results -->
    <div v-if="analysisResults.length > 0" class="space-y-6">
      <!-- Chat Results -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div class="px-6 py-4 border-b border-gray-100">
          <h3 class="text-lg font-semibold text-gray-900">Analysis Results</h3>
        </div>
        <div class="p-6">
          <div class="space-y-6">
            <div v-for="result in analysisResults" :key="result.id" class="space-y-4">
              <!-- User Query -->
              <div class="flex justify-end">
                <div class="max-w-3xl bg-primary text-white rounded-2xl px-4 py-3">
                  <p class="text-sm">{{ result.query }}</p>
                </div>
              </div>
              
              <!-- AI Response -->
              <div class="flex justify-start">
                <div class="max-w-4xl bg-gray-50 rounded-2xl px-6 py-4">
                  <div class="flex items-start space-x-3">
                    <div class="p-2 bg-primary/10 rounded-lg">
                      <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div class="flex-1">
                      <p class="text-gray-900 mb-3">{{ result.response }}</p>
                      
                      <!-- Data Table -->
                      <div v-if="result.table" class="bg-white rounded-lg border border-gray-200 overflow-hidden mb-4">
                        <table class="min-w-full divide-y divide-gray-200">
                          <thead class="bg-gray-50">
                            <tr>
                              <th v-for="header in result.table.headers" :key="header" 
                                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {{ header }}
                              </th>
                            </tr>
                          </thead>
                          <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="(row, index) in result.table.rows" :key="index">
                              <td v-for="(cell, cellIndex) in row" :key="cellIndex" 
                                  class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                {{ cell }}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <!-- Chart -->
                      <div v-if="result.chart" class="bg-white rounded-lg border border-gray-200 p-4 mb-4">
                        <div class="h-64 flex items-center justify-center bg-gradient-to-br from-primary/5 to-blue-50 rounded-lg">
                          <div class="text-center">
                            <svg class="w-16 h-16 text-primary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            <p class="text-gray-600">{{ result.chart.title }}</p>
                            <p class="text-sm text-gray-500">Interactive chart would appear here</p>
                          </div>
                        </div>
                      </div>

                      <!-- Action Buttons -->
                      <div class="flex items-center space-x-3 mt-4">
                        <button class="text-primary hover:text-primary-dark text-sm font-medium">
                          📊 Create Chart
                        </button>
                        <button class="text-primary hover:text-primary-dark text-sm font-medium">
                          📄 Generate Report
                        </button>
                        <button class="text-primary hover:text-primary-dark text-sm font-medium">
                          💾 Save Analysis
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Analysis Options -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="option in quickAnalysisOptions" :key="option.id" 
           @click="runQuickAnalysis(option)"
           class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 cursor-pointer hover:shadow-md hover:border-primary/20 transition-all duration-200 group">
        <div class="flex items-center space-x-4 mb-4">
          <div :class="option.iconBg" class="p-3 rounded-lg group-hover:scale-110 transition-transform">
            <component :is="option.icon" :class="option.iconColor" class="w-6 h-6" />
          </div>
          <h3 class="font-semibold text-gray-900 group-hover:text-primary">{{ option.title }}</h3>
        </div>
        <p class="text-gray-600 text-sm mb-4">{{ option.description }}</p>
        <div class="flex items-center text-primary text-sm font-medium">
          <span>Run Analysis</span>
          <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Recent Analyses -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100">
      <div class="px-6 py-4 border-b border-gray-100">
        <h3 class="text-lg font-semibold text-gray-900">Recent Analyses</h3>
      </div>
      <div class="p-6">
        <div class="space-y-4">
          <div v-for="analysis in recentAnalyses" :key="analysis.id" 
               class="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
            <div class="flex items-center space-x-4">
              <div class="p-2 bg-primary/10 rounded-lg">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h4 class="font-medium text-gray-900">{{ analysis.title }}</h4>
                <p class="text-sm text-gray-500">{{ analysis.description }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <span :class="getStatusClass(analysis.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                {{ analysis.status }}
              </span>
              <span class="text-sm text-gray-500">{{ analysis.completedAt }}</span>
            </div>
          </div>
        </div>
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
      aiPrompt: '',
      selectedSpreadsheet: '',
      isAnalyzing: false,
      analysisResults: [],
      spreadsheets: [
        { id: 1, name: 'Q4 Revenue Analysis' },
        { id: 2, name: 'Client Invoice Tracker' },
        { id: 3, name: 'Project Budget 2024' },
        { id: 4, name: 'Expense Report March' }
      ],
      spreadsheetOptions: [
        { value: 1, label: 'Q4 Revenue Analysis', icon: 'DocumentIcon', description: 'Revenue data for Q4 2024' },
        { value: 2, label: 'Client Invoice Tracker', icon: 'DocumentIcon', description: 'Client billing and payments' },
        { value: 3, label: 'Project Budget 2024', icon: 'DocumentIcon', description: 'Annual project budgets' },
        { value: 4, label: 'Expense Report March', icon: 'DocumentIcon', description: 'Monthly expense tracking' }
      ],
      quickAnalysisOptions: [
        {
          id: 1,
          title: 'Trend Analysis',
          description: 'Identify patterns and trends in your time-series data',
          icon: 'TrendIcon',
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600'
        },
        {
          id: 2,
          title: 'Revenue Forecasting',
          description: 'Predict future revenue based on historical data',
          icon: 'ForecastIcon',
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600'
        },
        {
          id: 3,
          title: 'Expense Analysis',
          description: 'Analyze spending patterns and find optimization opportunities',
          icon: 'ExpenseIcon',
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600'
        },
        {
          id: 4,
          title: 'Client Performance',
          description: 'Evaluate client profitability and engagement metrics',
          icon: 'ClientIcon',
          iconBg: 'bg-purple-100',
          iconColor: 'text-purple-600'
        },
        {
          id: 5,
          title: 'Data Quality Check',
          description: 'Identify missing values, duplicates, and inconsistencies',
          icon: 'QualityIcon',
          iconBg: 'bg-yellow-100',
          iconColor: 'text-yellow-600'
        },
        {
          id: 6,
          title: 'Correlation Analysis',
          description: 'Discover relationships between different variables',
          icon: 'CorrelationIcon',
          iconBg: 'bg-indigo-100',
          iconColor: 'text-indigo-600'
        }
      ],
      recentAnalyses: [
        {
          id: 1,
          title: 'Q4 Revenue Trend Analysis',
          description: 'Identified 15% growth pattern with seasonal peaks',
          status: 'Completed',
          completedAt: '2 hours ago'
        },
        {
          id: 2,
          title: 'Client Profitability Analysis',
          description: 'Found top 3 clients generating 67% of revenue',
          status: 'Completed',
          completedAt: '1 day ago'
        },
        {
          id: 3,
          title: 'Expense Optimization Study',
          description: 'Analyzing cost reduction opportunities',
          status: 'Processing',
          completedAt: 'In progress'
        }
      ]
    }
  },
  mounted() {
    // Check for query parameter
    const urlParams = new URLSearchParams(window.location.search)
    const query = urlParams.get('q')
    if (query) {
      this.aiPrompt = query
      this.runAnalysis()
    }
  },
  methods: {
    async runAnalysis() {
      if (!this.aiPrompt.trim()) return
      
      this.isAnalyzing = true
      
      // Simulate AI analysis
      setTimeout(() => {
        const newResult = {
          id: Date.now(),
          query: this.aiPrompt,
          response: this.generateMockResponse(this.aiPrompt),
          table: this.generateMockTable(),
          chart: {
            title: 'Revenue Trend Chart',
            type: 'line'
          }
        }
        
        this.analysisResults.unshift(newResult)
        this.aiPrompt = ''
        this.isAnalyzing = false
      }, 2000)
    },
    
    runQuickAnalysis(option) {
      this.aiPrompt = this.getQuickAnalysisPrompt(option)
      this.runAnalysis()
    },
    
    generateMockResponse(prompt) {
      if (prompt.toLowerCase().includes('revenue') || prompt.toLowerCase().includes('sales')) {
        return "Based on your data analysis, I've identified a strong upward trend in revenue over the past quarter. Your revenue has grown by 15% compared to the previous period, with particularly strong performance in March. The data shows consistent week-over-week growth with some seasonal variations."
      } else if (prompt.toLowerCase().includes('expense') || prompt.toLowerCase().includes('cost')) {
        return "Your expense analysis reveals several optimization opportunities. I've identified that 23% of your expenses are in discretionary categories where you could potentially save $1,200 per month. The largest expense categories are office supplies (32%) and software subscriptions (28%)."
      } else {
        return "I've analyzed your data and found several interesting patterns. The analysis shows positive trends across key metrics with opportunities for optimization. Here are the detailed findings with supporting data and visualizations."
      }
    },
    
    generateMockTable() {
      return {
        headers: ['Month', 'Revenue', 'Growth %', 'Forecast'],
        rows: [
          ['January', '$12,500', '8%', '$13,500'],
          ['February', '$13,200', '12%', '$14,200'],
          ['March', '$15,100', '15%', '$16,100'],
          ['April', '$16,800', '18%', '$17,800']
        ]
      }
    },
    
    getQuickAnalysisPrompt(option) {
      const prompts = {
        1: 'Analyze trends in my revenue data over the last 6 months and identify patterns',
        2: 'Create a revenue forecast for the next 3 months based on historical data',
        3: 'Analyze my expense patterns and identify areas for cost optimization',
        4: 'Evaluate client performance and identify my most profitable clients',
        5: 'Check data quality and identify any missing values or inconsistencies',
        6: 'Find correlations between different variables in my dataset'
      }
      return prompts[option.id] || 'Analyze my data'
    },
    
    exportResults() {
      // Handle export functionality
      console.log('Exporting analysis results...')
    },
    
    getStatusClass(status) {
      switch (status) {
        case 'Completed':
          return 'bg-green-100 text-green-800'
        case 'Processing':
          return 'bg-blue-100 text-blue-800'
        case 'Failed':
          return 'bg-red-100 text-red-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    }
  },
  components: {
    TrendIcon: {
      template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>`
    },
    ForecastIcon: {
      template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>`
    },
    ExpenseIcon: {
      template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" /></svg>`
    },
    ClientIcon: {
      template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>`
    },
    QualityIcon: {
      template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>`
    },
    CorrelationIcon: {
      template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>`
    },
    DocumentIcon: {
      template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>`
    }
  }
}
</script>