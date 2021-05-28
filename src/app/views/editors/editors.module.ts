import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Ngx-Quill
import { QuillModule } from 'ngx-quill';

// ng2-ace-editor
import { AceEditorModule } from 'ngx-ace-editor-wrapper';

// CoreUI
import { BadgeModule, CardModule } from '@coreui/angular';

// Routing
import { EditorsRoutingModule } from './editors-routing.module';

// Views
import { CodeEditorsComponent } from './code-editors/code-editors.component';
import { TextEditorsComponent } from './text-editors/text-editors.component';

@NgModule({
    imports: [
        FormsModule,
        EditorsRoutingModule,
        QuillModule.forRoot(),
        AceEditorModule,
        CardModule,
        BadgeModule,
    ],
  declarations: [CodeEditorsComponent, TextEditorsComponent],
})
export class EditorsModule {}
