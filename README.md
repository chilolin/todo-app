yamaoka-todo-app
======

アプリ画面
![App Preview](./assets/yamaoka-todo-app.png)

---

## 機能

- Todoタスクの追加
- Todoタスクの更新、削除
- TodoタスクのDoneタスクへの変換
- DoneタスクのTodoタスクへの変換

---

## 開発

### 環境
- [Node.js](https://nodejs.org/)の最新のLTSバージョン
- [Yarn package manager](https://yarnpkg.com/)
- [firebase-tools](https://www.npmjs.com/package/firebase-tools)
- [serve](https://www.npmjs.com/package/serve)

### メインブランチ
- `master`（リリース可能な状態）URL: https://yamaoka-todo-production.web.app
- `develop`（開発専用）URL: https://yamaoka-todo-develop.web.app

### コントリビュートしたい場合

`develop` ブランチにプルリクエストを送信してください。

### ローカル開発

1. リポジトリをフォークする

2. フォークのローカルクローンを作製し、ルートに移動

```bash
$ git clone https://github.com/chilolin/todo-app.git
$ cd todo-app
$ yarn install
$ yarn lint:fix
```

3. .env.local をルートに配置。（.env.sample を参照）

4. Firebaseのセットアップ

```bash
$ firebase login
# firebaseのプロジェクトを指定
$ firebase use --add
? Which project do you want to add? <プロジェクト名>
? What alias do you want to use for this project? (e.g. staging) <任意の名前>
# build ファイルの作成
$ yarn build
$ firebase deploy
```

5.  `yarn start` でボート番号3000のローカルサーバの立ち上げ

6. デプロイ

```bash
# hosting の target の設定
# TARGET_NAME と RESOURCE_NAME は任意
$ firebase target:apply hosting <TARGET_NAME> <RESOURCE_NAME>
# デプロイ
$ firebase deploy
```

