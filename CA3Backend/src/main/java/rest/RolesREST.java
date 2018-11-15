/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import dto.RoleDTO;
import exceptions.NotFoundException;
import facade.Facade;
import java.util.List;
import javax.annotation.security.RolesAllowed;
import javax.persistence.Persistence;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

/**
 * REST Web Service
 *
 * @author Rasmus
 */
@Path("roles")
public class RolesREST {

    Gson gson;
    Facade facade;
    @Context
    private UriInfo context;
    
    @Context
    SecurityContext securityContext;

    public RolesREST() {
        this.gson = new GsonBuilder().setPrettyPrinting().create();
        this.facade = new Facade(Persistence.createEntityManagerFactory("pu"));
    }

    @GET
    @RolesAllowed("admin")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getJson() throws NotFoundException {
        List<RoleDTO> list = facade.getAllRoles();
        String json = gson.toJson(list);
        return Response.ok().entity(json).build();
    }
}
