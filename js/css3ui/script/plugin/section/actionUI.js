
$(document).ready(function() {



/// Centralise les interactions dans l'UI
///Le dispatch n'éxecute que les fontions d'actions 
//Ecrite au niveau du repertoire concerné
//Aucune fonction ne doit être écrite des cette zone



$(document).on('click',"[data-actionUI]",function(e){
    
    
   
    e.preventDefault();
    var action = $(this).attr('data-actionUI');  
    var thisData = ($(this).data());
    thisData.actionUI = action;  
     $('.toolsIcon').remove();
      
    var balise = $(this).tagName();
    
    
    switch(balise){         
            case 'A' : 
                
                switch (action){                    
                    case ('createRule') :
                        $(this).selDom();                    
                    break;                    
                }            
            break;
    }
    
    
});

});
