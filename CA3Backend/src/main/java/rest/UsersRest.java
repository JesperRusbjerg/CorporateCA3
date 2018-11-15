/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import dto.UserDTO;
import entity.User;
import exceptions.NotFoundException;
import facade.Facade;
import java.util.List;
import javax.annotation.security.RolesAllowed;
import javax.persistence.Persistence;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import security.JWTSecurityContext;

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
    
    @Context
    SecurityContext securityContext;

    public UsersRest() {
        this.gson = new GsonBuilder().setPrettyPrinting().create();
        this.facade = new Facade(Persistence.createEntityManagerFactory("pu"));
    }

    @GET
    @RolesAllowed({"admin"})
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllUsers() throws NotFoundException {
        List<UserDTO> users = facade.getAllUsers();
        String json = gson.toJson(users);
        return Response.ok().entity(json).build();
    }

    @PUT
    @Path("{email}")
    @RolesAllowed({"admin"})
    @Consumes(MediaType.APPLICATION_JSON)
    public Response editUser(@Context JWTSecurityContext securityContext, @PathParam("email") String email) throws NotFoundException {
        UserDTO userDTO = facade.editUser(email);
        String json = gson.toJson(userDTO);
        return Response.ok().entity(json).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createUser(String jsonString) throws Exception {
        JsonObject json = new JsonParser().parse(jsonString).getAsJsonObject();
        String email = json.get("email").getAsString();
        String password = json.get("password").getAsString();
        User user = new User(email, password);
        facade.createUser(user);
//        User loggedInUser = UserFacade.getInstance().getVeryfiedUser(email, password);
        String token = facade.createToken(email, user.getRolesAsStrings());
        JsonObject obj = new JsonObject();
        obj.addProperty("email", email);
        obj.addProperty("token", token);
        
        return Response
                .ok()
                .entity(gson.toJson(obj))
                .type(MediaType.APPLICATION_JSON)
                .build();
        
    }
}
