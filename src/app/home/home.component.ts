import { Component, OnInit } from '@angular/core';
import { convertFileToBlob } from '../utils/StringUtils';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit(): void {}
  async handleFileInput(event: any) {
    const file = event.target.files.item(0);
    if (file) {
      const result = await convertFileToBlob(file);
      this.save(result, file);
    }
  }
  save(blob: Blob, file: File) {
   
  }
}
