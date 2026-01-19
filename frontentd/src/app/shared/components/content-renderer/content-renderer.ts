import {ChangeDetectionStrategy, Component, effect, input, OnDestroy} from '@angular/core';
import {Editor} from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import {common, createLowlight} from 'lowlight';
import {TiptapEditorDirective} from 'ngx-tiptap';

const lowlight = createLowlight(common);

@Component({
  selector: 'app-content-renderer',
  imports: [TiptapEditorDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<tiptap-editor [editor]="editor" class="content-viewer"></tiptap-editor>`,
  styleUrl: './content-renderer.scss',
})
export class ContentRenderer implements OnDestroy {
  content = input.required<string>();

  editor = new Editor({
    editable: false,
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'content-image',
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
  });

  constructor() {
    effect(() => {
      const html = this.content();
      if (html) {
        this.editor.commands.setContent(html);
      }
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
