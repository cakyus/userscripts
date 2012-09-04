// googleplusplus.js
// Copyright (c) 2010-2012, Yus Uf
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://www.greasespot.net/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "googleplusplus.js", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @id             c2892b32-c3e1-4cf1-a4f6-e9d278cfd897
// @name           Google++
// @version        1.0
// @namespace      
// @author         cakyus@gmail.com
// @description    Enhance Your Google Plus Experience
// @include        https://plus.google.com/*
// @run-at         document-end
// ==/UserScript==

// scroll to the top when you click "Google+" image

var a = document.getElementById('gbqlw');
a.onclick = function(){
    window.scrollTo(0,0);
    return false;
}

