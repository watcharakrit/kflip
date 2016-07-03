'use strict';

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

var KFlip = function KFlip($objContext) {

  'use strict';

  var $main = document.body.querySelector($objContext);
  var currentPage = 0;
  var pageStack = [];

  // goto
  this.gotoPage = function (pageName, animationName) {
    newPage(pageName, animationName).then(function ($newPage) {

      removeClassAnimation($newPage, animationName);

      if (pageStack.length > 0) {
        var $currentPage = $main.querySelector('#page-' + pageStack[currentPage - 1].pageId);
        addClassAnimation($currentPage, animationName + '-out').then(function ($outpage) {
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
  };

  // back
  this.prevPage = function () {
    if (pageStack.length > 1) {
      var animationName = pageStack[pageStack.length - 1].animationName;
      var outPage = pageStack[pageStack.length - 1].pageId;
      pageStack.pop();
      var prevPageDate = pageStack[pageStack.length - 1];
      var pageName = prevPageDate.pageId;
      console.log('prev');
      newPage(pageName, animationName + '-out').then(function ($newPage) {

        removeClassAnimation($newPage, animationName + '-out');

        var $outPage = $main.querySelector('#page-' + outPage);
        addClassAnimation($outPage, animationName).then(function ($outpage) {
          $outpage.remove();
        });

        currentPage--;
      });
    } else {
      console.log('first page is not have to back!!!');
    }
  };

  // rendering new page
  var newPage = function newPage(pageName, animationName) {
    return new Promise(function (resolve, reject) {

      console.log(pageName, animationName);
      var node = document.createTextNode(pageName);
      var page = document.createElement('div');
      page.id = 'page-' + pageName;

      if (pageStack.length > 0) {
        page.classList.add('animationing', animationName);
      }
      page.appendChild(node);

      // appearance page
      $main.appendChild(page);
      setTimeout(function () {
        resolve(page);
      }, 100);
    });
  };

  function removeClassAnimation(obj, animationName) {
    return new Promise(function (resolve) {
      obj.addEventListener('webkitTransitionEnd', function () {
        obj.classList.remove('animationing');
        resolve(obj);
      });

      obj.classList.remove(animationName);
    });
  }

  function addClassAnimation(obj, animationName) {
    return new Promise(function (resolve) {
      obj.addEventListener('webkitTransitionEnd', function () {
        obj.classList.remove('animationing');
        resolve(obj);
      });

      obj.classList.add(animationName);
    });
  }
};
//# sourceMappingURL=kflip.js.map
