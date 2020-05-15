import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  loading: boolean;
  constructor(private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.loaderService.isLoading
    .pipe(
      delay(0)
    )
    .subscribe((v) => {
      this.loading = v;
    });
  }

}
