# 必要なツール {#required-tools}

これらのドキュメントの作業にはそれほど多くの作業は必要ありません。ここにリストされているものはすべて無料で、Windows、macOS、および Linux で実行できます。

## Node.js {#nodejs}

VitePress はノード上で実行されるため、これはオプションではありません。**LTS** ビルドを [nodejs.org](https://nodejs.org/en) からダウンロードします。ノード 18 以降のものはすべて機能します。

インストーラーが完了したら、ターミナルを開いて確認します。

```bash
node -v
npm -v
```

両方にバージョン番号が出力されていれば問題ありません。ターミナルにコマンドが見つからなかったことが表示された場合は、ターミナルを閉じて、新しいコマンドを開きます。インストーラーは、実行後に開かれたターミナルの PATH にノードを追加するだけです。

## Git {#git}

Git は、リポジトリをダウンロードし、変更を送り返すために使用します。[git-scm.com](https://git-scm.com/downloads) から入手してください。

新規インストールでは、自分が誰であるかを Git に伝える必要があります。そうしないと、コミットに作成者が存在しません:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

と同じ電子メール アドレスを使用してください。GitHub アカウント、または GitHub は、コミットをプロファイルに接続しません。

## Visual Studio Code {#visual-studio-code}

任意のテキスト エディターを使用できますが、リポジトリは [VS Code](https://code.visualstudio.com/) 用に設定されており、このガイドの残りの部分ではそれを使用していることを前提としています。

プロジェクト フォルダーを初めて開くと、推奨される拡張機能をインストールするかどうかを尋ねる通知が表示されます。はい、と言ってください。リストは `.vscode/extensions.json` にあり、短いものです:

|拡張子 |何をするのか |
|--- |--- |
|よりきれい |Markdown をフォーマットして、全員のファイルが同じに見えるようにします。
|Markdown プレビューの強化 || と入力すると、並べてプレビューが表示されます。
|さらに優れた TOML |`netlify.toml` の構文の強調表示 |
|藤堂の木 |プロジェクト内のすべての `TODO:` を 1 つのパネルに収集します。

::: tip
VS Code 設定で **保存時にフォーマット** をオンにします。Prettier は保存を押すたびに Markdown をクリーンアップするので、間隔について再度考える必要はありません。
:::

## GitHub アカウント {#a-github-account}

無料で、プル リクエストを開くにはアカウントが必要です。[github.com](https://github.com) にサインアップしてください。

ブラウザで編集するのではなく、マシンからプッシュする予定がある場合は、SSH キーもセットアップしてください — GitHub の [ウォークスルー](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) は、これについて私たちよりも詳しく説明しています。

## 不要なもの {#what-you-do-not-need}

コードではなく、Markdown を書いています。Vue、TypeScript、または VitePress が内部でどのように動作するかについて知る必要はありません。フォーラムに投稿できる場合は、ここにページを作成できます。
