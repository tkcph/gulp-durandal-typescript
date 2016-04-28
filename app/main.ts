/// <reference path="../references.d.ts"/>
requirejs.config({
    paths: {
        'text': '../node_modules/requirejs-text/text',
        'durandal':'../node_modules/durandal/js',
        'durandal/system':'../node_modules/durandal/js/system',
        'plugins':'../node_modules/durandal/js/plugins',
        'transitions':'../node_modules/durandal/js/transitions',
        'knockout': '../node_modules/knockout/build/output/knockout-latest',
        'bootstrap': '../node_modules/bootstrap-sass/assets/javascript/bootstrap.min',
        'jquery': '../node_modules/jquery/dist/jquery.min'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
        }
    }
});

import * as system from 'durandal/system';
import * as app from 'durandal/app';
import * as viewLocator from 'durandal/viewLocator';


//>>excludeStart("build", true);
system.debug(true);
//>>excludeEnd("build");

app.title = 'Durandal Starter Kit';

app.configurePlugins({
    router:true,
    dialog: true,
    widget: true
});

app.start().then(function() {
    //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
    //Look for partial views in a 'views' folder in the root.
    viewLocator.useConvention();

    //Show the app by setting the root view model for our application with a transition.
    app.setRoot('viewmodels/shell', 'entrance');
});