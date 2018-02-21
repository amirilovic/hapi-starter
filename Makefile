APP_NAME ?=api

.PHONY: help

.DEFAULT_GOAL := help

help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

start: install ## Start server in dev mode
	docker-compose up -d

setup: ## Prepare code for development
	@cp .env.example .env

stop: ## Stop docker containers
	@docker-compose stop

clean: stop ## Remove all docker containers
	@docker-compose kill
	@docker-compose rm -f

logs: ## Show server logs
	@docker-compose logs -f --tail 10

install: ## Run npm install
	@docker-compose run --rm --no-deps $(APP_NAME) npm install

compile: install ## Compile TypeScript files
	@docker-compose run --rm --no-deps $(APP_NAME) npm run compile

test: compile ## Run tests
	@docker-compose run --rm --no-deps $(APP_NAME) npm run test

test-watch: ## Run test in watch mode
	@docker-compose run --rm --no-deps $(APP_NAME) npm run test:watch
