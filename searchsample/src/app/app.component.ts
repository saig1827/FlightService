import { Component } from '@angular/core';
import { Data } from 'src/data.model';
import { Searchresult } from 'src/searchresult.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient) {}
  title = 'Flight Application';

  data: Data = new Data();
  searchResultList: Searchresult[];
  getFlight(): void {
    this.searchFlights(this.data)
    .subscribe( data => {
      this.searchResultList = data;
    });
  }

  public searchFlights(searchdata) {
    let inputParams = new HttpParams();
    inputParams = inputParams.append('inputDateStr', searchdata.inputDateStr);
    inputParams = inputParams.append('flightNumber', searchdata.flightNumber);
    inputParams = inputParams.append('origin', searchdata.origin);
    inputParams = inputParams.append('destination', searchdata.destination);
    return this.http.get<Searchresult[]>('http://localhost:8080/getFlight', {params: inputParams});
  }

}
