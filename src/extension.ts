import * as vscode from "vscode";
import { registerCommands } from "./commands";
import { registerEvents } from "./events";
import { buildState } from "./state";
import { registerStatusBar } from "./statusBar";

export function activate(context: vscode.ExtensionContext) {
  const state = buildState(context);

  registerCommands(state, context.subscriptions);
  registerEvents(state, context.subscriptions);
  registerStatusBar(state, context.subscriptions);
}

export function deactivate() {}
