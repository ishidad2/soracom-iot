Symbol-iot
===

# Requirement

* Docker
* docker-compose
* Node.js

# Usage

```
cd src
npm install
```

# Config setting

```
cd config
```

```
# .env.example を .env にリネーム
vm .env.example .env
```

送信元のプライベートキーを設定

```
CERTIFICATE_PRIVATE_KEY=
```

実行
===

プロジェクトファイル直下（docker-compose.ymlのある場所）で実行

```
docker-compose up or docker-compose up -d
```
