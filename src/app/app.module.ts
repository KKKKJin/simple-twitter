import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // フォームモジュールのインポート
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchFieldComponent } from './search-field/search-field.component';
import { NewTweetComponent } from './new-tweet/new-tweet.component';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { TweetComponent } from './tweet/tweet.component';
import { TweetsComponent } from './tweets/tweets.component';
import { AccountHeaderComponent } from './account-header/account-header.component';
import { UserIconComponent } from './user-icon/user-icon.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchFieldComponent,
    NewTweetComponent,
    HomeComponent,
    AccountComponent,
    TweetComponent,
    TweetsComponent,
    AccountHeaderComponent,
    UserIconComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
