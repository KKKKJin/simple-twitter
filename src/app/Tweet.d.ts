// Tweet型
type Tweet = {
    // ユーザーID
    userId: number;
    // ユーザーName
    userName: string;
    // ツイート時間
    time: Date;
    // 本文
    text: string;
    // いいね数
    numOfLikes: number;
};

type Tweets = Tweet[];