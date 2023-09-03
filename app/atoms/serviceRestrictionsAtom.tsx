import Bowser from 'bowser';
import { atom } from 'jotai';

// ie
const browser = Bowser.getParser(window.navigator.userAgent);
const browserName = browser.getBrowserName();
const isIe = browserName === 'Internet Explorer';
const isIeAtom = atom<boolean>(isIe);
// idb
const isSupportedIndexedDbAtom = atom<boolean>('indexedDB' in window);

export { isSupportedIndexedDbAtom, isIeAtom };
