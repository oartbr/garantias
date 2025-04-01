import wse from "./clients/wse";
import svm from "./clients/servimath";

const ClientThemes = {
  svm,
  wse,
  default: {},
};

ClientThemes.default = ClientThemes[process.env.CLIENT_THEME];

export const LOGO =
  process.env.CLIENT_LOGO ||
  "https://xvzq0akbnljx2cl9.public.blob.vercel-storage.com/themes/wse/logo.WSE.short-4f040biXYVrLi7cp1IfJzGMyLFdGgj.svg";

const GetTheme = () => {
  return ClientThemes.default;
};

export default GetTheme;
