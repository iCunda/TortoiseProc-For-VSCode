import * as vscode from 'vscode';
import * as process from "child_process";

class TortoiseProc {
    /** 获取TortoiseProc.exe的路径 */
    public get path(): string {
        const config = vscode.workspace.getConfiguration("TortoiseProc");
        return config && config.get("path") || "TortoiseProc.exe";
    }
    /**
     * 执行TortoiseProc命令
     * @param command 命令。 查阅TortoiseSVN帮助文档
     * @param args 路径
     */
    public run(command: string, ...args: any[]) {
        let paths: string[] = [];
        args.forEach(arg => {
            if (arg instanceof vscode.Uri && paths.indexOf(arg.fsPath) === -1)
                paths.push(arg.fsPath);
            else if (arg instanceof Array) {
                arg.forEach(arg => {
                    if (arg instanceof vscode.Uri && paths.indexOf(arg.fsPath) === -1)
                        paths.push(arg.fsPath);
                });
            }
        });

        let pathsExpr = paths.join("*") || (vscode.window.activeTextEditor && vscode.window.activeTextEditor.document.uri.fsPath);
        if (pathsExpr)
            process.exec(this.path + " /command:" + command + " /path:" + pathsExpr);
        
        console.log(this.path + " /command:" + command + " /path:" + pathsExpr);
        paths.forEach(path => console.log(path));
    }

    private constructor() { }
    private static _instance: TortoiseProc;
    public static getInstance(): TortoiseProc {
        return TortoiseProc._instance || (TortoiseProc._instance = new TortoiseProc());
    }
}

export function activate(context: vscode.ExtensionContext) {
    let commands = ["TortoiseProc.update", "TortoiseProc.commit", "TortoiseProc.log", "TortoiseProc.diff", "TortoiseProc.blame", "TortoiseProc.revert"];
    commands.forEach(command => {
        context.subscriptions.push(vscode.commands.registerCommand(
            command,
            (...args: any[]) => TortoiseProc.getInstance().run(command.replace("TortoiseProc.", ""), ...args))
        );
    });
}

export function deactivate() {

}
