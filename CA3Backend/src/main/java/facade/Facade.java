/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package facade;

import callable.SWAPICallable;
import dto.PersonDTO;
import java.lang.management.ManagementFactory;
import java.lang.management.ThreadMXBean;
import java.util.ArrayList;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import dto.RoleDTO;
import dto.UserDTO;
import entity.Role;
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

    public List<PersonDTO> SWAPI(int amount) throws Exception {
        List<PersonDTO> res = new ArrayList<>();

        //Setting up Executor service with thread amount equal to system cores
        ThreadMXBean bean = ManagementFactory.getThreadMXBean();
        ExecutorService es = Executors.newFixedThreadPool(bean.getThreadCount());

        //Creating urls
        List<String> urls = new ArrayList<>();
        for (int i = 1; i <= amount; i++) {
            urls.add("https://swapi.co/api/people/" + i);
        }

        //Creating futures
        ArrayList<Future<PersonDTO>> futures = new ArrayList<>();
        for (String url : urls) {
            SWAPICallable callable = new SWAPICallable(url);
            futures.add(es.submit(callable));
        }

        //Getting responses from futures
        for (Future<PersonDTO> future : futures) {
            try {
                PersonDTO resp = future.get();
                res.add(resp);
            }
            catch (InterruptedException | ExecutionException e) {
                throw e;
            }

        }
        return res;
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
        if (list.get(0) == null) {
            throw new NotFoundException("No users could be found");
        }
        return list;
    }

    public UserDTO editUser(String email) throws NotFoundException {
        EntityManager em = getEm();
        User user = null;
        try {
            em.getTransaction().begin();
            user = em.find(User.class, email);
            if (user == null) {
                throw new NotFoundException("The user could not be found");
            }
            List<Role> roles = user.getRoleList();
            boolean addAdmin = true;
            for (Role role : roles) {
                if(role.getRoleName().equals("admin")){
                    roles.remove(role);
                    role.getUserList().remove(user);
                    addAdmin = false;
                }
            }
            if(addAdmin){
                Role role = new Role("admin");
                roles.add(role);
            }
            em.merge(user);
        }
        finally {
            em.close();
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
        if (list.get(0) == null) {
            throw new NotFoundException("No roles could be found");
        }
        return list;
    }
}
