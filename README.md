# Practica multi lenguaje en React
## Libreria Lingui

[lingui](https://lingui.dev/)

##Creación de la aplicación 
### `npx create-react-app test-multi-lenguaje --template typescript`

## instalación de la librerias de lingui 
 ```
yarn add --dev @lingui/cli @babel/core
yarn add --dev @lingui/macro babel-plugin-macros
yarn add @lingui/react
 ```
## Configuración de lingui
nombre del archivo de configuracion: `lingui.config.ts`

 ```
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
 ```
### Configuración opcional
Archivos con las traduciones en formato json
`yarn add --dev @lingui/format-json`
En el archivo de configuracion replazar 
` format: 'po',`
por 
`format: formatter({style: "minimal"}), `

### Agregar los script de lingui al proyecto

en el package.json en la area de scripts agregar los siguientes:
```
"extract": "lingui extract",
"compile": "lingui compile"
```

### Usar etiquetas trans y t en el proyecto

imports:
```
import { Trans } from '@lingui/react';
import { Trans as TransMacro } from '@lingui/macro';
```

### Componentes:

```
<Trans id="OVaF9k" message="hola {name}" values={{ name }} />;
<TransMacro>Hola , LinguiJS es una internacionalización legible, automatizada y optimizada (3 kb) para JavaScript.</TransMacro>
```
### Extract
ejecutar en la consola en la raiz del proyecto el siguiente comando 
`yarn extract`
luego se agregan las traducciones manualmente para completar la que no es por defecto 

generar los mensajes optimizados para la tarduccion en react js 
`yarn compile`

### Utilizar las traducciones
envolver el componente principal con `<I18nProvider i18n={i18n}>`

importar la tradución deseada
`import { messages } from "./locales/en/messages";`
Cargar y activarla
```
  i18n.load('en', messages);
  i18n.activate('en');
```
### Import dinamico

```
  async function dynamicActivate(locale: string) {
    const { messages } = await import(`./locales/${locale}/messages`);
    i18n.load(locale, messages);
    i18n.activate(locale);
  }
```
### Detectar idioma del navegador 
instalar la libreria 
` yarn add @lingui/detect-locale`

imports:
` import { detect, fromNavigator } from '@lingui/detect-locale'`

funcion para obtener el lenguaje 
```
   const browserLang = () => {
    if (locale) {
      return locale
    }
    const detectedLocale = detect(fromNavigator(), defaultFallback)
    if (detectedLocale === null) {
      return defaultFallback
    }

    return detectedLocale.substring(0, 2)
  }
```
