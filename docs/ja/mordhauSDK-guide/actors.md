# アクター {#actors}

**アクター（Actor）** とは、レベル内に存在するもの全般です。壁、ライト、スポーン地点、キャプチャーポイント、馬。ビューポートで選択でき、位置・回転・スケールを持っているなら、それはアクターです。

エディターは Unreal Engine 4 なので、配置するものの大半は素の UE4 です。メッシュ、ライト、ボリューム、ナビメッシュ。UE4 のチュートリアルはそのまま通用します。どの UE4 チュートリアルにも載っていないのが、Triternion が Mordhau 自身のマップのために書いた少数のクラスです。このページはそこを扱います。ほかのどこにも書かれていない部分だからです。

::: warning
以下のクラス名とプロパティ名は、モッダーに公開されている Mordhau のクラスから取っています。Triternion はパッチごとに変更を加えますし、常に正しいのはあなたの Content Browser です。ここの記述がエディターの表示と食い違っていたらエディターを信じて、[報告してください](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/issues)。ページを直します。
:::

## 配置と設定 {#placing-and-configuring-one}

入口は 2 つ、どちらも Unreal 標準です。

- **Place Actors** パネル — エンジン標準のもの向け：ライト、ボリューム、ジオメトリ、カメラ。
- **Content Browser** — Mordhau が同梱しているもの向け。クラスまたは Blueprint を検索し、ビューポートへドラッグします。

レベルに置いたら選択します。右側の **Details** パネルにプロパティが並びます。ここで値を変えても変わるのは *その配置済みのコピーだけ* — クラスではなくインスタンスです。目標物の作業はまさにこれで、同じ `ControlPoint` を 5 つ置き、コピーごとに名前・キャプチャー範囲・前提ポイントを変えていきます。

そのアクターを使うすべての場所に変更を効かせたいなら、それはもうインスタンスの設定ではありません。[Blueprint のサブクラス](/ja/mordhauSDK-guide/blueprints)が必要です。

::: danger どのレベルに置いているか確認する
Mordhau のマップはベースレベル 1 つと、ゲームモードごとのサブレベルで構成されます。**Levels** ウィンドウで青くハイライトされているレベルが編集中のレベルで、ビューポートに落としたものはそこに入ります。

