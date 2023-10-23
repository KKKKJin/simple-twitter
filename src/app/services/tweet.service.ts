import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { DateService } from './date.service';
// テスト用
import { TWEETS_TOTAL, TWEETS_ONLY } from '../TweetMockData';


@Injectable({
  providedIn: 'root'
})
export class TweetService {

  constructor(
    private dateService: DateService,
  ) { }

  /**
   * ツイート情報を取得する
   */
  public getTweets(): Observable<Tweets> {
    // TODO
    return of(TWEETS_TOTAL);
  }

  /**
   * 特定のユーザーのツイートを取得する
   */
  public getSpecifiedTweets(userId: number): Observable<Tweets> {
    // TODO
    return of(TWEETS_ONLY);
  }

  /**
   * 新規ツイートをDBに登録する
   */
  public async addTweet(newText: string): Promise<void> {
    const now = this.dateService.getFormattedDateTime();
    await TWEETS_TOTAL.push(
      {
        userId: 1,
        userName: 'testUser1',
        time: now,
        text: newText,
        numOfLikes: 5,
      }
    )
    return;
  }
}
