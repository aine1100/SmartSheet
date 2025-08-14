<template>
  <section class="py-24 bg-white overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Hear from Our Happy
          <br>
          Customers
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          See how we've helped businesses like yours succeed through our clients' experiences.
        </p>
      </div>

      <!-- Moving Testimonials Container with proper overflow containment -->
      <div class="relative h-[600px] overflow-hidden">
        <!-- First Column - Moving Up -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
          <div class="space-y-8 overflow-hidden">
            <div class="animate-scroll-up">
              <div v-for="(testimonial, index) in firstColumn" :key="`first-${index}`" 
                   class="bg-gray-50 rounded-2xl p-8 shadow-sm border border-gray-100 mb-8 flex-shrink-0">
                <!-- Star Rating -->
                <div class="flex items-center mb-6">
                  <div class="flex space-x-1">
                    <svg v-for="star in 5" :key="star" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </div>
                </div>

                <!-- Testimonial Text -->
                <blockquote class="text-gray-700 mb-6 leading-relaxed">
                  "{{ testimonial.content }}"
                </blockquote>

                <!-- Author Info -->
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4">
                    <span class="text-white font-semibold text-lg">{{ testimonial.initials }}</span>
                  </div>
                  <div>
                    <div class="font-semibold text-gray-900">{{ testimonial.name }}</div>
                    <div class="text-gray-500 text-sm">{{ testimonial.company }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Second Column - Moving Down -->
          <div class="space-y-8 overflow-hidden">
            <div class="animate-scroll-down">
              <div v-for="(testimonial, index) in secondColumn" :key="`second-${index}`" 
                   class="bg-gray-50 rounded-2xl p-8 shadow-sm border border-gray-100 mb-8 flex-shrink-0">
                <!-- Star Rating -->
                <div class="flex items-center mb-6">
                  <div class="flex space-x-1">
                    <svg v-for="star in 5" :key="star" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </div>
                </div>

                <!-- Testimonial Text -->
                <blockquote class="text-gray-700 mb-6 leading-relaxed">
                  "{{ testimonial.content }}"
                </blockquote>

                <!-- Author Info -->
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mr-4">
                    <span class="text-white font-semibold text-lg">{{ testimonial.initials }}</span>
                  </div>
                  <div>
                    <div class="font-semibold text-gray-900">{{ testimonial.name }}</div>
                    <div class="text-gray-500 text-sm">{{ testimonial.company }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Third Column - Moving Up -->
          <div class="space-y-8 overflow-hidden">
            <div class="animate-scroll-up-slow">
              <div v-for="(testimonial, index) in thirdColumn" :key="`third-${index}`" 
                   class="bg-gray-50 rounded-2xl p-8 shadow-sm border border-gray-100 mb-8 flex-shrink-0">
                <!-- Star Rating -->
                <div class="flex items-center mb-6">
                  <div class="flex space-x-1">
                    <svg v-for="star in 5" :key="star" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </div>
                </div>

                <!-- Testimonial Text -->
                <blockquote class="text-gray-700 mb-6 leading-relaxed">
                  "{{ testimonial.content }}"
                </blockquote>

                <!-- Author Info -->
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                    <span class="text-white font-semibold text-lg">{{ testimonial.initials }}</span>
                  </div>
                  <div>
                    <div class="font-semibold text-gray-900">{{ testimonial.name }}</div>
                    <div class="text-gray-500 text-sm">{{ testimonial.company }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Gradient overlays for smooth fade effect -->
        <div class="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent pointer-events-none z-10"></div>
        <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none z-10"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TestimonialsSection',
  data() {
    return {
      testimonials: [
        {
          content: "This tool has completely transformed how I analyze and share data. The AI-powered features make everything effortless!",
          name: "James Thompson",
          company: "DataCorp",
          initials: "JT"
        },
        {
          content: "I love how intuitive and seamless this spreadsheet tool is! The auto-backup feature saved me from losing an important project, and the cloud storage makes it easy to access my data anytime, anywhere. Highly recommended for freelancers like me!",
          name: "Emily Kensington",
          company: "FreelanceHub",
          initials: "EK"
        },
        {
          content: "SmartSheet truly understands what makes customers happy. The product I received exceeded my expectations. I am very impressed with the attention to detail and durability of the features.",
          name: "Amanda Wilson",
          company: "TechSolutions",
          initials: "AW"
        },
        {
          content: "Super easy to use and incredibly powerful. The AI analysis quality is a game-changer for my data workflows, making every detail crystal clear. I also love the automated insights feature, which helps me stay organized without missing anything important!",
          name: "Sophia Reynolds",
          company: "Analytics Pro",
          initials: "SR"
        },
        {
          content: "I've tried many spreadsheet tools, but this one truly stands out. The ability to schedule data updates and remove manual work automatically has been a lifesaver. It's an essential tool for anyone who creates professional reports.",
          name: "Michael Stevenson",
          company: "ReportMaster",
          initials: "MS"
        },
        {
          content: "I have been a loyal customer for over two years now, and the service quality continues to impress me. The AI insights and automated workflows have streamlined our entire data process.",
          name: "Samantha Taylor",
          company: "DataFlow Inc",
          initials: "ST"
        },
        {
          content: "The natural language processing feature is incredible. I can just ask questions about my data in plain English and get instant insights. It's like having a data analyst on demand!",
          name: "Robert Chen",
          company: "InsightTech",
          initials: "RC"
        },
        {
          content: "SmartSheet has revolutionized our team's productivity. The collaboration features are seamless, and the AI-powered automation saves us hours every week.",
          name: "Lisa Martinez",
          company: "ProductiveCorp",
          initials: "LM"
        },
        {
          content: "The integration capabilities are outstanding. We've connected all our tools and now have a unified data ecosystem that works perfectly together.",
          name: "David Kumar",
          company: "IntegrateNow",
          initials: "DK"
        }
      ]
    }
  },
  computed: {
    firstColumn() {
      return [...this.testimonials.slice(0, 3), ...this.testimonials.slice(0, 3)]
    },
    secondColumn() {
      return [...this.testimonials.slice(3, 6), ...this.testimonials.slice(3, 6)]
    },
    thirdColumn() {
      return [...this.testimonials.slice(6, 9), ...this.testimonials.slice(6, 9)]
    }
  }
}
</script>

<style scoped>
@keyframes scroll-up {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
}

@keyframes scroll-down {
  0% {
    transform: translateY(-50%);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes scroll-up-slow {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
}

.animate-scroll-up {
  animation: scroll-up 30s linear infinite;
}

.animate-scroll-down {
  animation: scroll-down 30s linear infinite;
}

.animate-scroll-up-slow {
  animation: scroll-up-slow 35s linear infinite;
}

/* Pause animations on hover for better user experience */
.animate-scroll-up:hover,
.animate-scroll-down:hover,
.animate-scroll-up-slow:hover {
  animation-play-state: paused;
}
</style>