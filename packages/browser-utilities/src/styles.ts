/*
 * @license
 * BSD License
 *
 * Copyright (c) 2020, UXLand
 *
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * 3. All advertising materials mentioning features or use of this software must display the following acknowledgement: This product includes software developed by the <copyright holder>.
 * 4. Neither the name of the <copyright holder> nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY <COPYRIGHT HOLDER> ''AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

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
