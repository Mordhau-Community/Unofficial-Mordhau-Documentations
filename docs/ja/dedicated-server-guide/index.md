# 専用サーバーホスティングガイド {#dedicated-server-hosting-guide}

以下では、Mordhau および Linux で Mordhau 専用サーバーをホストする方法を説明します。

これらの多くは、ホーム ネットワーク上のマシン、またはレンタルした VPS または専用ボックスのいずれかで、サーバーを自分でホストしていることを前提としています。何も管理したくない場合は、[専用ゲームサーバープロバイダ](/ja/dedicated-server-guide/dedicated-game-server-providers) のリストがあり、代わりに設定してコントロール パネルを提供します。

このガイドはできる限り完全なものにするよう努めていますが、セットアップ固有の問題についてヘルプを得るには、Mordhau サーバー所有者の Discord が最適な場所です。

## 始める前に {#before-you-start}

必要なものは次のとおりです。

- 稼働し続けるマシン。ゲームを閉じるとサーバーがオフラインになるのは、誰にとってもあまり役に立ちません。
- **SteamCMD**、サーバー ファイルをダウンロードするための Valve のコマンド ライン ツール。
- 自宅からホストしている場合、ルーターのポートを転送する機能。

使用するアカウントで Mordhau を所有する必要は**ありません**。専用サーバーは別途無料でダウンロードされ、匿名の Steam ログインを通じてインストールされます。

::: tip
サーバー バイナリは Steam アプリ **629800** です。これは、ゲーム自体の 629760 とは異なります。間違ったものをダウンロードすることは、ここで人々が犯す最も一般的な間違いです。
:::

## SteamCMD のインストール {#installing-steamcmd}

::: コードグループ

```powershell [Windows]
# Download steamcmd.zip from
# https://steamcdn-a.akamaihd.net/client/installer/steamcmd.zip
# and extract it somewhere sensible, for example C:\steamcmd
```

```bash [Linux]
sudo apt update
sudo apt install lib32gcc-s1
mkdir -p ~/steamcmd && cd ~/steamcmd
curl -sqL "https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz" | tar zxvf -
```

:::

::: warning
SteamCMD は 32 ビット プログラムです。64 ビット Linux インストールでは、32 ビット サポート ライブラリが存在するまで起動しません。これが `lib32gcc-s1` の目的です。古いディストリビューションでは、そのパッケージは `lib32gcc1` と呼ばれます。
:::

## サーバーをダウンロードする {#downloading-the-server}

::: コードグループ

```powershell [Windows]
.\steamcmd.exe +force_install_dir C:\mordhau-server +login anonymous +app_update 629800 validate +quit
```

```bash [Linux]
./steamcmd.sh +force_install_dir ~/mordhau-server +login anonymous +app_update 629800 validate +quit
```

:::

数ギガバイトなので、しばらくお待ちください。パッチ後にサーバーを更新する場合は、まったく同じコマンドを再度実行します。

::: warning
`+force_install_dir` を `+login` の **前** に置きます。SteamCMD は引数を順番に処理し、ログインが最初に行われる場合は、インストール ディレクトリを無視し、代わりに独自のフォルダーにダウンロードします。
:::

## 最初の打ち上げ {#first-launch}

引数なしでサーバーを 1 回起動します。まだ再生可能ではありません。重要なのは、構成ファイルを書き出してから停止するということです。

::: コードグループ

```powershell [Windows]
cd C:\mordhau-server
.\MordhauServer.exe
```

```bash [Linux]
cd ~/mordhau-server
./MordhauServer.sh
```

:::

起動が完了したらシャットダウンします。

## 構成 {#configuration}

設定ファイルは現在次の場所にあります。

|プラットフォーム |パス |
| --- | --- |
| Windows | `Mordhau\Saved\Config\WindowsServer\` |
| Linux | `Mordhau/Saved/Config/LinuxServer/` |

気になるのは`Game.ini`です。

::: danger
これらのファイルは、サーバーが停止しているときにのみ編集してください。Mordhau はその構成をメモリに保持し、シャットダウン時に書き戻すため、実行中に変更した内容は閉じた瞬間に上書きされます。
:::

### Game.ini {#gameini}

```ini
[/Script/Mordhau.MordhauGameSession]
ServerName=My Mordhau Server
MaxSlots=32
ServerPassword=
AdminPassword=changethis
BannedPlayers=()

