import Bowser from 'bowser';
import { atom } from 'jotai';

// ie
const browser = Bowser.getParser(window.navigator.userAgent);
const browserName = browser.getBrowserName();
const isIe = browserName === 'Internet Explorer';
const isIeAccessDeniedAtom = atom(isIe);
// idb
const isSupportedIndexedDbAtom = atom('indexedDB' in window);

export { isSupportedIndexedDbAtom, isIeAccessDeniedAtom };
