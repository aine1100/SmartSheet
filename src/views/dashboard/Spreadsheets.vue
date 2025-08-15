<template>
    <div class="space-y-8">
        <!-- Header -->
        <div class="flex justify-between items-center">
            <div>
                <h1 class="text-3xl font-bold text-gray-900">My Spreadsheets</h1>
                <p class="text-gray-600 mt-1">Manage and organize your spreadsheet files</p>
            </div>
            <div class="flex items-center space-x-3">
                <button @click="showImportModal = true"
                    class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                    📁 Upload File
                </button>
                <button @click="createNewSpreadsheet"
                    class="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors">
                    + New Spreadsheet
                </button>
            </div>
        </div>

        <!-- Filters and Search -->
        <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <div class="flex items-center space-x-4">
                    <div class="relative">
                        <input v-model="searchQuery" type="text" placeholder="Search spreadsheets..."
                            class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 outline-none focus:ring-primary focus:border-transparent">
                        <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <CustomDropdown v-model="selectedFilter" :options="filterOptions" placeholder="Filter files"
                        class="w-40" />
                </div>
                <div class="flex items-center space-x-2">
                    <button @click="viewMode = 'grid'"
                        :class="viewMode === 'grid' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'"
                        class="p-2 rounded-lg">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                    </button>
                    <button @click="viewMode = 'list'"
                        :class="viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'"
                        class="p-2 rounded-lg">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Spreadsheets Grid -->
        <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div v-for="sheet in filteredSpreadsheets" :key="sheet.id" @click="openSpreadsheet(sheet)"
                class="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-4">
                        <div class="p-3 bg-primary/10 rounded-lg">
                            <svg class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div class="opacity-0 group-hover:opacity-100 transition-opacity">
                            <button @click.stop="showOptionsMenu(sheet.id)"
                                class="p-1 text-gray-400 hover:text-gray-600">
                                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <h3 class="font-semibold text-gray-900 mb-2 truncate">{{ sheet.name }}</h3>
                    <p class="text-sm text-gray-500 mb-4">{{ sheet.description }}</p>
                    <div class="flex items-center justify-between text-xs">
                        <span class="text-gray-400">{{ sheet.lastModified }}</span>
                        <span :class="getStatusClass(sheet.status)" class="px-2 py-1 rounded-full font-medium">
                            {{ sheet.status }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <!-- List View -->
        <div v-else class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last
                            Modified</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="sheet in filteredSpreadsheets" :key="sheet.id" @click="openSpreadsheet(sheet)"
                        class="hover:bg-gray-50 cursor-pointer">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <div class="p-2 bg-primary/10 rounded-lg mr-3">
                                    <svg class="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <div class="text-sm font-medium text-gray-900">{{ sheet.name }}</div>
                                    <div class="text-sm text-gray-500">{{ sheet.description }}</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span :class="getStatusClass(sheet.status)"
                                class="px-2 py-1 text-xs font-medium rounded-full">
                                {{ sheet.status }}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ sheet.lastModified }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ sheet.size }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button @click.stop="openSpreadsheet(sheet)"
                                class="text-primary hover:text-primary-dark mr-3">Open</button>
                            <button @click.stop="deleteSheet(sheet)"
                                class="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Import Modal -->
        <div v-if="showImportModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div class="mt-3">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Import Spreadsheet</h3>
                    <div @drop="handleDrop" @dragover.prevent @dragenter.prevent
                        class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none"
                            viewBox="0 0 48 48">
                            <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3-3m-3 3l3 3m-3-3H21"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <div class="mt-4">
                            <label for="file-upload" class="cursor-pointer">
                                <span class="mt-2 block text-sm font-medium text-gray-900">
                                    Drop files here or click to upload
                                </span>
                                <input id="file-upload" ref="fileInput" name="file-upload" type="file" class="sr-only"
                                    accept=".xlsx,.xls,.csv" multiple @change="handleFileUpload">
                            </label>
                            <p class="mt-1 text-xs text-gray-500">
                                Excel, CSV files up to 10MB
                            </p>
                        </div>
                    </div>

                    <!-- Upload Progress -->
                    <div v-if="uploadingFiles.length > 0" class="mt-4">
                        <div v-for="file in uploadingFiles" :key="file.name"
                            class="flex items-center justify-between py-2">
                            <span class="text-sm text-gray-600">{{ file.name }}</span>
                            <div class="flex items-center space-x-2">
                                <div class="w-16 bg-gray-200 rounded-full h-2">
                                    <div class="bg-primary h-2 rounded-full transition-all duration-300"
                                        :style="{ width: file.progress + '%' }"></div>
                                </div>
                                <span class="text-xs text-gray-500">{{ file.progress }}%</span>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-end space-x-3 mt-6">
                        <button @click="showImportModal = false"
                            class="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">
                            Cancel
                        </button>
                        <button @click="triggerFileUpload"
                            class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
                            Browse Files
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CustomDropdown from '../../components/CustomDropdown.vue'

