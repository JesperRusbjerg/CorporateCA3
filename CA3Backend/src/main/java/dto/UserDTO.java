/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dto;

import entity.Role;
import entity.User;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Rasmus
 */
public class UserDTO {
    public String email;
    public List<RoleDTO> roles = new ArrayList();

    public UserDTO(User user) {
        this.email = user.getEmail();
        for (Role role : user.getRoleList()) {
            this.roles.add(new RoleDTO(role));
        }
    }
}
