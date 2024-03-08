# Changelog

<a name=“09-05-2023”></a>

# 09-05-2023

### Features

* `Angular 15`: Upgrade to Angular version 15.

<a name=“07-04-2023”></a>

# 07-04-2023

### Features

* `version-service`: Add version service and async pipe for polledVersion$
* `package.json`: Install webpack-env to devDependencies to remove ts-ignore for webpack_public_path

<a name=“20-12-2022”></a>

# 20-12-2022

### Internal

* `GitHub Actions Workflow`: Requires clean-install on PR workflow in GH. `package.json` changes must be in sync
  with `package-lock.json`
* `Karma`: Updated spec reporter for easier parsing of unit test failures at end

<a name=“11-12-2022”></a>

# 11-12-2022

### Features

* `capability-guard`: added the ability to add a guard to route based on the capability state

<a name="2021-12-20"></a>

# 2021-12-20

### BREAKING CHANGES

| Pull Requests                                                     | Repo                 | Description                                           |
|-------------------------------------------------------------------|----------------------|-------------------------------------------------------|
| [PR#11](https://github.com/spotinst/spot-client-template/pull/11) | spot-client-template | Updated repo Angular version from v10.0.9 to v12.2.13 |

* Library has been updated to **Angular 12**, aka Ng12. All versions moving forward including this will build the
  library with the Ivy view engine.
* Ivy Library is **incompatible with previous versions**. To consume the new version of the library please first update
  your corresponding client MFE to Ng12.
* For help to update your respective MFE application:
    * Please reach out in the *#sig-frontend-developers* slack channel
    * For reference the PR to update `spot-client-template`
      repository - [spot-client-template Ng12 Upgrade PR#11](https://github.com/spotinst/spot-client-template/pull/11)
    * Helpful Links:
        * [Angular Update Guide/Tool](https://update.angular.io/)
        * [Angular Releases Guide](https://angular.io/guide/releases)
        * [GitHub: Angular Changelog](https://github.com/angular/angular/blob/master/CHANGELOG.md)
* Known Issues in WebStorm (and other JetBrains IDEs) with respect to intelilisense IDE highlighting errors incorrectly
    * [JetBrains Issue](https://youtrack.jetbrains.com/issue/WEB-45118)
    * Verified fix in 2021.3 works. Link to latest WebStorm for
      Mac - [DL Latest WebStorm](https://www.jetbrains.com/webstorm/download/#section=mac)
* NG12 CLI requires a Node Version of 12.14.x/14.15.x or later minor
    * Verify any CI/CD pipelines have a supported version of Node installed
    * Verify GitHub PR runner yaml file references a version of Node that is compatible

### Features

* Angular updated to v12 🎉

### Bug Fixes
