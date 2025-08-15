<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Charts & Visualizations</h1>
        <p class="text-gray-600">Create beautiful charts and interactive visualizations from your data</p>
      </div>
      <button @click="showCreateChartModal = true" class="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors">
        + Create Chart
      </button>
    </div>

    <!-- Chart Types -->
    <div class="bg-white rounded-lg shadow p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Chart Creation</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div v-for="chartType in chartTypes" :key="chartType.id" 
             @click="createQuickChart(chartType)"
             class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 cursor-pointer transition-colors">
          <div class="p-2 bg-gray-100 rounded-lg mb-2">
            <component :is="chartType.icon" class="w-6 h-6 text-gray-600" />
          </div>
          <span class="text-sm font-medium text-gray-900">{{ chartType.name }}</span>
        </div>
      </div>
    </div>

    <!-- Recent Charts -->
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 class="text-lg font-medium text-gray-900">My Charts</h3>
        <div class="flex items-center space-x-2">
          <button @click="viewMode = 'grid'" :class="viewMode === 'grid' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'" class="p-2 rounded-lg">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button @click="viewMode = 'list'" :class="viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'" class="p-2 rounded-lg">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      <div class="p-6">
        <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="chart in charts" :key="chart.id" class="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div class="h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
              <component :is="getChartPreview(chart.type)" class="w-24 h-24 text-blue-400" />
            </div>
            <div class="p-4">
              <h4 class="font-semibold text-gray-900 mb-1">{{ chart.name }}</h4>
              <p class="text-sm text-gray-500 mb-3">{{ chart.description }}</p>
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-400">{{ chart.lastModified }}</span>
                <div class="flex space-x-2">
                  <button class="text-primary hover:text-primary-dark text-sm font-medium">Edit</button>
                  <button class="text-gray-500 hover:text-gray-700 text-sm font-medium">Share</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="space-y-4">
          <div v-for="chart in charts" :key="chart.id" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div class="flex items-center space-x-4">
              <div class="p-2 bg-blue-100 rounded-lg">
                <component :is="getChartPreview(chart.type)" class="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 class="font-medium text-gray-900">{{ chart.name }}</h4>
                <p class="text-sm text-gray-500">{{ chart.description }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <span class="text-sm text-gray-500">{{ chart.lastModified }}</span>
              <div class="flex space-x-2">
                <button class="text-primary hover:text-primary-dark text-sm font-medium">Edit</button>
                <button class="text-gray-500 hover:text-gray-700 text-sm font-medium">Share</button>
                <button class="text-red-600 hover:text-red-900 text-sm font-medium">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chart Analytics -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Popular Chart Types -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Popular Chart Types</h3>
        <div class="space-y-3">
          <div v-for="stat in chartStats" :key="stat.type" class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: stat.color }"></div>
              <span class="text-sm text-gray-700">{{ stat.type }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-sm font-medium text-gray-900">{{ stat.count }}</span>
              <div class="w-16 h-2 bg-gray-200 rounded-full">
                <div class="h-2 rounded-full" :style="{ width: stat.percentage + '%', backgroundColor: stat.color }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Chart Performance -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Chart Performance</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600">Total Views</span>
            <span class="text-lg font-semibold text-gray-900">2,847</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600">Shared Charts</span>
            <span class="text-lg font-semibold text-gray-900">23</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600">Interactive Charts</span>
            <span class="text-lg font-semibold text-gray-900">12</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600">Export Downloads</span>
            <span class="text-lg font-semibold text-gray-900">156</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Chart Modal -->
    <div v-if="showCreateChartModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Create New Chart</h3>
          <form @submit.prevent="createChart">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Chart Name</label>
              <input v-model="newChart.name" type="text" required 
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Data Source</label>
              <CustomDropdown
                v-model="newChart.dataSource"
                :options="dataSourceOptions"
                placeholder="Select spreadsheet..."
                searchable
                class="w-full"
              />
            </div>
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Chart Type</label>
              <div class="grid grid-cols-3 gap-2">
                <button v-for="type in chartTypes.slice(0, 6)" :key="type.id" 
                        type="button"
                        @click="newChart.type = type.id"
                        :class="newChart.type === type.id ? 'border-primary bg-primary/10' : 'border-gray-300'"
                        class="flex flex-col items-center p-2 border rounded-lg hover:border-primary transition-colors">
                  <component :is="type.icon" class="w-5 h-5 mb-1" />
                  <span class="text-xs">{{ type.name }}</span>
                </button>
              </div>
            </div>
            <div class="flex justify-end space-x-3">
              <button @click="showCreateChartModal = false" type="button" 
                      class="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" 
                      class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
                Create Chart
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomDropdown from '../../components/CustomDropdown.vue'

export default {
  name: 'Charts',
  components: {
    CustomDropdown
  },
  data() {
    return {
      viewMode: 'grid',
      showCreateChartModal: false,
      newChart: {
        name: '',
        dataSource: '',
        type: 'bar'
      },
      dataSourceOptions: [
        { value: 'sales', label: 'Q4 Sales Analysis', icon: 'DocumentIcon', description: 'Sales data for Q4 2024' },
        { value: 'customers', label: 'Customer Database', icon: 'DocumentIcon', description: 'Customer information and contacts' },
        { value: 'inventory', label: 'Inventory Management', icon: 'DocumentIcon', description: 'Product inventory and stock levels' }
      ],
      chartTypes: [
        { id: 'bar', name: 'Bar Chart', icon: 'BarChartIcon' },
        { id: 'line', name: 'Line Chart', icon: 'LineChartIcon' },
        { id: 'pie', name: 'Pie Chart', icon: 'PieChartIcon' },
        { id: 'area', name: 'Area Chart', icon: 'AreaChartIcon' },
        { id: 'scatter', name: 'Scatter Plot', icon: 'ScatterIcon' },
        { id: 'donut', name: 'Donut Chart', icon: 'DonutIcon' },
        { id: 'radar', name: 'Radar Chart', icon: 'RadarIcon' },
        { id: 'heatmap', name: 'Heatmap', icon: 'HeatmapIcon' }
      ],
      charts: [
        {
          id: 1,
          name: 'Monthly Sales Trend',
          description: 'Sales performance over the last 12 months',
          type: 'line',
          lastModified: '2 hours ago'
        },
        {
          id: 2,
          name: 'Product Category Distribution',
          description: 'Revenue breakdown by product categories',
          type: 'pie',
          lastModified: '1 day ago'
        },
        {
          id: 3,
          name: 'Regional Performance',
          description: 'Sales comparison across different regions',
          type: 'bar',
          lastModified: '3 days ago'
        },
        {
          id: 4,
          name: 'Customer Acquisition',
          description: 'New customer growth over time',
          type: 'area',
          lastModified: '1 week ago'
        },
        {
          id: 5,
          name: 'Price vs Volume Analysis',
          description: 'Correlation between pricing and sales volume',
          type: 'scatter',
          lastModified: '2 weeks ago'
        },
        {
          id: 6,
          name: 'Quarterly Revenue',
          description: 'Revenue comparison by quarters',
          type: 'donut',
          lastModified: '3 weeks ago'
        }
      ],
      chartStats: [
        { type: 'Bar Charts', count: 12, percentage: 40, color: '#3B82F6' },
        { type: 'Line Charts', count: 8, percentage: 27, color: '#10B981' },
        { type: 'Pie Charts', count: 6, percentage: 20, color: '#F59E0B' },
        { type: 'Area Charts', count: 4, percentage: 13, color: '#8B5CF6' }
      ]
    }
  },
  methods: {
    createQuickChart(chartType) {
      console.log('Creating quick chart:', chartType.name)
      // Handle quick chart creation
    },
    createChart() {
      // Create new chart
      const newId = Math.max(...this.charts.map(c => c.id)) + 1
      this.charts.unshift({
        id: newId,
        name: this.newChart.name,
        description: `Chart created from ${this.newChart.dataSource}`,
        type: this.newChart.type,
        lastModified: 'Just now'
      })
      
      // Reset form
      this.newChart = { name: '', dataSource: '', type: 'bar' }
      this.showCreateChartModal = false
    },
    getChartPreview(type) {
      const iconMap = {
        bar: 'BarChartIcon',
        line: 'LineChartIcon',
        pie: 'PieChartIcon',
        area: 'AreaChartIcon',
        scatter: 'ScatterIcon',
        donut: 'DonutIcon',
        radar: 'RadarIcon',
        heatmap: 'HeatmapIcon'
      }
      return iconMap[type] || 'BarChartIcon'
    }
  },
  components: {
    BarChartIcon: {
      template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>`
    },
    LineChartIcon: {
      template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>`
    },
    PieChartIcon: {
      template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>`
    },
    AreaChartIcon: {
      template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>`
    },
    ScatterIcon: {
      template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>`
    },
    DonutIcon: {
      template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /></svg>`
    },
    RadarIcon: {
      template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>`
    },
    HeatmapIcon: {
      template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>`
    },
    DocumentIcon: {
      template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>`
    }
  }
}
</script>