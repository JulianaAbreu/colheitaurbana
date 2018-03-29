import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ColheitaProvider } from '../../providers/colheita/colheita';
import { NativeStorage } from '@ionic-native/native-storage';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers: [
    ColheitaProvider
  ]
})
export class ContactPage {

  public diario = new Array;
  public loader;
  public refresher;
  public isRefreshing: boolean = false;

  constructor(
    public navCtrl: NavController,
    public colheitaProvider: ColheitaProvider, 
    private nativeStorage: NativeStorage,
    public loadingCtrl: LoadingController
  
  ) {

  }


  ionViewDidEnter(){
    this.abreCarregando();
    this.LoadDiario();
    this.fechaCarregando();
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.LoadDiario();
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

  public LoadDiario(){
    this.colheitaProvider.getDiario().subscribe(
      data => {

        this.diario = Array.of((data.json()[0])); 
        
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }
      },

      error => {
        console.log(error);
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }
    );   
  }

}
