/**
 * Display's layout sizing
 * @function
 * @name displayLayoutSizing
 * @memberof BrowserUtilities
 * @since v1.0.0
 * @param {boolean} withLog Show log?
 * @returns {void|never}
 * @example
 *
 * displayLayoutSizing(true);
 */
export const displayLayoutSizing = (withLog: boolean): void => {
  const doc = document.getElementsByTagName('body')[0];
  const outHeight = window.outerHeight;
  const innHeight = window.innerHeight;
  const screenAvailableHeight = window.screen.availHeight;
  const screenAvailableWidth = window.screen.availWidth;
  const outWidth = window.outerWidth;
  const innWidth = window.innerWidth;
  if (doc) {
    doc.style.setProperty('--window-outer-height', `${outHeight}px`);
    doc.style.setProperty('--window-inner-height', `${innHeight}px`);
    doc.style.setProperty('--body-height', `${doc.clientHeight}px`);
  }
  if (withLog) {
    console.log('');
    console.log('|----------- LAYOUT SIZING -------------|');
    console.log(`%c|-- Window outer height: ${outHeight}px`, 'color: #00acc1');
    console.log(`%c|-- Window inner height: ${innHeight}px`, 'color: #00acc1');
    console.log(`%c|-- Screen available height: ${screenAvailableHeight}px`, 'color: #00acc1');
    console.log(`%c|-- Body height: ${doc.clientHeight}px`, 'color: #00acc1');
    console.log(`%c|-- Window outer width: ${outWidth}px`, 'color: #f4511e');
    console.log(`%c|-- Window inner width: ${innWidth}px`, 'color: #f4511e');
    console.log(`%c|-- Screen available width: ${screenAvailableWidth}px`, 'color: #f4511e');
    console.log(`%c|-- Body width: ${doc.clientWidth}px`, 'color: #f4511e');
    console.log('');
  }
};
