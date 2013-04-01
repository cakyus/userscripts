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

    // underscore framework
    function _(selector) {
        
        var elements = [];
        
        // getElementById
        var match = selector.match('^#(.+)$');
        if (match != null){
            elements.push(document.getElementById(match[1]));
        }
        
        // getElementsByTagName
        var match = selector.match('^([a-z]+)$');
        if (match != null){
            var items = document.getElementsByTagName(match[1]);
            for (var i = 0; i < items.length; i++){
                elements.push(items[i]);
            }
        }
        
        // getElementsByClassName
        var match = selector.match('^\.(.+)$');
        if (match != null){
            var items = document.getElementsByClassName(match[1]);
            for (var i = 0; i < items.length; i++){
                elements.push(items[i]);
            }
        }
        
        return {
            'each': function(callback) {
                for (var i = 0; i < elements.length; i++) {
                    callback.call(elements[i]);
                }
            },
            'html': function(text) {
                
                if (text == undefined){
                    return elements[0].innerHTML;
                }
                
                for (var i = 0; i < elements.length; i++) {
                    elements[i].innerHTML = text;
                }
            },
            'click': function(callback) {
                for (var i = 0; i < elements.length; i++) {
                    elements[i].addEventListener('click', callback);
                }
            },
            'css': function(name, value) {
                for (var i = 0; i < elements.length; i++) {
                    elements[i].style.setProperty(name, value);
                }
            }
        };
    };
    
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
    
    this.addStyle(include('style.css'));
    this.setHTML(include('index.html'));
    
    _('#commandShowText').click(function() {
        _('article').css('display','none');
        _('#article-text').css('display','block');
    });
    
    _('#commandShowHTML').click(function() {
        _('article').css('display','none');
        _('#article-html').css('display','block');
    });
    
    _('#commandShowView').click(function() {
        _('article').css('display','none');
        _('#article-view').css('display','block');
    });
    
    _('#commandShowHelp').click(function() {
        _('article').css('display','none');
        _('#article-help').css('display','block');
    });
    
    _('#text-content').each(function(){
        this.addEventListener('keyup', function() {
            _('#text-content').each(function(){
                console.log(this.value);
            });
        });
    });
    
})();
