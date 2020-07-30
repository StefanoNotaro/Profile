import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  public copyRightYear = new Date().getFullYear();
  public gitHubUrl = 'https://github.com/StefanoNotaro';
  public contactMail = 'stefano.notaro@gmail.com';
  public links = [
    {
      displayName: 'Linkedin',
      url: 'https://www.linkedin.com/in/stefano-notaro-francesco-gauthier/',
      icon: 'fa-linkedin-in',
    },
    {
      displayName: 'GitHub',
      url: this.gitHubUrl,
      icon: 'fa-github',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
