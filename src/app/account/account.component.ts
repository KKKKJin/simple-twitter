import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  public userId?: number;

  constructor(
    private route: ActivatedRoute,
  ){}

  /**
   * ngOnInit
   */
  public ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
    });
  }  

}
