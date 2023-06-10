import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Toast, { POSITION } from "vue-toastification";
import { VueCsvImportPlugin } from "vue-csv-import";
import "vue-toastification/dist/index.css";

const options = {
  // You can set your default options here
  position: POSITION.BOTTOM_RIGHT,
  pauseOnHover: false,
  timeout: 2000,
};

createApp(App).use(Toast, options).use(VueCsvImportPlugin).mount("#app");
