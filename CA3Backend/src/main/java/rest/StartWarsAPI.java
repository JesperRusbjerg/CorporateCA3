/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.core.MediaType;

/**
 * REST Web Service
 *
 * @author adamlass
 */
@Path("swapi")
@RolesAllowed("user")
public class StartWarsAPI {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of StartWarsAPI
     */
    public StartWarsAPI() {
    }

    /**
     * Retrieves representation of an instance of rest.StartWarsAPI
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getJson() {
        return "hej";
    }

    /**
     * PUT method for updating or creating an instance of StartWarsAPI
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void putJson(String content) {
    }
}
