/// <reference path="typings/tsd.d.ts"/>


// defined in require.d.ts

// Our own translation function
interface Translate {
    (t:string):string;
}

interface RequireModule {
    config(): any;
}

// expand this
interface DurandalRouteConfiguration {
    guarded?: boolean;
    task_action?: {
        mod: string;
        res: string;
        name: string;
    };
}



interface DurandalAppModule {
    global: any;
    isLoading: KnockoutObservable<boolean>;
}

// Stupid Typescipt workaround
interface Window {
    File: any;
    FileList: any;
    FileReader: any;
    XMLHttpRequest: any;
    FormData: any;
    breadcrumb: any;
    on: any;
//    URL: any; XXX 1.6.2 dislike this
    webkitURL: any;
    OpenLayers: any;

    attachEvent(event: string, listener: EventListener): boolean;
    detachEvent(event: string, listener: EventListener): void;
}
interface JQuerySupport {
    transition?: any;
}
interface JQuery {
    emulateTransitionEnd?: any;
    /*datepicker: any;*/ //Todo: chech up on ref
}
interface KnockoutBindingHandlers {
    dropUpload: KnockoutBindingHandler;
    rating: any;
    valueAsCurrency: KnockoutBindingHandler;
    imagePicker: KnockoutBindingHandler;
    avatar: KnockoutBindingHandler;
    collapsed: KnockoutBindingHandler;

}

interface KnockoutValidationStatic {
    configure: any;
}
interface KnockoutExtenders {
    deferValidation: any;
}

declare var m: RequireModule;

declare var XDomainRequest: any;

declare module 'module' {
//    export = m;
}
