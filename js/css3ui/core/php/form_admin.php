<?php
   
Class form_admin{ 
   
    
    /*Chaque initialisation cr�e les elements de liste ordonner pour la structure html.
     * 
     * **/
    
    function fieldset($class,$legend,$inc=null){   
        
        $r =  '<fieldset  id="'.$inc.'"';
            
            if($class != null){ $r .= ' class="'.$class.'"';}
            $r .= '> ';
                 if($legend != null){ 
             $r .= '<h1 class="legendInside">'.ucfirst($legend).'</h1>';
                 }
        
        return $r;
        }
        
    function endfield(){
        $r =   '</fieldset>';
    return $r;
    }    
       


 function input_flex( $options = array() ){ 
    /** Valeur attendue **/
      
        $class= '';
        $labelClass= '';
        $label= '';
        $capsule= '';
        
        
        $attr= ''; /** attribut de l'input */
        $jq= ''; /** attribut data de l'input **/
        
        $thisDuplicate = 0;
        $duplicate = false;
        $value ='';
        
        $r ='';
        
    /** Traitement des données    **/ 
        
        foreach($options['jquery'] as $k=>$v){  
            $jq .= 'data-'.$k.'="'.$v.'"';             
            if($k==='duplicate'){
             switch ($v) {
              
                    case 'true':
                    $thisDuplicate = 1;
                    $duplicate = true;
                        break;
                    case 'invert':                                           
                    $thisDuplicate = 2;
                    $duplicate = true;
                        break;
                }
            }            
        }         
      if(isset($options['html'])){    
        foreach($options['html'] as $k=>$v){             
             if($k == 'class'){  $class = 'class="'.$v.'"'; } 
             if($k == 'labelClass'){  $labelClass = 'class="'.$v.'"'; } 
             if($k == 'label'){  $label = $v; }            
             if($k == 'capsule'){  $capsule = $v; }    
        }
        } 
if(isset($options['input'])){        
        foreach($options['input'] as $k=>$v):{ 
            if($k !='type' && $thisDuplicate == 0){
                
                $attr .= ''.$k.'="'.$v.'"'; 
                
            }
            else  if($k !='type' && $duplicate == true){
                
              if($k == 'name' && $duplicate == true){
                $attr .= ''.$k.'="'.$v.'_0" data-count="0"'; 
                
              }else{
                   $attr .= ''.$k.'="'.$v.'"';                  
              }                
            }
            
            else if ($k =='type'){   $type = $v;  }
            if ($k =='name' && $duplicate == false){   $name = $v;  }
            if ($k =='name' && $duplicate == true){   $name = $v;  }
            
            if ($k =='value'){   $value = $v;  }
            
        }endforeach;       
}   

  if(isset($options['html'])){ 
    /** Construction    **/   
        if($type === 'padlock'){$el1='label';}else{$el1='div';}
        $r .='<'.$el1.' '.$class.''; 
        if($type=== 'padlock'){$r .=' for="'.$name.'" ';}
        if($duplicate == true){    $r .='data-group="'.$name.'" data-inc="0"' ;   }
        
        $r .= '>';  
  }
        if($thisDuplicate == 1){  
        $r .= '<span class="bloc-duplicate"><a href="add-rule" data-JQ="duplicate" class="add-data">+</a>'
                . '<a href="del-rule" data-JQ="duplicate" class="del-data">-</a></span>';              
        }
  
/*Si input boucle une fois  si multi boucle sur le tableau*/
        
        if($capsule != ''){
        $r .= '<div class="'.$capsule.'">';
        }
        
        
        if($label != ''){     
            
            if($type=== 'color'){$el='legend';}else{$el='label for="'.$name.'"';}
            
            $r .= '<'.$el.' '.$labelClass.' >'.$label.'</'.$el.'>';
            
            
        } 
        
        if($type === 'text'){ $r .= '<input type="text" id="'.$name.'" '.$attr.' '.$jq.'>'; } 
        else if($type === 'inputColor'){ $r .= '<input type="color" id="'.$name.'" '.$attr.' '.$jq.'>'; } 
        else if($type === 'select'){
            
            
	$r .= '<select '.$attr.' id="'.$name.'" '.$jq.'>';
    foreach($options['options'] as $k=>$v){
	
          
        if (is_array($v)){
             
            foreach($v as $k=>$v){
                  $r .= '<option value="'.$k.'">'.ucfirst($v).'</option>';                 
            }                  
              
            }elseif (!is_array($v)){              
                 $r .= '<option value="'.$k.'" >'.ucfirst($v).'</option>';              
            }
        }
        
        $r .='</select>';
            
        }else if($type==="color"){           
            $r .= '<input type="color" '.$attr.' '.$jq.'>';             
            $r .= '<div class="FCW-center-center brick-opacity">'
                 .'<label for="'.$name.'_opacity">Opacity</label>'
                 .'<input type="text" name="'.$name.'_opacity" id="'.$name.'_opacity" data-inc="true" data-preview="true" value="1" '.$attr.' '.$jq.'>'
                 .'</div>';
                
        }else if($type==="justColor"){           
            $r .= '<input type="color" '.$attr.' '.$jq.'>';             
            $r .= '<div class="FCW-center-center brick-opacity">'
                 .'<label for="'.$name.'_opacity">Opacity</label>'
                 .'<input type="text" name="'.$name.'_opacity" id="'.$name.'_opacity" data-inc="true" data-preview="true" value="1" '.$attr.' '.$jq.'>'
                 .'</div>';
                
        } else if($type==="checked"){           
          $r .= '<input type="checkbox" id="'.$name.'" '.$attr.' '.$jq.'>';  
        }  
         else if($type==="padlock"){           
          
           $r .= '<input type="checkbox" id="'.$name.'" '.$attr.' '.$jq.'>'; 
           $r .= '<span class="switch-container"></span>';
           
         
        }   else if($type==="file"){           
        
           $r .= ' <input type="file" accept="image/*"  id="'.$name.'" '.$attr.' '.$jq.'>'; 
           $r .= '<div id="prevImg_a" class="prevImg"></div><progress id="progress_a"></progress>';  
           $r .= '<input type="hidden" id="checkImg_a" name="checkImg_a" value="false">';  
           
        }
        
        
        if($capsule != ''){
        $r .= '</div>';
        }
        if($type==="color"){
            $r .= '<a href="'.$name.'" data-jq="delRules" class="link-delRules">Delete Color</a> ';
            
        }

        
        if($thisDuplicate == 2){  
               $r .= '<span><a href="add" data-JQ="duplicate">+</a><a href="del" data-JQ="duplicate">-</a></span>';                   
        }
          if(isset($options['html'])){ 
        $r .= '</'.$el1.'>';
          }
    return $r;
     
    }
 
 
     function switchBox( $optBox = array() ){ 
    /** Valeur attendue **/
         
         
         $r .= '<input type="checkbox" id="'.$name.'" '.$attr.' '.$jq.'>';
           return $r;
     }
    
}