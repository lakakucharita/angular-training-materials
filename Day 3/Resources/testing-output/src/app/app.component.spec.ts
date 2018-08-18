import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TestService } from './test.service';
import { of } from 'rxjs';
import { last } from 'rxjs/operators';
describe('AppComponent', () => {
  let fixture, appComponentInstance:AppComponent;

  beforeEach(async(() => {
    let testService = jasmine.createSpyObj('TestService', ['synchronousTest', 'asynchronousTest']);

    testService.synchronousTest.and.returnValue('hello world');
    testService.asynchronousTest.and.returnValue(of('hello world'));

    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        [{ provide: TestService, useValue: testService }]
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(AppComponent);
    appComponentInstance = fixture.debugElement.componentInstance;
  }));
  it('should create the app', async(() => {
    expect(appComponentInstance).toBeTruthy();
  }));
  it('should render title in an h1 tag (synchronous approach)', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('hello world');
  });

  it('should get async text (asynchronous approach)', (done: DoneFn) => {
    fixture.detectChanges();
    appComponentInstance.title$.pipe(last()).subscribe(
      (titleVal) => {
        expect(titleVal).toEqual('hello world');
        done();
      }
    )
  });

});
