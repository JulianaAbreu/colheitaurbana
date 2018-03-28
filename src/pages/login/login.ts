import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import { ColheitaProvider } from '../../providers/colheita/colheita';
import { loginModel } from '../../Model/loginModel';
import { NativeStorage } from '@ionic-native/native-storage';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  nav:NavController;
  public login:loginModel = new loginModel();
  
  constructor(nav: NavController,
  public navParams: NavParams,
  public http: Http,
  public nativeStorage: NativeStorage,
  public colheitaService: ColheitaProvider //para o login - gabi
) {
this.nav = nav;
  }

  loginMotorista() {
    this.colheitaService.loginMotorista(JSON.stringify(this.login)).then((data) =>{

      this.nativeStorage.setItem('login', {logado: 'true'})
      .then(
        () => console.log('Login salvo'),
        error => console.error('Erro ao salvar o login', error)
      );
      this.nav.push(TabsPage);
      
    }, (error) =>{
      alert("Motorista não cadastrado");
    });

  }


}
