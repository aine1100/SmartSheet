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
            <button @click="loadSpreadsheet" class="text-gray-600 hover:text-gray-900 px-3 py-1 text-sm">Load</button>
            <button @click="saveSpreadsheet"
              class="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700">
              Save
            </button>
          </div>
        </div>

        <!-- Ribbon Toolbar -->
        <div class="px-4 py-2">
          <div class="flex items-center space-x-6">
            <!-- File Operations -->
            <div class="flex items-center space-x-2">
              <button @click="undo" class="p-2 hover:bg-gray-100 rounded" title="Undo">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
              </button>
              <button @click="redo" class="p-2 hover:bg-gray-100 rounded" title="Redo">
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
              <button @click="toggleBold" :class="[
                'p-2 hover:bg-gray-100 rounded font-bold text-sm',
                isBold ? 'bg-green-100 text-green-700' : ''
              ]" title="Bold">B</button>
              <button @click="toggleItalic" :class="[
                'p-2 hover:bg-gray-100 rounded italic text-sm',
                isItalic ? 'bg-green-100 text-green-700' : ''
              ]" title="Italic">I</button>
              <button @click="toggleUnderline" :class="[
                'p-2 hover:bg-gray-100 rounded underline text-sm',
                isUnderline ? 'bg-green-100 text-green-700' : ''
              ]" title="Underline">U</button>
            </div>

            <div class="w-px h-6 bg-gray-300"></div>

            <!-- Alignment -->
            <div class="flex items-center space-x-1">
              <button @click="setAlignment('left')" :class="[
                'p-2 hover:bg-gray-100 rounded',
                currentAlignment === 'left' ? 'bg-green-100 text-green-700' : ''
              ]" title="Align Left">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </button>
              <button @click="setAlignment('center')" :class="[
                'p-2 hover:bg-gray-100 rounded',
                currentAlignment === 'center' ? 'bg-green-100 text-green-700' : ''
              ]" title="Align Center">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <button @click="setAlignment('right')" :class="[
                'p-2 hover:bg-gray-100 rounded',
                currentAlignment === 'right' ? 'bg-green-100 text-green-700' : ''
              ]" title="Align Right">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M12 12h8M4 18h16" />
                </svg>
              </button>
            </div>

            <div class="w-px h-6 bg-gray-300"></div>

            <!-- Row/Column Operations -->
            <div class="flex items-center space-x-2">
              <button @click="insertRow"
                class="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-green-200">
                + Row
              </button>
              <button @click="insertColumn"
                class="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-green-200">
                + Column
              </button>
              <button @click="deleteRow"
                class="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-red-200">
                - Row
              </button>
              <button @click="deleteColumn"
                class="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-red-200">
                - Column
              </button>
            </div>

            <div class="w-px h-6 bg-gray-300"></div>

            <!-- AI Assistant -->
            <div class="flex items-center space-x-2">
              <button @click="toggleAIChat" :class="[
                'px-3 py-1 rounded-lg text-sm font-medium transition-colors',
                showAIChat ? 'bg-green-600 text-white' : 'bg-green-100 text-green-700 hover:bg-green-200'
              ]">
                🤖 AI Assistant
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
          <div v-for="row in visibleRows" :key="row" @click="selectRow(row)" :class="[
            'h-8 border-b border-gray-200 flex items-center justify-center text-xs text-gray-600 font-medium cursor-pointer hover:bg-green-100',
            selectedRow === row ? 'bg-green-200' : ''
          ]">
            {{ row }}
          </div>
        </div>

        <!-- Main Grid Area -->
        <div class="flex-1 overflow-auto">
          <!-- Column Headers -->
          <div class="flex bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
            <div v-for="col in visibleColumns" :key="col" @click="selectColumn(col)" :class="[
              'w-24 h-8 border-r border-gray-200 flex items-center justify-center text-xs text-gray-600 font-medium cursor-pointer hover:bg-green-100',
              selectedColumn === col ? 'bg-green-200' : ''
            ]">
              {{ col }}
            </div>
          </div>

          <!-- Data Rows -->
          <div v-for="row in visibleRows" :key="row" class="flex">
            <div v-for="col in visibleColumns" :key="`${col}${row}`" :class="[
              'w-24 h-8 border-r border-b border-gray-200 relative',
              selectedCell === `${col}${row}` ? 'ring-2 ring-green-500 bg-green-50' : 'hover:bg-gray-50'
            ]" @click="selectCell(`${col}${row}`)">
              <input v-if="selectedCell === `${col}${row}`" v-model="cellData[`${col}${row}`].value"
                @blur="finishEditing" @keyup.enter="finishEditing" @keydown="handleKeyDown"
                :style="getCellStyle(`${col}${row}`)"
                class="w-full h-full px-2 text-xs border-none focus:outline-none bg-transparent" ref="cellInput">
              <div v-else :style="getCellStyle(`${col}${row}`)" class="w-full h-full px-2 flex items-center text-xs">
                {{ getDisplayValue(`${col}${row}`) }}
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
              class="w-full px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter formula or value...">
          </div>
          <button @click="applyFormula"
            class="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">Apply</button>
        </div>
      </div>
    </div>

    <!-- Compact AI Chat Panel -->
    <div v-if="showAIChat"
      class="fixed bottom-4 right-4 w-80 h-96 bg-white border border-gray-200 rounded-lg shadow-lg flex flex-col z-50">
      <!-- Chat Header -->
      <div class="p-3 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <div class="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
              <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h3 class="text-sm font-semibold text-gray-900">AI Assistant</h3>
              <p class="text-xs text-gray-500">Ask me about your spreadsheet</p>
            </div>
          </div>
          <button @click="showAIChat = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="p-2 border-b border-gray-100">
        <div class="grid grid-cols-2 gap-1">
          <button @click="sendQuickMessage('Analyze my data')"
            class="p-1.5 text-xs bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors">
            📊 Analyze
          </button>
          <button @click="sendQuickMessage('Create formulas')"
            class="p-1.5 text-xs bg-green-50 text-green-700 rounded hover:bg-green-100 transition-colors">
            🧮 Formulas
          </button>
          <button @click="sendQuickMessage('Generate chart')"
            class="p-1.5 text-xs bg-orange-50 text-orange-700 rounded hover:bg-orange-100 transition-colors">
            📈 Chart
          </button>
          <button @click="sendQuickMessage('Clean data')"
            class="p-1.5 text-xs bg-purple-50 text-purple-700 rounded hover:bg-purple-100 transition-colors">
            🧹 Clean
          </button>
        </div>
      </div>

      <!-- Chat Messages -->
      <div class="flex-1 overflow-y-auto p-3 space-y-2">
        <div v-for="message in chatMessages" :key="message.id" :class="[
          'flex',
          message.sender === 'user' ? 'justify-end' : 'justify-start'
        ]">
          <div :class="[
            'max-w-xs px-3 py-2 rounded-lg',
            message.sender === 'user'
              ? 'bg-green-600 text-primary-light'
              : 'bg-gray-100 text-gray-900'
          ]">
            <p class="text-xs">{{ message.text }}</p>
            <p class="text-xs mt-1 opacity-70">{{ message.time }}</p>
          </div>
        </div>

        <!-- AI Typing Indicator -->
        <div v-if="aiTyping" class="flex justify-start">
          <div class="bg-gray-100 text-gray-900 px-3 py-2 rounded-lg">
            <div class="flex space-x-1">
              <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
              <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
              <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Chat Input -->
      <div class="p-3 border-t border-gray-200">
        <div class="flex space-x-2">
          <input v-model="currentMessage" @keyup.enter="sendMessage" placeholder="Ask AI about your spreadsheet..."
            class="flex-1 px-2 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-xs" />
          <button @click="sendMessage" :disabled="!currentMessage.trim()"
            class="px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      selectedRow: null,
      selectedColumn: null,
      cellData: {},
      formulaBarValue: '',
      showAIChat: false,
      currentMessage: '',
      aiTyping: false,
      selectedFont: 'arial',
      selectedFontSize: '11',
      // Formatting states
      isBold: false,
      isItalic: false,
      isUnderline: false,
      currentAlignment: 'left',
      // History for undo/redo
      history: [],
      historyIndex: -1,
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
          text: 'Hello! I\'m your sistant. I can help you analyze data, create formulas, generate charts, and more. What would you like to do?',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ],
      visibleRows: Array.from({ length: 50 }, (_, i) => i + 1),
      visibleColumns: Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))
    }
  },
  mounted() {
    // Load existing spreadsheet or initialize new one
    this.loadSpreadsheetData()

    // Set spreadsheet name based on route
    if (this.$route.params.id && this.$route.params.id !== 'new') {
      this.spreadsheetName = `Spreadsheet ${this.$route.params.id}`
    }

    // Set name from query if available
    if (this.$route.query.name) {
      this.spreadsheetName = this.$route.query.name
    }

    // Save initial state to history
    this.saveToHistory()
  },
  methods: {
    goBack() {
      this.$router.push('/dashboard/spreadsheets')
    },

    // Cell Management
    selectCell(cellId) {
      this.selectedCell = cellId
      this.selectedRow = null
      this.selectedColumn = null

      // Initialize cell if it doesn't exist
      if (!this.cellData[cellId]) {
        this.$set(this.cellData, cellId, {
          value: '',
          formula: '',
          style: {
            fontWeight: 'normal',
            fontStyle: 'normal',
            textDecoration: 'none',
            textAlign: 'left',
            fontFamily: 'arial',
            fontSize: '11px'
          }
        })
      }

      this.formulaBarValue = this.cellData[cellId].formula || this.cellData[cellId].value || ''
      this.updateFormattingButtons(cellId)

      this.$nextTick(() => {
        if (this.$refs.cellInput && this.$refs.cellInput[0]) {
          this.$refs.cellInput[0].focus()
        }
      })
    },

    selectRow(row) {
      this.selectedRow = row
      this.selectedCell = null
      this.selectedColumn = null
    },

    selectColumn(col) {
      this.selectedColumn = col
      this.selectedCell = null
      this.selectedRow = null
    },

    finishEditing() {
      if (this.selectedCell) {
        this.saveToHistory()
        this.selectedCell = null
        this.formulaBarValue = ''
      }
    },

    handleKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault()
        this.moveToNextCell()
      } else if (event.key === 'Escape') {
        this.selectedCell = null
        this.formulaBarValue = ''
      }
    },

    moveToNextCell() {
      if (!this.selectedCell) return

      const col = this.selectedCell.match(/[A-Z]+/)[0]
      const row = parseInt(this.selectedCell.match(/\d+/)[0])

      const colIndex = col.charCodeAt(0) - 65
      const nextColIndex = (colIndex + 1) % 26
      const nextCol = String.fromCharCode(65 + nextColIndex)
      const nextRow = nextColIndex === 0 ? row + 1 : row

      this.selectCell(`${nextCol}${nextRow}`)
    },

    applyFormula() {
      if (this.selectedCell && this.formulaBarValue !== undefined) {
        if (!this.cellData[this.selectedCell]) {
          this.$set(this.cellData, this.selectedCell, {
            value: '',
            formula: '',
            style: {
              fontWeight: 'normal',
              fontStyle: 'normal',
              textDecoration: 'none',
              textAlign: 'left',
              fontFamily: 'arial',
              fontSize: '11px'
            }
          })
        }

        if (this.formulaBarValue.startsWith('=')) {
          this.cellData[this.selectedCell].formula = this.formulaBarValue
          this.cellData[this.selectedCell].value = this.calculateFormula(this.formulaBarValue)
        } else {
          this.cellData[this.selectedCell].value = this.formulaBarValue
          this.cellData[this.selectedCell].formula = ''
        }

        this.saveToHistory()
        this.selectedCell = null
        this.formulaBarValue = ''
      }
    },

    // Formula Calculation Engine
    calculateFormula(formula) {
      try {
        // Remove the = sign
        let expression = formula.substring(1)

        // Replace cell references with values
        expression = expression.replace(/[A-Z]+\d+/g, (cellRef) => {
          const cellValue = this.cellData[cellRef]?.value || '0'
          return isNaN(cellValue) ? '0' : cellValue
        })

        // Handle basic functions
        expression = expression.replace(/SUM\(([^)]+)\)/g, (match, range) => {
          return this.calculateSum(range)
        })

        expression = expression.replace(/AVERAGE\(([^)]+)\)/g, (match, range) => {
          return this.calculateAverage(range)
        })

        // Evaluate the expression safely
        return Function('"use strict"; return (' + expression + ')')()
      } catch (error) {
        return '#ERROR'
      }
    },

    calculateSum(range) {
      // Simple implementation for ranges like A1:A5
      if (range.includes(':')) {
        const [start, end] = range.split(':')
        const values = this.getCellRange(start, end)
        return values.reduce((sum, val) => sum + (parseFloat(val) || 0), 0)
      }
      return 0
    },

    calculateAverage(range) {
      if (range.includes(':')) {
        const [start, end] = range.split(':')
        const values = this.getCellRange(start, end)
        const sum = values.reduce((sum, val) => sum + (parseFloat(val) || 0), 0)
        return values.length > 0 ? sum / values.length : 0
      }
      return 0
    },

    getCellRange(start, end) {
      const values = []
      const startCol = start.match(/[A-Z]+/)[0]
      const startRow = parseInt(start.match(/\d+/)[0])
      const endCol = end.match(/[A-Z]+/)[0]
      const endRow = parseInt(end.match(/\d+/)[0])

      for (let row = startRow; row <= endRow; row++) {
        for (let colCode = startCol.charCodeAt(0); colCode <= endCol.charCodeAt(0); colCode++) {
          const col = String.fromCharCode(colCode)
          const cellId = `${col}${row}`
          values.push(this.cellData[cellId]?.value || '0')
        }
      }

      return values
    },

    getDisplayValue(cellId) {
      const cell = this.cellData[cellId]
      if (!cell) return ''
      return cell.formula ? cell.value : cell.value
    },

    getCellStyle(cellId) {
      const cell = this.cellData[cellId]
      if (!cell || !cell.style) return {}

      return {
        fontWeight: cell.style.fontWeight || 'normal',
        fontStyle: cell.style.fontStyle || 'normal',
        textDecoration: cell.style.textDecoration || 'none',
        textAlign: cell.style.textAlign || 'left',
        fontFamily: cell.style.fontFamily || 'arial',
        fontSize: (cell.style.fontSize || '11') + 'px'
      }
    },

    // Formatting Methods
    updateFormattingButtons(cellId) {
      const cell = this.cellData[cellId]
      if (cell && cell.style) {
        this.isBold = cell.style.fontWeight === 'bold'
        this.isItalic = cell.style.fontStyle === 'italic'
        this.isUnderline = cell.style.textDecoration === 'underline'
        this.currentAlignment = cell.style.textAlign || 'left'
      } else {
        this.isBold = false
        this.isItalic = false
        this.isUnderline = false
        this.currentAlignment = 'left'
      }
    },

    toggleBold() {
      if (this.selectedCell) {
        this.ensureCellExists(this.selectedCell)
        this.isBold = !this.isBold
        this.cellData[this.selectedCell].style.fontWeight = this.isBold ? 'bold' : 'normal'
        this.saveToHistory()
      }
    },

    toggleItalic() {
      if (this.selectedCell) {
        this.ensureCellExists(this.selectedCell)
        this.isItalic = !this.isItalic
        this.cellData[this.selectedCell].style.fontStyle = this.isItalic ? 'italic' : 'normal'
        this.saveToHistory()
      }
    },

    toggleUnderline() {
      if (this.selectedCell) {
        this.ensureCellExists(this.selectedCell)
        this.isUnderline = !this.isUnderline
        this.cellData[this.selectedCell].style.textDecoration = this.isUnderline ? 'underline' : 'none'
        this.saveToHistory()
      }
    },

    setAlignment(alignment) {
      if (this.selectedCell) {
        this.ensureCellExists(this.selectedCell)
        this.currentAlignment = alignment
        this.cellData[this.selectedCell].style.textAlign = alignment
        this.saveToHistory()
      }
    },

    ensureCellExists(cellId) {
      if (!this.cellData[cellId]) {
        this.$set(this.cellData, cellId, {
          value: '',
          formula: '',
          style: {
            fontWeight: 'normal',
            fontStyle: 'normal',
            textDecoration: 'none',
            textAlign: 'left',
            fontFamily: 'arial',
            fontSize: '11px'
          }
        })
      }
    },

    // Row and Column Operations
    insertRow() {
      if (this.selectedRow) {
        const rowNum = this.selectedRow
        // Shift all rows down
        const newCellData = {}

        Object.keys(this.cellData).forEach(cellId => {
          const col = cellId.match(/[A-Z]+/)[0]
          const row = parseInt(cellId.match(/\d+/)[0])

          if (row >= rowNum) {
            const newCellId = `${col}${row + 1}`
            newCellData[newCellId] = this.cellData[cellId]
          } else {
            newCellData[cellId] = this.cellData[cellId]
          }
        })

        this.cellData = newCellData
        this.visibleRows = Array.from({ length: 51 }, (_, i) => i + 1)
        this.saveToHistory()
      }
    },

    insertColumn() {
      if (this.selectedColumn) {
        const colCode = this.selectedColumn.charCodeAt(0)
        const newCellData = {}

        Object.keys(this.cellData).forEach(cellId => {
          const col = cellId.match(/[A-Z]+/)[0]
          const row = cellId.match(/\d+/)[0]
          const currentColCode = col.charCodeAt(0)

          if (currentColCode >= colCode) {
            const newCol = String.fromCharCode(currentColCode + 1)
            const newCellId = `${newCol}${row}`
            newCellData[newCellId] = this.cellData[cellId]
          } else {
            newCellData[cellId] = this.cellData[cellId]
          }
        })

        this.cellData = newCellData
        this.visibleColumns = Array.from({ length: 27 }, (_, i) => String.fromCharCode(65 + i))
        this.saveToHistory()
      }
    },

    deleteRow() {
      if (this.selectedRow) {
        const rowNum = this.selectedRow
        const newCellData = {}

        Object.keys(this.cellData).forEach(cellId => {
          const col = cellId.match(/[A-Z]+/)[0]
          const row = parseInt(cellId.match(/\d+/)[0])

          if (row === rowNum) {
            // Skip this row (delete it)
            return
          } else if (row > rowNum) {
            const newCellId = `${col}${row - 1}`
            newCellData[newCellId] = this.cellData[cellId]
          } else {
            newCellData[cellId] = this.cellData[cellId]
          }
        })

        this.cellData = newCellData
        this.saveToHistory()
      }
    },

    deleteColumn() {
      if (this.selectedColumn) {
        const colCode = this.selectedColumn.charCodeAt(0)
        const newCellData = {}

        Object.keys(this.cellData).forEach(cellId => {
          const col = cellId.match(/[A-Z]+/)[0]
          const row = cellId.match(/\d+/)[0]
          const currentColCode = col.charCodeAt(0)

          if (currentColCode === colCode) {
            // Skip this column (delete it)
            return
          } else if (currentColCode > colCode) {
            const newCol = String.fromCharCode(currentColCode - 1)
            const newCellId = `${newCol}${row}`
            newCellData[newCellId] = this.cellData[cellId]
          } else {
            newCellData[cellId] = this.cellData[cellId]
          }
        })

        this.cellData = newCellData
        this.saveToHistory()
      }
    },

    // History Management (Undo/Redo)
    saveToHistory() {
      // Remove any future history if we're not at the end
      this.history = this.history.slice(0, this.historyIndex + 1)

      // Add current state
      this.history.push(JSON.parse(JSON.stringify(this.cellData)))
      this.historyIndex++

      // Limit history size
      if (this.history.length > 50) {
        this.history.shift()
        this.historyIndex--
      }
    },

    undo() {
      if (this.historyIndex > 0) {
        this.historyIndex--
        this.cellData = JSON.parse(JSON.stringify(this.history[this.historyIndex]))
      }
    },

    redo() {
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++
        this.cellData = JSON.parse(JSON.stringify(this.history[this.historyIndex]))
      }
    },

    // Save/Load Functionality
    saveSpreadsheet() {
      const spreadsheetData = {
        name: this.spreadsheetName,
        cellData: this.cellData,
        lastModified: new Date().toISOString()
      }

      // Save to localStorage
      const spreadsheetId = this.$route.params.id || 'new'
      localStorage.setItem(`spreadsheet_${spreadsheetId}`, JSON.stringify(spreadsheetData))

      // Also save to a list of all spreadsheets
      const allSpreadsheets = JSON.parse(localStorage.getItem('all_spreadsheets') || '[]')
      const existingIndex = allSpreadsheets.findIndex(s => s.id === spreadsheetId)

      const spreadsheetInfo = {
        id: spreadsheetId,
        name: this.spreadsheetName,
        lastModified: spreadsheetData.lastModified
      }

      if (existingIndex >= 0) {
        allSpreadsheets[existingIndex] = spreadsheetInfo
      } else {
        allSpreadsheets.push(spreadsheetInfo)
      }

      localStorage.setItem('all_spreadsheets', JSON.stringify(allSpreadsheets))

      this.lastSaved = 'Saved just now'
      setTimeout(() => {
        this.lastSaved = 'All changes saved'
      }, 2000)
    },

    loadSpreadsheet() {
      const spreadsheetId = this.$route.params.id
      if (spreadsheetId && spreadsheetId !== 'new') {
        const savedData = localStorage.getItem(`spreadsheet_${spreadsheetId}`)
        if (savedData) {
          const spreadsheetData = JSON.parse(savedData)
          this.cellData = spreadsheetData.cellData || {}
          this.spreadsheetName = spreadsheetData.name || 'Untitled Spreadsheet'
          this.saveToHistory()
        }
      }
    },

    loadSpreadsheetData() {
      // Check if we have uploaded file data
      const uploadedData = this.$route.query.data
      if (uploadedData) {
        try {
          const parsedData = JSON.parse(decodeURIComponent(uploadedData))
          // Convert simple data to our cell format
          Object.keys(parsedData).forEach(cellId => {
            if (typeof parsedData[cellId] === 'string' || typeof parsedData[cellId] === 'number') {
              this.cellData[cellId] = {
                value: parsedData[cellId].toString(),
                formula: '',
                style: {
                  fontWeight: 'normal',
                  fontStyle: 'normal',
                  textDecoration: 'none',
                  textAlign: 'left',
                  fontFamily: 'arial',
                  fontSize: '11px'
                }
              }
            } else {
              this.cellData[cellId] = parsedData[cellId]
            }
          })
        } catch (e) {
          console.error('Error parsing uploaded data:', e)
          this.initializeSampleData()
        }
      } else {
        // Try to load existing spreadsheet
        this.loadSpreadsheet()

        // If no data loaded, initialize sample data
        if (Object.keys(this.cellData).length === 0) {
          this.initializeSampleData()
        }
      }
    },
    toggleAIChat() {
      this.showAIChat = !this.showAIChat
      if (this.showAIChat && this.chatMessages.length === 1) {
        // Add a welcome message with current context
        const currentData = this.getCurrentDataSummary()
        this.chatMessages.push({
          id: Date.now(),
          sender: 'ai',
          text: `Hi! I can see you have ${currentData.cellCount} cells with data. ${currentData.summary} How can I help you with your spreadsheet today?`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        })
      }
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
      const currentData = this.getCurrentDataSummary()

      if (lowerPrompt.includes('analyze') || lowerPrompt.includes('data')) {
        return {
          text: `I can see you have ${currentData.cellCount} cells with data. ${currentData.summary} Would you like me to create summary statistics, formulas, or visualizations?`,
          action: null
        }
      } else if (lowerPrompt.includes('budget')) {
        return {
          text: 'I\'ll create a budget template for you with categories, budgeted amounts, actual amounts, and differences.',
          action: 'create_budget'
        }
      } else if (lowerPrompt.includes('formula') || lowerPrompt.includes('calculate')) {
        return {
          text: 'I can help you create formulas! Try typing =SUM(A1:A5) for sums, =AVERAGE(B1:B5) for averages, or ask me for specific calculations.',
          action: null
        }
      } else if (lowerPrompt.includes('chart') || lowerPrompt.includes('graph')) {
        return {
          text: `Based on your current data (${currentData.cellCount} cells), I can suggest chart types. What type of visualization would you like?`,
          action: null
        }
      } else if (lowerPrompt.includes('clean')) {
        return {
          text: 'I can help clean your data by removing duplicates, fixing formatting, or standardizing values. What specific cleaning do you need?',
          action: null
        }
      } else if (lowerPrompt.includes('sum') || lowerPrompt.includes('total')) {
        return {
          text: 'To create a sum formula, select a cell and type =SUM(range). For example: =SUM(A1:A10) adds all values in cells A1 through A10.',
          action: null
        }
      } else if (lowerPrompt.includes('average') || lowerPrompt.includes('mean')) {
        return {
          text: 'To calculate an average, use =AVERAGE(range). For example: =AVERAGE(B1:B5) calculates the mean of cells B1 through B5.',
          action: null
        }
      } else {
        return {
          text: 'I can help you with formulas (SUM, AVERAGE), data analysis, formatting, charts, and more. What would you like to do with your spreadsheet?',
          action: null
        }
      }
    },

    getCurrentDataSummary() {
      const cellCount = Object.keys(this.cellData).length
      const hasNumbers = Object.values(this.cellData).some(cell =>
        cell && cell.value && !isNaN(parseFloat(cell.value))
      )
      const hasText = Object.values(this.cellData).some(cell =>
        cell && cell.value && isNaN(parseFloat(cell.value))
      )

      let summary = ''
      if (hasNumbers && hasText) {
        summary = 'I see both text and numeric data.'
      } else if (hasNumbers) {
        summary = 'I see numeric data that could be calculated.'
      } else if (hasText) {
        summary = 'I see text data that could be organized.'
      } else {
        summary = 'Your spreadsheet is ready for data entry.'
      }

      return { cellCount, summary }
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
      // Initialize with some sample data in the new format
      this.cellData = {
        'A1': {
          value: 'Name',
          formula: '',
          style: {
            fontWeight: 'bold',
            fontStyle: 'normal',
            textDecoration: 'none',
            textAlign: 'left',
            fontFamily: 'arial',
            fontSize: '11px'
          }
        },
        'B1': {
          value: 'Age',
          formula: '',
          style: {
            fontWeight: 'bold',
            fontStyle: 'normal',
            textDecoration: 'none',
            textAlign: 'left',
            fontFamily: 'arial',
            fontSize: '11px'
          }
        },
        'C1': {
          value: 'City',
          formula: '',
          style: {
            fontWeight: 'bold',
            fontStyle: 'normal',
            textDecoration: 'none',
            textAlign: 'left',
            fontFamily: 'arial',
            fontSize: '11px'
          }
        },
        'A2': {
          value: 'John Doe',
          formula: '',
          style: {
            fontWeight: 'normal',
            fontStyle: 'normal',
            textDecoration: 'none',
            textAlign: 'left',
            fontFamily: 'arial',
            fontSize: '11px'
          }
        },
        'B2': {
          value: '25',
          formula: '',
          style: {
            fontWeight: 'normal',
            fontStyle: 'normal',
            textDecoration: 'none',
            textAlign: 'left',
            fontFamily: 'arial',
            fontSize: '11px'
          }
        },
        'C2': {
          value: 'New York',
          formula: '',
          style: {
            fontWeight: 'normal',
            fontStyle: 'normal',
            textDecoration: 'none',
            textAlign: 'left',
            fontFamily: 'arial',
            fontSize: '11px'
          }
        },
        'A3': {
          value: 'Jane Smith',
          formula: '',
          style: {
            fontWeight: 'normal',
            fontStyle: 'normal',
            textDecoration: 'none',
            textAlign: 'left',
            fontFamily: 'arial',
            fontSize: '11px'
          }
        },
        'B3': {
          value: '30',
          formula: '',
          style: {
            fontWeight: 'normal',
            fontStyle: 'normal',
            textDecoration: 'none',
            textAlign: 'left',
            fontFamily: 'arial',
            fontSize: '11px'
          }
        },
        'C3': {
          value: 'Los Angeles',
          formula: '',
          style: {
            fontWeight: 'normal',
            fontStyle: 'normal',
            textDecoration: 'none',
            textAlign: 'left',
            fontFamily: 'arial',
            fontSize: '11px'
          }
        }
      }
    }
  }
}
</script>