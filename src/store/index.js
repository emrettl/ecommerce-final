import { createStore } from "vuex";
import axios from "axios";
import Swal from 'sweetalert2'
import router from "../router";

export default createStore({
  state: {
    categories: [],
    products: [],
    productDetail: [],
    shopping_cart: [],
    baseUrl: "http://localhost:4000",
    activePage: 1,
    perPage: 6,
    cardInfo: {
      cardName: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",
      cardCvv: "",
    },
  },
  mutations: {
    setActivePage(state, activePage) {
        state.activePage = activePage;
    },
    setPerPage(state, perPage) {
        state.perPage = perPage;
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
    setProducts(state, products) {
      state.products = products;
    },
    setProductDetail(state, productDetail) {
      state.productDetail = productDetail;
    },
    setShoppingCart(state, carts) {
      state.shopping_cart = carts;
    },
    setCount(state, product) {
      let index = state.shopping_cart.findIndex(
        (cart) => cart.id === product.id
      );
      state.shopping_cart[index] = product;
    },
    saveProduct(state, product) {
      state.products.push(product);
    },
    saveToCart(state, product) {
      state.shopping_cart.push(product);
    },
    removeFromCart(state, productId) {
      state.shopping_cart = state.shopping_cart.filter(
        (cart) => cart.id !== productId
      );
    },
    setCardInfo(state, data) {
      state.cardInfo[data.name] = data.value;
    },
  },
  actions: {
    initCategories({ commit, state }) {
      axios
        .get(`${state.baseUrl}/categories`)
        .then((response) => {
          commit("setCategories", response.data);
        })
        .catch((err) => console.log(err));
    },
    initProducts({ commit, state }) {
      const startIndex = (state.activePage - 1) * state.perPage;

      axios
        .get(
          `${state.baseUrl}/products?_start=${startIndex}&_limit=${state.perPage}`
        )
        .then((response) => {
          commit("setProducts", response.data);
        })
        .catch((err) => console.log(err));
    },
    initFilterProducts({ commit, state }, categoryId) {
      const startIndex = (state.activePage - 1) * state.perPage;

      axios
        .get(
          `${state.baseUrl}/products?categoryId=${categoryId}&_start=${startIndex}&_limit=${state.perPage}`
        )
        .then((response) => {
          commit("setProducts", response.data);
        })
        .catch((err) => console.log(err));
    },
    initProductDetail({ commit, state }, productId) {
      axios
        .get(`${state.baseUrl}/products?id=${productId}`)
        .then((response) => {
          commit("setProductDetail", response.data);
        })
        .catch((err) => console.log(err));
    },
    initShoppingCart({ commit, state }) {
      axios
        .get(`${state.baseUrl}/shopping-cart`)
        .then((response) => {
          commit("setShoppingCart", response.data);
        })
        .catch((err) => console.log(err));
    },
    saveProduct({ commit, state }, product) {
      axios
        .post(`${state.baseUrl}/products`, product)
        .then((response) => {
          commit("saveProduct", response.data);
        })
        .catch((err) => console.log(err));
    },
    saveToCart({ commit, state }, product) {
      axios
        .post(`${state.baseUrl}/shopping-cart`, {
          ...product,
          count: 1,
        })
        .then((response) => {
          commit("saveToCart", response.data);
        })
        .catch((err) => console.log(err));
    },
    removeFromCart({ commit, state }, productId) {
      axios
        .delete(`${state.baseUrl}/shopping-cart/${productId}`)
        .then((response) => {
          console.log(response);
          commit("removeFromCart", productId);
        })
        .catch((err) => console.log(err));
    },
    editCount({ commit, state }, product) {
      axios
        .put(`${state.baseUrl}/shopping-cart/${product.id}`, product)
        .then((response) => {
          commit("setCount", response.data);
        })
        .catch((err) => console.log(err));
    },
    createOrder({ commit, state, dispatch }, address) {
      const orderNumber = Date.now();
      const totalPrice = state.shopping_cart.reduce((sum, product) => sum + (product.price * product.count), 0);

      const product = {
        orderNumber: orderNumber,
        products: state.shopping_cart,
        address: address,
        totalPrice: totalPrice,
        cardInfo: {
          cardName: state.cardInfo.cardName,
          cardNumber: state.cardInfo.cardNumber,
          cardMonth: state.cardInfo.cardMonth,
          cardYear: state.cardInfo.cardYear,
          cardCvv: state.cardInfo.cardCvv,
        },
      }

      if(product.address.length == 0 || product.cardInfo.cardName.length == 0 || product.cardInfo.cardNumber.length == 0 || product.cardInfo.cardMonth.length == 0 || product.cardInfo.cardYear.length == 0 || product.cardInfo.cardCvv.length == 0) {
        Swal.fire({
          icon: "error",
          title: "Hata",
          text: "Bütün alanları doldurduğunuzdan emin olun.",
        });

        return;
      }

      axios
          .post(`${state.baseUrl}/orders`, product)
          .then((response) => {
            Swal.fire({
              title: "Siparişiniz Oluşturuldu",
              text: `Siparişiniz başarıyla oluşturulmuştur. ${orderNumber} numarasıyla siparişinizi sorgulayabilirsiniz. Pencere kapandığında sepetiniz otomatik olarak temizlenip anasayfaya yönlendirileceksiniz.`,
              icon: "success"
            }).then((result) => {
              state.shopping_cart.forEach((item) => {
                dispatch("removeFromCart", item.id);
              });
            }).then(() => {
              router.push('/');
            })
           })
    },
    trackOrder({ commit, state }, orderNumber) {
      axios
          .get(`${state.baseUrl}/orders?orderNumber=${orderNumber}`)
          .then((response) => {
            if (response.data.length > 0) {
              router.push(`/order-detail/${orderNumber}`);
            } else {
              Swal.fire({
                icon: "error",
                title: "Sipariş Bulunamadı",
                text: "Sorguladığınız sipariş numarasına ait bir sipariş bulunmamaktadır. Lütfen tekrar deneyiniz.",
              });
            }
          })
    }
  },
  getters: {
    getCategories: (state) => state.categories,
    getProducts: (state) => state.products,
    getProductDetail: (state) => state.productDetail,
    getShoppingCart: (state) => state.shopping_cart,
    getActivePage: (state) => state.activePage,
  },
});
