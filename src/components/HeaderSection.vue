<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
    <nav class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
      <div class="flex justify-between items-center h-14 sm:h-16">
        <!-- Logo -->
        <div class="flex items-center flex-shrink-0">
          <router-link to="/" class="flex items-center">
            <img 
              src="/logo.png" 
              alt="SmartSheet Logo" 
              class="h-10 sm:h-12 md:h-16 w-auto mr-2 sm:mr-3"
            >
            <span class="text-lg sm:text-xl font-display font-bold text-gray-900">SmartSheet</span>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center space-x-6 xl:space-x-8">
          <router-link 
            to="/" 
            class="text-gray-700 hover:text-primary transition-colors font-medium text-sm xl:text-base" 
            active-class="text-primary font-medium"
          >
            Home
          </router-link>
          <router-link 
            to="/about" 
            class="text-gray-700 hover:text-primary transition-colors font-medium text-sm xl:text-base" 
            active-class="text-primary font-medium"
          >
            About
          </router-link>
          <router-link 
            to="/services" 
            class="text-gray-700 hover:text-primary transition-colors font-medium text-sm xl:text-base" 
            active-class="text-primary font-medium"
          >
            Services
          </router-link>
          <router-link 
            to="/pricing" 
            class="text-gray-700 hover:text-primary transition-colors font-medium text-sm xl:text-base" 
            active-class="text-primary font-medium"
          >
            Pricing
          </router-link>
          <router-link 
            to="/contact" 
            class="text-gray-700 hover:text-primary transition-colors font-medium text-sm xl:text-base" 
            active-class="text-primary font-medium"
          >
            Contact
          </router-link>
        </div>

        <!-- Desktop CTA Button -->
        <div class="hidden lg:flex items-center flex-shrink-0">
          <button
            class="bg-primary text-white px-4 xl:px-6 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors text-sm xl:text-base whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Book a Demo
          </button>
        </div>

        <!-- Mobile/Tablet Menu Button -->
        <div class="lg:hidden flex-shrink-0">
          <button 
            @click.stop="toggleMobileMenu" 
            class="text-gray-800 hover:text-primary transition-colors p-2 focus:outline-none focus:ring-2 focus:ring-primary rounded"
            aria-label="Toggle menu"
            aria-expanded="mobileMenuOpen"
          >
            <MenuIcon v-if="!mobileMenuOpen" class="w-6 h-6 sm:w-7 sm:h-7" />
            <XIcon v-else class="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
        </div>
      </div>

      <!-- Mobile/Tablet Menu -->
      <transition
        enter-active-class="transition duration-150 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="mobileMenuOpen" class="lg:hidden py-3 sm:py-4 border-t border-gray-100 bg-white">
          <div class="flex flex-col space-y-3 sm:space-y-4 px-1">
            <router-link 
              to="/" 
              @click.stop="mobileMenuOpen = false"
              class="text-gray-700 hover:text-primary transition-colors font-medium py-2 px-2 rounded-md hover:bg-gray-50 focus:outline-none focus:bg-gray-50" 
              active-class="text-primary font-medium bg-primary/5"
            >
              Home
            </router-link>
            <router-link 
              to="/about" 
              @click.stop="mobileMenuOpen = false"
              class="text-gray-700 hover:text-primary transition-colors font-medium py-2 px-2 rounded-md hover:bg-gray-50 focus:outline-none focus:bg-gray-50" 
              active-class="text-primary font-medium bg-primary/5"
            >
              About
            </router-link>
            <router-link 
              to="/services" 
              @click.stop="mobileMenuOpen = false"
              class="text-gray-700 hover:text-primary transition-colors font-medium py-2 px-2 rounded-md hover:bg-gray-50 focus:outline-none focus:bg-gray-50" 
              active-class="text-primary font-medium bg-primary/5"
            >
              Services
            </router-link>
            <router-link 
              to="/pricing" 
              @click.stop="mobileMenuOpen = false"
              class="text-gray-700 hover:text-primary transition-colors font-medium py-2 px-2 rounded-md hover:bg-gray-50 focus:outline-none focus:bg-gray-50" 
              active-class="text-primary font-medium bg-primary/5"
            >
              Pricing
            </router-link>
            <router-link 
              to="/contact" 
              @click.stop="mobileMenuOpen = false"
              class="text-gray-700 hover:text-primary transition-colors font-medium py-2 px-2 rounded-md hover:bg-gray-50 focus:outline-none focus:bg-gray-50" 
              active-class="text-primary font-medium bg-primary/5"
            >
              Contact
            </router-link>
            <div class="pt-3 sm:pt-4 border-t border-gray-100">
              <button
                @click.stop="mobileMenuOpen = false"
                class="bg-primary text-white px-6 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors w-full text-center focus:outline-none focus:ring-2 focus:ring-primary"
              >
                Book a Demo
              </button>
            </div>
          </div>
        </div>
      </transition>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'HeaderSection',
  data() {
    return {
      mobileMenuOpen: false
    }
  },
  mounted() {
    // Add optimized click-outside listener
    document.addEventListener('click', this.handleClickOutside, { passive: true })
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    handleClickOutside(event) {
      // Only check if menu is open to reduce unnecessary checks
      if (this.mobileMenuOpen && !this.$el.contains(event.target)) {
        this.mobileMenuOpen = false
      }
    }
  },
  components: {
    MenuIcon: {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      `
    },
    XIcon: {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      `
    }
  }
}
</script>
