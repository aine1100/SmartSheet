<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Settings</h1>
      <p class="text-gray-600">Manage your account preferences and application settings</p>
    </div>

    <!-- Settings Navigation -->
    <div class="bg-white rounded-lg shadow">
      <div class="border-b border-gray-200">
        <nav class="flex space-x-8 px-6" aria-label="Tabs">
          <button v-for="tab in tabs" :key="tab.id"
                  @click="activeTab = tab.id"
                  :class="activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
                  class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- Profile Settings -->
      <div v-if="activeTab === 'profile'" class="p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
        <form @submit.prevent="saveProfile" class="space-y-6">
          <div class="flex items-center space-x-6">
            <div class="shrink-0">
              <div class="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center">
                <span class="text-green-700 font-medium text-2xl">{{ userInitials }}</span>
              </div>
            </div>
            <div>
              <button type="button" class="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Change Photo
              </button>
              <p class="text-sm text-gray-500 mt-1">JPG, GIF or PNG. 1MB max.</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input v-model="profile.firstName" type="text" 
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input v-model="profile.lastName" type="text" 
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input v-model="profile.email" type="email" 
                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
            <input v-model="profile.jobTitle" type="text" 
                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Company</label>
            <input v-model="profile.company" type="text" 
                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
          </div>

          <div class="flex justify-end">
            <button type="submit" class="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors">
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <!-- Preferences -->
      <div v-if="activeTab === 'preferences'" class="p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Application Preferences</h3>
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select v-model="preferences.language" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
            <select v-model="preferences.timezone" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="UTC">UTC</option>
              <option value="EST">Eastern Time</option>
              <option value="PST">Pacific Time</option>
              <option value="GMT">Greenwich Mean Time</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
            <select v-model="preferences.dateFormat" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>

          <div class="space-y-4">
            <h4 class="font-medium text-gray-900">Display Options</h4>
            <div class="space-y-3">
              <label class="flex items-center">
                <input v-model="preferences.darkMode" type="checkbox" class="rounded border-gray-300 text-primary focus:ring-primary">
                <span class="ml-2 text-sm text-gray-700">Enable dark mode</span>
              </label>
              <label class="flex items-center">
                <input v-model="preferences.compactView" type="checkbox" class="rounded border-gray-300 text-primary focus:ring-primary">
                <span class="ml-2 text-sm text-gray-700">Use compact view</span>
              </label>
              <label class="flex items-center">
                <input v-model="preferences.showGridLines" type="checkbox" class="rounded border-gray-300 text-primary focus:ring-primary">
                <span class="ml-2 text-sm text-gray-700">Show grid lines by default</span>
              </label>
            </div>
          </div>

          <div class="flex justify-end">
            <button @click="savePreferences" class="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors">
              Save Preferences
            </button>
          </div>
        </div>
      </div>

      <!-- Notifications -->
      <div v-if="activeTab === 'notifications'" class="p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Notification Settings</h3>
        <div class="space-y-6">
          <div>
            <h4 class="font-medium text-gray-900 mb-3">Email Notifications</h4>
            <div class="space-y-3">
              <label class="flex items-center justify-between">
                <span class="text-sm text-gray-700">Spreadsheet updates</span>
                <input v-model="notifications.spreadsheetUpdates" type="checkbox" class="rounded border-gray-300 text-primary focus:ring-primary">
              </label>
              <label class="flex items-center justify-between">
                <span class="text-sm text-gray-700">AI analysis completed</span>
                <input v-model="notifications.aiAnalysis" type="checkbox" class="rounded border-gray-300 text-primary focus:ring-primary">
              </label>
              <label class="flex items-center justify-between">
                <span class="text-sm text-gray-700">Collaboration invites</span>
                <input v-model="notifications.collaboration" type="checkbox" class="rounded border-gray-300 text-primary focus:ring-primary">
              </label>
              <label class="flex items-center justify-between">
                <span class="text-sm text-gray-700">Weekly summary</span>
                <input v-model="notifications.weeklySummary" type="checkbox" class="rounded border-gray-300 text-primary focus:ring-primary">
              </label>
            </div>
          </div>

          <div>
            <h4 class="font-medium text-gray-900 mb-3">Push Notifications</h4>
            <div class="space-y-3">
              <label class="flex items-center justify-between">
                <span class="text-sm text-gray-700">Real-time updates</span>
                <input v-model="notifications.realTimeUpdates" type="checkbox" class="rounded border-gray-300 text-primary focus:ring-primary">
              </label>
              <label class="flex items-center justify-between">
                <span class="text-sm text-gray-700">Error alerts</span>
                <input v-model="notifications.errorAlerts" type="checkbox" class="rounded border-gray-300 text-primary focus:ring-primary">
              </label>
            </div>
          </div>

          <div class="flex justify-end">
            <button @click="saveNotifications" class="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors">
              Save Notifications
            </button>
          </div>
        </div>
      </div>

      <!-- Security -->
      <div v-if="activeTab === 'security'" class="p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Security Settings</h3>
        <div class="space-y-6">
          <div>
            <h4 class="font-medium text-gray-900 mb-3">Change Password</h4>
            <form @submit.prevent="changePassword" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <input v-model="security.currentPassword" type="password" 
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input v-model="security.newPassword" type="password" 
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <input v-model="security.confirmPassword" type="password" 
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              </div>
              <button type="submit" class="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors">
                Update Password
              </button>
            </form>
          </div>

          <div>
            <h4 class="font-medium text-gray-900 mb-3">Two-Factor Authentication</h4>
            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p class="text-sm font-medium text-gray-900">Enable 2FA</p>
                <p class="text-sm text-gray-500">Add an extra layer of security to your account</p>
              </div>
              <button class="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors">
                Enable
              </button>
            </div>
          </div>

          <div>
            <h4 class="font-medium text-gray-900 mb-3">Active Sessions</h4>
            <div class="space-y-3">
              <div v-for="session in activeSessions" :key="session.id" 
                   class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ session.device }}</p>
                  <p class="text-sm text-gray-500">{{ session.location }} • {{ session.lastActive }}</p>
                </div>
                <button v-if="!session.current" class="text-red-600 hover:text-red-900 text-sm font-medium">
                  Revoke
                </button>
                <span v-else class="text-green-600 text-sm font-medium">Current</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  data() {
    return {
      activeTab: 'profile',
      tabs: [
        { id: 'profile', name: 'Profile' },
        { id: 'preferences', name: 'Preferences' },
        { id: 'notifications', name: 'Notifications' },
        { id: 'security', name: 'Security' }
      ],
      profile: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        jobTitle: 'Data Analyst',
        company: 'Tech Corp'
      },
      preferences: {
        language: 'en',
        timezone: 'EST',
        dateFormat: 'MM/DD/YYYY',
        darkMode: false,
        compactView: false,
        showGridLines: true
      },
      notifications: {
        spreadsheetUpdates: true,
        aiAnalysis: true,
        collaboration: true,
        weeklySummary: false,
        realTimeUpdates: true,
        errorAlerts: true
      },
      security: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      activeSessions: [
        {
          id: 1,
          device: 'Chrome on Windows',
          location: 'New York, NY',
          lastActive: '2 minutes ago',
          current: true
        },
        {
          id: 2,
          device: 'Safari on iPhone',
          location: 'New York, NY',
          lastActive: '2 hours ago',
          current: false
        }
      ]
    }
  },
  computed: {
    userInitials() {
      return (this.profile.firstName.charAt(0) + this.profile.lastName.charAt(0)).toUpperCase()
    }
  },
  methods: {
    saveProfile() {
      console.log('Saving profile:', this.profile)
      // Handle profile save
    },
    savePreferences() {
      console.log('Saving preferences:', this.preferences)
      // Handle preferences save
    },
    saveNotifications() {
      console.log('Saving notifications:', this.notifications)
      // Handle notifications save
    },
    changePassword() {
      if (this.security.newPassword !== this.security.confirmPassword) {
        alert('Passwords do not match')
        return
      }
      console.log('Changing password')
      // Handle password change
    }
  }
}
</script>