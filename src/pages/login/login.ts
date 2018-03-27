import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import { ColheitaProvider } from '../../providers/colheita/colheita';
import { loginModel } from '../../Model/loginModel';
import { HomePage } from '../home/home';

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
  public colheitaService: ColheitaProvider //para o login - gabi
) {
this.nav = nav;
  }

  loginMotorista() {
    this.colheitaService.loginMotorista(JSON.stringify(this.login)).then((data) =>{
      //alert(data);
      this.nav.push(HomePage);
      
    }, (error) =>{
      alert("Usuario não encontrado. Error: "+ error);
    });

    //login

  }


}
