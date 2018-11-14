/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dto;

import entity.Role;

/**
 *
 * @author Rasmus
 */
public class RoleDTO {
    public String roleName;

    public RoleDTO(Role role) {
        this.roleName = role.getRoleName();
    }
}
