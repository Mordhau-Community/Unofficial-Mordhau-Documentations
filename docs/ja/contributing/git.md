# ＃Git とは何ですか? {#what-is-git}

Git はフォルダーの履歴を保持します。チェックポイント (*コミット*) を保存するたびに、何が、いつ、誰が変更されたかが記録されます。以前のチェックポイントに戻ることができ、2 人がお互いに上書きすることなく同時に同じフォルダーで作業できます。

Mordhauとは関係ありません。これは、存在するほぼすべてのソフトウェア プロジェクトで使用される一般的なツールです。これらのドキュメントは多くの人が編集するテキスト ファイルのフォルダーであるため、ここで使用します。

::: info
Git と GitHub は 2 つの別のものです。Git はコンピューター上のプログラムです。GitHub は、Git リポジトリをオンラインで保存する Web サイトです。GitHub がなくても Git を使用できます。See [GitHubとは何ですか?](/ja/contributing/github).
:::

## 単語 {#the-words}

この語彙は頻繁に遭遇することになるため、早めに理解する価値があります。

**リポジトリ** (またはリポジトリ) — プロジェクト フォルダーとその履歴全体。このサイトは 1 つのリポジトリです。

**クローン** — リポジトリ、履歴などのコピーをダウンロードします。

**コミット** — 保存されたチェックポイントと、変更内容を説明するメッセージ。

**支店** — 別の業務分野。独自のブランチに変更を加えて、途中までメインのブランチが機能し続けるようにします。

**プッシュ** — マシンから GitHub までコミットを送信します。

**プル** — 他の人が作成したコミットをダウンします。

**マージ** — 1 つのブランチを別のブランチに結合します。

## 実際に必要な 5 つのコマンド {#the-five-commands-you-actually-need}

ここに貢献するために Git を正しく学ぶ必要はありません。これがループ全体です:

```bash
# 1. Get the project onto your machine, once
git clone https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations.git
cd Unofficial-Mordhau-Documentations

# 2. Start a branch for what you are about to do
git checkout -b fix-rcon-ports

# 3. Edit files in your editor, then check what Git noticed
git status

# 4. Save a checkpoint
git add .
git commit -m "Correct the default RCON port"

# 5. Send it to GitHub
git push origin fix-rcon-ports
```

次に、Web サイトでプル リクエストを開きます。これについては、[GitHubとは何ですか?](/ja/contributing/github) で説明します。

## 持つ価値のある 2 つの習慣 {#two-habits-worth-having}

**何か意味のあるコミット メッセージを書きましょう。** 「修正」は、6 か月後には誰にも何も伝えません。「サーバーガイドのビーコンポートを修正する」で解決します。

**作業するものごとに新しいブランチを開始します。** これには 1 つのコマンドが必要で、無関係な 2 つの修正を互いに絡むことなく実行できることを意味します。

## コピーを最新の状態に保つ {#keeping-your-copy-current}

少し前にクローンを作成した場合は、他の人がそれ以来変更を行っています。新しい作業を始める前に:

```bash
git checkout main
git pull
git checkout -b my-new-branch
```

## 行き詰まった場合 {#if-you-get-stuck}

Git のエラー メッセージは役に立たないことで知られています。フォルダーを削除しない限り、ローカルで行った操作は何も復元できませんので、慌てる必要はありません。

- [Git公式ブック](https://git-scm.com/book/en/v2) — 無料で、最初の 2 章では上記の内容をさらに詳しく説明しています
- [オ・シット!](https://ohshitgit.com/) — 「何か間違ったことをしました。どうすれば元に戻せますか?」に対する短い回答

または、[Discord](https://discord.gg/zuX58yRV84) でお問い合わせください。誰かが同じエラーに遭遇しました。
