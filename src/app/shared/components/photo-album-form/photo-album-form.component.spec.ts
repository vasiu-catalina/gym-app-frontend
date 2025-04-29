import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoAlbumFormComponent } from './photo-album-form.component';

describe('PhotoAlbumFormComponent', () => {
  let component: PhotoAlbumFormComponent;
  let fixture: ComponentFixture<PhotoAlbumFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoAlbumFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoAlbumFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
