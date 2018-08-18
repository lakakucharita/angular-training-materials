import { TestBed, inject } from '@angular/core/testing';

import { TestService } from './test.service';
import { DependencyService } from './dependency.service';
import { of } from 'rxjs';

describe('TestService', () => {
    beforeEach(() => {
        let dependencyService = jasmine.createSpyObj('DependencyService', ['thisIsADependency']);

        dependencyService.thisIsADependency.and.returnValue(of('mock dependency result'));

        TestBed.configureTestingModule({
            providers: [
                TestService,
                [{ provide: DependencyService, useValue: dependencyService }]
            ]
        });
    });

    it('should be created', inject([TestService], (service: TestService) => {
        expect(service).toBeTruthy();
    }));

    it('should return synchronous text',
        inject([TestService],
            (service: TestService) => {
                expect(service.synchronousTest()).toEqual('hello world');
            }
        )
    );

    it('should return asynchronous text',
        inject([TestService],
            (service: TestService) => {
                service.asynchronousTest().subscribe(
                    (text) => {
                        expect(text).toEqual('mock dependency result');
                    }
                );
            }
        )
    );
});
