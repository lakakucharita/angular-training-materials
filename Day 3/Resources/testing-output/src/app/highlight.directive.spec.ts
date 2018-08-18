import { HighlightDirective } from './highlight.directive';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { AppComponent } from './app.component';
import { TestService } from './test.service';
import { DependencyService } from './dependency.service';
import { By } from '../../node_modules/@angular/platform-browser';

describe('HighlightDirective', () => {
    let appComponentFixture: ComponentFixture<AppComponent>;

    beforeEach(() => {
        appComponentFixture = TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                HighlightDirective
            ],
            providers: [
                TestService,
                DependencyService
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).createComponent(AppComponent);

        appComponentFixture.detectChanges();
    });

    it('should have yellow (div selector approach)', () => {
        const affectedElement: HTMLElement = appComponentFixture.nativeElement.querySelector('div');
        const bgColor = affectedElement.style.backgroundColor;
        expect(bgColor).toBe('yellow');
    });

    it('should have yellow (by.directive approach)', () => {
        const affectedElement: DebugElement[] = appComponentFixture.debugElement.queryAll(By.directive(HighlightDirective));
        if (affectedElement.length > 0) {
            const bgColor = affectedElement[0].nativeElement.style.backgroundColor;
            expect(bgColor).toBe('yellow');
        }
    });
});
