export default {
    install( Vue, options ) {

        Vue.prototype.$message = function(txt) {
            M.toast({html: txt})           
        }

        
    }
}