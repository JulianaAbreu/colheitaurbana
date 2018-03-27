import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import { ColheitaProvider } from '../../providers/colheita/colheita';
import { loginModel } from '../../Model/loginModel';


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
      this.nav.push(TabsPage);
      
    }, (error) =>{
      alert("Usuario não encontrado. Error: "+ error);
    });

    //login

  }


}