[/Script/Mordhau.MordhauGameMode]
PlayerRespawnTime=5.000000
BallistaRespawnTime=30.000000
CatapultRespawnTime=30.000000
HorseRespawnTime=30.000000
DamageFactor=1.000000
TeamDamageFactor=0.500000
MapRotation=FFA_ThePit
MapRotation=TDM_Camp
MapRotation=SKM_Grad
```

**`[/Script/Mordhau.MordhauGameSession]`**

|キー |何をするのか |
| --- | --- |
|`ServerName` |ゲーム内ブラウザに表示される名前 |
|`MaxSlots` |プレーヤーの収容人数 |
|`ServerPassword` |パブリックサーバーの場合は空のままにします。
|`AdminPassword` |管理者がコンソールで `adminlogin` と入力する内容 |
|`Admins` |Playfab ID は 1 つです。管理者ごとに 1 回この行を繰り返します。
|`BannedPlayers` |`ban` コマンドによって管理されるため、これを手動で編集することはほとんどありません。

**`[/Script/Mordhau.MordhauGameMode]`**

リスポーン時間は秒単位です。`DamageFactor` はすべてのダメージをスケールします。`1.0` は通常で、`2.0` はそれを 2 倍にします。`TeamDamageFactor` はフレンドリー ファイアを個別にスケールするため、デフォルトの `0.5` は、チームメイトがお互いから半分のダメージを受けることを意味します。

### 地図の回転 {#map-rotation}

マップごとに `MapRotation` 行を 1 つ追加します。順序はプレイされる順序であり、リストはゲーム内のマップ投票に表示される内容も制御します。

マップ名は、モード プレフィックスとマップ名を組み合わせたものです。

|プレフィックス |モード |
| --- | --- |
|`FFA_` |すべて無料 |
|`TDM_` |チームデスマッチ |
|`SKM_` |小競り合い |

ストック マップは `ThePit`、`Camp`、`Grad`、`Contraband`、`Tourney`、`MountainPeak`、`Taiga` で、`FFA_Grad` または`TDM_MountainPeak`。

### Engine.ini {#engineini}

オプション。ほとんどの所有者が最終的に触れる設定はティックレートです。

```ini
[/Script/OnlineSubsystemUtils.IpNetDriver]
NetServerMaxTickRate=60
```

高いほどスムーズになり、CPU コストが増加します。マシンがそれを維持できることがわかっている場合を除き、この値を上げないでください。ティック レートを維持できないサーバーは、安定している低めのサーバーよりもかなり悪いと感じます。

## サーバーを正しく起動する {#starting-the-server-properly}

次に、マップとポートから開始します。

::: コードグループ

```powershell [Windows]
.\MordhauServer.exe Mordhau FFA_ThePit -Port=7777 -BeaconPort=15000 -QueryPort=27015 -log
```

```bash [Linux]
./MordhauServer.sh Mordhau FFA_ThePit -Port=7777 -BeaconPort=15000 -QueryPort=27015 -log
```

:::

これを Windows の `.bat` ファイルまたは Linux のシェル スクリプトに配置すると、毎回再入力する必要がなくなります。

|パラメータ |目的 |
| --- | --- |
|`-Port` |ゲームトラフィック |
|`-BeaconPort` |サーバーブラウザがサーバーに到達する方法 |
|`-QueryPort` |Steam クエリ、ブラウザがプレイヤー数を読み取る方法 |
|`-MultiHome` |マシンに複数の | がある場合は、1 つの特定のローカル IP にバインドします。
|`-RconPort` |RCON リスナーについては、[RCONガイド](/ja/rcon-guide/) | を参照してください。
|`-log` |ファイルだけでなくコンソールに出力する |

Linux では、`screen` または `tmux` で実行します (あるいは、systemd ユニットを作成するとよいでしょう)。そうすれば、SSH セッションを閉じても存続します。

```bash
screen -dmS mordhau ./MordhauServer.sh Mordhau FFA_ThePit -Port=7777 -BeaconPort=15000 -QueryPort=27015 -log
```

## ポート {#ports}

|ポート |プロトコル |何のために |
| --- | --- | --- |
|7777 |UDP |ゲーム |
|15000 |UDP |ビーコン |
|27015 |UDP |Steam クエリ |
|RCON ポート |TCP |リモート コンソール (有効にした場合のみ) |

ゲーム ポートだけでなく、3 つの UDP ポートすべてを開いて転送する必要があります。ビーコンまたはクエリ ポートがブロックされている場合、サーバーは完全に正常に動作し、ブラウザに表示されなくなります。これは、人々が最もよく尋ねる質問です。

同じマシン上で複数のサーバーを実行していますか?それぞれに独自のセットを間隔をあけて指定します。

```bash
-Port=7779 -BeaconPort=15002 -QueryPort=27018
```

## 動作確認中 {#checking-it-worked}

ゲーム内ブラウザでサーバー名を探します。そこにない場合は、次の順序で作業してください。

**ブラウザには何も表示されません。** ほとんどの場合、ビーコンまたはクエリ ポートが表示されます。転送ルールを確認し、マシン自体のファイアウォールを確認してください。Windows ファイアウォールは初回実行時にサーバーをブロックし、プロンプトをクリックして通り過ぎるのは簡単です。

**表示されていますが、誰も接続できません。** ゲーム ポート。同じチェック、ポート 7777。

**ローカル ネットワーク上では問題ありませんが、外からは見えません。** ルーターが転送していないか、ISP によって CGNAT の背後に設定されています。その場合、その接続からはまったくホストできないため、VPS が必要になります。

**構成を変更しても何も起こりませんでした。** サーバーの実行中にファイルを編集しました。停止して、編集して、開始してください。

**サーバーが起動し、すぐに終了します。** `Mordhau/Saved/Logs/` のログを読み取ります。通常は、ポートがすでに使用されていることが原因です。

## 次のステップ {#next-steps}

- ゲームに参加していなくてもサーバーを管理できるように [ラコン](/ja/rcon-guide/) をセットアップします
- 自分で管理するのが楽しくない場合は、[プロバイダーリスト](/ja/dedicated-server-guide/dedicated-game-server-providers) を見てください。
