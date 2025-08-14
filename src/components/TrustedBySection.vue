<template>
  <section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <p class="text-gray-500 text-sm font-medium uppercase tracking-wider">Trusted by thousands of teams</p>
      </div>
      
      <div class="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
        <div v-for="(logo, index) in logos" :key="index" class="flex justify-center">
          <div class="h-8 flex items-center">
            <span class="text-gray-400 font-semibold text-lg">{{ logo }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TrustedBySection',
  data() {
    return {
      logos: ['Microsoft', 'Google', 'Salesforce', 'Slack', 'Notion', 'Airtable', 'Zapier', 'HubSpot']
    }
  }
}
</script>