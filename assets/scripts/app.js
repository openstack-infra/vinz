import jquery from 'jquery';
//import bootstrap from 'bootstrap-sass';
import React from 'react';
import {render} from 'react-dom';

console.log("loading javascript");

function gerritGet (url, func){
  $.get( url, function( data ) {
  })
  .fail(function(data) {
    var ret = jQuery.parseJSON(data.responseText.slice(4));
    func(ret);
  });
};

$( document ).ready(function() {
console.log("on ready");
  // Handler for .ready() called.
  var token;
  var $body = $('body');
  var $page_header = $("<div class='page-header'>");
  var $header = $("<div class='mynav'></div><h1 class='jumbotron' id='header'></h1>");
  var $nav = $('<ul class="nav nav-pills"> <li role="presentation" class="active"><a href="/vinz/home">Home</a></li> <li role="presentation"><a href="/login">Login</a></li> <li role="presentation"><a href="#">Messages</a></li> </ul>');
  var $container = $("<div class='container'>");
  $("<div class='row'>").append($page_header.append($nav.append($header))).appendTo($container);
  var $row = $("<div class='row'>");

  var $reviews = $("<div class='info col-md-4'>")
    .prepend($("<h2>").text("Code Review:"))
    .appendTo($row);
  var $message = $("<div class='files col-md-8'>")
    .prepend($("<h2>").text("Commit Message:"))
    .appendTo($row);
  var $files = $("<div class='files col-md-8'>")
    .prepend($("<h2>").text("Files changed:"))
    .appendTo($row);
  var $info = $("<div class='info col-md-8'>")
    .prepend($("<h2>").text("Information:"))
    .appendTo($row);
  $row.appendTo($container);
  $container.appendTo($body);


  // Get auth Token
  $.get("/", function (data) {
    var idx = data.search('xGerritAuth');
    var token = data.slice(idx + 13, idx + 13 + 32);

    var window_url    = window.location.href;
    var change_number = window_url.split('/')[5];
    gerritGet("/changes/" + change_number +  "/detail?O=404", function (data) {
      console.log("sup2");
      $('#header').text("#"+ data._number + " ")
        .append($("<small/>").text(data.subject))
        .append($("<h3/>").text(data.owner.username)
          .append($("<small/>").text(" " + data.owner.name))
          .append( "<form class='form-inline pull-right'><div class='form-group'><label class='sr-only' for='vote'>Vote:</label><div class='btn-group' role='group'><button class='form-control btn btn-primary' type='button' id='voteup'><span class='glyphicon glyphicon-thumbs-up'></span></button><button class='form-control btn btn-primary' type='button' id='votedown'><span class='glyphicon glyphicon-thumbs-down'></span></button></div></form>" ));

console.log(data);
      var root_data = data;
      $( "#voteup" ).click(function() {
        var review = {"labels":{"Code-Review":1,"Workflow":0},"strict_labels":true,"drafts":"KEEP","comments":{},"message":"test"};
        $.ajax({
          type:"POST",
          beforeSend: function (request)
          {
              request.setRequestHeader("X-Gerrit-Auth", token);
          },
          url: "/changes/" + data._number + "/revisions/" + data.current_revision + "/review",
          data: JSON.stringify(review),
          async: false,
          dataType: "json",
          contentType: 'application/json; charset=utf-8',
        });
      });
      $( "#votedown" ).click(function() {
          console.out("clicked!");
        var review = {"labels":{"Code-Review":-1,"Workflow":0},"strict_labels":true,"drafts":"KEEP","comments":{},"message":"test"};
        $.ajax({
          type:"POST",
          beforeSend: function (request)
          {
              request.setRequestHeader("X-Gerrit-Auth", token);
          },
          url: "/changes/" + data._number + "/revisions/" + data.current_revision + "/review",
          data: JSON.stringify(review),
          async: false,
          dataType: "json",
          contentType: 'application/json; charset=utf-8',
        });
      });
      // Create list of review messages
      var items = [];
      $.each( root_data.messages, function( index ) {
        console.log(root_data.messages[index].author.name);
        items.push( "<p class='list-group-item'>" + root_data.messages[index].author.name+  " -- " + root_data.messages[index].message + "</p>");
      });
      console.log(items);
      $( "<div/>", {
        "class": "review-messages-list list-group",
        html: items.join( "" )
      }).appendTo($info);
      console.log('foo');

      // Create list of votes
      var review_items = [];
      $.each( root_data.labels, function( index ) {
        review_items.push( "<p> "+ index + "</p>");
        $.each( root_data.labels[index].all, function( innerindex ) {
          if ( typeof(root_data.labels[index].all[innerindex].value) !== 'undefined' ) {
          review_items.push( "<p class='list-group-item'>" + root_data.labels[index].all[innerindex].name +  " -- " + root_data.labels[index].all[innerindex].value + "</p>");
          }
        });
      });
      console.log(review_items);
      $( "<div/>", {
        "class": "code-review-list list-group",
        html: review_items.join( "" )
      }).appendTo($reviews);


      // Create list of files that have been changed
      var get_url = "/changes/" + data._number + "/revisions/" + data.current_revision + "/files";
      gerritGet( get_url, function (data) {
        var items = [];
        var file_root = '/#/c/' + root_data._number + '/' + root_data.revisions[root_data.current_revision]._number + '/';
        $.each( data, function( index ) {
          items.push( "<a href='" + file_root + index + "' class='list-group-item' id='" + index + "'>" + index + "</a>" );
        });
        $( "<div/>", {
          "class": "files-modified-list list-group",
          html: items.join( "" )
        }).appendTo($files);
        console.log('remove the styles');
        setTimeout(function() { $('style').remove(); }, 5000);
      });

      // Create commit message box
      var get_url = "/changes/" + data._number + "/revisions/" + data.current_revision + "/commit?links";
      gerritGet( get_url, function (data) {
        console.log(data.message);
        $( "<div/>", {
          "class": "commit-message-list list-group",
          html: "<p id='commit-message' class='list-group-item'>" +  data.message + "</p>",
        }).appendTo($message);
      });
    });


  }).fail(function(data) {
    console.log("Failed " + data);
  });
});

//console.log('sup2');
//render(
//    <h1>Hello, World from WebPack!</h1>,
//    document.getElementById("main")
//)
