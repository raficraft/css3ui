<?php

    
/**********A INCLURE************************/    
  
    class dataBase{
        
        private $thisDesign;
     

        
        public function __construct($login,$password,$database_name,$host= 'localhost') {
            $this->thisDesign = new PDO("mysql:host=$host;dbname=$database_name", $login, $password);
            $this->thisDesign->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
            $this->thisDesign->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE,PDO::FETCH_OBJ);
        }
        
       /**
     * @param $query
     * @param bool|array $params
     * @return PDOStatement
     */
        
     //utilitaire  
        
     public   function recursive_rmdir($dirname, $followLinks = false)
{
    if (is_dir($dirname) && !is_link($dirname))
    {
        if (!is_writable($dirname))
            throw new Exception('You do not have renaming permissions!');
 
        $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($dirname),
            RecursiveIteratorIterator::CHILD_FIRST
        );
 
        while ($iterator->valid())
        {
            if (!$iterator->isDot())
            {
                if (!$iterator->isWritable())
                {
                    throw new Exception(sprintf(
                        'Permission Denied: %s.',
                        $iterator->getPathName()
                    ));
                }
                if ($iterator->isLink() && false === (boolean) $followLinks)
                {
                    $iterator->next();
                }
                if ($iterator->isFile())
                {
                    unlink($iterator->getPathName());
                }
                else if ($iterator->isDir())
                {
                    rmdir($iterator->getPathName());
                }
            }
 
            $iterator->next();
        }
        unset($iterator); // Fix for Windows.
 
        return rmdir($dirname);
    }
    else
    {
        throw new Exception(sprintf('Directory %s does not exist!', $dirname));
    }
}
        
        
        
    public function checkDirProject($dir,$newRep){
        
           // création des repertoires
            
            $arrayDir = [
                $_SERVER['CONTEXT_DOCUMENT_ROOT'].$dir.'/'.$newRep,
                $_SERVER['CONTEXT_DOCUMENT_ROOT'].$dir.'/'.$newRep.'/sql',
                $_SERVER['CONTEXT_DOCUMENT_ROOT'].$dir.'/'.$newRep.'/css',
                $_SERVER['CONTEXT_DOCUMENT_ROOT'].$dir.'/'.$newRep.'/css/tmp',
                $_SERVER['CONTEXT_DOCUMENT_ROOT'].$dir.'/'.$newRep.'/img',
                $_SERVER['CONTEXT_DOCUMENT_ROOT'].$dir.'/'.$newRep.'/img/background',
                $_SERVER['CONTEXT_DOCUMENT_ROOT'].$dir.'/'.$newRep.'/img/background/tmp',
                $_SERVER['CONTEXT_DOCUMENT_ROOT'].$dir.'/'.$newRep.'/img/border',
                $_SERVER['CONTEXT_DOCUMENT_ROOT'].$dir.'/'.$newRep.'/img/border/tmp',
            ];
            
            foreach ($arrayDir as $k => $v):{
                   
                if(!is_dir($v)){mkdir($v,0700);}
            
            }endforeach;
        
    }
    
    
   
    
    public function query($query, $params = false){
        if($params){
            $req = $this->thisDesign->prepare($query);
            $req->execute($params);
        }else{
            $req = $this->pdo->query($query);
        }
        return $req;
    }
    
    //Pour les requetes simple et direct
    public function readTable($fields,$table,$condition ,$params){         
         
            $req = $this->thisDesign->prepare("SELECT $fields FROM $table $condition ");
            $req->execute([$params]);
            $read = $req->fetchAll();
            
                if(count($read)>0){ 
                    $result = $read ;               
                }else{
                    $result = false;
                }         
         
                return $result;
     
    } 
    
    public function updateName($table,$fields,$colonne,$newData,$id){
        
    $this->thisDesign->prepare("UPDATE $table "
                                 . "SET $fields = ? "
                                 . "WHERE $colonne = ? "
        )->execute([$newData,$id]);  
        
    }

