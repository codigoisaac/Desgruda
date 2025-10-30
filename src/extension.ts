import * as vscode from "vscode";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import MagicString from "magic-string";

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
      const code = document.getText();
      const magic = new MagicString(code);

      let ast;
      try {
        ast = parse(code, {
          sourceType: "module",
          plugins: ["typescript", "jsx"],
          tokens: true,
        });
      } catch (err) {
        vscode.window.showErrorMessage("Failed to parse document as JS/TSX.");
        console.error(err);
        return;
      }

      const isElementNode = (node: any) =>
        node && (node.type === "JSXElement" || node.type === "JSXFragment");

      traverse(ast as any, {
        JSXElement(path: any) {
          handleChildrenArray(path.node.children);
        },
        JSXFragment(path: any) {
          handleChildrenArray(path.node.children);
        },
      });

      function handleChildrenArray(children: any[]) {
        if (!children || children.length < 2) return;

        const elementItems: { idx: number; node: any }[] = [];
        for (let i = 0; i < children.length; i++) {
          const ch = children[i];
          if (isElementNode(ch)) {
            elementItems.push({ idx: i, node: ch });
          }
        }

        for (let i = 0; i < elementItems.length - 1; i++) {
          const a = elementItems[i].node;
          const b = elementItems[i + 1].node;

          const between = code.slice(a.end, b.start);

          // If already two or more newlines, skip
          if (/\n\s*\n/.test(between)) continue;

          // Determine the indentation of the next sibling
          const bLineStart = code.lastIndexOf("\n", b.start) + 1;
          const bIndentMatch = /^(\s*)/.exec(code.slice(bLineStart, b.start));
          const bIndent = bIndentMatch ? bIndentMatch[1] : "";

          // Insert a blank line with the same indentation as the next element
          magic.appendLeft(b.start, "\n" + bIndent);
        }
      }

      const result = magic.toString();

      if (result === code) {
        vscode.window.showInformationMessage(
          "No sibling JSX elements needed spacing."
        );
        return;
      }

      const fullRange = new vscode.Range(
        document.positionAt(0),
        document.positionAt(code.length)
      );

      await editor.edit((editBuilder) => {
        editBuilder.replace(fullRange, result);
      });

      vscode.window.showInformationMessage(
        "Body Breath: 🍃 Inserted blank lines between sibling elements."
      );
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
