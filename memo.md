# Angular
## 初期設定
- インストール: `npm install -g @angular/cli`
- プロジェクト作成: `ng new プロジェクト名`

## 基本
- コンポーネント（Component）: Angularアプリケーションは、コンポーネントから構築されます。コンポーネントは特定の機能やビューを担当します。

- モジュール（Module）: アプリケーションの機能をグループ化し、機能ごとにモジュールを作成します。

- テンプレート（Template）: コンポーネントのビューをHTMLで定義します。データバインディングなどもここで行います。

- サービス（Service）: データの共有や非同期処理など、コンポーネント間で共有するためのコードをサービスとして切り出します。

## コンポーネント
- `ng generate component コンポーネント名`

```ts
// my-component.component.ts
@Component({
  selector: 'app-my-component', // セレクタ(htmlではこの名前を要素として用いる)
  templateUrl: './my-component.component.html', // テンプレートファイル
  styleUrls: ['./my-component.component.css'] // スタイルファイル
})
```

- モジュールへの登録: 作成したコンポーネントをアプリケーションモジュール(app.module.ts)に登録する必要がある
```ts
// app.module.ts
import { MyComponentComponent } from './my-component/my-component.component';

@NgModule({
  declarations: [
    // 他のコンポーネント
    MyComponentComponent // 新しく作成したコンポーネントを追加
  ],
  // ...
})
```

## デコレータ
Angularのデコレータ（Decorator）は、クラスやクラスのメンバーに**メタデータを提供**し、Angularの動作をカスタマイズするための特別な注釈です。
デコレータはTypeScriptの機能であり、Angularアプリケーションで**コンポーネント、サービス、モジュール、ディレクティブ、パイプなど**を定義する際に広く使用されます。

### @NgModule: Angularモジュールを定義

プロパティ
- `declarations`: **コンポーネント**、ディレクティブ、パイプなどをここに登録します。これらはこのモジュール内で使用できるものです。
- `imports`: 他のAngularモジュールをここにインポートし、このモジュール内で使用します。
- `providers`: サービスや依存関係のプロバイダーをここに登録します。
- `bootstrap`: アプリケーションのルートコンポーネントを指定します。通常、AppComponentなどのルートコンポーネントがここに登録されます。

```ts
// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component'; // ルートコンポーネント
import { MyComponentComponent } from './my-component/my-component.component'; // カスタムコンポーネント

@NgModule({
  declarations: [
    // このモジュール内で使用するコンポーネント、ディレクティブ、パイプを登録
    AppComponent, // ルートコンポーネント
    MyComponentComponent, // カスタムコンポーネント
  ],
  imports: [
    // 他のモジュールをインポート
    BrowserModule,
  ],
  providers: [
    // サービスやプロバイダーを登録
  ],
  bootstrap: [AppComponent] // アプリケーションの起動時に表示されるルートコンポーネント
})
export class AppModule { }
```

### @Component: Angularコンポーネントを定義
このデコレータはコンポーネントのメタデータを提供し、テンプレート、スタイル、セレクタなどを指定します。
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-component',
  templateUrl: 'my-component.component.html',
  styleUrls: ['my-component.component.css']
})
export class MyComponentComponent { }
```

### @Injectable: Angularサービスを定義
このデコレータは依存性注入（DI）を有効にし、サービスを他のコンポーネントやサービスで使用できるようにします。

```ts
import { Injectable } from '@angular/core';

@Injectable()
export class MyService { }
```

### @Directive: Angularディレクティブを定義
ディレクティブはHTML要素にカスタムの振る舞いを追加します。

```ts
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCustomDirective]'
})
export class CustomDirective {
  constructor(private el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'yellow';
  }
}
```


### @Pipe: Angularパイプを定義
パイプはデータを変換し、ビューに表示するために使用されます。

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myCustomPipe'
})
export class MyCustomPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    // パイプの変換ロジック
  }
}
```

## バインディング

