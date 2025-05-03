import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoAlbumViewComponent } from './photo-album-view.component';

describe('PhotoAlbumViewComponent', () => {
  let component: PhotoAlbumViewComponent;
  let fixture: ComponentFixture<PhotoAlbumViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoAlbumViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoAlbumViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
