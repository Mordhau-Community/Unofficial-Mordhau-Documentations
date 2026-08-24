# ＃VitePressとは何ですか？ {#what-is-vitepress}

VitePress は、このリポジトリを Web サイトに変えるものです。Markdown ファイルを作成すると、VitePress は、ナビゲーション、検索、テーマがすでに添付された HTML ページにファイルをレンダリングします。

ドキュメントを書くためにそれを理解する必要はありません。このページは、サイドバーにページを追加したり、言語を追加したり、開発サーバーが文句を言う理由を解明したりするなど、構造的なものを変更したい場合に使用します。

## プロジェクトがどのように組み合わされるか {#how-the-project-fits-together}

```
.vitepress/
  config.mts        the whole site configuration: nav, sidebar, languages
  theme/            styling overrides
docs/
  en/               English pages
  ar/  fr/  ja/     translations, mirroring the English structure
  ru/  zh/
  public/           images and files copied to the site root as they are
package.json        dependencies and the npm scripts
netlify.toml        build and redirect settings for the live site
```

以下のすべての `.md` ファイル`docs/` のページになります。URL はファイル パスの後に続くため、`docs/en/rcon-guide/index.md` は `/docs/en/rcon-guide/` で提供されます。

## 3 つのコマンド {#the-three-commands}

```bash
npm run docs:dev      # local server with live reload, use this while writing
npm run docs:build    # produce the static site in .vitepress/dist/docs
npm run docs:preview  # serve what the build produced, to check it before pushing
```

`docs:dev` が使用するコマンドです。ファイルを保存するたびに、ブラウザにページがリロードされます。

::: tip
開発サーバーは、起動時にリッスンしているアドレス (通常は `http://localhost:5173`) を出力します。ポートを想定するのではなく、出力されるものをすべて使用します。そのポートが使用されている場合は、別のポートが選択されます。
:::

## 構成ファイル {#the-config-file}

`.vitepress/config.mts` は、構文エラーがあると 1 ページが壊れるのではなく、サイト全体の構築が停止されるため、注意が必要な唯一のファイルです。

最も触れる可能性の高い部分:

**`themeConfig.nav`** — 上部のバーにわたるリンク。

**`themeConfig.sidebar`** — 左側のナビゲーション。パス接頭辞によってキー設定されるため、`"/en/contributing/"` ブロックはそのパスの下のページにのみ表示されます。

**`locales`** — 言語ごとに 1 つのエントリ。それぞれに独自の `nav` および `sidebar` に加えて、`dir` または `ltr` または `rtl` があります。

サイドバーにページを追加すると、次のようになります:

```ts
{
  text: "What people see in the sidebar",
  link: "/en/contributing/my-new-page",
}
```

`link` は、ファイル パスではなく、URL です。— `docs/` プレフィックスと末尾の `.md` はありません。

::: warning
開発サーバーの実行中に設定を保存すると、開発サーバー自体が再起動されます。エラーで停止した場合は、最後の数行を読んでください。ほとんどの場合、カンマが抜けているか、閉じられていない括弧があり、行番号がわかります。
:::

## 右から左に記述する言語 {#right-to-left-languages}

アラビア語ロケールは `dir: "rtl"` を設定し、`postcss-rtl` はビルド時にスタイルシートを自動的にミラーリングします。個別の CSS を記述する必要はありません。

## 変更がマージされるとどうなるか {#what-happens-when-your-change-is-merged}

Netlify は `main` ブランチを監視しています。マージによって `npm run docs:build` がトリガーされ、生成されたサイトが公開されます。これには 1 ～ 2 分かかります。

ビルド出力は `.vitepress/dist/` に入り、意図的にコミットされません。毎回 Markdown から再生成されるため、コミットすると競合が発生するだけです。

## さらに詳しく {#learning-more}

[VitePress ドキュメント](https://vitepress.dev) は詳細で読みやすいです。特に [Markdown拡張子](https://vitepress.dev/guide/markdown) ページには、ここで使用しているもの以外のリストがリストされています。機能が必要で、それが存在するかどうか疑問に思っている場合は、おそらくそのページにあるでしょう。