## クラスバインディング
Angularにおけるクラスバインディング（Class Binding）は、**HTML要素に動的にCSSクラスを追加または削除する方法を提供**します。
これにより、特定の条件や状態に基づいて要素に異なるスタイルを適用することが可能となり、動的なユーザーインターフェースを構築できます。
クラスバインディングは、Angularのディレクティブを使用して実行されます。以下は、クラスバインディングの詳細と具体的な使用例です。
- クラスバインディングの基本構文: `[class.class-name]="expression"` の形式で実行されます。`
  - class-name: 適用したいCSSクラス名
  - expression: 条件や評価式

### 具体的な使用例
- クラスの追加:
```html
<div [class.highlight]="isHighlighted">ハイライトされたテキスト</div>
```
上記の例では、isHighlighted プロパティが true の場合、highlight クラスが要素に追加され、テキストがハイライト表示されます。

- クラスの条件による切り替え:
```html
<button [class.active]="isActive">アクティブ</button>
```
ボタンのアクティブ状態を表すクラス active を、isActive プロパティの値に基づいて切り替えます。

- クラスの配列:
```html
<div [ngClass]="['class1', 'class2']">複数のクラス</div>
```
ngClass ディレクティブを使用して、複数のクラスを要素に適用できます。

- 条件に応じてクラスを切り替える:
```html
<div [ngClass]="{'class1': condition1, 'class2': condition2}">条件によるクラスの切り替え</div>
```
オブジェクト形式の ngClass ディレクティブを使用して、異なる条件に基づいてクラスを切り替えます。



## サービス
コマンド: `ng generate service heroes/hero` => `app/heroes`にHeroServiceを作成する
- `@Injectable()` デコレータを使用してサービスの依存性注入(DI)を有効にする。
- サーバーからのデータの取得、ユーザー入力の検証、 コンソールへの直接のログ出力などのタスクを、コンポーネントから サービスに委譲することができる

サービスの機能
1. 依存性注入(DI)の有効化
2. **シングルトンサービス**(単一オブジェクト)
  - Injectableデコレータでは、Angularはデフォルトでサービスをシングルトンとして提供します。これにより、アプリケーション内で**同じサービスの単一のインスタンスが共有され**、データの一貫性が確保されます。
3. プロバイダーの構成
  - モジュールレベルで providers 配列内でサービスを提供することにより、アプリケーションの**特定のスコープでサービスを共有できます**。これにより、サービスを特定のモジュールで提供したり、別のサービスに依存させたりすることが可能です。
4. 依存関係の注入
  - @Injectable() デコレータを使用したサービスは、コンストラクタの引数として他のサービスや依存関係を受け取ることができます。これにより、サービス同士が連携しやすくなります。
5. ユニットテストのサポート
   - DIを使用したサービスは、ユニットテストにおいて依存関係をモック化またはスタブ化するのが容易です。**テスト用のダミーサービスを提供することで、サービスのユニットテストを簡単に実施できます**。


```ts
// サービス内でサービスを受け取る
@Injectable()
export class MyService {
  constructor(private anotherService: AnotherService) { }
}
```

### コンポーネントで使用するデータの管理に使用
1. サービス作成
```TS
// shared-data.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // シングルトンサービスとして提供 TODO これなに
})
export class SharedDataService {
  public sharedData: any; // 共有データを保持
}
```

2. サービスをコンポーネントに注入(コンストラクタでサービスをインジェクトする)
```ts
// sample.component.ts

import { Component } from '@angular/core';
import { SharedDataService } from './shared-data.service';

@Component({
  selector: 'app-sample',
  template: `
    <div>{{ sharedData }}</div>
  `
})
export class SampleComponent {
  // コンストラクタでインジェクト！
  constructor(private sharedDataService: SharedDataService) { }
}
```

3. サービスのプロパティを介してデータにアクセス
```ts
// sample.component.ts

export class SampleComponent {
  constructor(private sharedDataService: SharedDataService) {
    // データを読み取り
    this.sharedData = sharedDataService.sharedData;

    // データを更新
    sharedDataService.sharedData = '新しいデータ';
  }
}
```

4. ルートモジュールに追加
```ts
// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedDataService } from './shared-data.service';

@NgModule({
  imports: [BrowserModule],
  declarations: [/* コンポーネントの宣言 */],
  providers: [SharedDataService], // サービスを提供
  bootstrap: [/* ルートコンポーネント */]
})
export class AppModule { }
```

## ルーティング
Angularのルーティングは、@angular/router モジュールを使用して実現します。

### 基本設定
1. ルーティングモジュールの設定:
```ts
// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AccountComponent } from './account.component';

