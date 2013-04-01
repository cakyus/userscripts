/*
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
 * MA 02110-1301, USA.
 */

// ==UserScript==
// @id             d986d257-05de-4625-a8ca-d2a8791a1a60
// @name           Note
// @include        about:blank#d986d257-05de-4625-a8ca-d2a8791a1a60#*
// @run-at         document-end
// @version        1.0
// ==/UserScript==

(function(){

    this.addStyle = function(css) {
        var oHead = document.getElementsByTagName('head')[0];
        var oStyle = document.createElement('style');
        oStyle.type = 'text/css';
        oStyle.textContent = css;
        oHead.appendChild(oStyle);
    }
    
    this.addStyle(include('style.css'));

})();
