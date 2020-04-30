
<?php 

if($_POST['json']){
$R = array();
$R = json_decode($_POST['json'],true);



if(isset( $_COOKIE['rememberInstall'])){


    require_once 'pdo.php';
    $db = App::getDatabase();
    
        $tabHost = explode($_SERVER['HTTP_ORIGIN'].'/',$_SERVER['HTTP_REFERER']);
        $R['workSpace']['workDir'] = substr($tabHost[1],0,-1);
    
/**********     USAGE DES INCLUSIONS     ************************/  

  switch ($R['action']) {
      case  'create':
          
            switch ($R['table']) {
            case 'project': 
                
               if($db->readProject('WHERE project = ?',$R['newProject'])===false){
                       $R['id'] =  $db->createProject($R['dirProject'],$R['newProject']); 
                       $R['project'] = $db->findAllProject();
                    }else{
                        $R['error'] = 'Désolé ! Mais un projet utilise déjà ce nom.';
                    }
                
                
            break;
            /*****************************/
            case 'sheet': 
                
                    if($db->readStyle('WHERE sheet = ?',$R['newStyle'])===false){
                     
                       $R['idSheet'] = $db->createStyle($R['id'],$R['newStyle']);
                       $res = $db->getDataProject($R['id']);
                       $R = array_merge($R,$res);
                       
                    }else{
                        $R['error'] = 'Désolé ! Mais un feuille de style utilise déjà ce nom.';
                    }
                
            break;
            /****************************/
            case 'group': 
                
                      
                if(isset($R['newData'])&&isset($R['idGroup'])&&isset($R['idFormat'])&&isset($R['idSheet'])){
                       $db->createGroup($R['id'],$R['newData'],$R['idGroup'],$R['idFormat'],$R['idSheet']);
                       $res = $db->getDataProject($R['id']);
                       $R = array_merge($R,$res);
                       
                }else{
                    $R['error'] = 'Données manquantes';
                }
                
            
                
                
            break;
          
            }
      
      break;
  
  
  /************************************/
      case  'open':
          
            switch ($R['table']) {
            case 'project': 
                
              //Si le projet demandé existe
                if($db->getDataProject($R['id'])!==false){  
                    
                     $res = $db->getDataProject($R['id']);
                       $R = array_merge($R,$res);
                 
                }else{ $R['error'] = 'Project Inexistant';  }
                
                
            break;
      
          
            }
      
      break;
  
  /**************************************/
      case  'del':
          
            switch ($R['table']) {
            case 'project': 
                
            
                
                
            break;
      
          
            }
      
      break;
  
  /*************************************************/
      case  'findAll':
          
            switch ($R['table']) {
            case 'project': 
                
            $R['project'] =  $db->findAllProject(); 
                
                
            break;
      
          
            }
      
      break;
      case  'edit':
          
            switch ($R['table']) {
            case 'project': 
            case 'sheet': 
            case 'group': 
            case 'coord': 
                
            
                
                
            break;
      
          
            }
      
      break;
  
      case  'changePosition':
          
            switch ($R['table']) {
          
            case 'group': 
          
                //Fonction de reincremente de la table viser colonne position
                
                $res = $db->updatePosition($R);
               $R = array_merge($R,$res);
                
            break;
      
          
            }
      
      break;
  
  
  /*Action intervenant sur l'ensemble de la base*/
        case 'subAjax' : 
            
            
            
            //Porbleme d'insertion lors de la misse à jours de la valeur CSS
            
                //init
                $idProject  = $R['id'];         // id du projet
                $formatHtml = $R['format'];     // Format de la rule
                $idStyle    = $R['idSheet'];    // Id de la feuille de style             
                $workGroup  = $R['group'];      // explode et on obtient IDInside
                $myParent   = $R['myParentEl'];      // explode et on obtient IDInside
                $array      = explode('_',$workGroup);
                $parent     = $array[0];        // type du  Group Parent
                $idInside   = $array[1];        // id Group Parent            
                
                $thisContext = $R['thisContext'];           // Context
                $ruleHtml = $R['ruleHtml'];                 // Nom de la coordonées HTML                
                
                $nameRule = $R['name'];                     // Nom de la rule
                $preview  = $R['preview'];                  // Value de la preview
                $ajax  = $R['ajax'];                        // Value Ajax
                
      
                
             if($R['rulePosition'] !== "false"){
                $rulePosition = intVal($R['rulePosition']); //Position dans la liste des coordonées.
             } else{
                $rulePosition = $R['rulePosition'];
             }
      
                $idFormat = '3';
                
                
                
                /// On verifie si la ruleHttml existe ou pas
                
                if($db->issetGroup($ruleHtml) === false){
                    
                    //on insère et on obtien l'idGroup
                    $idGroup = $db->createJustGroup($ruleHtml);
                    
                    $R['zeretour01'] = "le groupe n'existe pas, on l'as inserer voici son id ".$idGroup;
                    
                }else{
                //On recupère l'id 
                    
                    $idGroup = $db->issetGroup($ruleHtml);
                    $R['zeretour01'] = "le groupe existe , on l'as déjà inserer voici son id ".$idGroup;
                }
                
                
                 /// On verifie si link_to_group existe ou pas
              
                 if($db->issetLinkToGroup($idProject,$idStyle,$idInside,$idGroup,$ruleHtml) === false){
                     
                     //Gstion de la position
                     
                     if($rulePosition !== "false"){
                         
                         //On recupère la position maximal
                         
                         $maxPos = $db->maxPos($idInside,$idStyle);
                         $R['maxPos'] = $maxPos;
                         $newPos = $maxPos;
                          $R['zeretour02'] = 'La position la plus haute pour ce groupe '.$maxPos.  gettype($maxPos).gettype($ruleHtml) ;
                          
                           $R['zeretourAA'] = $maxPos.'  '.$rulePosition ;
                         //On verifie que la position la plus haute n'est pas égal à la position en cours
                         if($maxPos === $rulePosition){
                           
                           $R['zeretour02'] = 'La position la plus haute est egal à la positon demander'.$rulePosition ;
                           
                           if($maxPos==0){
                              $R['zeretour03'] = 'La position est egale à zero'.  gettype($maxPos) ;                              
                                $newPos = $maxPos;
                            }else{ 
                                $newPos = $maxPos+1; 
                                 $R['zeretour04'] = 'On ce trouve au bout du groupe newpos : '.$newPos ;
                                
                            }
                        
                         }elseif($maxPos > $rulePosition){
                           $R['zeretour05']= 'On ce positonne entre les bornes du groupe , on incremente';
                            // Si la position la plus haute est supérieur à la position en cours
                            // Il est important de redifinir la position
                            // Des elemements ce situant au meme niveau que l'insertion
                           // $db->incrementPosGroup($idProject,$idStyle,$idInside,$rulePosition);
                            $newPos = $rulePosition+1 ;
                             
                        
                         }elseif($maxPos < $rulePosition){
                           $R['zeretour06']= "groupe vide position d'insertion = 0";
                           $newPos = 0 ;
                             
                         } 
                         
                        $R['maxPosFinish'] = $newPos;
                     $db->insertlinkToGroup($idProject,$idStyle,$idInside,$idGroup,$newPos,3);
                           
                    }else  if($rulePosition === "false"){
                    // Sinon la position par défaut est la position la plus haute dans ce groupe      

                    $maxPos = $db->maxPos($idInside,$idStyle);  

                    if($maxPos===0){
                    $R['zeretour07'] = 'Case false : La position est egale à zero' ;                              
                    $newPos = $maxPos;
                    }else{    
                    $R['zeretour08'] = 'Case false : On ce trouve au bout du groupe on increment de 1' ;
                    $newPos = $maxPos +1; 
                    }
                    // $idToLinkGroup=$db->insertRuleHtml($idProject,$idStyle,$idInside,$idGroup,$newPos,$idFormat);
                    $R['zeretour09']= "la position n'est pas definie nouvelle pos".$newPos;                  
                      $R['maxPosFinish'] = $newPos;   
                      
                    $db->insertlinkToGroup($idProject,$idStyle,$idInside,$idGroup,$newPos,3);
                     }           
                     
          
                
                 }else{
                     
                     $R['suite'] = "la suite";
                 }
       
            
        break;
  }





}

                
 echo json_encode($R);

}
 