import { getSaved } from '../lib/store';

const nl = navigator.language.slice(0, 2);
const locale = getSaved('language') || (Locales.includes(nl) ? nl : 'en');
document.documentElement.lang = locale;

const attributes = [
  '',
  '-label',
  '-aria-label',
  '-placeholder'
];

let translations: Record<TranslationKeys, string>;

import(`../locales/${locale}.json`)
  .then((_) => {
    translations = _.default;
    attributes.forEach(attributeHandler);
    dispatchEvent(new CustomEvent('i18nLoaded'));
  });


function attributeHandler(attr: string) {
  const query = 'data-translation' + attr;
  document.querySelectorAll(`[${query}]`).forEach((el) => {
    const translationKey = el.getAttribute(query) as TranslationKeys;
    if (!translationKey || !translations) return;
    const translationVal = translations[translationKey] || translationKey;

    if (attr) {
      el.removeAttribute(query);
      el.setAttribute(
        attr.substring(1),
        translationVal
      );
    } else el.textContent = translationVal;
  });
}


export const i18n = (
  key: TranslationKeys,
  value: string = ''
) => value ?
    ((translations?.[key] || key) as string).replace('$', value) :
    (translations?.[key] || key) as string;
