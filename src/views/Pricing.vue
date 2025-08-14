<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="pt-32 pb-24 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <p class="text-caption text-green-600 mb-4">PRICING</p>
          <h1 class="text-display text-4xl md:text-5xl text-gray-900 mb-6">
            Simple pricing for powerful spreadsheet automation
          </h1>
          <p class="text-body text-xl text-gray-600 max-w-4xl mx-auto">
            Choose the perfect SmartSheet plan for your team. Start with our free trial and upgrade as you grow. No
            hidden fees, transparent pricing for AI-powered spreadsheet automation.
          </p>
          
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="py-24 bg-white">
      <PricingSection />
    </section>

    <!-- Feature Comparison -->
    <section class="py-24 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <p class="text-caption text-green-600 mb-4">FEATURE COMPARISON</p>
          <h2 class="text-heading text-3xl md:text-4xl text-gray-900 mb-6">Compare SmartSheet plans</h2>
          <p class="text-body text-xl text-gray-600 max-w-3xl mx-auto">
            Compare all AI automation features and capabilities across our plans to find the perfect fit for your
            spreadsheet workflows.
          </p>
        </div>

        <!-- Comparison Table -->
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">Features</th>
                  <th class="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                    <div class="flex flex-col items-center">
                      <span class="text-lg font-bold">Basic</span>
                      <span class="text-xs text-gray-500 mt-1">$9/month</span>
                    </div>
                  </th>
                  <th class="px-6 py-4 text-center text-sm font-semibold text-gray-900 bg-green-50 relative">
                    <div class="flex flex-col items-center">
                      <div class="absolute top-1 left-1/2 transform -translate-x-1/2">
                        <span class="bg-green-600 text-white text-xs px-2 py-1 rounded-full">Most Popular</span>
                      </div>
                      <span class="text-lg font-bold text-green-700 mt-2">Pro</span>
                      <span class="text-xs text-green-600 mt-1">$29/month</span>
                    </div>
                  </th>
                  <th class="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                    <div class="flex flex-col items-center">
                      <span class="text-lg font-bold">Enterprise</span>
                      <span class="text-xs text-gray-500 mt-1">Custom</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <template v-for="category in featureCategories" :key="category">
                  <!-- Category Header -->
                  <tr class="bg-gray-50">
                    <td colspan="4" class="px-6 py-3">
                      <h4 class="text-sm font-semibold text-gray-900 uppercase tracking-wide">{{ category }}</h4>
                    </td>
                  </tr>
                  <!-- Category Features -->
                  <tr v-for="feature in getFeaturesByCategory(category)" :key="feature.name"
                    class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 text-sm font-medium text-gray-900">
                      <div class="flex items-center">
                        <span>{{ feature.name }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <div class="flex items-center justify-center">
                        <component :is="getFeatureIcon(feature.basic)" :class="getFeatureClass(feature.basic)"
                          v-if="typeof feature.basic === 'boolean'" />
                        <span v-else :class="getFeatureClass(feature.basic)">{{ feature.basic }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-center bg-green-50">
                      <div class="flex items-center justify-center">
                        <component :is="getFeatureIcon(feature.pro)" :class="getFeatureClass(feature.pro)"
                          v-if="typeof feature.pro === 'boolean'" />
                        <span v-else :class="getFeatureClass(feature.pro)">{{ feature.pro }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <div class="flex items-center justify-center">
                        <component :is="getFeatureIcon(feature.enterprise)" :class="getFeatureClass(feature.enterprise)"
                          v-if="typeof feature.enterprise === 'boolean'" />
                        <span v-else :class="getFeatureClass(feature.enterprise)">{{ feature.enterprise }}</span>
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <p class="text-caption text-green-600 mb-4">FAQ</p>
          <h2 class="text-heading text-3xl md:text-4xl text-gray-900 mb-6">SmartSheet pricing questions</h2>
          <p class="text-body text-xl text-gray-600 max-w-3xl mx-auto">
            Common questions about SmartSheet pricing, features, and subscription plans.
          </p>
        </div>

        <div class="max-w-3xl mx-auto">
          <div class="space-y-4">
            <div v-for="(faq, index) in pricingFAQs" :key="index" class="border border-gray-200 rounded-lg">
              <button @click="toggleFAQ(index)"
                class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <span class="font-medium text-gray-900">{{ faq.question }}</span>
                <svg class="w-5 h-5 text-gray-500 transform transition-transform"
                  :class="{ 'rotate-45': openFAQ === index }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6">
                  </path>
                </svg>
              </button>
              <div v-if="openFAQ === index" class="px-6 pb-4 text-gray-600 leading-relaxed border-t border-gray-100">
                <div class="pt-4">{{ faq.answer }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Enterprise CTA -->
    <section class="py-24 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-heading text-4xl text-gray-900 mb-6">Need Something Custom?</h2>
        <p class="text-body text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          For large organizations with specific requirements, we offer custom enterprise solutions with dedicated
          support and tailored features.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            class="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors">
            Contact Sales
          </button>
          <button class="text-gray-700 hover:text-gray-900 font-medium">
            Schedule a Demo
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import PricingSection from '../components/PricingSection.vue'

export default {
  name: 'Pricing',
  components: {
    PricingSection,
    CheckIcon: {
      template: `
        <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      `
    },
    XIcon: {
      template: `
        <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      `
    }
  },
  data() {
    return {
      openFAQ: null,
      comparisonFeatures: [
        // Core Features
        { name: 'AI-Powered Spreadsheets', basic: true, pro: true, enterprise: true, category: 'Core Features' },
        { name: 'Smart Formula Generation', basic: true, pro: true, enterprise: true, category: 'Core Features' },
        { name: 'Data Import/Export', basic: true, pro: true, enterprise: true, category: 'Core Features' },
        { name: 'Basic Templates', basic: true, pro: true, enterprise: true, category: 'Core Features' },
        { name: 'Email Support', basic: true, pro: true, enterprise: true, category: 'Core Features' },

        // Team & Collaboration
        { name: 'Team Members', basic: '3', pro: 'Unlimited', enterprise: 'Unlimited', category: 'Team & Collaboration' },
        { name: 'Real-time Collaboration', basic: false, pro: true, enterprise: true, category: 'Team & Collaboration' },
        { name: 'Comment & Review System', basic: false, pro: true, enterprise: true, category: 'Team & Collaboration' },
        { name: 'Version History', basic: '7 days', pro: '30 days', enterprise: 'Unlimited', category: 'Team & Collaboration' },
        { name: 'Team Permissions', basic: false, pro: true, enterprise: true, category: 'Team & Collaboration' },

        // AI & Automation
        { name: 'AI Insights Level', basic: 'Basic', pro: 'Advanced', enterprise: 'Premium', category: 'AI & Automation' },
        { name: 'Automated Workflows', basic: false, pro: true, enterprise: true, category: 'AI & Automation' },
        { name: 'Predictive Analytics', basic: false, pro: true, enterprise: true, category: 'AI & Automation' },
        { name: 'Custom AI Models', basic: false, pro: false, enterprise: true, category: 'AI & Automation' },
        { name: 'Advanced Data Processing', basic: false, pro: true, enterprise: true, category: 'AI & Automation' },

        // Integrations & API
        { name: 'Data Integrations', basic: '5', pro: '50', enterprise: 'Unlimited', category: 'Integrations & API' },
        { name: 'API Access', basic: false, pro: true, enterprise: true, category: 'Integrations & API' },
        { name: 'Webhook Support', basic: false, pro: true, enterprise: true, category: 'Integrations & API' },
        { name: 'Custom Integrations', basic: false, pro: false, enterprise: true, category: 'Integrations & API' },
        { name: 'Third-party Apps', basic: '3', pro: '20', enterprise: 'Unlimited', category: 'Integrations & API' },

        // Security & Compliance
        { name: 'Data Encryption', basic: true, pro: true, enterprise: true, category: 'Security & Compliance' },
        { name: 'SSO Authentication', basic: false, pro: false, enterprise: true, category: 'Security & Compliance' },
        { name: 'Advanced Security', basic: false, pro: true, enterprise: true, category: 'Security & Compliance' },
        { name: 'Compliance Reports', basic: false, pro: false, enterprise: true, category: 'Security & Compliance' },
        { name: 'Audit Logs', basic: false, pro: true, enterprise: true, category: 'Security & Compliance' },

        // Support & SLA
        { name: 'Support Level', basic: 'Email', pro: 'Priority', enterprise: 'Dedicated', category: 'Support & SLA' },
        { name: 'Response Time', basic: '48h', pro: '24h', enterprise: '4h', category: 'Support & SLA' },
        { name: 'Custom SLA', basic: false, pro: false, enterprise: true, category: 'Support & SLA' },
        { name: 'Phone Support', basic: false, pro: true, enterprise: true, category: 'Support & SLA' },
        { name: 'Dedicated Account Manager', basic: false, pro: false, enterprise: true, category: 'Support & SLA' },

        // Enterprise Features
        { name: 'On-premise Deployment', basic: false, pro: false, enterprise: true, category: 'Enterprise Features' },
        { name: 'White-label Solution', basic: false, pro: false, enterprise: true, category: 'Enterprise Features' },
        { name: 'Custom Training', basic: false, pro: false, enterprise: true, category: 'Enterprise Features' },
        { name: 'Priority Feature Requests', basic: false, pro: false, enterprise: true, category: 'Enterprise Features' }
      ],
      pricingFAQs: [
        {
          question: 'Can I change my plan at any time?',
          answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately for upgrades, and for downgrades, the change will occur at your next billing cycle.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. Enterprise customers can also pay via bank transfer or purchase order.'
        },
        {
          question: 'Is there a setup fee?',
          answer: 'No, there are no setup fees for any of our plans. You only pay the monthly or annual subscription fee.'
        },
        {
          question: 'Do you offer refunds?',
          answer: 'We offer a 30-day money-back guarantee for all paid plans. If you\'re not satisfied, contact us within 30 days for a full refund.'
        },
        {
          question: 'What happens if I exceed my plan limits?',
          answer: 'We\'ll notify you when you\'re approaching your limits and help you upgrade to a suitable plan. We never cut off access without warning.'
        },
        {
          question: 'Can I get a discount for annual billing?',
          answer: 'Yes! Annual plans come with a 20% discount compared to monthly billing. You\'ll save money and get the convenience of annual billing.'
        }
      ]
    }
  },
  computed: {
    featureCategories() {
      const categories = [...new Set(this.comparisonFeatures.map(f => f.category))]
      return [
        'Core Features',
        'Team & Collaboration',
        'AI & Automation',
        'Integrations & API',
        'Security & Compliance',
        'Support & SLA',
        'Enterprise Features'
      ].filter(cat => categories.includes(cat))
    }
  },
  methods: {
    toggleFAQ(index) {
      this.openFAQ = this.openFAQ === index ? null : index
    },
    getFeaturesByCategory(category) {
      return this.comparisonFeatures.filter(feature => feature.category === category)
    },
    getFeatureIcon(value) {
      if (value === true) return this.$options.components.CheckIcon
      if (value === false) return this.$options.components.XIcon
      return 'span'
    },
    getFeatureClass(value) {
      if (value === true) return 'text-green-600'
      if (value === false) return 'text-red-400'
      return 'text-gray-700 text-sm font-medium'
    }
  }
}
</script>
