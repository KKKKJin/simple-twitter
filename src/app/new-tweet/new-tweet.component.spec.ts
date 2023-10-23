import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTweetComponent } from './new-tweet.component';

describe('NewTweetComponent', () => {
  let component: NewTweetComponent;
  let fixture: ComponentFixture<NewTweetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewTweetComponent]
    });
    fixture = TestBed.createComponent(NewTweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
