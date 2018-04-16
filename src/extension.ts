'use strict';

import * as vscode from 'vscode';

var statusBarItem = null;
var isEnable: boolean;


export function activate(context: vscode.ExtensionContext) {

    isEnable = context.globalState.get("isEnable") || false;
    setStatus(isEnable);

    context.subscriptions.push(vscode.commands.registerCommand('autoScroll.enable', () => {
        context.globalState.update("isEnable", true);
        setStatus(true);
    }));

    context.subscriptions.push(vscode.commands.registerCommand('autoScroll.toggle', () => {
        const enabled = !isEnable;
        context.globalState.update("isEnable", enabled);

        setStatus(enabled);
    }));

    vscode.workspace.onDidOpenTextDocument(onOpen, this, context.subscriptions);
    vscode.workspace.onDidChangeTextDocument(onChange, this, context.subscriptions);
}


export function deactivate() {
}

function onOpen(e) {

    if (isEnable === true)
        goToLastLine();
}

function onChange(e) {

    if (isEnable === true && !e.document.isDirty)
        goToLastLine();
}

function goToLastLine() {

    const editor = vscode.window.activeTextEditor;    
    const position = new vscode.Position(vscode.window.activeTextEditor.document.lineCount - 1, 0)

    editor.selection =  new vscode.Selection(position,position);
    editor.revealRange(new vscode.Range(position,position),
        vscode.TextEditorRevealType.InCenterIfOutsideViewport);
}

function setStatus(enabled: boolean) {

    if (!statusBarItem) {
        statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
        statusBarItem.command = 'autoScroll.toggle';
        statusBarItem.show();
    }

    if (enabled) {
        statusBarItem.text = '$(check) Auto Scroll';
        goToLastLine();
    }
    else {
        statusBarItem.text = '$(x) Auto Scroll';
    }

    isEnable = enabled;
}