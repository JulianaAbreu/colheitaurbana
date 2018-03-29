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
import { NavController, Platform, AlertController} from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ColheitaProvider } from '../../providers/colheita/colheita';
import { NativeStorage } from '@ionic-native/native-storage';
import { Geolocation } from '@ionic-native/geolocation';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation';
import { VisitaPage } from '../visita/visita';

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

  public loader;
  public refresher;
  public isRefreshing: boolean = false;

  diario  = new Array<any>();

  constructor(
    public navCtrl: NavController, 
    public platform: Platform,
    public colheitaProvider: ColheitaProvider, 
    private nativeStorage: NativeStorage,
    private geolocation: Geolocation,
    private deviceOrientation: DeviceOrientation,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad(): void {
    this.abreCarregando();
    setTimeout(()=>{
      this.loadMap();
    }, 1000);
    this.fechaCarregando();
  }

  abreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando...",
    });
    this.loader.present();
  }

  fechaCarregando(){
    this.loader.dismiss();
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

        this.colheitaProvider.getDiario().subscribe(
          data => {    
            this.diario = Array.of((data.json()[0]));

            for (var i = this.diario.length - 1; i >= 0; i--) {

              var visita = this.diario[i];

              this.map.addMarker({
                title: this.diario[i].instituicao.nome,
                icon: { url : "./assets/icon/"+ this.diario[i].instituicao.tipo +".png" },
                animation: 'DROP',
                position: {
                  lat: this.diario[i].instituicao.enderecos[0].latitude,
                  lng: this.diario[i].instituicao.enderecos[0].longitude
                }
                }).then(marker => {
                  marker.on(GoogleMapsEvent.MARKER_CLICK)
                    .subscribe(() => {

                      this.iniciarVisita(visita);                                                        

                    });
                });
  
          }


          },
          error => {
            console.log(error);
          }
        );

        

      });
  }

  iniciarVisita(visita){
    let confirm = this.alertCtrl.create({
      title: 'Iniciar visita?',
      message: 'Deseja iniciar visita em: <br><b> '+ visita.instituicao.nome + '</b> ?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            console.log('Visita cancelada');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.navCtrl.push(VisitaPage, { visita: visita });
          }
        }
      ]
    });
    confirm.present();

  }

  
}
