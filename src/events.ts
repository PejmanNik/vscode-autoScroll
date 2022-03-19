import * as vscode from "vscode";
import { scrollToLastLineDocument } from "./scroll";
import { State } from "./state";

export function registerEvents(state: State, subs: vscode.Disposable[]) {
  subs.push(vscode.workspace.onDidOpenTextDocument(onOpen(state)));
  subs.push(vscode.workspace.onDidChangeTextDocument(onChange(state)));
  subs.push(
    vscode.workspace.onDidChangeConfiguration(onChangeConfiguration(state))
  );
}

const onChangeConfiguration = (state: State) => () => {
  state.reloadConfiguration();
};

const onChange = (state: State) => (event: vscode.TextDocumentChangeEvent) => {
  if (state.isDocumentActive(event.document) && !event.document.isDirty) {
    scrollToLastLineDocument(state, event.document);
  }
};

const onOpen = (state: State) => (textDocument: vscode.TextDocument) => {
  scrollToLastLineDocument(state, textDocument);
};
