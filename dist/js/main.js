$(function () {

  new WOW().init();

  let images = document.querySelectorAll(".header-content__item-img");
  let items = document.querySelectorAll(".header-content__item");
  let galleryImg = document.querySelectorAll(".gallery-images__item-img");
  let galleryTitle = document.querySelectorAll(".gallery-images__item-title")

  for (let item of items) {
    item.addEventListener('mouseover', () => {
      for (let elem of items) {
        elem.className += " inactive"
      }
      item.className = "header-content__item active"
    });
    item.addEventListener('mouseout', () => {
      for (let elem of items) {
        elem.className = "header-content__item"
      }
    })
  }

  $('.reviews__slider').slick({
    dots: true,
    dotsClass: 'slick-dots',
    arrows: false,
    infinite: true,
    autoplay: true,
    fade: true,
  })

  let windowWidth = document.documentElement.clientWidth;
  if (windowWidth > 850) {
    for (let img of galleryImg) {
      img.style.width = (windowWidth / 4) + "px";
      img.style.height = ((windowWidth / 4) * 0.924) + "px";
    }
  } else {
    for (let img of galleryImg) {
      img.style.width = (windowWidth / 2) + "px";
      img.style.height = ((windowWidth / 2) * 0.924) + "px";
    }
  }

});