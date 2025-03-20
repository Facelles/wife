<template>
  <div class="space-y-8">
    <!-- Welcome Section -->
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Ласкаво просимо!</h1>
      <p class="text-lg text-gray-600">Відстежуйте ваші спільні моменти та зростайте разом 💑</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white rounded-xl shadow-sm p-6 text-center">
        <h3 class="text-sm font-medium text-gray-500 mb-2">Загальні бали</h3>
        <p class="text-3xl font-bold text-primary-600">0</p>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm p-6 text-center">
        <h3 class="text-sm font-medium text-gray-500 mb-2">Настрій сьогодні</h3>
        <p class="text-3xl">😊</p>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm p-6 text-center">
        <h3 class="text-sm font-medium text-gray-500 mb-2">Години сну</h3>
        <p class="text-3xl font-bold text-primary-600">0</p>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold text-gray-900 mb-4 text-center">Швидкі дії</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <router-link to="/points" class="flex items-center justify-center px-4 py-3 bg-white rounded-xl shadow-sm hover:bg-primary-50 transition-colors duration-200">
          <span class="material-icons text-primary-600 mr-2">add_circle</span>
          <span class="font-medium text-gray-900">Додати бали</span>
        </router-link>

        <router-link to="/mood" class="flex items-center justify-center px-4 py-3 bg-white rounded-xl shadow-sm hover:bg-primary-50 transition-colors duration-200">
          <span class="material-icons text-primary-600 mr-2">mood</span>
          <span class="font-medium text-gray-900">Записати настрій</span>
        </router-link>

        <router-link to="/sleep" class="flex items-center justify-center px-4 py-3 bg-white rounded-xl shadow-sm hover:bg-primary-50 transition-colors duration-200">
          <span class="material-icons text-primary-600 mr-2">bedtime</span>
          <span class="font-medium text-gray-900">Записати сон</span>
        </router-link>

        <router-link to="/tasks" class="flex items-center justify-center px-4 py-3 bg-white rounded-xl shadow-sm hover:bg-primary-50 transition-colors duration-200">
          <span class="material-icons text-primary-600 mr-2">assignment</span>
          <span class="font-medium text-gray-900">Додати завдання</span>
        </router-link>

        <router-link to="/chat" class="flex items-center justify-center px-4 py-3 bg-white rounded-xl shadow-sm hover:bg-primary-50 transition-colors duration-200">
          <span class="material-icons text-primary-600 mr-2">chat</span>
          <span class="font-medium text-gray-900">Надіслати повідомлення</span>
        </router-link>

        <router-link to="/stats" class="flex items-center justify-center px-4 py-3 bg-white rounded-xl shadow-sm hover:bg-primary-50 transition-colors duration-200">
          <span class="material-icons text-primary-600 mr-2">bar_chart</span>
          <span class="font-medium text-gray-900">Переглянути статистику</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// Component logic will be added here
</script> 