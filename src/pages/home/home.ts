import { 
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,  
  LatLng
 } from '@ionic-native/google-maps';
import { Component } from '@angular/core';
import { NavController, Platform} from 'ionic-angular';
import { ColheitaProvider } from '../../providers/colheita/colheita';
import { NativeStorage } from '@ionic-native/native-storage';
import { Geolocation } from '@ionic-native/geolocation';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    ColheitaProvider
  ]

})
export class HomePage {
    
  map:GoogleMap;
  orientacao:any;

  constructor(
    public navCtrl: NavController, 
    public platform: Platform,
    public colheitaProvider: ColheitaProvider, 
    private nativeStorage: NativeStorage,
    private geolocation: Geolocation,
    private deviceOrientation: DeviceOrientation,
    
  ) {
  }

  ionViewDidLoad(){
    this.loadMap();
  }

  bussola() {
      // Get the device current compass heading
      this.deviceOrientation.getCurrentHeading().then(
        (data: DeviceOrientationCompassHeading) => data,
        (error: any) => console.log(error)
      );    
      // Watch the device compass heading change
      var subscribe = this.deviceOrientation.watchHeading().subscribe(
        (data: DeviceOrientationCompassHeading) => data.magneticHeading,
      );
      return subscribe;   
  }

  loadMap() {

    let localizacao : LatLng;
    this.geolocation.getCurrentPosition().then((resp) => {
      localizacao = new LatLng(resp.coords.latitude, resp.coords.longitude);
    }).catch((error) => {
      alert("Não foi possível achar sua localização atual!");
    });


    let mapOptions: GoogleMapOptions = {
      
      controls: { compass: true,
                  myLocationButton: true, // GEOLOCATION BUTTON 
                  indoorPicker: true, 
                  zoom: true }, 
      gestures: { scroll: true, 
                  tilt: true, 
                  rotate : true, 
                  zoom : true },
      camera: {
        target: { 
          lat: -23.5788453, // São Paulo
          lng: -46.6092952  // São Paulo
        },
        zoom: 11.5,
        tilt: 80,
        bearing: 0
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {

        // Habilita minha localização
        this.map.setMyLocationEnabled(true);
        
        this.map.setTrafficEnabled(true);

        this.map.animateCamera({
          target: localizacao,
          tilt: 60,
          zoom: 18,
          bearing: 333,
          duration: 2500 // = 5 sec.
        });

        // Doadora
        this.map.addMarker({
          title: 'Doadora',
          icon: { url : "./assets/icon/doadora.png" },
          animation: 'DROP',
          position: {
            lat: -23.561184,
            lng: -46.567688
          }
        })
        .then(marker => {
          marker.on(GoogleMapsEvent.MARKER_CLICK)
            .subscribe(() => {
              confirm('Deseja iniciar uma visita neste local?');
            });
        });

        // Receptora
        this.map.addMarker({
          title: 'Receptora',
          icon: { url : "./assets/icon/receptora.png" },
          animation: 'DROP',
          position: {
            lat: -23.5401161,
            lng: -46.6242617
          }
        })
        .then(marker => {
          marker.on(GoogleMapsEvent.MARKER_CLICK)
            .subscribe(() => {
              confirm('Deseja iniciar uma visita neste local?');
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
