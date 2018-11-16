    var map; // creamos variables
    var marker;var flightPath;
    var flightPath2;
    var myLatLng1; var myLatLng2;
    var circulo;var rp = [];
    var miref; var miref2;
    var coorhist;
    var coorhist1= [];
    var coorhist2 = [];
    var limsup;var limsup2;
    var rectangle;
    var infoWindow;
    var lati = [];var lati2 = [];
    var longi = [];var longi2 = [];
    var datet = [];var datet2 = [];
    var markers2 = [];var markers3 = [];
    var ts1;
    ts1 = document.getElementById("mySelect").selectedIndex;
    $('#mySelect').on('change', function(){
		ts1 = document.getElementById("mySelect").selectedIndex;
	});
        
     function refresh1(){
           var inicio = document.getElementById("bd-desde").value;
           inicio = inicio.replace("T", " ");
           var fin = document.getElementById("bd-hasta").value;
           fin = fin.replace("T"," ");
           var dat = inicio + ":" + fin;
           if(inicio == ":00" || fin == ":00" || inicio > fin) {
        alert("Por favor, ingrese un rango de fechas válido");
        }
           else{
               var return_first = function(){
                         var tmp = null;
                         $.ajax({
                           'async': false,
                           'type': "POST",
                           'global': false,
                           'dataType': 'html',
                           'url': "datah.php",
                           'data' : { desde : inicio, hasta : fin },
                           'success': function (data) {
                            tmp = data;
                    }
            });
                return tmp;
            }();
            var ret_first = function(){
                var tmp = null;
                $.ajax({
                  'async': false,
                  'type': "POST",
                  'global': false,
                  'dataType': 'html',
                  'url': "rpmhist.php",
                  'data' : { desde : inicio, hasta : fin },
                  'success': function (data) {
                   tmp = data;
           }
   });
       return tmp;
   }();
   var rpm1 = ret_first.split("\n");
   var ncom = rpm1.length;
   for(var k = 0; k < ncom -1; k++) {
       var rpm = rpm1[k].split(" ");
       rp[k] = parseFloat(rpm[0]);
       
       }          
            var return_first2 = function(){
                         var tmp1 = null;
                         $.ajax({
                           'async': false,
                           'type': "POST",
                           'global': false,
                           'dataType': 'html',
                           'url': "datah2.php",
                           'data' : { desde : inicio, hasta : fin },
                           'success': function (data) {
                            tmp1 = data;
                    }
            });
                return tmp1;
            }();
             if(return_first == "") {
                alert("No se encontraron datos en esas fechas");
                }
               else{
                if (coorhist1 != []) {
                miref = [];
                initMap();
                    }
                coorhist = return_first.split("\n");
                limsup = coorhist.length - 1;
                for(var k = 0; k < coorhist.length - 1; k++) {
                coorhist1 = coorhist[k].split(" ");
                lati[k] = coorhist1[0];
                longi[k] = coorhist1[1];
                datet[k] = coorhist1[2]+ " " +coorhist1[3]; 
                }
               }
               if(return_first2 == "") {
                alert("No se encontraron datos en esas fechas");
                }else{
                    if (coorhist2 != []) {
                miref2 = [];
                initMap();
                    }
                coorhist = return_first2.split("\n");
                limsup2 = coorhist.length - 1;
                for(var k = 0; k < coorhist.length - 1; k++) {
                coorhist2 = coorhist[k].split(" ");
                lati2[k] = coorhist2[0];
                longi2[k] = coorhist2[1];
                datet2[k] = coorhist2[2]+ " " +coorhist2[3];
                }
                }
               }setInterval(refresh1,1200000); 
         for(m=0;m<=lati.length - 2;m++){
             refrescar_marcador(lati[m], longi[m],datet[m],rp[m]);
             refrescar_marcado2r(lati2[m],longi2[m],datet2[m]);
         }
         lat = parseFloat(lati[limsup - 2]);
         long = parseFloat(longi[limsup-2]);
         myLatLng1 = {lat: lat, lng: long};
         lat = parseFloat(lati2[limsup2 - 2]);
         long = parseFloat(longi2[limsup2-2]);
         myLatLng2 = {lat: lat, lng: long};
         if(ts1==1){
             myLatLng2 = null;
         }
         if(ts1==2){
             myLatLng1 = null;
         }
         firstlastM();
         polilinea2();
           }
    function initMap() { // Inicio el mapa con los recursos que me da api
      var mapDiv = document.getElementById('map');
      map = new google.maps.Map(mapDiv, {
        center: new google.maps.LatLng(	11.01929, -74.85165), 
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP//'terrain' 
      });
         var lat = parseFloat(lati[limsup-2]);
         var long = parseFloat(longi[limsup-2]);
         var amst = new google.maps.LatLng({lat: lat,lng: long});
            circulo = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            center: amst,
            radius: 250,
            draggable:true,editable:true, visible:false
          });
         }
