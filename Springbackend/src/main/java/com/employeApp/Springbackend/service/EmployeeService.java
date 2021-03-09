package com.employeApp.Springbackend.service;

import com.employeApp.Springbackend.exception.employeeNotFoundException;
import com.employeApp.Springbackend.model.Employee;
import com.employeApp.Springbackend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class EmployeeService {
    private final EmployeeRepository repository;

    @Autowired
    public EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }

    public Employee addEmployee(Employee employee)
    {
        employee.setEmployeeCode(UUID.randomUUID().toString());
        return this.repository.save(employee);
    }

    public List<Employee> findAllEmployees()
    {
        return repository.findAll();
    }

    public Employee updateEmployee(Employee employee)
    {
        return this.repository.save(employee);
    }

    public void deleteEmployee(Long id)
    {
        this.repository.deleteEmployeeById(id);
    }

    public Employee findEmployeeById(Long id)
    {
        return this.repository.findEmployeeById(id)
                .orElseThrow(() -> new employeeNotFoundException(" employee with id " + id +" was'nt found "));
    }
}
