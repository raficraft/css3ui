$(document).ready(function() {
/*********************DOM**********************************************/
/************************************************/

$.fn.viewDom = function() {     
        console.log('viewDom');
    
    $('body').toggleClass('activeSyd');
    if ($('body').hasClass('activeSyd')){
    

    
var incTag , cible, thisClass, buildClass,thisId,buildId = '';
var buildAll=[],  exClass= [], tabClass= [];
incTag = 0;    


var incTagOver , cibleOver,  thisClassOver, buildClassOver,thisIdOver,thisIdOver = '';
var buildAllOver=[],  exClassOver= [], tabClassOver= [];
incTagOver = 0;    
    
    
$(O.buffer+' *').on("click",function(event){    
  
    console.log('click Dom');
        cible =  $(this).tagName(); 
     
        buildCible = "<a href="+cible+" class="+"selCss"+" data-type="+"cible"+">"+cible+"</a>";
        if($(this).attr('id')){        
            thisId    = '#'+$(this).attr('id');  
            buildId = "<a href="+thisId+"  class="+"selCss"+" data-type="+"id"+">"+thisId+"</a>";
        }else{buildId = ''; thisId ='';}
        
        if($(this).attr('class')){      
         
            
            thisClass =     $(this).attr('class');
            /*Enlève les caratères blanc*/
            tabClass= thisClass.split(/\s/);       
              
                $.each(tabClass, function(key, val) {
                

                 if(val !== 'views'){    
                                thisClass = '.'+val;
                                exClass[key]='<a href="'+thisClass+'"  class="selCss" data-type="class" data-action="createRule">'+thisClass+'</a>';
                 }

                });
                
                buildClass = exClass.join('');
            
                exClass= [];  
                tabClass= [];
            
                  
        }else{buildClass='';}        
         
        
       
        buildAll[incTag] = "<p id="+"selec"+incTag+" class="+"blocRule"+">"+buildCible+buildId+buildClass+"</p>";      
             
              
        incTag++; 
                  
        if(thisId === '#global'){ 
     
        $('#selAdd > p').remove();  
        buildAll.reverse();  
       
        $.each(buildAll, function(key, val) {        
         
        $("#selAdd").append(val);      
               
        });
        incTag=0;
        buildAll =[]; 
        
        }
                
    /*  switch(cible){
            
        case 'A' : break;
        case 'input, textarea, radio, checkbox' : break;
        }
    */   
        
        
        
event.preventDefault();  
}).mouseover(function(event){ 
    
    
      event.preventDefault();     
     $('html ,html *').removeClass('views');
     
        cibleOver =  $(this).tagName(); 
        
        buildCibleOver = cibleOver;
        if($(this).attr('id')){    thisIdOver = '#'+$(this).attr('id');  }else{thisIdOver = '';}
        
        if($(this).attr('class')){ 
            thisClassOver =     $(this).attr('class'); 
            tabClassOver= thisClassOver.split(/\s/);      
              
                $.each(tabClassOver, function(key, val) { thisClassOver = '.'+val; exClassOver[key]=thisClassOver;  });
                
                buildClassOver = exClassOver.join('');
             
                /*Nettoyage des tableaux*/
                exClassOver= [];   tabClassOver= [];            
                  
        }else{buildClassOver='';}    
        
        
        /*  switch(cible){
            
        case 'A' : break;
        case 'input, textarea, radio, checkbox' : break;
        }
        */   
       
        buildAllOver[incTagOver] = buildCibleOver+thisIdOver+buildClassOver ;    
        
        incTagOver++; 
        
        if(thisIdOver === '#global'){ 
        
        buildAllOver.reverse();           
        
        var tempoOver;
        tempoOver = buildAllOver.join(' ');
        
        $(tempoOver).addClass('views');       
        
        
        incTagOver=0;
        buildAllOver =[];         
        }
  
    
}).mouseleave(function(event){ 

 $('.views').each(function(){  $(this).removeClass('views'); }); event.preventDefault(); 


});

    }else{
        $(O.buffer+" *").not('.css3ui , .css3ui *').unbind('click');     
        $(O.buffer+' *').not('.css3ui , .css3ui *').removeClass('views');
        $(O.buffer+' *').not('.css3ui , .css3ui *').unbind('mouseleave');      
        $(O.buffer+' *').not('.css3ui , .css3ui *').unbind('mouseover');   
    }

};



$(document).on('mouseover','.itemData-ruleHtml:not(.itemData-comment)',function(){
    
       $('html, html *').removeClass('views');
       var ui = $(this).children('A').data('groupname');        
       var thisRule =  $(this).splitRuleHtml(ui); 
        console.log('/****/');
        console.log(thisRule);
       $(thisRule).addClass('views');      
        console.log($(this));
        
}).on('mouseleave','.itemData-ruleHtml',function(){
    
    $('html, html *').removeClass('views');
    
});
/*

$(document).on('mouseover','.itemData-comment:not(.itemData-ruleHtml)',function(){

        console.log('on survol');
          console.log('Global');


      var askGlob = function(method,el){

            switch (method){
                
                
                case 'findAllRuleHtml':
                    
                    
                    console.log('Commande ASk : >>>> findAllRuleHtml');
                    
               
                    $('html, html *').removeClass('views');
      
              
                  
                    
                    $.each(maGlob.style,function(k,style){
                        
                        
                        if(style.idSheet === $.cookie('idSheet')){
                            
                           
                        if(style.group){
                            
                          
                            var loopGroup = function(group,type){

                                $('html, html *').removeClass('views');
                                        console.log('looGroup');
                                        console.log(group);
                                $.each(group,function(x,groupe){

                                if(groupe.myParent > 0){  
                                     if(groupe.format === 'ruleHtml'){

                                       console.log('onStock dans la global');
                                                console.log(group);
                                             
                                            var rule = groupe.groupName;
                                            var buffer = O.buffer;
                                            
                                            //passer Dans le split Rule
                                        if(rule === 'html'||
                                                rule === 'body'||
                                                rule === 'html,body '){
                                            
                                            buffer = '';
                                                }        
                                                console.log(rule);  
                                       $(buffer+' '+rule).addClass('views');
                                       
                                       console.log(groupe.groupName);
                                   }
                                } 
                                        console.log(el.data('groupname'));
                                   if(type==='first'){
                                if(groupe.groupName === el.data('groupname')) {
                                    console.log('oui oui oui');
                                    console.log('oui oui oui');
                                    console.log('oui oui oui');
                                    console.log('oui oui oui');

                                   if(groupe.child === true){
                                        console.log('on Boucle');
                                        loopGroup(groupe.group,'child');
                                       
                                   } 
                                }    
                                }else if(type==='child'){
                                    
                                     if(groupe.child === true){
                                        console.log('on Boucle');
                                        loopGroup(groupe.group,'child');
                                       
                                   } 
                                    
                                }
                                


});
                            };
                        
                        loopGroup(style.group,'first');
                        
                       
                        } 
                        }
                        
                        
                        
                    });
                    
                   
                    
                    
                break;
                
            }
            
        };
        console.log($(this).data());
        askGlob('findAllRuleHtml',$(this));
        
        
}).on('mouseleave','.itemData-comment,.itemData-media',function(){
    
    $('html, html *').removeClass('views');
    
});

*/


$(document).on('mouseover','.itemData-comment:not(.itemData-ruleHtml)[data-level="1"] > A',function(){

        console.log('on survol');
          console.log('Global');
          console.log('On lance la fonction pour le level1');
          $(this).askGlobal('findAllRuleHtml','1');

});
$(document).on('mouseover','.itemData-comment:not(.itemData-ruleHtml)[data-level="2"] > A',function(){

        console.log('on survol');
          console.log('Global');
          console.log('On lance la fonction pour le level2');
$(this).askGlobal('findAllRuleHtml','2');
});
$(document).on('mouseover','.itemData-comment:not(.itemData-ruleHtml)[data-level="3"] > A',function(){

        console.log('on survol');
          console.log('Global');
          console.log('On lance la fonction pour le level3');
$(this).askGlobal('findAllRuleHtml','3');
});


$.fn.askGlobal = function(method,param){
    
        console.log('ASKGLOBAL');
    
    switch (method){
        case 'findAllRuleHtml':
            el = $(this).data();
                console.log($(this).data());
                console.log(el);
                console.log('level de reference+ > '+el.level);
                var refLevel = el.level;
                console.log('work level '+param);
                $('html, html *').removeClass('views');
                
                   $.each(maGlob.style,function(k,style){
                        
                        
                        if(style.idSheet === $.cookie('idSheet')){                            
                           
                            if(style.group){

                                $('html, html *').removeClass('views');
                                
                                var loopGroup = function(group,type){
                                    
                                    console.log('type de boucle > '+type);

                                                                 
                                $.each(group,function(x,groupe){
                                    
                                    
                                                                     
                                    
                                
                                    if(type === 'first'){
                                         console.log(groupe.groupName+' ------ '+el.groupname);
                                                                              
                                     
                                        if(groupe.groupName === el.groupname){                                        
                                            if(groupe.child === true){
                                                console.log('on reboucle');
                                                     console.log('-------------<<<<<<<<<<<   BINGO  first>>>>>>>>>>>>>-----------');
                                   
                                               loopGroup(groupe.group,'snd'); 
                                            }
                                        }else{
                                            if(groupe.child === true){
                                                console.log('on reboucle');
                                               loopGroup(groupe.group,'first'); 
                                            }
                                            
                                        }
                                    }
                                    
                                     if(type === 'snd'){
                                        if(groupe.format==='ruleHtml' && groupe.level > refLevel){
                                            console.log(groupe.groupName);
                                             console.log('-------------<<<<<<<<<<<   BINGO ON STOCK ruleHtml '+groupe.groupName+' level '+groupe.level+' >>>>>>>>>>>>>-----------');
                                        var newRule = $(this).splitRuleHtml(groupe.groupName);
                                           
                                            $(''+newRule+'').addClass('views');
                                           
                                        }
                                                                              
                                            if(groupe.child === true){
                                               loopGroup(groupe.group,'snd'); 
                                            }
                                       
                                    }
                                
                                });
                            };
                        
                                loopGroup(style.group,'first');
                            }
                        }
                    });
                
            break;
            
              $(this).askGlob('findAllRuleHtml',$(this));
        
    }
    
};


});
