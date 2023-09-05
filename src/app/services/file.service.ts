import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileResponse } from '../models/file.interface';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  url = 'localhost:9090/api';

  constructor(private http: HttpClient) {}

  createFile(file: File): Observable<string> {
    return this.http.post<string>(`${this.url}/imports`, file);
  }

  getAllFiles(): Observable<FileResponse[]> {
    return this.http.get<FileResponse[]>(`${this.url}/imports/regions`);
  }
}
