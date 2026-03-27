# Installation

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents**:

- [Installation](#installation)
  - [1. Node Version Manager (`nvm`)](#1-node-version-manager-nvm)
  - [2. pnpm](#2-pnpm)
  - [3. Project](#3-project)
  - [4. Optional - VS Code extensions](#4-optional---vs-code-extensions)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 1. Node Version Manager (`nvm`)

```sh
winget install CoreyButler.NVMforWindows
```

```sh
nvm install latest && nvm use latest
```

## 2. pnpm

This project uses pnpm to conserve disk space and improve installation speed, while maintaining compatibility with Turbopack. It is recommended that you install and use pnpm as well.

```sh
npm i -g pnpm
```

## 3. Project

Before you proceed, make sure the casino backend is running on <http://localhost:3001/docs>.

```powershell
@"
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_CURRENCY=EUR

SUPERVISOR_ID=1296ee43-29c1-485a-8ccd-b16c9b63e9fa
BRANCH_ID=21d03b4a-391e-4c6c-98b0-3186729d94ba
"@ | Set-Content .env.development
```

```sh
pnpm install && pnpm dev
```

Application is now running on <http://localhost:3000>.

## 4. Optional - VS Code extensions

- Prettier: for formatting code and tailwind classes
- Biome: linter
