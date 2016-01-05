<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of AccountController
 *
 * @author raditya
 */
class AccountController extends CI_Controller {
    //put your code here
    public function __construct()
    {
        
        parent::__construct();
        
        $this->load->model('account_model');
        
    }
    
    public function index(){
        echo 'ok';
    }


    public function ExportApiKey(){
        
        $data['name'] = $this->input->post("name");
        $data['apikey'] = $this->input->post("apikey");
        
        $result = $this->account_model->add($data);
        
        $json['json'] = json_encode($result);
        
        
        $this->load->view('json_view',$json);
    }
}
?>