function refrescar_marcador(latitude, longitude,fecha,Rpmh)
    {
      markers2.push(new google.maps.Marker({  // función de api para crear marcador
        position: new google.maps.LatLng(latitude, longitude), // posición con coor[0] y coor[1]
        map: map,
        icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        },
        title: "Fecha y hora: " + fecha + " RPM: " + Rpmh,visible:false,
         // Titulo para el marcador, es opcional.. no es necesario.. bla bla bla
       }));
      miref.push(new google.maps.LatLng(latitude, longitude));
      polilinea();
    if(ts1==0){
        map.setCenter(new google.maps.LatLng(latitude, longitude)); 
    }
    if(ts1==1){
        map.setCenter(new google.maps.LatLng(latitude, longitude)); 
    }
    }

   function putcircle(){
        circulo.setVisible();
        circulo.addListener('radius_changed',hidemakers);
        circulo.addListener('drag',hidemakers);
    }
    function hidemakers(e){
        var ne = circulo.getBounds().getNorthEast();
        var sw = circulo.getBounds().getSouthWest();
        var lt = ne.lat(); var lg = ne.lng();
        var lt1 = sw.lat(); var lg2 = sw.lng();
        lt = Math.trunc(100000*lt)/100000;
        lg = Math.trunc(100000*lg)/100000;
        lt1 = Math.trunc(100000*lt1)/100000;
        lg2 = Math.trunc(100000*lg2)/100000;
    var epl= new google.maps.LatLng({lat:lt,lng:lg});
    var epl2= new google.maps.LatLng({lat:lt1,lng:lg2});
    var i6=-1;
        if(ts1==0){
            markers2.forEach(function(element) {
            var bounds = new google.maps.LatLngBounds(
            new google.maps.LatLng({lat:lt1,lng:lg2}),
            new google.maps.LatLng({lat:lt,lng:lg})
            );
        center = new google.maps.LatLng({lat:element.getPosition().lat(),lng:element.getPosition().lng()})
      
        x = bounds.contains(center);
    i6++;
    if (x) {
    element.setVisible(true);
    }
    else {
      element.setVisible(false);

    }
    });
            markers3.forEach(function(element) {
            var bounds = new google.maps.LatLngBounds(
            new google.maps.LatLng({lat:lt1,lng:lg2}),
            new google.maps.LatLng({lat:lt,lng:lg})
            );
        center = new google.maps.LatLng({lat:element.getPosition().lat(),lng:element.getPosition().lng()})
      
        x = bounds.contains(center);
    i6++;
    if (x) {
    element.setVisible(true);
    }
    else {
      element.setVisible(false);

    }
    });
     }
        if(ts1==1){
            markers2.forEach(function(element) {
        var bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng({lat:lt1,lng:lg2}),
        new google.maps.LatLng({lat:lt,lng:lg})
        );
        center = new google.maps.LatLng({lat:element.getPosition().lat(),lng:element.getPosition().lng()})
      
        x = bounds.contains(center);
    i6++;
    if (x) {
    element.setVisible(true);
    }
    else {
      element.setVisible(false);

    }
    });
     }
        if(ts1==2){
            markers3.forEach(function(element) {
        var bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng({lat:lt1,lng:lg2}),
        new google.maps.LatLng({lat:lt,lng:lg})
        );
        center = new google.maps.LatLng({lat:element.getPosition().lat(),lng:element.getPosition().lng()})
      
        x = bounds.contains(center);
    i6++;
    if (x) {
    element.setVisible(true);
    }
    else {
      element.setVisible(false);

    }
    });
     }
    
}
    function refrescar_marcado2r(latitude, longitude,fecha)
    {
      markers3.push(new google.maps.Marker({  // función de api para crear marcador
        position: new google.maps.LatLng(latitude, longitude), // posición con coor[0] y coor[1]
        map: map,
        title: "Fecha y hora: " + fecha,
        visible:false,
         // Titulo para el marcador, es opcional.. no es necesario.. bla bla bla
       }));
      miref2.push(new google.maps.LatLng(latitude, longitude));
      polilinea2();
    if(ts1==2){
        map.setCenter(new google.maps.LatLng(lati2[limsup2 - 2], longi2[limsup2-2]));
    }
    }    
    function firstlastM(){
      var marker = new google.maps.Marker({  // función de api para crear marcador
        position: myLatLng1, // posición con coor[0] y coor[1]
        map: map,
        label: "Vehículo 1",
        icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        }
       });
        var marker1 = new google.maps.Marker({  // función de api para crear marcador
        position: myLatLng2, // posición con coor[0] y coor[1]
        map: map,
        label: "Vehículo 2",
       });
      }
      function polilinea() {
        flightPath = new google.maps.Polyline({
        path:miref,
        strokeColor:"#0000FF",
        strokeOpacity:0.2,
        strokeWeight:3
      });
      flightPath.setMap(map);
          if(ts1==2){
              flightPath.setMap(null);
          }
    }
    function polilinea2() {
        flightPath2 = new google.maps.Polyline({
        path:miref2,
        strokeColor:"#FF0000",
        strokeOpacity:0.2,
        strokeWeight:3
      });
      flightPath2.setMap(map);
        if(ts1 ==1){
            flightPath2.setMap(null);
        }
    }
    