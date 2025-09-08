import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/Layouts/DefaultLayout.vue";
import Home from "@/views/Home.vue";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";
import EventDoc from "@/views/EventDoc.vue";
import Registration from "@/views/Registration.vue";
import RegistrationForm from "@/views/RegistrationForm.vue";

import Profile from "@/views/Profile.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      { path: "", component: Home },
      { path: "register", component: Register },
      { path: "login", component: Login },
      { path: "eventdoc", component: EventDoc },
      { path: "registration", component: Registration },
      { path: "registration/form", component: RegistrationForm },
      { path: "profile", component: Profile },
      { path: "eventdoc", redirect: "/eventdoc/overview" },
      { path: "eventdoc/:id", component: EventDoc, props: true },
    ],
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
