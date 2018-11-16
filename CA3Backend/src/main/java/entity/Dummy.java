/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 *
 * @author adamlass
 */
@Entity
public class Dummy implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    private String fName;
    private String lName;
    private String gender;
    private int age;
    private int height;
    private int IQ;

    public Dummy() {
    }

    public Dummy(Integer id, String fName, String lName, String gender, int age, int height, int IQ) {
        this.id = id;
        this.fName = fName;
        this.lName = lName;
        this.gender = gender;
        this.age = age;
        this.height = height;
        this.IQ = IQ;
    }

    public Integer getId() {
        return id;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public String getfName() {
        return fName;
    }

    public String getlName() {
        return lName;
    }

    public String getGender() {
        return gender;
    }

    public int getAge() {
        return age;
    }

    public int getHeight() {
        return height;
    }

    public int getIQ() {
        return IQ;
    }
    
    
    
    
    
}
