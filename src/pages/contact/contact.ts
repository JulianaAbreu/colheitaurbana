import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ColheitaProvider } from '../../providers/colheita/colheita';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers: [
    ColheitaProvider
  ]
})
export class ContactPage {

  public diario = new Array;

  constructor(
    public navCtrl: NavController,
    public colheitaProvider: ColheitaProvider, 
    private nativeStorage: NativeStorage
  
  ) {

  }

  ionViewDidLoad(){
    this.LoadDiario();
  }

  public LoadDiario(){
    this.colheitaProvider.getDiario().subscribe(
      data => {
        this.diario = (data as any);
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );   
  }

}
