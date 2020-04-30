
$(document).ready(function() {
   /*Listing des cookie    
   *    $.cookie('ruleHtml') //
   *    $.cookie('project') //
   *    $.cookie('idProject') //
   *    $.cookie('sheet') //
   *    $.cookie('idSheet') //
   *    $.cookie('X_"el"') //
   *    $.cookie('Y_"el"') //
   *    $.cookie('onglets"id_onglets"') //
   *    $.cookie('coorMove') //
   *    $.cookie('posList') //
   *    $.cookie('ongletstab1') //
   *    $.cookie('scrollWindows') //    
   *    $.cookie('browser') //    
   *    $.cookie('kit') //       
   *    $.cookie('thisContext') //       
   */

  

    
        
   O = {};
   O ={
       
       dataBase : 'CMA',
       dataBaseUser : 'root',
       dataBasePass : '',       
       
       user : 'pseudo',
       serial : '3197-3896-4816-0469',
       unity:'em', 
       prefixCss : true,
       buffer : '#tampon', 
       
       
       
       dirProject : '/css3ui/js/yourproject/' ,
       dirExtract : '/myWeb/css/' , 
       dirWorkImg : '/myWeb/plugImg'  ,      
       dirRoot : '/css3ui/' , 
       dirPlug : '/css3ui/js/css3ui',      
       dirImg : '/css3ui/js/img',  
       
       
       dirOnline : '/'
              
              
                 
    };    
    
    
      if($.cookie('project')){
        O.dirBackImg = '/css3ui/js/yourproject/'+$.cookie('project')+'/img/background/';
    }


    console.log(O);
    
    });