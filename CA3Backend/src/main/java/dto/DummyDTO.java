/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dto;

import entity.Dummy;

/**
 *
 * @author Rasmus
 */
public class DummyDTO {
    public String fName, 
            lName,
            gender;
    public int id,
            age, 
            height, 
            IQ;

    public DummyDTO(String fName, String lName, String gender, int id, int age, int height, int IQ) {
        this.fName = fName;
        this.lName = lName;
        this.gender = gender;
        this.id = id;
        this.age = age;
        this.height = height;
        this.IQ = IQ;
    }
    
    public DummyDTO(Dummy d) {
        this.fName = d.getfName();
        this.lName = d.getlName();
        this.gender = d.getGender();
        this.id = d.getId();
        this.age = d.getAge();
        this.height = d.getHeight();
        this.IQ = d.getIQ();
    }
    
    

    
}