const routes: Routes = [
  // 典型的なAngularのRouteはふたつのプロパティを持っています
  // path: ブラウザのアドレスバーにある URL にマッチする文字列
  // component: そのルートに遷移するときにルーターが作成すべきコンポーネント
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // ルートパスをホームにリダイレクト
  { path: 'home', component: HomeComponent },
  { path: 'account/:id', component: AccountComponent }, // ユーザーIDをダイナミックに受け取る
];

@NgModule({
  // 次の行は、 RouterModule を AppRoutingModule の imports 配列に追加し、RouterModule.forRoot()を呼び出すことにより、ワンステップで routes にそれを設定します:
  imports: [RouterModule.forRoot(routes)],
  // 次に、AppRoutingModule は RouterModule をエクスポートし、アプリケーション全体で利用できるようにします。
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

2. アプリモジュールでルーティングモジュールをインポート:
```ts
// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module'; // ルーティングモジュールをインポート

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { AccountComponent } from './account.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule // ルーティングモジュールをインポート
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

3. ルーターアウトレットを追加
```HTML
<!-- app.component.html -->
<div>
  <header>
    <!-- ヘッダー部分 -->
  </header>

  <main>
    <!-- メインコンテンツ領域 -->
    <router-outlet></router-outlet> <!-- ルーターアウトレット(ルーターによって表示されるコンポーネントのための場所) -->
  </main>

  <footer>
    <!-- フッター部分 -->
  </footer>
</div>
```

4. リンク設定
```html
<!-- 例：ホーム画面へのリンク -->
<a routerLink="/home">ホーム</a>

<!-- 例：アカウントページへのリンク（ユーザーIDを含む） -->
<a [routerLink]="['/account', userId]">マイアカウント</a>
```
TODO 上をTSファイルの方で実現するには？
TODO "/account/:id"にアクセスされた時のidの取得方法は？


### 画面遷移実装例: HTML、TypeScript(コンポーネントファイル)
Angularで画面遷移を実現する方法にはいくつかのパターンがあります。以下に主要な方法とそれに関連する実装の例を示します。

#### ルーターリンクを使用した遷移:
- HTML側: ルーターリンクを使用して画面遷移を実現します。routerLink ディレクティブを使用します。
```html
<!-- app.component.html -->
<a routerLink="/home">ホーム</a>
<a routerLink="/about">アバウト</a>
```

- TypeScript側: 特別なコードは必要ありません。ルーターリンクが設定されているため、クリックすると指定されたルートに遷移します。

#### プログラムによる遷移:
- TypeScript側: コンポーネント内でプログラムによる遷移を実現するには、Router サービスを使用します。
```typescript
import { Router } from '@angular/router';

constructor(private router: Router) {}

navigateToHome() {
  this.router.navigate(['/home']);
}
```

- HTML側: ボタンなどの要素をクリックして、関連するメソッドを呼び出します。
```html
<!-- app.component.html -->

<button (click)="navigateToHome()">ホームに移動</button>
```

#### パラメータ付き遷移:
- ルーティングモジュール: ルートを設定
```typeScript
// app-routing.module.ts
import { UserDetailComponent } from './user-detail.component';

const routes: Routes = [
  // 他のルート設定
  // ...
  // ユーザー詳細ページのルート
  { path: 'user/:userId', component: UserDetailComponent },
];
```

- HTML側: ルーターリンク内でパラメータを指定して遷移します。
```html
<!-- user-list.component.html -->
<!-- 
    これは'/user/:userId'に遷移する (`:〜`はパラメータ、一定の値ではない)
    userIdは一定の文字列ではなくユーザーによって変わる
    - userIdはコンポーネント側のプロパティを評価する([routerLink]でバインドしてるから)
    - 複数パラメータもできる => "['/user', userId, username]"ならば、'/user/:userId/:username'に遷移する
 -->
<a [routerLink]="['/user', userId]">ユーザー詳細</a>
```

- TypeScript側: ルートにパラメータを受け渡す場合、ActivatedRoute サービスを使用してパラメータを取得できます。
```typescript
// user-detail.component.ts
import { ActivatedRoute } from '@angular/router';

  constructor(private route: ActivatedRoute) {
    // route(ActivateRoute)サービスを使用して、現在のリンク('/user/:userId')のパラメータuserIdを取得することができる
    // route.paramsにパラメータをもっている
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
    });
  }
