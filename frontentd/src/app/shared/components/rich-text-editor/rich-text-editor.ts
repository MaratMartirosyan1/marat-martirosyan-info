import { Component, OnDestroy, input, output, signal, effect, ChangeDetectionStrategy } from '@angular/core';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import { TiptapEditorDirective } from 'ngx-tiptap';

const lowlight = createLowlight(common);

@Component({
  selector: 'app-rich-text-editor',
  imports: [TiptapEditorDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './rich-text-editor.html',
  styleUrl: './rich-text-editor.scss',
})
export class RichTextEditor implements OnDestroy {
  content = input<string>('');
  contentChange = output<string>();

  editor: Editor;
  private editorState = signal(0);
  private initialized = false;

  constructor() {
    this.editor = new Editor({
      extensions: [
        StarterKit.configure({
          codeBlock: false,
        }),
        Placeholder.configure({
          placeholder: 'Start writing your content here...',
        }),
        Link.configure({
          openOnClick: false,
          HTMLAttributes: {
            rel: 'noopener noreferrer',
            target: '_blank',
          },
        }),
        Image.configure({
          HTMLAttributes: {
            class: 'editor-image',
          },
        }),
        CodeBlockLowlight.configure({
          lowlight,
        }),
      ],
      onUpdate: ({ editor }) => {
        this.contentChange.emit(editor.getHTML());
        this.editorState.update((v) => v + 1);
      },
      onSelectionUpdate: () => {
        this.editorState.update((v) => v + 1);
      },
    });

    effect(() => {
      const newContent = this.content();
      if (newContent && !this.initialized) {
        this.editor.commands.setContent(newContent);
        this.initialized = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  isActive(name: string, attributes?: Record<string, any>): boolean {
    this.editorState();
    return this.editor.isActive(name, attributes);
  }

  canUndo(): boolean {
    this.editorState();
    return this.editor.can().undo();
  }

  canRedo(): boolean {
    this.editorState();
    return this.editor.can().redo();
  }

  toggleHeading(level: 1 | 2 | 3): void {
    this.editor.chain().focus().toggleHeading({ level }).run();
  }

  toggleBold(): void {
    this.editor.chain().focus().toggleBold().run();
  }

  toggleItalic(): void {
    this.editor.chain().focus().toggleItalic().run();
  }

  toggleStrike(): void {
    this.editor.chain().focus().toggleStrike().run();
  }

  toggleCode(): void {
    this.editor.chain().focus().toggleCode().run();
  }

  toggleBulletList(): void {
    this.editor.chain().focus().toggleBulletList().run();
  }

  toggleOrderedList(): void {
    this.editor.chain().focus().toggleOrderedList().run();
  }

  toggleBlockquote(): void {
    this.editor.chain().focus().toggleBlockquote().run();
  }

  toggleCodeBlock(): void {
    this.editor.chain().focus().toggleCodeBlock().run();
  }

  setLink(): void {
    const previousUrl = this.editor.getAttributes('link')['href'];
    const url = window.prompt('Enter URL', previousUrl);

    if (url === null) return;

    if (url === '') {
      this.editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    this.editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }

  addImage(): void {
    const url = window.prompt('Enter image URL');

    if (url) {
      this.editor.chain().focus().setImage({ src: url }).run();
    }
  }

  setHorizontalRule(): void {
    this.editor.chain().focus().setHorizontalRule().run();
  }

  undo(): void {
    this.editor.chain().focus().undo().run();
  }

  redo(): void {
    this.editor.chain().focus().redo().run();
  }
}
