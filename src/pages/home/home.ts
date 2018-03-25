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
import { NavController} from 'ionic-angular';
import { ColheitaProvider } from '../../providers/colheita/colheita';
import { NativeStorage } from '@ionic-native/native-storage';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    ColheitaProvider
  ]

})
export class HomePage {
  
  map:GoogleMap;

  constructor(
    public navCtrl: NavController, 
    public colheitaProvider: ColheitaProvider, 
    private nativeStorage: NativeStorage,
    private geolocation: Geolocation
  ) {

  }

  ionViewDidLoad(){
    this.loadMap();
  }
  
  


  loadMap() {
    
    let localizacao : LatLng;
    this.geolocation.getCurrentPosition().then((resp) => {
      localizacao = new LatLng(resp.coords.latitude, resp.coords.longitude);
    }).catch((error) => {
      console.log('Erro ao tentar conseguir sua localização', error);
    });

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: -23.5396133, // Coordenadas do Banco de Alimentos
          lng: -46.6704244  // Coordenadas do Banco de Alimentos
        },
        zoom: 12,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {

        // Minha localização.
        this.map.addMarker({
          title: 'Eu',
          icon: { url : "./assets/icon/eu.png" },
          animation: 'DROP',
          position: localizacao
        });

        // Doadora
        this.map.addMarker({
          title: 'Doadora',
          icon: { url : "./assets/icon/doadora.png" },
          animation: 'DROP',
          position: {
            lat: -23.5083844,
            lng: -46.4731029
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
