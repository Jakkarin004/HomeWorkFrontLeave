import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_PATH } from '../api/api-path';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MainService {

    constructor(private http: HttpClient) { }

    // เพิ่มข้อมูล
    saveData(payload: any): Observable<any> {
        return this.http.post<any>(API_PATH.saveLeaveRequest, payload);
    }

    updateData(id: string|number,payload:any): Observable<any> {
        return this.http.put<any>(API_PATH.updateRequest(id), payload)
    } 

    // ดึงข้อมูลทั้งหมด
    getData(): Observable<any[]> {
        return this.http.get<any[]>(API_PATH.typeAll);
    }

    // ดึงข้อมูลทั้งหมด
    getDataRequest(): Observable<any[]> {
        return this.http.get<any[]>(API_PATH.dataRequest);
    }

    // ดึงข้อมูลทั้งหมด
    getDataDepart(): Observable<any[]> {
        return this.http.get<any[]>(API_PATH.dataDepartment);
    }

    // ดึงข้อมูลทั้งหมด
    getDataBalance(): Observable<any[]> {
        return this.http.get<any[]>(API_PATH.dataBalance);
    }



}