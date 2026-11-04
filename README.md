# naeho ikeda portfolio

Webデザイナー・コーダー 池田苗穂のポートフォリオサイトです。

公開URL：https://nae-ikeda.github.io/myportfolio/

## 構成
```
myportfolio/
├── index.html          … ポートフォリオ本体
├── css/style.css       … コンパイル後のCSS（直接編集しない）
├── scss/               … SCSSのソース
├── js/main.js          … メニューの開閉・スクロールで現れる演出
├── img/
│   └── works/          … 作品のサムネイル（1200×750px）
└── works/
    └── wrapline/       … 自主制作LP「WRAPLINE」
```

## デザイン
- PCでは左にイラストを固定し、右側の白い角丸パネルだけがスクロールする2画面構成
- 見出しは丸みのある英字（Outfit）を大きく、日本語は字間を広めにとって軽やかに
- 配色は黒・白・ミントグリーンの3色

## 実装のポイント
- モバイルファーストのレスポンシブ対応（2画面になるのは1000px以上）
- 作品の詳細は `details`／`summary` で開閉（JSなし）
- Intersection Observer でスクロールに合わせて要素を表示
- 回る丸い文字・流れる「contact」・イラストのゆるい動きはCSSアニメーション
- 動きを減らす設定の環境では、アニメーションを止める

## SCSSのコンパイル
```
npx sass --watch scss/style.scss css/style.css --no-source-map
```
