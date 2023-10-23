import { Component, Input, OnInit } from '@angular/core';
import { TweetService } from '../services/tweet.service';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent {
  constructor(
    private tweetService: TweetService
  ) {}

  // 特定のID
  @Input() specifiedUserId?: number;

  // ツイート一覧データ
  public tweets?: Tweets;

  /**
   * ngOnInit: 初期設定
   */
  public ngOnInit() {
    // ツイート情報を取得
    if (this.specifiedUserId) {
      // 特定のアカウントのツイートを表示
      this.getSpecifiedTweets(this.specifiedUserId);
    } else {
      // 自分のフォローしているアカウントのツイートを表示
      this.getTweets();
    }
  }

  /**
   * ツイッタークリックイベントメソッド
   * in: tweetデータ
   */
  public onClickTweet(tweet: Tweet) {
    // ツイート画面に遷移
    // TODO ツイート画面の作成
  }

  /**
   * ツイートを取得する
   */
  public getTweets(): void {
    this.tweetService.getTweets()
        .subscribe(tweets => this.tweets = tweets);
  }

  /**
   * 特定ユーザーのツイートを取得する
   */
  public getSpecifiedTweets(specifiedUserId: number): void {
    this.tweetService.getSpecifiedTweets(specifiedUserId)
        .subscribe(tweets => this.tweets = tweets);
  }

}
