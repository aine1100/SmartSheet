<template>
  <div class="h-screen bg-white flex">
    <!-- Main Editor Area -->
    <div class="flex-1 flex flex-col">
      <!-- Excel-like Toolbar -->
      <div class="border-b border-gray-200 bg-white">
        <!-- Top Menu Bar -->
        <div class="flex items-center justify-between px-4 py-2 border-b border-gray-100">
          <div class="flex items-center space-x-4">
            <button @click="goBack" class="text-gray-600 hover:text-gray-900">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <input v-model="spreadsheetName"
                  class="text-lg font-medium text-gray-900 bg-transparent border-none focus:outline-none focus:ring-0 p-0"
                  placeholder="Untitled Spreadsheet">
                <p class="text-xs text-gray-500">{{ lastSaved }}</p>
              </div>
            </div>
          </div>

          <div class="flex items-center space-x-3">
            <button class="text-gray-600 hover:text-gray-900 px-3 py-1 text-sm">Share</button>
            <button @click="saveSpreadsheet"
              class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
              Save
            </button>
          </div>
        </div>

        <!-- Ribbon Toolbar -->
        <div class="px-4 py-2">
          <div class="flex items-center space-x-6">
            <!-- File Operations -->
            <div class="flex items-center space-x-2">
              <button class="p-2 hover:bg-gray-100 rounded" title="Undo">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
              </button>
              <button class="p-2 hover:bg-gray-100 rounded" title="Redo">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 10h-10a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6" />
                </svg>
              </button>
            </div>

            <div class="w-px h-6 bg-gray-300"></div>

            <!-- Formatting -->
            <div class="flex items-center space-x-2">
              <CustomDropdown v-model="selectedFont" :options="fontOptions" placeholder="Font" class="w-32" />
              <CustomDropdown v-model="selectedFontSize" :options="fontSizeOptions" placeholder="Size" class="w-16" />
            </div>

            <div class="w-px h-6 bg-gray-300"></div>

            <!-- Text Formatting -->
            <div class="flex items-center space-x-1">
              <button class="p-2 hover:bg-gray-100 rounded font-bold text-sm" title="Bold">B</button>
              <button class="p-2 hover:bg-gray-100 rounded italic text-sm" title="Italic">I</button>
              <button class="p-2 hover:bg-gray-100 rounded underline text-sm" title="Underline">U</button>
            </div>

            <div class="w-px h-6 bg-gray-300"></div>

            <!-- Alignment -->
            <div class="flex items-center space-x-1">
              <button class="p-2 hover:bg-gray-100 rounded" title="Align Left">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </button>
              <button class="p-2 hover:bg-gray-100 rounded" title="Align Center">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <button class="p-2 hover:bg-gray-100 rounded" title="Align Right">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M12 12h8M4 18h16" />
                </svg>
              </button>
            </div>

            <div class="w-px h-6 bg-gray-300"></div>

            <!-- AI Features -->
            <div class="flex items-center space-x-2">
              <button @click="toggleAIChat" :class="[
                'px-3 py-1 rounded-lg text-sm font-medium transition-colors',
                showAIChat ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
              ]">
                🤖 AI Chat
              </button>
              <button @click="generateChart"
                class="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-green-200">
                📊 Auto Chart
              </button>
              <button @click="analyzeData"
                class="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-200">
                🔍 Analyze
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Spreadsheet Grid -->
      <div class="flex-1 flex">
        <!-- Row Headers -->
        <div class="w-12 bg-gray-50 border-r border-gray-200">
          <div class="h-8 border-b border-gray-200"></div>
          <div v-for="row in visibleRows" :key="row"
            class="h-8 border-b border-gray-200 flex items-center justify-center text-xs text-gray-600 font-medium">
            {{ row }}
          </div>
        </div>

        <!-- Main Grid Area -->
        <div class="flex-1 overflow-auto">
          <!-- Column Headers -->
          <div class="flex bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
            <div v-for="col in visibleColumns" :key="col"
              class="w-24 h-8 border-r border-gray-200 flex items-center justify-center text-xs text-gray-600 font-medium">
              {{ col }}
            </div>
          </div>

          <!-- Data Rows -->
          <div v-for="row in visibleRows" :key="row" class="flex">
            <div v-for="col in visibleColumns" :key="`${col}${row}`" :class="[
              'w-24 h-8 border-r border-b border-gray-200 relative',
              selectedCell === `${col}${row}` ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
            ]" @click="selectCell(`${col}${row}`)">
              <input v-if="selectedCell === `${col}${row}`" v-model="cellData[`${col}${row}`]"
                @blur="selectedCell = null" @keyup.enter="selectedCell = null"
                class="w-full h-full px-2 text-xs border-none focus:outline-none bg-transparent" ref="cellInput">
              <div v-else class="w-full h-full px-2 flex items-center text-xs">
                {{ cellData[`${col}${row}`] || '' }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Formula Bar -->
      <div class="border-t border-gray-200 bg-white p-2">
        <div class="flex items-center space-x-2">
          <div class="w-16 text-xs font-medium text-gray-600">{{ selectedCell || 'A1' }}</div>
          <div class="flex-1">
            <input v-model="formulaBarValue" @keyup.enter="applyFormula"
              class="w-full px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter formula or value...">
          </div>
          <button @click="applyFormula" class="bg-blue-600 text-white px-3 py-1 rounded text-sm">Apply</button>
        </div>
      </div>
    </div>

    <!-- AI Chat Sidebar -->
    <div v-if="showAIChat" class="w-80 border-l border-gray-200 bg-white flex flex-col">
      <!-- Chat Header -->
      <div class="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">AI Assistant</h3>
              <p class="text-xs text-gray-500">Ready to help with your spreadsheet</p>
            </div>
          </div>
          <button @click="showAIChat = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="p-3 border-b border-gray-100">
        <div class="grid grid-cols-2 gap-2">
          <button @click="sendQuickMessage('Analyze my data')"
            class="p-2 text-xs bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
            📊 Analyze Data
          </button>
          <button @click="sendQuickMessage('Create formulas')"
            class="p-2 text-xs bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
            🧮 Create Formulas
          </button>
          <button @click="sendQuickMessage('Generate chart')"
            class="p-2 text-xs bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors">
            📈 Generate Chart
          </button>
          <button @click="sendQuickMessage('Clean data')"
            class="p-2 text-xs bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
            🧹 Clean Data
          </button>
        </div>
      </div>

      <!-- Chat Messages -->
      <div class="flex-1 overflow-y-auto p-4 space-y-4">
        <div v-for="message in chatMessages" :key="message.id" :class="[
          'flex',
          message.sender === 'user' ? 'justify-end' : 'justify-start'
        ]">
          <div :class="[
            'max-w-xs lg:max-w-md px-4 py-2 rounded-lg',
            message.sender === 'user'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 text-gray-900'
          ]">
            <p class="text-sm">{{ message.text }}</p>
            <p class="text-xs mt-1 opacity-70">{{ message.time }}</p>
          </div>
        </div>

        <!-- AI Typing Indicator -->
        <div v-if="aiTyping" class="flex justify-start">
          <div class="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
            <div class="flex space-x-1">
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Chat Input -->
      <div class="p-4 border-t border-gray-200">
        <div class="flex space-x-2">
          <input v-model="currentMessage" @keyup.enter="sendMessage" placeholder="Ask AI about your spreadsheet..."
            class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm" />
          <button @click="sendMessage" :disabled="!currentMessage.trim()"
            class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomDropdown from '../../components/CustomDropdown.vue'

