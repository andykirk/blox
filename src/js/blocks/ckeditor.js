/*

*/

BLOX.editors['html'] = {
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