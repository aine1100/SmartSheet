<template>
  <section class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Two Column Feature Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">

        <!-- Left Feature Card -->
        <div class="space-y-8">
          <!-- Icon -->
          <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
              </path>
            </svg>
          </div>

          <!-- Content -->
          <div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Automate with your favorite tools</h3>
            <p class="text-gray-600 leading-relaxed mb-8">
              Whether you're working on complex data analysis, SmartSheet provides intelligent workflows that adapt to
              how you work best.
            </p>
          </div>

          <!-- Visual Element -->
          <div class="relative bg-gray-50 rounded-2xl p-8 h-64">
            <!-- Workflow Diagram -->
            <div class="flex items-center justify-between h-full">
              <!-- Excel Icon -->
              <div class="flex flex-col items-center space-y-2">
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z">
                    </path>
                  </svg>
                </div>
                <span class="text-xs text-gray-500 font-medium">Excel</span>
              </div>

              <!-- Arrow -->
              <div class="flex-1 flex items-center justify-center">
                <div class="w-16 h-0.5 bg-gray-300 relative">
                  <div class="absolute right-0 top-0 w-2 h-2 bg-gray-300 transform rotate-45 -translate-y-0.5"></div>
                </div>
              </div>

              <!-- SmartSheet -->
              <div class="flex flex-col items-center space-y-2">
                <div class="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <span class="text-white font-bold text-sm">S</span>
                </div>
                <span class="text-xs text-gray-500 font-medium">SmartSheet</span>
              </div>

              <!-- Arrow -->
              <div class="flex-1 flex items-center justify-center">
                <div class="w-16 h-0.5 bg-gray-300 relative">
                  <div class="absolute right-0 top-0 w-2 h-2 bg-gray-300 transform rotate-45 -translate-y-0.5"></div>
                </div>
              </div>

              <!-- Dashboard -->
              <div class="flex flex-col items-center space-y-2">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
                    </path>
                  </svg>
                </div>
                <span class="text-xs text-gray-500 font-medium">Analytics</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Feature Card -->
        <div class="space-y-8">
          <!-- Icon -->
          <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
              </path>
            </svg>
          </div>

          <!-- Content -->
          <div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Collaborate with your team seamlessly</h3>
            <p class="text-gray-600 leading-relaxed mb-8">
              SmartSheet makes collaboration a breeze, ensuring everyone stays on the same page, no matter where they
              are.
            </p>
          </div>

          <!-- Visual Element -->
          <div class="relative bg-gray-50 rounded-2xl p-8 h-64">
            <!-- Chat Interface -->
            <div class="space-y-4">
              <!-- Message 1 -->
              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span class="text-white text-xs font-medium">JD</span>
                </div>
                <div class="flex-1">
                  <div class="bg-white rounded-lg p-3 shadow-sm">
                    <p class="text-sm text-gray-900">Looks great! 😊</p>
                    <p class="text-xs text-gray-500 mt-1">I would recommend using more trending elements there</p>
                  </div>
                </div>
                <div class="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Write
                </div>
              </div>

              <!-- Message 2 -->
              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span class="text-white text-xs font-medium">AI</span>
                </div>
                <div class="flex-1">
                  <div class="bg-white rounded-lg p-3 shadow-sm">
                    <p class="text-sm text-gray-900">Really helpful!</p>
                    <p class="text-xs text-gray-500 mt-1">Please, let me know when what you want to do...</p>
                  </div>
                </div>
                <div class="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Schedule
                </div>
              </div>

              <!-- Input Area -->
              <div class="flex items-center space-x-2 pt-4">
                <input type="text" placeholder="Type your message..."
                  class="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <button
                  class="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Key Features Section -->
      <div class="mt-32">
        <div class="text-center mb-16">
          <p class="text-primary text-sm font-medium uppercase tracking-wider mb-4">POWERFUL CAPABILITIES</p>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Key Features That Set Us Apart
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the advanced features that make SmartSheet the ultimate spreadsheet automation platform
          </p>
        </div>

        <!-- Key Features Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          <div v-for="(feature, index) in keyFeatures" :key="index"
            class="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:border-primary/20">
            <!-- Feature Icon -->
            <div class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
              <!-- AI Icon -->
              <svg v-if="feature.icon === 'ai'" class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
              <!-- Collaboration Icon -->
              <svg v-else-if="feature.icon === 'collaboration'" class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <!-- Automation Icon -->
              <svg v-else-if="feature.icon === 'automation'" class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <!-- Chart Icon -->
              <svg v-else-if="feature.icon === 'chart'" class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              <!-- Security Icon -->
              <svg v-else-if="feature.icon === 'security'" class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
              <!-- Integration Icon -->
              <svg v-else-if="feature.icon === 'integration'" class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>

            <!-- Feature Content -->
            <h3 class="text-xl font-bold text-gray-900 mb-4">{{ feature.title }}</h3>
            <p class="text-gray-600 leading-relaxed mb-6">{{ feature.description }}</p>

            <!-- Feature Highlights -->
            <ul class="space-y-2">
              <li v-for="highlight in feature.highlights" :key="highlight"
                class="flex items-center text-sm text-gray-600">
                <svg class="w-4 h-4 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                {{ highlight }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="mt-24 text-center">
        <p class="text-gray-500 text-sm font-medium uppercase tracking-wider mb-8">Trusted by thousands of teams</p>

        <!-- Integration Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div v-for="(integration, index) in integrations" :key="index"
            class="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <!-- Icon -->
            <div class="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
              :class="integration.bgColor">
              <!-- Google Sheets Icon -->
              <svg v-if="integration.icon === 'google-sheets'" class="w-8 h-8" :class="integration.iconColor"
                fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M19,3H5C3.9,3 3,3.9 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.9 20.1,3 19,3M19,19H5V5H19V19M17,17H7V15H17V17M17,13H7V11H17V13M17,9H7V7H17V9Z">
                </path>
              </svg>
              <!-- Excel Icon -->
              <svg v-else-if="integration.icon === 'excel'" class="w-8 h-8" :class="integration.iconColor"
                fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M10.5,11L12,13.5L13.5,11H15.3L13.1,14.3L15.4,17.7H13.6L12,15.1L10.4,17.7H8.6L10.9,14.3L8.7,11H10.5Z">
                </path>
              </svg>
              <!-- Slack Icon -->
              <svg v-else-if="integration.icon === 'slack'" class="w-8 h-8" :class="integration.iconColor"
                fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M5.042 15.165a2.528 2.528 0 0 1-2.52-2.523A2.528 2.528 0 0 1 5.042 10.12h2.52v2.522a2.528 2.528 0 0 1-2.52 2.523Zm0 0a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165v-6.734a2.528 2.528 0 0 1 2.522-2.523 2.528 2.528 0 0 1 2.52 2.523v6.734ZM8.835 18.928a2.528 2.528 0 0 1-2.52-2.523 2.528 2.528 0 0 1 2.52-2.523h6.734a2.528 2.528 0 0 1 2.523 2.523 2.528 2.528 0 0 1-2.523 2.523H8.835Zm0-7.763a2.528 2.528 0 0 1-2.52-2.523A2.528 2.528 0 0 1 8.835 6.12h6.734a2.528 2.528 0 0 1 2.523 2.522 2.528 2.528 0 0 1-2.523 2.523H8.835Zm7.763 0a2.528 2.528 0 0 1 2.523-2.523A2.528 2.528 0 0 1 21.644 8.642a2.528 2.528 0 0 1-2.523 2.523h-2.523V8.642Zm0 0a2.528 2.528 0 0 1 2.523 2.523 2.528 2.528 0 0 1-2.523 2.523 2.528 2.528 0 0 1-2.523-2.523V8.642a2.528 2.528 0 0 1 2.523-2.522Z">
                </path>
              </svg>
            </div>

            <!-- Content -->
            <h4 class="text-lg font-bold text-gray-900 mb-2">{{ integration.title }}</h4>
            <p class="text-gray-600 text-sm mb-4 leading-relaxed">{{ integration.description }}</p>

            <!-- Action Buttons -->
            <div class="flex items-center justify-center space-x-3">
              <button
                class="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                Install
              </button>
              <button class="text-gray-600 hover:text-gray-900 text-sm font-medium">
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FeaturesSection',
  data() {
    return {
      keyFeatures: [
        {
          title: 'AI-Powered Analysis',
          description: 'Let artificial intelligence analyze your data and provide intelligent insights automatically.',
          icon: 'ai',
          highlights: [
            'Natural language queries',
            'Automated pattern detection',
            'Predictive analytics',
            'Smart recommendations'
          ]
        },
        {
          title: 'Real-Time Collaboration',
          description: 'Work together seamlessly with your team with live updates and intelligent conflict resolution.',
          icon: 'collaboration',
          highlights: [
            'Live editing & comments',
            'Version history tracking',
            'Role-based permissions',
            'Team activity dashboard'
          ]
        },
        {
          title: 'Advanced Automation',
          description: 'Automate repetitive tasks and create intelligent workflows that save hours of manual work.',
          icon: 'automation',
          highlights: [
            'Custom workflow builder',
            'Trigger-based actions',
            'Data validation rules',
            'Scheduled reports'
          ]
        },
        {
          title: 'Data Visualization',
          description: 'Transform your data into beautiful, interactive charts and dashboards automatically.',
          icon: 'chart',
          highlights: [
            'Interactive dashboards',
            'Custom chart types',
            'Real-time updates',
            'Export & sharing options'
          ]
        },
        {
          title: 'Enterprise Security',
          description: 'Bank-level security with encryption, compliance, and granular access controls.',
          icon: 'security',
          highlights: [
            'End-to-end encryption',
            'SOC 2 compliance',
            'Single sign-on (SSO)',
            'Audit logs & monitoring'
          ]
        },
        {
          title: 'Smart Integrations',
          description: 'Connect with 100+ tools and services to create a unified data ecosystem.',
          icon: 'integration',
          highlights: [
            'API connections',
            'Database sync',
            'Cloud storage integration',
            'Third-party app support'
          ]
        }
      ],
      integrations: [
        {
          title: 'Google Sheets',
          description: 'Effortlessly sync and enhance your Google Sheets with AI-powered insights.',
          icon: 'google-sheets',
          bgColor: 'bg-green-100',
          iconColor: 'text-green-600'
        },
        {
          title: 'Microsoft Excel',
          description: 'Import your Excel files and supercharge them with intelligent automation.',
          icon: 'excel',
          bgColor: 'bg-blue-100',
          iconColor: 'text-blue-600'
        },
        {
          title: 'Slack Integration',
          description: 'Get real-time notifications and collaborate seamlessly with your team.',
          icon: 'slack',
          bgColor: 'bg-purple-100',
          iconColor: 'text-purple-600'
        }
      ]
    }
  }
}
</script>