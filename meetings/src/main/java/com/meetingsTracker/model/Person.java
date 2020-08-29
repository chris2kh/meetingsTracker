/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.meetingsTracker.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author cristian
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Person {
    private int id;
    private String name;
}
