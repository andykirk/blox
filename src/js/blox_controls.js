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