<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="pt-32 pb-24 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <p class="text-caption text-green-600 mb-4">CONTACT US</p>
          <h1 class="text-display text-4xl md:text-5xl text-gray-900 mb-6">
            Get in touch with the SmartSheet team
          </h1>
          <p class="text-body text-xl text-gray-600 max-w-4xl mx-auto">
            Have questions about AI-powered spreadsheet automation? Need help with implementation? We're here to help.
            Reach out to our team and we'll get back to you quickly.
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="py-24 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <!-- Contact Form -->
          <div>
            <p class="text-caption text-green-600 mb-4">SEND MESSAGE</p>
            <h2 class="text-heading text-3xl text-gray-900 mb-8">Let's discuss your spreadsheet automation needs</h2>
            <!-- Success/Error Messages -->
            <div v-if="showMessage" class="mb-6">
              <div v-if="messageType === 'success'"
                class="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start justify-between">
                <div class="flex items-start space-x-3">
                  <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <div>
                    <h3 class="text-green-800 font-medium">Message sent successfully!</h3>
                    <p class="text-green-700 text-sm mt-1">{{ successMessage }}</p>
                  </div>
                </div>
                <button @click="hideMessage" class="text-green-600 hover:text-green-800 transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                    </path>
                  </svg>
                </button>
              </div>

              <div v-if="messageType === 'error'"
                class="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start justify-between">
                <div class="flex items-start space-x-3">
                  <svg class="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <div>
                    <h3 class="text-red-800 font-medium">Failed to send message</h3>
                    <p class="text-red-700 text-sm mt-1">{{ errorMessage }}</p>
                  </div>
                </div>
                <button @click="hideMessage" class="text-red-600 hover:text-red-800 transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                    </path>
                  </svg>
                </button>
              </div>
            </div>

            <form @submit.prevent="submitForm" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input type="text" id="firstName" v-model="form.firstName" required
                    class="w-full px-4 py-3 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                </div>
                <div>
                  <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input type="text" id="lastName" v-model="form.lastName" required
                    class="w-full px-4 py-3 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                </div>
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" id="email" v-model="form.email" required
                  class="w-full px-4 py-3 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
              </div>

              <div>
                <label for="company" class="block text-sm font-medium text-gray-700 mb-2">Company</label>
                <input type="text" id="company" v-model="form.company"
                  class="w-full px-4 py-3 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
              </div>

              <!-- Custom Dropdown -->
              <div class="relative" ref="dropdownContainer">
                <label class="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <div class="relative">
                  <button type="button" @click="toggleDropdown"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-left focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none flex items-center justify-between"
                    :class="{ 'border-green-500 ring-2 ring-green-500': isDropdownOpen }">
                    <span :class="form.subject ? 'text-gray-900' : 'text-gray-500'">
                      {{ getSelectedSubjectLabel() || 'Select a subject' }}
                    </span>
                    <svg class="w-5 h-5 text-gray-400 transition-transform duration-200"
                      :class="{ 'rotate-180': isDropdownOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>

                  <!-- Dropdown Menu -->
                  <div v-if="isDropdownOpen"
                    class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                    <div class="py-1">
                      <button v-for="option in subjectOptions" :key="option.value" type="button"
                        @click="selectSubject(option)"
                        class="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors duration-150"
                        :class="{ 'bg-green-50 text-green-700': form.subject === option.value }">
                        <div class="flex items-center">
                          <div
                            class="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                            <component :is="option.icon" class="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <div class="font-medium text-gray-900">{{ option.label }}</div>
                            <div class="text-sm text-gray-500">{{ option.description }}</div>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea id="message" v-model="form.message" rows="6" required
                  class="w-full px-4 py-3 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Tell us about your spreadsheet automation needs..."></textarea>
              </div>

              <button type="submit" :disabled="isSubmitting"
                class="w-full bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50">
                {{ isSubmitting ? 'Sending...' : 'Send Message' }}
              </button>
            </form>
          </div>

          <!-- Contact Information -->
          <div>
            <p class="text-caption text-green-600 mb-4">GET IN TOUCH</p>
            <h2 class="text-heading text-3xl text-gray-900 mb-8">SmartSheet Contact Information</h2>

            <div class="space-y-8">
              <!-- Contact Methods -->
              <div class="space-y-6">
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                      </path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                    <p class="text-gray-600">ainedushimire@gmail.com</p>
                    <p class="text-gray-600">dushimireaine@gmail.com</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
                      </path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-1">Phone</h3>
                    <p class="text-gray-600">+250 798 380 290</p>
                    <p class="text-gray-600 text-sm">Mon-Fri 8AM-5PM CAT</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-1">Office</h3>
                    <p class="text-gray-600">KG 9 Ave, Nyarugenge<br>Kigali, Rwanda<br>East Africa</p>
                  </div>
                </div>
              </div>

              <!-- Response Times -->
              <div class="bg-gray-50 rounded-2xl p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Response Times</h3>
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">General Inquiries</span>
                    <span class="text-primary font-medium">24 hours</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">Sales Questions</span>
                    <span class="text-primary font-medium">4 hours</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">Technical Support</span>
                    <span class="text-primary font-medium">2 hours</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">Enterprise Support</span>
                    <span class="text-primary font-medium">1 hour</span>
                  </div>
                </div>
              </div>

              <!-- Social Links -->
              <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
                <div class="flex space-x-4">
                  <a href="#"
                    class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z">
                      </path>
                    </svg>
                  </a>
                  <a href="#"
                    class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z">
                      </path>
                    </svg>
                  </a>
                  <a href="#"
                    class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.858-.896 3.433-2.001 4.72-.524.611-1.076 1.126-1.644 1.541-.568.415-1.156.751-1.754 1.005-.598.254-1.204.429-1.798.523-.594.094-1.182.108-1.748.041-.566-.067-1.117-.203-1.634-.407-.517-.204-.998-.475-1.429-.812-.431-.337-.808-.739-1.123-1.201-.315-.462-.565-.982-.743-1.548-.178-.566-.285-1.174-.318-1.807-.033-.633.006-1.284.115-1.933.109-.649.288-1.29.533-1.913.245-.623.556-1.221.926-1.785.37-.564.798-1.088 1.276-1.565.478-.477 1.002-.905 1.566-1.275.564-.37 1.162-.681 1.785-.926.623-.245 1.264-.424 1.913-.533.649-.109 1.3-.148 1.933-.115.633.033 1.241.14 1.807.318.566.178 1.086.428 1.548.743.462.315.864.692 1.201 1.123.337.431.608.912.812 1.429.204.517.34 1.068.407 1.634.067.566.053 1.154-.041 1.748-.094.594-.269 1.2-.523 1.798-.254.598-.59 1.186-1.005 1.754-.415.568-.93 1.12-1.541 1.644-1.287 1.105-2.862 1.832-4.72 2.001z">
                      </path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section (Placeholder) -->
    <section class="py-24 bg-gray-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <p class="text-caption text-green-600 mb-4">VISIT US</p>
          <h2 class="text-heading text-3xl text-gray-900 mb-4">SmartSheet Headquarters</h2>
          <p class="text-body text-lg text-gray-600">Located in the heart of Kigali's tech innovation hub</p>
        </div>

        <!-- Kigali Map -->
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15949.042886936147!2d30.058611!3d-1.9440727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca4258ed8e797%3A0x4a1b1a1a1a1a1a1a!2sKigali%2C%20Rwanda!5e0!3m2!1sen!2sus!4v1234567890123"
            width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy"
            referrerpolicy="no-referrer-when-downgrade" class="w-full h-96"></iframe>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  components: {
    QuestionIcon: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
    },
    CurrencyIcon: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
    },
    SupportIcon: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`
    },
    PlayIcon: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10v4a2 2 0 002 2h2a2 2 0 002-2v-4M9 10V9a2 2 0 012-2h2a2 2 0 012 2v1"></path></svg>`
    },
    CogIcon: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`
    },
    HandshakeIcon: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>`
    }
  },
  data() {
    return {
      isSubmitting: false,
      isDropdownOpen: false,
      showMessage: false,
      messageType: '', // 'success' or 'error'
      successMessage: '',
      errorMessage: '',
      form: {
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      },
      subjectOptions: [
        {
          value: 'general',
          label: 'General Inquiry',
          description: 'General questions about SmartSheet',
          icon: 'QuestionIcon'
        },
        {
          value: 'sales',
          label: 'Sales & Pricing',
          description: 'Pricing information and sales inquiries',
          icon: 'CurrencyIcon'
        },
        {
          value: 'support',
          label: 'Technical Support',
          description: 'Help with technical issues',
          icon: 'SupportIcon'
        },
        {
          value: 'demo',
          label: 'Request SmartSheet Demo',
          description: 'Schedule a product demonstration',
          icon: 'PlayIcon'
        },
        {
          value: 'automation',
          label: 'Automation Consulting',
          description: 'Custom automation solutions',
          icon: 'CogIcon'
        },
        {
          value: 'partnership',
          label: 'Partnership',
          description: 'Business partnership opportunities',
          icon: 'HandshakeIcon'
        }
      ]
    }
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    selectSubject(option) {
      this.form.subject = option.value
      this.isDropdownOpen = false
    },
    getSelectedSubjectLabel() {
      const selected = this.subjectOptions.find(option => option.value === this.form.subject)
      return selected ? selected.label : ''
    },
    async submitForm() {
      if (!this.form.subject) {
        this.showErrorMessage('Please select a subject before submitting the form.')
        return
      }

      this.isSubmitting = true
      this.hideMessage()

      try {
        // Prepare email data
        const emailData = {
          to: 'ainedushimire@gmail.com',
          subject: `SmartSheet Contact Form: ${this.getSelectedSubjectLabel()}`,
          from: this.form.email,
          replyTo: this.form.email,
          name: `${this.form.firstName} ${this.form.lastName}`,
          company: this.form.company || 'Not specified',
          inquiryType: this.getSelectedSubjectLabel(),
          message: this.form.message,
          timestamp: new Date().toLocaleString(),
          userAgent: navigator.userAgent,
          // Email template
          htmlContent: this.generateEmailTemplate()
        }

        // Send email using EmailJS or similar service
        const response = await this.sendEmail(emailData)

        if (response.success) {
          this.showSuccessMessage('Thank you for contacting SmartSheet! Your message has been sent successfully. We\'ll get back to you within 24 hours.')

          // Reset form
          this.form = {
            firstName: '',
            lastName: '',
            email: '',
            company: '',
            subject: '',
            message: ''
          }
        } else {
          throw new Error(response.error || 'Failed to send email')
        }

      } catch (error) {
        console.error('Form submission error:', error)
        this.showErrorMessage('Sorry, there was an error sending your message. Please try again or contact us directly at ainedushimire@gmail.com.')
      } finally {
        this.isSubmitting = false
      }
    },

    async sendEmail(emailData) {
      // Simulate email sending - In production, you would integrate with:
      // - EmailJS (https://www.emailjs.com/)
      // - Formspree (https://formspree.io/)
      // - Netlify Forms
      // - Your own backend API

      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000))

        // Simulate success/failure (90% success rate for demo)
        const isSuccess = Math.random() > 0.1

        if (isSuccess) {
          // Log the email data (in production, this would be sent to your email service)
          console.log('Email would be sent to ainedushimire@gmail.com with data:', emailData)

          return {
            success: true,
            message: 'Email sent successfully'
          }
        } else {
          throw new Error('Email service temporarily unavailable')
        }

      } catch (error) {
        return {
          success: false,
          error: error.message
        }
      }
    },

    showSuccessMessage(message) {
      this.successMessage = message
      this.messageType = 'success'
      this.showMessage = true
      this.scrollToMessage()

      // Auto-hide success message after 8 seconds
      setTimeout(() => {
        if (this.messageType === 'success') {
          this.hideMessage()
        }
      }, 8000)
    },

    showErrorMessage(message) {
      this.errorMessage = message
      this.messageType = 'error'
      this.showMessage = true
      this.scrollToMessage()

      // Auto-hide error message after 10 seconds
      setTimeout(() => {
        if (this.messageType === 'error') {
          this.hideMessage()
        }
      }, 10000)
    },

    hideMessage() {
      this.showMessage = false
      this.messageType = ''
      this.successMessage = ''
      this.errorMessage = ''
    },

    scrollToMessage() {
      // Scroll to the message after a short delay to ensure it's rendered
      this.$nextTick(() => {
        const messageElement = document.querySelector('.bg-green-50, .bg-red-50')
        if (messageElement) {
          messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      })
    },

    generateEmailTemplate() {
      const selectedSubject = this.subjectOptions.find(option => option.value === this.form.subject)

      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div style="border-bottom: 3px solid #10b981; padding-bottom: 20px; margin-bottom: 30px;">
              <h1 style="color: #10b981; margin: 0; font-size: 24px;">SmartSheet Contact Form</h1>
              <p style="color: #6b7280; margin: 5px 0 0 0;">New inquiry received</p>
            </div>
            
            <div style="margin-bottom: 25px;">
              <h2 style="color: #374151; font-size: 18px; margin-bottom: 15px;">Contact Information</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: bold; width: 120px;">Name:</td>
                  <td style="padding: 8px 0; color: #374151;">${this.form.firstName} ${this.form.lastName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Email:</td>
                  <td style="padding: 8px 0; color: #374151;"><a href="mailto:${this.form.email}" style="color: #10b981;">${this.form.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Company:</td>
                  <td style="padding: 8px 0; color: #374151;">${this.form.company || 'Not specified'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Subject:</td>
                  <td style="padding: 8px 0; color: #374151;">
                    <span style="background-color: #dcfce7; color: #166534; padding: 4px 8px; border-radius: 4px; font-size: 12px;">
                      ${selectedSubject ? selectedSubject.label : 'Unknown'}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Date:</td>
                  <td style="padding: 8px 0; color: #374151;">${new Date().toLocaleString()}</td>
                </tr>
              </table>
            </div>
            
            <div style="margin-bottom: 25px;">
              <h2 style="color: #374151; font-size: 18px; margin-bottom: 15px;">Message</h2>
              <div style="background-color: #f9fafb; padding: 20px; border-radius: 6px; border-left: 4px solid #10b981;">
                <p style="color: #374151; line-height: 1.6; margin: 0; white-space: pre-wrap;">${this.form.message}</p>
              </div>
            </div>
            
            <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center;">
              <p style="color: #6b7280; font-size: 12px; margin: 0;">
                This message was sent from the SmartSheet contact form.<br>
                Please reply directly to <a href="mailto:${this.form.email}" style="color: #10b981;">${this.form.email}</a>
              </p>
            </div>
          </div>
        </div>
      `
    }
  },
  mounted() {
    // Close dropdown when clicking outside
    this.handleClickOutside = (e) => {
      if (this.$refs.dropdownContainer && !this.$refs.dropdownContainer.contains(e.target)) {
        this.isDropdownOpen = false
      }
    }
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    // Clean up event listener
    if (this.handleClickOutside) {
      document.removeEventListener('click', this.handleClickOutside)
    }
  }
}
</script>