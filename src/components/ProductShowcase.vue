<template>
  <section class="py-24 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <p class="text-primary text-sm font-medium uppercase tracking-wider mb-4">GET STARTED</p>
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Take control of your
          <br>
          spreadsheet workflow today
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Start using SmartSheet and experience a new level of data analysis efficiency.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            class="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors">
            Start your free trial →
          </button>
          <button class="text-gray-700 hover:text-gray-900 font-medium">
            Book a demo
          </button>
        </div>
      </div>

      <!-- Dashboard Preview -->
      <div class="relative max-w-6xl mx-auto">
        <div class="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          <!-- Dashboard Header -->
          <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <h3 class="text-lg font-semibold text-gray-900">SmartSheet</h3>
                <button class="bg-gray-900 text-white px-3 py-1 rounded-md text-sm font-medium">
                  + New Sheet
                </button>
              </div>
              <div class="flex items-center space-x-4">
                <button class="flex items-center text-gray-600 hover:text-gray-900 text-sm">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z">
                    </path>
                  </svg>
                  Filters
                </button>
                <button class="flex items-center text-gray-600 hover:text-gray-900 text-sm">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2z">
                    </path>
                  </svg>
                  Board
                </button>
                <button class="flex items-center text-gray-600 hover:text-gray-900 text-sm">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  Calendar
                </button>
              </div>
            </div>
          </div>

          <!-- Main Dashboard Content -->
          <div class="flex">
            <!-- Sidebar -->
            <div class="w-64 bg-gray-50 border-r border-gray-200 p-6">
              <div class="space-y-6">
                <!-- Company Section -->
                <div>
                  <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Company</h4>
                  <div class="space-y-2">
                    <div class="flex items-center space-x-2 text-sm text-gray-700">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2v2z"></path>
                      </svg>
                      <span>Home</span>
                    </div>
                    <div class="flex items-center space-x-2 text-sm font-medium text-gray-900">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2z">
                        </path>
                      </svg>
                      <span>Spreadsheets</span>
                    </div>
                  </div>
                </div>

                <!-- CRM Section -->
                <div>
                  <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">CRM</h4>
                  <div class="space-y-2">
                    <div class="flex items-center space-x-2 text-sm text-gray-700">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
                        </path>
                      </svg>
                      <span>Contacts</span>
                    </div>
                    <div class="flex items-center space-x-2 text-sm text-gray-700">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                        </path>
                      </svg>
                      <span>Companies</span>
                    </div>
                  </div>
                </div>

                <!-- Insights Section -->
                <div>
                  <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Insights</h4>
                  <div class="space-y-2">
                    <div class="flex items-center space-x-2 text-sm text-gray-700">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                        </path>
                      </svg>
                      <span>Analytics</span>
                    </div>
                    <div class="flex items-center space-x-2 text-sm text-gray-700">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                        </path>
                      </svg>
                      <span>Reports</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Main Content Area -->
            <div class="flex-1 p-6">
              <!-- Kanban Board -->
              <div class="grid grid-cols-3 gap-6">
                <!-- To-do Column -->
                <div class="space-y-4">
                  <div class="flex items-center space-x-2">
                    <div class="w-3 h-3 bg-gray-400 rounded-full"></div>
                    <h4 class="font-semibold text-gray-900">To-do</h4>
                  </div>
                  <div class="space-y-3">
                    <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <h5 class="font-medium text-gray-900 mb-2">Create sales analysis</h5>
                      <p class="text-sm text-gray-600 mb-3">Analyze Q3 sales data and create comprehensive report with
                        AI insights.</p>
                      <div class="flex items-center space-x-2">
                        <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">Analysis</span>
                        <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">AI</span>
                      </div>
                    </div>
                    <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <h5 class="font-medium text-gray-900 mb-2">Review budget forecast</h5>
                      <p class="text-sm text-gray-600 mb-3">Review and approve the automated budget forecast for next
                        quarter.</p>
                      <div class="flex items-center space-x-2">
                        <span class="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">Budget</span>
                        <span class="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">Review</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- In Progress Column -->
                <div class="space-y-4">
                  <div class="flex items-center space-x-2">
                    <div class="w-3 h-3 bg-orange-400 rounded-full"></div>
                    <h4 class="font-semibold text-gray-900">In Progress</h4>
                  </div>
                  <div class="space-y-3">
                    <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <h5 class="font-medium text-gray-900 mb-2">Customer Analytics</h5>
                      <p class="text-sm text-gray-600 mb-3">Generate customer behavior analysis for 2024 Q3 marketing
                        campaign.</p>
                      <div class="flex items-center space-x-2">
                        <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">Analytics</span>
                      </div>
                    </div>
                    <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <h5 class="font-medium text-gray-900 mb-2">Data Migration</h5>
                      <p class="text-sm text-gray-600 mb-3">Migrate legacy Excel files to SmartSheet with AI
                        enhancement.</p>
                      <div class="flex items-center space-x-2">
                        <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Migration</span>
                        <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">Excel</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Done Column -->
                <div class="space-y-4">
                  <div class="flex items-center space-x-2">
                    <div class="w-3 h-3 bg-green-400 rounded-full"></div>
                    <h4 class="font-semibold text-gray-900">Done</h4>
                  </div>
                  <div class="space-y-3">
                    <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <h5 class="font-medium text-gray-900 mb-2">Revenue Dashboard</h5>
                      <p class="text-sm text-gray-600 mb-3">Automated revenue tracking dashboard with real-time
                        insights.</p>
                      <div class="flex items-center space-x-2">
                        <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Dashboard</span>
                      </div>
                    </div>
                    <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <h5 class="font-medium text-gray-900 mb-2">Team Performance</h5>
                      <p class="text-sm text-gray-600 mb-3">AI-powered team performance analysis with actionable
                        recommendations.</p>
                      <div class="flex items-center space-x-2">
                        <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">Performance</span>
                        <span class="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">AI</span>
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
  </section>
</template>

<script>
export default {
  name: 'ProductShowcase'
}
</script>