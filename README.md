Reproduces https://github.com/ui5-community/ui5-ecosystem-showcase/issues/977

Steps to reproduce:

1. Run `npm install`
2. Run `npm run build:opt`. This will actually run `ui5 build --config ui5-dist.yaml --clean-dest --dest ./build --cache-mode Off --loglevel verbose`
3. Verify build succeeds.
4. Update dev-dependency `"ui5-tooling-modules": "3.2.7"` to `"ui5-tooling-modules": "3.3.0"` (or higher)
5. Run `npm install`
6. Run `npm run build:opt`. Build will fail.

Note: Build will succeed if you remove "libs" folder.
