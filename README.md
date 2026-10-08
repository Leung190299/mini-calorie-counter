# @exercise/mini-calorie-counter

Đếm calo — a mini app for **exercise-app**, built on [`@exercise/mini-app-sdk`](https://github.com/Leung190299/mini-app-sdk).

## Install in the host app

```json
"@exercise/mini-calorie-counter": "github:Leung190299/mini-calorie-counter#v1.2.0"
```

The host provides `@exercise/mini-app-sdk`, `react` and `react-native` (peer dependencies).
This mini app is JS-only, so new versions ship to users through hot-updater OTA — no native rebuild.

## Release a new version

```bash
npm version minor          # bumps package.json version and creates the git tag
git push --follow-tags
```

Then in exercise-app: change the tag in `package.json`, run `npm install`, commit, and deploy OTA
(`npm run ota:dev`, test on the Dev app, then `hot-updater bundle promote`).

## Run standalone (example app)

`example/` is a small Expo app that renders this mini app on its own, with a light/dark toggle and
the same colors the host passes down. It is not part of the package (`files` only ships
`index.tsx` and `src`).

```bash
cd example
npm install
npx expo start        # press i for the iOS simulator, or scan the QR code with Expo Go
```

Keep `example/package.json` on the same Expo SDK, `react` and `react-native` versions as exercise-app.

## Develop against the host locally

```bash
# in this repo
npm link
# in exercise-app
npm link @exercise/mini-calorie-counter
```

Run `npm install` in exercise-app afterwards to go back to the pinned git version.
