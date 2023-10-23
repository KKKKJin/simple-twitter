import { Injectable } from '@angular/core';


enum DateComparisonResult {
  Earlier = -1,
  Equal = 0,
  Later = 1,
}

@Injectable({
  providedIn: 'root'
})

export class DateService {

  constructor() { }

  /**
   * 現在の年月日時を取得する
   * @return 現在の年月日時(yyyy-MM-dd HH:mm:ss)
   */
  public getFormattedDateTime(): Date {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 0埋め
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const now = new Date(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
    return now
  }


  // REQUEST 不要か、並び替えはさすがにデータ取得側でやらせるか
  /**
   * 日付文字列を比較する
   * @return: 日付1の方が早ければ-1, 同じなら0, 遅ければ1を返す
   */
  private compareDateStrings(dateStr1: string, dateStr2: string): DateComparisonResult {
    const date1 = new Date(dateStr1);
    const date2 = new Date(dateStr2);
    return date1 < date2 ? DateComparisonResult.Earlier : date1 > date2 ? DateComparisonResult.Later : DateComparisonResult.Equal;
  }
}
