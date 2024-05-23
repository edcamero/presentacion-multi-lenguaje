import { LinguiConfig } from "@lingui/conf";

const linguiConfig: LinguiConfig = {
 locales: ["en", "es"],
 sourceLocale: "es",
 catalogs: [
   {
     path: "<rootDir>/src/locales/{locale}/messages",
     include: ["src"],
   },
 ],
 format: 'po',
 compileNamespace: "ts"
};

export default linguiConfig;