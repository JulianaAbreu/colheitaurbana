import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  var ionApp = <HTMLElement>document.getElementsByTagName("ion-app")[0];
  // Optionally request the permission early
  this.qrScanner.prepare()
  .then((status: QRScannerStatus) => {
     if (status.authorized) {

      // start scanning
       let scanSub = this.qrScanner.scan().subscribe((text: string) => {
         
         if(token == text){
          alert('Token validado com sucesso!');
            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
            ionApp.style.display = 'block';
         }else{
           alert('Token inválido!');
            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
            ionApp.style.display = 'block';
         }         
         
       });
  
       // show camera preview
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
