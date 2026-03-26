# AI Image SaaS

AI画像生成ができるSaaSアプリです。  
ユーザー認証、画像生成、履歴保存、クレジット管理まで実装しています。

## Demo

- App: （VercelのURLをここに入れる）
- GitHub: （このリポジトリのURL）

## Features

- Clerkによるユーザー認証
- Stability AIを使った画像生成
- Supabase Storageへの画像保存
- 生成履歴の表示
- クレジット消費機能
- ダッシュボード表示

## Tech Stack

- Next.js
- TypeScript
- Clerk
- Prisma
- Supabase
- Supabase Storage
- Stability AI
- Tailwind CSS
- shadcn/ui

## Pages

- `/` トップページ
- `/dashboard` ダッシュボード
- `/generate` 画像生成
- `/history` 履歴一覧
- `/pricing` 料金ページ

## How It Works

1. ユーザーがログイン
2. プロンプトを入力して画像生成
3. Stability AIで画像を生成
4. Supabase Storageに画像を保存
5. DBに履歴を保存
6. クレジットを1消費

## Setup

```bash
git clone https://github.com/あなたのユーザー名/ai-saas.git
cd ai-saas
npm install
npm run dev
```
