import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FileService } from 'src/app/services/file.service';

interface FileProps {
  name: string;
}

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.css'],
})
export class ModalUploadComponent implements OnInit {
  fileName = 'Clique aqui para buscar um arquivo...';
  files: File[] = [];
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<ModalUploadComponent>,
    private fileService: FileService
  ) {}

  ngOnInit(): void {}

  browseFile(event: any): void {
    this.fileName = event.target.files[0].name;
    this.files.push(event.target.files[0]);
  }

  deleteSelectedFile(file: FileProps): void {
    this.files = this.files.filter((item) => item.name !== file.name);
    if (this.files.length === 0) {
      this.onResetInputLabel();
    }
  }

  onUploadFiles(): void {
    this.files.map((file) => {
      this.fileService.createFile(file).subscribe();
    });
    this.onResetInputLabel();
    this.onClose();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onResetInputLabel(): void {
    this.fileName = 'Clique aqui para buscar um arquivo...';
  }
}
