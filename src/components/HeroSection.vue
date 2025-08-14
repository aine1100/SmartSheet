<template>
  <section class="relative min-h-screen bg-white overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">

        <!-- Left Content -->
        <div class="space-y-8">
          <!-- Status Badge -->
          <div
            class="inline-flex items-center space-x-2 bg-green-50 text-primary px-4 py-2 rounded-full text-sm font-medium text-display">
            <div class="w-2 h-2 bg-primary rounded-full"></div>
            <span>Ready for automation</span>
          </div>

          <!-- Main Heading -->
          <div class="space-y-6">
            <h1 class="text-display text-5xl lg:text-6xl text-gray-900">
              A smart way to
              <br>
              manage and analyze.
            </h1>

            <p class="text-body text-xl text-gray-600 max-w-lg">
              AI-powered spreadsheet automation tailored to your needs — natural language processing and intelligent
              insights available.
            </p>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4">
            <button class="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-100 border-2 border-primary transition-colors">
              Learn More
            </button>
            <button
              class="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors">
              Get Started Free
            </button>
          </div>
        </div>

        <!-- Right Visual -->
        <div class="relative">
          <!-- Analytics Dashboard Image -->
          <div class="relative rounded-2xl shadow-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Analytics Dashboard" 
              class="w-full h-auto object-cover rounded-2xl"
            >
            <!-- Overlay with SmartSheet branding -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            <div class="absolute bottom-6 left-6 right-6">
              <div class="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-lg font-semibold text-gray-900">SmartSheet Analytics</h3>
                  <div class="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-medium">
                    AI Powered
                  </div>
                </div>
                <p class="text-sm text-gray-600">Real-time insights from your spreadsheet data</p>
              </div>
            </div>
          </div>

          <!-- Floating Analytics Cards -->
          <div class="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 border border-gray-100">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
              <div>
                <div class="text-lg font-bold text-gray-900">+24%</div>
                <div class="text-xs text-gray-500">Efficiency Gain</div>
              </div>
            </div>
          </div>

          <div class="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 border border-gray-100">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <div>
                <div class="text-lg font-bold text-gray-900">2.4K</div>
                <div class="text-xs text-gray-500">Automated Tasks</div>
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
  name: 'HeroSection'
}
</script>