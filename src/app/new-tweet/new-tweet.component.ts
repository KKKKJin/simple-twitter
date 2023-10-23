import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TweetService } from '../services/tweet.service';

@Component({
  selector: 'app-new-tweet',
  templateUrl: './new-tweet.component.html',
  styleUrls: ['./new-tweet.component.css']
})
export class NewTweetComponent {

  // 新規ツイートテキスト
  public newText: string = '';

  constructor(
    private tweetService: TweetService,
  ) {}


  /**
   * ngOnInit
   */
  public ngOnInit() {
  }

  /**
   * キー押下
   */
  public onKeydown(event: KeyboardEvent, myForm: NgForm) {
    console.log('ctrlKey:' + event.ctrlKey);
    console.log('key:' + event.key);
    if (!myForm.valid) { return; }
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      // Ctrl + Enter キーが押されたときの処理
      event.preventDefault(); // デフォルトの動作（改行）を防止
      // ここで特定のアクションを実行
      this.onSubmit(myForm);
    }
  }



  /**
   * 新規ツイートフォーム送信時メソッド
   */
  public onSubmit(myForm: NgForm) {
      console.log('サブミット！' + this.newText); // バインディングしているから自プロパティも当然同じ値
      console.log(new Date().getDate)

      // TODO 新規ツイート登録処理
      this.tweetService.addTweet(this.newText)

      // テキストクリア
      this.newText = '';
  }
}
