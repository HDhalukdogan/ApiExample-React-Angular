import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {  HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  progress: number;
  message: string;
  @Output() public onUploadFinished = new EventEmitter();
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    console.log(fileToUpload)
    const formData = new FormData();
    formData.append("formFile", fileToUpload);
    formData.append("name", fileToUpload.name);
    console.log(formData)
    this.apiService.postFile(formData)
      .subscribe({
        next: (event) => {
          console.log(event)
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });
  }
}
