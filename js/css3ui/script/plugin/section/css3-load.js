
$(document).ready(function() {
  
///Evenement aux clic
///Gestion de tout les evenements d'interface qui coummunique avec la Base de données  
  
  $(document).on('click','.css3ui *[data-action],.toolsIcon *[data-action]', function(e){  
    
     
 
    e.preventDefault();
    var action = $(this).attr('data-action');  
    var bdd = $(this).attr('data-table');
    var thisData = ($(this).data());
     thisData.action = action;  
     $('.toolsIcon').remove();
      
    var balise = $(this).tagName();
        console.log(balise);
        console.log(action);
    switch(balise){         
            case 'A' : 
                switch(action){
                    case 'open':
                        switch(bdd){
                            case  'project':
                                
                                console.log(thisData);
                                 $(this).resetCookie(); 
                              $.cookie('idProject', thisData.id);
                              $.cookie('project', $(this).text());                                   
                                $(this).openProject(thisData);
                                $(this).loadDefaultGlobal('listSelect');
                                
                                return false;                        
                        }
                        switch(bdd){
                            case  'sheet':
                                console.log('ouverture de la feuille de style');
                              $.cookie('idSheet',thisData.id);
                              $.cookie('sheet',$(this).data('sheetname'));
                          
                              if(!$.cookie('lastOpen')){
                              //$.cookie('lastOpen','root_0');
                              }
                            
                          
                                ;
                                $('.css3ui-tabListData_active').each(function(){

                                    $(this).toggleClass('css3ui-tabListData_active');

                                });
                                $(this).sheetOpenGroup($.cookie('sheet'));
                                $(this).toggleClass('css3ui-tabListData_active');
                                $('.styleSheet [data-sheet="'+$.cookie('sheet')+'"]').show().siblings().hide(); 
                                $(this).flashUI('style','success','StyleSheet : '+$.cookie('sheet'));
                               
                                
                                
                                return false;                        
                        }
                        
                    case 'delThis' :
                        
                        switch(bdd){
                            
                            case  'project':
                                
                         
                            $(this).delProject(thisData);
                            $(this).loadSys();
                            
                            return false;
                            
                            
                            case  'sheet': 
                                
                            $(this).delSheet(thisData);
                            return false;
                            
                            case  'group': 
                                                             
                                 $(this).delGroup(thisData);                                 
                                 $(this).checkMyFamilly(thisData);
                                 
                            return false;
                            
                            case  'rule':  
                                
                                console.log('******************************');
                                console.log(thisData);
                                
                                var zeParent =   $('LI[data-el="rule_'+thisData.idlinkrule+'"]')
                                            .parent()
                                            .parent();
                                    
                                console.log('********************************');
                                console.log(zeParent);
                                var thisRuleHtml = zeParent.data('groupname');
                                var zeRuleCss =  $('LI[data-el="rule_'+thisData.idlinkrule+'"]').data('rulecss');
                                console.log(thisRuleHtml);
                                console.log(zeRuleCss);
                              $(this).delRule(thisData);                               
                       
                            return false;
                            case  'multiBack':  
                                
                               $(this).optionBackground('delThis');
                               
                            return false;
                        }

                    break; 
                    
                    case'disable':
                        switch(bdd){
                             
                            case  'group':
                                
                                                              
                                console.log(thisData);                                
                                //Apelle ajax
                                $(this).disableGroup(thisData);
                                
                                
                            break;
                            case  'sheet':
                                
                                console.log('DISABLE SHEET');                                
                                console.log(thisData);                                
                                //Apelle ajax
                                $(this).disableSheet(thisData);
                                
                                
                            break;
                            case  'rule':
                                
                                console.log('DISABLE RULE');                                
                                console.log(thisData);                                
                                //Apelle ajax
                                $(this).disableRule(thisData);
                                
                                
                            break;
                             
                        }
                    break;
                    
                    
                    case 'before':
                    case 'after':

                          case  'multiBack':                                  
                              $(this).optionBackground(action);                               
                          return false;

                    break;
                  
                }
                
            // fin de case balise A
                
            case 'INPUT' :                
                switch(action){
                    case 'create':
                        switch(bdd){
                            case 'project':  

                              
                                thisData.newProject =$('input[name="project"]').val(); 
                                $(this).createProject(thisData);

                            break;

                            case 'sheet':              
 
                                if($.cookie('idProject')){thisData.id=$.cookie('idProject');}
                                thisData.newStyle =$('input[name="sheet"]').val();
                                tabListOpen = [];
                                
                                $(this).loadDefaultGlobal('listSelect');
                                $(this).createStyle(thisData); 
                                $(this).closeToCall();

                            break;
                            
                            case 'group':   
                                //pour creer un group il nous faut
                                //nom du group
                                //
                                //id du group
                                    //si pas d id -> id = 0
                                //id de la feuille de style ->$.cookie(styleId);
                                //ensuite on check le format if @media -> format = 2 else format = 1                                
                                
                                // on check le format  
                            
                                thisData.newGroup = $('textarea[name="newgroup"]').val(); 
                                thisData.action = 'create';
                               
                                if(thisData.newGroup.match(/@keyframes/gi)){  thisData.idFormat = 2;}
                                else if(thisData.newGroup.match(/@media/gi)){  thisData.idFormat = 3;}
                                else{ thisData.idFormat = 1 ;}
                                
                                   $(this).createGroup(thisData);
                                   $(this).closeToCall();

                            break;
                        }
                    break; 
                // fin de create
                    
                    case 'edit':
                        switch(bdd){  
                        case 'project': 
                       
                            thisData.newData = $('#css3ui-callTo [name="edit'+thisData.table+'"]').val();
                        
                        case 'sheet': 
                        case 'group': 
                            
                            thisData.newData = $('#editGroup').val();
                            $(this).editName(thisData);
                            
                            
                        break;
                        }    
                     break;
                     
                     
                    case 'duplicate':
                        switch(bdd){ 
                            case 'project': 
                            thisData.newProject =$('textArea[name="newproject"]').val(); 
                            thisData.job ='all';
                            
                            $(this).duplicateProject(thisData);
                              
                        break;
                        }  
                    break;
                    
                    
                    case 'structure':
                        switch(bdd){ 
                            case 'project': 
                            thisData.newProject =$('textArea[name="newproject"]').val();
                            thisData.job    ='structure';
                            thisData.action ='duplicate';
                            $(this).duplicateProject(thisData);
                              
                        break;
                        }  
                    break;
                    case 'important':
                        switch(bdd){ 
                            case 'rule': 
                                
                            console.log('passe la valeur css à important');                                
                            $(this).ruleImportant(thisData);
                              
                        break;
                        }  
                    break;
                        
                        
                        
                          
                    break;// fin de l'édition
                    
                    case 'callTo':   
                        
                        callToActive = true;
                                            
                        switch(thisData.switch){
                            
                            case 'create':
                             switch(thisData.table){
                                 
                                  case 'project':
                                
                                var  myHtml = '<fieldset id="css3ui-callTo" class="css3ui-look EX-UI">'+
                                '<h1 class="legendInside EX-UI">Ajout d\'un projet</h1 >'+                                
                                '<div class="sub-callTo flexColumn-noWrap EX-UI">'+
                                '<span class="text-classic EX-UI">Vous ne pouvez utiliser que des caractères alphanumériques</span>'+
                                '<input type="text" name="project" placeholder="newProject" data-focus="true class="EX-UI"/>'+
                                '<span class="input-callTo EX-UI">'+
                                '<input type="button" name="createProject" value="Ok" data-action="create" data-table="project" class="EX-UI"/>'+
                                '<input type="button" value="annuler" data-action="cancel" class="EX-UI"/>'+
                                '</span>'+
                                '</div>'+
                                '</fieldset>';
                                $(this).myLightBox(myHtml);
                                
                                 break;
                                 
                                 
                                 
                                 
                                case 'group':
                                    
                              
                                //On ecrase les donées de preview à la demande de creation de group
                                //Pour eviter les conflits.
                                dataPrev = [];
                                if(dataListSelect.groupformat !== 'ruleHtml'){
                                    
                                            console.log(dataListSelect);
                                    if(dataListSelect.level<=2){
                                        
                                        //work On doit pouvoir injecter la position et le dernier group ouvert
                                             
                                                
                                    var  myHtml = '<fieldset id="css3ui-callTo" class="css3ui-look EX-UI">'+
                                    '<h1 class="legendInside EX-UI">Ajout d\'un répertoire</h1>'+                                
                                    '<div class="sub-callTo flexColumn-noWrap EX-UI">'+
                                    '<span class="text-classic EX-UI">Vous ne pouvez utiliser que des caractères alphanumériques</span>'+
                                    '<textarea name="new'+thisData.table+'" data-focus="true" class="EX-UI"></textarea>'+
                                    '<span class="input-callTo EX-UI">'+
                                    '<input type="submit" data-action="'+thisData.switch+'"'+
                                    'data-table="'+thisData.table+'" value="valider" class="EX-UI">'+
                                    '<input type="submit" data-action="cancel" value="annuler" class="EX-UI">'+
                                    '</span>'+
                                    '</div>'+
                                    '</fieldset>';

                                    //Creer une fonction  lightBox
                                    $(this).myLightBox(myHtml);
                                    }else{
                                       $(this).flash('alert','vous ne pouvez ajouter de groupe supplémentaire.');                                                  
                                    }
                                    
                                }else{
                                  $(this).flash('alert','vous ne pouvez ajouter de groupe dans un selecteur CSS.');
                                  
                                }                                              
                                                                                      
                                break;                            
                            
                                    case 'sheet':
                                       
                                    var  myHtml = '<fieldset id="css3ui-callTo" class="css3ui-look EX-UI">'+
                                    '<h1 class="legendInside EX-UI">Ajout d\'une feuille de style</h1>'+                                
                                    '<div class="sub-callTo flexColumn-noWrap EX-UI">'+
                                    '<span class="text-classic EX-UI">Vous ne pouvez utiliser que des caractères alphanumériques</span>'+
                                    '<input type="text" name="sheet" placeholder="new Css" data-focus="true" class="EX-UI"/>'+
                                    '<span class="input-callTo EX-UI">'+
                                    '<input type="button" value="Ok" data-action="create" data-table="sheet" class="EX-UI"/>'+
                                    '<input type="button" value="annuler" data-action="cancel" class="EX-UI"/>'+
                                    '</span>'+
                                    '</div>'+
                                    '</fieldset>'; 
                            
                                    $(this).myLightBox(myHtml);

                                    break;
                            
                            
                                }
                            break;    
                        
                        
                            case 'edit':
                                
                             switch(thisData.table){
                                  
                                case 'group':
                                case 'coord':
                                case 'sheet':
                                case 'project':
                                    
                                        console.log(thisData);
                                    
                                    var myHtml = '<fieldset id="css3ui-callTo" class="css3ui-look EX-UI">'+
                                    '<h1 class="legendInside EX-UI">Edition</h1>'+
                                     '<div class="sub-callTo flexColumn-noWrap EX-UI">'+
                                    '<span class="text-classic EX-UI">Vous ne pouvez utiliser que des caractères alphanumériques</span>'+
                                    
                                    '<textarea id="editGroup" name="edit'+thisData.table+'" class="EX-UI">'+thisData.old+'</textarea>'+
                                    '<span class="input-callTo EX-UI">'+
                                    '<input type="submit" data-action="'+thisData.switch+'"'+
                                    ' data-table="'+thisData.table+'" data-id'+thisData.table+'="'+thisData.idedit+'"'+ 
                                    'data-idlinkgroup="'+thisData.idlink+'" data-old="'+thisData.old+'" '+
                                    'data-groupformat="'+thisData.groupformat+'"'+
                                    ' value="valider" class="EX-UI">'+
                                    '<input type="submit" data-action="cancel" value="annuler" class="EX-UI">'+
                                     '</span>'+
                                    '</div>'+
                                    '</fieldset>'; 
                                         
                                    //Creer une fonction  lightBox
                                    $(this).myLightBox(myHtml);
                                   
                                break;
                                }
                            break;   
                        
                        
                            case 'duplicate':
                            case 'structure':
                                
                             switch(thisData.table){
                                  
                                case 'project':
               
                                    var myHtml = '<fieldset id="css3ui-callTo" class="css3ui-look EX-UI">'+
                                    '<h1 class="legendInside EX-UI">Duplication de votre projet</h1>'+
                                     '<div class="sub-callTo flexColumn-noWrap EX-UI">'+
                                    '<span class="text-classic EX-UI">Vous ne pouvez utiliser que des caractères alphanumériques</span>'+
                                    
                                    '<textarea name="new'+thisData.table+'" class="EX-UI">'+thisData.old+'</textarea>'+
                                    '<span class="input-callTo EX-UI">'+
                                    '<input type="submit" data-action="'+thisData.switch+'"'+
                                    ' data-table="'+thisData.table+'" data-id'+thisData.table+'="'+thisData.id+'"'+ 
                                    ' value="valider" class="EX-UI">'+
                                    '<input type="submit" data-action="cancel" value="annuler" class="EX-UI">'+
                                    '</span>'+
                                    '</div>'+
                                    '</fieldset>'; 
                                         
                                    //Creer une fonction  lightBox
                                    $(this).myLightBox(myHtml);
                                break;
                                }
                            break;                        
                        }                       
                        
                    break;
                    
                    case 'cancel':   $('.css3ui-lightBox').remove(); break;
                }
                
            //fin case balise INPUT          
    
    }
       

}); 

/*Sortable*/

$(document).on('mouseover','.groupSortable ul',function(){             
    $("#panelControl").draggable({ disabled: true }); })
.on('mouseleave','.groupSortable ul',function(){ 
    $("#panelControl").draggable({ disabled: false });
})
    
.on('mouseup','.groupSortable ul',function(){
    
    $(".groupSortable ul").sortable({
        
        placeholder : "listData-fantom",        
        connectWith : '.groupSortable ul.listData-group',
        opacity : 0.5,
        disable : 'ul.listData-rule',
        cancel : 'ul.listData-rule',
        distance : 12,
        
    
   
        
        beforeStop : function(event,ui){
            
            if(ui.item.parent().parent().data('level') === 4){
                
                $(this).flash('alert',"l'arborescence ce contente de 3 niveau");
                $(this).sortable('cancel');
                
            }
            
        },
        
        receive : function(event,ui){          
            
          /*  console.log('je suis déposer dans le level '+ui.item.parent().parent().data('level'));
            console.log('id du parent deposer '+ui.item.parent().parent().data('id'));
            console.log(ui);
            console.log('ID de l item qui ce deplace '+ui.item.data('id'));
            console.log('table BDD '+ui.item.data('table'));
            console.log();*/
            
            var deposit = 'group_'+ui.item.parent().parent().data('id');
            var elDeposit = $('[data-el="'+deposit+'"]');
            
            if(ui.item.parent().parent().children('ul.listData').css('display') === 'none'){             
            elDeposit.children('a:first').trigger('click');
            }
            
         
          
        },
        
        stop : function(event,ui){
            
            
            console.log("[NEW SORTABLE]");
            console.log(ui);
            var itemData = ui.item.data();
            
            var nameDeposit = ui.item.parent().parent().data('table');
            var thisDeposit = ui.item.parent().parent();
            var depositData = thisDeposit.data();
            var posOrigin = ui.item.data('position');
                console.log(nameDeposit+'------');
                console.log(itemData);
                console.log(depositData);

                //itemData.myparent       -- id de sortie
                //depositData.idlinkgroup -- id de depot

                var dataToSend =[];
                    dataToSend.out     = itemData.myparent ;
                    
                    
                if(itemData.myparent === depositData.idlinkgroup){
                    console.log('mouvement au meme niveau');
                    //On recincrement que l'item de sortie et les items supérieurs
                    //
                    dataToSend.method = 'single';

                }else if(itemData.myparent !== depositData.idlinkgroup){

                    console.log('mouvement dans un autre niveau');
                    //On recincrement deux niveau celui de sortie et celui d'entrer
                    dataToSend.method = 'multi';
                }
                        console.log('xxxxxxxxxxxxx--- '+dataToSend.out);
                        console.log('xxxxxxxxxxxxx--- '+depositData.idlinkgroup);
                var thisEach;
                
                if(depositData.idlinkgroup===0){
                    console.log('oups');
                    console.log($.cookie('idSheet'));
                    var thisSheet = $('UL[data-id="'+$.cookie('idSheet')+'"]');
                    console.log(thisSheet);
                    thisEach = thisSheet.children('UL');
                    console.log(thisEach);
                   dataToSend.deposit = 0;
                }else{                
                    thisEach = $('LI[data-idlinkgroup="'+depositData.idlinkgroup+'"]').children('UL');
                    dataToSend.deposit = depositData.idlinkgroup;
                }
                
                
                    var allChild = thisEach.children('LI');
                    var oldPos   = itemData.position;                    
                    console.log(thisEach);
                    console.log(allChild);
                    console.log(oldPos);
                    var maxPos = allChild.length-1;
                    console.log('Postion maximal '+maxPos);
                    console.log('data de control '+itemData.idlinkgroup);
                    var thisId = itemData.idlinkgroup;
                    
                    var checkChild = function(){
                    
                    $(allChild).each(function(newPos){
                        
                        console.log('on rentre dans la boucle');
                        var eachData = $(this).data();
                        var checkId  = eachData.idlinkgroup;
                        
                        //Deux cas s'offre à nous 
                        //Deplacer à l'extremite de l'arbre on ne modifie que la position de l'item
                        //Deplacer dans l'arbre on reincremente l'item et ceux qui lui son supérieur;
                        
                        console.log(thisId+'----------------'+checkId);
                        if(thisId === checkId){
                           
                            console.log('yes');
                            console.log(newPos);                            
                            dataToSend.newPos  = newPos;
                            dataToSend.thisId  = thisId;  
                            
                                
                                if(posOrigin < newPos){
                                        console.log('thisAndLower');
                                    dataToSend.job = 'thisAndLower';
                                }else if(posOrigin > newPos){
                                        console.log('thisAndUpper');
                                    dataToSend.job = 'thisAndUpper';
                                }                                 
                        } 
                    });
                    
                    };
                   
                   checkChild();
                   console.log(dataToSend);                  
                   $(this).changePosition(dataToSend);
        }


});
    
    

}); 
  
        //Si la license est valide on execute le plugin 
        //Sinon on verifie la license         

$.fn.tagName = function() {    return this.get(0).tagName; };

$(this).loadSys();


   $('#3ui-panelControl fieldset').each(function(){    
       if($(this).css('display')!=='none'){            
            var cible = $(this).attr('id');
            
            $('[href="#'+cible+'"]').addClass('css3ui-tabIcon_active');
            $.cookie('css3ui-tabIcon','#'+cible);
       }       
   });
   $('#panelControl fieldset').each(function(){    
       if($(this).css('display')!=='none'){            
            var cible = $(this).attr('id');
               
                $.removeCookie('css3ui-tabIcon');
            $('[href="#'+cible+'"]').addClass('css3ui-tabIcon-panel_active');
            $.cookie('css3ui-tabIcon-panel','#'+cible);
       }       
   });   
   
if($.cookie('viewUI')==='true'){  
   $(this).viewDom();  
    
$('.ui-shazam').each(function(){
    if($(this).hasClass('css3ui-shazam')){ 
        $(this).removeClass('css3ui-shazam'); 
    }else{             
        $(this).addClass('css3ui-shazam');            
    }
});
} 
    
    if($.cookie('idProject')){
                console.log('autoload du projet');
                var thisData =[];
                thisData.action = 'open';
                thisData.table = 'project';
                thisData.id = $.cookie('idProject');
                thisData.project = $.cookie('project');
                console.log(thisData);
                $(this).openProject(thisData);
        }else{
        console.log('aucun cookie de load');

    }
$('.css3ui,.css3ui *').addClass('EX-UI');
$('body  > *').not('.css3ui, .css3ui *').wrapAll('<buffer></buffer>');

});





       

    
    


