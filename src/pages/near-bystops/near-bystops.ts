import { NgZone,Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { NavController, AlertController, Platform, IonicPage , NavParams} from 'ionic-angular';
declare var google;
/**
 * Generated class for the NearBystopsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-near-bystops',
  templateUrl: 'near-bystops.html',
})
export class NearBystopsPage {

  @ViewChild('map') mapElement: ElementRef;
  map:any;
  latLng:any;
  markers:any;
  mapOptions:any;  
  isKM:any=500;
  isType:any;
  places : Array<any> ; 
  service:any;

  constructor(public navCtrl: NavController,
    public geolocation: Geolocation,
    public alertCtrl: AlertController,
    public platform: Platform, public ngZone: NgZone
  ) {

    this.ionViewDidEnter();
  }

  ionViewDidLoad() {
  }
  ionViewDidEnter() {
    this.platform.ready().then(() => {
      console.log("Device is ready! View did enter!");
      let options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
      this.geolocation.getCurrentPosition(options).then((resp) => {
      //  alert("My position: " + resp.coords.latitude + ", " + resp.coords.longitude);
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      this.addMap(resp.coords.latitude,resp.coords.longitude);
      }).catch((error) => {
        alert("Error getting location Code: " + error.code + ", Message: " + error.message);
      });
    });
  }
  getRestaurants(latLng)
  {
      var service = new google.maps.places.PlacesService(this.map);
      let request = {
          location : latLng,
          radius : 500 ,
          types: ["restaurant"]
      };
      return new Promise((resolve,reject)=>{
          service.nearbySearch(request,function(results,status){
              if(status === google.maps.places.PlacesServiceStatus.OK)
              {
                  resolve(results);    
              }else
              {
                  reject(status);
              }
  
          }); 
      });

}
createMarker(place)
{
    let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: place.geometry.location
    });   
}  
addMap(lat,long){

  var pyrmont = new google.maps.LatLng(lat,long);

   this.map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15
    });

  var request = {
    location: pyrmont,
    radius: '500',
    type: ['bus_station','transit_station']
  };

  this.service = new google.maps.places.PlacesService(this.map);
  this.service.nearbySearch(request, this.callback);
 
}
callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      alert(place);
     this.addMarker(results[i]);
    }
    }
  }
  addMarker(place) {
    var marker = new google.maps.Marker({
      map: this.map,
      position: place.geometry.location,
      icon: {
        url: 'https://developers.google.com/maps/documentation/javascript/images/circle.png',
        anchor: new google.maps.Point(10, 10),
        scaledSize: new google.maps.Size(10, 17)
      }
    });
  
}

}