//Apelle à la base de manière dedier
    
    
    // PROJECT DB
    
    public function findAllProject(){
       
            $req = $this->thisDesign->prepare("SELECT idProject,actif,project FROM project WHERE actif = 1 ORDER BY idProject ASC");
            $req->execute();
            $result = $req->fetchAll();       
     
        if(count($result) > 0){  return $result; }else{$result = false ;   }
      
    }    
    
    //Type
    
        public function readType($params){
         
            $req = $this->thisDesign->prepare(" SELECT idType  FROM type  WHERE types = ? ");
            $req->execute([$params]);
            $readProject = $req->fetch();
            
                if(isset($readProject->idType)){ 
                    $result = $readProject ;               
                }else{
                    $result = false;
                }
         
            return $result;
        } 
        
        
           public function delProject($thisId,$dir,$rep){
            
            $req = $this->thisDesign->prepare(" SELECT idSheet  FROM sheet  WHERE id_to_project = ? ");
            $req->execute([$thisId]);
            $readProject = $req->fetchAll();  
            
            if($readProject !== false){
                
                
                foreach ($readProject as $key => $v) {
                    
                    
                    $thisCssId = $v->idSheet;
                    
                    $this->delStyle($thisCssId); 
                    
                }
                
                //On supprime le projet
                   $delLink = $this->thisDesign->prepare(
                            "DELETE FROM project WHERE idProject = ?"                             
                        ); 
                    $delLink->execute([$thisId]);
                    
                    
                    
                  
          $folder= $_SERVER['CONTEXT_DOCUMENT_ROOT']. $dir.'/'.$rep.'/';
                 $this->recursive_rmdir($folder);  
                
            }        
                
            }
        
        
    //project
    
        public function readProject($condition ,$params){
         
         
            $req = $this->thisDesign->prepare("SELECT idProject,  project  FROM project $condition ");
            $req->execute([$params]);
            $readProject = $req->fetch();
            
                if(isset($readProject->idProject)){ 
                    $result = $readProject ;               
                }else{
                    $result = false;
                }
         
         
            return $result;
     
        }  
        
    
        
        public function createProject($dir,$newRep){
            
            
            $this->checkDirProject($dir,$newRep);
            $req = $this->thisDesign->prepare("INSERT INTO project (project,actif) VALUES (?,'1')");
            $req->execute([$newRep]);             
            
            return $this->thisDesign->lastInsertId();
           
                   
        }  
        
        
        
        public function duplicateProject($dir,$oldId,$newName,$job){   
            
           //création du projet et de ses répertoires; 
           $newId = $this->createProject($dir,$newName); 
           
           //Lecture des feuilles de styles !!
           
           $allStyle = $this->readStyle($oldId);
           
            foreach ($allStyle as $key => $value){
               
               $thisNameSheet = $value->sheet;
               $oldIdSheet = $value->idSheet;
               
            $newIdSheet = $this->createStyle($newId,$thisNameSheet);
               
               //lecture des reperotire de l'ancien projet
               
            $req = $this->thisDesign->prepare("SELECT id_link_group,id_to_inside,id_to_group,actif,posGroup,id_to_groupFormat,groupName "
                                            . "FROM link_to_group as l, groupe as g "
                                            . "WHERE l.id_to_project = ? "
                                            . "AND   l.id_to_style = ? "
                                            . "AND   l.id_to_inside = ? "
                                            . "AND   l.id_to_group = g.idGroup "
            );
            $req->execute([$oldId,$oldIdSheet,0]);
            $readLinkZero = $req->fetchAll();
            
            foreach ($readLinkZero as $x => $v) {
                
                $idLink_0   = $v->id_link_group;
                $idInside_0 = $v->id_to_inside;
                $idGroup_0  = $v->id_to_group;
                $state_0    = $v->actif;
                $position_0 = $v->posGroup;
                $format_0   = $v->id_to_groupFormat;
              
            
                   $reqL = $this->thisDesign->prepare("INSERT INTO link_to_group"
                            . "(id_to_project, id_to_style, posGroup, id_to_inside, id_to_group , actif, id_to_groupFormat ) "
                            . " VALUES (?,?,?,?,?,?,?) ");

                    $reqL->execute([$newId,$newIdSheet,$position_0,$idInside_0,$idGroup_0,$state_0,$format_0]);
            
                    $newIdInside_0 = $this->thisDesign->lastInsertId();
                    
                    
                    
                    //level one
                    $req = $this->thisDesign->prepare("SELECT id_link_group,id_to_inside,id_to_group,actif,posGroup,id_to_groupFormat,groupName "
                                          . "FROM link_to_group as l, groupe as g "
                                          . "WHERE l.id_to_project = ? "
                                          . "AND   l.id_to_style = ? "
                                          . "AND   l.id_to_inside = ? "
                                          . "AND   l.id_to_group = g.idGroup "
                    );
                    $req->execute([$oldId,$oldIdSheet,$idLink_0]);
                    $readLevelOne = $req->fetchAll();

                    foreach ($readLevelOne as $z => $t) {
                        
                        
                            $idLink_1   = $t->id_link_group;
                            $idInside_1 = $t->id_to_inside;
                            $idGroup_1  = $t->id_to_group;
                            $state_1    = $t->actif;
                            $position_1 = $t->posGroup;
                            $format_1   = $t->id_to_groupFormat;
                           

                               $reqL = $this->thisDesign->prepare("INSERT INTO link_to_group"
                                        . "(id_to_project, id_to_style, posGroup, id_to_inside, id_to_group , actif, id_to_groupFormat ) "
                                        . " VALUES (?,?,?,?,?,?,?) ");

                                $reqL->execute([$newId,$newIdSheet,$position_1,$newIdInside_0,$idGroup_1,$state_1,$format_1]);

                                $newIdInside_1 = $this->thisDesign->lastInsertId();
                                
                                
                                    //level Two
                                    $req = $this->thisDesign->prepare("SELECT id_link_group,id_to_inside,id_to_group,actif,posGroup,id_to_groupFormat,groupName "
                                                          . "FROM link_to_group as l, groupe as g "
                                                          . "WHERE l.id_to_project = ? "
                                                          . "AND   l.id_to_style = ? "
                                                          . "AND   l.id_to_inside = ? "
                                                          . "AND   l.id_to_group = g.idGroup "
                                    );
                                    $req->execute([$oldId,$oldIdSheet,$idLink_1]);
                                    $readLevelTwo = $req->fetchAll();

                                    foreach ($readLevelTwo as $z => $t) {


                                            $idLink_2   = $t->id_link_group;
                                            $idInside_2 = $t->id_to_inside;
                                            $idGroup_2 = $t->id_to_group;
                                            $state_2    = $t->actif;
                                            $position_2 = $t->posGroup;
                                            $format_2   = $t->id_to_groupFormat;


                                               $reqL = $this->thisDesign->prepare("INSERT INTO link_to_group"
                                                        . "(id_to_project, id_to_style, posGroup, id_to_inside, id_to_group , actif, id_to_groupFormat ) "
                                                        . " VALUES (?,?,?,?,?,?,?) ");

                                                $reqL->execute([$newId,$newIdSheet,$position_2,$newIdInside_1,$idGroup_2,$state_2,$format_2]);

                                                $newIdInside_2 = $this->thisDesign->lastInsertId();
                                                
                                                
                                            //////////////////////////////  
                                            //  
                                            //level Three
                                            $req = $this->thisDesign->prepare("SELECT id_link_group,id_to_inside,id_to_group,actif,posGroup,id_to_groupFormat,groupName "
                                                                  . "FROM link_to_group as l, groupe as g "
                                                                  . "WHERE l.id_to_project = ? "
                                                                  . "AND   l.id_to_style = ? "
                                                                  . "AND   l.id_to_inside = ? "
                                                                  . "AND   l.id_to_group = g.idGroup "
                                            );
                                            $req->execute([$oldId,$oldIdSheet,$idLink_2]);
                                            $readLevelTwo = $req->fetchAll();

                                            foreach ($readLevelTwo as $z => $t) {


                                                    $idLink_3   = $t->id_link_group;
                                                    $idInside_3 = $t->id_to_inside;
                                                    $idGroup_3  = $t->id_to_group;
                                                    $state_3    = $t->actif;
                                                    $position_3 = $t->posGroup;
                                                    $format_3   = $t->id_to_groupFormat;


                                                       $reqL = $this->thisDesign->prepare("INSERT INTO link_to_group"
                                                                . "(id_to_project, id_to_style, posGroup, id_to_inside, id_to_group , actif, id_to_groupFormat ) "
                                                                . " VALUES (?,?,?,?,?,?,?) ");

                                                        $reqL->execute([$newId,$newIdSheet,$position_3,$newIdInside_2,$idGroup_3,$state_3,$format_3]);

                                                        $newIdInside_3 = $this->thisDesign->lastInsertId();
                                                 
                                                         /////////////
                                                        if($job==='all'){
                                                           
                                                            //Rule level 3

                                                            //lecture des rule originel idLink (level)
                                                            //Données mondifier newIdInsideX (level)

                                                                $req = $this->thisDesign->prepare("SELECT id_to_link,id_to_rule,id_to_css,posRule,important,actif "
                                                                  . "FROM link_to_rule as l "
                                                                  . "WHERE l.id_to_link = ? "                                                                 
                                                                );
                                                                
                                                                 $req->execute([$idLink_3]);
                                                                 $ruleLevelThree = $req->fetchAll();
                                                                
                                                                foreach ($ruleLevelThree as $a => $b) {
                                                                     
                                                                     $idRule_3     = $b->id_to_rule;
                                                                     $idCss_3      = $b->id_to_css;
                                                                     $rulePos_3    = $b->posRule;
                                                                     $important_3  = $b->important;
                                                                     $actif_3      = $b->actif;
                                                                     
                                                                        $reqL = $this->thisDesign->prepare("INSERT INTO link_to_rule"
                                                                        . "(id_to_link,id_to_rule,id_to_css,important,actif,posRule ) "
                                                                        . " VALUES (?,?,?,?,?,?) ");

                                                                        $reqL->execute([$newIdInside_3,$idRule_3,$idCss_3,$important_3,$actif_3,$rulePos_3]);
                                                                     
                                                                     
                                                                }


                                                            //FIN DES Rule level 3 
                                                        }          
                                                             //////////////  job 
                                                        
                                                        
                                                        
                                                        
                                            //FIN DE LEVEL Three             
                                            }  
                                             /////////////
                                            
                                            if($job==='all'){
                                           
                                            //Rule level 2

                                            //lecture des rule originel idLink (level)
                                            //Données mondifier newIdInsideX (level)

                                                $req = $this->thisDesign->prepare("SELECT id_to_link,id_to_rule,id_to_css,posRule,important,actif "
                                                  . "FROM link_to_rule as l "
                                                  . "WHERE l.id_to_link = ? "                                                                 
                                                );

                                                 $req->execute([$idLink_2]);
                                                 $ruleLevelTwo = $req->fetchAll();

                                                foreach ($ruleLevelTwo as $c => $d) {

                                                     $idRule_2     = $d->id_to_rule;
                                                     $idCss_2      = $d->id_to_css;
                                                     $rulePos_2    = $d->posRule;
                                                     $important_2  = $d->important;
                                                     $actif_2      = $d->actif;

                                                        $reqL = $this->thisDesign->prepare("INSERT INTO link_to_rule"
                                                        . "(id_to_link,id_to_rule,id_to_css,important,actif,posRule ) "
                                                        . " VALUES (?,?,?,?,?,?) ");

                                                        $reqL->execute([$newIdInside_2,$idRule_2,$idCss_2,$important_2,$actif_2,$rulePos_2]);


                                                }

                                            
                                            //FIN DES Rule level 2  
                                            }        
                                             //////////////job  
                                            
                                            
                                            
                                    //FIN DE LEVEL TWO            
                                    }
                                    
                    /////////////
                    if($job==='all'){
                    //Rule level 1

                    //lecture des rule originel idLink (level)
                    //Données mondifier newIdInsideX (level)

                        $req = $this->thisDesign->prepare("SELECT id_to_link,id_to_rule,id_to_css,posRule,important,actif "
                          . "FROM link_to_rule as l "
                          . "WHERE l.id_to_link = ? "                                                                 
                        );

                         $req->execute([$idLink_1]);
                         $ruleLevelOne = $req->fetchAll();

                        foreach ($ruleLevelOne as $e => $f) {

                             $idRule_1     = $f->id_to_rule;
                             $idCss_1      = $f->id_to_css;
                             $rulePos_1    = $f->posRule;
                             $important_1  = $f->important;
                             $actif_1      = $f->actif;

                                $reqL = $this->thisDesign->prepare("INSERT INTO link_to_rule"
                                . "(id_to_link,id_to_rule,id_to_css,important,actif,posRule ) "
                                . " VALUES (?,?,?,?,?,?) ");

                                $reqL->execute([$newIdInside_1,$idRule_1,$idCss_1,$important_1,$actif_1,$rulePos_1]);


                        }


                    //FIN DES Rule level 1 
                    }         
                    ////////////// job    
                        
                        
                        
                    //FIN DE LEVEL ONE
                    }
            
            /////////////
            if($job==='all'){
            //Rule level 0

                //lecture des rule originel idLink (level)
                //Données mondifier newIdInsideX (level)

                $req = $this->thisDesign->prepare("SELECT id_to_link,id_to_rule,id_to_css,posRule,important,actif "
                  . "FROM link_to_rule as l "
                  . "WHERE l.id_to_link = ? "                                                                 
                );
                    $req->execute([$idLink_0]);
                    $ruleLevelZero = $req->fetchAll();

                foreach ($ruleLevelZero as $g => $h) {

                     $idRule_0     = $h->id_to_rule;
                     $idCss_0      = $h->id_to_css;
                     $rulePos_0    = $h->posRule;
                     $important_0  = $h->important;
                     $actif_0      = $h->actif;

                        $reqL = $this->thisDesign->prepare("INSERT INTO link_to_rule"
                        . "(id_to_link,id_to_rule,id_to_css,important,actif,posRule ) "
                        . " VALUES (?,?,?,?,?,?) ");

                        $reqL->execute([$newIdInside_0,$idRule_0,$idCss_0,$important_0,$actif_0,$rulePos_0]);

                }


            //FIN DES Rule level 0  
            }        
             //////////////    job    
                    
                    
                  
            //FIN DE LEVEL ZERO   
            }
               
               
           }
           
         return $newId;          
        }  
        
    ///Style
        
        
            public function readStyle($params){
              
           
            $req = $this->thisDesign->prepare("SELECT idSheet,sheet,addSheet,actif "
                                            . "FROM sheet "
                                            . "WHERE id_to_project = ? "
                                            . "ORDER BY idSheet ASC ");
            $req->execute([$params]);
            $read = $req->fetchAll();
            
            if($read!==false){  $result = $read ;}else{  $result = false; }
            return $result;
                   
            }              
            public function issetStyle($idProject,$nameSheet){
              
           
            $req = $this->thisDesign->prepare("SELECT idSheet,sheet,addSheet,actif "
                                            . "FROM sheet "
                                            . "WHERE id_to_project = ? "
                                            . "AND sheet = ? "
                                            . "ORDER BY idSheet ASC ");
            $req->execute([$idProject,$nameSheet]);
            $read = $req->fetchAll();
            
            if($read!==false){  $result = $read ;}else{  $result = false; }
            return $result;
                   
            }              
            
            public function createStyle($idProject,$newStyle){
            
            
            $req = $this->thisDesign->prepare("INSERT INTO sheet (sheet,id_to_project,actif) VALUES (?,?,'1')");
            $req->execute([$newStyle,$idProject]); 
            
            return $this->thisDesign->lastInsertId();
            
            } 
            
            
            
            public function delStyle($thisId){
                
                
            //On selectionne toute les link_to_group correspondant à la feuille de style
            //On boucle et envoie à delGroup
            
            $req = $this->thisDesign->prepare("SELECT id_link_group "
                                            . "FROM link_to_group as lg "
                                            . "WHERE lg.id_to_style = ? ");
            $req->execute([$thisId]);
            $read = $req->fetchAll();
                
            if($read!== false){
                
                foreach ($read as $key => $v) {
                    
                    $thisIdLinkToGroup = $v->id_link_group;
                    
                    $this->delGroup($thisIdLinkToGroup);
                    
                }
                
            }
            
            //Et on supprime la feuille de style
            
            $delLink = $this->thisDesign->prepare(
                            "DELETE FROM sheet WHERE idSheet = ?"                             
                        ); 
            $delLink->execute([$thisId]);  
            $this->delOrphanRule();           
            
            } 
            
            public function enableORdisableSheet($thisId){
                
                //lecture de la feuille de style 
            $req = $this->thisDesign->prepare("SELECT idSheet,actif "
                                            . "FROM sheet "
                                            . "WHERE idSheet = ? ");
            $req->execute([$thisId]);
            $readSheet = $req->fetch();
            //enable OR disabel sheet
            if($readSheet!==false){
                
                $stateSheet = $readSheet->actif;
                
                if($stateSheet ==='1'){                    
                    //On désactive la feuille                    
                    $this->thisDesign->prepare("UPDATE sheet "
                                 . "SET actif = ? "
                                 . "WHERE idSheet = ? "
                    )->execute([0,$thisId]); 
                    
                      $this->thisDesign->prepare("UPDATE link_to_group "
                                 . "SET actif = ? "
                                 . "WHERE id_to_style = ? "
                    )->execute([0,$thisId]); 
                    
                    
                     $this->thisDesign->prepare("UPDATE link_to_group as l, link_to_rule as r "
                                 . "SET l.actif = ?, r.actif = ? "                              
                                 . "WHERE l.id_to_style = ? "
                                 . "AND l.id_link_group =  r.id_to_link"
                    )->execute([0,0,$thisId]);
                    
                    
                }else if($stateSheet === '0'){                    
                    //On Active la feuille 
                    $this->thisDesign->prepare("UPDATE sheet "
                                 . "SET actif = ? "
                                 . "WHERE idSheet = ? "
                    )->execute([1,$thisId]); 
                    
                    
                      $this->thisDesign->prepare("UPDATE link_to_group "
                                 . "SET actif = ? "
                                 . "WHERE id_to_style = ? "
                    )->execute([1,$thisId]); 
                    
                      $this->thisDesign->prepare("UPDATE link_to_group as l, link_to_rule as r "
                                 . "SET l.actif = ?, r.actif = ? "                              
                                 . "WHERE l.id_to_style = ? "
                                 . "AND l.id_link_group =  r.id_to_link"
                    )->execute([1,1,$thisId]); 
                    
                }
                
               
                
            }
                
                
               
            
                
                
            }
        
    //Group 
            public function readGroup($idInside,$idStyle){
                
                //init
                
            $req = $this->thisDesign->prepare(
                    " SELECT * "
                  . " FROM  link_to_group as l, groupe as g , groupformat as gf "                   
                  . " WHERE l.id_to_inside = ? "
                  . " AND   l.id_to_style = ? "
                  . " AND   l.id_to_group = g.idGroup "
                  . " AND   l.id_to_groupFormat = gf.idGroupFormat "
                  . "ORDER BY l.posGroup ASC "
                  );
            $req->execute([$idInside,$idStyle]);
            $read = $req->fetchAll();
            
            if($read!==false){  $result = $read ;}else{  $result = false; }
            return $result;                   
            } 
            
            
            public function findIdGroup($idInside,$idStyle){
                
                //init
                
            $req = $this->thisDesign->prepare(
                    " SELECT * "
                  . " FROM  link_to_group as l, groupe as g , groupformat as gf "                   
                  . " WHERE l.id_to_inside = ? "
                  . " AND   l.id_to_style = ? "
                  . " AND   l.id_to_group = g.idGroup "
                  . " AND   l.id_to_groupFormat = gf.idGroupFormat "
                  . "ORDER BY l.posGroup ASC "
                  );
            $req->execute([$idInside,$idStyle]);
            $read = $req->fetchAll();
            
            if($read!==false){  $result = $read ;}else{  $result = false; }
            return $result;                   
            } 
            
                public function haveAchildGroup($idProject,$idStyle,$idLink){                 

                        $req = $this->thisDesign->prepare(
                           "SELECT * "
                         . "FROM   link_to_group as l "                                 
                         . "WHERE l.id_to_project = ? "                   
                         . "AND l.id_to_style = ? "                   
                         . "AND l.id_to_inside = ? "                   
                         . "ORDER BY l.id_link_group ASC ");  
                        $req->execute([$idProject,$idStyle,$idLink]);
                        $read = $req->fetch();

                        if($read!==false){  $result = $read ;}else{  $result = false; }
                        return $result;
                }
                
                
            public function createJustGroup($name){            

                $reqG = $this->thisDesign->prepare("INSERT INTO groupe "
                        . "(groupName) "
                        . " VALUES (?) ");

                        $reqG->execute([$name]);
                $result = $this->thisDesign->lastInsertId();
                return $result; 
            }
            
            
                     
              public function createGroup($idProject,$newData,$idToGroup,$idFormat,$idStyle,$thisPos){            

                    //On check la position la plus haute.
                
                if($thisPos === false){
                $newPos =0;
                }else{ $newPos = $thisPos+1; 
                
                //Le nouveau group est inserer entre deux réincremente des groupes suivants
                //find Twin posiition
                
                //On recherche dans la feuille de style et le inside group aisin que la position transmise
                
                
                $findTwinPos = $this->thisDesign->prepare(
                    " SELECT id_link_group,posGroup "
                  . " FROM  link_to_group as lg "                   
                  . " WHERE lg.id_to_project = ? "
                  . " AND   lg.id_to_style = ? "
                  . " AND   lg.id_to_inside = ? "
                  . " AND   lg.posGroup > ? "
                  );

                $findTwinPos->execute([$idProject,$idStyle,$idToGroup,$thisPos]);
                $read = $findTwinPos->fetchall();
                //et on reincrement les link_to_group_concerner
                
                    foreach ($read as $k => $v) {                        
                        
                        $thisLinkTo   = $v->id_link_group;
                        $thisPosGroup = $v->posGroup;
                        $changePos  =$thisPosGroup+1;
                        
                        $this->thisDesign->prepare("UPDATE link_to_group "
                                 . "SET posGroup = ? "
                                 . "WHERE id_link_group = ? "
                        )->execute([$changePos,$thisLinkTo]);                         

                    }                
                
                }
                
                
                //Check le group est crée que si il existe pas
                //ON WORK
               
                $checkGroup = $this->thisDesign->prepare(
                    " SELECT idGroup "
                  . " FROM  groupe as g "                   
                  . " WHERE g.groupName = ? "
                  );
                $checkGroup->execute([$newData]);
                $readCheck = $checkGroup->fetch();
                
                
                if($readCheck === false){
                
                $reqG = $this->thisDesign->prepare("INSERT INTO groupe "
                        . "(groupName) "
                        . " VALUES (?) ");

                    $reqG->execute([$newData]);
                    $newId = $this->thisDesign->lastInsertId();
                    
                }else{
                    
                    $newId = $readCheck->idGroup;
                    
                }
                
                
                
                if($newId!==false){
                    $reqL = $this->thisDesign->prepare("INSERT INTO  link_to_group"
                            . "(id_to_project, id_to_style, posGroup, id_to_inside, id_to_group , id_to_groupFormat  , actif) "
                            . " VALUES (?,?,?,?,?,?,'1') ");

                    $reqL->execute([$idProject,$idStyle,$newPos,$idToGroup,$newId,$idFormat]); 

                    return $this->thisDesign->lastInsertId();
                    
                    }else{
                         return  false;
                    }

                } 
            
        

            public function issetGroup($name){
            //Check l'id du group et la retourne si existe    
                  $req = $this->thisDesign->prepare(
                    " SELECT idGroup "
                  . " FROM  groupe as g "                   
                  . " WHERE g.groupName = ? "
                  );
            $req->execute([$name]);
            $read = $req->fetch();
            if($read!== false){
                return $read->idGroup;
            }else{
                return false;
            }
                
            }
            
            public function findIdgroupFormat($name){
            $req = $this->thisDesign->prepare(
                    " SELECT idGroupFormat "
                  . " FROM  groupFormat as gf "                   
                  . " WHERE gf.format = ? "
                  );
            $req->execute([$name]);
            $read = $req->fetch();
              if($read!==false){
                return $read->idGroupFormat;
            }else{
                return false;
            }
                
             
                
            }
           
    //link to group     
                 
            
            public function issetLinkToGroup($idProject,$idStyle,$idInside,$idGroup){
                
                
            $req = $this->thisDesign->prepare(
                    " SELECT * "
                  . " FROM  link_to_group as lg ,groupe as g "                   
                  . " WHERE lg.id_to_project = ? "
                  . " AND lg.id_to_style = ? "
                  . " AND lg.id_to_inside = ? "
                  . " AND lg.id_to_group= ? "
                  . " AND lg.id_to_groupFormat = '4' "
                  );
            $req->execute([$idProject,$idStyle,$idInside,$idGroup]);
            $read = $req->fetch();
            if($read!== false){
                return $read->id_link_group;
            }else{
                return false;
            }
                
            }
            
            
    public function insertlinkToGroup($idProject,$idStyle,$idInside,$idGroup,$thisPos,$idFormat){

 
                    //On check la position la plus haute.
                
                if($thisPos === false){
                $newPos =$this->hightPos($idInside,$idStyle);  
                $R['ajoutinterne'] = $newPos;
                }else{ $newPos = $thisPos+1; 
                
                //Le nouveau group est inserer entre deux réincremente des groupes suivants
                //find Twin posiition
                
                //On recherche dans la feuille de style et le inside group aisin que la position transmise
                
                
                $findTwinPos = $this->thisDesign->prepare(
                    " SELECT id_link_group,posGroup "
                  . " FROM  link_to_group as lg "                   
                  . " WHERE lg.id_to_project = ? "
                  . " AND   lg.id_to_style = ? "
                  . " AND   lg.id_to_inside = ? "
                  . " AND   lg.posGroup > ? "
                  );

                $findTwinPos->execute([$idProject,$idStyle,$idInside,$thisPos]);
                $read = $findTwinPos->fetchall();
                
                //et on reincrement les link_to_group_concerner
                
                    foreach ($read as $k => $v) {                        
                        
                        $thisLinkTo   = $v->id_link_group;
                        $thisPosGroup = $v->posGroup;
                        $changePos  =$thisPosGroup+1;
                        
                        $this->thisDesign->prepare("UPDATE link_to_group "
                                 . "SET posGroup = ? "
                                 . "WHERE id_link_group = ? "
                        )->execute([$changePos,$thisLinkTo]);                         

                    }                
                
                }
               
                    $reqL = $this->thisDesign->prepare("INSERT INTO link_to_group"
                            . "(id_to_project, id_to_style, posGroup, id_to_inside, id_to_group , id_to_groupFormat  , actif) "
                            . " VALUES (?,?,?,?,?,?,'1') ");

                    $reqL->execute([$idProject,$idStyle,$newPos,$idInside,$idGroup,$idFormat]); 

                    return $this->thisDesign->lastInsertId();
              

     } 
     
      public function readlinkToGroup($thisId){
          
             $findTwinPos = $this->thisDesign->prepare(
                    " SELECT * "
                  . " FROM  link_to_group as lg "                   
                  . " WHERE lg.id_link_group = ? "               
                  );

                $findTwinPos->execute([$thisId]);
                $read = $findTwinPos->fetch();
                
                if($read!== false){
                return $read;
                }else{
                    return false;
                }
          
      }
      
      public function countGroupToLink($thisId){
          
          
           $findTwinPos = $this->thisDesign->prepare(
                    " SELECT * "
                  . " FROM  link_to_group as lg "                   
                  . " WHERE lg.id_to_group = ? "               
                  );

                $findTwinPos->execute([$thisId]);
                $read = $findTwinPos->fetchAll();
                
                if($read!== false){
                return $read;
                }else{
                    return false;
                }
          
      }
      
      
       public function updateGroup($newData,$thisIdGroup){
           
             $this->thisDesign->prepare("UPDATE groupe "
                                 . "SET groupName = ?"
                                 . "WHERE idGroup = ?  "
                               
            )->execute([$newData,$thisIdGroup]);   
           
           
       }
       
       
       public function updateGroupIdToLink($majID,$idLink){
           
             $this->thisDesign->prepare("UPDATE link_to_group "
                                 . "SET id_to_group = ?"
                                 . "WHERE id_link_group = ?  "
                               
            )->execute([$majID,$idLink]);   
           
           
       }
       
       
       public function AllChildGroup($params){                 

                        $req = $this->thisDesign->prepare(
                           "SELECT * "
                         . "FROM   link_to_group as l "                                 
                         . "WHERE l.id_to_inside = ? "                   
                         . "ORDER BY l.id_link_group ASC ");  
                        $req->execute([$params]);
                        $read = $req->fetchAll();

                        if($read!==false){  $result = $read ;}else{  $result = false; }
                        return $result;
                }
      
   
     
     public function delGroup($thisIdLink){
         
         
         //Ajouter le reincremente du des group au niveau de celui supprimer
         
         $cycle=false;         
         //on recupere l'id du groupe avant la suppression
            
            $read = $this->readlinkToGroup($thisIdLink);
            if($read!==false){
                $idGroup = $read->id_to_group;
                $format = $read->id_to_groupFormat;
                $inside = $read->id_to_inside;
            }
         //Onrec   
         if($this->AllChildGroup($thisIdLink) !== false){ 
             //Work on doit recuperer tous les enfants
             
             $thisChildId = $this->AllChildGroup($thisIdLink);  
             $cycle = true;
         } 
         //On supprime le link_to_group           
            
            $delLink = $this->thisDesign->prepare(
                            "DELETE FROM link_to_group WHERE id_link_group = ?"                             
                        ); 
            $delLink->execute([$thisIdLink]);           
         
         //On supprime le group qu si il n'est encore associer à une linkToRule
         
          $ifGroupToLink = $this->thisDesign->prepare(
                    " SELECT * "
                  . " FROM  link_to_group as lg "                   
                  . " WHERE lg.id_to_group = ? "               
                  );
          
            //work
          
            if(isset($idGroup)){
                $ifGroupToLink->execute([$idGroup]);
                $readGroup = $ifGroupToLink->fetch();
                
                if($readGroup===false){                    
                    $delGroup = $this->thisDesign->prepare(
                            "DELETE FROM groupe WHERE idGroup = ?"                             
                        ); 
                    $delGroup->execute([$idGroup]); 
                }            
         
        if($format === '4'){
            
         //Si format   ruleHtml
         //On supprime les rules
             
        $delLink = $this->thisDesign->prepare("DELETE FROM link_to_rule WHERE id_to_link = ?"); 
        $delLink->execute([$thisIdLink]);
      
        }
            }           
         
            //increment 
           if($read!==false){ 
            $this->incThisInside($inside);
           }
            
        if($cycle===true){
            
            foreach ($thisChildId as $key => $value) {                
                    $this->delGroup($value->id_link_group);
            }             
         }  
     }
     
    public function incThisInside($inside){
         
                $forIncInside = $this->thisDesign->prepare(
                    " SELECT id_link_group "
                  . " FROM  link_to_group as lg "                   
                  . " WHERE lg.id_to_inside = ? "               
                  . " ORDER BY posGroup "               
                );
                
                $forIncInside->execute([$inside]);
                $readInc = $forIncInside->fetchAll();
                
                
                if($readInc !== false){
                        $inc = 0;
                        foreach ($readInc as $key => $value) {

                              $thisId = $value->id_link_group;
                              $this->thisDesign->prepare("UPDATE link_to_group "
                                           . "SET posGroup = ?"
                                           . "WHERE id_link_group = ?  "
                              )->execute([$inc,$thisId]);  
                         $inc++;
                        }
                }
          
         
     }
            
     public function enableORdisableGroup($thisId,$state){
         
         //On lit la ligne idlinkgroup
                //On recupère actif.
                //si passe à 1 //si 0 passe à 1                
                //on verifie si des enfants                 
                //et on reboucle
                
                
                if($this->readLinkToGroup($thisId)!== false){                    
                    
                    $dataLink = $this->readLinkToGroup($thisId);
                    if($state === 1){  
                        
                        //On desactive.
                        
                        $this->thisDesign->prepare("UPDATE link_to_group "
                                     . "SET actif = ?"
                                     . "WHERE id_link_group = ?  "
                        )->execute([0,$thisId]); 
                        
                        //On desactive toutes les rules correspondante
                        
                        
                        if($dataLink->id_to_groupFormat === '4'){
                            
                            
                        $this->thisDesign->prepare("UPDATE link_to_rule "
                                     . "SET actif = ?"
                                     . "WHERE id_to_link = ?  "
                        )->execute([0,$thisId]);   
                            
                            
                        }
                        
                        
                        
                        
                    }else if($state === 0){
                        
                        //On active.
                        
                        $this->thisDesign->prepare("UPDATE link_to_group "
                                     . "SET actif = ?"
                                     . "WHERE id_link_group = ?  "
                        )->execute([1,$thisId]);   
                        
                        //On active toutes les rules correspondante
                        
                        if($dataLink->id_to_groupFormat === '4'){
                             
                            $this->thisDesign->prepare("UPDATE link_to_rule "
                                         . "SET actif = ?"
                                         . "WHERE id_to_link = ?  "
                            )->execute([1,$thisId]);                              
                            
                        }
                        
                        
                    }
                    
                    if($this->AllChildGroup($thisId) !== false){ 
                        //Work on doit recuperer tous les enfants

                        $thisChildId = $this->AllChildGroup($thisId);  
                   
            
                        foreach ($thisChildId as $key => $value) {                
                                $this->enableORdisableGroup($value->id_link_group,$state);
                        }             
                    }  
                    
                } 
         
     }
            

            
     ///Rule       
            public function readRule($params){
           
            $req = $this->thisDesign->prepare("SELECT id_linkRule,id_to_rule,id_to_css,"
                            . " posRule, rule,kit,def,id_to_format,css,types,important,actif  "
                            . " FROM  link_to_rule as lr, rule as r , css as c ,type as t "                                 
                            . " WHERE lr.id_to_link = ?  "
                            . " AND lr.id_to_rule = r.idRule "
                            . " AND lr.id_to_css = c.idCss  "
                            . " AND r.id_to_format = t.idType "
                            . " ORDER BY lr.posRule ASC "
                    );
             
                $req->execute([$params]);
                $read = $req->fetchAll();
            
            if($read!==false){  $result = $read;                
                
            }else{  $result = false; }
            
            return $result;
            
            } 
            
            
            
            public function issetLinkToRule($idToGroup, $idRule){
           
            $req = $this->thisDesign->prepare("SELECT *"
                            . " FROM  link_to_rule as lr"                                 
                            . " WHERE lr.id_to_link = ?  "                        
                            . " AND lr.id_to_rule= ?  "                        
            );
             
                $req->execute([$idToGroup,$idRule]);
                $read = $req->fetch();
            
            if($read !== false){  $result = $read->id_linkRule;                
                
            }else{  $result = false; }
            
            return $result;
            
            } 
            
            public function findIdRule($name){
           
            $req = $this->thisDesign->prepare("SELECT *"
                            . " FROM  rule as r "                                 
                            . " WHERE rule = ?  "   
            );
             
                $req->execute([$name]);
                $read = $req->fetch();
            
            if($read){  $result = $read->idRule;                
                
            }else{  $result = false; }
            
            return $result;
            
            } 
            
            
    public function createLinkToRule($idToLinkGroup,$idRule,$idCss,$position){

          $reqL = $this->thisDesign->prepare("INSERT INTO  link_to_rule"
                . "(id_to_link,id_to_rule,id_to_css,posRule,actif,important) "
                . " VALUES (?,?,?,?,?,?) ");

        $reqL->execute([$idToLinkGroup,$idRule,$idCss,$position,1,0]);  


    return $this->thisDesign->lastInsertId();
    }
    
    
        public function delLinkToRule($thisDel){
            
            $delRule = $this->thisDesign->prepare(
                            "DELETE FROM link_to_rule WHERE id_linkRule = ?"                             
                        ); 
            $delRule->execute([$thisDel]);
            
 
        }
  
    //CSS
           public function issetCss($ajax){
           
            $req = $this->thisDesign->prepare("SELECT *"
                            . " FROM  css "                                 
                            . " WHERE css = ?  "                        
            );             
                $req->execute([$ajax]);
                $read = $req->fetch();
            
            if($read!==false){  $result = $read->idCss; }
            else{  $result = false; }            
            return $result;            
            } 
            
            
        public function createCss($ajax){

          $reqL = $this->thisDesign->prepare("INSERT INTO  css"
                . "(css)  VALUES (?) ");

        $reqL->execute([$ajax]); 

        return $this->thisDesign->lastInsertId();
        }
        
        
        public function updateIdToCss($idToLinkGroup,$idRule,$idCss){

          $this->thisDesign->prepare("UPDATE link_to_rule "
                                 . "SET id_to_css = ?"
                                 . "WHERE id_to_link = ?  "
                                 . "AND id_to_rule= ?  "
                               
            )->execute([$idCss,$idToLinkGroup,$idRule]);                
    
        }
        
        
        public function enableORdisableRule($idCss){
               
             $checkStatut = $this->thisDesign->prepare("SELECT actif "
                            ." FROM link_to_rule WHERE id_linkRule = ? "                              
                );            
                $checkStatut->execute([$idCss]);
                $readRule = $checkStatut->fetch();
            if($readRule !== false){
                
                  $state = $readRule->actif;
                    
                    if($state === '1' ){                        
                        //On passe à 0 
                        $newState = 0;
                    }else if($state === '0'){                        
                         //On passe à 1    
                        $newState = 1;
                    }
                    
                     $this->thisDesign->prepare("UPDATE link_to_rule "
                                 . "SET actif = ?"
                                 . "WHERE id_linkRule = ?  "
                    )->execute([$newState,$idCss]);
                
            }
    
        }
        
         public function importantCss($idCss){

                $checkImportant = $this->thisDesign->prepare("SELECT * "
                            ." FROM link_to_rule WHERE id_linkRule = ? "                              
                );            
                $checkImportant->execute([$idCss]);
                $readRule = $checkImportant->fetch();
                
                if($readRule !== false){
                    
                    $state = $readRule->important;
                    
                    if($state === '1' ){                        
                        //On passe à 0 
                        $newState = 0;
                    }else if($state === '0'){                        
                         //On passe à 1    
                        $newState = 1;
                    }
                    
                    $this->thisDesign->prepare("UPDATE link_to_rule "
                                 . "SET important = ?"
                                 . "WHERE id_linkRule = ?  "
                    )->execute([$newState,$idCss]); 
                    
                }
                
             
        }
        
        
        public function delOrphanRule(){

            $req = $this->thisDesign->prepare("SELECT idCss"
                        . " FROM  css "                              
            );             
            $req->execute();
            $read = $req->fetchAll();  

            foreach ($read as $k => $v) {

                $thisCss = $v->idCss;

                $checkRule = $this->thisDesign->prepare("SELECT * "
                            ." FROM link_to_rule WHERE id_to_css = ? "                              
                ); 

                $checkRule->execute([$thisCss]);
                $rule = $checkRule->fetchAll();

                    if(count($rule)===0){

                        $delRule = $this->thisDesign->prepare(
                            "DELETE FROM css WHERE idCss = ?"                             
                        ); 
                        $delRule->execute([$thisCss]);

                    }

            }  
        }

  
                             
    // Get all data        
            public function getDataProject($entryPoint,$dir){
                $R=array();
                
                if($this->readProject('WHERE idProject = ?',$entryPoint)!== false){
                    
                    
                    $readProject = $this->readProject('WHERE  idProject = ?',$entryPoint);            
                    $R['thisProject'] = $readProject;
                    
                       // on check les feuilles de styles
                    
                    $this->checkDirProject($dir,$readProject->project);
                    
                        if($this->readStyle($entryPoint)!==false){                         
                       
                            $result = $this->readStyle($entryPoint);
                            foreach($result as $keyStyle => $style){ 
                            $R['style'][$keyStyle]['idSheet'] = $style->idSheet;
                            $R['style'][$keyStyle]['sheet'] = $style->sheet;                          
                            
                            //A partir de la on ce scinde en deux parties
                            // les coordonées qui son inclue dans un groupe 
                            // et celle qui ne le sont pas
                            
                            //Les groupes
                            //level 0
                            
                            if($this->readGroup(0,$style->idSheet)!==false){                                 
                       
                                $readGroup = $this->readGroup(0,$style->idSheet);
                                foreach($readGroup as $keyGroup => $group){ 

                                    //On stock
                                      $R['style'][$keyStyle]['group'][$keyGroup]['idGroup'] = $group->idGroup;
                                      $R['style'][$keyStyle]['group'][$keyGroup]['idToGroup'] = $group->id_link_group;
                                      $R['style'][$keyStyle]['group'][$keyGroup]['groupName'] = $group->groupName;
                                      $R['style'][$keyStyle]['group'][$keyGroup]['format'] = $group->format;
                                      $R['style'][$keyStyle]['group'][$keyGroup]['position'] = $group->posGroup;
                                      $R['style'][$keyStyle]['group'][$keyGroup]['actif'] = $group->actif;
                                      $R['style'][$keyStyle]['group'][$keyGroup]['level'] = 1;
                                      $R['style'][$keyStyle]['group'][$keyGroup]['myParent'] = 0;
                                             
                                        
                                           if($group->format === 'ruleHtml'){
                                            //Gestion des rules associer
                                            if($this->readRule( $group->id_link_group)!==false){ 
                                                $R['style'][$keyStyle]['group'][$keyGroup]['isrule'] = true;
                                                    $readRuleTo =  $this->readRule( $group->id_link_group);
                                                    
                                                    /// on ajoute les valeurs
                
                                                    foreach ($readRuleTo as $keyRuleTo => $ruleTo) {  
                                                         
                                                         $R['style'][$keyStyle]['group'][$keyGroup]['rule'][$keyRuleTo] = $ruleTo;
                                                       
                                                   }
                               
                                            }
                                            }
                                      
                                     
                                           //gestion des sousGroup level 1
                                    if($this->haveAchildGroup($entryPoint,$style->idSheet,$group->id_link_group)!==false){ 
                                        $R['style'][$keyStyle]['group'][$keyGroup]['child'] = true;

                                        //on lit le level 1
                                         if($this->readGroup($group->id_link_group,$style->idSheet)!==false){  
                                                  $readGroupLevelOne = $this->readGroup($group->id_link_group,$style->idSheet);
                                                 
                                                       //
                                                    foreach($readGroupLevelOne as $keyLevelOne => $levelOne){                                                        
                                                
                                                        $R['style'][$keyStyle]['group'][$keyGroup]['group'][$keyLevelOne]['idGroup'] = $levelOne->idGroup;
                                                        $R['style'][$keyStyle]['group'][$keyGroup]['group'][$keyLevelOne]['idToGroup'] = $levelOne->id_link_group;                                                        
                                                        $R['style'][$keyStyle]['group'][$keyGroup]['group'][$keyLevelOne]['groupName']    = $levelOne->groupName;
                                                        $R['style'][$keyStyle]['group'][$keyGroup]['group'][$keyLevelOne]['format']  = $levelOne->format;
                                                        $R['style'][$keyStyle]['group'][$keyGroup]['group'][$keyLevelOne]['position']  = $levelOne->posGroup;
                                                        $R['style'][$keyStyle]['group'][$keyGroup]['group'][$keyLevelOne]['actif']  = $levelOne->actif;
                                                        $R['style'][$keyStyle]['group'][$keyGroup]['group'][$keyLevelOne]['level']  = 2;
                                                        
                                                        $R['style'][$keyStyle]['group'][$keyGroup]['group'][$keyLevelOne]['myParent']  = $R['style'][$keyStyle]['group'][$keyGroup]['idToGroup'];
                                                        
                                                               if($levelOne->format === 'ruleHtml'){
                                                                //Gestion des rules associer  
                                                                if($this->readRule( $levelOne->id_link_group)!==false){                                                                     
                                                                    $R['style'][$keyStyle]['group'][$keyGroup]['group'][$keyLevelOne]['isrule'] = true;
                                                                        $readRuleToOne =  $this->readRule( $levelOne->id_link_group);

                                                                        /// on ajoute les valeurs

                                                                        foreach ($readRuleToOne as $keyRuleToOne => $ruleToOne) {  

                                                                             $R['style'][$keyStyle]['group'][$keyGroup]['group'][$keyLevelOne]['rule'][$keyRuleToOne] = $ruleToOne;

                                                                       }

                                                                }
                                                                }
                                                    
                                                        
                                                        
                                                        
                                                        if($this->haveAchildGroup($entryPoint,$style->idSheet,$levelOne->id_link_group)!==false){ 
                                                            $R['style'][$keyStyle]['group'][$keyGroup]['group'][$keyLevelOne]['child'] = true;
                                                            //on lit le level 2
                                                             if($this->readGroup($levelOne->id_link_group,$style->idSheet)!==false){                         

                                                             $readGroupLevelTwo = $this->readGroup($levelOne->id_link_group,$style->idSheet);

                                                                   //
                                                                foreach($readGroupLevelTwo as $keyLevelTwo => $levelTwo){                                                        

                                                                    $R['style'][$keyStyle]['group'][$keyGroup]['group'][$keyLevelOne]['group'][$keyLevelTwo]['idGroup'] = $levelTwo->idGroup;
                                                                    $R['style'][$keyStyle]['group'][$keyGroup]['group'][$keyLevelOne]['group'][$keyLevelTwo]['idToGroup'] = $levelTwo->id_link_group;
                                                                    $R['style'][$keyStyle]['group'][$keyGroup]['group'][$keyLevelOne]['group'][$keyLevelTwo]['groupName']    = $levelTwo->groupName;
                                                                    $R['style'][$keyStyle]['group'][$keyGroup]['group'][$keyLevelOne]['group'][$keyLevelTwo]['format']  = $levelTwo->format;
                                                                    $R['style'][$keyStyle]['group'][$keyGroup]['group'][$keyLevelOne]['group'][$keyLevelTwo]['position']  = $levelTwo->posGroup;
                                                                    $R['style'][$keyStyle]['group'][$keyGroup]['group'][$keyLevelOne]['group'][$keyLevelTwo]['actif']  = $levelTwo->actif;
                                                                    $R['style'][$keyStyle]['group'][$keyGroup]['group'][$keyLevelOne]['group'][$keyLevelTwo]['level']  = 3;
                                                                    
                                                                    $R['style'][$keyStyle]['group'][$keyGroup]['group'][$keyLevelOne]['group'][$keyLevelTwo]['myParent']  = $R['style'][$keyStyle]['group'][$keyGroup]['group'][$keyLevelOne]['idToGroup'];
                                                                         
                                                                        
                                                                    
                                                                                        if($levelTwo->format === 'ruleHtml'){
                                                                                        //Gestion des rules associer  
                                                                                        if($this->readRule( $levelTwo->id_link_group)!==false){ 
                                                                                            $R['style'][$keyStyle]['group'][$keyGroup]['group'][$keyLevelOne]['group'][$keyLevelTwo]['isrule'] =true; 
                                                                                                $readRuleToTwo =  $this->readRule( $levelTwo->id_link_group);

                                                                                                /// on ajoute les valeurs

                                                                                                foreach ($readRuleToTwo as $keyRuleToTwo => $ruleToTwo) {  

                                                                                                     $R['style'][$keyStyle]['group'][$keyGroup]['group'][$keyLevelOne]['group'][$keyLevelTwo]['rule'][$keyRuleToTwo] = $ruleToTwo;

                                                                                               }

                                                                                        }
                                                                                        }
                                                                            
                                                                           //gestion des sousGroup level 3
                                                                        if($this->haveAchildGroup($entryPoint,$style->idSheet,$levelTwo->id_link_group)!==false){ 
                                                                            $R['style'][$keyStyle]['group'][$keyGroup]['group'][$keyLevelOne]['group'][$keyLevelTwo]['child'] = true;
                                                                            //on lit le level 3
                                                                             if($this->readGroup($levelTwo->id_link_group,$style->idSheet)!==false){                         

                                                                             $readGroupLevelThree = $this->readGroup($levelTwo->id_link_group,$style->idSheet);

                                                                                   //
                                                                                foreach($readGroupLevelThree as $keyLevelThree => $levelThree){                                                        

                                                                                    $R['style'][$keyStyle]['group'][$keyGroup]['group'][$keyLevelOne]['group'][$keyLevelTwo]['group'][$keyLevelThree]['idGroup'] = $levelThree->idGroup;
                                                                                    $R['style'][$keyStyle]['group'][$keyGroup]['group'][$keyLevelOne]['group'][$keyLevelTwo]['group'][$keyLevelThree]['idToGroup'] = $levelThree->id_link_group;
                                                                                    $R['style'][$keyStyle]['group'][$keyGroup]['group'][$keyLevelOne]['group'][$keyLevelTwo]['group'][$keyLevelThree]['groupName']    = $levelThree->groupName;
                                                                                    $R['style'][$keyStyle]['group'][$keyGroup]['group'][$keyLevelOne]['group'][$keyLevelTwo]['group'][$keyLevelThree]['format']  = $levelThree->format;
                                                                                    $R['style'][$keyStyle]['group'][$keyGroup]['group'][$keyLevelOne]['group'][$keyLevelTwo]['group'][$keyLevelThree]['position']  = $levelThree->posGroup;
                                                                                    $R['style'][$keyStyle]['group'][$keyGroup]['group'][$keyLevelOne]['group'][$keyLevelTwo]['group'][$keyLevelThree]['actif']  = $levelThree->actif;
                                                                                    $R['style'][$keyStyle]['group'][$keyGroup]['group'][$keyLevelOne]['group'][$keyLevelTwo]['group'][$keyLevelThree]['level']  = 4;
                                                                                    
                                                                                    $R['style'][$keyStyle]['group'][$keyGroup]['group'][$keyLevelOne]['group'][$keyLevelTwo]['group'][$keyLevelThree]['myParent']  = $R['style'][$keyStyle]['group'][$keyGroup]['group'][$keyLevelOne]['group'][$keyLevelTwo]['idToGroup'];
                                                                                    $R['style'][$keyStyle]['group'][$keyGroup]['group'][$keyLevelOne]['group'][$keyLevelTwo]['group'][$keyLevelThree]['child']  = false;
                                                                                 
                                                                                       if($levelThree->format === 'ruleHtml'){
                                                                                        //Gestion des rules associer  
                                                                                        if($this->readRule( $levelThree->id_link_group)!==false){ 
                                                                                            $R['style'][$keyStyle]['group'][$keyGroup]['group'][$keyLevelOne]['group'][$keyLevelTwo]['group'][$keyLevelThree]['isrule'] = true;
                                                                                                $readRuleToThree =  $this->readRule( $levelThree->id_link_group);

                                                                                                /// on ajoute les valeurs

                                                                                                foreach ($readRuleToThree as $keyRuleToThree => $ruleToThree) {  

                                                                                                     $R['style'][$keyStyle]['group'][$keyGroup]['group'][$keyLevelOne]['group'][$keyLevelTwo]['group'][$keyLevelThree]['rule'][$keyRuleToThree] = $ruleToThree;

                                                                                               }

                                                                                        }
                                                                                        }
                                              
                                                                                }
                                                                        
                                                                            }
                                                                            
                                                                            }else{  $R['style'][$keyStyle]['group'][$keyGroup]['group'][$keyLevelOne]['group'][$keyLevelTwo]['group'] = false; }
                                                                }
                                                             
                                                            }
                                                        
                                                        }else{$R['style'][$keyStyle]['group'][$keyGroup]['group'][$keyLevelOne]['child'] = false;}
                                                                        
                                                    }
                                         }
                                    }else{   $R['style'][$keyStyle]['group'][$keyGroup]['child'] = false;} 

                            }
                            
                            }// Fin de la condition sur les groupes Level 0
                        
                    
                            
                                    
                                    
                            }
                    
                        }
                    
                }else{ $R =false;}
                
                
                ///INSERT ALL biblio                
         
             
                $checkMulti = $this->thisDesign->prepare("SELECT DISTINCT css,def,rule,types,kit "
                                 . " FROM  rule as r, type as t, link_to_rule as l,css as c,link_to_group as lg "                                 
                                 . " WHERE r.rule= 'background-image' "                  
                                 . " AND r.id_to_format = t.idType"
                                 . " AND l.id_to_rule = r.idRule"
                                 . " AND l.id_to_css = c.idCss"
                                 . " AND l.id_to_link = lg.id_link_group"
                                 . " AND lg.id_to_project =  ? "                             
                ); 

                $checkMulti->execute([$entryPoint]);
             
                $R['biblio']['multiBack'] = $checkMulti->fetchall(PDO::FETCH_OBJ);
                
                /*All multi none this project*/
                
                $checkMulti = $this->thisDesign->prepare("SELECT DISTINCT css,def,rule,types,kit "
                                 . " FROM  rule as r, type as t, link_to_rule as l,css as c,link_to_group as lg "                                 
                                 . " WHERE r.rule= 'background-image' "                  
                                 . " AND r.id_to_format = t.idType"
                                 . " AND l.id_to_rule = r.idRule"
                                 . " AND l.id_to_css = c.idCss"
                                 . " AND l.id_to_link = lg.id_link_group"
                                 . " AND lg.id_to_project !=  ? "                             
                ); 

                $checkMulti->execute([$entryPoint]);
             
                $R['biblioAll']['multiBack'] = $checkMulti->fetchall(PDO::FETCH_OBJ);
                
                /*******************************************/
                
                        $checkBack = $this->thisDesign->prepare("SELECT DISTINCT css,def,rule,types,kit "
                                         . " FROM  rule as r, type as t, link_to_rule as l,css as c,link_to_group as lg "                                 
                                         . " WHERE r.rule= 'background-color' "                  
                                         . " AND r.id_to_format = t.idType"
                                         . " AND l.id_to_rule = r.idRule"
                                         . " AND l.id_to_css = c.idCss"
                                         . " AND l.id_to_link = lg.id_link_group"
                                         . " AND lg.id_to_project =  ? "                             
                        ); 

                        $checkBack->execute([$entryPoint]);

                        $R['biblio']['background'] = $checkBack->fetchall(PDO::FETCH_OBJ);


                        /*All Background none this project*/

                        $checkBack = $this->thisDesign->prepare("SELECT DISTINCT css,def,rule,types,kit "
                                         . " FROM  rule as r, type as t, link_to_rule as l,css as c,link_to_group as lg "                                 
                                         . " WHERE r.rule= 'background-color' "                  
                                         . " AND r.id_to_format = t.idType"
                                         . " AND l.id_to_rule = r.idRule"
                                         . " AND l.id_to_css = c.idCss"
                                         . " AND l.id_to_link = lg.id_link_group"
                                         . " AND lg.id_to_project !=  ? "                             
                        ); 

                        $checkBack->execute([$entryPoint]);

                        $R['biblioAll']['background'] = $checkBack->fetchall(PDO::FETCH_OBJ);

                        /**/
                
                $checkMulti = $this->thisDesign->prepare("SELECT DISTINCT css,def,rule,types,kit "
                                 . " FROM  rule as r, type as t, link_to_rule as l,css as c,link_to_group as lg "                                 
                                 . " WHERE r.rule= 'color' "                  
                                 . " AND r.id_to_format = t.idType"
                                 . " AND l.id_to_rule = r.idRule"
                                 . " AND l.id_to_css = c.idCss"
                                 . " AND l.id_to_link = lg.id_link_group"
                                 . " AND lg.id_to_project =  ? "                             
                ); 

                $checkMulti->execute([$entryPoint]);             
                $R['biblio']['color'] = $checkMulti->fetchall(PDO::FETCH_OBJ);
                
                 /*All Color none this project*/
                
                $checkMulti = $this->thisDesign->prepare("SELECT DISTINCT css,def,rule,types,kit "
                                 . " FROM  rule as r, type as t, link_to_rule as l,css as c,link_to_group as lg "                                 
                                 . " WHERE r.rule= 'color' "                  
                                 . " AND r.id_to_format = t.idType"
                                 . " AND l.id_to_rule = r.idRule"
                                 . " AND l.id_to_css = c.idCss"
                                 . " AND l.id_to_link = lg.id_link_group"
                                 . " AND lg.id_to_project !=  ? "                             
                ); 

                $checkMulti->execute([$entryPoint]);
             
                $R['biblioAll']['color'] = $checkMulti->fetchall(PDO::FETCH_OBJ);
                
                
                /**/
               
                    $findResetCss = $this->thisDesign->prepare(
                     "SELECT rule, kit, def, id_to_format FROM  rule  "
                       );            
                $findResetCss->execute();
                $readResetCss = $findResetCss->fetchall(PDO::FETCH_OBJ);
                $R['kit'] = $readResetCss;
                
                return $R;
                
                
                
                
            }    
    
    
    
            
            
            
            
            
            
    
            
                  
    /// utilitaire    

    public function lastInsertId(){
        return $this->thisDesign->lastInsertId();
    }
    
        //Positionnement   
    
    
        
     public function hightPos($group,$style){
                
               $req = $this->thisDesign->prepare(
                       "SELECT posGroup "
                     . "FROM link_to_group "
                     . "WHERE id_to_inside = ? "
                     . "AND id_to_style = ? "
                     . "ORDER BY posGroup DESC"
                       );            
               $req->execute([$group,$style]);
                $read = $req->fetch();
            
                if(isset($read->posGroup)){ 
                    $result = $read->posGroup + 1 ;               
                }else{
                    $result = 0;
                }
                return $result;
             
            }
     public function maxPos($inside,$style){
                
               $req = $this->thisDesign->prepare(
                       "SELECT MAX(posGroup) as posGroup "
                     . "FROM link_to_group "
                     . "WHERE id_to_inside = ? "
                     . "AND id_to_style = ? "
                       );            
                $req->execute([$inside,$style]);
                $read = $req->fetch();
            
                if(isset($read->posGroup)){ 
                    $result = $read->posGroup+1;               
                }else{
                    $result = 0;
                }
                return $result;
             
            }
            
                public function maxPosRule($inside){
                
               $req = $this->thisDesign->prepare(
                       "SELECT MAX(posRule) as posRule "
                     . "FROM link_to_rule "
                     . "WHERE id_to_link = ? "
                       );            
                $req->execute([$inside]);
                $read = $req->fetch();
            
                if(isset($read->posRule)){ 
                    $result = $read->posRule+1;               
                }else{
                    $result = 0;
                }
                return $result;
             
            }
            
     public function updateGroupPosition($T){
         
         
         $method    = $T['method']; //single or multi
         $job       = $T['job'];    //thisAndlower or thisAndUpper
         $out       = $T['out'];
         $deposit   = $T['deposit'];
         $newPos    = $T['newPos'];
         $thisId    = $T['thisId'];
         $idSheet   = $T['idSheet'];
         $idProject = $T['id'];
         
         
         
        $this->thisDesign->prepare("UPDATE link_to_group "
                                   . "SET posGroup = ?, id_to_inside = ?  "
                                   . "WHERE id_link_group = ?  "
                                   . "AND id_to_style = ? "
                                   . "AND id_to_project = ? "
        )->execute([$newPos,$deposit,$thisId,$idSheet,$idProject]);  

       
            if($job === 'thisAndLower'){           

                $req = $this->thisDesign->prepare(
                       "SELECT posGroup,id_link_group "
                     . "FROM link_to_group "
                     . "WHERE id_to_project = ? "
                     . "AND id_to_style = ? "
                     . "AND id_to_inside = ? "
                     . "AND id_link_group != ? "
                     . "AND posGroup <= ? "
                     . "ORDER BY  posGroup "
                       );            
                $req->execute([$idProject,$idSheet,$out,$thisId,$newPos]);
                $read = $req->fetchAll();

                 // Le group vient de prendre la position la plus haute de l'arbre 
                //On reincremente 
                    $start = 0;
                foreach ($read as $key => $value){

                   $thisIncId = $value->id_link_group;                       
                      $this->thisDesign->prepare("UPDATE link_to_group "
                               . "SET posGroup = ? "
                               . "WHERE id_link_group = ?  "                               
                     )->execute([$start,$thisIncId]);                        
                   $start++;
                }

            }else if($job === 'thisAndUpper'){
                
                  $req = $this->thisDesign->prepare(
                       "SELECT posGroup,id_link_group "
                     . "FROM link_to_group "
                     . "WHERE id_to_project = ? "
                     . "AND id_to_style = ? "
                     . "AND id_to_inside = ? "
                     . "AND id_link_group != ? "
                     . "AND posGroup >= ? "
                     . "ORDER BY  posGroup "
                          
                       );            
                $req->execute([$idProject,$idSheet,$deposit,$thisId,$newPos]);
                $read2 = $req->fetchAll();

                 // Le group vient de prendre la position la plus haute de l'arbre 
                //On reincremente 
                $start = $newPos+1;
                foreach ($read2 as $key => $value){

                   $thisIncId = $value->id_link_group;                       
                      $this->thisDesign->prepare("UPDATE link_to_group "
                               . "SET posGroup = ? "
                               . "WHERE id_link_group = ?  "                               
                     )->execute([$start,$thisIncId]);                        
                   $start++;
                }                
            }
       
            
            if($method === 'multi'){
                
                
                   $req = $this->thisDesign->prepare(
                       "SELECT posGroup,id_link_group "
                     . "FROM link_to_group "
                     . "WHERE id_to_project = ? "
                     . "AND id_to_style = ? "
                     . "AND id_to_inside = ? " 
                     . "ORDER BY  posGroup "                 
                       );            
                $req->execute([$idProject,$idSheet,$out]);
                $read = $req->fetchAll();
                
                $start = 0;
                foreach ($read as $key => $value){

                   $thisIncId = $value->id_link_group;                       
                      $this->thisDesign->prepare("UPDATE link_to_group "
                               . "SET posGroup = ? "
                               . "WHERE id_link_group = ?  "                               
                     )->execute([$start,$thisIncId]);                        
                   $start++;
                }
                
                
                
                
            }
         
         
     }
   

}

class App{

    static $db = null;

    static function getDatabase($user,$pass,$base){
        if(!self::$db){
            self::$db = new dataBase($user,$pass,$base);
        }
        return self::$db;
    }

}


