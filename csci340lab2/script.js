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
        console.log(data)
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
      success: function (data) {
        console.log(data);
        //parse json to get coordinates(change these later)
        var lat_coord = "35.0887";
        var lon_coord = "92.4421";

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
          //fill satellite data
          $("#visible").text("")
          $("#s-rise-alt").text("");
          $("#s-rise-az").text("");
          $("#s-rise-time").text("");
          $("#s-culm-alt").text("");
          $("#s-culm-az").text("");
          $("#s-culm-time").text("");
          $("s-set-alt").text("");
          $("s-set-az").text("");
          $("s-set-time").text("");
        }
      });
      }
    });
  });
