<template>
  <div class="container">
    <h2 v-if="orderDetail[0]?.products.length === 0" align="center">Böyle bir sipariş bulunmamaktadır.</h2>
    <table v-else class="table table-striped">
      <thead>
      <tr>
        <th scope="col">Ürün Resmi</th>
        <th scope="col">Ürün Adı</th>
        <th scope="col">Adet</th>
        <th scope="col">Fiyat</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="item in orderDetail[0].products" :key="item.id">
          <td>
            <img :src="item.imageUrl" :alt="item.title" width="150" height="150" />
          </td>
          <td>{{ item.title }}</td>
          <td>{{ item.count }}</td>
          <td>{{ formattedPrice(item.price * item.count) }}</td>
        </tr>
      </tbody>
    </table>
    <div>
      <div class="mb-3">
        <label class="form-label">Kart Sahibi:</label>
        <p>{{ orderDetail[0].cardInfo.cardName }}</p>
      </div>
      <div class="mb-3">
        <label class="form-label">Kart Numarası:</label>
        <p>{{ orderDetail[0].cardInfo.cardNumber }}</p>
      </div>
      <div class="mb-3">
        <label class="form-label">Sipariş Tutarı:</label>
        <p>{{ formattedPrice(orderDetail[0].totalPrice) }}</p>
      </div>
      <div class="mb-3">
        <label class="form-label">Adres:</label>
        <p>{{ orderDetail[0].address }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api";
import { formattedPrice } from "../helpers.js";

export default {
  data () {
    return {
      orderDetail: [],
    }
  },
  methods: {
    formattedPrice(price) {
      return formattedPrice(price);
    }
  },
  created() {
    const orderNumber = this.$route.params.orderNumber;
    api
        .get(`/orders?orderNumber=${orderNumber}`)
        .then((response) => {
          if (response.data.length > 0) {
            this.orderDetail = response.data;
          } else {
            this.$router.push("/");
          }
        })
  },
};
</script>

<style lang="scss" scoped>
label{
  font-weight: bold;
}
</style>