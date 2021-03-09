package com.employeApp.Springbackend.exception;

public class employeeNotFoundException extends RuntimeException{
    public employeeNotFoundException(String m) {
        super(m);
    }
}
