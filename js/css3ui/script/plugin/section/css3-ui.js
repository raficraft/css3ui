$(document).ready(function() {
    
      
/*************************************/
        
$(".moveJS").draggable({
    
     drag: function( event, ui ) {
         
         
         element = $(this).attr('id');
          
            $(this).css('opacity',0.4);
            
              var tabPanel = [
                    
                    'panelControl','3ui-panelControl','3ui-iconCss'
                ];
                
                maxArray=[];
                
                $.each(tabPanel,function(k,v){
                    maxArray[k] = $('#'+v).css('z-index');                    
                });
            
              //Check z-index
            var maxResult = Math.max.apply(Math, maxArray);           
            newResult = maxResult+1;
            $(this).css('z-index',newResult);
     }     
});    


$('.ui-shazam').click(function(){
    
    
      var tabPanel = [
                    
                    'panelControl','3ui-panelControl','3ui-iconCss'
                ];
                
                maxArray=[];
                
                $.each(tabPanel,function(k,v){
                    maxArray[k] = $('#'+v).css('z-index');                    
                });
            
            //Check z-index
            var maxResult = Math.max.apply(Math, maxArray);           
            newResult = maxResult+1;
            $(this).css('z-index',newResult);
    
});

$(".droppable").droppable({    
        drop:function(event,ui){ 
            if(ui.draggable.hasClass('moveJS')){     
             
            var element = ui.draggable.attr('id');
             ui.draggable.css('opacity',1);
      
                
                        
                var cssPos = [];
                
                
                cssPos = [
                     {'top' : $('#'+element+'').css('top')
                    ,'left' : $('#'+element+'').css('left') 
                    ,'right' : $('#'+element+'').css('right') 
                    ,'bottom' : $('#'+element+'').css('bottom') }];
                
                 var sW = $(window).width();
                 var sH = $(window).height();
              
                
                $.each(cssPos,function(k,pos,s){
                    
                    
                    console.log(pos);
                 
                    $.each(pos,function(k,v){
                        
                        console.log(k);
                        console.log(v);
                        
                        splitV = v.split('px');
                        
                        v= splitV[0];
                        
                        if(v<0){
                            
                            console.log('on clipse le '+element+'coté '+k+' à '+v+'px');
                             
                              
                              $('#'+element+'').css(k,'0px');
                              
                              
                              if(k==='bottom'){
                                  console.log(v);
                                  console.log('tweak pour le bottom : '+v);
                                  var elH = $('#'+element+'').css('height');
                               
                                  console.log('00000');
                                  console.log(elH);
                                  splitEl= elH.split('px');
                                
                                 elH = splitEl[0];
                                 console.log(sH);
                                
                                   console.log('hauteur de lelement'+elH);
                                     var newPos = sH-elH-36;
                                   console.log('nouvelle position '+newPos+'px');
                                   $('#'+element+'').css('top',newPos);
                                  
                              }
                              if(k==='right'){
                                  console.log(v);
                                  console.log('tweak pour le right '+v);
                                  
                                  
                                  console.log(v);
                                 
                                  var elW = $('#'+element+'').css('width');
                               
                                  console.log('00000');
                                  console.log(elW);
                                  splitEl= elW.split('px');
                                
                                 elW = splitEl[0];
                                 console.log(sW);
                                
                                 console.log('largeur de lelement'+elW);
                                     var newPos = sW-elW-10;
                                   console.log('nouvelle position '+newPos+'px');
                                   $('#'+element+'').css('left',newPos);
                              }
                              
                              if(element === 'panelControl'){
                                 
                                  console.log('tweak panelControl '+sH);
                                 
                                  ///////////
                                  
                              }
                              
                        }
                        
                        
                    });
                    
                    
                });
                
                        
                console.log(element);                  
                position = $("#"+element+"").position();   
                $.cookie('X_'+element, position.left , { expires: 70});
                $.cookie('Y_'+element, position.top  , { expires: 70});                
                console.log('on est deposer ');                 
                console.log($.cookie('X_'+element)+' ---- '+$.cookie('Y_'+element));                
                
                }           
            }
});    
    
    
    
$(".moveJS").each(function(){ 
    var element,objEl,position;
        
        element = $(this).attr('id');                
        objEl = $("#"+element+"");                
        position = objEl.position();

        

        if ($.cookie('X_'+element)) {                 
           console.log(element);
           coord_X = $.cookie('X_'+element);
           coord_Y = $.cookie('Y_'+element);
           
            console.log(coord_X);
            console.log(coord_Y);
            
            if(coord_X<0){coord_X=0;}
            if(coord_Y<0){coord_Y=0;}

           objEl.css('position', 'fixed');
           objEl.css('left', ''+coord_X+'px');
            objEl.css('top', ''+coord_Y+'px');      

         }else{ 
            if(element === '3ui-panelControl'){  
                console.log(0);
            $("#3ui-panelControl").css({'position' : 'fixed','top' : '60px','left' : '180px'});
            }
            if(element === '3ui-iconCss'){      
                console.log(1);
            $("#3ui-iconCss").css({'position' : 'fixed','top' : '60px','left' : '10px'});
            }
            if(element === 'panelControl'){         
                console.log('HE HO BON SANG');
            $("#panelControl").css({'position' : 'fixed','top' : '60px','left' : '510px'});
            }
        }
        
       

});

var anchor = window.location.hash;

$('.tabBasic').each(function(event){
               
       
               
        var current = 'null';
        var id_onglets = $(this).attr('id');
        
        if ($.cookie(id_onglets) && $(this).find('a[href="'+$.cookie(id_onglets)+'"]').length > 0){            
            current = $.cookie(id_onglets);
        }else {
            current = $(this).find('a:first').attr('href');
        }
        
        
        
        
       
        $(this).find('a[href="'+current+'"]',function(){
            
            $(this).addClass(id_onglets+'_active');
            
        });           
        $(current).siblings().hide();
        
        $(this).find('li').click(function(){
            
           
        console.log(id_onglets);
            
        
            var link = $(this).find('a').attr('href'); 
           
            if( link === current){  
                
                console.log(link+'    '+current);
                
                console.log('false false false false false false ');
                
                return false;                
            }else{
                console.log('he ho');
                
                $('.'+id_onglets+'_active').each(function(){
                    
                   $(this).removeClass('.'+id_onglets+'_active'); 
                    
                    
                });
                
                $(this).siblings().children().removeClass(id_onglets+'_active');
                $(this).children('a').addClass(id_onglets+'_active');
              
                
                $(link).show().siblings().hide();
                current = link;
                $.cookie(id_onglets, current , { expires: 70});               
            }
          
          
          
        });
});  


$(document).on("click", '[data-jq="duplicate"]', function (e,transmit) {
      
    if(transmit!==false){
       transmit = true;
    }
    
    var action = $(this).attr('class');      
    var zeGroup = $(this).parent().parent(); 
    var format = zeGroup.data('group');
      
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
            $(this).preview(true);
            }
        return false;    
        
});            

            
$('[data-jq="delRules"]').click(function(e){
    
    var thisDel = $(this).attr('href');
        console.log(thisDel);
    
    switch(thisDel){
        
        case 'allBorder' :
            console.log('on soccupe de vide et de del les bordure');
            
            var rule     =['border','border-top','border-bottom','border-right','border-left'];
            var ruleAttr =['','select','color','opacity'];
            
                console.log(rule);
              
            
            $.each(rule,function(k,rule){
            $.each(ruleAttr,function(k,attr){
                
                var tag = 'input';
                var sep = '_';
                        
                 if(attr==='select'){tag = 'select';}
                 if(attr===''){sep = '';}
                        console.log(''+tag+'[name="'+rule+sep+attr+'"]');
                 var input = $(''+tag+'[name="'+rule+sep+attr+'"]');
                
                        console.log(input);
                 
                if(tag==='select'){
                    input.val('');
                }else{
                    
                    if(attr === 'color'){
                        input.val('#000000');
                    }else{
                        input.val('');
                    }
                }
                
                //On force l'envoie de la valeur à la preview
               
                dataPrev.ruleHtml = $.cookie('ruleHtml');
                dataPrev.name = rule;
                dataPrev.format = thisDel;
                dataPrev.preview = '';
                dataPrev.ajax = '';
                $(this).ajaxPrev();
                
        });
    });
            
            
            
        
        break;
        
        case 'text-shadow' : 
        
            console.log('on soccupe de vide et de del les text-shadow');
            
            $('[data-group="text-shadow"]').each(function(k,box){
                    if(k>0){
                        $(this).remove();
                    }                
            });
            
            $('#text-shadow_x_0').val('');
            $('#text-shadow_y_0').val('');
            $('#text-shadow_blur_0').val('');
            $('#text-shadow_color_0').val('#000000');
            $('#text-shadow_opacity_0').val('');             
            
         $(this).turnOffPad('text-shadow_0');
         
                dataPrev.ruleHtml = $.cookie('ruleHtml');
                dataPrev.name = thisDel;
                dataPrev.format = thisDel;
                dataPrev.preview = '';
                dataPrev.ajax = '';
                $(this).ajaxPrev();
        
        break;
        
        case 'box-shadow' :
            
            
             console.log('on soccupe de vide et de del les text-shadow');
            
            $('[data-group="box-shadow"]').each(function(k,box){
                    if(k>0){
                        $(this).remove();
                    }                
            });
            
            $('#box-shadow_x_0').val('');
            $('#box-shadow_y_0').val('');
            $('#box-shadow_blur_0').val('');
            $('#box-shadow_spread_0').val('');
            $('#box-shadow_color_0').val('#000000');
            $('#box-shadow_opacity_0').val('');
            $('#box-shadow_select_0').val('');
            
         $(this).turnOffPad('box-shadow_0');
         
                          
                
                dataPrev.ruleHtml = $.cookie('ruleHtml');
                dataPrev.name = thisDel;
                dataPrev.format = thisDel;
                dataPrev.preview = '';
                dataPrev.ajax = '';
                $(this).ajaxPrev();
        
        
        break;
        
        
        case  'border-radius':
            
             console.log('on soccupe de vide et de del les border-radius');
            
            $('#border-radius').val('');
            $('#border-top-left-radius_y').val('');
            $('#border-top-left-radius_x').val('');
            
            $('#border-top-right-radius_y').val('');
            $('#border-top-right-radius_x').val('');
            
            
            $('#border-bottom-left-radius_y').val('');
            $('#border-bottom-left-radius_x').val('');
            
            $('#border-bottom-right-radius_y').val('');
            $('#border-bottom-right-radius_x').val('');
            
            
            //rgba(255,70,60,1);
            
                var tabBorder = [
                    'border-top-left-radius',
                    'border-top-right-radius',
                    'border-bottom-left-radius',
                    'border-bottom-right-radius'
                ];
                
                $.each(tabBorder,function(k,border){
                    
                     $(this).turnOffPad(border);
                     
                
                    //ecrire une fonction ifruleinGlob;
                    
                    
                dataPrev.ruleHtml = $.cookie('ruleHtml');
                dataPrev.name = border;
                dataPrev.format = 'customRadius';
                dataPrev.preview = '';
                dataPrev.ajax = '';
                $(this).ajaxPrev();
                    
                    
                });
                
                dataPrev.ruleHtml = $.cookie('ruleHtml');
                dataPrev.name = thisDel;
                dataPrev.format = 'fourDigit';
                dataPrev.preview = '';
                dataPrev.ajax = '';
                $(this).ajaxPrev();
            
        
        break;
        
        case 'multi-back' :
            
            
            console.log('on soccupe de vide et de del les multiBack');
            
            $('[data-group="views-background"] [data-group="multi-background"]').remove();
            $('.clone-tabMulti').each(function(k,multi){
                
                if(k===0){
                    $(this).addClass('hidden');
                    
                }else{
                    $(this).remove();
                }
                
            });
            
            dataPrev.ruleHtml = $.cookie('ruleHtml');
            dataPrev.name = 'background-image';
            dataPrev.format = 'multiBack';
            dataPrev.preview = '';
            dataPrev.ajax = '';
            $(this).ajaxPrev();
        break;
        
        case 'color':
        case 'background-color':
        
                
               console.log('on soccupe de vide et de del les couler de la police'); 
               
               $('input[name="'+thisDel+'"]').val('#000000');
               $('input[name="'+thisDel+'_opacity'+'"]').val('1');
               
               
            dataPrev.ruleHtml = $.cookie('ruleHtml');
            dataPrev.name = thisDel;
            dataPrev.format = 'color';
            dataPrev.preview = '';
            dataPrev.ajax = '';
            $(this).ajaxPrev();
       break;
       
       
        case 'border':
        case 'border-top':
        case 'border-left':
        case 'border-bottom':
        case 'border-right':
        case 'column-rule':
            
                console.log('del tttttoototototot');
                
                
                   console.log('on soccupe de vide et de del les bordure');
            
            var rule   =  thisDel;
                console.log(rule);
            var ruleAttr =['','select','color','opacity'];
            
                console.log(rule);
              
            
          
            $.each(ruleAttr,function(k,attr){
                
                var tag = 'input';
                var sep = '_';
                        
                 if(attr==='select'){tag = 'select';}
                 if(attr===''){sep = '';}
                        console.log(''+tag+'[name="'+rule+sep+attr+'"]');
                 var input = $(''+tag+'[name="'+rule+sep+attr+'"]');
                
                        console.log(input);
                 
                if(tag==='select'){
                    input.val('');
                }else{
                    
                    if(attr === 'color'){
                        input.val('#000000');
                    }else{
                        input.val('');
                    }
                }
                
                //On force l'envoie de la valeur à la preview
               
                dataPrev.ruleHtml = $.cookie('ruleHtml');
                dataPrev.name = rule;
                dataPrev.format = thisDel;
                dataPrev.preview = '';
                dataPrev.ajax = '';
                $(this).ajaxPrev();
                
        });
     
                
                
                
                
        break 
       
    }
    
    return false;
});


//////
$('[data-jq="add-multi"]').click(function(e,thisPrev){
    
    if(thisPrev!==false){
        
        thisPrev = true;
        
    }
    
    var firstLI,linkClone;
    var transmit=[];
     
        transmit.zeCible = $(this).attr('href');    
        firstLI = $('#css3ui-tab-background').children('li:first-child');
        
        
    
    if(firstLI.hasClass('hidden')){
        
    linkClone = firstLI.clone(true).removeClass('model-li').removeClass('hidden').addClass('clone-tabMulti');    
    
    firstLI.remove();
    
    }else{  linkClone = firstLI.clone(true);    }
    
    
    
    
    
    /*****/
    
        transmit.lgtLI = $('#css3ui-tab-background').children('li').length;    
        $('#css3ui-tab-background').append(linkClone);    
        $('.css3ui-tab-background_active').each(function(){
            
            $(this).removeClass('css3ui-tab-background_active');
            
        });
        
        
      
    
$(this).incLinkMultiBack(transmit);
    
    
    /*****/
    
    var zeGroup;    
    
        transmit.multiLgt = $('[data-group="views-background"] [data-group="multi-background"]').length;        
        zeGroup = $('.shazam-background [data-multiGroup="'+transmit.zeCible+'"]').parent();
        var thisClone = zeGroup.clone(true);
        
        //????
        thisClone.find('#gradient-position_0').val('1%');
        thisClone.find('#gradient-position_1').val('100%');
        thisClone.find('#gradient_opacity_0').val('1');
        thisClone.find('#gradient_opacity_1').val('1');
        
        
        console.log(thisClone);
          
        
      
        
         $('[data-group="views-background"]').append(thisClone); 
 
  $(this).incGroupMultiBack(transmit);
  
  
    $('[href="#multiBack_'+transmit.lgtLI+'"]').trigger('click');
    $('#multiBack_'+transmit.lgtLI+'').show().siblings().hide(); 
  
  //on force le passage à la preview

 if(transmit.zeCible==='gradient'&&thisPrev === true){
   dataPrev.name = 'background-image';
   dataPrev.format = 'multiBack';
   $(this).preview(true);
   }
 
    return false;

});

/************************************************************/
/************************************************************/

$('.backSortable').sortable({
        
        
        placeholder : "multiBack-fantom",
        distance : 12,
        update : function(event,ui){
            
        var thisEl = ui.item.children('a');
        var thisMove = thisEl.attr('href');
            console.log(thisMove);
   
        var zeLI           = $('#css3ui-tab-background .clone-tabMulti');
       
        var zeChange = [];
           
            var y = 0;
            zeLI.each(function(inc,v){
                
                var zeText = $(this).text();
                var stock = zeText.split(' ');
                var zeCible = stock[0];       
              
                //on renomme les liens
              
                    var zeLink = $(this).children('a');
                    oldId = zeLink.attr('href').substring(1);                     
                    zeLink.attr({'href':'#multiBack_'+inc+''}).text(zeCible+' '+inc);
                    
                    var newId = zeLink.attr('href').substring(1);
                     
                     console.log(oldId+'------------'+newId);
                     
                    if(oldId !== newId){
                      console.log('on stock');
                  
                      zeChange[y] = [];
                      
                      zeChange[y].oldId = oldId;
                      zeChange[y].newId = newId;
                      
                         
                    
                      y++;
                    }             
             
           
            }); 
            
             console.log(zeChange);
             
           
           
           
            $.each(zeChange,function(k,v){
                 
                 console.log(k);
                 console.log(v);
                 
                 var oldId = v.oldId;
                 var newId = v.newId;
               // D'abord changer les balises INC    
                console.log('on recincrement correctement les inc');
                console.log('le bloc '+oldId+' doit devenir les inc '+newId);                         
                console.log($('#'+oldId));
                $('#'+oldId).attr('data-inc',$(this).lastCharac(newId));
            });  
            
            console.log($('[data-group="views-background"] [data-group="multi-background"]').length);
            $('[data-group="views-background"] [data-group="multi-background"]').each(function(k,v){
                
                
                var newInc = $(this).data('inc');
                $(this).attr('id','multiBack_'+newInc+'');
                console.log(newInc);
                
                
                var linkParent = ($('[href="#multiBack_'+newInc+'"]').text());
                console.log(linkParent);

                $(this).find('.manda-inc INPUT[TYPE="text"],.manda-inc SELECT').each(function(){   

                       var tabName = $(this).attr('name').split('_'); 
                       if(tabName.length === 2){
                            var thisName = tabName[0]+'_'+newInc; 
                       }else if(tabName.length === 3){
                            var thisName = tabName[0]+'_'+tabName[1]+'_'+newInc; 
                       }
                       $(this).attr({'name':thisName,'id':thisName});

                });

                $(this).find('[data-uijq="padLock"]').each(function(){             


                       var tabName = $(this).attr('name').split('_');
                       var thisName = tabName[0];
                       $(this).parents('.switch-label').attr('for',thisName+'_'+newInc);               
                       $(this).attr({'id':thisName+'_'+newInc});  

                });


                $(this).find('.background-option LABEL:not(.label-externe,label.multi-child-cell)').each(function(){

                   var tabFor = $(this).attr('for').split('_');
                   var newFor = tabFor[0]+'_'+newInc;
                   $(this).attr('for',newFor);
                });

                if(linkParent.match(/file/)){
                    
                    console.log('on s occupe des fichiers');
                    console.log($(this).find('.fileManager'));                   
                    $(this).find('.fileManager').attr('id','fileManager_'+newInc+'');
                    $(this).find('.fileManager').attr('name','fileManager_'+newInc+'');
                    $(this).find('.prevImg').attr('name','fileManager_'+newInc+'');
                    $(this).find('.prevImg').attr('id','fileManager_'+newInc+'');
                    $(this).find('INPUT[type="file"]').attr('name','SubFile_'+newInc+'');
                    $(this).find('INPUT[type="file"]').attr('id','SubFile_'+newInc+'');
                    $(this).find('INPUT[type="hidden"]').attr('id','checkImg_'+newInc+'');
                    $(this).find('INPUT[type="hidden"]').attr('name','checkImg_'+newInc+'');
                    $(this).find('progress').attr('id','progress_'+newInc+'');
                  
               
                }
                
            });
          
    //on force le passage à la preview
    dataPrev.name = 'background-image';
    dataPrev.format = 'multiBack';
    $(this).preview(true);         
     //Verifier la temporisation si une latence entre l'insertion et la question ce fait sentir
     moveMultiBack = true;  
    }
       
}); 


//Element permettant la creation de la variable ruleHTML
$(document).on('change','#css3ui-search',function(){
        console.log('changement dans le champ');
        console.log('changement dans le champ');
        console.log('changement dans le champ');
        console.log('changement dans le champ');
        console.log('changement dans le champ');
        console.log('changement dans le champ');
    var thisSearch = $(this).val();
    $(this).searchData('search',thisSearch);    
});





$(document).on('change','#newRule',function(){$(this).createRule('newRule'); });
$(document).on("click", '.selCss', function(e){e.preventDefault(); $(this).toggleClass('light'); $(this).createRule('selDom'); return false;  }); 


///Click sur la lightBox.
/*
$(document).on('click','#css3ui-lightBox',function(){  $(this).remove();  });
*/
$(document).on('click',function(e){  $('.toolsIcon').remove();   });

$(document).on('contextmenu', '.css3ui *[data-rightClick]:not(input)', function(e){
        e.preventDefault();
           
            //on vide le tableau de la preview;
           
      
          
            var bdd = $(this).attr('data-table'), thisData = ($(this).data()), limit = 200 ;
         
            //On recupère la position de la souris            
        
            var myHtml = '';
            var toolsTab = [];
            
          
            
            
//trouver le moyen de passer tous les attributs dans le tableau addTab

////////////////////////////////////////////////////////////////////////////////

 myHtml += '<ul class="toolsIcon item flexColumn-noWrap">'; 

    switch(bdd){
        case 'project':
                console.log(thisData);
        addTab = [
            {'action':'delThis','text':'delete','switch':'delThis','table':thisData.table,'idProj':thisData.id,delproject:thisData.projectname} ,                       
            {'action':'callTo','text':'rename','switch':'edit','old':thisData.projectname,'table':thisData.table,'idedit':thisData.id},
            {'action':'callTo','text':'duplicate all',switch:'duplicate','table':thisData.table,'id':thisData.id,'old':thisData.projectname},
            {'action':'callTo','text':'duplicate structure',switch:'structure','table':thisData.table,'id':thisData.id,'old':thisData.projectname},
        
        ];

        toolsTab = $.merge(toolsTab,addTab);


        break;
        case 'ui-project':

        addTab = [

            {'action':'callTo','text':'new-project','switch':'create','table':'project'}

        ];

        toolsTab = $.merge(toolsTab,addTab);


        break;

        case 'sheet':
 
        addTab = [
            {'action':'delThis','text':'delete'         ,'switch':'delThis','table':thisData.table,'idsheet':thisData.id} ,
            {'action':'callTo'    ,'text':'rename'      ,'switch':'edit', 'old':thisData.sheetname,  'table':thisData.table,'idedit':thisData.id} ,
          /*{'action':'duplicate' ,'text':'duplicate'   ,'table':thisData.table,'id':thisData.id},
            {'action':'duplicatTo','text':'duplicate to','table':thisData.table,'id':thisData.id},*/
            {'action':'disable'   ,'text':'enable'      ,'table':thisData.table,'idstyle':thisData.id}

        ];

        toolsTab = $.merge(toolsTab,addTab);
        dataPrev = [];
        dataListSelect = [];
        break;

        case 'ui-sheet':

        addTab = [

              {'action':'callTo','text':'new-style','switch':'create','table':'sheet'}

        ];

        toolsTab = $.merge(toolsTab,addTab);                     

        break;

        case 'group':
                console.log(thisData);
                console.log(thisData.groupname);
        addTab = [
            {'action':'delThis','text':'delete','switch':'delThis','table':thisData.table,
             'idlinkgroup':thisData.idlinkgroup,'child':thisData.child,'myparent':thisData.myparent} ,
         
            {'action':'callTo' ,'text':'rename','switch':'edit'   ,'table':thisData.table,
            'idedit':thisData.idgroup,'idlink':thisData.idlinkgroup,old:thisData.groupname,
            'groupformat':thisData.groupformat} ,
            {'action':'disable','text':'enable','table':thisData.table,'idlinkgroup':thisData.idlinkgroup,'state':thisData.state}
        ];

        toolsTab = $.merge(toolsTab,addTab);

        break;

        case 'rule':
           

        addTab = [
            {'action':'delThis','text':'delete','switch':'delThis','table':thisData.table,'idlinkrule':thisData.idlinkrule} ,
            {'action':'disable','text':'enable','table':thisData.table,'idlinkrule':thisData.idlinkrule},
            {'action':'important','text':'!important','table':thisData.table,'idlinkrule':thisData.idlinkrule}
        ];

        toolsTab = $.merge(toolsTab,addTab); 
        break;
        
        case 'multiBack':
            
            var thisInc = $(this).lastCharac($(this).attr('href'));
            var thisType = '';
             
            if($(this).text().match(/file/)){  thisType = 'file'; }else{ thisType = 'gradient';}
           
        addTab = [
            {'action':'delThis','text':'delete','table':thisData.table,'jq':'multiBack','multi':$(this).attr('href'),'type':thisType} ,
            {'action':'before','text':'duplicate before','table':thisData.table,'jq':'multiBack','multi':$(this).attr('href'),originText:$(this).text(),'inc':thisInc} ,
            {'action':'after','text':'duplicate after','table':thisData.table,'jq':'multiBack','multi':$(this).attr('href'),originText:$(this).text(),'inc':thisInc} ,
            {'action':'disable','text':'enable','table':thisData.table,'jq':'multiBack','multi':$(this).attr('href')}
        ];

        toolsTab = $.merge(toolsTab,addTab); 

        break;

    }
                
                //On fabrique les elements de liste.
                var lgtTab = toolsTab.length;
                
                    for(i=0;i<lgtTab;i++){
                    myHtml += '<li class="css3ui-icon-tools flexRow-noWrap"><a href="#'+toolsTab[i].action+'"';
                    
                    $.each(toolsTab[i], function(k,v) {  myHtml += 'data-'+k+'="'+v+'" '; });
                    
                      myHtml += '>'+toolsTab[i].text+'</a></li>'; 
                    } 
     
            myHtml += '</ul>';
            
         
            $('.toolsIcon').remove();
            $(myHtml).appendTo('body');
             // par défaut le menu s'affiche à gauche de la souris sauf si l'axe X renvoie une valeur 
                        // inferieur à la limit
                        
                        
              console.log('limit : '+limit+ ' axeX :'+ e.pageX+' axeY :' +e.pageY);
              console.log('limit : '+limit+ ' axeX :'+ $(window).width()+' axeY :' +$(window).height());
              console.log($(window).width()-limit+'     '+e.pageX);
            
                
              
               console.log('on affiche à droite');
                
                 $('.toolsIcon').css({
                  'position' : 'absolute',
                  'top' : e.pageY,
                  'left' : e.pageX
              });
              
                
             if(($(window).width()-limit)<e.pageX){
                 console.log('on affiche à gauche');   
                
                  $('.toolsIcon').css({
                  'position' : 'absolute',
                  'top' : e.pageY,
                  'left' : e.pageX-(limit/1.4)
              });
               
            }
            
             
            
        return false;
        
}
).on('click', '.toolsIcon', function(e){$(this).remove();});




$(document).on('click','#css3ui-lightBox', function(e){ 
     
//for chrome    
console.log(e);
var thisSource = e.target;  
        console.log(thisSource);

if(thisSource.id === 'css3ui-lightBox'){console.log('close'); $(this).closeToCall();}
//for firefox

});



$(document).on('click','.thisProject', function(e){ 
    
    
    $('#tabProject .tabProject-active').each(function(){
       
        $(this).removeClass('tabProject-active');
        
    });
    
        $(this).addClass('tabProject-active');


});





//Quand on clique sur l'element de la list on clique sur le listRule correspondant
/*
$(document).on('click','li.itemData', function(){
    
        console.log($(this).data());
        
        var thisId = $(this).data('idlinkgroup');
        thisEl = $('[data-el="clickGroup_'+thisId+'"]');
        console.log(thisEl);
        if(thisEl.hasClass('illuminate')===false){
        thisEl.trigger('click');
        }
});
   */ 
    
$(document).on('click','.css3ui *[data-css3ui]', function(e,close){ 
    
     if(!close){close = false;}
    console.log('default');
    
  
  
    

var thisData = $(this).constructDataListSheet($(this));
                
                
 
    switch(thisData.thisAction){
        case 'openGroup':
            
            
                console.log('CLICKOPENGROUPCLICKOPENGROUPCLICKOPENGROUPCLICKOPENGROUPCLICKOPENGROUP');
      
           
                console.log('OpenGroup');              
              
                console.log(thisData);
                
                //On push dans le tableau des group ouverts
                //A modifier allume que la flèche
                //work      
                console.log('--------------------------------------------------------');
                console.log(tabListOpen);
                    if($.inArray(thisData.idlinkgroup,tabListOpen) === -1){          
                    console.log('ouverture du group');
                        tabListOpen.push(thisData.idlinkgroup); 
                        //on ouvre le groupe
                        $.cookie('lastOpen',thisData.idlinkgroup); 
                        $(this).openORCloseGroup(thisData);
                        console.log('reclick après ouverture d un group');
                        thisData.myBroth.trigger('click');
                         
                      

                    }else{ 
                        console.log('la donnée est dans le tableau reclique');
                        if(close===true){
                            thisData.myBroth.trigger('click',true);
                        }else  if(close===false){
                            thisData.myBroth.trigger('click',false);
                        }
                        $(this).openORCloseGroup(thisData);
                       
                    }   
            
        break;           
            
            
            case 'listRule': 
                
               
             
                console.log('listRule');               
                console.log(thisData);
                
                //Eclairage l'element listRule;
                //Un seul element listRule allumer à la fois

                console.log(thisData);
                
                //Eclairage l'element listRule;
                //Un seul element listRule allumer à la fois
                
                $('[data-css3ui="listRule"].illuminate').each(function(){
                    $(this).toggleClass('illuminate');
                });
                
             
                
                if(close===true){                 
                    
                    if(thisData.itsMe.hasClass('illuminate')){
                       thisData.itsMe.toggleClass('illuminate'); 
                    }                    
                    console.log('ordre reçue d éteindre la listRule');
                }else{
                    
                       thisData.itsMe.toggleClass('illuminate');
                    
                }
                
               
               $(this).updateListSelect(thisData);               
               $(this).defineWorkContext(thisData);
                if(thisData.groupformat==='ruleHtml'){
                $(this).createRule('listRule',thisData); 
                } if(thisData.groupformat==='comment'){
                      $(this).flashUI('rule','alert','Your Select a directory'); 
                      $('#newRule').empty();
                      $(this).vidangeUI();
                }else if(thisData.groupformat==='media'){
                      $(this).flashUI('rule','alert','Your Select a MediaQueries'); 
                      $('#newRule').empty();
                      $(this).vidangeUI();
                }
            break;                 
    
             
    }         
        
            return false;

});


$.fn.justOpenGroup = function(thisData){
    
        console.log(thisData);
      var thisSwitch = thisData.itsMe.siblings('ul');
         console.log(thisSwitch);
         
         
            if(thisData.itsMe.hasClass('illuminate')){
                
                console.log('fermeture du group'+thisData.idlinkgroup);
                
                thisData.itsMe.toggleClass('illuminate').toggleClass('hasGroupOpen').html('&#x25B6;');                
                thisSwitch.removeClass('flexColumn-wrap');
                thisSwitch.addClass('hidden');
                
                //Si l'element possède une UL de group on la ferme
                //On exclue la valeur du tableau listOpen
                //Ainsi que tous les enfants inclus qui sont ouverts  

            
                             
            }else{
                
                //le tableau list open as été incremente dans la fonction du click
                console.log('Ouverture du group'+thisData.idlinkgroup);
                thisData.itsMe.toggleClass('illuminate').toggleClass('hasGroupOpen').html('&#x25Bc;');
                //Si lelement possède une UL de group on l'ouvre
                //
                //
                //Ouverture du group                        
                    thisSwitch.addClass('flexColumn-wrap');
                    thisSwitch.removeClass('hidden');                            
                     
                           
            }
    
    
    
    
    
};
$.fn.openORCloseGroup = function(thisData){
    
    
         var thisSwitch = thisData.itsMe.siblings('ul');
         console.log(thisSwitch);
         
         
            if(thisData.itsMe.hasClass('illuminate')){
                
                console.log('fermeture du group');
                
                thisData.itsMe.toggleClass('illuminate').toggleClass('hasGroupOpen').html('&#x25B6;');                
                thisSwitch.removeClass('flexColumn-wrap');
                thisSwitch.addClass('hidden');
                
                //Si l'element possède une UL de group on la ferme
                //On exclue la valeur du tableau listOpen
                //Ainsi que tous les enfants inclus qui sont ouverts  

                var closeMeANDChild = function(elData){
                    
                    console.log('CloseMeANDChild');
                    console.log(elData);
                    
                     $.each(tabListOpen,function(key,val){                                        
                        if (val===elData.idlinkgroup) {                                        
                            //On supprime l'élément parent 
                            $(this).excludeValArray(val); 
                            
                            if(elData.child===true){
                                console.log('********** j ai des enfants');
                          
                                //Erreur boucler sur tous les child de meme hauteur
                             console.log('************ LES ENFANTS ********');   
                              var zeFirstChild = zeChildren = elData.itsMe.siblings('ul').children('li');
                            console.log(zeFirstChild);       
                            
                            $.each(zeFirstChild,function(){
                                
                                var arrow = $(this).children('a:first');
                                console.log(arrow);
                                if(arrow.hasClass('illuminate')){
                                console.log(arrow);
                                
                              /*newData = arrow.data();
                                newData.myBroth     = $('[data-el="clickArrow_'+arrow.idlinkgroup+'"]'); 
                                newData.action      = 'openGroup';
                                newData.itsMe       = arrow;

                                if(newData.myparent === 0){                  
                                newData.groupParent = $('UL#'+$.cookie('sheet')+'');
                                }else{
                                newData.groupParent = $('[data-idlinkgroup="'+arrow.myparent+'"]');  
                                }
                              */
                             
                                console.log('on reboucle dans la fermeture-----------------------------');  
                                arrow.trigger('click',false);
                                
                                }else{
                                    console.log('nothing');
                                }
                                
                            });
                                
                            }else{
                                
                                console.log('pas denfants');
                                  $.each(tabListOpen,function(key,val){
                                        if (val===elData.idlinkgroup) {
                                          $(this).excludeValArray(val);                                         
                                        }
                                  });
                                
                                
                            }
                        }
                     });
                     
                     
                    
                            //une fois le group selectionner et ses enfants fermer 
                            //On verifie la longueur du tableau
                            //Et on repointe sur la dernière entrer du tableau
                            
                            var lightLastCursor  = function(){
                                
                          
                                
                                var idCursor = $(this).findLastElArray(tabListOpen); 
                                
                                if(tabListOpen.length>0){ 
                                    
                                   
                                    
                                    console.log(tabListOpen.length);                                
                                    console.log(idCursor);
                                    var newCursor = $('[data-el="clickGroup_'+idCursor+'"]');
                                    console.log(newCursor);
                                    console.log('on reclick après la fermeture.');
                                    /* newCursor.toggleClass('illuminate');*/
                                    newCursor.trigger('click',false);                                    
                                }else{
                                    console.log('Tableau vide');
                                    $(this).loadDefaultGlobal('listSelect');
            
                                        zeChildren = $('UL#'+$.cookie('sheet')+'').children('ul').children(); 
                                        console.log(zeChildren.length);
                                        var position = zeChildren.length;            
                                        console.log('nombre d enfants '+position);
                                        dataListSelect.position = position;            
                                        console.log(dataListSelect);  

                                   dataListSelect.position = position;
                                }
                              
                            };
                            lightLastCursor();

                            };           
                
                                closeMeANDChild(thisData);
                                console.log('fin de close');
                                console.log(tabListOpen);  
           
                      
           
                
                             
            }else{
                
                //le tableau list open as été incremente dans la fonction du click
                console.log('Ouverture du group');
                thisData.itsMe.toggleClass('illuminate').toggleClass('hasGroupOpen').html('&#x25Bc;');
                //Si lelement possède une UL de group on l'ouvre
                //
                //
                //Ouverture du group  
                    console.log('Ouverture du group');                       
                    thisSwitch.addClass('flexColumn-wrap');
                    thisSwitch.removeClass('hidden');                            
                     
                           
            }
                        
            
                    
                       
    
    
};


$(document).on('click','A[href="#css3uiWarning"]',function(){
    
        console.log('click sur warning');
        var thisData = [];
        console.log(tabListOpen);
        thisData.action = 'open';
       
        //On recupere le dernier element du tableau         
         
          $(this).openProject(thisData);
        
    
});

///////////////Click dans les biblio


$(document).on("click", '.aColor', function(){
        console.log('click');
    
    var thisParent= $(this).parents('.css3ui-biblio').attr('id');
    var myCss = $(this).attr('title');
    
        console.log(thisParent);
        console.log(myCss);   
         
  if($.cookie('ruleHtml')){ 
      dataPrev.ruleHtml = $.cookie('ruleHtml');
    if(thisParent==='biblio-multiBack'){;dataPrev.name = 'background-image';dataPrev.preview = myCss; dataPrev.ajax=myCss;dataPrev.format = 'gradient';}
    if(thisParent==='biblio-background'){dataPrev.name = 'background';dataPrev.preview = myCss; dataPrev.ajax=myCss;dataPrev.format = 'color';}
    if(thisParent==='biblio-color'){dataPrev.name = 'color';dataPrev.preview = myCss; dataPrev.ajax=myCss;dataPrev.format = 'color';}
  
  
    /*on envoie Ã  la preview*/

            console.log(dataPrev.name);
            console.log(dataPrev.ruleHtml);
            console.log(dataPrev.name);
            console.log(dataPrev.preview);
   
    $(dataPrev.ruleHtml).not('.css3ui , .css3ui *').css(dataPrev.name,dataPrev.preview);
    
    
       //On force l'envoie de la valeur à la preview
    
                $(this).ajaxPrev();
            
    /*On modifie le tableau*/
    
    /*on passe le tableau modifier Ã  la vue*/
    }else{alert('veuillez selec une cible');} 
    
    return false;
    
});




////////////Gestion du scroll de listRule



    
    //La fonction s'active sur l'évènement keydown dans la zone de texte
     $(document).on('keyup','#newRule',function(e){
      
      $(this).resizeTextarea('19','#'+$(this).attr('id'));
      

    });


///////////////RACCOURCIES CLAVIER/////////////////////


var map = {18: false, 83: false};
$(document).keydown(function(e) {
    if (e.keyCode in map) {  map[e.keyCode] = true;  
        if (map[18] && map[83]) {  
      
         
        $(this).viewDom();
         $('.CMA-displayDom').removeClass('CMA-displayDom');
        
        //GESTION DE L AFFICHAGE de L INTERFACE
    
    $('.css3ui').each(function(){
        
                
                    if($(this).hasClass('css3ui-shazam')){
                    $(this).removeClass('css3ui-shazam');
                  
                       $.cookie('viewUI','true');
                    
                    }else{
                        $(this).addClass('css3ui-shazam');
                       $.cookie('viewUI','false');
                    
                    }
        
    });
         
                console.log($.cookie('viewUI'));
         
        } 

    }


}).keyup(function(e) { if (e.keyCode in map) {  
         
        map[e.keyCode] = false;
    
        
   

}});




});


