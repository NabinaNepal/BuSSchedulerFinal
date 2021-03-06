import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, AlertController, Platform, IonicPage } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;
/**
 * Generated class for the TrackLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-track-location',
  templateUrl: 'track-location.html',
})
export class TrackLocationPage {


  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController,
    public geolocation: Geolocation,
    public alertCtrl: AlertController,
    public platform: Platform,
  ) {

    this.loadMap();
  }

  ionViewDidLoad() {
  }
  ionViewDidEnter() {
    this.platform.ready().then(() => {
      console.log("Device is ready! View did enter!");
      // let options = {
      //   enableHighAccuracy: true,
      //   timeout: 10000,
      //   maximumAge: 0
      // }
      // this.geolocation.getCurrentPosition(options).then((resp) => {
      //  // alert("My position: " + resp.coords.latitude + ", " + resp.coords.longitude);
      // }).catch((error) => {
      //   alert("Error getting location Code: " + error.code + ", Message: " + error.message);
      // });
    });
  }
  loadMap() {
    console.log('hello');
    this.platform.ready().then(() => {
      let options = {
        timeout: 30000,
        enableHighAccuracy: true
      }
      this.geolocation.getCurrentPosition(options).then((position) => {
        console.log(JSON.stringify(position));
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      // var latLng = new google.maps.LatLng(  38.758034,  -93.739136 );
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.addMarker(position.coords.latitude, position.coords.longitude);
      }, (err) => {
        console.log('error');
        alert(err);
        console.log(JSON.stringify(err));
      });
    })


  }

  addMarker(lat, lng) {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: {
        lat: lat,
        lng: lng
      }
    });

    let content = "<h4>I am here!</h4>";

    this.addInfoWindow(marker, content);

  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    infoWindow.open(this.map, marker);

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }
}
