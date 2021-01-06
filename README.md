# todo-application

---

## 0. 目次

1. [環境構築](#1-環境構築)
2. [アーキテクチャ](#2-アーキテクチャ)
3. [ローカル開発](#3-ローカル開発)
4. [デプロイ](#4-デプロイ)
5. [ブランチルール](#5-ブランチルール)

--

## 1. 環境構築

あらかじめ、次のアプリケーション/extentionをインストールしてください。

| 名前                                                                | バージョン（必要なら明記） | 条件 |
| ------------------------------------------------------------------- | -------------------------- | ---- |
| [Node.js](https://nodejs.org/en/)                                   | 14.4.0                     | 必須 |
| [Visual Studio Code](https://code.visualstudio.com/)                |                            |      |
| [Yarn](https://classic.yarnpkg.com/ja/docs/install/#windows-stable) | 1.22.10                    | 必須 |
| [firebase-tools](https://www.npmjs.com/package/firebase-tools)      |                            | 必須 |
| [serve](https://www.npmjs.com/package/serve)                        |                            | 必須 |

--

## 2. アーキテクチャ

Coming soon

--

## 3. ローカル開発

### A. 自分のプロジェクト

1. ルートに .env.local を配置（.env.sample を参照のこと）

2. Firebase のセットアップ

```bash
# firebase にログイン
$ firebase login
# firebase のプロジェクトを指定
$ firebase use -add
? Which project do you want to add? <プロジェクト名>
? What alias do you want to use for this project? (e.g. staging) <任意の名前>
# firebaseにデプロイ
# 最初は firestore のルールをデプロイする必要がある
$ firebase deploy
```

3. ローカルサーバの立ち上げ

```bash
$ yarn
$ yarn start
```

### B. ローカルで develop を立ち上げる場合

1. .env.development.local をルートに配置。
2. `yarn serve-dev` を実行。

### C. ローカルで test を立ち上げる場合

Coming soon

### D. ローカルで production を立ち上げる場合

1. .env.production.local をルートに配置。
2. `yarn serve-prod` を実行。

--

## 4. デプロイ

### A. 自分のプロジェクトをデプロイしたい場合

```bash
# hosting の target の設定
# TARGET_NAME と RESOURCE_NAME は任意
$ firebase target:apply hosting <TARGET_NAME> <RESOURCE_NAME>
# デプロイ
$ firebase deploy
```

### B. develop/test/production のデプロイ

Coming soon

--

## 5. ブランチルール

基本的には develop ブランチをベースに開発し、develop ブランチに対してプルリクエストを出してください（直接 push しないでください）。
レビュー後に approve されたら、最後にapproveした人がマージを行ってください（requested to change されたら、変更を行い再度レビューを申請してください）。

| ブランチ  | Firebase           | ウェブサイト |
| --------- | ------------------ | ------------ |
| `master`  | `yamaoka-todo-production` | https://yamaoka-todo-production.web.app （ユーザー専用） |
| `test`    | Coming soon        | Coming soon  |
| `develop` | `yamaoka-todo-develop` | https://yamaoka-todo-develop.web.app （エンジニア専用） |
