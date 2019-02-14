$(document).ready(function() {
  $(".slider .owl-carousel").owlCarousel({
    loop: true,
    margin: 0,
    nav: true,
    dots: false,
    navText: [],
    responsive: {
      0: {
        items: 1,
        dots: true,
        nav: false
      },
      480: {
        items: 1
      }
    }
  });
  $(".carousel").owlCarousel({
    loop: true,
    margin: 30,
    nav: true,
    dots: false,
    navText: [],
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 2
      },
      680: {
        items: 3
      },
      1024: {
        items: 4
      }
    }
  });

  const iconSearch = document.querySelector(".icon__search");
  const body = document.querySelector("body");

  iconSearch.addEventListener("click", function(event) {
    event.stopPropagation();
    this.classList.add("icon__search--active");
  });

  body.addEventListener("click", function(event) {
    iconSearch.classList.remove("icon__search--active");
  });
});
