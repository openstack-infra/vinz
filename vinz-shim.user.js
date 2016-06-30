// ==UserScript==
// @name        vinz-shim
// @namespace   vinz-shim
// @description shim for vinz
// @include     https://review.openstack.org/vinz*
// @version     1
// @grant       none
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==
//
//
//

$( document ).ready(function() {
  $('head')
    .append('<link href="https://localhost:1234/assets/main_css.css" rel="stylesheet" type="text/css" >')
    .append('<script src="https://localhost:1234/assets/app_js.js">');
  
  $('body').load("https://localhost:1234 #main");
});

