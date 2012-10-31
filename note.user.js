// ==UserScript==
// @id             6f3b5a13-c58a-41be-96c1-4257921fa883
// @name           Note.js
// @version        1.0
// @namespace
// @author
// @description    use about:blank page as note
// @include        about:blank#*
// @run-at         document-end
// ==/UserScript==

// ==GreaseMonkey==

if (typeof GM_addStyle != 'function'){
	function GM_addStyle(textContent) {
		var oHead = document.getElementsByTagName('head')[0];
		var oStyle = document.createElement('style');
		oStyle.type = 'text/css';
		oStyle.textContent = textContent;
		oHead.appendChild(oStyle);
	}	
}

// ==/GreaseMonkey==

var oNoteJS = new NoteJS;
oNoteJS.init();

function NoteJS() {

	this.contentOriginal = unescape(document.location.href).substr(12);
	this.content = '';
	
	this.init = function() {
		GM_addStyle(
			  'body {margin: 5px auto; text-align: center; background-image: -moz-radial-gradient(left top, ellipse farthest-side, #FCFFFD 0%, #B1EFBB 80%);}'
			+ '#note-content { width: 65%; height: 90%;}'
			+ '#note-content { padding: 10px; border: 1px solid #ddd; }'
			+ '#note-content { font-family: Monospace, Consolas; font-size: x-large;}'
			+ '#command-show { font-size: large; margin-bottom: 10px;}'
		);
		document.body.innerHTML = '<div id="command-buttons"><input value="Show Original" id="command-show" type="button"></div><textarea id="note-content"></textarea>"';
		var oContent = document.getElementById('note-content');
		oContent.textContent = oNoteJS.getContentOriginal();
		oContent.addEventListener('keyup', function() {
			oNoteJS.setContent(oContent.value);
		});
	}

	this.getContentCurrent = function() {
		return unescape(document.location.href).substr(12);
	}

	this.getContentOriginal = function() {
		return this.contentOriginal;
	}

	this.getContent = function() {
		return this.content;
	}

	this.setContent = function(content) {
		document.location.href = 'about:blank#' + escape(content);
	}

	this.getTitle = function() {

	}

	this.getLocationOriginal = function() {
		return 'about:blank#' + this.contentOriginal;
	}

	this.getLocation = function() {
		return 'about:blank#' + this.content;
	}
}
