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
    $content = file_get_contents($file);
    
    if (preg_match("/[^\.]+$/", $file, $match)) {
        $extension = $match[0];
        if ($extension == 'css') {
            $content = build_callback_include_css($content);
        } elseif ($extension == 'html') {
            $content = build_callback_include_html($content);
        } else {
            throw new \Exception("Unsupported file extension");
        }
    }

    // parse as string
    $content = "'".$content."'";
    
    return $content;
}

function build_callback_include_css($content) {
    
    // replace new line, tab, etc.
    // javascript does not support multiline string
    
    $content = preg_replace("/\s+/", " ", $content);    
    $content = trim($content);    
    return $content;    
}

function build_callback_include_html($content) {

    if (preg_match(
          "/<html>.+<body>(.+)<\/body>.+<\/html>/s"
        , $content
        , $match)) {
        $content = $match[1];
        $content = preg_replace(
             array("/>\s+/", "/\s+</")
            ,array(">", "<")
            ,$content
            );    
        $content = trim($content);    
        return $content;    
    } else {
        throw new \Exception("Invalid html content");
    }
    
}
