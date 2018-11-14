/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package facade;

import dto.PersonDTO;
import entity.User;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.TypedQuery;

/**
 *
 * @author adamlass
 */
public class Facade {

    EntityManagerFactory emf;

    public Facade(EntityManagerFactory emf) {
        this.emf = emf;
    }

    private EntityManager getEm() {
        return emf.createEntityManager();
    }

    public List<User> getAllUsers() {
        EntityManager em = getEm();
        try {
            TypedQuery<User> tq = em.createQuery("Select u from User u", User.class);
            return tq.getResultList();
        }
        finally {
            em.close();
        }
    }

    public User getUser(String email) {
        EntityManager em = getEm();
        try {
            em.getTransaction().begin();
            return null;
        }
        finally {

        }
    }

    public static List<PersonDTO> SWAPI(int amount) {
        return null;
    }
}
