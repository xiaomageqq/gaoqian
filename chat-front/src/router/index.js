import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import register from "@/view/user/register";
import login from "@/view/user/login";
import list from "@/view/user/list";
import weichat from "@/view/gjl/chat";
import basic from "@/layout/basicLayout";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/register",
      name: "register",
      component: register
    },
    {
      path: "/",
      name: "login",
      component: login
    },
    {
      path: "/list",
      name: "list",
      component: list
    },
    {
      path: "/weichat",
      name: "weichat",
      component: weichat
    },
    {
      path: "/findIndex",
      name: "findIndex",
      component: () => import("@/view/find/index")
    },

    {
      path: "/basic",
      name: "basic",
      component: basic,
      children: [
        {
          path: "/friendList",
          name: "friendList",
          component: () => import("@/view/content/list")
        },
        {
          path: "/addFriend",
          name: "addFriend",
          component: () => import("@/view/content/addFriend")
        },
        {
          path: "/allFriend",
          name: "allFriend",
          component: () => import("@/view/content/allFriend")
        },
        {
          path: "/findList",
          name: "findList",
          component: () => import("@/view/find/List")
        }
        /*{
          path: "/chat",
          name: "gjlChat",
          component: () => import("@/view/gjl/chat")
        }*/
      ]
    }
  ]
});
