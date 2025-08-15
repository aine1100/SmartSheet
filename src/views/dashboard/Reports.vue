<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex justify-between items-center">
            <div>
                <h1 class="text-2xl font-bold text-gray-900">Reports</h1>
                <p class="text-gray-600">Generate comprehensive reports from your spreadsheet data</p>
            </div>
            <button @click="showCreateReportModal = true"
                class="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors">
                + Create Report
            </button>
        </div>

        <!-- Quick Report Templates -->
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Report Templates</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div v-for="template in reportTemplates" :key="template.id" @click="createFromTemplate(template)"
                    class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 cursor-pointer transition-colors">
                    <div :class="template.iconBg" class="p-3 rounded-lg mb-3">
                        <component :is="template.icon" class="w-6 h-6" :class="template.iconColor" />
                    </div>
                    <span class="text-sm font-medium text-gray-900 text-center">{{ template.name }}</span>
                    <span class="text-xs text-gray-500 text-center mt-1">{{ template.description }}</span>
                </div>
            </div>
        </div>

        <!-- Recent Reports -->
        <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b border-gray-200">
                <h3 class="text-lg font-medium text-gray-900">Recent Reports</h3>
            </div>
            <div class="p-6">
                <div class="space-y-4">
                    <div v-for="report in reports" :key="report.id"
                        class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div class="flex items-center space-x-4">
                            <div :class="getReportIconBg(report.type)" class="p-2 rounded-lg">
                                <component :is="getReportIcon(report.type)" class="w-5 h-5"
                                    :class="getReportIconColor(report.type)" />
                            </div>
                            <div>
                                <h4 class="font-medium text-gray-900">{{ report.name }}</h4>
                                <p class="text-sm text-gray-500">{{ report.description }}</p>
                                <div class="flex items-center space-x-4 mt-1">
                                    <span class="text-xs text-gray-400">Created: {{ report.createdAt }}</span>
                                    <span :class="getStatusClass(report.status)"
                                        class="px-2 py-1 text-xs font-medium rounded-full">
                                        {{ report.status }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button class="text-primary hover:text-primary-dark text-sm font-medium">View</button>
                            <button class="text-gray-500 hover:text-gray-700 text-sm font-medium">Download</button>
                            <button class="text-gray-500 hover:text-gray-700 text-sm font-medium">Share</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Report Analytics -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Report Statistics -->
            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Report Statistics</h3>
                <div class="space-y-4">
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600">Total Reports Generated</span>
                        <span class="text-lg font-semibold text-gray-900">47</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600">Reports This Month</span>
                        <span class="text-lg font-semibold text-gray-900">12</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600">Shared Reports</span>
                        <span class="text-lg font-semibold text-gray-900">8</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600">Automated Reports</span>
                        <span class="text-lg font-semibold text-gray-900">5</span>
                    </div>
                </div>
            </div>

            <!-- Popular Report Types -->
            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Popular Report Types</h3>
                <div class="space-y-3">
                    <div v-for="stat in reportStats" :key="stat.type" class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: stat.color }"></div>
                            <span class="text-sm text-gray-700">{{ stat.type }}</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <span class="text-sm font-medium text-gray-900">{{ stat.count }}</span>
                            <div class="w-16 h-2 bg-gray-200 rounded-full">
                                <div class="h-2 rounded-full"
                                    :style="{ width: stat.percentage + '%', backgroundColor: stat.color }"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Create Report Modal -->
        <div v-if="showCreateReportModal"
            class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div class="mt-3">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Create New Report</h3>
                    <form @submit.prevent="createReport">
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Report Name</label>
                            <input v-model="newReport.name" type="text" required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Data Source</label>
                            <CustomDropdown
                                v-model="newReport.dataSource"
                                :options="dataSourceOptions"
                                placeholder="Select spreadsheet..."
                                searchable
                                class="w-full"
                            />
                        </div>
                        <div class="mb-6">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                            <CustomDropdown
                                v-model="newReport.type"
                                :options="reportTypeOptions"
                                placeholder="Select report type"
                                class="w-full"
                            />
                        </div>
                        <div class="flex justify-end space-x-3">
                            <button @click="showCreateReportModal = false" type="button"
                                class="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">
                                Cancel
                            </button>
                            <button type="submit"
                                class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
                                Create Report
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
    name: 'Reports',
    components: {
        CustomDropdown
    },
    data() {
        return {
            showCreateReportModal: false,
            newReport: {
                name: '',
                dataSource: '',
                type: 'summary'
            },
            dataSourceOption:[
                { value: 'sales', label: 'Q4 Sales Analysis', icon: 'DocumentIcon', description: 'Sales data for Q4 2024' },
                { value: 'customers', label: 'Customer Database', icon: 'DocumentIcon', description: 'Customer information and contacts' },
                { value: 'inventory', label: 'Inventory Management', icon: 'DocumentIcon', description: 'Product inventory and stock levels' }
            ],
            reportTypeOptions: [
                { value: 'summary', label: 'Summary Report', icon: 'SummaryIcon', description: 'High-level overview and key metrics' },
                { value: 'detailed', label: 'Detailed Analysis', icon: 'DetailIcon', description: 'In-depth analysis with full data' },
                { value: 'comparison', label: 'Comparison Report', icon: 'CompareIcon', description: 'Compare data across periods' },
                { value: 'trend', label: 'Trend Analysis', icon: 'TrendIcon', description: 'Identify patterns and trends' }
            ],
            reportTemplates: [
                {
                    id: 1,
                    name: 'Sales Summary',
                    description: 'Monthly sales overview',
                    icon: 'SalesIcon',
                    iconBg: 'bg-green-100',
                    iconColor: 'text-green-600'
                },
                {
                    id: 2,
                    name: 'Financial Report',
                    description: 'Revenue and expenses',
                    icon: 'FinancialIcon',
                    iconBg: 'bg-blue-100',
                    iconColor: 'text-blue-600'
                },
                {
                    id: 3,
                    name: 'Performance Metrics',
                    description: 'KPI dashboard',
                    icon: 'MetricsIcon',
                    iconBg: 'bg-purple-100',
                    iconColor: 'text-purple-600'
                },
                {
                    id: 4,
                    name: 'Inventory Report',
                    description: 'Stock levels and trends',
                    icon: 'InventoryIcon',
                    iconBg: 'bg-orange-100',
                    iconColor: 'text-orange-600'
                }
            ],
            reports: [
                {
                    id: 1,
                    name: 'Q4 2024 Sales Summary',
                    description: 'Comprehensive sales analysis for Q4',
                    type: 'sales',
                    status: 'Completed',
                    createdAt: '2 hours ago'
                },
                {
                    id: 2,
                    name: 'Customer Acquisition Report',
                    description: 'New customer growth and retention metrics',
                    type: 'metrics',
                    status: 'Processing',
                    createdAt: '1 day ago'
                },
                {
                    id: 3,
                    name: 'Monthly Financial Overview',
                    description: 'Revenue, expenses, and profit analysis',
                    type: 'financial',
                    status: 'Completed',
                    createdAt: '3 days ago'
                }
            ],
            reportStats: [
                { type: 'Sales Reports', count: 15, percentage: 35, color: '#10B981' },
                { type: 'Financial Reports', count: 12, percentage: 28, color: '#3B82F6' },
                { type: 'Performance Reports', count: 10, percentage: 23, color: '#8B5CF6' },
                { type: 'Inventory Reports', count: 6, percentage: 14, color: '#F59E0B' }
            ]
        }
    },
    methods: {
        createFromTemplate(template) {
            console.log('Creating report from template:', template.name)
        },
        createReport() {
            const newId = Math.max(...this.reports.map(r => r.id)) + 1
            this.reports.unshift({
                id: newId,
                name: this.newReport.name,
                description: `Generated from ${this.newReport.dataSource}`,
                type: this.newReport.type,
                status: 'Processing',
                createdAt: 'Just now'
            })

            this.newReport = { name: '', dataSource: '', type: 'summary' }
            this.showCreateReportModal = false
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
        },
        getReportIcon(type) {
            const iconMap = {
                sales: 'SalesIcon',
                financial: 'FinancialIcon',
                metrics: 'MetricsIcon',
                inventory: 'InventoryIcon'
            }
            return iconMap[type] || 'SalesIcon'
        },
        getReportIconBg(type) {
            const bgMap = {
                sales: 'bg-green-100',
                financial: 'bg-blue-100',
                metrics: 'bg-purple-100',
                inventory: 'bg-orange-100'
            }
            return bgMap[type] || 'bg-gray-100'
        },
        getReportIconColor(type) {
            const colorMap = {
                sales: 'text-green-600',
                financial: 'text-blue-600',
                metrics: 'text-purple-600',
                inventory: 'text-orange-600'
            }
            return colorMap[type] || 'text-gray-600'
        }
    },
    components: {
        SalesIcon: {
            template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>`
        },
        FinancialIcon: {
            template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" /></svg>`
        },
        MetricsIcon: {
            template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>`
        },
        InventoryIcon: {
            template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>`
        },
        DocumentIcon: {
            template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>`
        },
        SummaryIcon: {
            template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>`
        },
        DetailIcon: {
            template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>`
        },
        CompareIcon: {
            template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>`
        },
        TrendIcon: {
            template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>`
        }
    }
}
</script>