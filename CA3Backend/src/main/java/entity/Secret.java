/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author adamlass
 */
@Entity
public class Secret implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    private byte[] secret;
    
    @Temporal(TemporalType.DATE)
    private Date date;

    public Secret() {
    }
 
    public Long getId() {
        return id;
    }

    public Secret(Long id, byte[] secret) {
        this.id = id;
        this.secret = secret;
        this.date = new Date();
    }

    public byte[] getSecret() {
        return secret;
    }

    public Date getDate() {
        return date;
    }
    
    
}
