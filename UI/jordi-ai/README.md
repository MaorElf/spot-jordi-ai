# spot-client-template
This repo should be used to create new Angular micro-frontends.

### npm install
- Please note that since Angular V15 instead of using `npm install` you should use `npm install --legacy-peer-deps`, there is a script inside `package.json` so you can run it by typing `npm run npm-install` 

Included here:
- the basic setup & boilerplate needed for working with ```SingleSPA``` and the ```spot-client-shared``` library
- a demo feature for reference
## Setting up a new Angular application
1. in `angular.json` & `package.json`: replace all occurrences of "spot-client-template" with the new application name
    - Update `servePath` to be the same as the public path of the application
    - Important: the application name must be unique
    - 
2. in `src/app/main/main.component.ts`, `src/app/app.component.ts` & `src/bootstrap-spa.ts`: update the component selector with the relevant prefix for the new app
3. run `npm install` & add the generated `package-lock.json` to git
4. integrate with SingleSPA and the console BE:
   - in `src/bootstrap-spa.ts`: replace "newAppName" with the actual app name
   - in `src/app/app-routing.module.ts`: replace "newAppPrefix" with the url prefix which will be used for the new app (similar to 'spt', 'settings')
   - run the "build-prod" (or "build-dev") script
   - in `spotinst-client-root` project: 
      - add an import-map in `import-maps.json` using the url prefix mentioned above
      - in `single-spa-config.js`: add the relevant configuration to the `APPLICATIONS` object
   - in `spot-client-backend` project: 
      - in `dev.config.json` and `prod.config.json`: add a new identifier and path pointing to the build output of the new app, for example:

        `"SPOTINST_SECURITY_APP_PATH": "/spotinst/micro_frontends/spotinst-client-security"`
        
      - in `dev.config.private.json` and `prod.config.private.json`: map the identifier used in the previous step to the *LOCAL* build output of the new app, for example:

        `"SPOTINST_SECURITY_APP_PATH": "/Users/eden.ilan/WebstormProjects/spot-client-template/build"`
        
      - in ```config/config.js```: under ```applicationsPaths``` add an entry using the identifier mentioned above
      - in ```server/middleware/staticFilesHandler.js```: under ```CLIENT_APPLICATIONS``` add a new entry for the new app (use the other entries as references):
          - ```prefix: <the url prefix mentioned above>```
          - ```path: <the applicationPath entry mentioned above>```
    - run `npm run serve` to build and serve the application with a proxy to dev env
5. remove the demo: 
   - delete the ```src/app/demo``` dir
   - in ```src/app/app-routing.module.ts```: remove the relevant "demo" route

6. in `spotinst-service-configurations` repo: add the application identifier and path to the following files, as was done in `spot-client-backend`'s `dev/prod.config.json`:
    - `configurations/spotinst-client-backend/dev/dev.json`
    - `configurations/spotinst-client-backend/prod/client-backend.vars.env.json`

7. Update `README.md` file 
