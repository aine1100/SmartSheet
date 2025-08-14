<template>
  <section class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        <!-- Left Content -->
        <div>
          <p class="text-primary text-sm font-medium uppercase tracking-wider mb-4">GOT QUESTIONS?</p>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to
            <br>
            Know, All in One Place
          </h2>
          <p class="text-xl text-gray-600 leading-relaxed">
            Discover quick and comprehensive answers to common questions about our platform, services, and features.
          </p>
        </div>

        <!-- Right FAQ Items -->
        <div class="space-y-4">
          <div v-for="(faq, index) in faqs" :key="index" 
               class="border border-gray-200 rounded-lg">
            <button @click="toggleFAQ(index)"
                    class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
              <span class="font-medium text-gray-900">{{ faq.question }}</span>
              <svg class="w-5 h-5 text-gray-500 transform transition-transform" 
                   :class="{ 'rotate-45': openFAQ === index }"
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </button>
            <div v-if="openFAQ === index" 
                 class="px-6 pb-4 text-gray-600 leading-relaxed border-t border-gray-100">
              <div class="pt-4">{{ faq.answer }}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FAQSection',
  data() {
    return {
      openFAQ: null,
      faqs: [
        {
          question: "What is included in the free trial?",
          answer: "The free trial includes full access to all Pro features for 30 days, including unlimited spreadsheets, AI insights, advanced analytics, and all integrations. No credit card required to start."
        },
        {
          question: "Can I cancel my subscription at any time?",
          answer: "Yes, you can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period, and you won't be charged for the next cycle."
        },
        {
          question: "Do you offer discounts for annual plans?",
          answer: "Yes! Annual plans come with a 20% discount compared to monthly billing. You'll save money and get the same great features with the convenience of annual billing."
        },
        {
          question: "Is my data secure on your platform?",
          answer: "Absolutely. We use bank-level encryption, secure data centers, and comply with industry standards including SOC 2 and GDPR. Your data is encrypted both in transit and at rest, and we never share it with third parties."
        },
        {
          question: "Can I change my plan after I've subscribed?",
          answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately for upgrades, and for downgrades, the change will occur at your next billing cycle."
        },
        {
          question: "Do you offer support for onboarding new users?",
          answer: "Yes! We provide comprehensive onboarding support including video tutorials, documentation, live chat support, and for Enterprise customers, dedicated account managers and training sessions."
        }
      ]
    }
  },
  methods: {
    toggleFAQ(index) {
      this.openFAQ = this.openFAQ === index ? null : index
    }
  }
}
</script>