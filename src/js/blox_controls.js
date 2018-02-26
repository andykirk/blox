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