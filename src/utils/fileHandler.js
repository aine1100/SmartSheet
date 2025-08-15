// File handling utilities for spreadsheet uploads

export const SUPPORTED_FILE_TYPES = {
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
  'application/vnd.ms-excel': '.xls',
  'text/csv': '.csv'
}

export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export function validateFile(file) {
  const errors = []
  
  // Check file type
  if (!SUPPORTED_FILE_TYPES[file.type] && !file.name.match(/\.(xlsx|xls|csv)$/i)) {
    errors.push('File type not supported. Please upload Excel (.xlsx, .xls) or CSV files.')
  }
  
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    errors.push(`File size too large. Maximum size is ${formatFileSize(MAX_FILE_SIZE)}.`)
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function parseCSV(csvText) {
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
}

export function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target.result)
    reader.onerror = (e) => reject(e)
    reader.readAsText(file)
  })
}

export function generateSampleData(type = 'default') {
  switch (type) {
    case 'budget':
      return {
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
        'D4': '=B4-C4'
      }
    case 'sales':
      return {
        'A1': 'Product',
        'B1': 'Q1 Sales',
        'C1': 'Q2 Sales',
        'D1': 'Total',
        'A2': 'Product A',
        'B2': '15000',
        'C2': '18000',
        'D2': '=B2+C2',
        'A3': 'Product B',
        'B3': '12000',
        'C3': '14000',
        'D3': '=B3+C3',
        'A4': 'Product C',
        'B4': '8000',
        'C4': '9500',
        'D4': '=B4+C4'
      }
    default:
      return {
        'A1': 'Name',
        'B1': 'Age',
        'C1': 'City',
        'A2': 'John Doe',
        'B2': '25',
        'C2': 'New York',
        'A3': 'Jane Smith',
        'B3': '30',
        'C3': 'Los Angeles',
        'A4': 'Bob Johnson',
        'B4': '35',
        'C4': 'Chicago'
      }
  }
}