ベースレベルを選んだまま Frontline のキャプチャーポイントを置くのが典型的な初心者のミスです。そうすると、そのベースマップを読み込む全モードに目標物が存在してしまいます。ビューポートで右クリック → **Move Selected Actors to Level** で後からでも直せます。[サブレベルの構成](/ja/mordhauSDK-guide/blueprints#sublevels)は Blueprints のページにあります。
:::

## スポーン地点 — `MordhauPlayerStart` {#spawns-mordhauplayerstart}

UE4 の `PlayerStart` を置き換えるクラスです。どのマップでも、各モードのサブレベルごとに必要になります。

| プロパティ | 役割 |
| --- | --- |
| `Team` | このスポーンを使えるチーム。整数で、クラスの既定値は `5`。どの数値をどのモードが期待するかは、公式マップを開いて確認するのが確実です。 |
| `bIsSpawnDisabled` | スポーンを無効化します。目標物のあるモードでは、戦線の移動に合わせて実行中に切り替えられます。 |
| `Token` | グループ分け用のタグ。`ControlPoint` 側にも `SpawnsTeam` と `SpawnsToken` があり、占領されたポイントがスポーン地点の一群をまとめて引き継ぐ仕組みになっています。 |

さらに、Blueprint サブクラスで実装できるイベントが 2 つあります。

- `IsAllowedSpawnFor(Controller)` — そのプレイヤーがこのスポーンを使ってよいかを返す
- `GetSpawnPreferenceFor(Controller)` — スコアを返す。モードは高いスコアのスポーンを優先します

これらを呼ぶのはゲームモード側で、`IsSpawnpointAllowed` と `GetSpawnpointPreference` を通します。分隊の近くに湧く、敵から遠い場所に湧くといった独自のスポーンロジックは、この 2 つのイベントに書きます。

## 占領目標 — `ControlPoint` {#capture-objectives-controlpoint}

Frontline と Invasion のポイントを支えるアクターです。目標物としてのロジックはほぼ内蔵済みで、マップ作者は主にプロパティを埋めます。

| プロパティ | 役割 |
| --- | --- |
| `Name` | ポイント上と上部バーに表示される名前 |
| `CaptureArea` | 占領のために立つ必要がある領域コンポーネント |
| `bIsCapturable` | そもそも占領できるか — 装飾用やスクリプト制御のポイントで使います |
| `bIsHiddenPoint` | 機能は保ったまま UI から隠します |
| `Team1PrerequisitePoints` / `Team2PrerequisitePoints` | 先に所有していなければならない他の `ControlPoint` の配列。Frontline の順序付けはこれで行い、最終ポイントへの飛び越しもこれで防ぎます |
| `SpawnPoints` | ポイントの所有者が変わったときに引き渡す `MordhauPlayerStart` |
| `SpawnsTeam`, `SpawnsToken` | このポイントが支配するチームとスポーングループ |
| `bPreventSpawningIfContested` | 敵が乗っている間はそのポイントでのスポーンを止めます |
| `CaptureSpeedCurve`, `NeutralizeSpeedCurve`, `UncaptureSpeed` | 人数に応じた占領速度をカーブで指定します |
| `AwardScoreCapturing`, `AwardScoreCaptured`, `AwardScoreNeutralizing`, `AwardScoreNeutralized`, `AwardScoreInterval` | 目標物への貢献に対するスコア |
| `Banners` | ポイントの所有者交代に合わせて見た目が変わる `CapturePointBanner` アクター |

`CapturePointBanner` にはスタティックメッシュ版とスケルタルメッシュ版があります（`StaticMeshCapturePointBanner`、`SkeletalMeshCapturePointBanner`）。配置したうえで、ポイントの `Banners` 配列に追加してください。`bBannersDoNotAnimateCaptureProgress` を立てない限り、占領進行に合わせてアニメーションします。

## 押す目標 — `PushableActor` {#push-objectives-pushableactor}

荷車、破城槌など、チームが経路に沿って押していくもの。

| プロパティ | 役割 |
| --- | --- |
| `PushArea` | 押すために入っている必要があるボリューム |
| `Team1PushSpeedByPushers` / `Team2PushSpeedByPushers` | カーブ：押している人数に対する速度 |
| `bIsPushingAllowed`, `bIsPullingAllowed` | フェーズごとに許可する方向 |
| `bStopPushingIfContested` | 両チームが乗っているときは停止させます |
| `bAutoMoveIfAlone`, `AutoMoveSpeed` | 単独でも動かします |
| `Progress` | 経路上の 0〜1。`SetProgress` でスクリプトから動かせます |
| `ProgressStepToAwardScoreFor`, `ScoreAwardedPerProgressStep` | 押した分のスコア |

## Mordhau らしく振る舞うメッシュ — `MordhauActor` ファミリー {#meshes-that-behave-like-mordhaus-the-mordhauactor-family}

`MordhauActor` は戦闘に絡む小物の基底クラスです。素の `AActor` に対して `DamageableComponent` と打撃音のプロパティ（`ThudSound`、ピッチと音量の範囲）が加わっており、これがあるかどうかで「Mordhau の手応え」か「無反応」かが分かれます。

- `StaticMeshMordhauActor` — ダメージを受けられるスタティックメッシュ。プレイヤーが叩いたり壊したりできるべきものには、素の `StaticMeshActor` ではなくこちらを使います。
- `SkeletalMeshMordhauActor` — スケルタルメッシュ版。
- `LODStaticMeshActor` — Mordhau 独自の LOD コンポーネントを使うスタティックメッシュ。マップが重くなってきたときに効いてきます。

## 揺れる小物 — `EnvironmentMovable` {#props-that-move-environmentmovable}

旗、吊り看板、ロープなど、硬直して見えてはいけないものの揺れ。`SwayingComponent` を指定し、ロール／ピッチ／ヨーの `Frequency`、`Magnitude`、`Speed` のベクターを設定するか、`InitializeMovable` で一括設定します。

## 時限エリア — `MasterField` と `SubField` {#timed-areas-masterfield-and-subfield}

`MasterField` は `SubField` ボリュームの集合を保持し、ひとつのまとまりとして駆動します：`FieldLifeTime`、`FieldDeactivationTime`、`FieldFadeOutTime`、対象クラスの `CollisionFilter`、そして `CreateField`、`BeginFieldDeactivation`、`DeactivateAndDestroyField` の各イベント。`FieldSpawnComponent` はフィールド内に物を配置する部分で、地面へのスナップ（`bSnapLocationToGround`、`SnapGroundRadius`、`MaxAllowedRotation`）と任意の視線チェックを持ちます。

出現し、縮み、時間で消えるエリアを支える仕組みです。SDK の中で最も情報がない一角でもあるので、実戦で使ったことがある方のメモは大歓迎です。

## 乗り物と攻城兵器 {#vehicles-and-siege-equipment}

`Horse`、`Catapult`、`Turret`（バリスタ）は配置できるアクターですが、**リスポーン時間はアクター側にはありません**。ゲームモード側の `HorseRespawnTime`、`CatapultRespawnTime`、`BallistaRespawnTime` です。サーバー管理者には見覚えのある名前でしょう。[`Game.ini`](/ja/dedicated-server-guide/) に書くのと同じ値だからです。

## ボットにはナビメッシュが要る {#bots-need-a-nav-mesh}

AI が絡むもの（特に Horde）には、プレイ領域を覆う `NavMeshBoundsVolume` と、その後の **Build Paths** が必要です。ごく普通の Unreal の話ですが、カスタムマップでボットが棒立ちになる原因としては断トツで多いものです。

## その他、手短に {#the-rest-briefly}

| クラス | ざっくり |
| --- | --- |
| `ProgressActor`, `ProgressDriver`, `SlaveProgressDriver` | 目標物の進行値で駆動するアクター。門、扉、段階制の目標物など |
| `MapCameraActor` | ゲームプレイではなくマップ表示用のカメラ |
| `ParticleSystemActor`, `GoreActor` | ゲームがスポーンさせるエフェクト用アクター |
| `MordhauEquipment`, `MordhauWeapon`, `MordhauShield`, `MordhauProjectile`, `Quiver` | プレイヤーが手に持てるもの一式 — [Blueprints](/ja/mordhauSDK-guide/blueprints#weapons-equipment-and-bots) を参照 |
| `BuildingSystemComponent` と `Buildable*Trace` 系 | ツールボックスの建築システム |

## このページの完成に力を貸してください {#help-us-finish-this-page}

このページは、ゲームが公開しているクラス、コミュニティ製ツール、公式マップから組み立てたものです。マニュアルから写したのではありません。存在しないからです。エディターで目標物を組んだことがあり、どのモードが実際にどの値を期待するのか知っているなら、その知識はこのページの内容より価値があります。[issue を立てる](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/issues)か [Discord](https://discord.gg/zuX58yRV84) に書いてください。整形はこちらでやります。
