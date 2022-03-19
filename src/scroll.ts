import * as vscode from "vscode";
import { State } from "./state";

export function scrollToLastLineDocument(
  state: State,
  textDocument: vscode.TextDocument
) {
  vscode.window.visibleTextEditors
    .filter((editor) => editor.document === textDocument)
    .forEach((editor) => scrollToLastLineEditor(state, editor));
}

function scrollToLastLineEditor(state: State, textEditor: vscode.TextEditor) {
  const position = new vscode.Position(
    textEditor.document.lineCount - 2,
    textEditor.selection.start.character
  );
  textEditor.selection = new vscode.Selection(position, position);

  textEditor.revealRange(
    new vscode.Range(position, position),
    state.getRevealType()
  );
}
