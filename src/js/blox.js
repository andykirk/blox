/*

*/

(function() {

    /*var ready = function(fn) {

        if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {

            fn();

        } else {

            document.addEventListener('DOMContentLoaded', fn);

        }

    }*/

    if (window.BLOX) {
        return;
    }

    window.BLOX = {
        settings: {
            default_type: 'html'
        },
        instances: [],
        helpers: {}
    };

})();