```

これらのパターンを組み合わせて使用することで、Angularアプリケーション内で画面遷移を制御できます。ルーターリンクを使用すると、Angularのルーターが画面遷移を処理し、プログラムによる遷移やパラメータの受け渡しなども柔軟に実現できます。

## 非同期データストリーム、Observable、RxJS
- インポート: `import { Observable } from 'rxjs';`

- Observable の作成:
Observable を作成する方法はいくつかあります。一般的な方法の1つは、関数を使用して新しいObservableを作成することです。

```typescript
const myObservable = new Observable((observer) => {
  // データの生成または非同期操作
  observer.next('データ1');
  observer.next('データ2');
  observer.complete(); // ストリーム終了
});
この例では、新しいObservableを作成し、next メソッドを使用してデータを送信し、complete メソッドでストリームを終了しています。
```

- Observable の購読:
Observable を購読することで、ストリーム内のデータを受け取ります。これには subscribe メソッドを使用します。
```typescript
myObservable.subscribe({
  next: (data) => console.log(data),
  error: (error) => console.error(error),
  complete: () => console.log('ストリームが完了しました'),
});
```
この購読プロセスにより、Observable が発行したデータやエラー、ストリームの完了に対するコールバック関数を定義できます。

- 非同期操作:
Observable は非同期操作をサポートし、HTTPリクエスト、ユーザーアクション、タイマーなどの非同期イベントを処理できます。以下はHTTPリクエストの例です。
```typescript
import { HttpClient } from '@angular/common/http';

// ...
const apiURL = 'https://api.example.com/data';
const dataObservable = this.http.get(apiURL);

