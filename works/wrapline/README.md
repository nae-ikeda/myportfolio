# WRAPLINE｜法人向け営業車ラッピング LP（自主制作）

ポートフォリオ用に制作した、架空のカーラッピング会社のランディングページです。
企業名・料金・事例はすべて架空のものです。

## 担当
企画・デザイン（Figma）・コーディング

## 使用技術
- HTML5
- SCSS（Dart Sass／FLOCSS風にパーシャル分割、BEM命名）
- JavaScript（ライブラリなし）

## 実装のポイント
- モバイルファーストのレスポンシブ対応（ブレイクポイント 600px／900px）
- スマホ用ハンバーガーメニュー（`aria-expanded` で開閉状態を管理、Escキーで閉じる）
- よくある質問は `details`／`summary` でJSなしのアコーディオン
- お問い合わせフォームの入力チェック（必須・メール形式、エラーを読み上げ対応）
- 画像はSVGで軽量化、施工事例は `loading="lazy"`
- キーボード操作時のフォーカス表示

## フォルダ構成
```
wrapline/
├── index.html
├── css/style.css      … コンパイル後のCSS（直接編集しない）
├── scss/
│   ├── style.scss     … 読み込みのみ
│   ├── _variables.scss
│   ├── _mixins.scss
│   ├── _base.scss
│   ├── _components.scss
│   ├── _header.scss
│   └── _sections.scss
├── js/main.js
└── img/
```

## SCSSのコンパイル
```
npx sass --watch scss/style.scss css/style.css --no-source-map
```
