//import { HttpClient} from '@angular/common/http';
import { Http, RequestOptions, Headers, Response } from '@angular/http';//import = Gabi
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';//import para storage - Gabi
import 'rxjs/add/operator/map';//importacao para http - Gabi
import 'rxjs/add/operator/toPromise';//importacao para http - Gabi

@Injectable()
export class ColheitaProvider {

  private baseApiPath = "http://constantinewine-001-site1.itempurl.com/api";

  constructor(/*public http: HttpClient,*/
    public http: Http,
    public storage: Storage) {

  }

  getInstituicoes() {
    return this.http.get(this.baseApiPath + "/instituicoes");
  }

  getDiario() {
    return this.http.get(this.baseApiPath + "/diario/agendada");
  }

  loginMotorista(login: string): Promise<Response> {
    var link = this.baseApiPath + "/loginMotorista";
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });
    return this.http.post(link, login, options).toPromise();

  }



userIsLogged() {
  this.storage.get('token').then(
    val => {
      if (val !== undefined) {
        return val;
      } else {
        return false;
      }
    }
  );//só pode cadastrar, consultar, etc se estiver logado

}

logoutMotorista() {
  this.storage.remove('token');

}

}
