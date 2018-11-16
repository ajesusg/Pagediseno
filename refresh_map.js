        setInterval(refresh, 7000);
        setInterval(refresh2, 7000);
        var map;
        var marker;
        var miref1=[];
        var miref2=[];
        $(window).load(refresh());
        $(window).load(refresh2());
        function refresh() {
            var return_first = function(){
                var tmp = null;
              $.ajax({
              'async': false,
              'type': "POST",
              'global': false,
              'dataType': 'html',
              'url': "data.php",
              'success': function (data) {
                  tmp = data;
              }
          }); return tmp;
            }();
            var data1 = return_first.split("\n");
            var longElement = document.getElementById("ID1"); 
             longElement.textContent = data1[0];
            var longElement = document.getElementById("lat1"); 
             longElement.textContent = data1[1];
            var longElement = document.getElementById("lon1"); 
             longElement.textContent = data1[2];
            var longElement = document.getElementById("fech1"); 
             longElement.textContent = data1[3];
            var longElement = document.getElementById("rpm"); 
             longElement.textContent = data1[4];
            refrescar_marcador(data1[1], data1[2]);
    }
        function refresh2(){
             var return_first1 = function(){
                var tmp = null;
              $.ajax({
              'async': false,
              'type': "POST",
              'global': false,
              'dataType': 'html',
              'url': "data2.php",
              'success': function (data) {
                  tmp = data;
              }
          }); return tmp;
            }();
            var data1 = return_first1.split("\n");
            var longElement = document.getElementById("ID2"); 
             longElement.textContent = data1[0];
            var longElement = document.getElementById("lat2"); 
             longElement.textContent = data1[1];
            var longElement = document.getElementById("lon2"); 
             longElement.textContent = data1[2];
            var longElement = document.getElementById("fech2"); 
             longElement.textContent = data1[3];
            refrescar_marcador2(data1[1], data1[2]);
        }
        function initMap() {
        var mapDiv = document.getElementById('map');
        map = new google.maps.Map(mapDiv, {
        center: new google.maps.LatLng(11.01872, -74.85061), 
        zoom: 14, // hacemos zoom para acercar mapa
        mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        }
     function refrescar_marcador(latitude, longitude)
    {
      var coor = new google.maps.LatLng(latitude, longitude);
      miref1.push(coor);    
      polilinea();
      var marker = new google.maps.Marker({  // función de api para crear marcador
        position: new google.maps.LatLng(latitude, longitude), 
        map: map,
        label: "Vehículo 1",
        icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        }
       });
        map.setCenter(new google.maps.LatLng(latitude, longitude));
    }
     function refrescar_marcador2(latitude, longitude)
    {
      miref2.push(new google.maps.LatLng(latitude, longitude));
      polilinea();
        polilinea1();
      var marker = new google.maps.Marker({  // función de api para crear marcador
        position: new google.maps.LatLng(latitude, longitude), 
        map: map,
        label: "Vehículo 2",
       });
      //map.setCenter(new google.maps.LatLng(latitude, longitude)); 
    }
      function polilinea() {
      var flightPath = new google.maps.Polyline({
        path:miref1,
        strokeColor:"#0000FF",
        strokeOpacity:0.8,
        strokeWeight:2
      });
      flightPath.setMap(map);
    }
        function polilinea1() {
      var flightPath = new google.maps.Polyline({
        path:miref2,
        strokeColor:"#FF0000",
        strokeOpacity:0.8,
        strokeWeight:2
      });
      flightPath.setMap(map);
    }