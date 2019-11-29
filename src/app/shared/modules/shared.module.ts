import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [HttpClientModule, QuillModule.forRoot(), FormsModule],
  exports: [HttpClientModule, QuillModule, FormsModule],
  providers: [AuthService],
})
export class SharedModule {}
