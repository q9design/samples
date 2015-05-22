http://updates.html5rocks.com/2015/04/permissions-api-for-the-web
https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API
https://w3c.github.io/permissions/

https://www.chromestatus.com/feature/6376494003650560

https://googlechrome.github.io/samples/permissions/

> can we check if in a 'disposable' browser situation like incognito.

enum PermissionName {
    "geolocation",
    "notifications",
    "push",
    "midi"
};

enum PermissionState {
    "granted",
    "denied",
    "prompt"
};

interface PermissionStatus : EventTarget {
    readonly    attribute PermissionState status;
                attribute EventHandler    onchange;
};
