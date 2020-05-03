
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

  
//nouveau tableau de données

$('.css3ui,.css3ui *').addClass('EX-UI');


 console.log('constante');

$.fn.tagName = function () { return this.get(0).tagName; };




D = {};

D = {
    param: {
        plugName: "css3ui",
        domLimit: 5,
        nameDataAttr: 'cma',
        viewALLattribute: false
    },
    dom: {
        domCursorPath: '',
        imgEl : false
    }
};
    
    
    
        
   O = {};
   O ={
       
    dataBase: 'cma',
      dataBaseUser: 'root',
      dataBasePass: '',

      user: 'pseudo',
      serial: '3197-3896-4816-0469',
      unity: 'em',
      prefixCss: true,
      buffer: '#tampon',

      dirProject: '/css3ui/js/yourproject/',
      dirExtract: '/css3ui/js/css3ui/core/css/final',
      dirWorkImg: '/myWeb/plugImg',
      dirRoot: '/css3ui/',
      dirPlug: '/css3ui/js/css3ui',
      dirImg: '/css3ui/js/img',
      rightClick: false,
      limit: 'all',


      dirOnline: '/'
              
                 
    };    
    
    
      if($.cookie('project')){
        O.dirBackImg = '/css3ui/js/yourproject/'+$.cookie('project')+'/img/background/';
    }

  console.table($.cookie());
    console.log(O);
    
    });