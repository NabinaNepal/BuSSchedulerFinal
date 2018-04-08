import { NgZone, Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { NavController, AlertController, Platform, IonicPage, NavParams } from 'ionic-angular';
declare var google;
var map, infowindow;
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

  latLng: any;
  markers: any;
  mapOptions: any;
  isKM: any = 500;
  isType: any;
  places: Array<any>;
  service: any;

  constructor(public navCtrl: NavController,
    public geolocation: Geolocation,
    public alertCtrl: AlertController,
    public platform: Platform, public ngZone: NgZone
  ) {
  }

  ionViewDidLoad() {
    this.initMap();
  }

  initMap() {
    //var pyrmont = {lat: -33.867, lng: 151.195};
    var pyrmont = { lat: 38.758034, lng: -93.739136 };

    map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: pyrmont,
      radius: 500,
      type: ['busstops']
    }, this.callback.bind(this));

    // this.platform.ready().then(() => {
    //   console.log("Device is ready! View did enter!");
    //   let options = {
    //     enableHighAccuracy: true,
    //     timeout: 10000,
    //     maximumAge: 0
    //   }
    //   this.geolocation.getCurrentPosition(options).then((resp) => {
    //     var pyrmont = { lat: resp.coords.latitude, lng: resp.coords.longitude };

    //     map = new google.maps.Map(document.getElementById('map'), {
    //       center: pyrmont,
    //       zoom: 15
    //     });

    //     infowindow = new google.maps.InfoWindow();
    //     var service = new google.maps.places.PlacesService(map);
    //     service.nearbySearch({
    //       location: pyrmont,
    //       radius: 500,
    //       type: ['store']
    //     }, this.callback.bind(this));
    //     // alert("My position: " + resp.coords.latitude + ", " + resp.coords.longitude);
    //   }).catch((error) => {
    //     alert("Error getting location Code: " + error.code + ", Message: " + error.message);
    //   });
    // });

  }


  createMarker(place) {
    console.log(place.geometry.location);
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function () {
      console.log(place);
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }

  callback(results, status) {
    console.log(results);
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      for (var i = 0; i < results.length; i++) {
        this.createMarker(results[i]);
      }
    }
  }




}