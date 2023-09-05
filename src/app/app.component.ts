import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { ModalUploadComponent } from './components/modal-upload/modal-upload.component';
import { FileService } from './services/file.service';
import { FileResponse } from './models/file.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  files$: BehaviorSubject<FileResponse[]>;
  isUploading$: BehaviorSubject<Boolean>;

  displayedColumns: string[] = ['id', 'name'];

  constructor(public dialog: MatDialog, private fileService: FileService) {
    this.files$ = new BehaviorSubject<FileResponse[]>([]);
    this.isUploading$ = new BehaviorSubject<Boolean>(false);
  }

  ngOnInit(): void {
    // this.getAllFiles();
  }

  openUploadModal(): void {
    this.dialog
      .open(ModalUploadComponent, {
        width: '600px',
      })
      .afterClosed()
      .subscribe(() => {
        this.isUploading$.next(true);
        this.getAllFiles();
      });
  }

  getAllFiles(): void {
    this.fileService.getAllFiles().subscribe((data) => {
      this.files$.next(data);
      this.isUploading$.next(false);
    });
  }

}
