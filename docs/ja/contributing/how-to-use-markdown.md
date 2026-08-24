# Markdown の使用方法 {#how-to-use-markdown}

[前のページ](/ja/contributing/whats-markdown) のすべてがここで機能します。このページでは、VitePress が上に追加する追加機能と、このリポジトリで従う規則について説明します。

## フロントマター {#frontmatter}

ファイルの先頭にある、3 つのダッシュで囲まれたブロックはフロントマターです。これはページに表示されるのではなくページを構成し、ファイルの最初に置く必要があります。

```md
---
layout: doc
sidebar: false
aside: false
---

# My Page
```

知っておく価値のあるキー:

|キー |効果 |
|--- |--- |
|`layout` |通常ページの場合は `doc`、ランディング ページの場合は `home` |
|`sidebar` |`false` は左側のナビゲーションを非表示にします |
|`aside` |`false` は、右側のページ上の目次を非表示にします。
|`title` |ブラウザーのタブのタイトルをオーバーライドします。

ほとんどのページには前付けがまったく必要ありません。何かをオフにしたい場合にのみ追加します。

## コールアウト ボックス {#callout-boxes}

これらは、サイト全体で使用されるカラー パネルです。3 つのコロンとタイプで開き、3 つのコロンで閉じます:

```md
::: tip
Handy but optional advice.
:::

::: warning
Something the reader can get wrong.
:::

::: danger
Something that will break their server or lose their data.
:::

::: info
Extra background that is not needed to follow the steps.
:::
```

タイプの後にテキストを置くことで、カスタム見出しを付けることができます:

```md
::: tip RECOMMENDED
This shows "RECOMMENDED" as the box title instead of "TIP".
:::
```

これらは慎重に使用してください。1 つおきの段落が色付きのボックス内にあるページは、何もないページよりも読みにくくなります。

## コード ブロック {#code-blocks}

言語の名前は常に開始バッククォートの後に付けます。構文の強調表示をオンにし、それが何であるかを読者に伝えます。見てます:

````md
```bash
steamcmd +匿名ログイン +app_update 629800 検証 +終了
```
````

`bash`、`ini`、`json`、`md`、`js`、および `ts` は、これらのドキュメントのほぼすべてをカバーしています。

### 特定の行を強調表示する {#highlighting-specific-lines}

ブロックの一部に注意を引くには、中括弧内に行番号を入れます:

````md
```ini{2}
[/Script/Mordhau.MordhauGameSession]
MaxSlots=64
ServerName=私のサーバー
```
````

### Windows と Linux を並べて表示 {#windows-and-linux-side-by-side}

ステップがプラットフォームによって異なる場合は、セクションを 2 回記述するのではなく、コード グループを使用します。

````md
::: code-group

```powershell [Windows]
.\steamcmd.exe +匿名ログイン +app_update 629800 検証 +終了
```

```bash [Linux]
./steamcmd.sh +匿名ログイン +app_update 629800 検証 +終了
```

:::
````

リーダーはタブを取得し、必要なタブのみを表示します。

## ページ間のリンク {#links-between-pages}

内部リンクは言語フォルダーから始まり、`.md` から始まります:

```md
[Required Tools](/en/contributing/tools)
[RCON Guide](/en/rcon-guide/)
```

`/` で終わるパスは、そのフォルダーの `index.md` を指します。

::: warning
内部リンクは、`../tools` のような相対リンクではなく、サイト ルートからのフル パスで記述します。相対リンクはページが移動するとすぐに壊れ、動作します。GitHub プレビューでは、サイト上とは異なります。
:::

翻訳されたセクションのページにリンクするときは、読者がその言語で読めるようにしてください。フランス語のページから、`/en/rcon-guide/` ではなく、`/fr/rcon-guide/` へのリンク。

## 画像 {#images}

ファイルを使用するページと同じフォルダーに置き、サイトのルートからリンクします:

```md
![Server browser showing a custom server](/en/dedicated-server-guide/browser.webp)
```

可能な場合は、スクリーンショットを `.webp` として保存します。これらは、同じ品質の PNG のサイズのほんの一部であり、このリポジトリはすでに十分な大きさです。

## 新しいページの追加 {#adding-a-new-page}

ファイルの作成は作業の半分にすぎません。誰も移動できないページは存在しないのも同然です。

1. `docs/` の下の適切なフォルダーに `.md` ファイルを作成します。
2. `.vitepress/config.mts` を開きます。
3. 追加先のロケールを見つけて、そのページを指す `nav` または `sidebar` にエントリを追加します。
4. `npm run docs:dev` を実行し、クリックします。

ページがすべての言語に属する場合は、最初に英語を追加し、残りは翻訳者に任せます。空のページは、失われたページよりも悪いです。

## ハウス スタイル {#house-style}

- ページごとに上部に 1 つの `#` 見出しがあり、サイドバーがページと呼ぶものと一致する必要があります。
- 見出しレベルをスキップしないでください。`###` は、`#` の直下ではなく、`##` の下に配置する必要があります。
- 見出し、リスト、コード ブロック、吹き出しの前後に空行を入れます。Markdown は、突然そうでなくなるまで、これについては寛容です。
- ファイル名、コマンド、構成キーおよび値にはバッククォートを使用します。「Game.ini」ではなく、`Game.ini`。
- Prettier に行の折り返しを処理させます。行を短くするために手動で改行を追加しないでください。
