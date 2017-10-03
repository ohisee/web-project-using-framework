/**
 * Text area editor highlight directive
 */
import { Directive, OnInit, ElementRef } from '@angular/core';
import * as CodeMirror from 'codemirror';
import 'codemirror/mode/sql/sql';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/sql-hint';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/theme/monokai.css';

@Directive({
  selector: '[appEditorHighlight]'
})
export class EditorHighlightDirective implements OnInit {

	private codemirror: any;

  constructor(private elementRef: ElementRef) { }

	ngOnInit () {
		this.codemirror = CodeMirror.fromTextArea(this.elementRef.nativeElement, {
			'lineNumbers': true,
			'smartIndent': true,
			'matchBrackets': true,
			'mode': 'text/x-sql',
			'theme': 'monokai',
			'autoCloseBrackets': true,
			'extraKeys': {
				'Ctrl-Space': 'autocomplete'
			}
		});
	}

}
