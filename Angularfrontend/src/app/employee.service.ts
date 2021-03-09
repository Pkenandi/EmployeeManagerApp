import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import {Employee} from './Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private Url = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  // get all employees
  public getEmployee(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.Url}/employee/all`);
  }

  public addEmployee(employee: Employee): Observable<Employee>
  {
    return this.http.post<Employee>(`${this.Url}/employee/add`, employee);
  }

  public updateEmployee(employee: Employee): Observable<Employee>
  {
    return this.http.put<Employee>(`${this.Url}/employee/update`, employee);
  }

  public deleteEmployee(id: number): Observable<void>
  {
    return this.http.delete<void>(`${this.Url}/employee/delete/${id}`);
  }

  public getEmployeeById(id: number): Observable<Employee>
  {
    return this.http.get<Employee>(`${this.Url}/employee/find/${id}`);
  }
}
