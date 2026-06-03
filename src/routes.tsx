import { createBrowserRouter } from "react-router";
import { Layout } from "@/components/Layout";
import { Home } from "@/pages/Home";
import { Monitoramento } from "@/pages/Monitoramento";
import { Integrantes } from "@/pages/Integrantes";
import { Sobre } from "@/pages/Sobre";
import { FAQ } from "@/pages/FAQ";
import { Login } from "@/pages/Login";
import { NotFound } from "@/pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "monitoramento", Component: Monitoramento },
      { path: "integrantes", Component: Integrantes },
      { path: "sobre", Component: Sobre },
      { path: "faq", Component: FAQ },
      { path: "login", Component: Login },
      { path: "*", Component: NotFound },
    ],
  },
]);
