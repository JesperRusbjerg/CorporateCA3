/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import dto.UserDTO;
import exceptions.NotFoundException;
import facade.Facade;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.persistence.Persistence;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * REST Web Service
 *
 * @author Rasmus
 */
@Path("users")
public class UsersRest {

    private Gson gson;
    private Facade facade;

    @Context
    private UriInfo context;

    public UsersRest() {
        this.gson = new GsonBuilder().setPrettyPrinting().create();
        this.facade = new Facade(Persistence.createEntityManagerFactory("pu"));
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllUsers() throws NotFoundException {
        List<UserDTO> users = facade.getAllUsers();
        String json = gson.toJson(users);
        return Response.ok().entity(json).build();
    }

    @GET
    @Path("{email}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getUser(@PathParam("email") String email) throws NotFoundException {
        UserDTO userDTO = facade.getUser(email);
        String json = gson.toJson(userDTO);
        return Response.ok().entity(json).build();
    }
}
