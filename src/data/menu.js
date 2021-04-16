import PublishOutlinedIcon from "@material-ui/icons/PublishOutlined";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import CategoryOutlinedIcon from "@material-ui/icons/CategoryOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";

export const itemsMenu = [
  {
    id: "clientes",
    titulo: "Clientes",
    icon: PublishOutlinedIcon,
    ruta: "/admin/clientes",
  },
  {
    id: "cargaMasiva",
    titulo: "Carga Masiva",
    icon: PeopleAltOutlinedIcon,
    ruta: "/admin/carga_masiva",
  },
  {
    id: "productos",
    titulo: "Productos",
    icon: CategoryOutlinedIcon,
    ruta: "",
  },
  {
    id: "configuracion",
    titulo: "Configuración",
    icon: SettingsOutlinedIcon,
    ruta: "/admin/configuracion",
  },
];