export default {
    name: 'Spreadsheets',
    components: {
        CustomDropdown
    },
    data() {
        return {
            viewMode: 'grid',
            searchQuery: '',
            selectedFilter: 'all',
            showImportModal: false,
            uploadingFiles: [],
            filterOptions: [
                { value: 'all', label: 'All Files', icon: 'DocumentIcon' },
                { value: 'recent', label: 'Recent', icon: 'ClockIcon' },
                { value: 'shared', label: 'Shared', icon: 'ShareIcon' }
            ],
            spreadsheets: [
                {
                    id: 1,
                    name: 'Q4 Revenue Analysis',
                    description: 'Quarterly revenue and expense analysis',
                    lastModified: '2 hours ago',
                    status: 'Processing',
                    size: '2.4 MB'
                },
                {
                    id: 2,
                    name: 'Client Invoice Tracker',
                    description: 'Track client payments and invoices',
                    lastModified: '1 day ago',
                    status: 'Completed',
                    size: '1.8 MB'
                },
                {
                    id: 3,
                    name: 'Project Budget 2024',
                    description: 'Annual project budget planning',
                    lastModified: '3 days ago',
                    status: 'Draft',
                    size: '3.2 MB'
                },
                {
                    id: 4,
                    name: 'Expense Report March',
                    description: 'Monthly expense tracking',
                    lastModified: '1 week ago',
                    status: 'Completed',
                    size: '1.1 MB'
                }
            ]
        }
    },
    computed: {
        filteredSpreadsheets() {
            let filtered = this.spreadsheets

            if (this.searchQuery) {
                filtered = filtered.filter(sheet =>
                    sheet.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    sheet.description.toLowerCase().includes(this.searchQuery.toLowerCase())
                )
            }

            if (this.selectedFilter !== 'all') {
                switch (this.selectedFilter) {
                    case 'recent':
                        filtered = filtered.filter(sheet =>
                            sheet.lastModified.includes('hour') || sheet.lastModified.includes('day')
                        )
                        break
                    case 'shared':
                        filtered = filtered.filter(sheet => sheet.id % 2 === 0)
                        break
                }
            }

            return filtered
        }
    },
    methods: {
        createNewSpreadsheet() {
            this.$router.push('/dashboard/spreadsheet-editor/new')
        },
        openSpreadsheet(sheet) {
            let route = `/dashboard/spreadsheet-editor/${sheet.id}`

            // If we have cell data, pass it as query parameter
            if (sheet.cellData) {
                const encodedData = encodeURIComponent(JSON.stringify(sheet.cellData))
                route += `?data=${encodedData}&name=${encodeURIComponent(sheet.name)}`
            }

            this.$router.push(route)
        },
        deleteSheet(sheet) {
            if (confirm(`Are you sure you want to delete "${sheet.name}"?`)) {
                const index = this.spreadsheets.findIndex(s => s.id === sheet.id)
                if (index > -1) {
                    this.spreadsheets.splice(index, 1)
                }
            }
        },
        showOptionsMenu(sheetId) {
            console.log('Show options for sheet:', sheetId)
        },
        getStatusClass(status) {
            switch (status) {
                case 'Completed':
                    return 'bg-green-100 text-green-800'
                case 'Processing':
                    return 'bg-blue-100 text-blue-800'
                case 'Draft':
                    return 'bg-yellow-100 text-yellow-800'
                default:
                    return 'bg-gray-100 text-gray-800'
            }
        },
        triggerFileUpload() {
            this.$refs.fileInput.click()
        },
        handleFileUpload(event) {
            const files = Array.from(event.target.files)
            this.processFiles(files)
        },
        handleDrop(event) {
            event.preventDefault()
            const files = Array.from(event.dataTransfer.files)
            this.processFiles(files)
        },
        processFiles(files) {
            files.forEach(file => {
                if (this.isValidFile(file)) {
                    this.uploadFile(file)
                }
            })
        },
        isValidFile(file) {
            const validTypes = ['.xlsx', '.xls', '.csv']
            const fileExtension = '.' + file.name.split('.').pop().toLowerCase()
            return validTypes.includes(fileExtension) && file.size <= 10 * 1024 * 1024 // 10MB
        },
        uploadFile(file) {
            const uploadFile = {
                name: file.name,
                progress: 0,
                file: file
            }

            this.uploadingFiles.push(uploadFile)

            // Process file content
            this.processFileContent(file).then(cellData => {
                // Simulate upload progress
                const interval = setInterval(() => {
                    uploadFile.progress += Math.random() * 30
                    if (uploadFile.progress >= 100) {
                        uploadFile.progress = 100
                        clearInterval(interval)

                        // Add to spreadsheets list
                        setTimeout(() => {
                            const newSpreadsheet = {
                                id: Date.now() + Math.random(),
                                name: file.name.replace(/\.[^/.]+$/, ""),
                                description: `Uploaded ${file.type || 'file'}`,
                                lastModified: 'Just now',
                                status: 'Completed',
                                size: this.formatFileSize(file.size),
                                cellData: cellData
                            }

                            this.spreadsheets.unshift(newSpreadsheet)

                            // Remove from uploading files
                            const index = this.uploadingFiles.findIndex(f => f.name === file.name)
                            if (index > -1) {
                                this.uploadingFiles.splice(index, 1)
                            }

                            // Close modal and open the spreadsheet
                            if (this.uploadingFiles.length === 0) {
                                this.showImportModal = false
                                this.openSpreadsheet(newSpreadsheet)
                            }
                        }, 500)
                    }
                }, 200)
            }).catch(error => {
                console.error('Error processing file:', error)
                // Remove from uploading files on error
                const index = this.uploadingFiles.findIndex(f => f.name === file.name)
                if (index > -1) {
                    this.uploadingFiles.splice(index, 1)
                }
            })
        },
        async processFileContent(file) {
            if (file.name.toLowerCase().endsWith('.csv')) {
                const text = await this.readFileAsText(file)
                return this.parseCSV(text)
            } else {
                // For Excel files, return sample data for now
                // In a real app, you'd use a library like xlsx to parse Excel files
                return this.generateSampleData()
            }
        },
        readFileAsText(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onload = (e) => resolve(e.target.result)
                reader.onerror = (e) => reject(e)
                reader.readAsText(file)
            })
        },
        parseCSV(csvText) {
            const lines = csvText.split('\n')
            const result = {}

            lines.forEach((line, rowIndex) => {
                if (line.trim()) {
                    const cells = line.split(',')
                    cells.forEach((cell, colIndex) => {
                        const columnLetter = String.fromCharCode(65 + colIndex)
                        const cellId = `${columnLetter}${rowIndex + 1}`
                        result[cellId] = cell.trim().replace(/^"|"$/g, '') // Remove quotes
                    })
                }
            })

            return result
        },
        generateSampleData() {
            return {
                'A1': 'Product',
                'B1': 'Price',
                'C1': 'Quantity',
                'D1': 'Total',
                'A2': 'Laptop',
                'B2': '999',
                'C2': '5',
                'D2': '=B2*C2',
                'A3': 'Mouse',
                'B3': '25',
                'C3': '10',
                'D3': '=B3*C3',
                'A4': 'Keyboard',
                'B4': '75',
                'C4': '8',
                'D4': '=B4*C4'
            }
        },
        formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes'
            const k = 1024
            const sizes = ['Bytes', 'KB', 'MB', 'GB']
            const i = Math.floor(Math.log(bytes) / Math.log(k))
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
        }
    },
components: {
    DocumentIcon: {
        template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>`
    },
    ClockIcon: {
        template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
    },
    ShareIcon: {
        template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" /></svg>`
    }
}
}
</script>