import { 
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker  
 } from '@ionic-native/google-maps';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ColheitaProvider } from '../../providers/colheita/colheita';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [
    ColheitaProvider
  ]

})

export class AboutPage {

  map:GoogleMap;

  constructor(
    public navCtrl: NavController, 
    public colheitaProvider: ColheitaProvider, 
    private nativeStorage: NativeStorage
  ) {

  }

  ionViewDidLoad(){
    this.loadMapR();
  }

  loadMapR() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: -23.5475,
          lng: -46.6361
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {

        // Now you can use all methods safely.
        this.map.addMarker({
            title: 'Ionic',
            icon: 'blue',
            animation: 'DROP',
            position: {
              lat: -23.5475,
              lng: -46.6361
            }
          })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });

      });
  }

  public salva(){
        this.nativeStorage.setItem('myitem', {property: 'value', anotherProperty: 'anotherValue'})
      .then(
        () => console.log('Stored item!'),
        error => console.error('Error storing item', error)
      );
  }

  public recupera(){
      this.nativeStorage.getItem('myitem')
      .then(
        data => console.log(data),
        error => console.error(error)
      );
  }

  public teste(){
    this.colheitaProvider.getInstituicoes().subscribe(
      data=>{
        console.log(data)
      },
      error=>{
        console.log(error)
      }
    )
  }

}
