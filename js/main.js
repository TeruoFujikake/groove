'use strict';

// header bgの動き
{
  const headerWrap = document.getElementById('header-wrap');
  const mainWrap = document.getElementById('main-wrap');
  const mainHeight = mainWrap.clientHeight;

  window.addEventListener('scroll', function() {
    let winScrollY = window.scrollY;

    if (winScrollY > mainHeight) {
      headerWrap.classList.add('header-bg');
    } else if (winScrollY < mainHeight) {
      headerWrap.classList.remove('header-bg');
    }
  });
}


// MainVisualの動き
{
  let imageItems = document.querySelectorAll('#slide-img-wrap > p')
  imageItems = Array.prototype.slice.call(imageItems); // ie対策

  let currentIndex = 0;

  function slideImage() {
    if (currentIndex === imageItems.length) {
      currentIndex = 0;
    }

    imageItems.forEach(function(image) {
      image.classList.remove('slide-index');
      image.style.display = 'none';
    });

    imageItems[currentIndex].style.display = 'block';
    imageItems[currentIndex].classList.add('slide-index');
    currentIndex++;

    setTimeout(function() {
      slideImage();
    }, 6000);
    // setTimeout(slideImage, 6000); // ←1行で書ける
  }

  setTimeout(slideImage, 1500);
}


$(function() {
  // スクロールで要素が表示された時にclassを付与する
  $(window).on('load scroll', function() {
    $(".scroll-in").each(function(){
      var imgPos = $(this).offset().top;
      var scroll = $(window).scrollTop(); //スクロールの上下位置を取得
      var windowHeight = $(window).height(); //ウィンドウの高さを取得

      // 画面を7に分割して、ウインドウ下の7分の1にきたら処理
      if (scroll > imgPos - windowHeight + (windowHeight / 7)){
        $(this).addClass('is-show');
      }
    });
  });

  // animationを無効化にしないと、imgがscaleしない
  $('.img-in-01, .img-in-02, .img-in-03').on('animationend', function() {
    $(this).css('animation','none');

    // $.proxy( ～ , this) をかませば this の値が上のthisと同じになる
    setTimeout($.proxy(function() {
      $(this).addClass('is-scale');
    }, this), 100);
  });
});

// スクロールで要素が表示された時にclassを付与する ver2
// $(function() {
//   $(window).on('load scroll', function() {
//       add_class_in_scrolling($('.sample1'));
//       add_class_in_scrolling($('.sample2'));
//       add_class_in_scrolling($('.sample3'));
//   });

//   function add_class_in_scrolling(target) {
//       var imgPos = target.offset().top;
//       var winScroll = $(window).scrollTop(); //スクロールの上下位置を取得
//       var winHeight = $(window).height(); //ウィンドウの高さを取得

//       if(winScroll > imgPos - winHeight + (winHeight / 8)) {
//           target.addClass('is-show');
//       }
//   }
// });


// bannerの動き
{
  let bannerImages = document.querySelectorAll('#banner-wrap img');
  bannerImages = Array.prototype.slice.call(bannerImages); // ie対策

  const bannerWrap = document.getElementById('banner-wrap');

  const imgInBanner = document.querySelector('.img-in-banner');

  let currentIndex = 1;
  let isPlaying = false;

  function showBanner() {
    if (currentIndex === bannerImages.length) {
      currentIndex = 0;
    }

    bannerImages.forEach(function(image) {
      image.classList.remove('is-show-banner');
      image.style.display = 'none';
    });

    bannerImages[currentIndex].style.display = 'block';
    bannerImages[currentIndex].classList.add('is-show-banner');
    currentIndex++;

    setTimeout(function() {
      showBanner();
    }, 6000);
  }

  imgInBanner.addEventListener('animationend', function() {
    if (isPlaying === true) {
      return;
    }
    isPlaying = true;

    bannerImages[0].classList.remove('img-in-banner');
    bannerImages[0].classList.add('first-slide');
    bannerWrap.classList.add('bg-banner-color');
    bannerWrap.classList.add('scale-banner');
    // bannerWrap.classList.add('bg-banner-color', 'scale-banner');

    setTimeout(function() {
      bannerImages[0].classList.remove('first-slide');
      showBanner();
    }, 6000);
  });
}


// ページ内、スムーススクロール
$(function(){
  $('a[href^="#"]').click(function(){
    const speed = 500;
    //リンク元を取得
    const href= $(this).attr("href");
    //リンク先を取得
    const target = $(href == "#" || href == "" ? 'html' : href);

    const header = $('header').innerHeight();
    const position = target.offset().top - header;
    $("html, body").animate({scrollTop:position}, speed, "swing");
    return false;
  });
});


// SP menu
{
  const menu = document.getElementById('menu');
  const spNav = document.getElementById('sp-nav');
  const navItems = document.querySelectorAll('#sp-nav a');

  menu.addEventListener('click', function() {
    if (menu.classList.contains('open')) {
      menu.classList.remove('open');
      menu.classList.add('close');

      spNav.animate({
        opacity: [1, 0],
        visibility: ['visible', 'hidden']
      }, {
        duration: 500,
        fill: 'forwards',
      });
    } else {
      menu.classList.remove('close');
      menu.classList.add('open');

      spNav.animate({
        opacity: [0, 1],
        visibility: ['hidden', 'visible']
      }, {
        duration: 500,
        fill: 'forwards',
      });
    }
  });

  navItems.forEach(function(item) {
    item.addEventListener('click', function() {
      // spの場合「:hover」擬似クラスだと動きが正常に行かない為、hoverクラス付ける→削除で解消
      item.classList.add('hover');

      setTimeout(function() {
        menu.click();
      }, 600);

      setTimeout(function() {
        item.classList.remove('hover');
      }, 1500);
    });
  });
}



// 三点リーダー
// {
//   const cutFigure = 10;
//   const afterTxt = '...';
//   const texts = document.querySelectorAll('.text');

//   texts.forEach(function(text) {
//     console.log(text.textContent);
//     const txtContent = text.textContent;
//     const textLength = txtContent.length;
//     const textTrim = txtContent.substring(0, cutFigure);
//     console.log(textTrim);

//     if (cutFigure < textLength) {
//       text.textContent = textTrim + afterTxt;
//     }
//   });
// }



// ▼ Intersection Observer API 2-1 js ▼
// {
//   function callback(entries, obs) {
//     console.log(entries);

//     entries.forEach(function(entry) {
//       if (!entry.isIntersecting) {
//         return;
//       }

//       entry.target.classList.add('appear');

//       監視を止めたい場合。止めないと画像が交差するたび発火、ブラウザに負荷がかかる。
//       obs.unobserve(entry.target);

//       // 下のやり方でelseの箇所を削除して実装する方法も有
//       // if (entry.isIntersecting) {
//       //   console.log(entry.target);
//       //   entry.target.classList.add('appear');
//       // } else {
//       //   entry.target.classList.remove('appear');
//       // }
//     });
//   }

//   const options =  {
//     threshold: 0.2,
//     // threshold: [0.2, 0.8], 1つの画像が20%, 80%の所で発火する
//   };

//   const observer = new IntersectionObserver(callback, options);

//   const targets = document.querySelectorAll('.animate');

//   targets.forEach(function(target) {
//     observer.observe(target);
//   });
// }

// ▼ Intersection Observer API 2-2 css ▼
// 下から上にフェードイン ver
// .animate {
//   opacity: 0;
//   transform: translateY(50px);
//   transition: opacity 1s, transform 1s;
// }

// .animate.appear {
//   opacity: 1;
//   transform: none;
// }