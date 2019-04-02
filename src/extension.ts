'use strict';

import * as vscode from 'vscode';

let statusBarItem = null;
let isEnable: boolean;
let revealType : vscode.TextEditorRevealType;

export function activate(context: vscode.ExtensionContext) {

    isEnable = context.globalState.get("isEnable") || false;
    onChangeConfiguration();
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

    vscode.workspace.onDidChangeConfiguration(onChangeConfiguration, this, context.subscriptions)
    vscode.workspace.onDidOpenTextDocument(onOpen, this, context.subscriptions);
    vscode.workspace.onDidChangeTextDocument(onChange, this, context.subscriptions);
}


export function deactivate() { }

function onChangeConfiguration() {
    const config = vscode.workspace.getConfiguration('autoscroll');
    const keepLastLineInCenter = config.get('keepLastLineInCenter');
    
    if (keepLastLineInCenter)
        revealType = vscode.TextEditorRevealType.InCenterIfOutsideViewport
    else
        revealType = vscode.TextEditorRevealType.Default;
}

function onOpen() {

    if (isEnable === true)
        goToLastLine(vscode.window.activeTextEditor);
}

function onChange(e: vscode.TextDocumentChangeEvent) {

    if (isEnable === true && !e.document.isDirty)
        goToLastLineForDocument(e.document);
}

function goToLastLineForDocument(changedDoc: vscode.TextDocument) {

    vscode.window.visibleTextEditors
        .filter(editor => editor.document === changedDoc)
        .forEach(goToLastLine);
}

function goToLastLine(textEditor: vscode.TextEditor) {

    if (!textEditor)
        return

    const position = new vscode.Position(textEditor.document.lineCount - 1, 0)
    textEditor.selection = new vscode.Selection(position, position);
    textEditor.revealRange(new vscode.Range(position, position), revealType);
}

function setStatus(enabled: boolean) {

    if (!statusBarItem) {
        statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
        statusBarItem.command = 'autoScroll.toggle';
        statusBarItem.show();
    }

    if (enabled) {
        statusBarItem.text = '$(check) Auto Scroll';
        goToLastLine(vscode.window.activeTextEditor);
    }
    else {
        statusBarItem.text = '$(x) Auto Scroll';
    }

    isEnable = enabled;
}