<template>
  <div class="container">
    <input
      v-model="formData.title"
      type="text"
      class="form-control"
      placeholder="Ürün başlığı..."
    />
    <input
      v-model="formData.description"
      type="text"
      class="form-control"
      placeholder="Ürün açıklaması..."
    />
    <input
      v-model="formData.imageUrl"
      type="text"
      class="form-control"
      placeholder="Resim Url..."
    />
    <input
      v-model="formData.price"
      type="number"
      class="form-control"
      placeholder="Fiyat..."
    />
    <select v-model="formData.categoryId" class="form-select">
      <option value="sec">Kategori Seçiniz</option>
      <option
        v-for="category in categories"
        :key="category.id"
        :value="category.id"
      >
        {{ category.name }}
      </option>
    </select>
    <button @click="addProduct" class="btn btn-primary">ÜRÜN EKLE</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      formData: {
        title: "",
        description: "",
        imageUrl: "",
        price: null,
        categoryId: "sec",
      },
    };
  },
  computed: {
    ...mapGetters({
      categories: "getCategories",
    }),
  },
  created() {
    this.$store.dispatch("initCategories");
  },
  methods: {
    clearForm() {
      this.formData = {
        title: "",
        description: "",
        imageUrl: "",
        price: null,
        categoryId: "sec",
      };
    },
    addProduct() {
      this.$store.dispatch("saveProduct", this.formData);
      this.clearForm();
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