export default {
  name: 'SpreadsheetEditor',
  components: {
    CustomDropdown
  },
  data() {
    return {
      spreadsheetName: 'Untitled Spreadsheet',
      lastSaved: 'All changes saved',
      selectedCell: null,
      cellData: {},
      formulaBarValue: '',
      showAIChat: false,
      currentMessage: '',
      aiTyping: false,
      selectedFont: 'arial',
      selectedFontSize: '11',
      fontOptions: [
        { value: 'arial', label: 'Arial' },
        { value: 'times', label: 'Times New Roman' },
        { value: 'helvetica', label: 'Helvetica' },
        { value: 'calibri', label: 'Calibri' },
        { value: 'verdana', label: 'Verdana' }
      ],
      fontSizeOptions: [
        { value: '8', label: '8' },
        { value: '9', label: '9' },
        { value: '10', label: '10' },
        { value: '11', label: '11' },
        { value: '12', label: '12' },
        { value: '14', label: '14' },
        { value: '16', label: '16' },
        { value: '18', label: '18' },
        { value: '20', label: '20' }
      ],
      chatMessages: [
        {
          id: 1,
          sender: 'ai',
          text: 'Hello! I\'m your AI assistant. I can help you analyze data, create formulas, generate charts, and more. What would you like to do?',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ],
      visibleRows: Array.from({ length: 50 }, (_, i) => i + 1),
      visibleColumns: Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))
    }
  },
  mounted() {
    // Check if we have uploaded file data
    const uploadedData = this.$route.query.data
    if (uploadedData) {
      try {
        this.cellData = JSON.parse(decodeURIComponent(uploadedData))
      } catch (e) {
        console.error('Error parsing uploaded data:', e)
        this.initializeSampleData()
      }
    } else {
      this.initializeSampleData()
    }

    // Set spreadsheet name based on route
    if (this.$route.params.id && this.$route.params.id !== 'new') {
      this.spreadsheetName = `Spreadsheet ${this.$route.params.id}`
    }

    // Set name from query if available
    if (this.$route.query.name) {
      this.spreadsheetName = this.$route.query.name
    }
  },
  methods: {
    goBack() {
      this.$router.push('/dashboard/spreadsheets')
    },
    selectCell(cellId) {
      this.selectedCell = cellId
      this.formulaBarValue = this.cellData[cellId] || ''
      this.$nextTick(() => {
        if (this.$refs.cellInput && this.$refs.cellInput[0]) {
          this.$refs.cellInput[0].focus()
        }
      })
    },
    applyFormula() {
      if (this.selectedCell) {
        this.cellData[this.selectedCell] = this.formulaBarValue
        this.selectedCell = null
        this.formulaBarValue = ''
      }
    },
    saveSpreadsheet() {
      // Simulate saving
      this.lastSaved = 'Saved just now'
      setTimeout(() => {
        this.lastSaved = 'All changes saved'
      }, 2000)
    },
    toggleAIChat() {
      this.showAIChat = !this.showAIChat
    },
    sendMessage() {
      if (!this.currentMessage.trim()) return

      // Add user message
      const userMessage = {
        id: Date.now(),
        sender: 'user',
        text: this.currentMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      this.chatMessages.push(userMessage)

      const userPrompt = this.currentMessage
      this.currentMessage = ''

      // Show AI typing
      this.aiTyping = true

      // Simulate AI response
      setTimeout(() => {
        this.aiTyping = false
        const aiResponse = this.generateAIResponse(userPrompt)
        this.chatMessages.push({
          id: Date.now() + 1,
          sender: 'ai',
          text: aiResponse.text,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        })

        // Apply AI actions if any
        if (aiResponse.action) {
          this.executeAIAction(aiResponse.action)
        }
      }, 1500)
    },
    sendQuickMessage(message) {
      this.currentMessage = message
      this.sendMessage()
    },
    generateAIResponse(prompt) {
      const lowerPrompt = prompt.toLowerCase()

      if (lowerPrompt.includes('analyze') || lowerPrompt.includes('data')) {
        return {
          text: 'I can see you have data in columns A-C. Let me analyze it for you. I notice you have names, ages, and cities. Would you like me to create summary statistics or visualizations?',
          action: null
        }
      } else if (lowerPrompt.includes('budget')) {
        return {
          text: 'I\'ll create a budget template for you with categories, budgeted amounts, actual amounts, and differences.',
          action: 'create_budget'
        }
      } else if (lowerPrompt.includes('formula') || lowerPrompt.includes('calculate')) {
        return {
          text: 'I can help you create formulas! For example, I can add SUM, AVERAGE, or custom calculations. What specific calculation do you need?',
          action: null
        }
      } else if (lowerPrompt.includes('chart') || lowerPrompt.includes('graph')) {
        return {
          text: 'I can help you create charts from your data. Based on your current data, I could create a bar chart showing age distribution or a pie chart showing city distribution.',
          action: null
        }
      } else if (lowerPrompt.includes('clean')) {
        return {
          text: 'I can help clean your data by removing duplicates, fixing formatting, or standardizing values. What specific cleaning do you need?',
          action: null
        }
      } else {
        return {
          text: 'I can help you with data analysis, creating formulas, generating charts, cleaning data, and more. Could you be more specific about what you\'d like to do?',
          action: null
        }
      }
    },
    executeAIAction(action) {
      switch (action) {
        case 'create_budget':
          this.cellData = {
            ...this.cellData,
            'A1': 'Category',
            'B1': 'Budget',
            'C1': 'Actual',
            'D1': 'Difference',
            'A2': 'Housing',
            'B2': '2000',
            'C2': '1950',
            'D2': '=B2-C2',
            'A3': 'Food',
            'B3': '500',
            'C3': '520',
            'D3': '=B3-C3',
            'A4': 'Transportation',
            'B4': '300',
            'C4': '280',
            'D4': '=B4-C4',
            'A5': 'Entertainment',
            'B5': '200',
            'C5': '180',
            'D5': '=B5-C5'
          }
          break
      }
    },
    generateChart() {
      // Simulate chart generation
      this.sendQuickMessage('Generate a chart from my current data')
    },
    analyzeData() {
      // Simulate data analysis
      this.sendQuickMessage('Analyze my current data and provide insights')
    },
    initializeSampleData() {
      // Initialize with some sample data
      this.cellData = {
        'A1': 'Name',
        'B1': 'Age',
        'C1': 'City',
        'A2': 'John Doe',
        'B2': '25',
        'C2': 'New York',
        'A3': 'Jane Smith',
        'B3': '30',
        'C3': 'Los Angeles'
      }
    }
  }
}
</script>