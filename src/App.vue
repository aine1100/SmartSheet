<template>
  <div id="app" class="min-h-screen">
    <HeaderSection />
    <router-view />
    <FooterSection />
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
  }
}
</script>