dataObservable.subscribe((data) => {
  console.log('受信したデータ:', data);
});
```
上記のコードでは、AngularのHttpClientを使用してHTTP GETリクエストを実行し、応答をObservableとして受け取り、データを購読しています

## フォーム

## ライフサイクルメソッド
- インポート: `import { Component, OnInit } from '@angular/core';`

Angularコンポーネントのライフサイクルメソッドは、コンポーネントが生成され、更新され、破棄される過程で発生するイベントをハンドリングするためのメソッドです。これらのメソッドを適切に活用することで、コンポーネントの動作をカスタマイズし、リソースの管理やデータの同期を行うことができます。
Angularコンポーネントの一般的なライフサイクルメソッドを時系列で説明します。

1. constructor():
コンポーネントが初期化される最初のメソッド。
コンストラクタ内で初期化コードを記述できます。
Angularの依存性注入（DI）が使用できる。

2. ngOnChanges():
入力プロパティの値が変更されるたびに呼び出される。
変更を検知し、必要なアクションを実行できる。
SimpleChanges オブジェクトを受け取り、変更を検知できる。

3. ngOnInit():
コンポーネントが初期化された直後に呼び出される。
HTTPリクエストの送信、初期データの取得、購読の設定など、初期化に関連する処理をここで実行できる。

4. ngDoCheck():
Angularがコンポーネントの変更を検出するたびに呼び出される。
手動の変更検出ロジックを実装する場合に使用する。

5. ngAfterContentInit():
`<ng-content>` を使用して、コンテンツ投影が完了した直後に呼び出される。
コンテンツプロジェクションの初期化に使用できる。

6. ngAfterContentChecked():
コンテンツチェック後に呼び出される。
コンテンツの変更に対する後処理などを実行できる。

7. ngAfterViewInit():
ビューが初期化された直後に呼び出される。
DOM要素にアクセスするために使用できる。

8. ngAfterViewChecked():
ビューがチェックされた後に呼び出される。
ビューに関連する後処理を実行できる。

9. ngOnDestroy():
コンポーネントが破棄される直前に呼び出される。
購読の解除、リソースのクリーンアップなど、後片付けを行うのに使用する。







## 状態管理(NgRxなどを用いる)

## Angularのディレクトリ構造とそれぞれのファイルについて詳細をおしえてください
- `e2e`: End-to-Endテスト（e2eテスト）のファイルが含まれています。プロジェクトをブラウジングし、エンドツーエンドでテストするために使用されます。
- `node_modules`: プロジェクトの依存関係（ライブラリ、パッケージなど）がここにインストールされます。このディレクトリは自動的に生成され、通常は手動で変更しないでください。
- `src`: これはAngularアプリケーションの主要な開発ディレクトリです。以下のサブディレクトリとファイルが含まれます。
- `app`: アプリケーションの主要なコードがここに配置されます。以下のサブディレクトリとファイルが含まれます。
  - `app.component.ts`: ルートコンポーネントの TypeScript コード。アプリケーションのエントリーポイントとなります。
  - `app.component.html`: ルートコンポーネントのテンプレート。
  - `app.component.css`: ルートコンポーネントのスタイリング。
  - `app.module.ts`: アプリケーションのルートモジュールの定義。その他のコンポーネント、サービス、モデルなどのファイルは、ここに追加されます。
- `assets`: 画像、フォント、その他の静的ファイルがここに配置されます。これらのファイルはビルド時にアプリケーションにバンドルされます。
- `environments`: 環境に関連する設定ファイルがここに含まれます。通常、開発と本番用の設定ファイルを持ちます。
- `angular.json`: Angularのビルド、テスト、開発サーバーの設定が含まれる設定ファイルです。
- `package.json`: プロジェクトの依存関係やスクリプトが定義されているファイルです。npmコマンドを使用してパッケージをインストールおよび管理します。
- `tsconfig.json`: TypeScriptコンパイラの設定が含まれるファイルです。
- `tslint.json`: コードの品質とスタイルをチェックするためのTSLintの設定ファイルです。Angular CLI はESLintをサポートすることもあります。
- `karma.conf.js`: ユニットテストフレームワークであるKarmaの設定ファイルです。
- `protractor.conf.js`: e2eテストを実行するためのProtractorの設定ファイルです。
- `README.md`: プロジェクトの説明やドキュメンテーションが記載されるファイルです。





## ディレクティブ
ディレクティブ（Directives）は、Angularや他のモダンなWebフレームワークで使用される重要なコンセプトの一つです。
ディレクティブは、**HTML要素に特別な動作や機能を追加するための指示を提供**します。
ディレクティブは**HTML要素に属性として追加され**、Angularがその属性を解釈して、対応する動作を実行します。

Angularのディレクティブは大きく3つのカテゴリに分類できます
1. コンポーネントディレクティブ（Component Directives）:
コンポーネントディレクティブはAngularアプリケーション内で独自に作成したカスタムコンポーネントを表します。
これらはHTML要素のように使われ、カスタムコンポーネントが持つビューとロジックを組み合わせるのに使用されます。

```html
<app-custom-component></app-custom-component>
```

2. 属性ディレクティブ（Attribute Directives）:
属性ディレクティブは、HTML要素に属性として追加され、要素の外観や動作を変更します。
これらはプレビルトインディレクティブ（例: ngFor, ngIf, ngModel）やカスタムディレクティブで構成されます。

```html
<div *ngIf="isVisible">この要素は条件に応じて表示されます</div>
<input [(ngModel)]="userData.username" name="username" required>
```

3. 構造ディレクティブ（Structural Directives）:
構造ディレクティブは、要素を追加、削除、または置き換えるために使用されます。
これらは通常、条件に基づいて要素の表示を切り替えるために使用されます。

```html
<div *ngFor="let item of items">アイテム: {{ item }}</div>
```

### ngModel ディレクティブ:
ngModel ディレクティブは、テンプレート駆動フォーム（Template-driven forms）で使用されるディレクティブです。
ngModel ディレクティブはフォームの入力要素に適用され、**その要素の値をコンポーネントのプロパティにバインドします**。
このディレクティブを使用することで、テンプレート内のフォーム要素とコンポーネントのデータを結びつけることができます。

バリデーションルールを含む属性（例: required, minlength, email）を入力要素に追加し、ngModel ディレクティブを使用してフォームのバリデーションを設定できます。

```html
<input type="text" name="username" [(ngModel)]="userData.username" required minlength="3">
```

### ngForm ディレクティブ:
ngForm ディレクティブは、[テンプレート駆動フォームおよびリアクティブフォーム（Reactive forms）](#バリデーション(フォームのチェック))の両方で使用されるディレクティブです。
ngForm ディレクティブはフォーム要素に適用され、**フォームの状態を追跡し、フォーム内の入力要素に関連する情報を提供します**。
フォーム要素に`#myForm="ngForm"`のように名前を付けることで、フォームの状態やフォーム内のコントロールにアクセスするためのテンプレート参照変数を作成できます。
```html
<form #myForm="ngForm">
  <!-- フォーム内の入力要素 -->
</form>
```
ngForm ディレクティブを使用することで、フォームの状態（例: 有効、無効、送信済みなど）を確認し、フォーム内のコントロールにアクセスして操作することができます。
また、フォームの送信時に **(ngSubmit) イベント**を使用してカスタムハンドラを呼び出すことも可能です。




