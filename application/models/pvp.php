<?php
class agent_model extends CI_Model{
    public function __construct()
    {
            parent::__construct();

            $this->load->database();
    }
    
    public function getlist($page=0,$limit=10)
    {
        $this->db->from('pvp');
        
        
        $this->db->select('*');
        $this->db->offset($page);
        return $this->db->limit($limit)->get()->result();
    }
    
    
    
    public function get($name){
        $this->db->from('pvp');
        $this->db->where('name',$name);
        
        $this->db->select('*');
        
        return $this->db->get()->row();
    }
    
    public function add($data){
        
       try {
           $this->db->insert('pvp',$data);
           $result['status'] = 1;
           
           $result['data'] = $data;
       } catch (Exception $exc) { 
           $result['status'] = 0;
           $result['error'] = "failed to save data";
           $result['detail'] = $exc->getMessage();
       }
       
       return $result;
    }
    
    public function edit($data,$name){
        try {
            $this->db->where('name',$name);
            $this->db->update('pvp',$data);
            $result['status'] = 1;
        } catch (Exception $exc) {
           $result['status'] = 0;
           $result['error'] = "failed to edit data";
           $result['detail'] = $exc->getMessage();
        }

        return $result;
    }
    
    public function delete($name){
        try {
            $this->db->delete('pvp', array('name' => $name)); 
            $result['status'] = 1;
        } catch (Exception $exc) {
            $result['status'] = 0;
           $result['error'] = "gagal mengubah data agent";
           $result['detail'] = $exc->getMessage();
        }

        return $result;
    }
    
    
    
    
}
?>
