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
 * 
 * --------------------------------------------------------------------
 *
 * This is a Greasemonkey user script.
 *
 * To install, you need Greasemonkey: http://www.greasespot.net/
 * Then restart Firefox and revisit this script.
 * Under Tools, there will be a new menu item to "Install User Script".
 * Accept the default configuration and install.
 *
 * To uninstall, go to Tools/Manage User Scripts,
 * select "G++", and click Uninstall.
 *
 * --------------------------------------------------------------------
 *
 */
 
// ==UserScript==
// @id             c2892b32-c3e1-4cf1-a4f6-e9d278cfd897
// @name           G++
// @version        1.0
// @namespace      
// @author         cakyus@gmail.com
// @description    Enhance Your Google Plus Experience
// @include        https://plus.google.com/*
// @run-at         document-end
// ==/UserScript==

// #1 Scroll to the top when you click "Google+" image
function _69fdef698135() {
	var a = document.getElementById('gbq1');	
	if (!a) { return false; }
	a.onclick = function(){
		window.scrollTo(0,0); return false;
	};
	_69fdef698135 = Function();
};

setInterval(_69fdef698135, 500);

// #2 Replace title with circle name
function _6637adeb196d() {
	if (location.href.substr(28) == 'stream') { return false; }
	if (document.getElementsByClassName('og').length == 0) { return false; }
	
	for ( var i = 0; i< document.getElementsByClassName('og').length; i++) {
		if (document.getElementsByClassName('og')[i].attributes['data-dest'].value == location.href.substr(28)) {
			document.title = document.getElementsByClassName('og')[i].textContent;
			break;
		}
	}
	
	// overwrite this function
	_6637adeb196d = Function();
}

setInterval(_6637adeb196d, 500);

