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

/*

*/

BLOX.containers = {
    options: [
        {
            name: 'One-up',
            icon: ''
        },
        {
            name: 'Two-up',
            icon: ''
        },
        {
            name: 'Three-up',
            icon: ''
        },
        {
            name: 'Float left',
            icon: ''
        },
        {
            name: 'Float right',
            icon: ''
        }
    ],
    add: function () {},
    remove: function () {}
};
/*

*/

BLOX.controls = {
    add: function (target) {
        //console.log('Adding controls', target);
        var container_options = '';
        BLOX.containers.options.forEach(function(item, i){
            container_options += '<button>' + item.name + '</button>';
        });
        
        target.insertAdjacentHTML('afterend', '<div data-blox-controls><button>' + BLOX.icons.plus + ' </button><div>' + container_options + '</div></div>');
        var control = target.nextElementSibling.querySelector('[data-blox-controls] > button');
        //console.log(control);
        control.addEventListener('click', function(e){
            console.log(e);
            e.preventDefault();
        });
    },
    remove: function () {}
};
/*

*/

BLOX.helpers.parseHTML = function(str) {
    var tmp = document.implementation.createHTMLDocument();
    tmp.body.innerHTML = str;
    return tmp.body.children;
};

/*

*/

BLOX.icons = {
    plus: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <line x1="12" y1="5" x2="12" y2="19" /> <line x1="5" y1="12" x2="19" y2="12" /></svg>'
};
/*

*/

BLOX.replace = function (selector) {
    console.log('Creating new Blox context');

    // Check selector targets valid textarea(s) or we can't proceed:
    var elements = document.querySelectorAll(selector);
    Array.prototype.forEach.call(elements, function(el, i){
        //console.log(el.tagName);
        if (el.tagName.toLowerCase() != 'textarea') {
            console.log("Can't attached BLOX to none textarea element:", el, "Selector was: '" + selector + "'");
            return;
        }
        // Hide the textarea:
        el.style.display = 'none';
        
        // Get the textarea contents:
        var content = el.value;
        //console.log(content);
        
        // Inspect the content for existing Blox:
        var content_html = BLOX.helpers.parseHTML(content);
        //console.log(content_html);
        
        // Assume it's ok until we find an error:
        var is_valid_blox = true; 
        // Every top-level-child should be blox-containers:
        Array.prototype.forEach.call(content_html, function(tlc, i){
            //console.log('tlc', tlc, tlc.tagName, tlc.hasAttribute('data-blox-container'));
            var content_html_level_2 = content_html[i]['children'];
            //console.log(content_html_level_2);
            //console.log(tlc.tagName.toLowerCase() == 'div' && tlc.hasAttribute('data-blox-container'));
            if (tlc.tagName.toLowerCase() == 'div' && tlc.hasAttribute('data-blox-container')) {
                // This container seems ok, but all second-level-children need to be blox-panels:
                Array.prototype.forEach.call(content_html_level_2, function(slc, j){
                    //console.log('slc', slc, slc.tagName, slc.hasAttribute('data-blox-panel'));
                    if (!(slc.tagName.toLowerCase() == 'div' && slc.hasAttribute('data-blox-panel'))) {
                        is_valid_blox = false;
                        return;
                    }
                });
                
            } else {
                is_valid_blox = false;
                return;
            }
        });
        
        //console.log(is_valid_blox);
        
        if (is_valid_blox) {
            var blox_html = content_html;
        } else {
            // Not sure how to handle this case. If the content was just HTML and it will be fine to
            // wrap it and use it a single block, but if it's mangled BLOX code, we may need to 
            // rescue it somehow? Assuming mangled BLOX code is quite unlikely so just wrap.
            var blox_html = BLOX.helpers.parseHTML('<div data-blox-container><div data-blox-panel data-blox-type="' + BLOX.settings.default_type + '">' + content + '</div></div>');
        }        
        
        // Append a blox-area:
        var blox_area = document.createElement('div');
        blox_area.setAttribute('data-blox-area', '');
        //blox_area.insertBefore(blox_html, null);
        el.parentNode.insertBefore(blox_area, el.nextSibling);
        
        //el.insertAdjacentHTML('afterend', '<div data-blox-area></div>');
        //var blox_area = el.nextElementSibling;
        blox_area.appendChild(blox_html[0]);
        //console.log(blox_html);
        //console.log(blox_area);
        
        // Add all the controls:
        blox_containers = blox_area.querySelectorAll('[data-blox-container]');
        //console.log(blox_containers);
        
        Array.prototype.forEach.call(blox_containers, function(bc, i){
            BLOX.controls.add(bc);
        });
        
    });
};