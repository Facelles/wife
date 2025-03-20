<template>
  <div class="space-y-6">
    <!-- Welcome section -->
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Welcome to Love Tracker</h2>
        <p class="text-gray-600">Track your relationship journey, share moments, and grow together.</p>
      </div>
    </div>

    <!-- Quick stats -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <!-- Points card -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">Total Points</dt>
          <dd class="mt-1 text-3xl font-semibold text-primary-600">0</dd>
        </div>
      </div>

      <!-- Mood card -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">Today's Mood</dt>
          <dd class="mt-1 text-3xl font-semibold text-primary-600">😊</dd>
        </div>
      </div>

      <!-- Sleep card -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">Sleep Hours</dt>
          <dd class="mt-1 text-3xl font-semibold text-primary-600">0</dd>
        </div>
      </div>
    </div>

    <!-- Quick actions -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <button class="btn btn-primary">Add Points</button>
          <button class="btn btn-primary">Log Mood</button>
          <button class="btn btn-primary">Record Sleep</button>
          <button class="btn btn-primary">Add Task</button>
          <button class="btn btn-primary">Send Message</button>
          <button class="btn btn-primary">View Stats</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Component logic will be added here
</script> 