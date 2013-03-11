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

// TODO
// @todo [bugfix] lastest comments won't hide in each circles page
// @todo [bugfix] there are two posts which are not separated
// @todo [feature] apply theme on user profile >> about page
// @todo [feature] apply theme on user profile >> album page
// @todo [feature] keyboard shortcut
// @todo [feature] open in new window for links in post item

$(document).ready(function(){

    // .xFZOtc  post item
    // .VSlytb  comment item
    // .jfc     navigation bar: cirles, new post
    // .MQtqDc  detail bar at the bottom of post item
    // .jqF9Bc  comment button at the bottom of post item
    // #23 img  images in post item content

    GM_addStyle('body { background-color: #D4DDF0 ; width: 58%; margin-left: 10px; } .xFZOtc { background-color: #FFF; margin-top: 10px; font-size: 20px; font-family: Ubuntu Condensed; } .VSlytb { border-top: 1px solid #DDD; padding-bottom: 10px;} .jfc, .MQtqDc { display: none; } div#23 img { width: 20%; padding: 10px; } .sidebar { position: fixed; top: 0px; right: 2px; min-height: 100px; background-color: #fff; min-width: 200px; padding:10px; } .sidebar a { color: #000; display: block; padding: 5px; } .sidebar a:hover { background-color: #DDD; } .sidebar h2 { padding: 0px; }');

    // style for post detail
    if (location.href.match('https://plus.google.com/app/basic/stream/') == null){
        GM_addStyle('.VSlytb { display: none; }');
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
    
    var urlCircles = 'https://plus.google.com/app/basic/stream/pick?cpsid=circles';
    $.ajax(urlCircles).done(function(data){
        var circles = data.match(/<a href="([^<]+?)" class="MBRhg" id="51">(.+?)<\/a>/g);
        var sidebar = document.getElementById('sidebar');
        sidebar.innerHTML = '<h2>Circles</h2>' + circles.join('');
    });
});
