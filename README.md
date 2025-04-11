# ライセンス管理API

このリポジトリは、原単位データベースのライセンス管理APIの実装例をOSSとして公開したものである。

## アプリケーション構成
当アプリケーションは

* ライセンス管理APIを提供するAPサーバ
* データ永続化のためのDBサーバ(PostgreSQL)

で構成されている。

さらにAPサーバと連携するトレーサビリティ管理サービスのモックサーバも合わせて提供する。

## 前提とする環境
### アプリケーション実行環境
|ツール|バージョン|
|----|----|
|node|18.20.4|
|npm|10.7.0|
|postgreSQL|14.0|


## ビルド・起動方法

### 起動手順
#### リポジトリのクローンを行う

#### PostgreSQLサーバの起動と接続設定
* 使用するOSに合わせてyum等でPostgreSQLをインストールする。
* PostgreSQLにライセンス管理アプリで使用するデータベースと接続用のユーザを作成する。
* src/app.module.tsにて接続先のホスト、ポート、DB名、アクセスユーザ、パスワードを上記で作成した情報に合わせて更新する。デフォルト値は以下の通り
```
    type: 'postgres',
    host: 'database',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'postgres',
```
NOTE: アプリケーションの初回起動時にエンティティ定義をもとにテーブル群が自動で作成されるため初期SQL実行等は不要

#### ローカル環境での起動
```bash
$ cd license-management/license-management-app
$ npm install
$ npm run start
```

### docker-composeによる起動手順
本プロジェクトをclone後に以下を実行することでアプリケーションを起動することができる。
```bash
$ docker-compose up
```

またdocker-composeのコメント箇所をアンコメントすることでPostgreSQLのデータ確認や編集用にpgadminを起動することができる。

## テスト手順
### テスト実行
jestを用いてAPIのテストを実行する。
``` bash
$ cd license-management/license-management-app
$ npm run test
```

## 各ソースコードのロケーション
### ライセンス管理アプリケーション
* ソースコードは `license-management/license-management-app`以下に配置している。

### トレーサビリティー管理サービスのモック
* ライセンス管理の一部処理で連携するトレーサビリティ管理システムのmockを作成した。
* ソースコードは`traceability-mock`以下に配置している。

### ライセンス管理アプリのディレクトリ構成
license-management/license-management-app以下のディレクトリ構成について記載する。
```
├── doc                    // API仕様書
├── src
│   ├── database           // 原単位データベース関連のモジュール
│   │     ├── dtos         // DTO定義
│   │     └── entities     // データベースエンティティ         
│   │
│   ├── external           // 外部アクセスのfacadeサービス
│   │
│   ├── license            // ライセンス管理関連のモジュール
│   │     ├── controllers  // Web APIのコントローラー
│   │     ├── dtos         // DTO定義
│   │     └── exception    // 例外関連クラス
│   │
│   ├── user               // 原単位データベース関連のモジュール
│   │     ├── dtos         // DTO定義
│   │     └── entities     // データベースエンティティ  
│   │
│   ├── app.module.ts      // アプリケーションのメインモジュール
│   └── main.ts            // アプリケーションのエントリークラス
│
└── test
    ├── utils              // テストで使用するutilクラスの配置ディレクトリ
    └-─ app.test.ts        // jestのテストファイル
```

## License
The source code is licensed MIT.

## 免責事項
* 本リポジトリの内容は予告なく変更・削除する可能性があります。
* 本リポジトリの利用により生じた損失及び損害等について、いかなる責任も負わないものとします。
