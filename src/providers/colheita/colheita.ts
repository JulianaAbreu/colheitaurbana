import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';


/*
  Generated class for the ColheitaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ColheitaProvider {

  private baseApiPath = "http://constantinewine-001-site1.itempurl.com/api";

  constructor(public http: HttpClient) {
    
  }

  getInstituicoes(){
    return this.http.get(this.baseApiPath + "/instituicoes");
  }

}
