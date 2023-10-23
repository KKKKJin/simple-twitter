import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TweetService } from '../services/tweet.service';

@Component({
  selector: 'app-user-icon',
  templateUrl: './user-icon.component.html',
  styleUrls: ['./user-icon.component.css']
})
export class UserIconComponent {

  public userId: number = 1;

  constructor(
    private tweetService: TweetService,
    private router: Router,
  ) {}

  /**
   * アイコンクリックイベント
   */
  public onClick(): void {
    // TODO async Promise よくわかってない
    this.router.navigate([`/account/${this.userId}`]);
    return;
  }
}
