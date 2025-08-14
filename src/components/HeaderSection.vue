<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center">
            <img 
              src="/logo.png" 
              alt="SmartSheet Logo" 
              class="h-16 w-auto mr-3"
            >
            <span class="text-xl font-display font-bold text-gray-900">SmartSheet</span>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link to="/" class="text-gray-700 hover:text-primary transition-colors font-medium" active-class="text-primary font-medium">Home</router-link>
          <router-link to="/about" class="text-gray-700 hover:text-primary transition-colors font-medium" active-class="text-primary font-medium">About</router-link>
          <router-link to="/services" class="text-gray-700 hover:text-primary transition-colors font-medium" active-class="text-primary font-medium">Services</router-link>
          <router-link to="/pricing" class="text-gray-700 hover:text-primary transition-colors font-medium" active-class="text-primary font-medium">Pricing</router-link>
          <router-link to="/contact" class="text-gray-700 hover:text-primary transition-colors font-medium" active-class="text-primary font-medium">Contact</router-link>
        </div>

        <!-- CTA Button -->
        <div class="hidden md:flex items-center">
          <button
            class="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors">
            Book a Demo
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-gray-600 hover:text-primary transition-colors">
            <MenuIcon v-if="!mobileMenuOpen" class="w-6 h-6" />
            <XIcon v-else class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t border-gray-100 bg-white">
        <div class="flex flex-col space-y-4">
          <router-link to="/" class="text-gray-700 hover:text-primary transition-colors font-medium" active-class="text-primary font-medium">Home</router-link>
          <router-link to="/about" class="text-gray-700 hover:text-primary transition-colors font-medium" active-class="text-primary font-medium">About</router-link>
          <router-link to="/services" class="text-gray-700 hover:text-primary transition-colors font-medium" active-class="text-primary font-medium">Services</router-link>
          <router-link to="/pricing" class="text-gray-700 hover:text-primary transition-colors font-medium" active-class="text-primary font-medium">Pricing</router-link>
          <router-link to="/contact" class="text-gray-700 hover:text-primary transition-colors font-medium" active-class="text-primary font-medium">Contact</router-link>
          <div class="pt-4 border-t border-gray-100">
            <button
              class="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors w-full">
              Book a Demo
            </button>
          </div>
        </div>
      </div>
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
  components: {
    MenuIcon: {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      `
    },
    XIcon: {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      `
    }
  }
}
</script>