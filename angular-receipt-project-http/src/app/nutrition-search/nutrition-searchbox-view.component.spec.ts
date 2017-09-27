import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionSearchboxViewComponent } from './nutrition-searchbox-view.component';

describe('NutritionSearchboxViewComponent', () => {
  let component: NutritionSearchboxViewComponent;
  let fixture: ComponentFixture<NutritionSearchboxViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NutritionSearchboxViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NutritionSearchboxViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
