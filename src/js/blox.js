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
            default_type: 'html',
            containers: {
                'one-up': {
                    name: 'One-up',
                    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="62" height="38" viewBox="0 0 62 38"  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="1" fill="#ffffff" width="60" height="36" /></svg>',
                    template: '<div data-blox-container><div data-blox-panel></div></div>'
                },
                'two-up': {
                    name: 'Two-up',
                    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="62" height="38" viewBox="0 0 62 38"  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="1" fill="#ffffff" width="60" height="36" /><line x1="31" y1="1" x2="31" y2="37"/></svg>'
                },
                'three-up': {
                    name: 'Three-up',
                    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="62" height="38" viewBox="0 0 62 38"  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="1" fill="#ffffff" width="60" height="36" /><line x1="21" y1="1" x2="21" y2="37"/><line x1="41" y1="1" x2="41" y2="37"/></svg>'
                },
                'float-left': {
                    name: 'Float left',
                    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="62" height="38" viewBox="0 0 62 38"  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="1" fill="#ffffff" width="60" height="36" /><rect x="5" y="6" width="26" height="15"/><line x1="35" y1="6" x2="57" y2="6"/><line x1="35" y1="11" x2="57" y2="11"/><line x1="35" y1="16" x2="57" y2="16"/><line x1="35" y1="21" x2="57" y2="21"/><line x1="5" y1="26" x2="57" y2="26"/><line x1="5" y1="31" x2="57" y2="31"/></svg>'
                },
                'float-right': {
                    name: 'Float right',
                    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="62" height="38" viewBox="0 0 62 38"  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="1" fill="#ffffff" width="60" height="36" /><rect x="31" y="5" width="26" height="16"/><line x1="5" y1="6" x2="27" y2="6"/><line x1="5" y1="11" x2="27" y2="11"/><line x1="5" y1="16" x2="27" y2="16"/><line x1="5" y1="21" x2="27" y2="21"/><line x1="5" y1="26" x2="57" y2="26"/><line x1="5" y1="31" x2="57" y2="31"/></svg>'
                }
            }
        },
        instances: [],
        editors: {},
        helpers: {}
    };

})();
