<template>
  <div id="app" class="min-h-screen">
    <HeaderSection v-if="showHeaderFooter" />
    <router-view />
    <FooterSection v-if="showHeaderFooter" />
  </div>
</template>

<script>
import HeaderSection from './components/HeaderSection.vue'
import FooterSection from './components/FooterSection.vue'

export default {
  name: 'App',
  components: {
    HeaderSection,
    FooterSection
  },
  computed: {
    showHeaderFooter() {
      // Hide header and footer on login and all dashboard pages
      const currentPath = this.$route.path
      return !currentPath.startsWith('/login') && !currentPath.startsWith('/dashboard')
    }
  }
}
</script>