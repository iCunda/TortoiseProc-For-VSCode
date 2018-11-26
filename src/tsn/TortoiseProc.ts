import * as vscode from 'vscode';
import * as process from "child_process";

export class TortoiseProc {
    /**
     * 执行TortoiseProc命令
     * @param command 命令。 查阅TortoiseSVN帮助文档
     * @param path 路径
     */
    public run(command: string, path: string) {
        const config = vscode.workspace.getConfiguration("TortoiseProc");
        let execPath = config ? config.get("path") : "";
        execPath ? undefined : execPath = "TortoiseProc";

        const args = execPath + " /command:" + command + " /path:" + path;
        process.exec(args);

        vscode.window.showInformationMessage(args);
    }
}