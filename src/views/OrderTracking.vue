<template>
  <div class="container">
    <input
        v-model="formData.orderNumber"
        type="text"
        class="form-control"
        placeholder="Sipariş numarası..."
    />
    <button @click="trackOrder" class="btn btn-primary">SİPARİŞİ SORGULA</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        orderNumber: "",
      },
    };
  },
  methods: {
    trackOrder() {
      this.$store.dispatch("trackOrder", this.formData.orderNumber);
    },
  },
};
</script>

<style scoped>
input,
select {
  margin-top: 20px;
}
input:first-child {
  margin-top: 30px;
}
button {
  width: 100%;
  margin-top: 20px;
}
</style>