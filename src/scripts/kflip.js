/*!
 * KFlip JavaScript Library v0.0.1
 *
 *
 * Copyright : Watcharakrit Phantu
 * Released under the MIT license
 * https://github.com/watcharakrit/kflip
 *
 * Date: Thu Jun 30 2016 15:24:29 GMT+0700 (ICT)
 */

 // test on Chrome Browser only.

const KFlip = function( $objContext ){

  'use strict';

  const $main = document.body.querySelector( $objContext );
  let currentPage = 0;
  let pageStack = [];

  // goto
  this.gotoPage = function( pageName, animationName ) {
    newPage( pageName, animationName ).then( function( $newPage ) {

      $newPage.removeClassAnimation( animationName );

      if ( pageStack.length > 0 ) {
        var $currentPage = $main.querySelector( '#page-' + pageStack[currentPage-1].pageId );
        $currentPage.addClassAnimation( animationName + '-out' ).then( function( $outpage ) {
          $outpage.remove();
        });
      }

      // keep history
      pageStack.push({
        pageId: pageName,
        animationName: animationName
      });
      currentPage++;
    });
  }

  // back
  this.prevPage = function() {
    if ( pageStack.length > 1 ) {
      var animationName = pageStack[pageStack.length-1].animationName;
      var outPage = pageStack[pageStack.length-1].pageId;
      pageStack.pop();
      var prevPageDate = pageStack[pageStack.length-1];
      var pageName = prevPageDate.pageId;
      newPage( pageName, animationName + '-out' ).then( function( $newPage ) {

        $newPage.removeClassAnimation( animationName + '-out' );

        var $outPage = $main.querySelector( '#page-' + outPage );
        $outPage.addClassAnimation( animationName ).then( function( $outpage ){
          $outpage.remove();
        });

        currentPage--;
      });
    } else {
      console.log( 'first page is not have to back!!!');
    }
  }

  // rendering new page
  var newPage = function( pageName, animationName ) {
    return new Promise( function( resolve, reject ) {

      console.log(pageName, animationName);
      var node = document.createTextNode( pageName );
      var page = document.createElement('div');
      page.id = 'page-' + pageName;

      if ( pageStack.length > 0 ) {
        page.classList.add('animationing', animationName);
      }
      page.appendChild(node);

      // appearance page
      $main.appendChild(page);
      setTimeout(function(){
        resolve( page );
      }, 100);
    });
  };

  Object.prototype.removeClassAnimation = function( animationName ){
    var self = this;
    return new Promise( function( resolve ) {
      self.addEventListener( 'webkitTransitionEnd', function() {
        self.classList.remove('animationing');
        resolve(self);
      });

      self.classList.remove( animationName );
    });
  };

  Object.prototype.addClassAnimation = function( animationName ){
    var self = this;
    return new Promise( function( resolve ) {
      self.addEventListener( 'webkitTransitionEnd', function() {
        self.classList.remove('animationing');
        resolve(self);
      });

      self.classList.add( animationName );
    });
  };
}


var pageFlip = new KFlip('#main');

// Sequence Animation
var listAnimation = [
  { id: "1", animation: "fromRight"},
  { id: "2", animation: "flipFromRight"},
  { id: "3", animation: "flipFromTop"},
  { id: "4", animation: "fromTop"},
  { id: "2", animation: "fromRight"},
  { back: true },
  { back: true },
  { back: true },
  { back: true },
  { back: true }
];


var count = 0;
while( listAnimation.length > 0 ) {
  let data = listAnimation.shift();
  setTimeout( function() {
    if( 'back' in data ) {
      pageFlip.prevPage();
    } else {
      pageFlip.gotoPage( data.id, data.animation );
    }
  }, 1500 * count);
  count++;
}