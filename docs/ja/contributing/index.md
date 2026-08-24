# 投稿 {#contributing}

このサイトは、それを使用する人々によって書かれています。そのすべてのページは、
誰かが何かを考え出し、それを時間をかけて書き留めることから始まりました。

このページは、最初から最後までのローカル セットアップです。
のタイプミスを修正したり、何か間違っていることを報告したりするために、これを使用する必要はありません。[貢献方法](/ja/contributing/methods) はより速いルートをカバーしており、
のルートには端末が関与しません。いずれにしても、プル リクエストを開く前に、[規約とルール](/ja/contributing/terms-rules)
をお読みください。

## 必要なもの {#what-you-need}

- [Node.js](https://nodejs.org/en) 18 以降
- [ツイート](https://git-scm.com/downloads)
- A[GitHub](https://github.com) アカウント
- エディタ — リポジトリは [VS Code](https://code.visualstudio.com/)

[必要なツール](/ja/contributing/tools) には、それぞれのインストール ノートと
の初回実行構成が含まれています。

##  {#set-up-locally}

[リポジトリ](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations)
を GitHub にフォークしてから、フォークのクローンを作成してインストールします:

```bash
git clone https://github.com/YOUR-USERNAME/Unofficial-Mordhau-Documentations.git
cd Unofficial-Mordhau-Documentations
npm install
```

開発サーバーを起動します:

```bash
npm run docs:dev
```

アドレスを出力します通常は `http://localhost:5173` でサービスを提供しています。
を実行したままにしておきます。保存するとページがリロードされます。

## 変更を加えます {#make-your-change}

`main` ではなくブランチで作業します:

```bash
git checkout -b fix-rcon-ports
```

ページは `docs/<language>/` の下に存在するため、英語のページは `docs/en/` に属します。
新しいページには、`.vitepress/config.mts` のエントリも必要です。そうでない場合は、
サイトに何もリンクしていません。

[Markdownの使い方](/ja/contributing/how-to-use-markdown)ファイル
の規約とハウス スタイルについて説明します。[VitePressとは](/ja/contributing/vitepress)
では、構成ファイルとプロジェクトがどのように組み合わされるかについて説明します。

## 送信する前に確認してください {#check-it-before-you-send-it}

```bash
npm run docs:build
```

内部リンクが壊れているとビルドが失敗します。これは、
で最も犯しやすい間違いであり、プレビューで最も見逃しやすい間違いであるため、
の 1 行の変更でも実行する価値があります。合格した場合、`npm run docs:preview` は、
ビルドが生成したものを正確に提供します。

## 送信してください {#send-it}

```bash
git add .
git commit -m "Correct the RCON port numbers"
git push origin fix-rcon-ports
```

GitHub は、次回アクセスしたときにそのブランチからプル リクエストを開くことを提案します
リポジトリ。何が変わったのか、なぜ変わったのかを述べてください。

何かを求めるレビューが戻ってきた場合は、別のコミットを同じ
ブランチにプッシュします。プル リクエスト自体が更新されます。マージされると、Netlify は
を再構築してサイトを公開します。これには 1 ～ 2 分かかります。
