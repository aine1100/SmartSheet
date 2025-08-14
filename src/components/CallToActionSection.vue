<template>
  <section class="py-24 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <!-- Left Content -->
        <div>
          <p class="text-caption text-primary mb-4">PRODUCTIVITY REDEFINED</p>
          <h2 class="text-display text-4xl md:text-5xl text-gray-900 mb-6">
            Supercharge the
            <br>
            way you work
          </h2>
          <p class="text-body text-xl text-gray-600 mb-8">
            Get more done in less time and take control of your productivity like never before.
          </p>
          
          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4">
            <button class="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors">
              Start your free trial →
            </button>
            <button class="text-gray-700 hover:text-gray-900 font-medium">
              Book a demo
            </button>
          </div>
        </div>

        <!-- Right Image -->
        <div class="relative">
          <!-- Developer/Analyst working with Excel/Analytics -->
          <div class="relative rounded-2xl shadow-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Data analyst working with spreadsheets and analytics" 
              class="w-full h-auto object-cover rounded-2xl"
            >
            <!-- Overlay with productivity stats -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
            
            <!-- Floating productivity cards -->
            <div class="absolute bottom-6 left-6 right-6">
              <div class="bg-white/95 backdrop-blur-sm rounded-lg p-4 mb-4">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-2xl font-bold text-gray-900">5.2x</div>
                    <div class="text-sm text-gray-600">Faster Analysis</div>
                  </div>
                  <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Top floating card -->
            <div class="absolute top-6 right-6">
              <div class="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <div class="flex items-center space-x-2">
                  <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                  </div>
                  <div>
                    <div class="text-sm font-bold text-gray-900">AI Active</div>
                    <div class="text-xs text-gray-500">Processing...</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Left floating card -->
            <div class="absolute top-1/2 left-6 transform -translate-y-1/2">
              <div class="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <div class="text-center">
                  <div class="text-lg font-bold text-gray-900">92%</div>
                  <div class="text-xs text-gray-500">Time Saved</div>
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
  name: 'CallToActionSection'
}
</script>