# RCONガイド {#rcon-guide}

RCON は *リモート コンソール* の略です。これにより、ゲームの外部からネットワーク経由で Mordhau サーバーにコマンドを送信できるため、最初に Mordhau を起動して参加することなく、マップを変更したり、誰かをキックしたり、誰がオンになっているかを確認したりすることができます。

サーバーを実行している場合、これが最も多く使用されるツールになります。

::: info
このページは、サーバーがすでに実行されていることを前提としています。そうでない場合は、[専用サーバーガイド](/ja/dedicated-server-guide/) から始めてください。
:::

## 管理コマンドと RCON の比較 {#admin-commands-vs-rcon}

どちらも同じコマンドを実行できますが、到達方法が異なります。

**ゲーム内管理コマンド**は、プレイ中にコンソールに入力されます。`adminlogin` と `Game.ini` の管理者パスワードを使用して認証します。すでにサーバーにいる場合に便利です。

**RCON** は、任意の RCON クライアントから TCP 経由で接続します。ゲームは必要ありません。サーバーがいっぱいの場合や、何か問題が発生して参加できない場合でも機能し続けます。

コマンドリストはどちらの方法でも同じです。

## RCONをオンにする {#turning-rcon-on}

RCON は、他のサーバー設定と同じセクションの `Game.ini` で構成されます。

|プラットフォーム |パス |
| --- | --- |
| Windows | `Mordhau\Saved\Config\WindowsServer\Game.ini` |
| Linux | `Mordhau/Saved/Config/LinuxServer/Game.ini` |

次の 2 つのキーを追加します。

```ini
[/Script/Mordhau.MordhauGameSession]
ServerName=My Mordhau Server
MaxSlots=32
AdminPassword=changethis
RconPassword=a-different-long-password
RconPort=7778
```

::: danger
`Game.ini` を編集する前にサーバーを停止してください。シャットダウン時にメモリからファイルが書き換えられるため、実行中に行われた編集は破棄されます。
:::

::: warning
`RconPassword` を空のままにすると、サーバーは起動時にランダムな値を生成します。つまり、ユーザーはそれを知りません。自分で設定してください。

ここで `AdminPassword` を再利用したり、短いものを使用したりしないでください。RCON は暗号化されていないプロトコルです。パスワードを持っていてポートにアクセスできる人は誰でもサーバーを完全に制御できます。
:::

サーバーを再起動します。必要に応じて、コマンド ラインでポートをオーバーライドすることもできます。

```bash
./MordhauServer.sh Mordhau FFA_ThePit -Port=7777 -BeaconPort=15000 -QueryPort=27015 -RconPort=7778 -log
```

## ポートを開く {#opening-the-port}

すべて UDP であるゲーム、ビーコン、クエリ ポートとは異なり、RCON ポートは **TCP** です。他の 3 つをカバーするファイアウォール ルールは、このルールをカバーしません。

実際にマシンの外部から RCON にアクセスする必要がある場合にのみ転送してください。いずれにしても SSH 経由でサーバーを管理する場合は、ポートをインターネットに対して閉じたままにし、ボックスから `127.0.0.1` に接続します。これは厳密に安全であり、費用はかかりません。

## 接続中 {#connecting}

Source RCON プロトコルを使用するクライアントはすべて機能します。[`mcrcon`の特長](https://github.com/Tiiffi/mcrcon) は小さく、依存関係がなく、Windows と Linux の両方で実行されます。

```bash
mcrcon -H 127.0.0.1 -P 7778 -p your-rcon-password
```

これにより、対話型のプロンプトが表示されます。単一のコマンドを実行して終了するには:

```bash
mcrcon -H 127.0.0.1 -P 7778 -p your-rcon-password "playerlist"
```

ターミナルではなくウィンドウを使用したい場合は、グラフィカル クライアントも存在します。汎用ソース RCON ツールのほとんどは、Mordhau に対して正常に動作します。

## コマンド {#commands}

プレーヤー識別子は、Steam ID ではなく、**Playfab ID** です。`playerlist` で入手してください。

### 選手 {#players}

|コマンド |何をするのか |
| --- | --- |
|`playerlist` |サーバー上の全員とその ID |
|`kick <name or PlayfabID> <reason>` |プレーヤーを削除すると、再参加できます |
|`ban <name or PlayfabID> <minutes> <reason>` |分単位の期間の禁止 |
|`unban <name or PlayfabID>` |禁止を解除します |
|`banlist` |現在全員禁止 |
|`mute <name or PlayfabID> <minutes>` |音声とテキストをミュートします |
|`cancelvotekick` |進行中の投票キックを停止します |

### 管理者 {#admins}

|コマンド |何をするのか |
| --- | --- |
|`adminlogin` |他のコマンドを使用する前にゲーム内で認証してください。
|`adminlist` |現在の管理者 |
|`adminadd <PlayfabID>` |助成金管理者 |
|`removeadmin <PlayfabID>` |管理者を取り消します |

### 試合 {#the-match}

|コマンド |何をするのか |
| --- | --- |
|`changelevel <map name>` |スイッチマップ、例: `changelevel FFA_Grad` |
|`restartlevel` |現在のマップを再開します |
|`addbots <number>` |ボットを追加します |
|`addbots team <number> <0 or 1>` |ボットをチームに追加します。0 は赤、1 は青です。
|`removebots <number>` |ボットを削除します |
|`slomo <value>` |ゲーム速度を変更します。`0.5` は半分、`2` は 2 倍になります。

::: tip
`slomo` はサーバー上の全員に影響します。一度だけ面白いと思っても、すぐに人は離れてしまいます。
:::

## 日常のこと {#everyday-things}

**誰かに行動を起こす前に、その人の ID を見つけてください**

```
playerlist
```

**一日禁止**

```
ban 1A2B3C4D5E6F7890 1440 Griefing
```

期間は分であるため、1 時間は `60`、1 日は `1440`、1 週間は `10080` となります。

**マップを早めに回転させます**

```
changelevel TDM_Camp
```

**静かなサーバーを満たしてください**

```
addbots 8
```

## 繋がらないときは {#when-it-will-not-connect}

**接続が拒否されました。** RCON がリッスンしていません。`RconPort` が `Game.ini` に設定されていること、および編集後にサーバーを再起動したことを確認してください。`-log` を使用すると、コンソール出力に RCON の起動が表示されます。

**接続がタイムアウトしました。** ファイアウォールが接続を侵食しています。ポートが TCP であることに注意してください。

**認証に失敗しました。** パスワードが間違っています。`RconPassword` を空白のままにした場合は、サーバーが起動時に作成するため、明示的に設定して再起動してください。

**コマンドは実行されますが、何も起こりません。** 構文と引数の順序を確認してください。特に `ban` は理由の前に継続時間を必要とし、それを逆に取得すると静かに失敗します。

**編集内容が消え続けます。** 保存した時点ではサーバーは実行されていました。まずやめてください。

## 安全 {#security}

人々はこれを誤解し、それによってサーバーを失うため、繰り返す価値があります。

- RCON は暗号化されていません。パスワードは、パス上の誰でも読み取れる形式でネットワークを通過します。
- 長くて一意のパスワードを使用してください。管理者パスワードや Steam パスワードではありません。
- 必要がない限り、ポートを公開しないでください。ローカルホスト、SSH トンネル、または独自の IP に制限されたファイアウォール ルール。
- Discord メッセージ、サポート チケット、またはスクリーンショットにパスワードを貼り付ける場合は、パスワードを変更してください。
