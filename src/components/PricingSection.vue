<template>
  <section class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <p class="text-primary text-sm font-medium uppercase tracking-wider mb-4">PRICING PLANS</p>
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Simple pricing, powerful
          <br>
          features
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Free 30-day trial, no credit card required.
        </p>
        
        <!-- Billing Toggle -->
        <div class="flex items-center justify-center space-x-4 mb-12">
          <span class="text-gray-700 font-medium">Monthly</span>
          <button @click="isYearly = !isYearly" class="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" :class="{ 'bg-primary': isYearly }">
            <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform" :class="{ 'translate-x-6': isYearly, 'translate-x-1': !isYearly }"></span>
          </button>
          <span class="text-gray-700 font-medium">Yearly <span class="text-primary text-sm">(20% OFF)</span></span>
        </div>
      </div>

      <!-- Pricing Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        
        <!-- Basic Plan -->
        <div class="bg-white border border-gray-200 rounded-2xl p-8 relative">
          <div class="mb-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Basic</h3>
            <div class="flex items-baseline mb-2">
              <span class="text-4xl font-bold text-gray-900">${{ isYearly ? '15' : '19' }}</span>
              <span class="text-gray-600 ml-2">per month</span>
            </div>
            <p class="text-gray-600">Essential tools for small teams</p>
          </div>

          <!-- Features -->
          <div class="space-y-4 mb-8">
            <div class="flex items-center space-x-3">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700">Unlimited spreadsheets</span>
            </div>
            <div class="flex items-center space-x-3">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700">Up to 3 team members</span>
            </div>
            <div class="flex items-center space-x-3">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700">Basic AI insights</span>
            </div>
            <div class="flex items-center space-x-3">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700">Email support</span>
            </div>
            <div class="flex items-center space-x-3">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700">Up to 5 integrations</span>
            </div>
            <div class="flex items-center space-x-3">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700">Basic analytics</span>
            </div>
          </div>

          <!-- CTA Button -->
          <button class="w-full bg-gray-100 text-gray-900 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors">
            Start for free →
          </button>
        </div>

        <!-- Pro Plan (Most Popular) -->
        <div class="bg-white border-2 border-primary rounded-2xl p-8 relative shadow-lg">
          <!-- Most Popular Badge -->
          <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span class="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
          </div>

          <div class="mb-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
            <div class="flex items-baseline mb-2">
              <span class="text-4xl font-bold text-gray-900">${{ isYearly ? '39' : '49' }}</span>
              <span class="text-gray-600 ml-2">per month</span>
            </div>
            <p class="text-gray-600">Advanced features for fast growing teams</p>
          </div>

          <!-- Features -->
          <div class="space-y-4 mb-8">
            <div class="flex items-center space-x-3">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700">Unlimited spreadsheets</span>
            </div>
            <div class="flex items-center space-x-3">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700">Unlimited team members</span>
            </div>
            <div class="flex items-center space-x-3">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700">Advanced AI insights</span>
            </div>
            <div class="flex items-center space-x-3">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700">Priority email support</span>
            </div>
            <div class="flex items-center space-x-3">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700">Unlimited integrations</span>
            </div>
            <div class="flex items-center space-x-3">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700">Advanced analytics</span>
            </div>
            <div class="flex items-center space-x-3">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700">API access</span>
            </div>
          </div>

          <!-- CTA Button -->
          <button class="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-dark transition-colors">
            Start for free →
          </button>
        </div>

        <!-- Enterprise Plan -->
        <div class="bg-white border border-gray-200 rounded-2xl p-8 relative">
          <div class="mb-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
            <div class="flex items-baseline mb-2">
              <span class="text-4xl font-bold text-gray-900">${{ isYearly ? '71' : '89' }}</span>
              <span class="text-gray-600 ml-2">per month</span>
            </div>
            <p class="text-gray-600">Custom features for the enterprises</p>
          </div>

          <!-- Features -->
          <div class="space-y-4 mb-8">
            <div class="flex items-center space-x-3">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700">All Pro features...</span>
            </div>
            <div class="flex items-center space-x-3">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700">SSO authentication</span>
            </div>
            <div class="flex items-center space-x-3">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700">Custom SLA</span>
            </div>
            <div class="flex items-center space-x-3">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700">Dedicated account manager</span>
            </div>
            <div class="flex items-center space-x-3">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700">Custom integrations</span>
            </div>
            <div class="flex items-center space-x-3">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700">24/7 phone support</span>
            </div>
          </div>

          <!-- CTA Button -->
          <button class="w-full bg-gray-100 text-gray-900 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors">
            Start for free →
          </button>
        </div>

      </div>

      <!-- Bottom CTA -->
      <div class="text-center mt-16">
        <p class="text-gray-600 mb-4">All plans include a 30-day free trial. No credit card required.</p>
        <p class="text-sm text-gray-500">Questions? <a href="#" class="text-primary hover:text-primary-dark">Contact our sales team</a></p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PricingSection',
  data() {
    return {
      isYearly: false
    }
  }
}
</script>