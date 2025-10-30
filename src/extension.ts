import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "body-breath.bodyBreath",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No active editor found.");
        return;
      }

      const document = editor.document;
      const text = document.getText();

      // Regex: find closing tag or self-closing tag followed by another tag with no blank line
      const formatted = text.replace(
        /(>)(\s*\r?\n\s*)(<)/g,
        (_match, p1, _p2, p3) => `${p1}\n\n${p3}`
      );

      const fullRange = new vscode.Range(
        document.positionAt(0),
        document.positionAt(text.length)
      );

      await editor.edit((editBuilder) => {
        editBuilder.replace(fullRange, formatted);
      });

      await vscode.workspace.applyEdit(new vscode.WorkspaceEdit());

      await vscode.commands.executeCommand("editor.action.formatDocument");

      vscode.window.showInformationMessage(
        "Body Breath: Added blank lines between sibling elements!"
      );
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
