/*
 * MIT License
 *
 * Copyright (c) 2020 UXLand
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
 * Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH
 * THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {View} from "./view";

let STUB = 1;

/**
 * sdafasasfds
 */
STUB = 1

/**
 * Interface that holds the properties of a Region
 * @memberOf Regions
 * @since v1.0.0
 * @interface RegionOptions
 *
 * @property {String} name Region's name. It must be unique within a RegionManager
 */
export interface RegionOptions{
    name: string;
}

/**
 * Region interface
 * @memberOf Regions
 * @since v1.0.0
 * @interface Region
 *
 * @property {String} name of the region. It must be unique within a RegionManager
 *
 */
export interface Region{
    options: RegionOptions;
    addView<T = any>(view: View<T>);
}


export class RegionImpl implements Region{
    constructor(public options: RegionOptions) {
    }
    addView<T = any>(view: View<T>) {
    }

}
