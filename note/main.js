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

    // append style to document
    this.addStyle = function(content) {
        var oHead = document.getElementsByTagName('head')[0];
        var oStyle = document.createElement('style');
        oStyle.type = 'text/css';
        oStyle.textContent = content;
        oHead.appendChild(oStyle);
    };
    
    // set html content of <body> .. </body>
    this.setHTML = function(content) {
        document.body.innerHTML = content;
    };
    
    this.getElements = function(selector) {
        
        var elements = [];
        
        // getElementById
        var matchId = selector.match('^#(.+)$');
        if (matchId != null){
            elements.push(document.getElementById(matchId[1]));
        }
        
        return {
            'each': function(callback) {
                for (var i = 0; i < elements.length; i++) {
                    callback.call(elements[i]);
                }
            }
            };
    };
    
    this.addStyle(include('style.css'));
    this.setHTML(include('index.html'));
    
    this.getElements('#commandShowHTML').each(function() {
            console.log(this);
        });
    
})();
