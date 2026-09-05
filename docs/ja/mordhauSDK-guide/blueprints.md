# ブループリント {#blueprints}

**Blueprint** は Unreal のビジュアルスクリプティングです。C++ ではなくグラフ上で組み立てるクラス、と考えてください。Mordhau のエディターでは、ゼロから書くことはほとんどありません。ゲームが既に用意しているものをサブクラス化し、必要なところだけ変えます。

何かを開く前に持っておきたい全体像はこうです。

- **C++ クラス** — Triternion が書き、ゲームにコンパイル済み。`MordhauGameMode`、`ControlPoint`、`MordhauPlayerStart`、`MordhauWeapon` など。編集はできません。
- **Blueprint アセット** — Content Browser の `/Game/Mordhau/Blueprints/…` にあり、公式マップとモードが実際に使っているのはこちら。`BP_なんとか` という名前です。
- **あなたの Blueprint** — それらのサブクラスで、自分の Mod フォルダーに置くもの。作るものはすべてこれです。

自分のフォルダーで作業するのは整理整頓の話ではありません。ゲーム側の Blueprint を直接書き換えると、同じことをした他のすべての Mod と衝突する Mod ができあがります。

::: warning
以下のパスとプロパティ名は、ゲームのクラス、コミュニティ製ツール、サーバー設定ファイルから取っています。パッチで場所は動きます。重要なものは自分の Content Browser で確認し、ずれていたら[報告してください](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/issues)。
:::

## 最初に触る Blueprint はゲームモード {#the-game-mode-is-the-first-blueprint-you-will-touch}

どのモードも 2 つで 1 組です。ルールを持ちサーバー上で動く **GameMode** と、全クライアントが見る必要のあるもの（時計、スコア、目標物の状態）を持つ **GameState**。

| モード | Blueprint（`/Game/Mordhau/Blueprints/GameModes/` 以下） |
| --- | --- |
| Deathmatch | `BP_DeathmatchGameMode` + `BP_DeathmatchGameState` |
| Team Deathmatch | `BP_TeamDeathmatchGameMode` + `BP_TeamDeathmatchGameState` |
| Skirmish | `BP_SkirmishGameMode` + `BP_SkirmishGameState` |
| Frontline | `Battle/BP_FrontlineGameMode` |
| Horde | `Horde/BP_HordeGameMode` |

残りも同じ `BP_<モード>GameMode` / `BP_<モード>GameState` 命名に従います。推測せず、フォルダーを見てください。

これらはサーバー管理者が `Game.ini` で編集するのと同じクラスです。[専用サーバーガイド](/ja/dedicated-server-guide/)を読んでいれば `[/Game/Mordhau/Blueprints/GameModes/BP_DeathmatchGameMode.BP_DeathmatchGameMode_C]` に見覚えがあるはずです。設定キーと Blueprint のプロパティは同じものです。

### `MordhauGameMode` から受け継ぐもの {#what-you-inherit-from-mordhaugamemode}

どのモードをサブクラス化しても、以下は付いてきます。カスタムモードが実際に動かすレバーはたいていこの中にあります。

| プロパティ | 効果 |
| --- | --- |
| `PlayerRespawnTime`, `bPlayersSpawnInWaves`, `bUsesSlowPlayerSpawning` | リスポーンの間隔と、ウェーブ制にするかどうか |
| `SpawnProtectionDuration` | スポーン直後の無敵時間 |
| `DamageFactor`, `TeamDamageFactor`, `TeamDamageFlinch` | 同士討ちを含むダメージ全体の倍率 |
| `bDisableDamage`, `bDisableStamina` | 戦闘系の無効化 — 非戦闘モードの土台 |
| `bPlayersDropAllGearOnDeath`, `bEquipmentDoesNotDespawn`, `OverrideEquipmentDespawnTime` | 死亡時のドロップ挙動 |
| `KillScoreChange`, `KillTeamScoreChange`, `TeamKillScoreChange`, `AssistScoreFactor`, `bIsScoringDisabled` | スコアリング |
| `AutoKickOnTeamKillAmount` | 味方殺しへの処置 |
| `HorseRespawnTime`, `CatapultRespawnTime`, `BallistaRespawnTime` | 乗り物と攻城兵器のリスポーン |
| `MapRotation`, `MapVoteMaps` | 試合後に何を読み込むか |

そして、カスタム挙動のフックになる関数とイベント。

