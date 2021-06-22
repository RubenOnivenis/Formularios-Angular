import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class paisesService
{
    constructor(
        private http:HttpClient
    ) {}
    
    getPaises(){
        return this.http.get('https://restcountries.eu/rest/v2/lang/es');
    }
}

