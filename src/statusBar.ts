import * as vscode from "vscode";
import constant from "./constant";
import { State } from "./state";

export function registerStatusBar(state: State, subs: vscode.Disposable[]) {
  const statusBar = createStatusBarItem();
  state.onActiveStatusChanged((isActive) =>
    updateStatusBarItem(statusBar, isActive)
  );

  reloadStatusBarItem(
    state,
    statusBar,
    vscode.window.activeTextEditor?.document
  );

  subs.push(
    vscode.window.onDidChangeActiveTextEditor((event) =>
      reloadStatusBarItem(state, statusBar, event?.document)
    )
  );
}

function createStatusBarItem(): vscode.StatusBarItem {
  const item = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  item.command = constant.toggle;
  return item;
}

function reloadStatusBarItem(
  state: State,
  statusBar: vscode.StatusBarItem,
  document: vscode.TextDocument | undefined
) {
  const isActive = document ? state.isDocumentActive(document) : undefined;
  updateStatusBarItem(statusBar, isActive);
}

function updateStatusBarItem(
  statusBar: vscode.StatusBarItem,
  isActive: boolean | undefined
) {
  if (isActive === true) {
    statusBar.tooltip = "Auto Scroll is Active";
    statusBar.text = "$(check) AS";
    statusBar.show();
  } else if (isActive === false) {
    statusBar.tooltip = "Auto Scroll is Deactivate";
    statusBar.text = "$(x) AS";
    statusBar.show();
  } else {
    statusBar.hide();
  }
}
