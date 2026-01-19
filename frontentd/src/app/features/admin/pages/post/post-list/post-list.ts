import {Component, inject, OnInit, signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AdminPostService} from '../../../services/admin-post.service';
import {Post} from '../../../../../core/models/post.model';
import {PostCard} from '../../../components/post-card/post-card';

@Component({
  selector: 'app-post-list',
  imports: [RouterLink, PostCard],
  templateUrl: './post-list.html'
})
export class PostList implements OnInit {
  private adminPostService = inject(AdminPostService);
  private router = inject(Router);

  posts = signal<Post[]>([]);
  isLoading = signal(true);

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.isLoading.set(true);
    this.adminPostService.getAll().subscribe({
      next: (response) => {
        this.posts.set(response.data);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Failed to load posts:', error);
        this.isLoading.set(false);
      },
    });
  }

  publish(id: string): void {
    if (confirm('Are you sure you want to publish this post?')) {
      this.adminPostService.publish(id).subscribe({
        next: () => {
          this.loadPosts();
        },
        error: (error) => {
          console.error('Failed to publish post:', error);
        },
      });
    }
  }

  unpublish(id: string): void {
    if (confirm('Are you sure you want to unpublish this post?')) {
      this.adminPostService.unpublish(id).subscribe({
        next: () => {
          this.loadPosts();
        },
        error: (error) => {
          console.error('Failed to unpublish post:', error);
        },
      });
    }
  }

  deletePost(id: string): void {
    if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      this.adminPostService.delete(id).subscribe({
        next: () => {
          this.loadPosts();
        },
        error: (error) => {
          console.error('Failed to delete post:', error);
        },
      });
    }
  }

  editPost(id: string): void {
    void this.router.navigate(['/admin/posts/edit', id]);
  }
}
