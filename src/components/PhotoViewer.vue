<template>
  <div v-if="show" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
    <div class="relative w-full max-w-6xl mx-auto">
      <!-- Close button -->
      <button
        @click="$emit('close')"
        class="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
      >
        <span class="material-icons text-3xl">close</span>
      </button>

      <!-- Navigation buttons -->
      <button
        v-if="hasPrevious"
        @click="previousPhoto"
        class="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
      >
        <span class="material-icons text-4xl">chevron_left</span>
      </button>
      <button
        v-if="hasNext"
        @click="nextPhoto"
        class="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
      >
        <span class="material-icons text-4xl">chevron_right</span>
      </button>

      <!-- Photo container -->
      <div class="relative aspect-[4/3] bg-black rounded-lg overflow-hidden">
        <img
          :src="currentPhoto.url"
          class="w-full h-full object-contain"
          alt=""
        >
      </div>

      <!-- Photo info -->
      <div class="mt-4 text-white text-center">
        <p class="text-sm text-gray-400">
          {{ formatDate(currentPhoto.createdAt) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  photo: {
    type: Object,
    required: true
  },
  photos: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['close'])

const currentPhotoIndex = computed(() => 
  props.photos.findIndex(p => p.id === props.photo.id)
)

const currentPhoto = computed(() => props.photo)

const hasPrevious = computed(() => currentPhotoIndex.value > 0)
const hasNext = computed(() => currentPhotoIndex.value < props.photos.length - 1)

const previousPhoto = () => {
  if (hasPrevious.value) {
    emit('select', props.photos[currentPhotoIndex.value - 1])
  }
}

const nextPhoto = () => {
  if (hasNext.value) {
    emit('select', props.photos[currentPhotoIndex.value + 1])
  }
}

const formatDate = (timestamp) => {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  return date.toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.photo-viewer-enter-active,
.photo-viewer-leave-active {
  transition: opacity 0.3s ease;
}

.photo-viewer-enter-from,
.photo-viewer-leave-to {
  opacity: 0;
}
</style> 