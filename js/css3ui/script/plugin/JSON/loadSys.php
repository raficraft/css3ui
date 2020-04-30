
<?php 

if($_POST['json']){
$R = array();
$R = json_decode($_POST['json'],true);

    require_once 'pdo.php';
    $db = App::getDatabase($R['dataBaseUser'], $R['dataBasePass'], $R['dataBase']);
    
 
    
/**********     USAGE DES INCLUSIONS     ************************/  

  switch ($R['action']) {
      case  'create':
          
            switch ($R['table']) {
            case 'project': 
                
                if($db->readProject('WHERE project = ?',$R['newProject'])===false){
                       $R['id'] =  $db->createProject($R['dirProject'],$R['newProject']); 
                       $R['Allproject'] = $db->findAllProject();
                       
                       if(isset($R['style'])){
                       unset($R['style']);
                       }
                }else{
                    $R['error'] = 'Désolé ! Mais un projet utilise déjà ce nom.';
                }
                
                
            break;
            /*****************************/
            case 'sheet': 
                
                    if($db->issetStyle($R['id'],$R['newStyle'])!==false){
                     
                       $R['idSheet'] = $db->createStyle($R['id'],$R['newStyle']);
                       $res = $db->getDataProject($R['id'],$R['dirProject']);
                       $R = array_merge($R,$res);
                       
                    }else{
                        $R['error'] = 'Désolé ! Mais un feuille de style utilise déjà ce nom.';
                    }
                
            break;
            /****************************/
            case 'group': 
                
                      
                if(isset($R['newGroup'])&&isset($R['idlinkgroup'])&&isset($R['idFormat'])&&isset($R['idSheet'])&&isset($R['position'])){
                       
                       $R['idNewGroup']=$db->createGroup($R['id'],$R['newGroup'],$R['idlinkgroup'],$R['idFormat'],$R['idSheet'],$R['position']);
                       $res = $db->getDataProject($R['id'],$R['dirProject']);
                       $R = array_merge($R,$res);
                       
                }else{
                    $R['error'] = 'Données manquantes pour inserer un group';
                }
                
                
            break;
          
            }
      
      break;
  
  
  /************************************/
      case  'open':
          
            switch ($R['table']) {
            case 'project': 
                
              
                
              //Si le projet demandé existe
                if($db->getDataProject($R['id'],$R['dirProject'])!==false){  
                    
                     $res = $db->getDataProject($R['id'],$R['dirProject']);
                     $R = array_merge($R,$res);
                 
                }
                
                
            break;
      
          
            }
      
      break;
  
  /**************************************/
      case  'delThis':
          
            switch ($R['table']) {
            case 'project': 
           
            $R['return'] = $db->delProject($R['idproj'],$R['dirProject'],$R['delproject']);     
               $res = $db->findAllProject();
                $R = array_merge($R,$res);
            break;
            case 'sheet': 
                
            $db->delStyle($R['idsheet']); 
               
                 $res = $db->getDataProject($R['id'],$R['dirProject']);
                    $R = array_merge($R,$res);
                
                
            break;
            case 'group': 
                
                //On supprime le link_to_rule ainsi que c'est enfants                
                //si la coord est orpheline on supprime le groupe           
            
                $db->delGroup($R['idlinkgroup']);                
                $db->delOrphanRule();
                //On reincrement le group d'ou vient la suppresion
                
                $db->incThisInside($R['myparent']);
                
                $res = $db->getDataProject($R['id'],$R['dirProject']);
                $R = array_merge($R,$res);
                                 
            break;
        
        
            case 'rule': 
                
                
                    $db->delLinkToRule($R['idlinkrule']);
                    $db->delOrphanRule();
                    $res = $db->getDataProject($R['id'],$R['dirProject']);
                    $R = array_merge($R,$res);
                
            break;
      
          
            }
      
      break;
  
  
    case 'disable':
        
        switch ($R['table']){
        
            case 'sheet':
                
               $db->enableORdisableSheet($R['idstyle']);
                
                 $res = $db->getDataProject($R['id'],$R['dirProject']);
                $R = array_merge($R,$res);
                               
            break;
        
        
            case 'group':                
                
                $db->enableORdisableGroup($R['idlinkgroup'],$R['state'],$R['dirProject']);
                $res = $db->getDataProject($R['id'],$R['dirProject']);
                $R = array_merge($R,$res);
                               
            break;
        
            case 'rule':   
                
                
                $db->enableORdisableRule($R['idlinkrule'],$R['dirProject']);
                $res = $db->getDataProject($R['id'],$R['dirProject']);
                $R = array_merge($R,$res);
            
                               
            break;
        
            
        }
        
        
        
    break;


    case 'duplicate':
        
        switch ($R['table']){
            case 'project':
                
                
                  if($db->readProject('WHERE project = ?',$R['newProject'])===false){
                     
                      ///Duplication du projet
                      
                    $R['newId']= $db->duplicateProject($R['dirProject'],$R['idproject'],$R['newProject'],$R['job']);
                    $res = $db->getDataProject($R['newId'],$R['dirProject']);
                    $R = array_merge($R,$res);
                      
                      
                }else{
                    $R['error'] = 'Désolé ! Mais un projet utilise déjà ce nom.';
                }
                
                               
            break;
        
            
        }
        
        
        
    break;
    
    

    case 'important':
        
        switch ($R['table']){
            case 'rule':
                
            $db->importantCss($R['idlinkrule']);
            $res = $db->getDataProject($R['id'],$R['dirProject']);
            $R = array_merge($R,$res);
                
                               
            break;
        
            
        }
        
        
        
    break;
  
  /*************************************************/
      case  'findAll':
          
            switch ($R['table']) {
            case 'project': 
            
                
            if( $db->findAllProject()!==false){    
                
            $R['Allproject'] =  $db->findAllProject(); 
           
            }else{
                
                unset($R['AllProject']);
            }
                
            break;
      
          
            }
      
      break;
      case  'edit':
          
            switch ($R['table']) {
            case 'project': 
                 
                
                // On lit 
                // readTable($fields,$table,$condition ,$params){
                
                
                if($db->readTable($R['table'],$R['table'],'WHERE project = ?',$R['newData'])!==false){
                    
                    
                    $R['error'] = 'un projet utilisant ce nom existe déjà'; 
                     
                   
                    
                }else{
                    
                    
                    $db->updateName($R['table'],$R['table'],'idProject',$R['newData'],$R['idproject']);
                   //Mise à jour
                 //$table,$fields,$colonne,$newData,$id
                    
                    
                }
                
            break;   
            case 'sheet': 
               
                 if($db->readTable($R['table'],$R['table'],'WHERE sheet = ?',$R['newData'])!==false){
                     
                      $R['error'] = 'une feuille de style utilisant ce nom existe déjà'; 
                     
                 }else{
                     
                     $db->updateName($R['table'],$R['table'],'idSheet',$R['newData'],$R['idsheet']);
                 }
                 
                  $res = $db->getDataProject($R['id'],$R['dirProject']);
                       $R = array_merge($R,$res);
                
                
            break;
            case 'group': 
            case 'coord': 
                
                
                  
                //On verfie si l'id du group n'est pas utiliser plusierus fois dans la table link_to_group
                
                //Si utilisez une fois on renomme cash 
                
                //Sinon on refabrique un nouveau group;
                
                  
              if(count($db->countGroupToLink($R['idgroup']))===1){
                  
                  $R['retourTest']='liaison unique';
                  
                  $db->updateGroup($R['newData'],$R['idgroup']);
                  
                  
                  
                  
              }else if(count($db->countGroupToLink($R['idgroup']))>1){
                  
                 
                  
                  if($db->issetGroup($R['newData'])!==false){
                      
                    
                    $R['retourTest']='lier à plusieur nouveau nom existant';
                    $majID = $db->issetGroup($R['newData']);
                    $db->updateGroupIdToLink($majID,$R['idlinkgroup']);
                       
                      
                  }else{
                      $majID = $db->createJustGroup($R['newData']);
                       $db->updateGroupIdToLink($majID,$R['idlinkgroup']);
                      $R['retourTest']='lier à plusieur nouveau nom existe pas'; 
                  }
                  
                  
              }
              
              
              $res = $db->getDataProject($R['id'],$R['dirProject']);
                       $R = array_merge($R,$res);
               
             
                
            default :  
                
                
         
                
            break;
      
          
            }
      
      break;
  
      case  'changePosition':
          
            switch ($R['table']) {
          
            case 'group': 
                
            $R['test'] =    $db->updateGroupPosition($R);
                   $res = $db->getDataProject($R['id'],$R['dirProject']);
                    $R = array_merge($R,$res);
                
          
            //Fonction de reincremente de la table viser colonne position
                
            /*   $db->updatePosition($R);
               $res = $db->getDataProject($R['id']);
               $R = array_merge($R,$res);
            */     
            break;
      
          
            }
      
      break;
  
  
  /*Action intervenant sur l'ensemble de la base*/
        case 'subAjax' : 
            
            
            
            //Porbleme d'insertion lors de la misse à jours de la valeur CSS
            
                //init
                $idProject  = $R['id'];         // id du projet               
                $idStyle    = $R['idSheet'];    // Id de la feuille de style             
                $idInside   = $R['idlinkgroup'];    // Id de la feuille de style             
              
                    
                $formatHtml = $R['groupformat'];     // Format de la rule
                $ruleHtml = $R['ruleHtml'];                 // Nom de la coordonées HTML                
                          
                
                $nameRule = $R['name'];                     // Nom de la rule
                $preview  = $R['preview'];                  // Value de la preview
                $ajax  = $R['ajax'];                        // Value Ajax
                
                
                $formatToLink = 4;                
         
                $rulePosition = $R['position']; //??????????????
      
      
                    $idFormat = '3';
            
                /// On verifie si la ruleHttml existe ou pas
                
                if($db->issetGroup($ruleHtml) === false){                    
                    //on insère et on obtien l'idGroup
                    $idGroup = $db->createJustGroup($ruleHtml);
                
                }else{
                //On recupère l'id 
                    $idGroup = $db->issetGroup($ruleHtml);
                }
                
                 if($db->issetLinkToGroup($idProject,$idStyle,$idInside,$idGroup,$ruleHtml) === false){
                     $R['zencours01'] ='La ligne link_to_rule existe pas';
                     
                    $idToGroup=$db->insertLinkToGroup($idProject,$idStyle,$idInside,$idGroup,$rulePosition,4);
                     $R['idNewGroup'] = $idToGroup;
                  
                  }else{
                     
                     $R['suite'] = "la suite";
                     
                     $idToGroup = $db->issetLinkToGroup($idProject,$idStyle,$idInside,$idGroup,$ruleHtml);
                     $R['idNewGroup'] = $idToGroup;
                    
                }

                         
                 ///Check et insertion des values!!!!
                 
                 
                //on recupère l'id de la rule css
                 
                 $idRule = $db->findIdRule($nameRule);
                 
                
                 if($ajax!==''){
                        //MAJ
                        //On check si la valeur css existe ou pas

                         if($db->issetCss($ajax)!==false){
                             $idCss = $db->issetCss($ajax);
                         }else{

                             //on insère la value;
                             $idCss = $db->createCss($ajax);
                         }

                     if($db->issetLinkToRule($idToGroup,$idRule)!== false){
                         //La ligne existe on tente une mise à jour de la valeur

                         $db->updateIdToCss($idToGroup,$idRule,$idCss);

                     }else{
                         // Le linkToRule n'existe pas on insère;
                         //On recupère la position la plus haute

                         $posRule = $db->maxPosRule($idToGroup);
                         $R['posRule'] = $posRule;
                         $db->createLinkToRule($idToGroup,$idRule,$idCss,$posRule);

                     }
                     
                 }else if($ajax===''){
                     // On supprime la ligne;
                     
                     if($db->issetLinkToRule($idToGroup,$idRule)!== false){
                         
                         $thisDel =  $db->issetLinkToRule($idToGroup,$idRule);
                         $db->delLinkToRule($thisDel);
                         
                     } 
                     
                     
                     
                 }
                 //Supression des donées orphelines
                 
                  $db->delOrphanRule();                 
                 
                  $res = $db->getDataProject($R['id'],$R['dirProject']);
                  $R['what'] = getType($res);
                  $R = array_merge($R,$res);
       
            
        break;
        
            case 'tmpCss' : 
                
             
                
                $dirCss = $_SERVER['CONTEXT_DOCUMENT_ROOT'].$R['dirProject'].$R['project'].'/css/tmp';
                $fileCss = $dirCss.'/'.$R['tmpSheet'].'.css';
                
                $dossier = $dirCss;
                    $dir = opendir($dossier); 
                    while($file = readdir($dir)) { 
                        if(!in_array($file, array(".", ".."))){
                            if(is_dir("$dossier/$file")) {
                                clear_dir("$dossier/$file", true);
                            } else {
                                unlink("$dossier/$file");
                            }
                        }
                } 
                
                $monfichier = fopen($fileCss, 'a+');
                ftruncate($monfichier,0); // On remet le curseur au début du fichier
                fputs($monfichier, $R['myCss']); 
                fclose($monfichier);
            break;  
            
            
            
            
            case 'finalCss' :    
                
                $dirCss = $_SERVER['CONTEXT_DOCUMENT_ROOT'].$R['dirExtract'];
                $fileCss = $dirCss.'/'.$R['project'].'.css';
                
                 $dossier = $dirCss;
                    $dir = opendir($dossier); 
                    while($file = readdir($dir)) { 
                        if(!in_array($file, array(".", ".."))){
                            if(is_dir("$dossier/$file")) {
                                clear_dir("$dossier/$file", true);
                            } else {
                                unlink("$dossier/$file");
                            }
                        }
                    } 

                $monfichier = fopen($fileCss, 'a+');
                ftruncate($monfichier,0); // On remet le curseur au début du fichier
                fputs($monfichier, $R['myCss']); // On écrit le nouveau nombre de pages vues
                fclose($monfichier);


          
                
            break;        
        
  }

}

                
 echo json_encode($R);


 