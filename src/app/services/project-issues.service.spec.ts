import { TestBed } from '@angular/core/testing';

import { ProjectIssuesService } from './project-issues.service';

describe('ProjectIssuesService', () => {
  let service: ProjectIssuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectIssuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
