import * as vscode from 'vscode';
import { TortoiseProc } from './tsn/TortoiseProc';

export function activate(context: vscode.ExtensionContext) {
    let commands = ["TortoiseProc.update", "TortoiseProc.commit", "TortoiseProc.log", "TortoiseProc.dif", "TortoiseProc.revert"];
    commands.forEach(command => {
        let disposable = vscode.commands.registerCommand(command, () => {
            if (vscode.window.activeTextEditor)
                new TortoiseProc().run(command.replace("TortoiseProc.", ""), vscode.window.activeTextEditor.document.uri.fsPath);
        });
        context.subscriptions.push(disposable);
    });
}

export function deactivate() {
}