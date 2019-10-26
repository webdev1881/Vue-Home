export default {
    install( Vue, options ) {

        Vue.prototype.$message = function(txt) {
            M.toast({html: txt})           
        }

        Vue.prototype.$error = function(txt) {
            M.toast({
                html: `${txt}`,
                classes: 'error-msg'
            })           
        }

        
    }
}