import { createApp } from "vue";
import App from "./App.vue";
import store from "./Store/store.js";
import router from "./router/index.js";
import "./index.css";
import { CIcon } from "@coreui/icons-vue";

const app = createApp(App);
import { CModal, CModalHeader, CModalTitle, CModalBody } from "@coreui/vue";
import { cilColorBorder, cilXCircle, cilZoom, cilX } from "@coreui/icons";

const icons = {
  cilColorBorder,
  cilXCircle,
  cilZoom,
  cilX,
};

app.provide("icons", icons);
app.component("CIcon", CIcon);
app.component("CModal", CModal);
app.component("CModalHeader", CModalHeader);
app.component("CModalTitle", CModalTitle);
app.component("CModalBody", CModalBody);

app.use(store).use(router).mount("#app");
