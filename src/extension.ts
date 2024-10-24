import * as vscode from 'vscode';
import {
  TextDocumentChangeEvent,
  Range,
  TextDocumentContentChangeEvent,
} from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "test-extension" is now active!');

  const decorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: 'rgba(255,255,0,0.3)',
  });

  const disposable = vscode.workspace.onDidChangeTextDocument(
    async (e: TextDocumentChangeEvent) => {
      const clipboardText: string = await vscode.env.clipboard.readText();

      if (clipboardText && clipboardText === e.contentChanges[0].text) {
        const editor = vscode.window.activeTextEditor;

        if (editor && e.document === editor.document) {
          const ranges: Array<Range> = e.contentChanges.map(
            (changeEvent: TextDocumentContentChangeEvent) => {
              const changedLines: Array<string> = changeEvent.text.split('\n');

              return new vscode.Range(
                changeEvent.range.start,
                new vscode.Position(
                  changeEvent.range.start.line + changedLines.length - 1,
                  (changedLines.length > 1
                    ? changedLines.at(-1)!.length
                    : changeEvent.text.length) +
                    changeEvent.range.start.character
                )
              );
            }
          );

          editor.setDecorations(decorationType, ranges);
        }
      }
      vscode.workspace.textDocuments;
    }
  );

  const disposable2 = vscode.commands.registerCommand(
    'test-extension.helloWorld',
    () => {
		vscode.window.showInformationMessage('Hi Threatrix!');
	}
  );

  context.subscriptions.push(disposable, disposable2);
}

export function deactivate() {}
