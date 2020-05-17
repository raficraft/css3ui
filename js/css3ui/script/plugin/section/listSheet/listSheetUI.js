
$(document).ready(function () {

    $.fn.openGroup = function (e,close) {
        e.preventDefault();
    if(!close){close = false;}
    console.log('default');
        console.log($(this));
    var thisData = $(this).constructDataListSheet($(this));
        console.log(thisData);
    
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
                            console.error('close true');
                            thisData.myBroth.trigger('click',true);
                        }else  if(close===false){
                            thisData.myBroth.trigger('click',false);
                        }
                        $(this).openORCloseGroup(thisData);
                       
                    }   
            
                
      
    
    
    };
    
    
    $.fn.listRule = function (e,close) {
        
        e.preventDefault();
        
    if(!close){close = false;}
    console.log('default');
    var thisData = $(this).constructDataListSheet($(this));
    
    
      
             
                console.log('listRule');               
                console.log(thisData);
                
                //Eclairage l'element listRule;
                //Un seul element listRule allumer à la fois

                console.log(thisData);
                
                //Eclairage l'element listRule;
                //Un seul element listRule allumer à la fois
                
                $('[data-actionUI="listRule"].illuminate').each(function(){
                    $(this).toggleClass('illuminate');
                });
                
             
                
                if(close===true){                 
                    console.error('close true');
                    if(thisData.itsMe.hasClass('illuminate')){
                       thisData.itsMe.toggleClass('illuminate'); 
                    }                    
                    console.log('ordre reçue d éteindre la listRule');
                }else{
                    
                       thisData.itsMe.toggleClass('illuminate');
                    
                }
                //console.error('fixe défixe');
                
                
           
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
                
      
    
    
    };
    
    
});