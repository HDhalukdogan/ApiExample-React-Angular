import { Component, OnInit,OnDestroy } from '@angular/core';
import { ApiService } from '../api.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css']
})
//https://blog.logrocket.com/angular-datatables-feature-rich-tables/
export class EntityListComponent implements OnInit, OnDestroy {
  data : any[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
this.getEntities();

  }
  getEntities(){
    this.apiService.getAll().subscribe((response: any) => {
      this.data = response;
      this.dtTrigger.next(response);
    });
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