## バリデーション(フォームのチェック)
Angularのバリデーションにはテンプレート駆動フォーム（Template-driven forms）とリアクティブフォーム（Reactive forms）がある

### テンプレート駆動フォーム（Template-driven forms）とリアクティブフォーム（Reactive forms）の違い
- テンプレート駆動フォームの使用:
単純なフォーム要素に対しては、テンプレート駆動フォームが適している場合があります。たとえば、ユーザー登録フォームのような基本的なフォームは、テンプレート駆動フォームを使用して簡単に作成できます。
- リアクティブフォームの使用:
複雑なフォームやフォーム内の動的なコントロールが必要な場合、リアクティブフォームを選択します。リアクティブフォームはフォームの構造をプログラム的に制御し、フォーム内のコントロールを動的に操作できます。

1. 実装方法:
- テンプレート駆動フォーム
    - テンプレート駆動フォームでは、**フォームの定義とバリデーションルールはHTMLテンプレート内に記述されます**。**フォームコントロールやバリデーションルールはHTML属性とディレクティブを使用して指定**されます。

- リアクティブフォーム
    - リアクティブフォームでは、**フォームの定義とバリデーションルールはTypeScriptのコンポーネントクラス内**で行われます。**フォームコントロールとバリデーションルールはTypeScriptコードで明示的に設定**されます。

2. バリデーションの管理:
- テンプレート駆動フォーム
    - **バリデーションルールはHTML要素の属性として設定**され、**バリデーションエラーメッセージはHTMLテンプレート内に直接表示**されます。フォームのバリデーション状態はテンプレート内で自動的に管理されます。

- リアクティブフォーム
    - **バリデーションルールはTypeScriptのコード内で設定**され、**バリデーションエラーメッセージの表示やバリデーションエラーのカスタム処理もコード内**で行います。フォームのバリデーション状態はFormGroupおよびFormControlオブジェクトを使用して明示的に管理されます。

3. 動的フォーム生成:
- テンプレート駆動フォーム
    - フォームコントロールの動的な追加および削除が難しい場合があります。

- リアクティブフォーム
    - フォームコントロールの追加、削除、および変更がプログラム的に容易に実行できます。

どちらのアプローチを選択するかは、プロジェクトの要件と開発者の好みに依存します。
テンプレート駆動フォームは簡単なフォームに適しており、HTML内にバリデーションルールを直接記述することができます。
一方、リアクティブフォームは複雑なフォームや動的なフォーム生成に適しており、バリデーションルールをTypeScriptコード内で明示的に管理できます。


### テンプレート駆動フォーム（Template-driven forms)
テンプレート駆動フォーム（Template-driven forms）では、**フォームのバリデーションはテンプレート（HTMLファイル）内で設定**され、**バリデーションルールは属性ディレクティブを使用して指定**します。以下は、テンプレート駆動フォームでフォームバリデーションを行う手順です。

- `FormsModule`を`app.module`にインポート
```ts
// ngForm はFormsModuleの中に組み込まれている
import { FormsModule } from '@angular/forms'; // フォームモジュールのインポート
// ...
@NgModule({
  // ...
  imports: [
    FormsModule,
  ],
  // ...
})
export class AppModule { }
```

1. フォームの作成:
フォームをHTMLテンプレート内で作成します。フォーム要素に ngForm ディレクティブを追加し、各入力要素に ngModel ディレクティブを使用して双方向データバインディングを有効にします。

