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
            default_editor: 'ckeditor',
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

/*

*/

BLOX.containers = {
    add: function (type, ref_el) {
        console.log(type);
        
        // Tmp. force type as the others aren't set up yet.
        type = 'one-up';
        
        var container_dfn = BLOX.settings.containers[type];
        
        ref_el.insertAdjacentHTML('afterend', container_dfn.template);
        BLOX.controls.add_container_options(ref_el.nextElementSibling);
    },
    remove: function () {}
};
/*

*/

BLOX.controls = {
    
    add_container_options: function (target) {
        //console.log('Adding controls', target);

        target.insertAdjacentHTML('afterend', '<div data-blox-controls><button aria-expanded="false">' + BLOX.icons.plus + ' </button><div data-blox-container-options hidden></div></div>');
        var toggle   = target.nextElementSibling.querySelector('[data-blox-controls] > button');
        var controls = toggle.nextElementSibling;
        
        for (var type in BLOX.settings.containers) {
            var item = BLOX.settings.containers[type];
            var btn  = document.createElement('button');
            btn.innerHTML = item.icon;
            btn.setAttribute('data-blox-type', type);
            btn.addEventListener('click', function(e){
                //console.log(e);
                //console.log(this);
                e.preventDefault();
                
                BLOX.containers.add(this.getAttribute('data-blox-type'), target.nextElementSibling);
                toggle.click();
            });
            controls.appendChild(btn);
        };
        
        //console.log(control);
        toggle.addEventListener('click', function(e){
            //console.log(e);
            e.preventDefault();
            
            var expanded = toggle.getAttribute('aria-expanded') === 'true' || false;
            toggle.setAttribute('aria-expanded', !expanded)
            controls.hidden = expanded;
        });
    },
    
    add_panel_actions: function (target) {
        console.log(target);
        var blox_type = target.getAttribute('data-blox-type');
        var actions = '<button data-blox-action="done" data-blox-action-for="' + blox_type + '">Done</button>';
        
        target.insertAdjacentHTML('beforeend', actions);
        //var actions_html = BLOX.helpers.parseHTML(actions);

        //target.appendChild(actions_html); return;
        var done_action = target.querySelector('[data-blox-action="done"]');
        
        
        done_action.addEventListener('click', function(e){
            e.preventDefault();

            blox_type_editor = BLOX.editors[this.getAttribute('data-blox-action-for')];
            blox_type_editor.action_done(this);
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
        //el.style.display = 'none';
        
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
            var blox_html = BLOX.helpers.parseHTML('<div data-blox-container><div data-blox-panel data-blox-type="' + BLOX.settings.default_editor + '">' + content + '</div></div>');
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
            BLOX.controls.add_container_options(bc);

            var blox_panels = blox_area.querySelectorAll('[data-blox-panel]');;
            Array.prototype.forEach.call(blox_panels, function(bp, j){
                var blox_type = bp.getAttribute('data-blox-type');
                console.log(blox_type);
                // Adapt the content for the editor:
                var blox_type_editor = BLOX.editors[blox_type];
                blox_type_editor.adapt(bp);
                
                BLOX.controls.add_panel_actions(bp);
            });
        });
        
    });
};
/*

*/

BLOX.editors['ckeditor'] = {
    type: 'html',
    adapt: function(el){
        // Check for CKEditor:
        if (typeof CKEDITOR === 'undefined') {
            console.error('CKEDITOR does not exist.');
        }

        var html = '<textarea id="flibble">' + el.innerHTML + '</textarea>';
        el.innerHTML = html;
        var textarea = el.querySelector('textarea');
        //console.log(textarea);
        CKEDITOR.replace(textarea);
    },

    action_done: function(el){
        //console.log('Done action');
        //console.log(CKEDITOR);
        // Get the instance name:
        //console.log(el);
        var instance_name = el.previousElementSibling.getAttribute('id').replace('cke_', '');
        var instance = CKEDITOR.instances[instance_name];
        console.log(instance);
        instance.updateElement();

        console.log( document.getElementById( 'flibble' ).value ); // The current editor data.
    }
};