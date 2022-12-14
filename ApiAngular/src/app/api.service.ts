import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getAll() {
    return this.http.get("http://localhost:5065/api/SampleEntities")
  }
  public getAllUsers() {
    return this.http.get("http://localhost:5065/api/Account/getAllUser")
  }
  public postFile(formData) {
    return this.http.post("http://localhost:5065/api/file", formData, { reportProgress: true, observe: 'events' })
  }
}
