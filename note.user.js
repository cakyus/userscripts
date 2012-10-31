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

// == GreaseMonkey Compatibility

if (typeof GM_addStyle != 'function'){
	function GM_addStyle(textContent) {
		var oHead = document.getElementsByTagName('head')[0];
		var oStyle = document.createElement('style');
		oStyle.type = 'text/css';
		oStyle.textContent =
			  'body {margin: 5px auto; text-align: center; }'
			+ 'body {background-image: -moz-radial-gradient(left top, ellipse farthest-side, #FCFFFD 0%, #B1EFBB 80%);}'
			+ '#note-content { width: 65%; height: 90%;}'
			+ '#note-content { padding: 10px; border: 1px solid #ddd; }'
			+ '#note-content { font-family: Monospace, Consolas; font-size: x-large;}'
			+ '#command-show { font-size: large; margin-bottom: 10px;}'
			;
		oHead.appendChild(oStyle);
	}	
}

var oBody = document.getElementsByTagName('body')[0];

// add style
GM_addStyle();

var oCommandButtons = document.createElement('div');
oCommandButtons.id = 'command-buttons';
oBody.appendChild(oCommandButtons);

var oCommandSwitchContent = document.createElement('input');
oCommandSwitchContent.id = 'command-show';
oCommandSwitchContent.type = 'button';
oCommandSwitchContent.value = 'Show Original';
oCommandButtons.appendChild(oCommandSwitchContent);

var oContent = document.createElement('textarea');
oContent.id = 'note-content';
oBody.appendChild(oContent);

var oNoteJS = new NoteJS;
oContent.textContent = oNoteJS.getContentOriginal();
oContent.addEventListener('keyup', function() {
	oNoteJS.setContent(oContent.value);
});

function NoteJS() {

	this.contentOriginal = unescape(document.location.href).substr(12);
	this.content = '';

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
