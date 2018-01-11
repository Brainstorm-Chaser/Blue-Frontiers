
//country code options
const countryCode = {
    US: 'Welcome!',
    FR: 'Bienvenue!',
    IT: 'Benvenuto!',
    MX: 'Bienvenido!'
  };

  const translate = {
    top: {
      FR: 'contrairement à la croyance populaire, lorem ipsum n\'est pas un simple texte aléatoire.',
      US: 'contrary to popular belief, lorem ipsum is not simply random text.'
    },
    login: {
      FR: 's\'identifier',
      US: 'login'
    },
    signup: {
      FR: 's\'inscrire',
      US: 'signup'
    }
  }

  // english or french translaction when clicked
  $('.translate').click(function(){
    $('.translate').removeClass('active');
    var $lang = $(this).attr('id').toUpperCase();
    $(this).addClass('active');
    sessionStorage.setItem('perfLang', $lang); 
    $('#header').text(countryCode[$lang]);
    $('#subHeader').text(translate.top[$lang]);
    $('.login').text(translate.login[$lang]);
    $('.signup').text(translate.signup[$lang]);
  });
    //login screen slide animation
  $('.accounts').click(function(){
    $('.top-wrapper').slideUp('slow');
    if($(this).attr('id') === 'login'){
      // show login
      $('.login-wrap').slideDown(2500);
    } else {
      $('.signup-wrap').slideDown(2500);
    }
  });
$('.remove').click(function(){
  $('.login-wrap, .signup-wrap').slideUp('slow');
  $('.top-wrapper').slideDown(2500);
});

  // check if user has a selected perferred language for their browser page session
  // else display welcome in country of origin and the rest of the site in english unless orgin is france
  $( document ).ready(function() {
    if (sessionStorage.getItem("perfLang") === null) {
      $.ajax({
        url: 'http://freegeoip.net/json/',
        type: 'GET',
        dataType: 'jsonp',
        success: function(location) {
           $('#header').text(countryCode[location.country_code]);
          if(location.country_code === 'FR'){
            $('#subHeader').text(translate.top[location.country_code]);
            $('.login').text(translate.login[location.country_code]);
            $('.signup').text(translate.signup[location.country_code]);
            // Show FR as primary and have a drop down for english toggle
          }
          else if (location.country_code === 'US') {
            $('#subHeader').text(translate.top[location.country_code]);
            $('.login').text(translate.login[location.country_code]);
            $('.signup').text(translate.signup[location.country_code]);
            // Show EN as primary and have a drop down for french toggle
          }
        }
      }); 
    } else {
      var perfLang = sessionStorage.getItem("perfLang");
      $('.translate').removeClass('active');
      if(perfLang === 'US'){
        $('#us').addClass('active');
      }else {
        $('#fr').addClass('active');
      }

      $('#header').text(countryCode[perfLang]);
      $('#subHeader').text(translate.top[perfLang]);
      $('.login').text(translate.login[perfLang]);
      $('.signup').text(translate.signup[perfLang]);

    }
      //JQuery to render current Date and Time to browser
    $('#date').text(showCurrentDate());
    $('#time').text(showCurrentTime());
    showCurrency();
    showbitCoin();
  });
    //render Date to browser
  function showCurrentDate() {
    var date = new Date($.now());
    var currentDate = date.toDateString(); 
    return currentDate;
  }
    //render time to browser
  function showCurrentTime() {
    var currentTime = new Date();
    currentTime = currentTime.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', hour12: true });
    return currentTime
  }
    //get results from blockchain api and render USD section in Bitcoin ticker using JQuery
  function showCurrency(){
    $.ajax({
      url: 'https://api.fixer.io/latest',
      type: 'GET',
      dataType: 'jsonp',
      success: function(results) {
        var usd = results.rates.USD
        $('#usd').text("USD: " + usd);
      }
    });
      //get results from blockchain api and render EUR section in Bitcoin ticker using JQuery
    $.ajax({
      url: 'https://api.fixer.io/latest?base=USD',
      type: 'GET',
      dataType: 'jsonp',
      success: function(resultes) {
        var eur = resultes.rates.EUR
        // console.log(eur)
        $('#eur').text("EUR: " + eur);
      }
    }); 
  }
    //get results from blockchain api and render Bitcoin ticker to screen using JQuery
  function showbitCoin(){
    $.ajax({
      url: 'http://blockchain.info/ticker',
      type: 'GET',
      dataType: 'json',
      success: function(tickers) {
        console.log(tickers);
        var uSymb = tickers.USD.symbol;
        var eSymb =  tickers.EUR.symbol;
        var usd = tickers.USD.buy;
        var eur = tickers.EUR.buy;
        $('#bUsd').text("BITCOIN: " + uSymb + usd);
        $('#bEur').text("BITCOIN: " + eSymb + eur);
      }
    });
  }