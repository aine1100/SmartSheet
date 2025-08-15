<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Analytics</h1>
        <p class="text-gray-600">Analyze your spreadsheet data and performance metrics</p>
      </div>
      <div class="flex items-center space-x-3">
        <CustomDropdown
          v-model="selectedTimeRange"
          :options="timeRangeOptions"
          placeholder="Select time range"
          class="w-40"
        />
        <button class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
          Export Report
        </button>
      </div>
    </div>

    <!-- Key Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-blue-50 rounded-lg">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">47</p>
            <p class="text-sm text-gray-500">Total Spreadsheets</p>
            <p class="text-xs text-green-600">+12% from last month</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-green-50 rounded-lg">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">2.4M</p>
            <p class="text-sm text-gray-500">Rows Processed</p>
            <p class="text-xs text-green-600">+23% from last month</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-purple-50 rounded-lg">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">156</p>
            <p class="text-sm text-gray-500">AI Analyses</p>
            <p class="text-xs text-green-600">+8% from last month</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-orange-50 rounded-lg">
            <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">48h</p>
            <p class="text-sm text-gray-500">Time Saved</p>
            <p class="text-xs text-green-600">+15% from last month</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Usage Trends -->
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Usage Trends</h3>
          <button class="text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
        <div class="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 rounded-lg">
          <div class="text-center">
            <svg class="w-16 h-16 text-blue-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <p class="text-gray-500">Spreadsheet usage trending upward</p>
            <p class="text-sm text-gray-400">+23% increase this month</p>
          </div>
        </div>
      </div>

      <!-- Data Quality Score -->
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Data Quality Score</h3>
          <button class="text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
        <div class="flex items-center justify-center h-64">
          <div class="relative w-48 h-48">
            <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="#e5e7eb" stroke-width="8" fill="none" />
              <circle cx="50" cy="50" r="40" stroke="#10b981" stroke-width="8" fill="none" 
                      stroke-dasharray="251" stroke-dashoffset="50" stroke-linecap="round" />
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-center">
                <p class="text-3xl font-bold text-gray-900">92%</p>
                <p class="text-sm text-gray-500">Excellent</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center space-x-6 mt-4">
          <div class="flex items-center space-x-2">
            <div class="w-3 h-3 bg-green-500 rounded-full"></div>
            <span class="text-sm text-gray-600">Clean Data</span>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span class="text-sm text-gray-600">Minor Issues</span>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-3 h-3 bg-red-500 rounded-full"></div>
            <span class="text-sm text-gray-600">Errors</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Top Performing Spreadsheets -->
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Top Performing Spreadsheets</h3>
          <button class="text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
        <div class="space-y-4">
          <div v-for="sheet in topSheets" :key="sheet.id" class="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p class="font-medium text-gray-900">{{ sheet.name }}</p>
                <p class="text-sm text-gray-500">{{ sheet.views }} views</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-medium text-gray-900">{{ sheet.score }}%</p>
              <p class="text-sm text-gray-500">Quality</p>
            </div>
          </div>
        </div>
      </div>

      <!-- AI Insights -->
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-semibold text-gray-900">AI Insights</h3>
          <button class="text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
        <div class="space-y-4">
          <div v-for="insight in aiInsights" :key="insight.id" class="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100">
            <div class="flex items-start space-x-3">
              <div class="p-1 bg-purple-100 rounded-full">
                <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">{{ insight.title }}</p>
                <p class="text-xs text-gray-600 mt-1">{{ insight.description }}</p>
                <button class="text-xs text-purple-600 hover:text-purple-800 mt-2">Apply Suggestion</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomDropdown from '@/components/CustomDropdown.vue'

export default {
  name: 'Analytics',
  components: {
    CustomDropdown
  },
  data() {
    return {
      selectedTimeRange: 'last_7_days',
      timeRangeOptions: [
        { value: 'last_7_days', label: 'Last 7 days', icon: 'CalendarIcon' },
        { value: 'last_30_days', label: 'Last 30 days', icon: 'CalendarIcon' },
        { value: 'last_3_months', label: 'Last 3 months', icon: 'CalendarIcon' },
        { value: 'last_year', label: 'Last year', icon: 'CalendarIcon' }
      ],
      topSheets: [
        {
          id: 1,
          name: 'Q4 Sales Analysis',
          views: 1247,
          score: 98
        },
        {
          id: 2,
          name: 'Customer Database',
          views: 856,
          score: 95
        },
        {
          id: 3,
          name: 'Budget Forecast',
          views: 634,
          score: 92
        },
        {
          id: 4,
          name: 'Inventory Tracking',
          views: 423,
          score: 89
        }
      ],
      aiInsights: [
        {
          id: 1,
          title: 'Data Pattern Detected',
          description: 'Your sales data shows a 15% increase in Q4. Consider creating automated forecasting.'
        },
        {
          id: 2,
          title: 'Optimization Opportunity',
          description: 'Duplicate entries found in customer database. AI can help clean and merge records.'
        },
        {
          id: 3,
          title: 'Formula Enhancement',
          description: 'Complex calculations detected. AI suggests simplified formulas for better performance.'
        }
      ]
    }
  },
  components: {
    ...this.components,
    CalendarIcon: {
      template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>`
    }
  }
}
</script>