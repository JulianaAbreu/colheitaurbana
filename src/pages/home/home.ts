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

  diario = new Array<any>();

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

  loadMap() {
    
    let localizacaoinicial : LatLng;
    this.geolocation.getCurrentPosition().then((resp) => {
      localizacaoinicial = new LatLng(resp.coords.latitude, resp.coords.longitude);
    }).catch((error) => {
      alert("Não foi possível achar sua localização atual!");
    });

    this.geolocation.watchPosition().subscribe((data2) => {   
       //this.map.setCameraTarget(new LatLng(data2.coords.latitude, data2.coords.longitude));
       this.map.animateCamera({
        target:  {lat: data2.coords.latitude, lng: data2.coords.longitude},
        bearing: data2.coords.heading,
        duration: 1000 // = 1 sec.
      });          
    })

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
        zoom: 12,
        tilt: 80
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {

        // Habilita botão da minha localização
        this.map.setMyLocationEnabled(true);
        
        // Habilita o tráfego
        //this.map.setTrafficEnabled(true);

        this.map.animateCamera({
          target:  localizacaoinicial,
          bearing: 0,
          zoom: 18,
          duration: 4000 // = 1 sec.
        });

        // Banco de Alimentos
        this.map.addMarker({
          title: 'Banco de Alimentos',
          icon: { url : "./assets/icon/banco-de-alimentos-pin.png" },
          animation: 'DROP',
          position: {
            lat: -23.5396133,
            lng: -46.6704244
          }
        })

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