- `IsSpawnpointAllowed(PlayerStart, Controller)` と `GetSpawnpointPreference(PlayerStart, Controller)` — スポーン選択。[`MordhauPlayerStart`](/ja/mordhauSDK-guide/actors#spawns-mordhauplayerstart) 側のイベントと対になります
- `OnAfterLogin`, `OnBeforeLogout` — プレイヤーの参加と退出
- `OnMessageBroadcasted`, `OnRconStringCommand` — チャットと RCON。管理コマンドに反応させたいときに使えます
- `GetNextMap`, `GetNextMaps`, `VoteLevel` — ローテーションと投票

## サブレベル — モードごとに 1 レベル {#sublevels}

Mordhau のマップは 1 つのレベルではありません。ジオメトリを持つ **ベースレベル** と、そのモードのスポーンと目標物を持つ **モードごとのサブレベル** です。どのモードかをゲームに伝えるのは、サブレベル名の接頭辞です。

| 接頭辞 | モード |
| --- | --- |
| `BR_` | Battle Royale |
| `FFA_` | Deathmatch |
| `FL_` | Frontline |
| `HRD_` | Horde |
| `INV_` | Invasion |
| `SG_` | Sword Game |
| `SKM_` | Skirmish |
| `TDM_` | Team Deathmatch |

エディターでの作業の流れ：

1. マップ本体を普通のレベルとして作る — ジオメトリ、ライティング、小物。
2. モードごとに空のレベルを作り、接頭辞を先頭にした名前を付ける：`SKM_CabbageLand`。
3. それを開き、**Levels** ウィンドウを開いて、パーシスタントレベルのストリーミング方式を **Always Loaded** にする。新しいサブレベルを作るたびに Blueprint-only に戻るので、毎回設定します。
4. **Add Existing** → ベースマップを追加し、サブレベルの下にジオメトリが読み込まれるようにする。
5. パーシスタントレベルをダブルクリックして再び青くする（青が編集対象）。誤編集を防ぐためベースレベルはロックしておく。
6. そのモードのゲームモード、スポーン、目標物を配置する。

あとは `changemap SKM_CabbageLand` で読み込めます。

[配置に関する警告](/ja/mordhauSDK-guide/actors)が重要なのはこの構造のためです。モードのサブレベルではなくベースレベルに落とした目標物は、全モードに同時に出てきます。

::: tip
この接頭辞リストにないモードについては、コミュニティ製の [MetaMod](https://mod.io/g/mordhau/m/metamod) がマップの対応範囲を広げます。上の手順は [Mordhau Modding Wiki](https://github.com/Net-Slayer/MordhauModsWiki) を要約したもので、向こうにはスクリーンショットがあります。
:::

## メタデータ — マップの正体をゲームに伝える {#metadata-how-the-game-knows-what-your-map-is}

メニュー表示に必要なものは、2 つの小さな Blueprintable クラスが持っています。忘れやすく、忘れるとマップに名前も画像も付きません。

**`MapMetaData`**

| プロパティ | 中身 |
| --- | --- |
| `Name`, `Description` | ブラウザーでプレイヤーに見えるもの |
| `BaseMap` | ベースレベル |
| `GameModeMaps` | このマップに属するモードのサブレベル |
| `Thumbnail`, `BackgroundImages`, `ForegroundImages` | メニューとロード画面のアート |
| `Tips` | ロード画面のヒント |

**`GameModeMetadata`**

| プロパティ | 中身 |
| --- | --- |
| `Prefix` | 上の表のサブレベル接頭辞 — この規約が定義されている場所そのもの |
| `Name`, `Description`, `Thumbnail`, `Tips` | モードの見せ方 |

本当に新しいモードを作るなら、GameMode と GameState に加えて、自分の接頭辞を持つ `GameModeMetadata` のサブクラスが要ります。

## レベルブループリント {#the-level-blueprint}

どのレベルにも 1 つあり、Mordhau では `MordhauLevelScriptActor` を継承しています。*そのマップだけ* のスクリプティング — 一定スコアで開く扉、ポイント陥落で崩れる橋 — の置き場所です。

マップ単位の仕組みを起動する場所でもあります。たとえばコミュニティ製の[ランダムスポーンシステム](https://github.com/WaGi-Coding/TakiRandomSpawnForMordhau)は、コントローラーをレベルブループリントに置いて `Event BeginPlay` に接続して導入します。

マップをまたいで再利用したいものは、レベルブループリントではなく通常の Blueprint クラスにしてください。レベルブループリントは継承できません。

## 武器・装備・ボット {#weapons-equipment-and-bots}

| 対象 | 出発点 |
| --- | --- |
| キャラクター | `/Game/Mordhau/Blueprints/Characters/` の `BP_MordhauCharacter` |
| 武器 | `MordhauWeapon` と `MordhauEquipment`、加えて `MordhauShield`、`FistsWeapon`、`KickWeapon` |
| 遠隔武器 | `MordhauProjectile` と `Quiver` |
| 攻撃のタイミング | `AttackMotion` と各モーションクラス — windup、release、フェイント、パリィ、リポストにそれぞれ対応 |
| アニメーション | `MeleeWeaponAnimationProfile` — 武器が参照する `AnimationProfile` |
| ボット | `BotProfile` と `BotBehaviorProfile`、ビヘイビアツリーのノードは `BTTask_MeleeAttack`、`BTTask_MeleeDefend`、`BTTask_RangedAttack` など |

カスタム武器は、既存の武器を複製してしまえば大半が数値の作業です。windup、release、装甲別のダメージ配列、スタミナ消費、ノックバック。それぞれが何を意味するかは [Mordhau Modding Wiki の武器変数のページ](https://github.com/Net-Slayer/MordhauModsWiki/blob/main/docs/modding/custom-content/creating-custom-weapons/weapon-variables.md)が最も詳しく、値を触る前に読む価値があります。

## 5 つだけ覚えるなら {#if-you-only-learn-five}

1. **自分のゲームモード Blueprint** — 一番近い公式モードから派生させる
2. **`MordhauPlayerStart`** — スポーンがなければマップではない
3. **`ControlPoint`** とバナー — Frontline と Invasion の目標物レイヤーそのもの
4. **`MapMetaData` と `GameModeMetadata`** — マップが自分を名乗る方法
5. **レベルブループリント** — そのマップならではの一点物のスクリプティング

## このページの完成に力を貸してください {#help-us-finish-this-page}

Mordhau の Mod 制作を通しで解説した本格的なマニュアルは、まだ誰も書いていません。このページも、あるべき手順書ではなく地図にとどまっています。モードやマップを公開したことがあるなら、あなたが知っていること — どのプロパティが本当に効くのか、パッケージ化で何が壊れるのか、公式マップの分かりにくい作り — がまさに欠けている部分です。[issue を立てる](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/issues)か、[Discord](https://discord.gg/zuX58yRV84) に走り書きを貼ってください。整形はこちらでやります。
