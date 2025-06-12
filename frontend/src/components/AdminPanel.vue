<template>
  <div>
    <form @submit.prevent="addRoom" class="mb-4">
      <div class="mb-2">
        <input
          v-model="newRoom.name"
          class="form-control"
          placeholder="Nama Ruang"
          required
        />
      </div>
      <div class="mb-2">
        <input
          v-model.number="newRoom.capacity"
          class="form-control"
          placeholder="Kapasitas"
          type="number"
          required
        />
      </div>
      <div class="mb-2">
        <select v-model="newRoom.status" class="form-select">
          <option value="tersedia">Tersedia</option>
          <option value="dipinjam">Dipinjam</option>
        </select>
      </div>
      <button class="btn btn-primary">Tambah Ruang</button>
    </form>

    <ul class="list-group">
      <li
        v-for="room in rooms"
        :key="room.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <div>
          {{ room.name }} - Kapasitas: {{ room.capacity }} - {{ room.status }}
        </div>
        <button class="btn btn-sm btn-danger" @click="deleteRoom(room.id)">
          Hapus
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rooms: [],
      newRoom: {
        name: "",
        capacity: "",
        status: "tersedia",
      },
    };
  },
  async mounted() {
    await this.loadRooms();
  },
  methods: {
    async loadRooms() {
      const res = await fetch("https://room-booking-api.YOUR_WORKER_URL/rooms");
      this.rooms = await res.json();
    },
    async addRoom() {
      await fetch("https://room-booking-api.YOUR_WORKER_URL/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.newRoom),
      });
      this.newRoom = { name: "", capacity: "", status: "tersedia" };
      await this.loadRooms();
    },
    async deleteRoom(id) {
      await fetch(
        `https://room-booking-api.Sistem_Peminjaman_Ruang_URL/rooms/${id}`,
        { method: "DELETE" }
      );
      await this.loadRooms();
    },
  },
};
</script>