- パターン1: onSubmitの引数に
```html
<!-- というかこの例ではngModelディレクティブによってtsのプロパティがバインディングされているから引数いらないんだけどどっちでもいけるよという例 -->

<!-- ↓このフォームにmyFormという名前をつける -->
<!-- ↓この時`onSubmit(myForm)`のmyFormはts側のプロパティとして用意しなくて良い -->
<form #myForm="ngForm" (ngSubmit)="onSubmit(myForm)">

    <!-- myFormはmyFormのバリデーションが問題ない時のみ使用可能 -->
    <button type="submit" class="btn btn-primary rounded-circle p-0" style="width:2rem;height:2rem;"
        [disabled]="!myForm.valid">＋</button>
    <textarea class="form-control" id="newText" name="newText" [(ngModel)]="newText"
        placeholder="今なにしてる?" [minlength]="1" required></textarea>
</form>
<!-- エラーメッセージ -->
<div class="row">
    <div *ngIf="myForm.valid">フォームは有効です。</div>
    <div *ngIf="!myForm.valid">フォームは無効です。</div>
</div>
```

1. バリデーションルールの設定:
各入力要素に ngModel ディレクティブを使用し、バリデーションルールを属性として設定します。
上記の例では、required 属性と minlength 属性、email 属性を使用してバリデーションルールを設定しています。

1. フォームの送信とエラーハンドリング:
フォームの送信ハンドラを設定し、バリデーションエラーが発生した場合にエラーメッセージを表示します。フォームが有効でない場合、送信ボタンを無効にします。

```typescript
import { NgForm } from '@angular/forms';

@Component({ ... })
export class NewTweetComponent {

// 新規ツイートテキスト
  public newText: string = '';

  /**
   * 新規ツイートフォーム送信時メソッド
   */
  public onSubmit(form: NgForm) {
    if (form.valid) {
      // フォームが有効な場合の処理  
      // フォームの値にアクセス
      const newText = form.value.newText;
      // ここでフォームの値を使用した処理を実行
      console.log('サブミット！' + newText); // フォームから取得
      console.log('サブミット！' + this.newText); // バインディングしているから自プロパティも当然同じ値
    }
  }
}

```


## HTTPサービス(HttpClientModule)
- モジュールのインポート
```ts
// app.module.ts
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule,
  ],
})
```


## その他
### 依存性注入(DI)
ソフトウェア設計の一種で、コンポーネントやサービス間の依存関係を効果的に管理するためのアプローチです。
- 依存関係の注入: コンポーネントやサービスは、**他のコンポーネントやサービスを直接生成またはインスタンス化せず**、外部から必要な依存関係を注入（提供）する方法です。
- 逆制御の原則: DIは逆制御（Inversion of Control）の原則を実現します。つまり、**コンポーネントやサービスは自分自身では依存関係を管理せず**、必要な依存関係を外部から受け取ります。
- 保守性とテスト性の向上: DIを使用することで、コードは疎結合（loosely coupled）になり、依存関係が透明になります。これにより、コードの保守性が向上し、ユニットテストが容易に実施できます。
- 柔軟性と再利用性: DIを採用すると、依存関係を容易に切り替えたり、再利用したりできます。新しいコンポーネントやサービスを追加する際にも、既存の依存関係を再利用できます。


### `[(ngModel)]`
`[(ngModel)]` は、Angularでフォーム要素（通常は <input> 要素）とコンポーネントのプロパティを双方向データバインディングするためのディレクティブです。これを使用することで、フォーム要素の値が変更されると、それが関連するコンポーネントのプロパティにも自動的に反映され、逆もまた然りです。

以下に `[(ngModel)]` の詳細な説明と例を示します。
1. データバインディング:
`[(ngModel)]` は、双方向データバインディングを実現します。つまり、フォーム要素の値をコンポーネントのプロパティにバインドし、そのプロパティの変更もフォーム要素に反映します。
2. 必要な手順:
`[(ngModel)]` を使用するためには、以下の手順が必要です。
   - FormsModule をアプリケーションのモジュールでインポートします。
   - `[(ngModel)]` を使用したいフォーム要素にディレクティブを適用します。
