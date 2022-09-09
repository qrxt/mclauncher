
# Setup
setup:
	npm i
	cd ./src-tauri && cargo build

# Dev
dev:
	npm run tauri dev

kill:
	sudo kill -9 `sudo lsof -t -i:1420`

# Tests
lint-rs:
	cd ./src-tauri/ && cargo fmt --check && cd ..
	cd ./src-tauri/ && cargo clippy && cd ..

test-rs:
	cd ./src-tauri/ && cargo test

check-rust-all:
	make lint-rs
	make test-rs

typecheck-js:
	npm run typecheck

fmt-js:
	npx -p prettier@latest -p pretty-quick pretty-quick

test-js:
	npm test

lint-js:
	npm run lint

check-js-all:
	make typecheck-js
	make fmt-js
	make lint-js
	make test-js

lint:
	make lint-rs
	make lint-js

test:
	make check-rust-all
	make check-js-all

# Build

build:
	npm run tauri build

# Misc

clean:
	npm run clean
