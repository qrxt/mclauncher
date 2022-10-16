![tests](https://github.com/qrxt/mclauncher/actions/workflows/run-tests.yml/badge.svg) ![tests](https://github.com/qrxt/mclauncher/actions/workflows/tauri-upload-artifact.yml/badge.svg)

# Minecraft Launcher [WIP]

![Launcher main page](https://user-images.githubusercontent.com/46269438/196009541-a25edee9-01d9-42cf-a0b3-c01fe0f37ba9.jpg)

Simple minecraft launcher written in Tauri.

## Features

- OS support
  - [x] Windows
  - [x] Linux
- Online mode
  - [ ] Microsoft auth
- [x] Multiple instances
- Packs support
  - [x] Vanilla
  - [] Modded

## Stack

- Tauri
  - Backend:
    - Rust
  - Frontend:
    - React
    - Vite
    - Chakra UI
    - ...

## Usage

You can download the installer for your operating system in the [releases section](https://github.com/qrxt/mclauncher/releases)

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

## Screenshots and GIFs

![Instance installation](https://user-images.githubusercontent.com/46269438/196009427-3c64e818-bf4d-4d3a-a7a6-38d99a38abfd.gif)

![Instance launch](https://user-images.githubusercontent.com/46269438/196009437-dc1aa937-947e-4651-b4b1-1ebbb3cdbfcb.gif)
