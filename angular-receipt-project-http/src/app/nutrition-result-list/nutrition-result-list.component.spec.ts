import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionResultListComponent } from './nutrition-result-list.component';

describe('NutritionResultListComponent', () => {
  let component: NutritionResultListComponent;
  let fixture: ComponentFixture<NutritionResultListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NutritionResultListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NutritionResultListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
