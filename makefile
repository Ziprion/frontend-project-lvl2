install:
	npm instal
publish:
	npm publish --dry-run
lint:
	npx eslint .
gendiff:
	node bin/gendiff
