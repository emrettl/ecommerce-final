import Homepage from "./views/Homepage.vue";
import AddProduct from "./views/AddProduct.vue";
import ShoppingCart from "./views/ShoppingCart.vue";
import FilterCategory from "./views/FilterCategory.vue";
import Details from "./views/Details.vue";
import OrderTracking from "./views/OrderTracking.vue";
import OrderDetail from "./views/OrderDetail.vue";

import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: "/",
        component: Homepage,
    },
    {
        path: "/add-product",
        component: AddProduct,
    },
    {
        path: "/shopping-cart",
        component: ShoppingCart,
    },
    {
        path: "/category/:categoryId",
        component: FilterCategory,
    },
    {
        path: "/details/:id",
        component: Details,
    },
    {
        path: "/order-tracking",
        component: OrderTracking,
    },
    {
        path: "/order-detail/:orderNumber",
        component: OrderDetail,
    },
]

const router = createRouter({
    history : createWebHashHistory(),
    routes,
});

export default router;
