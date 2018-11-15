/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dto;

/**
 *
 * @author Rasmus
 */
public class DummyDTO {
    public String fName, 
            lName,
            gender;
    public int age, 
            height, 
            IQ;

    public DummyDTO(String fName, String lName, String gender, int age, int height, int IQ) {
        this.fName = fName;
        this.lName = lName;
        this.gender = gender;
        this.age = age;
        this.height = height;
        this.IQ = IQ;
    }
}
