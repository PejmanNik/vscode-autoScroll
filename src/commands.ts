import * as vscode from "vscode";
import { State } from "./state";

export function registerCommands(state: State, subs: vscode.Disposable[]) {
  subs.push(
    vscode.commands.registerCommand("autoScroll.enable", () => {
      if (vscode.window.activeTextEditor) {
        state.setDocumentStatus(true, vscode.window.activeTextEditor.document);
      }
    })
  );

  subs.push(
    vscode.commands.registerCommand("autoScroll.disable", () => {
      if (vscode.window.activeTextEditor) {
        state.setDocumentStatus(false, vscode.window.activeTextEditor.document);
      }
    })
  );

  subs.push(
    vscode.commands.registerCommand("autoScroll.toggle", () => {
      if (vscode.window.activeTextEditor) {
        const document = vscode.window.activeTextEditor.document;
        state.setDocumentStatus(!state.isDocumentActive(document), document);
      }
    })
  );
}
