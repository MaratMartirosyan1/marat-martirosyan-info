import {Component, inject, signal, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, ActivatedRoute, RouterLink} from '@angular/router';
import {AdminProjectService} from '../../../services/admin-project.service';
import {RichTextEditor} from '../../../../../shared/components/rich-text-editor/rich-text-editor';
import {
  ImageUploader,
  ImageUploadFn,
  ImageDeleteFn
} from '../../../../../shared/components/image-uploader/image-uploader';
import {CreateProjectDto} from '../../../../../core/models/project.model';
import {PROJECTS_CONTENT} from '../../../../projects/projects.constants';

@Component({
  selector: 'app-project-editor',
  imports: [ReactiveFormsModule, RouterLink, ImageUploader, RichTextEditor],
  templateUrl: './project-editor.html',
})
export class ProjectEditor implements OnInit {
  private fb = inject(FormBuilder);
  private adminProjectService = inject(AdminProjectService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  projectForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    intro: ['', Validators.required],
    description: ['', Validators.required],
    image: [''],
    technologiesString: ['', Validators.required],
    category: ['', Validators.required],
    demoUrl: [''],
    githubUrl: [''],
    featured: [false],
  });

  categories = PROJECTS_CONTENT.categories.filter(c => c !== 'All');

  isSaving = signal(false);
  errorMessage = signal('');
  isEditMode = signal(false);
  projectId = signal<string | null>(null);

  uploadImage: ImageUploadFn = (file: File) => this.adminProjectService.uploadImage(file);
  deleteImage: ImageDeleteFn = (url: string) => this.adminProjectService.deleteImage(url);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.projectId.set(id);
      this.loadProject(id);
    }
  }

  loadProject(id: string): void {
    this.adminProjectService.getById(id).subscribe({
      next: (response) => {
        const project = response.data;
        this.projectForm.patchValue({
          title: project.title,
          intro: project.intro || '',
          description: project.description,
          image: project.image,
          technologiesString: project.technologies.join(', '),
          category: project.category,
          demoUrl: project.demoUrl || '',
          githubUrl: project.githubUrl || '',
          featured: project.featured || false,
        });
      },
      error: (error) => {
        console.error('Failed to load project:', error);
        this.errorMessage.set('Failed to load project');
      },
    });
  }

  onImageChange(url: string): void {
    this.projectForm.patchValue({image: url});
  }

  onDescriptionChange(description: string): void {
    this.projectForm.patchValue({description});
  }

  onSave(): void {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    this.isSaving.set(true);
    this.errorMessage.set('');

    const formValue = this.projectForm.getRawValue();
    const projectData: CreateProjectDto = {
      title: formValue.title,
      intro: formValue.intro,
      description: formValue.description,
      image: formValue.image,
      technologies: formValue.technologiesString.split(',').map((tech) => tech.trim()).filter((tech) => tech),
      category: formValue.category,
      demoUrl: formValue.demoUrl || undefined,
      githubUrl: formValue.githubUrl || undefined,
      featured: formValue.featured,
    };

    const request = this.isEditMode()
      ? this.adminProjectService.update(this.projectId()!, projectData)
      : this.adminProjectService.create(projectData);

    request.subscribe({
      next: () => {
        void this.router.navigate(['/admin/projects']);
      },
      error: (error) => {
        console.error('Failed to save project:', error);
        this.errorMessage.set(error.error?.message || 'Failed to save project. Please try again.');
        this.isSaving.set(false);
      },
    });
  }
}
