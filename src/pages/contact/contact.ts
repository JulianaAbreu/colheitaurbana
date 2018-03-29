import { VisitaPage } from './../visita/visita';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ColheitaProvider } from '../../providers/colheita/colheita';
import { NativeStorage } from '@ionic-native/native-storage';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

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
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  
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
