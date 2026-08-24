# 専用ゲームサーバープロバイダー {#dedicated-game-server-providers}

[独自のサーバー](/ja/dedicated-server-guide/) を実行したくない場合は、これらの会社が Web コントロール パネルを備えた Mordhau サーバーをレンタルします。料金は毎月スロットごとに支払われ、マシン、アップデート、ポートが処理され、ブラウザーには設定エディターとコンソールが表示されます。

以下のホストは、Mordhau コミュニティが長年にわたって使用してきたホストです。

::: info
当社はどの企業とも提携しておらず、アフィリエイト リンクでもありません。価格、地域、品質は時間の経過とともに変化します。長期のレンタルを約束する前に、あちこち探し回って、ホストの最近の様子を [Discord](https://discord.gg/zuX58yRV84) で尋ねてください。
:::

## プロバイダー {#providers}

|プロバイダー |地域 |リンク |
|--- |--- |--- |
|シタデルサーバー |米国 / 欧州 |[citadelservers.com](https://citadelservers.com/en-us/game-servers/mordhau-game-hosting) |
|ガルポータル |米国 / 欧州 |[g-portal.com](https://www.g-portal.com/en/gameserver/mordhau-server-hosting-pc) |
|アセンドサーバー |カナダ / 米国 / 欧州 / オーストラリア |[ascendservers.com](https://ascendservers.com/en-us/game-servers/mordhau-game-hosting) |
|ピンパーフェクト |米国 / 欧州 |[pingperfect.com](https://pingperfect.com/gameservers/mordhau-game-server-hosting-rental) |
|GTX ゲーミング |世界中 |[gtxgaming.co.uk](https://www.gtxgaming.co.uk/mordhau-server-hosting/) |
|サバイバルサーバー |米国 / 欧州 |[survivalservers.com](https://www.survivalservers.com/services/game_servers/mordhau/) |
|サーバーネティック |米国 / 欧州 |— |
|サーバーの合理化 |米国 / 欧州 / オーストラリア |— |
|シムライ |— |— |
|低MS |— |— |
|インフラバイダー |— |— |
|MFホスティング |— |— |
|AAゲームホスティング |— |— |

::: tip
ダッシュの付いた行は、現在のページが確認されていない行です。[リンクを送信](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/issues) のいずれかを使用してホストしている場合は、その行を埋めます。ホストがシャットダウンしている場合は、その旨も伝えてください。行は削除されます。
:::

##  {#choosing-one}

6 か月間前払いする前に確認する価値のあることがいくつかあります:

**ハードウェアの場所** プレーヤーが最初に気づくのは Ping です。自分の近くではなく、一緒にプレイすると予想される人の近くの場所を選択してください。

**ファイル アクセスを取得できるかどうか。** 一部のパネルでは、フォームを通じて少数の設定のみが公開されます。`Game.ini` と `Engine.ini` を適切に編集したい場合は、FTP または実際のファイル マネージャーが必要です。

**RCON が利用可能かどうか。** ほとんどのパネルにはコンソールが組み込まれていますが、独自の [RCONクライアント](/ja/rcon-guide/) に接続したい場合は、ホストがポートを提供してそこに到達できるようにする必要があります。

**更新の仕組み** Mordhau パッチは、古いビルドを実行しているサーバーを破壊します。ホストが自動的に更新するのか、それともユーザー側で更新するのかを確認してください。

**スロットの請求方法** これらのほぼすべてはスロットごとに請求されます。64 スロットのサーバーは 16 スロットのサーバーのおよそ 4 倍の費用がかかるため、実際に何人の人が集まるかについては正直に考えてください。

## または、自分でホストしてください {#or-host-it-yourself}

これは無料で、特に難しいことはありません。[専用サーバーガイド](/ja/dedicated-server-guide/) ですべてを説明します。電源がオンの状態を維持し、3 つのポートを転送できるマシンが必要です。すでに VPS または予備のボックスをお持ちの場合、作業のほとんどはこれで完了です。
