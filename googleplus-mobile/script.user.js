// ==UserScript==
// @id             3022580f-96a8-45aa-8741-5bb1cc404a31
// @name           Google Plus Mobile
// @namespace      https://github.com/cakyus/
// @include        https://plus.google.com/app/basic/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// @run-at         document-end
// @version        1.0.1
// ==/UserScript==

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

// CHANGES
// 2013-03-11 [feature] show circles list at right sidebar
// 2013-03-12 [feature] add link to desktop version in user about page
// 2013-03-12 [feature] hide comments completely in circle page
// 2013-03-13 [feature] circle page >> post item >> user link : open link in new window
// 2013-03-13 [feature] circle page >> post item >> links : open link in new window
// 2013-03-13 [bugfix] latest comments won't hide in circles page
// 2013-03-14 [bugfix] pattern of post-item's location
// 2013-03-14 [feature] set document title based on current circle's name
// 2013-03-14 [feature] save sidebar content in localStorage
// 2013-03-15 [bugfix] assigning document title to unverified object

// TODO
// [bugfix] there are two posts which are not separated
// [feature] apply theme on user profile >> about page
// [feature] apply theme on user profile >> album page
// [feature] keyboard shortcut

$(document).ready(function(){

    // .xFZOtc  post item
    // .VSlytb  comment item
    // .jfc     navigation bar: cirles, new post
    // .MQtqDc  detail bar at the bottom of post item
    // .jqF9Bc  comment button at the bottom of post item
    // #23 img  images in post item content

    GM_addStyle('a { cursor: pointer; } body { width: 50%; margin-left: 10%; } .qry4Ge { border-top: 1px solid #DDD; } .qry4Ge, .Ie0wAe, .Lfc, .CMuu5c, .OuNFwc { padding: 5px; margin: 0px; } .OuNFwc, .qry4Ge { background-color: #FFF; font-size: 20px; font-family: Ubuntu Condensed; } .OuNFwc, .Ie0wAe { width: 100%; } .CMuu5c { display:block; width: 100%; background-color: #FFF; } .VSlytb { border-top: 1px solid #DDD; padding: 5px 5px 10px 5px; width: 100%; } .jfc, .MQtqDc, .VSlytb, .gfc { display: none; } div#23 img { width: 20%; padding: 10px; } .VSlytb .Lfc { display: inline; } .sidebar { position: fixed; top: 0px; right: 1%; min-height: 100px; background-color: #fff; min-width: 200px; padding:10px; } .sidebar a { color: #000; display: block; padding: 5px; } .sidebar a:hover { background-color: #DDD; } .sidebar h2 { padding: 0px; } .menu-item { display: block; padding: 5px 10px; }');

	// circles page
	var documentTitle = document.getElementById('2');
	if (documentTitle != null) {
		document.title = documentTitle.textContent;
	}
	
    // style for post detail
    if (location.href.match('/stream/[a-z0-9]{32,}') != null){
        GM_addStyle('.VSlytb { display: block; }');
    }

    // user about page
    if (location.href.match('https://plus.google.com/app/basic/[0-9]+/about') != null){
        // add link to desktop version of current page
        var userId = location.href.match('https://plus.google.com/app/basic/([0-9]+)/about')[1];
        $('.e8Z0Ie:first').append(' <a href="https://plus.google.com/u/0/' + userId + '/about" class="menu-item" target="_blank">Show on the Desktop</a>');
    }

    // open post detail in new window when clicking comment button
    $('a.jqF9Bc').each(function(){
        if (this.id == 80){
            this.target = '_blank';
        }
    });
    
    // sidebar circles
    var sidebar = document.createElement('div');
    sidebar.id = 'sidebar';
    sidebar.className = 'sidebar';
    document.body.appendChild(sidebar);
    
    // find localStorage's item for sidebar text
    if (localStorage['sidebar'] == undefined){
        
        var urlCircles = 'https://plus.google.com/app/basic/stream/pick?cpsid=circles';
        $.ajax(urlCircles).done(function(data){
            var circles = data.match(/<a href="([^<]+?)" class="MBRhg" id="51">(.+?)<\/a>/g);
            var sidebar = document.getElementById('sidebar');
            localStorage['sidebar'] = ''
                + '<a onclick="javascript:localStorage.clear()">'
                + 'Reload</a><h2>Circles</h2>'
                + circles.join('')
                ;
            sidebar.innerHTML = localStorage['sidebar'];
        });
    } else{
        sidebar.innerHTML = localStorage['sidebar'];
    }
    
    // circle page >> post item >> user link : open link in new window
    $('a.Lfc').each(function(){
        this.target = '_blank';
    });
    
    // circle page >> post item >> links : open link in new window
    $('.qry4Ge a').each(function(){
        this.target = '_blank';
    });
	
});
