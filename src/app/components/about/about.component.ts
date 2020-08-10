import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public isLoading = false;
  public testerInitDate = new Date(2017, 6, 10);
  public testerEndDate = new Date(2018, 9, 10);
  public testerTime = {
    years: this.getYearDiff(this.testerInitDate, this.testerEndDate),
    months: this.getMonthDiff(this.testerInitDate, this.testerEndDate),
  };

  public developerInitDate = new Date(2018, 9, 10);
  public developerEndDate = new Date();
  public developerTime = {
    years: this.getYearDiff(this.developerInitDate, this.developerEndDate) - 1,
    months: this.getMonthDiff(this.developerInitDate, this.developerEndDate),
  };

  public technologiesKnown = [
      {name: this._translateService.instant('about.git'), icon: 'fab fa-git-alt'},
      {name: 'C#', icon: 'fas fa-code'},
      {name: '.Net Framework', icon: 'fas fa-code'},
      {name: '.Net Framework Entity Code', icon: 'fas fa-code'},
      {name: 'ASP.NET Web Api', icon: 'fas fa-code'},
      {name: 'LINQ', icon: 'fas fa-code'},
      {name: 'SQL', icon: 'fas fa-database'},
      {name: 'JSON', icon: 'fas fa-file-code'},
      {name: this._translateService.instant('about.angular'), icon: 'fab fa-angular'},
      {name: 'Angular JS', icon: 'fab fa-angular'},
      {name: 'CSS', icon: 'fab fa-css3'},
  ];

  constructor(public _translateService: TranslateService) {
  }

  ngOnInit() {
  }

  private monthDiff(d1: Date, d2: Date) {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

  private getYearDiff(d1: Date, d2: Date): number {
    const yearsDiff = Math.round(this.monthDiff(d1, d2) / 12);
    const monthsDiff = Math.round(this.monthDiff(d1, d2) - 12);

    return monthsDiff >= 12 ? yearsDiff + 1 : yearsDiff;
  }

  private getMonthDiff(d1: Date, d2: Date): number {
    const monthsDiff = Math.round(this.monthDiff(d1, d2) - 12);

    return monthsDiff < 12 ? monthsDiff : monthsDiff - 12;
  }

}
