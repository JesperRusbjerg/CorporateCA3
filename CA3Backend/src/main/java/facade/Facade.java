/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package facade;

import dto.PersonDTO;
import dto.RoleDTO;
import dto.UserDTO;
import entity.User;
import exceptions.NotFoundException;
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

    public List<UserDTO> getAllUsers() throws NotFoundException {
        EntityManager em = getEm();
        List<UserDTO> list;
        try {
            TypedQuery<UserDTO> tq = em.createQuery("Select new dto.UserDTO(u) from User u", UserDTO.class);
            list = tq.getResultList();
        }
        finally {
            em.close();
        }
        if(list.get(0) == null){
            throw new NotFoundException("No users could be found");
        }
        return list;
    }

    public UserDTO getUser(String email) throws NotFoundException {
        EntityManager em = getEm();
        User user = null;
        try {
            em.getTransaction().begin();
            user = em.find(User.class, email);
        }
        finally {
            em.close();
        }
        if(user == null){
            throw new NotFoundException("The user could not be found");
        }
        return new UserDTO(user);
    }
    
    public List<RoleDTO> getAllRoles() throws NotFoundException {
        EntityManager em = getEm();
        List<RoleDTO> list;
        try {
            TypedQuery<RoleDTO> tq = em.createQuery("Select new dto.RoleDTO(r) from Role r", RoleDTO.class);
            list = tq.getResultList();
        }
        finally {
            em.close();
        }
        if(list.get(0) == null){
            throw new NotFoundException("No roles could be found");
        }
        return list;
    }

    public static List<PersonDTO> SWAPI(int amount) {
        return null;
    }
}
