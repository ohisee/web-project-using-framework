import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { UserService } from './user.service';
import { DataService } from '../shared/data.service';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent ]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(UserComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should create the user component app', () => {
		let fixture = TestBed.createComponent(UserComponent);
		let app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
  });

	it('should use the user name from the service', () => {
		let fixture = TestBed.createComponent(UserComponent);
		let app = fixture.debugElement.componentInstance;
		let userService = fixture.debugElement.injector.get(UserService);
		fixture.detectChanges();
		expect(userService.user.name).toEqual(app.user.name);
	});

	it('should display the user name if the user is logged in', () => {
		let fixture = TestBed.createComponent(UserComponent);
		let app = fixture.debugElement.componentInstance;
		app.isLoggedIn = true;
		fixture.detectChanges();
		let compiledTemplate = fixture.debugElement.nativeElement;
		expect(compiledTemplate.querySelector('p').textContent).toContain(app.user.name);
	});

	it('should not display the user name if the user is not logged in', () => {
		let fixture = TestBed.createComponent(UserComponent);
		let app = fixture.debugElement.componentInstance;
		fixture.detectChanges();
		let compiledTemplate = fixture.debugElement.nativeElement;
		expect(compiledTemplate.querySelector('p').textContent).not.toContain(app.user.name);
	});

	it('should not fetch data successfully if not called asynchronously', () => {
		let fixture = TestBed.createComponent(UserComponent);
		let app = fixture.debugElement.componentInstance;
		let dataService = fixture.debugElement.injector.get(DataService);
		let spy = spyOn(dataService, 'getDetails').and.returnValue(Promise.resolve('Data'));
		fixture.detectChanges();
		expect(app.data).toBe(undefined);
	});

	it('should fetch data successfully if called asynchronously', async(() => {
		let fixture = TestBed.createComponent(UserComponent);
		let app = fixture.debugElement.componentInstance;
		let dataService = fixture.debugElement.injector.get(DataService);
		let spy = spyOn(dataService, 'getDetails').and.returnValue(Promise.resolve('Data'));
		fixture.detectChanges();
		fixture.whenStable().then( () => {
					expect(app.data).toBe('Data');
		});
	}));

	it('should fetch data successfully if called asynchronously using fake async', fakeAsync(() => {
		let fixture = TestBed.createComponent(UserComponent);
		let app = fixture.debugElement.componentInstance;
		let dataService = fixture.debugElement.injector.get(DataService);
		let spy = spyOn(dataService, 'getDetails').and.returnValue(Promise.resolve('Data'));
		fixture.detectChanges();
		tick()
		expect(app.data).toBe('Data');
	}));

});
