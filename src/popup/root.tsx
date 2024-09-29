import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import createRootElement from 'src/common/createRootElement';
import { setStyle } from 'src/common/element';
import { App } from './app';
import store, { persistor } from './store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { getLocaleText } from 'src/common/getLocaleText';

/** 抓取到根元素 */
const root = createRootElement();
for (const key of ['html', 'body']) {
  (document.querySelector(key) as HTMLElement)!.addEventListener(
    'contextmenu',
    e => {
      e.stopPropagation();
      e.preventDefault();
      return false;
    },
  );
}
/// 为了能够复用，在抓到根元素后才赋值
setStyle(root, {
  width: '100%',
  height: '100%',
  position: 'relative',
  '--my-height': '100px',
});
setStyle(root, {
  '--my-color': '#f0f',
});

const html = document.querySelector('html');
/// 配置页面语言
if (chrome.i18n.getUILanguage().toLocaleLowerCase().startsWith('zh')) {
  html!.lang = 'zh_cn';
} else {
  html!.lang = 'en';
}
/// 新建标签页标题
document.title = getLocaleText('new_tab_title');

html!.dir = chrome.i18n.getMessage('@@bidi_dir');

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
);
