// ==UserScript==
// @id             66ffbb8e-dc41-4b3d-9a62-2bcc88d07de4
// @name           NewTab.js
// @version        1.0
// @namespace      
// @author         "Yus Uf" <cakyus@gmail.com>
// @description    Enhance your newTab experience
// @include        about:blank
// @run-at         document-end
// ==/UserScript==

//@todo use window.Storage to save bookmarks

newtab();

function newtab() {
	var style = new newtabStyle;
	// add container
	var div = document.createElement('div');
	div.id = 'container';
	document.body.appendChild(div);
	
	window.localStorage.setItem('newtab.bookmark.1.caption', 'Google+');
	window.localStorage.setItem('newtab.bookmark.1.location', 'https://plus.google.com');
	
	// add bookmarks
	for (i=0; i<9; i++) {
		var bookmark = new newtabBookmark;
		bookmark.bookmarkId = 'newtab.bookmark.'+i;
		bookmarkCaption = window.localStorage.getItem('newtab.bookmark.'+i+'.caption');
		if (bookmarkCaption==null || bookmarkCaption=='') {
			bookmarkCaption = 'Bookmark '+(i+1);
		}
		bookmark.caption = bookmarkCaption;
		bookmarkLocation = window.localStorage.getItem('newtab.bookmark.'+i+'.location');
		if (bookmarkLocation==null || bookmarkLocation=='') {
			bookmarkLocation = '#';
		}
		bookmark.href = bookmarkLocation;
		bookmark.show();
	}
}

function newtabStyle() {
	var css = 'body {text-align: center; margin: 10px auto;}'
		+ ' div#container {margin: 0px auto; width: 90%; text-align: left;}'
		+ ' div.bookmark {background: #ddd; cursor: pointer; width: 25%; height: 23%; margin: 15px; float: left; border-radius: 5px; box-shadow: 3px 3px 5px 6px #ccc; padding: 15px;  position: relative}'
		+ ' div.bookmark:hover {background: #eee;}'
		+ ' div.bookmark .caption {height: 100%}'
		+ ' div.bookmark .toolbar {text-align: right; position: absolute; bottom: 15px; right: 15px}'
		+ ' button {margin-left: 5px}'
		+ '';
	var	head = document.getElementsByTagName('head')[0];
	var	style = document.createElement('style');

	style.type = 'text/css';
	if(style.styleSheet){
		style.styleSheet.cssText = css;
	}else{
		style.appendChild(document.createTextNode(css));
	}
	head.appendChild(style);	
}

function newtabBookmark() {
	
	this.caption = 'Untitled';
	this.href = '#';
	this.bookmarkId = 0;
	
	this.show = function() {
		
		var divContainer = document.createElement('div');		
		divContainer.className = 'bookmark';
		var container = document.getElementById('container');
		container.appendChild(divContainer);
				
		var divCaption = document.createElement('div');
		divCaption.innerHTML = this.caption;
		divCaption.className = 'caption';
		divCaption.href = this.href;
		divCaption.addEventListener('click', function() {
			document.location.href = this.href;
		}, false);
		divContainer.appendChild(divCaption);
		
		var divToolbar = document.createElement('div');
		divToolbar.className = 'toolbar';
		divToolbar.href = this.href;
		divToolbar.title = this.href;
		divContainer.appendChild(divToolbar);
		
		var divButtonEdit = document.createElement('button');
		divButtonEdit.className = 'button';
		divButtonEdit.innerHTML = 'edit';
		divButtonEdit.type = 'button';
		divButtonEdit.bookmarkId = this.bookmarkId;
		divButtonEdit.addEventListener('click', function() {
			var bookmarkLocation = prompt('Location');
			var bookmarkCaption = prompt('Title');
		}, true);
		divToolbar.appendChild(divButtonEdit);
		
		var divButtonClear = document.createElement('button');
		divButtonClear.className = 'button';
		divButtonClear.innerHTML = 'clear';
		divButtonClear.type = 'button';
		divToolbar.appendChild(divButtonClear);
		
		return divContainer;
	}
}

