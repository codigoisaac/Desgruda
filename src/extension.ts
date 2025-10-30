import * as vscode from "vscode"; // VS Code extensibility API

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "body-breath" is now active!');

  const disposable = vscode.commands.registerCommand(
    "body-breath.helloBody",
    () => {
      const message = "Hello from Body Breath";
      vscode.window.showWarningMessage(message);
    }
  );

  context.subscriptions.push(disposable);
}
