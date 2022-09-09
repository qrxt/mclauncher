... TODO!(badges)

# Minecraft Launcher

... TODO!(description)

## Features

- OS support
  - [ ] Windows
  - [ ] Linux
- Online mode
  - [ ] Mojang auth
  - [ ] Microsoft auth
- [ ] Multiple isolated instances
- Packs support
  - [ ] Vanilla
  - [ ] Forge
  - ❌ Fabric
- Languages
  - [ ] English
  - [ ] Russian

## Stack

- Tauri
  - Back:
    - Rust
    - ... TODO!
  - Frontend:
    - React
    - Vite
    - Emotion
    - ... TODO!

## Usage

You can download the installer for your operating system in the [releases section](https://github.com/qrxt/mclauncher/releases)

... TODO!

## Commands

### `make setup`

Install all Node Package Modules that depending this project, then build

### `make dev`

Run dev server, open webview. By default uses 1420 port

### `make lint`

Lint rust & js

### `make build`

Create tauri build

### `make clean`

Remove package.lock, node_modules, rust target/\*\*