```typescript
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [FormsModule],
  // ...
})
```
```html
<input [(ngModel)]="propertyName">
```
3. フォーム要素の値の変更:
フォーム要素（通常は <input> 要素）にユーザーが値を入力すると、その値がコンポーネントの propertyName プロパティに自動的に反映されます。つまり、propertyName はフォーム要素と双方向に同期されます。
4. コンポーネント内での値の変更:
コンポーネント内で propertyName の値を変更すると、フォーム要素の値も自動的に変更されます。つまり、コンポーネント内でプロパティの値を更新すると、フォーム要素がそれに応じて更新されます。
5. 注意事項:
   - `[(ngModel)]` を使用する場合、`FormsModule` のインポートが必要です。
   - 通常、`[(ngModel)]` を使用するにはフォーム要素に`name`属性を指定してください。
   - `[(ngModel)]` は双方向データバインディングを可能にしますが、セキュリティやフォームの正当性の検証には他の手法やカスタムバリデーションも組み合わせて使用することが一般的です。

以下は、`[(ngModel)]` の例です：
```html
<input [(ngModel)]="username" name="username">
<p>入力されたユーザー名: {{ username }}</p>
```

このコードでは、username プロパティとフォーム要素の値が双方向にバインドされています。ユーザーがフォームに入力すると、username プロパティに自動的に反映され、逆に、username プロパティを変更するとフォーム要素の値も変更されます。

### パイプ演算子
Angularにおいて、パイプ演算子（Pipe Operator）は、テンプレート内でデータを変換しフォーマットするための強力なツールです。
パイプを使用することで、データの表示をカスタマイズし、テンプレート内で特定の形式でデータを表示できます。

パイプの基本的な構文: `{{ data | パイプ名: パラメータ }}`
- data: パイプを適用するデータ
- パイプ名: 使用するパイプの名前
- パラメータ（オプション）: パイプに渡す追加のパラメータ

頻出のAngularパイプとそれらの用途についての詳細
- `{{ expression | date: 'yyyy-MM-dd' }}`: 日付フォーマットを適用します。指定したフォーマットに従って日付を表示します。
- `{{ expression | slice: start:end }}`: 文字列を指定した範囲で切り取ります。
- `{{ expression | uppercase }}`: テキストを大文字に変換します。
- `{{ expression | lowercase }}`: テキストを小文字に変換します。
- `{{ expression | percent: 2 }}`: パーセント表示に変換します。小数点以下の桁数を指定できます。
- `{{ expression | async }}`: 非同期データを表示するために使用します。Observableなどの非同期データを表示できます。
- `{{ expression | json }}`: JavaScriptオブジェクトをJSON形式で表示します。主にデバッグの際に使用します。
- `{{ expression | number: '1.1-2' }}`: 数値をフォーマットします。小数点以下の桁数を指定できます。
- `{{ expression | i18nPlural: mapping }}`: 国際化対応の複数形表示を実現するために使用します。
- `{{ expression | currency: 'USD':true:'1.2-2' }}`: 通貨フォーマットを適用します。
  - 'USD' は通貨コードを指定します。
  - true は通貨記号を表示するかどうかを指定します。
  - '1.2-2' は小数点以下の桁数を指定します。
- `{{ expression | customPipe: param1:param2 }}`: **カスタムパイプを作成**し、独自のデータ変換ロジックを適用できます。

これらのパイプはAngularのテンプレート内で頻繁に使用され、データのフォーマット、変換、表示のカスタマイズに役立ちます。また、Angularではカスタムパイプを作成して独自のパイプロジックを実装することも可能です。パイプはテンプレートの可読性と保守性を向上させるのに役立つ非常に便利なツールです。



## エラーメッセージ
-  "'() => Date' を型 'Date' に割り当てることはできません"
   -  関数をDate型にセットしようとしている
   -  私は実際に`const now: Date = this.dateService.getFormattedDateTime;`でエラーが出た(getFormattedDateTimeはDate型を返す)
   -  間違いは`getFormattedDateTime`の部分。`()`を最後につけないと関数の返り値自体じゃなくて関数を入れようとしていることになる
   -  解決: `const now: Date = this.dateService.getFormattedDateTime();`



## コマンド

- 新規コンポーネント作成: `ng generate component コンポーネント名`
- 新規サービス作成: `ng generate service heroes/hero` => `app/heroes`にHeroServiceを作成する
# HTML


# bootStrap
- URL(5.0.2)
```HTML
<!-- bootstrap -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
```

- [カラム](https://getbootstrap.jp/docs/5.3/layout/columns/)
- [ボタン](https://bootstrap-guide.com/components/buttons)