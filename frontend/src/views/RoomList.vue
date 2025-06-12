<template>
  <div>
    <div v-if="rooms.length === 0" class="text-muted">Memuat data ruang...</div>
    <ul class="list-group">
      <li v-for="room in rooms" :key="room.id" class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <strong>{{ room.name }}</strong><br />
          Kapasitas: {{ room.capacity }}
        </div>
        <span :class="['badge', room.status === 'tersedia' ? 'bg-success' : 'bg-danger']">
          {{ room.status }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rooms: []
    }
  },
  async mounted() {
    const res = await fetch('https://room-booking-api.YOUR_WORKER_URL/rooms')
    this.rooms = await res.json()
  }
}
</script>
