
$(document).ready(function () {

    $.fn.duplicateORdelItem = function () {
        
                console.log('error click');
    if(transmit!==false){
       transmit = true;
    }
    
    var action = $(this).data('duplicate');      
    var zeGroup = $(this).parent().parent(); 
    var format = zeGroup.data('group');
      
        console.log(action);
        if(action==='add-data'){
            
            
            var zeClone = zeGroup.clone(true);   
            zeClone.insertAfter(zeGroup);
            e.preventDefault(); 
        
        }else if(action==='del-data'){
            if($('[data-group="'+format+'"]').length > 1){               
                $(this).parent().parent().remove();
            }
        }
        /** On Ré-incremente les groupes et les input **/
              
            $(this).incrementGroup(format); 
            if(transmit === true){
            if(format==='gradient'){format='multiBack';}              
            dataPrev.format = format;
           // $(this).preview(true);
            }
        return false;  


    }

});