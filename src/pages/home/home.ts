import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ColheitaProvider } from '../../providers/colheita/colheita';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    ColheitaProvider
  ]

})
export class HomePage {

  constructor(public navCtrl: NavController, public colheitaProvider: ColheitaProvider, private nativeStorage: NativeStorage) {

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

  ionViewDidLoad(){
    this.salva();
    this.recupera();
    this.teste();
  }

}
