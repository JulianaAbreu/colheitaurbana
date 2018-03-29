import { ContactPage } from './../contact/contact';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

/**
 * Generated class for the VisitaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visita',
  templateUrl: 'visita.html',
})
export class VisitaPage {

  public visita;
  public id;
  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private qrScanner: QRScanner
  ) {
  }

  ionViewDidEnter() {
    this.visita = this.navParams.get("visita");
    this.id = 1;
  }

  removeItem(id){

  }

  validarQRCode(token){

  // Pega o elemento App no geral para ocultá-lo enquanto o Scan acontecer  
  var ionApp = <HTMLElement>document.getElementsByTagName("ion-app")[0];

  // Verifica se foi concedida a permissão da câmera
  this.qrScanner.prepare()
  .then((status: QRScannerStatus) => {
     if (status.authorized) {

       // Começa o Scan
       let scanSub = this.qrScanner.scan().subscribe((text: string) => {
         
         if(token == text){

            let alert = this.alertCtrl.create({
              title: 'VISITA FINALIZADA!',
              subTitle: 'A visita foi salva com sucesso!',
              buttons: ['Fechar']
            });
            alert.present();
            this.qrScanner.hide(); // Esconde o preview da câmera
            scanSub.unsubscribe(); // Pára o Scan
            ionApp.style.display = 'block'; // Volta o app ao normal
            this.navCtrl.push(ContactPage);

         }else{

            let alert = this.alertCtrl.create({
              title: 'TOKEN INVÁLIDO!',
              subTitle: 'Falha ao tentar autenticar',
              buttons: ['Tentar novamente']
            });
            alert.present();
            this.qrScanner.hide(); // Esconde o preview da câmera
            scanSub.unsubscribe(); // Pára o Scan
            ionApp.style.display = 'block'; // Volta o app ao normal

         }         
         
       });
  
       // Mostra o preview da câmera
       ionApp.style.display = 'none';
       this.qrScanner.show();
  
  
     } else if (status.denied) {
        alert('Permissão de leitura QR negada, reinstale o aplicativo dando essa devida permissão');
     } else {
        alert('Permissão de leitura QR negada, feche e abra o aplicativo novamente');
     }
  })
  .catch((e: any) => console.log('Erro: ', e));

  }



}
