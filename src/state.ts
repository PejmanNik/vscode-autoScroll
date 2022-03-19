import * as vscode from "vscode";
import constant from "./constant";

type ActiveStatusChanged = (
  isActive: boolean,
  document: vscode.TextDocument
) => void;

export interface State {
  setDocumentStatus(isActive: boolean, textEditor: vscode.TextDocument): void;
  isDocumentActive(document: vscode.TextDocument): boolean;
  onActiveStatusChanged(callback: ActiveStatusChanged): void;
  reloadConfiguration(): void;
  getRevealType(): vscode.TextEditorRevealType;
}

export function buildState(context: vscode.ExtensionContext): State {
  const state = context.globalState;

  let config = getConfiguration();
  const reloadConfiguration = () => {
    config = getConfiguration();
  };

  const statusChangeSubscribes: ActiveStatusChanged[] = [];

  return {
    setDocumentStatus: setDocumentStatus(state, statusChangeSubscribes),
    isDocumentActive: isDocumentActive(state),
    reloadConfiguration: reloadConfiguration,
    onActiveStatusChanged: (callback) => statusChangeSubscribes.push(callback),
    getRevealType: () => getRevealType(config),
  };
}

const getConfiguration = () => vscode.workspace.getConfiguration(constant.name);

const getRevealType = (
  config: vscode.WorkspaceConfiguration
): vscode.TextEditorRevealType => {
  const keepLastLineInCenter = config.get(constant.keepLastLineInCenter);
  return keepLastLineInCenter === true
    ? vscode.TextEditorRevealType.InCenter
    : vscode.TextEditorRevealType.Default;
};

const isDocumentActive =
  (state: vscode.Memento) => (textDocument: vscode.TextDocument) => {
    const activeDocuments = getActiveDocuments(state);
    const uri = textDocument.uri.toString();

    return activeDocuments.has(uri);
  };

const setDocumentStatus =
  (state: vscode.Memento, subscribes: ActiveStatusChanged[]) =>
  (isActive: boolean, textDocument: vscode.TextDocument): void => {
    const activeDocuments = getActiveDocuments(state);
    const uri = textDocument.uri.toString();

    if (!isActive) {
      activeDocuments.delete(uri);
    } else {
      activeDocuments.add(uri);
    }

    state.update(constant.activeDocument, [...activeDocuments.values()]);
    subscribes.forEach((x) => x(isActive, textDocument));
  };

const getActiveDocuments = (state: vscode.Memento): Set<string> =>
  new Set<string>(state.get(constant.activeDocument, []));
