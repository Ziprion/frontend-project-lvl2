install:
	npm install
publish:
	npm publish --dry-run
lint:
	npx eslint .
gendiff:
	node bin/gendiff
test:
	npm test
test-coverage:
	npm test -- --coverage --coverageProvider=v8