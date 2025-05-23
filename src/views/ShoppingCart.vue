<template>
  <div class="container">
    <h2 v-if="carts.length === 0" class="mt-3" align="center">Sepetinizde ürün bulunmamaktadır.</h2>
    <div v-else>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Ürün Resmi</th>
            <th scope="col">Ürün Adı</th>
            <th scope="col">Adet</th>
            <th scope="col">Fiyat</th>
            <th scope="col">İşlem</th>
          </tr>
        </thead>
        <tbody>
          <cart-list
            v-for="cart in carts"
            :key="cart.id"
            :cart="cart"
          />
        </tbody>
      </table>
      <textarea v-model="address" class="form-control" aria-label="With textarea" placeholder="Adres" rows="4"></textarea>
      <div class="mt-3">
        <label class="form-label">Toplam Fiyat:</label>
        <p>{{ formattedPrice(carts.reduce((sum, product) => sum + (product.price * product.count), 0) )}}</p>
      </div>
      <card-form />
      <div class="container" style="display: flex; align-items: center;">
        <button class="btn btn-primary" style="width: 50%; margin: 30px auto;" @click="createOrder">SİPARİŞİ TAMAMLA</button>
      </div>
    </div>
  </div>
</template>

<script>
import CartList from "../components/CartList.vue";
import CardForm from '../components/CardForm.vue'

import { mapGetters } from 'vuex';
import { formattedPrice } from "@/helpers";

export default {
  components: {
    cartList: CartList,
    cardForm: CardForm,
  },
  data () {
    return {
      address: "",
    }
  },
  methods: {
    createOrder() {
      this.$store.dispatch("createOrder", this.address);
    },
    formattedPrice(price) {
      return formattedPrice(price);
    }
  },
  computed: {
    ...mapGetters({
      carts: "getShoppingCart",
    })
  },
  created() {
    this.$store.dispatch("initShoppingCart");
  },
};
</script>

<style lang="scss" scoped>
label {
  font-weight: bold;
}
</style>