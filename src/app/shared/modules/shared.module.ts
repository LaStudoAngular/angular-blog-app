import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { AuthService } from '../services/auth.service';

@NgModule({
  imports: [HttpClientModule, QuillModule.forRoot()],
  exports: [HttpClientModule, QuillModule],
  providers: [AuthService],
})
export class SharedModule {}
