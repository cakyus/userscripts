<?php

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
 */

build();

function build() {
    
    $fileBuildPath   = 'script.user.js';
    $fileMainPath    = 'main.js';

    $match = array();
    $fileMainContent = file_get_contents($fileMainPath);

    // process include('<file>')
    $fileMainContent = preg_replace_callback(
        "/include\('([^']+)'\)/"
        , 'build_callback_include'
        , $fileMainContent
        );
        
    file_put_contents($fileBuildPath, $fileMainContent);    
}


function build_callback_include($match) {
    
    // @todo include javascript code
    
    $file = $match[1];
    
    $fileContent = file_get_contents($file);
    // replace new line, tab, etc.
    // javascript does not support multiline string
    $fileContent = preg_replace("/\s+/", " ", $fileContent);
    // parse as string
    $fileContent = "'".$fileContent."'";
    
    return $fileContent;
}
