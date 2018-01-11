
// bitcoin widget event that pulls a live BTC price
(function(b,i,t,C,O,I,N) {
    window.addEventListener('load',function() {
      if(b.getElementById(C))return;
      I=b.createElement(i),N=b.getElementsByTagName(i)[0];
      I.src=t;I.id=C;N.parentNode.insertBefore(I, N);
    },false)
  })(document,'script','https://widgets.bitcoin.com/widget.js','btcwdgt');

// page scrolling code and jquery to write live BTC price to widget
(function($) {
  "use strict";

  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 54)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

})(jQuery);

var countryCode = {
  US: 'Welcome!',
  FR: 'Bienvenue!',
  IT: 'Benvenuto!',
  MX: 'Bienvenido!'
};

$('.translate').click(function(){
  var lang = $(this).attr('id').toUpperCase();
  $('#welcome').text(countryCode[lang]);
});

$.ajax({
  url: 'http://freegeoip.net/json/',
  type: 'GET',
  dataType: 'jsonp',
  success: function(location) {
    console.log(countryCode[location.country_code]);
    $('#welcome').text(countryCode[location.country_code]);
    if(location.country_code === 'US'){
      // remove english button
      //jquery to find id and .hide button
      $('.')
    } else if (location.country_code === 'FR') {
      // remove french button 
    }
  }
});
