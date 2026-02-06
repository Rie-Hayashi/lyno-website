lyno_web – Handoff README / Deploy Guide

このリポジトリは、Next.js（App Router）+ TypeScript + Tailwind CSS で構築されたソースコード一式です。

本パッケージには ソースコードのみ が含まれています。
node_modules、.env ファイル、ビルド成果物は含まれていません。

この README に記載されている手順に沿って進めれば、公開まで完了します。

⸻

0) 必要なもの

・GitHub アカウント
・Vercel アカウント
・Node.js
・pnpm

⸻

1) セットアップ（ローカル確認）

依存関係をインストールしてください。

pnpm install

⸻

2) 環境変数（必須）

このプロジェクトでは、Google スプレッドシートを CSV 公開 URL として利用し、データを取得しています。
環境変数は、ローカルでは .env.local、Vercel では Environment Variables に設定してください。

以下の 3 つの環境変数が必須です。

NEWS_SHEET_CSV_URL
https://docs.google.com/spreadsheets/d/e/2PACX-1vQxB6UOn0Omze2CG-jflySjBI5iImJEm6sLzBhGToCasUfOWOj1RFaLcb6HuTdSXWOKbcqJyk9tsgaE/pub?gid=0&single=true&output=csv

MENU_SHEET_CSV_URL
https://docs.google.com/spreadsheets/d/e/2PACX-1vQxB6UOn0Omze2CG-jflySjBI5iImJEm6sLzBhGToCasUfOWOj1RFaLcb6HuTdSXWOKbcqJyk9tsgaE/pub?gid=678637529&single=true&output=csv

BEANS_SHEET_CSV_URL
https://docs.google.com/spreadsheets/d/e/2PACX-1vQxB6UOn0Omze2CG-jflySjBI5iImJEm6sLzBhGToCasUfOWOj1RFaLcb6HuTdSXWOKbcqJyk9tsgaE/pub?gid=1645046180&single=true&output=csv

補足（重要）

これらのスプレッドシートは 店舗側で管理されています。
編集権限は 店内 iPad のみ に限定されています。

本コードは CSV の URL を参照してデータを取得しているだけであり、
Google アカウントの認証情報や編集権限は保持していません。

⸻

3) ローカル起動（任意）

以下を実行すると、ローカルで画面を確認できます。

pnpm dev

ブラウザで http://localhost:3000 を開いてください。

⸻

4) GitHub にアップロード（必須）
	1.	GitHub で新しいリポジトリを作成してください。
	2.	このフォルダをそのまま push してください。

初期化・push の流れは以下の通りです。

git init
git add .
git commit -m “initial commit”
git branch -M main
git remote add origin ＜作成した GitHub リポジトリの URL＞
git push -u origin main

⸻

5) Vercel でデプロイ（必須）
	1.	Vercel にログインします。
	2.	New Project を選択します。
	3.	GitHub 連携から対象リポジトリを Import します。
	4.	Framework は自動的に Next.js が選択されます。
	5.	Environment Variables に以下を設定します。

・NEWS_SHEET_CSV_URL
・MENU_SHEET_CSV_URL
・BEANS_SHEET_CSV_URL
	6.	Deploy を実行します。

⸻

6) 独自ドメイン設定（任意）

Vercel 側の設定

Project Settings → Domains から独自ドメインを追加します。
例：lyno.jp、www.lyno.jp

DNS 設定（Onamae など）

Vercel に表示される指示に従って DNS レコードを設定してください。

一般的な例（※Vercel 表示が最優先）
・apex ドメイン：A レコード 76.76.21.21
・www：CNAME cname.vercel-dns.com

⸻

7) ディレクトリ構成概要

・app/
　Next.js App Router のルート構成

・components/
　UI コンポーネント

・lib/
　データ取得処理・ユーティリティ

・messages/
　多言語対応（ja / en）、文章の内容を変更する場合はこのファイルをアップデートしてください

・public/
　画像や静的ファイル

⸻

8) 同梱していないもの

以下は意図的に含めていません。

・node_modules
・.env / .env.local
・.next
・.vercel

依存関係は pnpm install により再構築してください。

⸻

9) 運用について

本番運用および今後の更新は、店側のGitHub / Vercel アカウント にて管理してください。

10)	Google スプレッドシートによるデータ管理について

本サイトでは、以下の 3 つのページのデータを
Google スプレッドシートで管理しています。

・News（お知らせ）
・Menu（メニュー）
・Beans（コーヒー豆）

それぞれのスプレッドシートは CSV 公開形式で Web サイトに連携されており、
新しいデータを追加・編集すると自動でサイトに反映されます。

⸻

■ 基本的な使い方

各シートに新しい行を追加することで、Webサイトへ表示されます。

すでに入力されているデータの形式を参考に、
同じ列構成で入力してください。

⸻

■ 表示・非表示の管理（重要）

各シートには「visible」列があります。

・TRUE → Webサイトに表示される
・FALSE → Webサイトに表示されない

過去のデータを削除せず、
visible を FALSE にして管理することを推奨します。

これにより履歴管理が可能になります。

⸻

■ 反映タイミングについて

スプレッドシートを編集・保存しても、
即時反映されるとは限りません。

通常、数十秒〜数分程度で反映されます。
（キャッシュ状況により多少前後します）

更新後すぐに表示されない場合は、
少し時間を置いて再読み込みしてください。

⸻

■ 各シートの構成概要

【News シート】

主な項目：

・date（日付）
・title_ja（日本語タイトル）
・title_en（英語タイトル）
・body_ja（日本語本文）
・body_en（英語本文）
・visible（表示管理）
・order（表示順）

新しいニュースを追加すると、
お知らせページに反映されます。

⸻

【Menu シート】

主な項目：

・id
・name_ja（日本語名）
・name_en（英語名）
・category（Coffee / Tea Latte / Others / Option）
・price（価格）
・seasonal（季節限定かどうか）
・desc_ja（日本語説明）
・desc_en（英語説明）
・visible（表示管理）

メニューの追加・変更はここで行います。

⸻

【Beans シート】

主な項目：

・id
・name（豆の名前）
・origin（産地）
・variety（品種）
・process（精製方法）
・roast（焙煎度）
・flavor（フレーバー）
・notes_ja（日本語説明）
・notes_en（英語説明）
・price_drip
・price_40
・price_100
・roaster（ロースター名）
・in_stock（在庫有無）
・visible（表示管理）

新しい豆の追加・入れ替えはここで行います。
