import { InfoCredito } from "../components/admin/Home/CargaMasiva/InfoCredito/InfoCredito";
import { Branding } from "../components/admin/Home/Configuracion/Branding/Branding";
import { Terminos } from "../components/admin/Home/Configuracion/Terminos/Terminos";
export const itemsSubMenu = [
  {},
  {
    titulo: "Carga masiva",
    items: [
      {
        id: "info_credito",
        titulo: "Info de crédito",
        component: InfoCredito,
      },
      {
        id: "movimientos_recientes",
        titulo: "Movimientos recientes",
        component: Branding,
      },
      {
        id: "referencias",
        titulo: "Referencias de pago",
        component: Branding,
      },
      {
        id: "estados_cuenta",
        titulo: "Estados de cuenta",
        component: Branding,
      },

      {
        id: "clientes",
        titulo: "Clientes",
        component: Branding,
      },
    ],
  },
  {
    titulo: "Configuración",
    items: [
      {
        id: "preguntas",
        titulo: "Preguntas",
        ruta: "",
        component: Branding,
      },
      {
        id: "contacto",
        titulo: "Contacto",
        ruta: "",
        component: Branding,
      },
      {
        id: "usuarios",
        titulo: "Usuarios financieros",
        ruta: "",
        component: Branding,
      },
      {
        id: "terminos",
        titulo: "Terminos y avisos",
        ruta: "",
        component: Branding,
      },

      {
        id: "branding",
        titulo: "Branding",
        ruta: "",
        component: Branding,
      },
    ],
  },
  {
    titulo: "Configuración",
    items: [
      {
        id: "preguntas",
        titulo: "Preguntas",
        ruta: "",
        component: Branding,
      },
      {
        id: "contacto",
        titulo: "Contacto",
        ruta: "",
        component: Branding,
      },
      {
        id: "usuarios",
        titulo: "Usuarios financieros",
        ruta: "",
        component: Branding,
      },
      {
        id: "terminos",
        titulo: "Terminos y avisos",
        ruta: "",
        component: Terminos,
      },

      {
        id: "branding",
        titulo: "Branding",
        ruta: "",
        component: Branding,
      },
    ],
  },
];
