/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dto;

/**
 *
 * @author adamlass
 */
public class PersonDTO {
    public String name, 
            hair_color, 
            skin_color, 
            eye_color,
            birth_year,
            height,
            mass,
            gender;

    public PersonDTO(String name, String hair_color, String skin_color, String eye_color, String birth_year, String height, String mass, String gender) {
        this.name = name;
        this.hair_color = hair_color;
        this.skin_color = skin_color;
        this.eye_color = eye_color;
        this.birth_year = birth_year;
        this.height = height;
        this.mass = mass;
        this.gender = gender;
    }
    

   
    
}
