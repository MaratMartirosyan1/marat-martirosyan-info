import {Component, effect, input, output, viewChild} from '@angular/core';
import {QuillEditorComponent} from 'ngx-quill';

@Component({
  selector: 'app-rich-text-editor',
  imports: [QuillEditorComponent],
  templateUrl: './rich-text-editor.html',
  styles: `
    :host ::ng-deep .ql-toolbar {
      @apply bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700 rounded-t-lg;
    }

    :host ::ng-deep .ql-container {
      @apply border-gray-300 dark:border-gray-700 rounded-b-lg bg-white dark:bg-gray-800;
    }

    :host ::ng-deep .ql-editor {
      @apply text-gray-900 dark:text-white;
    }

    :host ::ng-deep .ql-editor.ql-blank::before {
      @apply text-gray-400 dark:text-gray-500 italic;
    }

    :host ::ng-deep .ql-snow .ql-stroke {
      @apply stroke-gray-700 dark:stroke-gray-300;
    }

    :host ::ng-deep .ql-snow .ql-fill {
      @apply fill-gray-700 dark:fill-gray-300;
    }

    :host ::ng-deep .ql-snow .ql-picker-label {
      @apply text-gray-700 dark:text-gray-300;
    }
  `,
})
export class RichTextEditor {
  content = input<string>('');
  contentChange = output<string>();

  editor = viewChild<QuillEditorComponent>('editor');

  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['blockquote', 'code-block'],
      [{ color: [] }, { background: [] }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  constructor() {
    effect(() => {
      const contentValue = this.content();
      const editorComponent = this.editor();
      if (editorComponent && contentValue) {
        const quillEditor = editorComponent.quillEditor;
        if (quillEditor) {
          const currentContent = quillEditor.root.innerHTML;
          if (currentContent !== contentValue) {
            quillEditor.clipboard.dangerouslyPasteHTML(contentValue);
          }
        }
      }
    });
  }

  onContentChange(event: any): void {
    this.contentChange.emit(event.html);
  }
}
