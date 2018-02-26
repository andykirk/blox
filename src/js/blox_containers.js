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