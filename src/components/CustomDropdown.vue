<template>
  <div class="relative" ref="dropdown">
    <button
      @click="toggleDropdown"
      :class="[
        'flex items-center justify-between w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      ]"
      :disabled="disabled"
    >
      <span class="flex items-center">
        <component v-if="selectedOption?.icon" :is="selectedOption.icon" class="w-4 h-4 mr-2 text-gray-500" />
        <span :class="selectedOption ? 'text-gray-900' : 'text-gray-500'">
          {{ selectedOption ? selectedOption.label : placeholder }}
        </span>
      </span>
      <svg
        :class="['w-4 h-4 text-gray-400 transition-transform', isOpen ? 'rotate-180' : '']"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        :class="[
          'absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto',
          dropdownPosition === 'up' ? 'bottom-full mb-1' : 'top-full'
        ]"
      >
        <!-- Search Input -->
        <div v-if="searchable" class="p-2 border-b border-gray-100">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search options..."
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            @click.stop
          />
        </div>

        <!-- Options List -->
        <div class="py-1">
          <div
            v-for="option in filteredOptions"
            :key="option.value"
            @click="selectOption(option)"
            :class="[
              'flex items-center px-4 py-2 text-sm cursor-pointer transition-colors',
              option.value === modelValue ? 'bg-primary text-white' : 'text-gray-900 hover:bg-gray-50',
              option.disabled ? 'opacity-50 cursor-not-allowed' : ''
            ]"
          >
            <component v-if="option.icon" :is="option.icon" class="w-4 h-4 mr-3" />
            <div class="flex-1">
              <div class="font-medium">{{ option.label }}</div>
              <div v-if="option.description" class="text-xs text-gray-500 mt-0.5">
                {{ option.description }}
              </div>
            </div>
            <svg
              v-if="option.value === modelValue"
              class="w-4 h-4 ml-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          
          <!-- No Results -->
          <div v-if="filteredOptions.length === 0" class="px-4 py-2 text-sm text-gray-500 text-center">
            No options found
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'CustomDropdown',
  props: {
    modelValue: {
      type: [String, Number, Object],
      default: null
    },
    options: {
      type: Array,
      required: true,
      default: () => []
    },
    placeholder: {
      type: String,
      default: 'Select an option'
    },
    searchable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    dropdownPosition: {
      type: String,
      default: 'down', // 'up' or 'down'
      validator: (value) => ['up', 'down'].includes(value)
    }
  },
  emits: ['update:modelValue', 'change'],
  data() {
    return {
      isOpen: false,
      searchQuery: ''
    }
  },
  computed: {
    selectedOption() {
      return this.options.find(option => option.value === this.modelValue)
    },
    filteredOptions() {
      if (!this.searchable || !this.searchQuery) {
        return this.options
      }
      return this.options.filter(option =>
        option.label.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        (option.description && option.description.toLowerCase().includes(this.searchQuery.toLowerCase()))
      )
    }
  },
  methods: {
    toggleDropdown() {
      if (!this.disabled) {
        this.isOpen = !this.isOpen
      }
    },
    selectOption(option) {
      if (!option.disabled) {
        this.$emit('update:modelValue', option.value)
        this.$emit('change', option)
        this.isOpen = false
        this.searchQuery = ''
      }
    },
    closeDropdown() {
      this.isOpen = false
      this.searchQuery = ''
    }
  },
  mounted() {
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.$refs.dropdown.contains(e.target)) {
        this.closeDropdown()
      }
    })
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeDropdown)
  }
}
</script>