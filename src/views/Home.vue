<template>
  <div class="min-h-screen">
    <HeroSection />
    <TrustedBySection />
    <section id="features">
      <FeaturesSection />
    </section>
    <section id="product">
      <ProductShowcase />
    </section>
    <section id="pricing">
      <PricingSection />
    </section>
    <section id="testimonials">
      <TestimonialsSection />
    </section>
    <section id="faq">
      <FAQSection />
    </section>
    <CallToActionSection />
  </div>
</template>

<script>
import HeroSection from '../components/HeroSection.vue'
import TrustedBySection from '../components/TrustedBySection.vue'
import FeaturesSection from '../components/FeaturesSection.vue'
import ProductShowcase from '../components/ProductShowcase.vue'
import PricingSection from '../components/PricingSection.vue'
import TestimonialsSection from '../components/TestimonialsSection.vue'
import FAQSection from '../components/FAQSection.vue'
import CallToActionSection from '../components/CallToActionSection.vue'

export default {
  name: 'Home',
  components: {
    HeroSection,
    TrustedBySection,
    FeaturesSection,
    ProductShowcase,
    PricingSection,
    TestimonialsSection,
    FAQSection,
    CallToActionSection
  }
}
</script>