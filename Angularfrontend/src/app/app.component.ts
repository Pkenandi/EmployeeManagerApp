import {Component, OnInit} from '@angular/core';
import {Employee} from './Employee';
import {EmployeeService} from './employee.service';
import {HttpErrorResponse} from '@angular/common/http';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'AngSpringApp';

  employees: Employee[];
  updateEmployee: Employee;
  delete: Employee;
  modal = true;

  // ---- Forms name ----

  // Register

  registerEmployee = new FormGroup(
    {
      name : new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
    });

  // Add form name

  addEmployeeForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    jobTitle: new FormControl(''),
    phone: new FormControl(''),
  });

  // Edit form name

  ngOnInit(): void {
    this.getEmployees();
  }

  constructor(private employeeService: EmployeeService)
  {}

  // tslint:disable-next-line:typedef
  public searchEmployee(key: string)
  {
    const results: Employee[] = [];

    for ( const employee of this.employees)
    {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1)
      {
        results.push(employee);
      }
    }

    this.employees = results;

    if ( results.length === 0 || !key) {
      this.getEmployees();
    }

  }

  public getEmployees(): void {
    this.employeeService.getEmployee().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        console.log(this.employees);
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // tslint:disable-next-line:typedef
  register() {
    this.employees = this.addEmployeeForm.value;
    this.employeeService.addEmployee(this.addEmployeeForm.value).subscribe((employees) => {
      this.modal = true;
    });
  }

  // tslint:disable-next-line:typedef
  editEmployee(employee: Employee) {
    this.employeeService.updateEmployee(employee).subscribe((response: Employee) => {
      console.log(response);
      this.addEmployeeForm.reset();
      this.getEmployees();
    },
      (error: HttpErrorResponse) =>
      {
        alert(error.message);
      });
  }

  // tslint:disable-next-line:typedef
  addEmployee() {
    document.getElementById('closeB2').click();
    this.employeeService.addEmployee(this.addEmployeeForm.value).subscribe(
      (response: Employee) => {
        this.modal = true;
        this.addEmployeeForm.reset();
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.addEmployeeForm.reset();
      });
  }

  // tslint:disable-next-line:typedef
  deleteEmployee(employeeId: number) {
    this.employeeService.deleteEmployee(employeeId).subscribe((response) => {
      this.getEmployees();
    },
      (error: HttpErrorResponse) => {
      console.log(error.message);
      });
  }

  // tslint:disable-next-line:typedef
  public onOpenModal(employee: Employee, mode)
  {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');

    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if ( mode === 'add')
    {
      button.setAttribute('data-target', '#addEmployeeModal');
    }

    if ( mode === 'edit')
    {
      this.updateEmployee = employee;
      button.setAttribute('data-target', '#editEmployeeModal');
    }

    if ( mode === 'delete')
    {
      this.delete = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }

    if ( mode === 'login')
    {
      button.setAttribute('data-target', '#loginEmployeeModal');
    }

    if ( mode === 'register')
    {
      button.setAttribute('data-target', '#registerEmployeeModal');
    }

    container.appendChild(button);
    button.click();

  }

  // tslint:disable-next-line:typedef
  closeModal()
  {
    if (this.modal === true) {
        this.modal = false;
    }
  }


}
