import { createBrowserRouter } from "react-router";
import { Layout } from "@/components/Layout";
import { Home } from "@/pages/Home";
import { Monitoramento } from "@/pages/Monitoramento";
import { Integrantes } from "@/pages/Integrantes";
import { Sobre } from "@/pages/Sobre";
import { FAQ } from "@/pages/FAQ";
import { AnaliseIA } from "@/pages/AnalisaIa";
import { NotFound } from "@/pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "monitoramento", Component: Monitoramento },
      { path: "analise-ia", Component: AnaliseIA },
      { path: "integrantes", Component: Integrantes },
      { path: "sobre", Component: Sobre },
      { path: "faq", Component: FAQ },
      { path: "*", Component: NotFound },
    ],
  },
]);
