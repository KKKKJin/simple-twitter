# API

## getTweets
### 機能
requestのユーザーがフォローしているユーザーのツイート情報を最大20個ゲットする。

### request
- userId: ログインしているユーザーID

### response
- tweets[]: ツイート情報全部
  - tweet{}: ツイート情報1つ
    - userId: ユーザーID (number)
    - userName: ユーザーName (string)
    - time: ツイート時間 (number)
    - text: 本文 (string)
    - numOfLikes: いいね数 (number)


## getSpecifiedTweets
### 機能
特定のユーザーのツイートを最大20個取得する。

### request
- userId: 特定のユーザーID

### response
- tweets[]: ツイート情報全部
  - tweet{}: ツイート情報1つ
    - userId: ユーザーID (number)
    - userName: ユーザーName (string)
    - time: ツイート時間 (number)
    - text: 本文 (string)
    - numOfLikes: いいね数 (number)


## addTweet
### 機能
新しいツイートを投稿する

### request
- userId: ユーザーID
- text: ツイート文章

### response
