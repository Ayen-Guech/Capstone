declare module "*.css";
declare module "*.scss";
declare module "*.sass";
declare module "*.less";

// ✅ Add this to silence import.meta errors in TS
interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
