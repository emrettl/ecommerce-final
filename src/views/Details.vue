<template>
  <div>
    <product-detail
      v-for="detail in details"
      :key="detail.id"
      :detail="detail"
    />
  </div>
</template>

<script>
import ProductDetail from "../components/ProductDetail.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    productDetail: ProductDetail,
  },
  created() {
    this.$store.dispatch("initProductDetail", this.productId);
  },
  computed: {
    productId() {
      return this.$route.params.id;
    },
    ...mapGetters({
      details: "getProductDetail",
    }),
  },
};
</script>

<style scoped>
</style>