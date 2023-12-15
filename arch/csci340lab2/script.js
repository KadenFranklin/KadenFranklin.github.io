$("#Submit_button").on("click", function() {
    console.log("Oh boy here we go!");
    var city = $("#City").val();
    var state  = $("#State").val();
    var norad = $("#Norad_ID").val();

    var weat_url_1 = "https://goweather.herokuapp.com/weather/%7B" ;
    var weat_url_2 = "%7D" ;
    var combo_2 = weat_url_1 + city + "-" + state + weat_url_2;

    $.ajax(combo_2, {
      success: function (data) {
        console.log(data);
        $.each(data, function(key, value){
          if (key == 'temperature') { $("#w-day-0-temp").text(value); }
          if (key == "wind") { $("#w-day-0-wind").text(value); }
          if (key == "description") { $("#w-day-0-desc").text(value); }
          if (key == "forecast") {
            $.each(value, function(index, val) {
              if (index == "0") {
                $.each(val, function(key, v) {
                  if (key == 'temperature') { $("#w-day-1-temp").text(v); }
                  if (key == "wind") { $("#w-day-1-wind").text(v); }
                });
              }
              if (index == "1") {
                $.each(val, function(key, v) {
                  if (key == 'temperature') { $("#w-day-2-temp").text(v); }
                  if (key == "wind") { $("#w-day-2-wind").text(v); }
                });
              }
              if (index == "2") {
                $.each(val, function(key, v) {
                  if (key == 'temperature') { $("#w-day-3-temp").text(v); }
                  if (key == "wind") { $("#w-day-3-wind").text(v); }
                });
              }
            });
          }
        });
      }
    });

    var coor_url_1 = "https://api.opencagedata.com/geocode/v1/json?q=";
    var coor_url_2 = "&key=274df8982be3470b9b369075e615ba0f&abbrv=1&pretty=1&no_annotations=1";
    var combo_1 = coor_url_1 + city + "-" + state + coor_url_2;

    $.ajax(combo_1, {
      success: function (data){
        console.log(data);
        $.each(data, function(key, value){
          if (key == "results") {
            $.each(value, function(index, val){
              if (index == "3"){
                $.each(val, function(i, v){
                  if (i == "geometry"){
                    $.each(v, function(cat, dog) {
                      if (cat == "lat") {
                        lat_coord = dog;
                      }
                      if (cat == "lng"){
                        lon_coord = dog;
                      }
                    });
                  }
                });
              }
            });
          }
        });

        var lat = "?lat=" + lat_coord ;
        var lon = "&lon=" + lon_coord ;
        var satt_url_1 = "https://satellites.fly.dev/passes/";
        var satt_url_2 = "&limit=1&days=1";
        var combo_3 = satt_url_1 + norad + lat + lon + satt_url_2;

        $.ajax({
          url: combo_3,
          type: "GET",
          dataType: 'json',
          success: function(data) {
            console.log(data);
            $.each(data, function(list, values){
              $.each(values, function(key, value){
                if (key == "rise") {
                  $.each(value, function(k, v){
                    if (k == "alt") { $("#s-rise-alt").text(v); }
                    if (k == "az") { $("#s-rise-az").text(v); }
                    if (k == "utc_datetime") { $("#s-rise-time").text(v); }
                  });
                }
                if (key == "culmination") {
                  $.each(value, function(k, v){
                    if (k == "alt") { $("#s-culm-alt").text(v); }
                    if (k == "az") { $("#s-culm-az").text(v); }
                    if (k == "utc_datetime") { $("#s-culm-time").text(v); }
                  });
                }
                if (key == "set") {
                  $.each(value, function(k, v){
                    if (k == "alt") { $("#s-set-alt").text(v); }
                    if (k == "az") { $("#s-set-az").text(v); }
                    if (k == "utc_datetime") { $("#s-set-time").text(v); }
                  });
                }
                if (key == "visible") {
                  $("#visible").text(value);
                }
              });
            });
          }
        });
      }
    });
  });
