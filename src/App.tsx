import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { I18nProvider, Trans } from '@lingui/react';
import { Trans as TransMacro, t } from '@lingui/macro';
import { i18n } from '@lingui/core';
import { detect, fromNavigator } from '@lingui/detect-locale'

function App() {
  const name = 'Enyerson';
  const message = t`hola amigo`;
  const defaultFallback = 'es'

  async function dynamicActivate(locale: string) {
    const { messages } = await import(`./locales/${locale}/messages`);
    i18n.load(locale, messages);
    i18n.activate(locale);
  }
  
  const browserLang = () => {

    const detectedLocale = detect(fromNavigator(), defaultFallback)
    if (detectedLocale === null) {
      return defaultFallback
    }

    return detectedLocale.substring(0, 2)
  }

  useEffect(() => {
    dynamicActivate(browserLang())
  }, []);
  
  return (
    <I18nProvider i18n={i18n}>
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>{message}</p>
          <a
            className='App-link'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn React
          </a>
        </header>
        <Trans id='OVaF9k' message='hola {name}' values={{ name }} />;
        <TransMacro>
          Hola , LinguiJS es una internacionalización legible, automatizada y
          optimizada (3 kb) para JavaScript.
        </TransMacro>
      </div>
    </I18nProvider>
  );
}

export default App;
